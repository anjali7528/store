import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useState} from 'react';
import {SearchBar} from '@rneui/base';

const Search = () => {
  const [search, setSearch] = useState('');

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <View>
      <SearchBar
        placeholder="Search Stores"
        onChangeText={updateSearch}
        value={search}
        round
        autoCorrect={false}
        containerStyle={styles.searchbar}
        inputContainerStyle={{backgroundColor:'#f5f5f5'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    margin: 0,
    padding: 0,
    backgroundColor:'#2E8B57',
    borderColor:'#2E8B57',
  },
});
export default Search;
