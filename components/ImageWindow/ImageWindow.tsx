import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/base';
import Carousal from '../ImageCarousal/Carousal';

const ImageWindow = () => {
  return (
    <View style={style.image}>
        <View>
        <Carousal />
        </View>
      <TouchableOpacity style={style.backArrow}>
        <Icon name="leftcircle" type="antdesign" color="#ffffff" size={40} />
      </TouchableOpacity>
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
  },
});

export default ImageWindow;
