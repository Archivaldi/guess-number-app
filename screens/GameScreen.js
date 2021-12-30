import React, {useState, useRef, useEffect} from "react";
import {View, Text, StyleSheet, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import DefaultStyles from "../constants/default-styles";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min))+min;
    if (rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};


const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1,100, props.userChoice));
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props

    useEffect(()=> {
        if (currentGuess === userChoice){
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
            Alert.alert("Don't lie!", "You know that this is wrong...", [{text: "Sorry!", style: "cancel"}]);
            return;
        } 
        if (direction === "lower"){
            currentHigh.current = currentGuess + 1;
        } else if (direction === "greater"){
            currentLow.current = currentGuess - 1;
        };
        setRounds(curRound => curRound + 1)
        setCurrentGuess(generateRandomBetween(currentLow.current, currentHigh.current, currentGuess));
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's guess: </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={()=>{nextGuessHandler('lower')}}>
                    <AntDesign name='arrowdown' size={24} color="white"/>
                </MainButton>
                <MainButton onPress={()=>{nextGuessHandler('greater')}}>
                    <AntDesign name='arrowup' size={24} color="white"/>
                </MainButton>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: "80%"
    }
});

export default GameScreen;