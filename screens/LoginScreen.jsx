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
} from "react-native";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSigin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
        navigation.navigate("Bottom");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }}>Login to Your Account </Text>
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
                style={styles.password}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeIcon}
              >
                <FontAwesome
                  name={passwordVisible ? "eye-slash" : "eye"}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Pressable style={styles.button} onPress={handleSigin}>
            <Text>Sign In</Text>
          </Pressable>
          <View style={styles.account}>
            <Text>Don't have an Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.textAccount}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "20%",
  },
  input: {
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "grey",
    width: "40%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 40,
    alignSelf: "center",
  },
  inputContainer: {
    marginLeft: 20,
    width: "90%",
    marginTop: "50%",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "grey",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  password: {
    width: "100%",
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  eyeIcon: {
    right: 40,
    top: 10,
  },
  account: {
    flexDirection: "row",
    gap: 5,
    marginLeft: 20,
    marginTop: 10,
  },
  textAccount: {
    color: "blue",
  },
  header: {
    alignItems: "center",
  },
  account: {
    flexDirection: "row",
    gap: 5,
    marginLeft: 20,
    marginTop: 20,
    alignSelf: "center",
  },
});
