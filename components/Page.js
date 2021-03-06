import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';


const Page = (props) => {

    // changes the page, and checks if the page-change is valid. Don't change to page zero or a page without content.
    const handleChangePage = (increment) => {
        if((props.page === 1 && increment === -1) || (props.page === props.pages && increment === 1)){
           props.setPage(props.page)
        }
        else{
            props.setPage(props.page + increment)
        }
    }

    return(
        <View>
            <View><Text style={{color: 'white', textAlign: 'center'}}>{props.page}/{props.pages}</Text></View>
            <View style={styles.buttonContainer}>
                <Button type="clear" title=" prev" titleStyle={{color: "red"}} onPress={() => handleChangePage(-1)} icon={<Icon name="arrow-left" size={20} color="red" />}/>
                <Button type="clear" title="next " titleStyle={{color: "red"}} onPress={() => handleChangePage(1)} icon={<Icon name="arrow-right" size={20} color="red" />} iconRight/>
            </View>
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
