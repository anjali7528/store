import { View, StyleSheet } from 'react-native'
import React from 'react'
import Search from '../Search/Search'
import {Text} from '@rneui/themed';
import { Icon } from '@rneui/base';

const Header = () => {
  return (
    <View style={style.container}>
        <View style={style.headerInfo}>
        <Icon type="font-awesome-5" name="shopware" color='#ffffff'  />
      <Text style={style.headingStyle}>STORE</Text>
      <View style={{alignItems:'flex-end', flex:1}}>
      <Icon type="ionicons" name="person" color='#ffffff' style={{padding:10}}/> 
      </View>
        </View>
        <View>
        <Search />
        </View> 
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        backgroundColor:'#2E8B57',
        paddingHorizontal:10,
        paddingVertical:20,
    },
    headingStyle:{
       fontSize:24,
       fontWeight:'800',
       color:'#ffffff'
    },
    headerInfo:{
        flexDirection:'row',
        columnGap:12,
        alignItems:'center',
        marginBottom:10,
        width:'100%',
    }

}) 

export default Header