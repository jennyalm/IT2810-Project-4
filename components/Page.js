import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';


const Page = (props) => {

    //const [page, setPage] = useState(1)

    const handleChangePage = (increment) => {
        if((props.page === 1 && increment === -1) || (props.page === props.pages && increment === 1)){
           props.setPage(props.page)
           //props.setPage(props.page) 
        }
        else{
            //setPage(props.page + increment)
            props.setPage(props.page + increment)
        }
    }

    return(
        <View>
            {/* <Icon raised name="arrow-left" size={30} color="white" onPress={() => handleChangePage(-1)} />
            <Text style={{color: 'white'}}>{page}</Text>
            <Icon raised name="arrow-right" size={30} color="white" onPress={() => handleChangePage(-1)} /> */}
            <View><Text style={{color: 'white', textAlign: 'center'}}>{props.page}/{props.pages}</Text></View>
            <View style={styles.buttonContainer}>
                <Button type="clear" title=" prev" onPress={() => handleChangePage(-1)} icon={<Icon name="arrow-left" size={20} color="#348FD5" />}/>
                <Button type="clear" title="next " onPress={() => handleChangePage(1)} icon={<Icon name="arrow-right" size={20} color="#348FD5" />} iconRight/>
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
