import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, AsyncStorage} from 'react-native';
import Search from './components/Search';
import Header from './components/Header'
import FetchMovies from './components/FetchMovies'
import Page from './components/Page'


const  App = () => {

  // define hook states
  const [page, setPage] = useState(1)
  const [url, setUrl] = useState("http://it2810-13.idi.ntnu.no:4000/movies?title=&order=-1&sort=Year&page=1")
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(1)

  const [prevSearch, setPrev] = useState("loading");

  useEffect(() => {
    // code to run on component mount
    console.log("useEffect")
    async function prev() {
      try {
        const value = await AsyncStorage.getItem("searches");
        if (value !== null) {
          console.log("value: " + value);
          setPrev(JSON.stringify(value));
        } else {
          setPrev("")
        }
      } catch (error) {
      }
    }
    prev()

  }, [])


  // this will be executed from Search.js and will set the local state Url. 
  // When the url state changes it will fetch new movies from FetchMovies with useEffect since url is given as props.
  // we also set page to 1 when a new search or option/filter is selected. 
  const handleOptionChanges = async (search, orderBy, sortBy, filterBy) => {
    setPage(1)
    setUrl("http://it2810-13.idi.ntnu.no:4000/movies?title="+search+"&order="+orderBy+"&sort="+sortBy+"&page=1&genre="+filterBy)
    let newHistory;
    try {
      const value = await AsyncStorage.getItem("searches");
      if (value !== null) {
        console.log(value);
        setPrev(JSON.stringify(value));
      } else {
        setPrev("empty")
      }
    } catch (error) {
    }

    try {
      await AsyncStorage.setItem("searches", search);
    } catch (error) {
      // Error saving data
    }
  }

  // When navigating to a new page, we update the url, which then runs FetchMovies useEffect, since again the url is given as props.
  const handlePageChange = (p) => {
    setUrl(url.replace("page="+page,"page="+p));
    setPage(p)
  }
  

  return (

    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
      <Search handleOptionChanges={handleOptionChanges}/>
        {prevSearch ? <Text style={{color: "white", textAlign: 'center'}}>Previous search: {prevSearch}</Text> : null }

        <View style={styles.innerView}>
          <FetchMovies url={url} setPages={setPages} setTotal={setTotal}/>
          {total === 0 ? null : <Page setPage={handlePageChange} page={page} pages={pages}/>}
        </View>

      </ScrollView>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //alignItems: 'stretch',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 0,
  },
  innerView: {
    alignItems: 'center',
    paddingTop: 20,
    maxWidth: 400
  },
});

export default App
