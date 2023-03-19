import { Text, View, Image, StyleSheet } from "react-native";
import Colors from "../Constants/colors";

import Title from "../components/UI/Title";
import PrimaryButton from "../components/UI/PrimaryButton";

const GameOversScreen = ({roundsNumber,userNumber,onStartNewGame}) => {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over</Title>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/success.png")} />
      </View>
      <Text style={styles.summaryText}>
        Your Phone Needed <Text style={styles.hightlight}>{roundsNumber}</Text> rounds to
        guess the number <Text style={styles.hightlight}>{userNumber}</Text>{" "}
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
};
export default GameOversScreen;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  hightlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
