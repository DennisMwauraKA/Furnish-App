import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ProductSearch from "../components/ProductSearch";
import axios from "axios";

const SearchScreen = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setError] = useState(null);
  const { width, height } = Dimensions.get("window");

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://192.168.43.244:3000/products/${searchKey}`
      );
      setResults(response.data);
    } catch (error) {
      setError("Error Fetching Products");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };



  return (
    <SafeAreaView>
      <View style={styles.searchInput}>
        <View>
          <TextInput
            placeholder="What are You Searching for"
            value={searchKey}
            onChangeText={setSearchKey}
          />
        </View>
        <TouchableOpacity onPress={handleSearch}>
          <FontAwesome name={"search"} size={28} color={"orange"} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="orange" style={styles.loader} />
      ) : searchResults.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/gallery/Search.png")}
            style={[
              styles.imageSearch,
              { width: width * 1, height: height - 100 },
            ]}
          />
        </View>
      ) : searchError ? (
        <View>
          <Text style={styles.errorText}>
            Oops Could not Find the Product!!
          </Text>
          <Image
            source={require("../assets/gallery/Search.png")}
            style={[
              styles.imageSearch,
              { width: width * 1, height: height - 150 },
            ]}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductSearch item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

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
  imageSearch: {
    resizeMode: "contain",
    opacity: 0.9,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 20,
    textAlign: "center",
    color: "orange",
    fontSize: 17,
  },
});
