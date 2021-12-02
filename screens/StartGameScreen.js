import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';

import Colors from "../constants/Colors";

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input style={styles.input} blurOnSubmit autoCapitalize="none" autoCorrect={false} keyboardType="number-pad" maxLength={2} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button color={Colors.secondary} title="Reset" onPress={() => { }} /></View>
                    <View style={styles.button}><Button color={Colors.primary} title="Confirm" onPress={() => { }} /></View>
                </View>
            </Card>
        </View>
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
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100,
    },
    input: {
        width: 50,
        textAlign: 'center'
    }
});


export default StartGameScreen;