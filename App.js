import { StatusBar } from "expo-status-bar";
import { StyleSheet, } from "react-native";
import StackNavigation from "./navigation/StackNavigation";
export default function App() {
  return (
    <StackNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6EB",
  },
});
