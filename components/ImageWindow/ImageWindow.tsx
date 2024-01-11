import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import React, { useState } from 'react';
import {Icon} from '@rneui/base';
import Carousal from '../ImageCarousal/Carousal';
import {useNavigation} from '@react-navigation/native';

const ImageWindow = ({imageArray}:any) => {
  const navigation = useNavigation();
  return (
    <View style={style.image}>
      <View>
        <Carousal imageArray={imageArray}/>
      </View>
      <View style={style.backArrow}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home' as any as never);
          }}>
          <Icon name="leftcircle" type="antdesign" color="#ffffff" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'90%'
  },
});

export default ImageWindow;
