import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';

const Page = (props) => {

    const [page, setPage] = useState(1)

    const handleChangePage = (increment) => {
        if(page === 1 && increment === -1){
           setPage(page)
           props.setPage(page) 
        }
        else{
            setPage(page + increment)
            props.setPage(page + increment)
        }
    }

    return(
        <View style={styles.buttonContainer}>
            <Button title="prev" onPress={() => handleChangePage(-1)} />
            <Button title="next" onPress={() => handleChangePage(1)} />
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