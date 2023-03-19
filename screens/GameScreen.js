import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import Title from "../components/UI/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/UI/PrimaryButton";
import Card from "../components/UI/Card";
import InstructionText from "../components/UI/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

const genrateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return genrateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = genrateRandomBetween(1, 100, userNumber);
  const [guess, setGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (guess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [guess, userNumber, onGameOver]);
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  const nextGuessHandler = (direction) => {
    //direction =>'lower','higher'
    if (
      (direction === "lower" && guess < userNumber) ||
      (direction === "greater" && guess > userNumber)
    ) {
      Alert.alert("Don't lie ", "You know this is wrong..", [
        {
          text: "sorry",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = guess;
    } else {
      minBoundary = guess + 1;
    }
    const newRndNumber = genrateRandomBetween(minBoundary, maxBoundary, guess);
    setGuess(newRndNumber);
    setGuessRounds((preVstate) => [newRndNumber, ...preVstate]);
  };
  const guessRoundListLength = guessRounds.length;
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{guess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher Or Lower
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={23} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={23} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound=><Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  listContainer:{
    flex:1,
    padding:16,
  }
});
