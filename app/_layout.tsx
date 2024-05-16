import { ArticleProvider, useArticle } from "@/context/Article.context";
import { Stack } from "expo-router";


export default function RootLayout() {
  return (
  
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{
            headerTitle: "News App",
          
          }}
        />
        <Stack.Screen 
          name="detail" 
          options={{
            headerTitle: "Detail",
          
          }}
        />
      </Stack>
   
  );
}
