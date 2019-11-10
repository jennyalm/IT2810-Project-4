import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating'
import {AsyncStorage} from 'react-native';
import axios from 'axios';




//props.onPress(props.title, props.plot, props.genre, props.poster, 3)

const Movie = (props) => {

    // define hook states
    const [rating, setRating] = useState(0);
    const [canGiveRating, setCanGiveRating] = useState(true);
    const [ButtonColor, setButtonColor] = useState('grey')

    // calculates the average rating
    const averageRating = arr => parseFloat(arr.reduce((p,c) => p + c, 0) / (arr.length)).toFixed(1);


    // const onStarRatingPress = (nextValue, prevValue, name) => {
    //
    //     const content = {
    //         "rating": nextValue
    //     }
    //
    //
    //
    //     setRating(nextValue);
    //     console.log("Rating: " + nextValue)
    //
    //     if (!(_retrieveData() === props.title)){
    //
    //         setCanGiveRating(false);
    //
    //     // put the content in the database
    //     // it finds the movie in the database with imdbID then places the rating under Rating which is an array.
    //     axios.put("http://it2810-13.idi.ntnu.no:4000/movies/" + props.imdbID, content)
    //     console.log("http://it2810-13.idi.ntnu.no:4000/movies/" + props.imdbID)
    //
    //
    //     _storeData()
    //
    //     }
    // }

    const _storeData = async () => {
        try {
            console.log('gikk!')
            await AsyncStorage.setItem(props.imdbID, props.title);
        } catch (error) {
            // Error saving data
        }
    };

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem(props.imdbID);
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };



    return(
        <View style={styles.wrap}>
            <View style={styles.movieStyle} >
                <TouchableHighlight
                    onPress={() => props.onPress(props.title, props.plot, props.genre, props.poster, averageRating(props.allRatings))}
                >
                <Image
                    style={styles.posterStyle}
                    source={{uri: props.poster}}
                    //onPress={() => props.onPress(AverageRating(props.rating))}
                    />
                </TouchableHighlight>
                <View style={styles.text}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.year}>({props.year})</Text>

                </View>

            </View>

            <View style={styles.rating}>
                <StarRating
                    // name={props.title} /* name of the radio input, it is required */
                    emptyStar={'star'}
                    maxStars={5}
                    rating={Math.floor(averageRating(props.allRatings))}
                    //selectedStar={(rating) => onStarRatingPress(rating)}
                    emptyStarColor={'grey'}
                    fullStarColor={'#ffd500'}
                    disabled={true}
                    starSize={40}
                    //editing={CanGiveRating}

                />

                <Icon
                    size={40}
                    name="heart"
                    type='font-awesome'
                    reverse={ false}
                    color= {ButtonColor}
                    iconstyle={styles.heart}
                    onPress={() => {
                        console.log(_storeData())
                        console.log(_retrieveData())
                        if(ButtonColor === "red"){
                            setButtonColor('grey');
                        }
                        else{
                            setButtonColor('red');
                        }
                    }}
                />


            </View>

            <Text>{'\n'}</Text>

            {!canGiveRating ?
                <Text style={{color: 'white', textAlign: 'center'}}>Average rating: {averageRating(props.allRatings)}</Text>
                : null
            }

            <Text>{'\n\n\n'}</Text>

        </View>

    )
}

const styles = StyleSheet.create({
    movieStyle: {
        paddingBottom: 40,
        alignItems: 'center',
    },
    posterStyle: {
        // alignItems: 'stretch',
        width: 262.5,
        height: 450,
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
    rating:{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    heart:{
        borderColor: '#f50'
    },

});

export default Movie
