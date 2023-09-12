import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
  Keyboard,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const RegisterScreen = ({ navigation, route }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignUp = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password, username)
      .then((userCredential) => {
        Alert.alert(`Hey There!! Account Created successfuly`);
        const user = userCredential.user;
        const firebaseUid = user.uid;
        navigation.navigate("Login");
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../assets/gallery/furnish.png")}
          style={{
            width: "100%",
            height: 300,
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={styles.header}>
        <Text style={{ fontSize: 18 }}>Register for Your Account </Text>
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ height: 400 }}
        >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="PassWord"
                value={password}
                style={styles.password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!passwordVisible}
              />
              <Pressable
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeIcon}
              >
                <FontAwesome
                  name={passwordVisible ? "eye-slash" : "eye"}
                  size={20}
                />
              </Pressable>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            disabled={!!loading}
          >
            {loading ? (
              <ActivityIndicator color={"white"} size={"large"} />
            ) : (
              <Text style={{ color: "white" }}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "orange",
    width: "40%",
    height: 40,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 5,
  },
  inputContainer: {
    marginLeft: 20,
    width: "90%",
    marginTop: "5%",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    borderColor: "grey",
    borderRadius: 5,
  },
  password: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    marginTop: 40,
    paddingHorizontal: 10,
    borderColor: "grey",
    borderRadius: 5,
  },
  eyeIcon: {
    position: "relative",
    top: 20,
    right: 30,
  },

  textAccount: {
    color: "blue",
  },
  header: {
    alignItems: "center",
  },
});
