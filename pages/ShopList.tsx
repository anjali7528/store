import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import Search from '../components/Search/Search';
import BadgeIcon from '../components/Badge/Badge';
import ItemCard from '../components/ItemCard/ItemCard';
import {ShopData} from './Data';
import {ScreenHeight} from '@rneui/base';
import Header from '../components/Header/Header';
const FliterData = [
  {
    id: '1',
    icon: 'filter',
    type: 'font-awesome',
  },
  {
    id: '2',
    text: 'Closest',
  },
  {
    id: '4',
    text: 'Category',
  },
  {
    id: '6',
    text: 'Route',
  },
  {
    id: '8',
    text: 'delivery',
  },
];

interface IShopList{
  navigation?:any
}

const ShopList = ({navigation}: IShopList) => {
  return (
    <View style={style.container}>
      <Header/>
      <View style={style.subContainer}>
        <FlatList
          style={{marginTop: 10, marginBottom:5}}
          data={FliterData}
          renderItem={({item}) =>
            item.icon ? (
              <View style={style.filterContainer}>
                <BadgeIcon icon={item.icon} type={item.type} />
              </View>
            ) : (
              <View style={style.filterContainer}>
                <BadgeIcon text={item.text} />
              </View>
            )
          }
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={ShopData}
        renderItem={({item}) => (
          <ItemCard
            image={item.image}
            name={item.name}
            category={item.category}
            type={item.type}
            address={item.address}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{minHeight: '100%', paddingHorizontal:10}}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    backgroundColor:"#F5F5F5"
  },
  filterContainer: {
    flexDirection: 'row',
    margin: 4,
  },
  subContainer:{
    paddingHorizontal:10,
    marginBottom:10,
  }
});

export default ShopList;
