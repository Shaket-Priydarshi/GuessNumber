import { View, StyleSheet } from "react-native";
import Colors from "../../Constants/colors";

const Card = ({ children }) => {
  return <View style={styles.Card}>{children}</View>;
};
export default Card;

const styles = StyleSheet.create({
  Card: {
    // flex:1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
    borderRadius: 10,
    elevation: 4, //only for android,
    shadowColor: "black",
    shadowOffset: { width: 9, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    padding: 16,
    backgroundColor: Colors.primary800,
  },
});
