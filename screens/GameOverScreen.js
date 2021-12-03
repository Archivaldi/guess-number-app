import React from "react";
import {View, Text, StyleSheet, Button} from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The game is over</Text>
            <Text>Number of rounds: {props.roundsNumber}</Text>
            <Text>The correct number: {props.userNumber}</Text>
            <Button title='NEW GAME' onPress={() => {props.onConfigureNewGame()}}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;