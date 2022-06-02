import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Header, Screen, GradientBackground, Text } from "../../components"
import { color, spacing } from "../../theme"
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

const POST_DATA: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 22,
  textAlign: "center",
  padding: 5,
  paddingHorizontal: 20
}


export const PostDetailsScreen: FC<StackScreenProps<NavigatorParamList, "postDetailsScreen">> = 
  ({ navigation, route }) => {
    const {data} = route?.params;
    return (
      <View testID="postDetailsScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="postDetailsScreen.title"
            style={HEADER}
            titleStyle={HEADER_TITLE}
            leftIcon="back"
            onLeftPress={()=> {navigation.goBack()}}
          />
          <Text style={POST_DATA}>
            Title: {data.title}
          </Text>
          <Text style={POST_DATA}>
            URL: {data.url}
          </Text>
          <Text style={POST_DATA}>
            Author: {data.author}
          </Text>
          <Text style={POST_DATA}>
            Created At: {data.created_at}
          </Text>
        </Screen>
      </View>
    )
}
