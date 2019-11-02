import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Header = () => {
    return(
        <View style={styles.header}>
            <Image
                style={{ flex: 5, width: '15%', height: '15%', alignSelf: 'center',}}
                source={require('../assets/logo.png')}
            />
           <Text style={styles.text}></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#000000',
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