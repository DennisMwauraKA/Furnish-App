import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";
import Carousel from "../components/Carousel";

import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [greeting, setGreeting] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { width, height } = Dimensions.get("window");

  // fetch all categories in the database

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://192.168.43.244:3000/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    handleCategorySelect();
  }, []);

  //fetch products under that category
  const handleCategorySelect = async (categoryName = "Furniture") => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://192.168.43.244:3000/products/category/${categoryName}`
      );
      setProducts(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching products:", error);
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
    setSelectedCategory(categoryName);
  };
  // set the greeting according to the time
  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 1 && currentTime < 12) {
      setGreeting("Good Morning");
    } else if (currentTime >= 12 && currentTime < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerTextA}>{greeting}</Text>
        <Text style={styles.headerTextB}>Discover Your Home Decor Needs</Text>
      </View>

      <View style={styles.searchInput}>
        <TextInput
          placeholder="What are You Searching for"
          value=""
          onPressIn={() => navigation.navigate("Search")}
        />
        <TouchableOpacity>
          <FontAwesome name={"search"} size={26} color={"orange"} />
        </TouchableOpacity>
      </View>

      <Carousel />

      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          Grab Your Best Home Decor
        </Text>
        {/*displays the categories available and also use the Activity indicator*/}
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <ActivityIndicator size={"large"} color={"orange"} />
          </View>
        ) : (
          <View style={styles.categoriesContainer}>
            <FlatList
              data={categories}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleCategorySelect(item.name)}
                  style={[
                    styles.categoryItem,
                    selectedCategory === item.name && styles.selectedCategory,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === item.name &&
                        styles.selectedCategoryText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {selectedCategory && (
          <View style={styles.products}>
            <FlashList
              data={products}
              horizontal
              keyExtractor={(item) => item._id}
              estimatedItemSize={200}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={styles.separatorproduct} />
              )}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => navigation.navigate("Product", { ...item })}
                  style={[
                    styles.flashlist,
                    { width: width * 0.8, height: height / 3.5 },
                  ]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: "100%",
                      height: 140,
                      resizeMode: "cover",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 15,
                      marginTop: 10,
                      fontSize: 17,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 15,
                      marginTop: 10,
                      fontSize: 16,
                    }}
                  >
                    Ksh:{item.price}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        )}
      </View>
      <StatusBar translucent backgroundColor="transparent" />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    marginLeft: 15,
    marginTop: 25,
  },
  headerTextA: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTextB: {
    fontSize: 17,
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: "white",
    height: 40,
    borderRadius: 15,
    paddingHorizontal: 5,
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 5,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryItem: {
    padding: 10,
    width: 90,
    borderColor: "grey",
    borderWidth: 0.8,
    borderRadius: 15,
    marginTop: 10,
  },
  selectedCategory: {
    backgroundColor: "orange",
  },
  categoriesContainer: {
    marginHorizontal: 19,
  },
  separator: {
    marginHorizontal: 5,
  },
  selectedCategoryText: {
    color: "white",
  },
  categoryText: {
    textAlign: "center",
  },
  separatorproduct: {
    marginHorizontal: 10,
  },
  products: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  productContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  flashlist: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    marginTop: 30,
  },
  textProduct: {
    fontSize: 18,
  },
});
