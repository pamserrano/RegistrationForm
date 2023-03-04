import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 55,
    width: "100%",
    backgroundColor: "blue",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Button;
