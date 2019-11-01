import React, {useState} from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';

const Search = (props) => {

    const [toggleOptions, setToggleOptions] = useState(false)
    
    const [searchText, setSearchText] = useState("")
    const [order, setOrder] = useState("-1")
    const [sort, setSort] = useState("Year")
    const [filter, setFilter] = useState("")

    const handleOptionChange = (o, s) => {
        setOrder(o)
        setSort(s)
        props.handleOptionChanges(searchText, o, s, filter)
    }

    const handleFilterChange = (f) => {
        setFilter(f)
        props.handleOptionChanges(searchText, order, sort, f)
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
                title="Search" 
                onPress={() => props.handleOptionChanges(searchText, order, sort, filter)} 
            />

            { toggleOptions ? <Button title="Hide Option" onPress={() => setToggleOptions(false)} /> : <Button title="Show Options" onPress={() => setToggleOptions(true)}/>}
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
                        <Button title="Action" onPress={() => handleFilterChange("action")} />
                        <Button title="Comedy" onPress={() => handleFilterChange("comedy")} />
                        <Button title="Drama" onPress={() => handleFilterChange("drama")} />
                        <Button title="Fantasy" onPress={() => handleFilterChange("fantasy")} />
                        <Button title="Thriller" onPress={() => handleFilterChange("thriller")} />
                    </View>
                </View>
                : 
                <View>
                    <Text style={{color: 'white'}} >Searched for: {searchText}</Text>
                    <Text style={{color: 'white'}} >Order: {order}</Text>
                    <Text style={{color: 'white'}} >Sort: {sort}</Text>
                    <Text style={{color: 'white'}} >Filter: {filter}</Text>
                </View>  
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
    optionContainer: {
        flex: 3,
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
