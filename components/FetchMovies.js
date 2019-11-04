import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Overlay } from 'react-native-elements'

import Movie from './Movie'

const FetchMovies = (props) => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    const [show, setShow] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false)


    const debouncedSearchTerm = useDebounce(props.url, 500);

    useEffect(() => {
        if(debouncedSearchTerm){
            setLoading(true)
            console.log(props.url)
            fetch(props.url)
                .then((response) => response.json())
                .then((responseJson) => {
                    setLoading(false);
                    setMovies(responseJson.docs);
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
    // const [imdbID, setImdbID] = useState("");


    const toggleModal = (t,p,g,po,a) => {
        setIsModalVisible(true);
        setTitle(t);
        setPlot(p);
        setGenre(g);
        setPoster(po);
        setAverage(a);
    }


    return(
        <View>
            <Overlay
                overlayBackgroundColor="#2E2E2E"
                isVisible={isModalVisible}
                onBackdropPress={() => setIsModalVisible(false)}
            >
                <View style={{alignItems: 'stretch'}}>
                    <Text style={{color: 'white',  fontSize: 20, textAlign: 'center'}}>Title: {title}</Text>
                    <Text>{"\n"}</Text>
                    <Text style={{color: 'white', textAlign: 'center'}}>Genre: {genre}</Text>
                    <Text style={{color: 'white', textAlign: 'center'}}>Average rating: {average}</Text>
                    <Text style={{color: 'white', textAlign: 'center'}}>Plot: {plot}</Text>
                    <Image style={{width: 175, height: 350, alignSelf: 'center'}} source={{uri: poster}}/>
                    <Button title="Hide modal" onPress={() => setIsModalVisible(false)} buttonStyle={{backgroundColor: 'red'}} />
                </View>
            </Overlay>


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
});
