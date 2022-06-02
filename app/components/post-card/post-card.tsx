import * as React from "react"
import { StyleProp, TouchableOpacity, TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { Post } from "../../models"

const CONTAINER: ViewStyle = {
  marginVertical: 5,
  paddingVertical: 10,
  paddingHorizontal: 20,
  // borderBottomWidth: 1,
  // borderTopWidth: 1,
  // borderColor: color.text,
  backgroundColor:color.palette.deepPurple,
  shadowColor: "#000",
  shadowOffset: {
	  width: 0,
	  height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 6,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.text,
  lineHeight: 20,
  width:"90%"
}
const TEXT_HEADING: TextStyle = {
  fontFamily: typography.primary,
  fontWeight: "bold",
  fontSize: 16,
  color: color.text,
  paddingRight: 5
}

const ROOT: ViewStyle = {
  flexDirection: "row",
}

export interface PostCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data: Post
  onDetails: (item: Post)=> void
  index: number

}

/**
 * Describe your component here
 */
export const PostCard = React.memo(function PostCard(props: PostCardProps) {
  const { style, data, onDetails } = props
  const styles = Object.assign({}, CONTAINER, style)
  return (
    <TouchableOpacity style={styles} onPress={onDetails.bind({}, data)}>
      <View style={ROOT}>
        <Text style={TEXT_HEADING}>
          Title:
        </Text>
        <Text style={TEXT} numberOfLines={1}>
          {data.title}
        </Text>
      </View>
      <View style={ROOT}>
        <Text style={TEXT_HEADING}>
          URL:
        </Text>
        <Text style={TEXT} numberOfLines={1}>
          {data.url}
        </Text>
      </View>
      <View style={ROOT}>
        <Text style={TEXT_HEADING}>
          Author: 
        </Text>
        <Text style={TEXT}>
          {data.author}
        </Text>
      </View>
      <View style={ROOT}>
        <Text style={TEXT_HEADING}>
          Created At:
        </Text>
        <Text style={TEXT}>
          {data.created_at}
        </Text>
      </View>
    </TouchableOpacity>
  )
})
