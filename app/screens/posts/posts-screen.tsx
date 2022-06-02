import React, { useEffect, FC, useCallback } from "react"
import { TextStyle, View, ViewStyle, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, GradientBackground,Text, PostCard } from "../../components"
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
const PAGINATION_ROOT: ViewStyle = {
  padding: 10
}

export const PostsScreen: FC<StackScreenProps<NavigatorParamList, "postScreen">> = observer(
  ({ navigation }) => {
    const [page, setPage]= React.useState(1);
    const { postStore } = useStores()
    const { posts } = postStore
    const to = Math.min((page + 1) * 5, posts.length);
    useEffect(() => {
      async function fetchData(page) {
       const {page: currentPage, nbPages, status} = await postStore.getPosts(page)
       if(status && nbPages > page){
        setTimeout(fetchData, 10000, currentPage + 1)
       }
      }
      fetchData(0)
    }, [])
    const handleDetails =  useCallback((data: Post)=>{
      navigation.navigate("postDetailsScreen", { data })
    }, [])
    const handleLoadMore = () => {
      const nextPage =  Math.min((page + 1) * 5, posts.length)
      if(nextPage <= posts.length) setPage( page + 1)
    }
    return (
      <View testID="postsScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="postsScreen.title"
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={PAGINATION_ROOT}>
            <Text style={HEADER_TITLE}>1-{to} of {posts.length}</Text>
          </View>
          <FlatList 
            // onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
            keyExtractor={(_, index) => String(index)}
            data={posts.slice(0, to)}
            renderItem={({item, index})=> <PostCard index={index} onDetails={handleDetails} data={item} /> }
          />
          
          {/* <Table 
            onDetails={handleDetails}
            tableData={posts} 
            tableHead={[
              "Title", 
              "Author",
              "Url",
              "Created At", 
            ]}
          /> */}
        </Screen>
      </View>
    )
  },
)
