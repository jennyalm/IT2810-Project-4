import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const Search = (props) => {

    const [toggleOptions, setToggleOptions] = useState(false)

    const [selectedSort, setSelectedSort] = useState("yearAsc")

    const [searchText, setSearchText] = useState("")
    const [order, setOrder] = useState("-1")
    const [sort, setSort] = useState("Year")
    const [filter, setFilter] = useState("")

    // checks which option is selected and updates local states, and runs handleOptionChanges in App.
    // planned to have x equal a object with both order and sort, however this came with a few issues, 
    // so if we were to improve the app in the future we would probably fix this code and shorten it.
    const handleOptionChange = (x) => {
        if(x === "titleAsc"){
            props.handleOptionChanges(searchText, "1", "Title", filter)
            setOrder("1");
            setSort("title");
        }
        else if(x === "titleDesc"){
            props.handleOptionChanges(searchText, "-1", "Title", filter)
            setOrder("-1");
            setSort("title");
        }
        else if(x === "yearAsc"){
            props.handleOptionChanges(searchText, "-1", "Year", filter)
            setOrder("-1");
            setSort("year");
        }
        else if(x === "yearDesc"){
            props.handleOptionChanges(searchText, "1", "Year", filter)
            setOrder("1");
            setSort("year");
        }
        else{
            console.log("Something wrong with the chosen option")
        }
        setSelectedSort(x)

    }

    // updates the state filter and runs handleOptionChanges in App
    const handleFilterChange = (f) => {
        setFilter(f)
        props.handleOptionChanges(searchText, order, sort, f)
    }


    return (
        <View style={{width: 350}}>
            <SearchBar
                containerStyle={{backgroundColor: 'black', borderBottomColor: 'transparent', borderTopColor: 'transparent', paddingHorizontal: 0}}
                inputStyle={{color: 'white'}}
                placeholder="Search (e.g the hobbit)"
                onChangeText={text => setSearchText(text)}
                value={searchText}
                onSubmitEditing={() => props.handleOptionChanges(searchText, order, sort, filter)}
                returnKeyType='search'
            />
           
            { toggleOptions
                ? <Button title="Hide Option   " onPress={() => setToggleOptions(false)} type="outline" titleStyle={{color: 'grey'}} buttonStyle={{borderColor: 'red'}} icon={<Icon name="arrow-up" size={20} color="grey" />} iconRight/>
                : <Button title="Show Options   " onPress={() => setToggleOptions(true)} type="outline" titleStyle={{color: 'grey'}} buttonStyle={{borderColor: 'red'}} icon={<Icon name="arrow-down" size={20} color="grey" />} iconRight/>}
            { toggleOptions ?
                <View style={styles.optionContainer}>
                    <View style={styles.sortContainer}>
                        <View style={{alignItems: 'center'}}><Text style={{color: 'white'}}>Sort</Text></View>

                        <Picker
                            selectedValue={selectedSort}
                            onValueChange={(itemValue, itemIndex) => handleOptionChange(itemValue)}
                            itemStyle={{color: "white"}}
                            //style={{color: 'red'}}
                        >
                            <Picker.Item label="Year New-Old" color="white" value="yearAsc" />
                            <Picker.Item label="Year Old-New" color="white" value="yearDesc" />
                            <Picker.Item label="Title A-Z" color="white" value="titleAsc" />
                            <Picker.Item label="Title Z-A" color="white" value="titleDesc" />
                            
                        </Picker>
                    </View>
                    <View style={styles.filterContainer}>
                        <View style={{alignItems: 'center'}}><Text style={{color: 'white'}}>Filter</Text></View>
                        <Picker
                            selectedValue={filter}
                            onValueChange={(itemValue, itemIndex) => handleFilterChange(itemValue)}
                            itemStyle={{color: "white"}}
                        >
                            <Picker.Item label="No filter" value="" color="white" />
                            <Picker.Item label="Action" value="action" color="white" />
                            <Picker.Item label="Comedy" value="comedy" color="white" />
                            <Picker.Item label="Drama" value="drama" color="white" />
                            <Picker.Item label="Fantasy" value="fantasy" color="white" />
                            <Picker.Item label="Thriller" value="thriller" color="white" />
                        </Picker>
                    </View>
                </View>
                :
                null
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
        alignContent: 'center',
        backgroundColor: "#1c272b",
        paddingTop: 15,
        borderRadius: 5,

    },
    sortContainer: {
        width: 175,

    },
    filterContainer: {
        width: 175,

    },
});

export default Search

