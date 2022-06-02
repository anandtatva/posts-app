import React, { useEffect, FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, GradientBackground, Table } from "../../components"
import { color, spacing } from "../../theme"
import { Post, useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"

const FULL: ViewStyle = {
  flex: 1,
  paddingBottom: 80
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}

export const PostsScreen: FC<StackScreenProps<NavigatorParamList, "postScreen">> = observer(
  ({ navigation }) => {

    const { postStore } = useStores()
    const { posts } = postStore

    useEffect(() => {
      async function fetchData(page) {
       const {page: currentPage, nbPages, status} = await postStore.getPosts(page)
       console.log({page, status, currentPage, nbPages}, posts.length)
       if(status && nbPages > page){
        setTimeout(fetchData, 10000, currentPage + 1)
       }
      }
      fetchData(0)
    }, [])
    const handleDetails =(data: Post)=>{
      navigation.navigate("postDetailsScreen", { data })
    }
    console.log(posts.length)
    return (
      <View testID="postsScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="postsScreen.title"
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Table 
            onDetails={handleDetails}
            tableData={posts} 
            tableHead={[
              "Title", 
              "Author",
              "Url",
              "Created At", 
            ]}
          />
        </Screen>
      </View>
    )
  },
)
