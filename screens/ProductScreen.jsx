import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../cart/CartContext";

const ProductScreen = (props) => {
  const item = props.route.params;
  const navigation = useNavigation();
  const [addedToCart, setaddedToCart] = useState(false);
  const { width, height } = Dimensions.get("window");
  const { dispatch } = useCart();
  const addToCart = (item) => {
    setaddedToCart(true);
    dispatch({ type: "ADD_TO_CART", payload: item });
    setTimeout(() => {
      setaddedToCart(false);
    }, 2000);
  };

  return (
    <SafeAreaView>
      <View>
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 300, resizeMode: "cover" }}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="leftcircle"
            size={30}
            color={"white"}
            style={{ top: -260, left: 10 }}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.details, { width: width * 1, height: height / 1 }]}>
        <View style={styles.detailsHeader}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.name}</Text>
          <Text style={{ fontSize: 20 }}>Ksh {item.price}</Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontWeight: "bold", marginTop: 5 }}>Description</Text>
          <Text style={{ lineHeight: 29, fontSize: 17 }}>
            {item.description}
          </Text>
        </View>

        {addedToCart ? (
          <View style={{ marginHorizontal: 20, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={{
                backgroundColor: "orange",
                width: "60%",
                height: 40,
                justifyContent: "center",
                marginTop: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Added to Cart
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ marginHorizontal: 20, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={{
                backgroundColor: "orange",
                width: "60%",
                height: 40,
                justifyContent: "center",
                marginTop: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <StatusBar translucent backgroundColor="transparent" />
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  details: {
    backgroundColor: "white",
    top: -40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 30,
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
});
