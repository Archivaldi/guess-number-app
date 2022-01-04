import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AntDesign } from '@expo/vector-icons';

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import DefaultStyles from "../constants/default-styles";
import BodyText from '../components/BodyText';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    )
}

const GameScreen = props => {

    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    console.log(ScreenOrientation.getOrientationAsync())

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceHeigth, setAvailableDeviceHeigth] = useState(Dimensions.get('window').heigth);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width)
            setAvailableDeviceHeigth(Dimensions.get('window').height)
        }
        const subscription = Dimensions.addEventListener('change', updateLayout);

        return () => {
            if (subscription){
                subscription.remove();
            } else {
                Dimensions.removeEventListener('change', updateLayout);
            }
        }
    }, [Dimensions])

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: "Sorry!", style: "cancel" }]);
            return;
        }
        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else if (direction === "greater") {
            currentLow.current = currentGuess + 1;
        };
        //setRounds(curRound => curRound + 1)
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }

    let listContainerStyle = styles.listContainer;
    if (availableDeviceWidth < 350){
        listContainerStyle = styles.listContainerBig;
    }

    if (availableDeviceHeigth < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.bodyText}>Opponent's guess: </Text>
                <View style={styles.contolContainer}>
                    <MainButton onPress={() => { nextGuessHandler('lower') }}>
                        <AntDesign name='arrowdown' size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={() => { nextGuessHandler('greater') }}>
                        <AntDesign name='arrowup' size={24} color="white" />
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                    <FlatList contentContainerStyle={styles.list} keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's guess: </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => { nextGuessHandler('lower') }}>
                    <AntDesign name='arrowdown' size={24} color="white" />
                </MainButton>
                <MainButton onPress={() => { nextGuessHandler('greater') }}>
                    <AntDesign name='arrowup' size={24} color="white" />
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList contentContainerStyle={styles.list} keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    contolContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    },  
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: screenHeight > 600 ? 20 : 5,
        width: 300,
        maxWidth: "80%"
    },
    listContainer: {
        flex: 1,
        width: '80%'
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%"
    }
});

export default GameScreen;