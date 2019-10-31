import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';

import Movie from './Movie'

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



const FetchMovies = (props) => {

    const [movies, setMovies] = useState({})
    
    
    /* useEffect(() => {
        fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                setMovies(responseJson.movies)
            })
            
    }) */

    const displayMovies = (moviesList.movies).map((movie, index) => (
                    <Movie key={index} title={movie.title} year={movie.releaseYear} poster={movie.poster}/>
                ))

    return(
        <View style={{marginTop: 20}}>{displayMovies}</View>
    )
}

export default FetchMovies

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