import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Search from './components/Search';
import Header from './components/Header'
import FetchMovies from './components/FetchMovies'
import Page from './components/Page'

const  App = () => {

  const [page, setPage] = useState(1)
  const [url, setUrl] = useState("http://it2810-13.idi.ntnu.no:4000/movies?title=&order=-1&sort=Year&page=1")
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(1)

  const handleOptionChanges = (search, orderBy, sortBy, filterBy) => {
    setPage(1)
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
    maxWidth: 400
  },
});

export default App