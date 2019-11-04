import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image, TouchableHighlight } from 'react-native';

const Movie = (props) => {
    return(
        <View style={styles.movieStyle} >
            <TouchableHighlight onPress={() => props.onPress(props.title, props.plot, props.genre, props.poster, 3)}>
                <Image 
                    style={{width: 262.5, height: 450}}
                    source={{uri: props.poster}}
                />
            </TouchableHighlight>
            <Text  style={styles.title}>{props.title}</Text>
            <Text style={styles.year}>({props.year})</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    movieStyle: {
      paddingBottom: 40,
      alignItems: 'center',
    },
    title: {
      letterSpacing: 2,
      color: 'white',
      fontSize: 20,
      textAlign: 'center'
      
    },
    year: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center'
    },
  });

export default Movie