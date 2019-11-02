import React, {useState} from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';


const Search = (props) => {

    const [searchText, setSearchText] = useState("")

    const [toggleOptions, setToggleOptions] = useState(false)

    const [order, setOrder] = useState("1")
    const [sort, setSort] = useState("Year")
    const [filter, setFilter] = useState("")

    const handleOptionChange = (o, s) => {
        setOrder(o)
        setSort(s)
    }

    const handleFilterChange = (f) => {
        setFilter(f)
    }


    return (
        <View>
            <TextInput 
                placeholder=" Search (e.g the hobbit)"
                style={styles.inputField}
                value={searchText} 
                onChangeText={text => setSearchText(text)} 
            />
            <Button
                style={styles.tekst}
                title="Search" 
                onPress={() => props.handleOptionChanges(searchText, order, sort, filter)} 
            />

            { toggleOptions ? <Button title="Hide Option" onPress={() => setToggleOptions(false)} /> : <Button style={styles.tekst} title="Show Options" onPress={() => setToggleOptions(true)}/>}
            { toggleOptions ? 
                <View style={styles.optionContainer}>
                    <View style={styles.sortContainer}>
                        <Button title="Title A-Z" onPress={() => handleOptionChange("1", "Title")} />
                        <Button title="Title Z-A" onPress={() => handleOptionChange("-1", "Title")} />
                        <Button title="New - Old" onPress={() => handleOptionChange("-1", "Year")} />
                        <Button title="Old - New" onPress={() => handleOptionChange("1", "Year")} />
                    </View>
                    <Text>{"\n"}</Text>
                    <View style={styles.filterContainer}>
                        <Button style={styles.tekst}title="Action" onPress={() => handleFilterChange("action")} />
                        <Button title="Comedy" onPress={() => handleFilterChange("comedy")} />
                        <Button title="Drama" onPress={() => handleFilterChange("drama")} />
                        <Button title="Fantasy" onPress={() => handleFilterChange("fantasy")} />
                        <Button title="Thriller" onPress={() => handleFilterChange("thriller")} />
                    </View>
                </View>
                : null  
            }            
        </View>
        
    );
}

const styles = StyleSheet.create({
    inputField: {
        height: 40,
        width: 350,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    tekst:{
        color: 'white'
    },
    optionContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center'
        
    },
    sortContainer: {
        width: 175
    },
    filterContainer: {
        width: 175
    },
  });

export default Search
