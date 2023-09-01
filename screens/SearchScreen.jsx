import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import FontAwesome from "@expo/vector-icons/FontAwesome";
const SearchScreen = () => {
  const[search,searchInput]=useState("");
  return (
    <View style={styles.searchInput}>
    <View>
      <TextInput
        placeholder="What are You Searching for"
        value={search}
        onChangeText={(text)=>searchInput(text)}
        
      />
    </View>
    <TouchableOpacity>
      <FontAwesome name={"search"} size={28} color={"#000"} />
    </TouchableOpacity>
  </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "white",
    height: 40,
    borderRadius: 15,
    paddingHorizontal: 5,
    marginHorizontal: 15,
    marginTop: 50,
    elevation: 5,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})