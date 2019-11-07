import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, AsyncStorage} from 'react-native';
import { Button, Overlay } from 'react-native-elements'
import StarRating from 'react-native-star-rating'
import Movie from './Movie'
import axios from "axios";


const FetchMovies = (props) => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(1)
    //const [canGiveRating, setCanGiveRating] = useState(true);
    const [rating, setRating] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false)


    const debouncedSearchTerm = useDebounce(props.url, 500);

    const onStarRatingPress = (nextValue, prevValue, name) => {

        setRating(nextValue);
        //setCanGiveRating(false);
        console.log("Rating: " + nextValue)
    }

    const updateDB = (nextValue) => {
        const content = {
            "rating": nextValue
        }
        // put the content in the database
        // it finds the movie in the database with imdbID then places the rating under Rating which is an array.
        axios.put("http://it2810-13.idi.ntnu.no:4000/movies/" + imdbID, content)
        console.log("http://it2810-13.idi.ntnu.no:4000/movies/" + imdbID)

    }

    const press = () =>{
        setIsModalVisible(false);
        updateDB(rating);
        setRating(0);
        console.log("Rating etter popup lukket: " + rating)

    }

    // const _storeData = async () => {
    //     try {
    //         console.log('gikk!')
    //         await AsyncStorage.setItem(props.imdbID, props.title);
    //     } catch (error) {
    //         // Error saving data
    //     }
    // };
    //
    // const _retrieveData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem(props.imdbID);
    //         if (value !== null) {
    //             // We have data!!
    //             console.log(value);
    //         }
    //     } catch (error) {
    //         // Error retrieving data
    //     }
    // };


    useEffect(() => {
        if(debouncedSearchTerm){
            setLoading(true)
            console.log(props.url)
            fetch(props.url)
                .then((response) => response.json())
                .then((responseJson) => {
                    setLoading(false);
                    setMovies(responseJson.docs);
                    props.setPages(responseJson.pages);
                    props.setTotal(responseJson.total)
                    setTotal(responseJson.total)
                })
        } else {
            setMovies([])
            
        }
    },[debouncedSearchTerm]);

    // states to the modal/popup
    const [title, setTitle] = useState("");
    const [plot, setPlot] = useState("");
    const [genre, setGenre] = useState("");
    const [poster, setPoster] = useState("");
    const [average, setAverage] = useState("");
    const [imdbID, setImdbID] = useState("");
    // const [imdbID, setImdbID] = useState("");


    const toggleModal = (t,p,g,po,a,i) => {
        setIsModalVisible(true);
        setTitle(t);
        setPlot(p);
        setGenre(g);
        setPoster(po);
        setAverage(a);
        setImdbID(i);
    }

    const averageRating = arr => parseFloat(arr.reduce((p,c) => p + c, 0) / (arr.length)).toFixed(1);


    return(
        <View>
            <Overlay
                containerStyle={styles.overlay}
                overlayBackgroundColor="#2E2E2E"
                isVisible={isModalVisible}
                onBackdropPress={() => setIsModalVisible(false)}
            >
                <ScrollView>
                    <View style={{alignItems: 'stretch', flex: 1}}>
                        <Text style={{color: 'white',  fontSize: 30, textAlign: 'center', marginBottom: 10, letterSpacing: 2}}>{title}</Text>
                        <Text style={{color: 'white', textAlign: 'center', marginBottom: 5}}><Text style={{fontWeight: "bold"}}>Genre: </Text>{genre}</Text>

                        <Text style={{color: 'white', textAlign: 'center', marginBottom: 5}}><Text style={{fontWeight: "bold"}}>Give Rating: </Text></Text>
                        <View
                        style={{paddingLeft: 40, paddingRight:40}}
                        >
                            <StarRating
                                emptyStar={'star'}
                                maxStars={5}
                                rating={rating}
                                starSize={30}
                                fullStarColor={'#ffd500'}
                                //disabled={!canGiveRating}
                                selectedStar={(rating) => onStarRatingPress(rating)}
                            /></View>
                        <Text>{'\n'}</Text>
                        <Text style={{color: 'white', textAlign: 'center', marginBottom: 25, lineHeight: 20}}><Text style={{fontWeight: "bold"}}>Plot: </Text>{plot}</Text>
                        <Image style={{width: 175, height: 300, alignSelf: 'center'}} source={{uri: poster}}/>
                        <Button title="Hide modal" onPress={() => press()} buttonStyle={{backgroundColor: 'red'}} containerStyle={{marginTop: 10, flex: 1, justifyContent: 'flex-end', marginBottom: 10}} />
                    </View>
                </ScrollView>
            </Overlay>
            
            {total === 0 ? <Text style={{color: 'red'}}>No search results</Text> : <Text style={{color: 'white', textAlign: 'center', marginBottom: 10}}>Found {total} movies</Text>}
            {loading ? <View style={{alignItems: 'center'}}><Text style={{color: 'white'}}>Loading...</Text></View> : 
            movies.map(movie => (
                <Movie 
                    onPress={toggleModal}
                    key={movie.imdbID} 
                    title={movie.Title} 
                    year={movie.Year} 
                    poster={movie.Poster}
                    genre={movie.Genre}
                    plot={movie.Plot}
                    imdbID={movie.imdbID}
                    allRatings={movie.Rating}
                />
            ))}
            
        </View>
    )
}
// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci  NÅR JEG SKAL KOMMENTERE KODEN BRUK DENNE!!!!
export default FetchMovies

function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );
    return debouncedValue;
}



const styles = StyleSheet.create({
    modalStyle: {
        height: 50,
        width: 50,
        margin: 0,
        backgroundColor: 'transparent'
    },
    containerStyle: {
        backgroundColor: 'black',
        alignItems: 'center',
        flex: 1,
        padding: 50,
        borderRadius: 8,
        height: 50,
    },
    overlay: {
        flex: 1,
        height: 'auto'
    }
  });
