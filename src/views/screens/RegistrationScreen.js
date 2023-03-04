import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import ccsLogo from "../../img/ccs.png";

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    studno: "",
    email: "",
    fullname: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    let isValid = true;

    if (!inputs.studno) {
      handleError("Please Enter a Student Number", "studno");
      isValid = false;
    }
    if (!inputs.email) {
      handleError("Please Enter an Email Address", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please Enter a Valid Email Address", "email");
      isValid = false;
    }
    if (!inputs.fullname) {
      handleError("Please Enter a Full Name", "fullname");
      isValid = false;
    }
    if (!inputs.phone) {
      handleError("Please Enter a Phone Number", "phone");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please Enter a Password", "password");
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError("Minimum Password Length is 8", "password");
      isValid = false;
    }
    if (!inputs.passwordConfirm) {
      handleError("Please Enter Confirm Password", "passwordConfirm");
      isValid = false;
    } else if (inputs.passwordConfirm !== inputs.password) {
      handleError("Password Confirmation does not match", "passwordConfirm");
      isValid = false;
    }

    if (isValid) register();
  };

  const register = () => {
    console.log("register!");
    console.log(inputs);

    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem("userData", JSON.stringify(inputs));

        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "User Successfully Created!",
          button: "Close",
          onHide: () => {
            navigation.navigate("LoginScreen");
          },
        });
      } catch (error) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "ERROR",
          textBody: error,
          button: "Close",
        });
      }
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (text, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <AlertNotificationRoot>
        <Loader visible={loading} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image style={styles.image} source={ccsLogo} />
          <Text style={styles.textTitle}>Registration Form</Text>
          <Text style={styles.textSubTitle}>
            Enter Your Details to Register
          </Text>
          <Input
            label="Student Number"
            iconName="id-badge"
            placeholder="Enter your Student Number"
            onChangeText={(text) => handleOnChange(text, "studno")}
            onFocus={() => handleError(null, "studno")}
            error={errors.studno}
          />
          <Input
            label="Full Name"
            iconName="user"
            placeholder="Enter your Full Name"
            onChangeText={(text) => handleOnChange(text, "fullname")}
            onFocus={() => handleError(null, "fullname")}
            error={errors.fullname}
          />
          <Input
            label="Phone Number"
            iconName="mobile-alt"
            placeholder="Enter your Phone Number"
            onChangeText={(text) => handleOnChange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            error={errors.phone}
          />
          <Input
            label="Email Address"
            iconName="envelope"
            placeholder="Enter your Email Address"
            onChangeText={(text) => handleOnChange(text, "email")}
            onFocus={() => handleError(null, "email")}
            error={errors.email}
          />
          <Input
            label="Password"
            iconName="key"
            password
            placeholder="Enter your Password"
            onChangeText={(text) => handleOnChange(text, "password")}
            onFocus={() => handleError(null, "password")}
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            iconName="key"
            password
            placeholder="Confirm your Password"
            onChangeText={(text) => handleOnChange(text, "passwordConfirm")}
            onFocus={() => handleError(null, "passwordConfirm")}
            error={errors.passwordConfirm}
          />

          <Button title="Register" onPress={validate} />
        </ScrollView>
      </AlertNotificationRoot>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  textSubTitle: {
    fontSize: 18,
    color: "black",
    marginVertical: 5,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
});

export default RegistrationScreen;
