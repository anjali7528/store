import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Card, Image} from '@rneui/base';
import {Text} from '@rneui/themed';

interface IItemCard {
  image: string;
  name: string;
  category: string;
  type: string;
  address: string;
  navigation:any
}

const ItemCard = ({image, name, category, type, address, navigation}: IItemCard) => {
  return (
    <Card containerStyle={style.upperContainer}>
      <View style={style.container}>
        <View style={style.image}>
          <Card.Image
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={style.info}>
          <Text
            h4
            h4Style={{fontWeight: '800', color: '#2F4F4F'}}
            numberOfLines={1}
            ellipsizeMode="tail">
            {name}
          </Text>
          <View style={style.subtitleInfo}>
            <Text style={style.subtitleText}> {category} | {type}</Text>
          </View>
          <Text
            style={style.locationText}
            numberOfLines={2}
            ellipsizeMode="tail">
            {address}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const style = StyleSheet.create({
  upperContainer: {
    padding: 0,
    borderRadius: 6,
    overflow: 'hidden',
    margin:0,
    marginBottom:10
  },
  container: {
    flexDirection: 'row',
    height: 110,
  },
  info: {
    flexDirection: 'column',
    padding: 10,
    flex: 1,
  },
  image: {
    width: '30%',
  },
  subtitleInfo: {
    marginBottom:5
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#808080',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#808080',
    margin: 5,
  },
});

export default ItemCard;
