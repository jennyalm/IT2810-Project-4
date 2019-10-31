import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';

const Page = () => {
    return(
        <View style={styles.buttonContainer}>
            <Button title="prev" />
            <Button title="next" />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 40
        
    }
  });

export default Page