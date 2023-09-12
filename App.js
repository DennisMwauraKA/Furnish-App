import { StyleSheet, View } from "react-native";
import StackNavigation from "./navigation/StackNavigation";
import { CartProvider } from "./cart/CartContext";
export default function App() {
  return (
    <CartProvider>
      <StackNavigation />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6EB",
  },
});
