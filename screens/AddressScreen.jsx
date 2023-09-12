import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../cart/CartContext";
const AddressScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [building, setBuilding] = useState("");
  const [street, setStreet] = useState("");
  const [town, setTown] = useState("");
  const { cartState, dispatch } = useCart();
  const { cartItems } = cartState;
  const [address, setAddress] = useState([]);
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    addAddress();
    getAddress();
  }, []);
  const addAddress = async () => {
    const address = {
      name: name,
      phoneNumber: phoneNumber,
      postalCode: postalCode,
      building: building,
      street: street,
      town: town,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        "http://192.168.43.244:3000/address",
        address
      );
      console.log(response);

      if (response.status === 200) {
        Alert.alert(`Address added Successfully`);
        setLoading(false);
        setName("");
        setphoneNumber("");
        setpostalCode("");
        setBuilding("");
        setStreet("");
        setTown("");
      } else {
        Alert.alert("Could not register your address");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 7000);
    }
  };
  const getAddress = async () => {
    try {
      const response = await axios.get("http://192.168.43.244:3000/address");
      setAddress(response.data);
    } catch (error) {
      console.log(error);
    }
 
  };
  const cleanCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  return (
    <ScrollView>
      <View style={styles.addressContainer}>
        <KeyboardAvoidingView>
          <TextInput
            placeholder="Enter your Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setphoneNumber(text)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Postal Code"
            value={postalCode}
            onChangeText={(text) => setpostalCode(text)}
            style={styles.input}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="Building"
            value={building}
            onChangeText={(text) => setBuilding(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Street"
            value={street}
            onChangeText={(text) => setStreet(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Town"
            value={town}
            onChangeText={(text) => setTown(text)}
            style={styles.input}
          />
          <View>
            {loading ? (
              <TouchableOpacity onPress={addAddress} style={styles.addButton}>
                <ActivityIndicator size={"large"} color={"white"} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={addAddress} style={styles.addButton}>
                <Text style={styles.addressText}>Add Shipping Address</Text>
              </TouchableOpacity>
            )}
          </View>

          <View>
            <Text style={{marginLeft:20,marginTop:10,fontWeight:"bold"}}> Ship to this address</Text>
            {address.map((item) => (
              <View
                style={[
                  styles.addedAddress,
                  { width: width * 0.8, height: height / 3.5 },
                ]}
                key={item._id}
              >
                <Text style={{margin:5}}>Name: {item.name}</Text>
                <Text  style={{margin:5}}>Phone Number: {item.phoneNumber}</Text>
                <Text style={{margin:5}}>PostalCode: {item.postalCode}</Text>
                <Text style={{margin:5}}>Building: {item.building}</Text>
                <Text style={{margin:5}}>Street: {item.street}</Text>
                <Text style={{margin:5}}>Area Town: {item.town}</Text>
              </View>
            ))}
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          
            style={{
              backgroundColor: "orange",
              width: "60%",
              borderRadius: 10,
              elevation: 3,
              height: 40,
              marginLeft: 65,
              justifyContent: "center",
              marginTop: 20,
              marginBottom:30,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Place Order 
            </Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  addressContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    borderWidth: 0.9,
    borderColor: "grey",
    marginVertical: 10,
    padding: 5,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "orange",
    alignItems: "center",
    width: "80%",
    height: 40,
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 30,
    borderRadius: 10,
  },
  addressText: {
    color: "#fff",
  },
  addedAddress: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal:20,
    marginTop:10
  
  },
});
