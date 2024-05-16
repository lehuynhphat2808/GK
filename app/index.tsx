import { Card, Divider, SearchBar, Tile } from "@rneui/base";
import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useArticle } from "@/context/Article.context";

export default function Index() {
  const [search, setSearch] = useState('Apple');
  const [searchResult, setSearchResult] = useState('Apple');
  const [news, setNews] = useState([]);
  const [firstNewsWithImage, setFirstNewsWithImage] = useState(null);
  const urlApi =
    `https://newsapi.org/v2/top-headlines?apiKey=aaa331cd57514f74aa9621b6603217d9&q=${searchResult}`;
  const updateSearch = (search) => {
    setSearch(search);
  };
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(urlApi)
      .then((response) => {
        console.log(response.data);
        setNews(response.data.articles);
        const firstNewsWithImage = response.data.articles.find(
          (article) => article.urlToImage
        );
        setFirstNewsWithImage(firstNewsWithImage);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchResult]);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        inputStyle={{ borderRadius: 4, padding: 4, margin: 4 }}
        containerStyle={{ borderRadius: 12 }}
        onSubmitEditing={() => {
          console.log('Enter key pressed');
          setSearchResult(search);
        }}
       
      />

      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 20,
        }}
      >
        <View 
          style={{
          height: 400,
          width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              margin: 10,
            }}
          >
            Breaking News!
          </Text>
          <Tile
            imageSrc={{
              uri: firstNewsWithImage?.urlToImage,
            }}
            title={firstNewsWithImage?.title}
            titleStyle={{
              fontSize: 15,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
            featured
            activeOpacity={1}
            imageContainerStyle={{ borderRadius: 12 }}
            height={300}
            width={'100%'}
          />
        </View>
        <Divider
          width={4}
          style={{
            margin: 4,
          }}
        />
        <ScrollView 
          style={{
            marginTop: 16,
            height: "100%",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              margin: 10,
            }}
          >
            Trending news
          </Text>
          {news.map((article, index) => (
            <Link 
              key={index}
              href={
                {
                  pathname: '/detail',
                  params: { article: JSON.stringify(article) }
                }
              }
             
            >
              <Card
                containerStyle={{
                  borderRadius: 12,
                  width: "98%",
                  margin: 8,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    padding: 10,
                    width: "100%",
                  }}
                >
                  <Image
                    source={{
                      uri: article?.urlToImage,
                    }}
                    style={{
                      width: "40%",
                      height: 200,
                      borderRadius: 12,
                    }}
                  />
                  <View
                    style={{
                      flexWrap: "wrap",
                      marginLeft: 10,
                      display: "flex",
                      flexDirection: "column",
                      width: "60%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        fontStyle: "italic",
                        flex: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {article?.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontStyle: "italic",
                        flex: 1,
                        flexWrap: "nowrap",
                      }}
                    >
                      {article?.description}
                    </Text>
                  </View>
                </View>
              </Card>
            </Link>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
