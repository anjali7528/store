import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useState} from 'react';
import {SearchBar} from '@rneui/base';
import { ShopData } from '../../pages/Data';

interface ISearch{
  onChange:(value:string) => void
}

const Search = ({onChange}:ISearch) => {
  const [search, setSearch] = useState('');

  return (
    <View>
      <SearchBar
        placeholder="Search Stores"
        onChangeText={(value)=>{
          onChange(value) 
          setSearch(value)}}
        value={search}
        round
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
