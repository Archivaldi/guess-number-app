import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/Colors';

const Header = props => {
    return (
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 50,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerAndroid:{
        backgroundColor: Colors.primary
    },
    headerTitle: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;