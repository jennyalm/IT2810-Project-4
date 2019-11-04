import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating'
import axios from 'axios';

const Movie = (props) => {

    const [rating, setRating] = useState(0);
    const [CanGiveRating, setcanGiveRating] = useState(true);
    const [ButtonColor, setButtonColor] = useState('grey')


    const OnStarClick = (nextValue, prevValue, name) => {

        const Content = {
            "Rating": nextValue
        }

        // can't give rating to the same movie twice, hence canGiveRating
        setRating(nextValue)
        setcanGiveRating(false)
        console.log("Rating: " + nextValue)


        // put the content in the database
        // it finds the movie in the database with imdbID then places the rating under Rating which is an array.
       // axios.put("http://it2810-13.idi.ntnu.no:4000/movies/" + props.id, content)
       // console.log("http://it2810-13.idi.ntnu.no:4000/movies/" + props.id)
    }

    const onStarRatingPress = (rating) => {

        setRating(rating);
    }






    const AverageRating = arr => parseFloat(arr.reduce((p,c) => p + c, 0) / (arr.length)).toFixed(1);


    return(
        <View style={styles.wrap}>
        <View style={styles.movieStyle} >

            <Image style={styles.posterStyle}
                style={{width: 262.5, height: 450}}
                source={{uri: props.poster}}
                   //onPress={() => props.onPress(AverageRating(props.rating))}
            />

            <View style={styles.text}>
                <Text
                    style={{color: 'white', fontSize: 30}}
                    onPress={() => props.onPress(3)}
                >{props.title} ({props.year})</Text>
            </View>

        </View>

            <View style={styles.rating}>
            <StarRating
               // name={props.title} /* name of the radio input, it is required */
                emptyStar={'star'}
                maxStars={5}
                rating={rating}
                selectedStar={(rating) => onStarRatingPress(rating)}
                emptyStarColor={'grey'}
                fullStarColor={"yellow"}
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
                        if(ButtonColor === "red"){
                            setButtonColor('grey');
                        }
                        else{
                            setButtonColor('red');
                        }
                    }}
                />

            {/*{!CanGiveRating ?*/}
                {/*<Text>Average rating: {AverageRating(3)}</Text>*/}
                {/*: null*/}
            {/*}*/}

            </View>

            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    movieStyle: {
        paddingBottom: 40,
        alignItems: 'center',
    },
    text:{
        flexDirection: 'row',
    },
    posterStyle: {
        alignItems: 'stretch',

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