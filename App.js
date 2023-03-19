import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { useState } from "react";
import Colors from "./Constants/colors";
import GameOversScreen from "./screens/GameOverScreen";
export default function App() {
  const [userNumber, setuserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const pickedNumber = (pickedNumber) => {
    setuserNumber(pickedNumber);
    setGameIsOver(false);
  };
  function gameOverHandler(numberOfRound) {
    setGameIsOver(true);
    setGuessRounds(numberOfRound)
  }
  const startNewGameHandler = () => {
    setuserNumber(null);
     setGuessRounds(0)
  };
  let screen = <StartGameScreen onPickNumber={pickedNumber} />;
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOversScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgoundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgoundImage: {
    opacity: 0.15,
  },
});
