import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View, TextInput, Image } from 'react-native';
import {Modal} from 'react-native'

import Movie from './Movie'
 //import Image from "react-native-web/dist/exports/Image";

function FetchMovies(props) {



const [show, setShow] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false)


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


// const CallPopup = (t, p, g, po, a, i) => {
//     setShow(!show);
//     setTitle(t);
//     setPlot(p);
//     setGenre(g);
//     setPoster(po);
//     setAverage(a);
//     //setImdbID(i);
// }

const myStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: "100%",
    width: "100%",

};
const containerStyle = {
    background: "black",
    width: "80%",
    height: "100%",
    textAlign: "center",
    display: "flex",
    alignContent: "center",
    position: "absolute",
    top: "-5%",
    left: "10%"
}


const moviesList = {
        title: "The Basics - Networking",
        description: "Your app fetched this from a remote endpoint!",
        movies: [
                    { "id": "1", "title": "Star Wars", "releaseYear": "1977", "poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
                    { "id": "2", "title": "Back to the Future", "releaseYear": "1985", "poster": "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},
                    { "id": "3", "title": "The Matrix", "releaseYear": "1999", "poster": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
                    { "id": "4", "title": "Inception", "releaseYear": "2010", "poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
                    { "id": "5", "title": "Interstellar", "releaseYear": "2014", "poster": "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" }
                ]
        }



//const FetchMovies = (props) => {

     const [movies, setMovies] = useState({})
    // const [loading, setLoading] = useState(true)
     const debouncedSearchTerm = useDebounce(props.url, 500);
    //
    //
    // useEffect(() => {
    //     if(debouncedSearchTerm){
    //         setLoading(true)
    //         console.log(props.url)
    //         fetch(props.url)
    //             .then((response) => response.json())
    //             .then((responseJson) => {
    //                 setLoading(false);
    //                 setMovies(responseJson.docs);
    //             })
    //     } else {
    //         setMovies([])
    //     }
    // },[debouncedSearchTerm]);


    const DisplayMovies = (moviesList.movies).map((movie, index) => (
                    <Movie
                        onPress={(average) => toggleModal(movie.title, movie.poster, average)}
                        key={index}
                        movie={movie}
                        title={movie.title}
                        year={movie.releaseYear}
                        poster={movie.poster}
                        rating={average}

                    />
                ))

    return(

        <View className="contrainer">

            <Modal
                visible={isModalVisible}
                style={styles.containerStyle}
                containerStyle={containerStyle}
            >

                <View >
                    <Text >{title}</Text>
                    <Text>Plot: {plot}</Text>
                    <Text>Genre: {genre}</Text>
                    <Text>Average rating: {average}</Text>
                    <Image
                        //alt={`The movie titled: ${title}`}
                        source={{uri: poster}}
                       // className="Poster"
                    />
                    <Button  title= {''} onPress={() => setIsModalVisible(false)}>Close</Button>
                </View>

            </Modal>

            {props.movies.length ? null : <Text style={styles.noResult}>Found no results</Text>}
            <View className={"movies"}>
                {props.movies.length ? DisplayMovies : null}
            </View>
        </View>






       // <View style={{marginTop: 20}}>{displayMovies}</View>
    )
//}

}


const styles = StyleSheet.create({
    noResult: {
        color: "red",
        alignItems: 'center',
    },
    containerStyle: {
        backgroundColor: "black",
        width: "80%",
        height: "100%",
        textAlign: "center",
        display: "flex",
        alignContent: "center",
        position: "absolute",
        top: "-5%",
        left: "10%",
    },
    myStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        height: "100%",
        width: "100%",
    },

});

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


/* 

.map((movie, index) => (
                <div key={movie._id} >
                    <Movie 
                        onClick={(average) => callPopup(movie.Title, movie.Plot, movie.Genre, movie.Poster, average)} 
                        key={movie._id} 
                        movie={movie}
                        imdbID = {movie.imdbID} 
                        />
                </div>
            )
        )

*/