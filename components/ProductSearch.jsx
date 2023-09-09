import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const ProductSearch = ({ item }) => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  return (
    <ScrollView>
      <Pressable
        onPress={() => navigation.navigate("Product", { ...item })}
        style={[styles.searchTile, { width: width * 0.85, height: height / 6 }]}
      >
        <Image source={{ uri: item.image }} style={styles.searchTileImage} />
        <View style={{ flexDirection: "column", marginTop: 40 }}>
          <Text style={{ marginLeft: 5, fontWeight: "500", fontSize: 18 }}>
            {item.name}
          </Text>
          <Text style={{ marginLeft: 5, fontWeight: "400", fontSize: 18 }}>
            Price {item.price}Ksh
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
};

export default ProductSearch;

const styles = StyleSheet.create({
  searchTile: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 30,
    marginVertical: 20,
    elevation: 5,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    borderRadius: 10,
  },
  searchTileImage: {
    width: 160,
    height: 130,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
