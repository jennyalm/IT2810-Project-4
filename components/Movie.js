import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image } from 'react-native';

const Movie = (props) => {
    return(
        <View style={styles.movieStyle} >
            <Text style={{color: 'white'}}>Title: {props.title}</Text>
            <Text style={{color: 'white'}}>Year: {props.year}</Text>
            <Image 
                style={{width: 350, height: 600}}
                source={{uri: props.poster}}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    movieStyle: {
      paddingBottom: 40,
      alignItems: 'center',
    },
  });

export default Movie