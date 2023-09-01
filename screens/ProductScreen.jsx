import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const ProductScreen = (props) => {
  const item = props.route.params;
  const navigation =useNavigation();
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
