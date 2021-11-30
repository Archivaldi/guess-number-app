import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#f7287b',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    headerTitle: {
        color: 'black',
        fontSize: 18
    }
});

export default Header;