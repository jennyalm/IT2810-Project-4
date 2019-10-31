import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Search from './components/Search';
import Header from './components/Header'
import FetchMovies from './components/FetchMovies'
import Page from './components/Page'

const  App = () => {

  const [searchText, setSearchText] = useState(null)
  const [order, setOrder] = useState("1")
  const [sort, setSort] = useState("Year")
  const [filter, setFilter] = useState("")

  const handleOptionChanges = (search, order, sort, filter) => {
    setSearchText(search)
    setOrder(order)
    setSort(sort)
    setFilter(filter)
  }

  const [url, setUrl] = useState("http://it2810-13.idi.ntnu.no:4000/movies?title=&order=-1&sort=Year&page=1")


  return (
    
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerView}>
          <Search 
            handleOptionChanges={handleOptionChanges}
            />
            
          {searchText ? 
            <View>
              <Text style={{color: 'white'}} >Searched for: {searchText}</Text>
              <Text style={{color: 'white'}} >Order: {order}</Text>
              <Text style={{color: 'white'}} >Sort: {sort}</Text>
              <Text style={{color: 'white'}} >Filter: {filter}</Text>
            </View>
            : null}

            <FetchMovies movies={url}/>
            <Page />
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
    backgroundColor: '#2b3b41',
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 10,
  },
  innerView: {
    alignItems: 'center'
  },
});

export default App