import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import StarRating from 'react-native-star-rating'


const Movie = (props) => {

    // calculates the average rating
    const averageRating = arr => parseFloat(arr.reduce((p,c) => p + c, 0) / (arr.length)).toFixed(1);


    return(
        <View style={styles.wrap}>
            <View style={styles.movieStyle} >
                <TouchableHighlight
                    onPress={() => props.onPress(props.title, props.plot, props.genre, props.poster, averageRating(props.allRatings), props.imdbID)}
                >
                <Image
                    style={styles.posterStyle}
                    source={{uri: props.poster}}
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
                    rating={parseFloat(averageRating(props.allRatings))}
                    emptyStarColor={'grey'}
                    fullStarColor={'#ffd500'}
                    disabled={true}
                    starSize={30}
                />
            </View>
            <Text style={{color: 'grey', textAlign: 'center'}}>Average rating: {averageRating(props.allRatings)}</Text>
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
});

export default Movie
