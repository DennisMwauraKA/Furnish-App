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
} from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Carousel from "../components/Carousel";
import axios from "axios";
const HomeScreen = ({ navigation, route }) => {
  const [greeting, setGreeting] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const { width, height } = Dimensions.get("window");

  // fetch all categories in the database

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://192.168.43.244:3000/categories");
      setCategories(res.data);

      console.log(res.data);
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    fetchCategories();
    handleCategorySelect();
  }, []);

  //fetch products under that category
  const handleCategorySelect = async (categoryName) => {
    try {
    const res = await axios .get(`http://192.168.43.244:3000/products/category/${categoryName}`)
      setProducts(res.data)
      console.log(res.data);

    } catch (error) {
      console.log("Error fetching products:", error);
      
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
        <View>
          <TextInput
            placeholder="What are You Searching for"
            value=""
            onPressIn={() => navigation.navigate("Search")}
          />
        </View>
        <TouchableOpacity>
          <FontAwesome name={"search"} size={26} color={"#000"} />
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
        {/*displays the categories available*/}
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

        {selectedCategory && (
          <View style={styles.productContainer}>
            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              ItemSeparatorComponent={() => (
                <View style={styles.separatorproduct} />
              )}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => navigation.navigate("Product", { ...item })}
                  style={[
                    styles.products,
                    { width: width * 0.8, height: height / 3.5 },
                  ]}
                >
                  <Text>{item.name}</Text>
                  <Text>{item.price}</Text>
                </Pressable>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    marginLeft: 15,
    marginTop: 40,
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
    width: 100,
    borderWidth: 1,
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
    marginHorizontal: 20,
  },
  products: {
    backgroundColor: "#FFF",
    marginTop: 10,
    marginHorizontal: 20,
    elevation: 10,
    borderRadius:10,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
  productContainer: {
    marginTop: 10,
    marginBottom: 20,
   
  },
});
