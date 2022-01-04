import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

import Colors from "../constants/Colors";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const GameOverScreen = props => {
    const [availableDeviceHeigth, setAvailableDeviceHeigth] = useState(Dimensions.get('window').height);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeigth(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    return (
            <ScrollView>
                <View style={styles.screen}>
                    <TitleText>The Game Is Over!</TitleText>
                    <View style={{
                        borderRadius: availableDeviceWidth * 0.7 / 2,
                        borderWidth: 3,
                        borderColor: 'black',
                        width: availableDeviceWidth * 0.7,
                        height: availableDeviceWidth * 0.7,
                        overflow: 'hidden',
                        marginVertical: availableDeviceHeigth / 30
                    }}>
                        <Image fadeDuration={1000} style={styles.image} source={require('../assets/Images/success.png')} />
                    </View>
                    <View style={{
                        marginHorizontal: 30,
                        marginVertical: availableDeviceHeigth / 60
                    }}>
                        <BodyText style={styles.resultsText}>You phone device needed{' '}
                            <Text style={styles.highlight}>{props.roundsNumber}</Text>
                            {" "}rounds to guess the number{' '}
                            <Text style={styles.highlight}>{props.userNumber}</Text>
                        </BodyText>
                    </View>
                    <MainButton onPress={() => { props.onConfigureNewGame() }}>NEW GAME</MainButton>
                </View>
            </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultsText: {
        textAlign: 'center',
        fontSize: screenHeight < 400 ? 16 : 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;