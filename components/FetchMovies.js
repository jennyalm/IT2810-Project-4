import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';

import Movie from './Movie'

const FetchMovies = (props) => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

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

    return(
        <View>
            {loading ? <View style={{alignItems: 'center'}}><Text style={{color: 'white'}}>Loading...</Text></View> : 
            movies.map(movie => (
                <Movie 
                    key={movie.imdbID} 
                    title={movie.Title} 
                    year={movie.Year} 
                    poster={movie.Poster}
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