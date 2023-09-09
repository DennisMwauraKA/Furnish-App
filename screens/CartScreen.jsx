import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useCart } from "../cart/CartContext";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const CartScreen = () => {
  const navigation = useNavigation();
  const { cartState, dispatch } = useCart();
  const { cartItems } = cartState;
  const { width, height } = Dimensions.get("window");
  const incrementQuantity = (item) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: { itemId: item._id } });
  };
  const decrementQuantity = (item) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: { itemId: item._id } });
  };
  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { itemId: item._id } });
  };
  const cleanCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return totalPrice;
  };
  const handleCheckOut = () => {
    navigation.navigate("Confirmation");
    cleanCart();
  };
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={{ marginTop: 30, justifyContent: "center" }}>
        <Text style={{ marginLeft: 45, fontSize: 20 }}>Your Cart Items</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="leftcircle"
            size={30}
            color={"orange"}
            style={{ top: -27, left: 10 }}
          />
        </TouchableOpacity>
      </View>
      {cartItems.map((item) => (
        <View
          key={item._id}
          style={[
            styles.cartContainer,
            { width: width * 0.9, height: height / 5 },
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.cartImage} />

          <View style={styles.cartDetails}>
            <Text style={{ marginTop: 5, fontSize: 18, textAlign: "center" }}>
              {item.name}
            </Text>
            <Text style={{ marginLeft: 10 }} numberOfLines={4}>
              {item.description}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 10,
                marginTop: 10,
                width: "80%",
                borderRadius: 5,
                height: 30,
                backgroundColor: "orange",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => incrementQuantity(item)}
                style={{ marginHorizontal: 5 }}
              >
                <SimpleLineIcons name="plus" size={25} color={"#fff"} />
              </TouchableOpacity>
              <Text>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => decrementQuantity(item)}
                style={{ marginHorizontal: 5 }}
              >
                <SimpleLineIcons name="minus" size={25} color={"#fff"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 5 }}
                onPress={() => removeFromCart(item)}
              >
                <AntDesign name="delete" size={25} color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      {cartItems.length > 0 && (
        <View
          style={[
            styles.cartItems,
            { width: width - 40, height: height / width + 120 },
          ]}
        >
          <Text style={styles.cartItemsText}>
            Your Cart Items: {cartItems.length}
          </Text>
          <Text style={styles.cartItemsText}>
            Total PRICE (KSH): {calculateTotalPrice()}
          </Text>
          <TouchableOpacity
            onPress={handleCheckOut}
            style={{
              backgroundColor: "orange",
              width: "60%",
              borderRadius: 10,
              elevation: 3,
              height: 40,
              marginLeft: 65,
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Proceed To CheckOut
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartContainer: {
    backgroundColor: "#fff",
    elevation: 4,
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: 20,
    borderRadius: 20,
  },
  cartImage: {
    width: 155,
    height: 155,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    resizeMode: "cover",
  },
  cartDetails: {
    flexDirection: "column",
    width: 200,
  },
  cartItems: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 10,
    elevation: 4,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  cartItemsText: {
    color: "#000",
  },
});
