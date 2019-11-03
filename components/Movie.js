import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image } from 'react-native';

const Movie = (props) => {
    return(
        <View style={styles.movieStyle} >
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.year}>({props.year})</Text>
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