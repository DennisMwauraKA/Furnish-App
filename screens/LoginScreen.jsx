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
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase-config";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const LoginScreen = ({ navigation, route }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Bottom");
      }
    });
    return unsubscribe;
  }, []);
  const handleSigin = () => {
    setLoading(true); //start loading
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const firebaseUid = user.uid;
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false); // Stop loading in case of an error
        alert(error.message);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/gallery/furnish.png")}
        style={{
          width: "100%",
          height: 300,
          resizeMode: "contain",
        }}
      />
      <View style={styles.header}>
        <Text style={{ fontSize: 18 }}>Login to Your Account </Text>
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
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Bottom")}
            disabled={!!loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size={"small"} />
            ) : (
              <Text style={{ color: "white" }}>Sign In</Text>
            )}
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
  },
  input: {
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "orange",
    width: "40%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 40,
    alignSelf: "center",
    borderRadius: 5,
  },
  inputContainer: {
    marginLeft: 20,
    width: "90%",
    marginTop: 20,
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
    marginTop: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  eyeIcon: {
    right: 40,
    top: 20,
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
