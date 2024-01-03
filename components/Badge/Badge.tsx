import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';
import {Button, Icon} from '@rneui/base';

interface IBadgeIcon {
  icon?: string;
  text?: String;
  type?: string;
}

const BadgeIcon = ({icon, text, type}: IBadgeIcon) => {
  return (
    <TouchableOpacity
      style={[
        style.container,
        icon ? style.iconContainer : style.textContainer,
      ]}>
      {icon && <Icon color="#FFFFED" name={icon} type={type}></Icon>}
      {text && <Text style={style.text}> {text} </Text>}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    width: 'auto',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E8B57',
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: '#2E8B57',
  },
  textContainer: {
    backgroundColor: '#F6F6F6',
  },
});

export default BadgeIcon;
