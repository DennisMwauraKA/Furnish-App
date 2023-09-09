import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCart } from "../cart/CartContext";
//importing the screens
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CartScreen from "../screens/CartScreen";
import ProductScreen from "../screens/ProductScreen";
import ConfirmScreen from "../screens/ConfirmScreen";
//create the stack containers to hold the screens
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = ({ route }) => {
  const { cartState } = useCart();
  const { cartItems } = cartState;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "grey",
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
        },
        tabBarStyle: { paddingTop: 10, height: 60 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (rn === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (rn === "Favorite") {
            iconName = focused ? "heart" : "heart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: "relative" }}>
              <Ionicons name="cart" size={size} color={color} />
              {cartItems.length > 0 && (
                <View
                  style={{
                    position: "absolute",
                    width: 20,
                    height: 20,
                    alignItems: "center",
                    backgroundColor: "red",
                    borderRadius: 10,
                    padding: 3,
                    top: -6,
                    right: -15,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {cartItems.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
/*nest the bottom Tab in the Stack Screens*/
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bottom"
          component={BottomTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
