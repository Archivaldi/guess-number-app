import React from "react";
import {View, Text, StyleSheet, Button, Image} from 'react-native';

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The game is over</TitleText>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/Images/success.png')} />
            </View>
            <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
            <BodyText>The correct number: {props.userNumber}</BodyText>
            <Button title='NEW GAME' onPress={() => {props.onConfigureNewGame()}}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    imageContainer: {
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        width: '80%',
        height: 300,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    }
});

export default GameOverScreen;