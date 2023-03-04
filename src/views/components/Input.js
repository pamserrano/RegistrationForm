import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View
        style={[
          styles.input,
          { borderColor: isFocused ? "darkblue" : "powderblue" },
        ]}
      >
        <Icon name={iconName} style={styles.icon} />
        <TextInput
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          style={styles.textInput}
          secureTextEntry={hidePassword}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye" : "eye-slash"}
            style={styles.iconEye}
          />
        )}
      </View>
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "lightcyan",
    height: 55,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.75,
    alignItems: "center",
    borderRadius: 200,
    borderWidth: 1,
  },
  icon: {
    fontSize: 25,
    color: "darkblue",
  },
  iconEye: {
    fontSize: 20,
    color: "darkblue",
  },
  textInput: {
    color: "darkblue",
    flex: 1,
    marginLeft: 10,
  },
  textError: {
    marginTop: 7,
    color: "red",
    fontSize: 14,
  },
});

export default Input;
