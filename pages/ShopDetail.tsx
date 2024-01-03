import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import ImageWindow from '../components/ImageWindow/ImageWindow';
import {Button, Card} from '@rneui/base';
import DetailCard from '../components/DetailCard/DetailCard';
const ShopDetail = () => {
  return (
    <ScrollView style={style.outerContainer}>
      <View>
        <ImageWindow />
      </View>
      <View>
      <DetailCard/>
      </View>
      </ScrollView>
  );
};

const style = StyleSheet.create({
  outerContainer: {
    height: Dimensions.get('window').height,
    backgroundColor:"#f5f5f5"
  },
});

export default ShopDetail;
