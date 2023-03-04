import React from "react";
import { View, Text, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";

const HomeScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");

    if (userData) {
      console.log("Home Screen");
      console.log(JSON.parse(userData));
      setUserDetails(JSON.parse(userData));
    }
  };
  const logout = () => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );

    navigation.navigate("LoginScreen");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.text}>Welcome {userDetails?.fullname} </Text>

      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
});
export default HomeScreen;
