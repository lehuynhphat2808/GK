
import { Tile } from "@rneui/base";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Text, View } from "react-native";

export default function Detail() {
  const params = useLocalSearchParams();
  const [article, setArticle] = useState(JSON.parse(params.article));
  return (
    <View
      style={{
        flex: 1,
      }}
    >
       <Tile
            imageSrc={{
              uri: article?.urlToImage,
            }}
            title={article?.title}
            titleStyle={{
              fontSize: 15,
              fontWeight: "bold",
              fontStyle: "italic",
              margin: 10,
            }}
            caption={'By ' + article?.author + '\n' + new Date(article?.publishedAt).toDateString()}
            featured
            activeOpacity={1}
            imageContainerStyle={{ borderRadius: 12}}
            height={300}
            width={'100%'}
          />
        <View
            style={{
                flex: 1,
                marginTop: 20,
                borderBlockColor: "black",
                borderBlockWidth: 2,
                borderBlockStyle: "solid",
                borderRadius: 12,
            }}
        >
            <Text
                style={{
                fontSize: 20,
                fontWeight: "bold",
                margin: 10,
                }}
            >
                {article?.title}
            </Text>
            <Text
                style={{
                fontSize: 15,
                margin: 10,
                }}
            >
                {article?.content}
            </Text>
        </View>
    </View>
  );
}
