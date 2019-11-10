import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const Header = () => {
    return(
        <View style={styles.header}>
            <Image
                style={{ flex: 5, width: '15%', height: '15%', alignSelf: 'center',}}
                source={require('../assets/logo.png')}
            />
            {/* <Icon name="bar-chart-o" size={40} color="red" style={{position: 'absolute', top: 60, left: 300}}/> 
                if we want to implement a display advanced info, we would use this button. However advanced info was not needed in this exercise
            */}
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