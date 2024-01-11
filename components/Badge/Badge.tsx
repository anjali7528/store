import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import {Button, Icon} from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

interface IBadgeIcon {
  icon?: string;
  text?: String;
  type?: string;
  onPressFun?: React.Dispatch<React.SetStateAction<Boolean>>
  onPressCommand ?:any,
}

const Badge = ({icon, text, type, onPressFun, onPressCommand}: IBadgeIcon) => {
    const navigation = useNavigation();
    const [activateCross, setActivateCross] = useState(false);

   const setPress = () => {  
    onPressCommand(text)
    setActivateCross(true);
   }

   const reset = () =>{
    onPressCommand('reset')
    setActivateCross(false);
   }

  return (
    <TouchableOpacity
      style={[
        style.container,
        icon ? style.iconContainer : style.textContainer,
        
      ]}
      onPress={() =>{ onPressFun ?  onPressFun(true) : setPress()}}
      >
      {icon && <Icon color="#FFFFED" name={icon} type={type} ></Icon>}
      {text && <Text style={style.text}> {text} </Text>}
      {text && activateCross && <Icon color="#FF0000" name='cross' type='entypo' onPress={()=> reset()}></Icon>}
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

export default Badge;
