import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
    return(
        <View style={styles.header}>
            <Text style={styles.text}>Group 13</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'black',
        paddingTop: 60,
        width: '100%',
        height: 100,
        
        
    },
    text: {
        letterSpacing: 5,
        color: 'white',
        fontSize: 20,
        alignSelf: 'center'
        

    },
  });

export default Header