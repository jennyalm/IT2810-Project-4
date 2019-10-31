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

    //const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    
    
    
    
    
    const handleLoadContent = (jsonResponse) => {
        movies = jsonResponse
        console.log(movies)
    } 
    
    let movies = []

    useEffect(() => {
        fetch('http://it2810-13.idi.ntnu.no:4000/movies?title=&order=-1&sort=Year&page=1')
            .then((response) => response.json())
            .then((responseJson) => movies.push(responseJson))
            //.then((responseJson) => setMovies(responseJson))
            //.then(() => setLoading(false))
            .then(() => console.log(movies))
    },[])

    const fetchUrl = (url) => {
        fetch(url)
            .then(res => res.json())
            .then(jsonRes => movies = jsonRes)
    }

    const displayMovies = (movies).map((movie, index) => (
                     <Movie key={index} title={movie.Title} year={movie.Year} poster={movie.Poster}/>
                 ))

    return(
        <View>
            {console.log(movies)}
            {movies.length ? <View style={{marginTop: 20}}>{displayMovies}</View> : null}
        </View>
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