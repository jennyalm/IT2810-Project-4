import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Search from './components/Search';
import Header from './components/Header'
import FetchMovies from './components/FetchMovies'
import Page from './components/Page'

const  App = () => {

  const [page, setPage] = useState(1)
  const [url, setUrl] = useState("http://it2810-13.idi.ntnu.no:4000/movies?title=&order=-1&sort=Year&page=1")
  
  const handleOptionChanges = (search, orderBy, sortBy, filterBy) => {
    setUrl("http://it2810-13.idi.ntnu.no:4000/movies?title="+search+"&order="+orderBy+"&sort="+sortBy+"&page=1&genre="+filterBy)

  }

  const handlePageChange = (p) => {
      setUrl(url.replace("page="+page,"page="+p)); 
      setPage(p)
    }

  return (
    
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
      <Search handleOptionChanges={handleOptionChanges}/>
        <View style={styles.innerView}>
          <FetchMovies url={url}/>
          <Page setPage={handlePageChange}/>
        </View>

      </ScrollView>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 0,
  },
  innerView: {
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default App