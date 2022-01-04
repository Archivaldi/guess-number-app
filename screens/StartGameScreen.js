import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

import Colors from "../constants/Colors";

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [ buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width/4);

    const updateLayout = () => {
        setButtonWidth(Dimensions.get('window').width/4)
    };

    Dimensions.addEventListener('change', updateLayout);

    const numberInputHandler = text => {
        setEnteredValue(text.replace(/[^0-9]/g), '');
    };

    const resetImputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Number should be between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetImputHandler }])
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss()
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.numberConteiner}>
                <BodyText>You selected: </BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game!</Text>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input style={styles.input} blurOnSubmit autoCapitalize="none" autoCorrect={false} keyboardType="number-pad" maxLength={2} onChangeText={numberInputHandler} value={enteredValue} />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}><Button color={Colors.secondary} title="Reset" onPress={resetImputHandler} /></View>
                                <View style={{width: buttonWidth}}><Button color={Colors.primary} title="Confirm" onPress={confirmInputHandler} /></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     width: Dimensions.get('window').width / 4,
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    numberConteiner: {
        marginTop: 20,
        alignItems: 'center'
    }
});


export default StartGameScreen;