import { TextInput, View, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/UI/PrimaryButton";
import { useState } from "react";
import Colors from "../Constants/colors";
import Title from "../components/UI/Title";
import Card from "../components/UI/Card";
import InstructionText from "../components/UI/InstructionText";
const StartGameScreen = ({onPickNumber}) => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  };
  const resetInputHandler = () => {
    setEnteredNumber("");
  };
  const confirmHandler = () => {
    const choseNumber = parseInt(enteredNumber);
    if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
      Alert.alert(
        "Invalid Number!",
        "Number has to be a number between 1 to 99.",
        [{ text: "okay", style: "destructive", onPress: resetInputHandler  }]
      );
      return;
    }
    onPickNumber(choseNumber);
  };
  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
    <InstructionText>Enter a Number</InstructionText>
      <TextInput
        style={styles.textInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        value={enteredNumber}
        onChangeText={numberInputHandler}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
        </View>
      </View>
      </Card>
    </View>
  );
};
export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer:{
    flex:1,
    marginTop:100,
    alignItems:'center'
  },
 
  textInput: {
    height: 50,
    fontSize: 32,
    width: 50,
    textAlign: "center",
    borderBottomColor:Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    fontWeight: "bold",
    marginVertical: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
 
});
