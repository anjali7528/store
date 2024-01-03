import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button, Card, Icon} from '@rneui/base';
import {Text} from '@rneui/themed';
import UploadImgBottomsheet from '../UploadImgBottomsheet/UploadImgBottomsheet';
import ConfirmBottomSheet from '../ConfirmImageUploadBottomsheet/ConfirmBottomSheet';

const DetailCard = () => {
  const [isBottomsheetVisible, setBottomsheetVisible] = useState(false);
  const [isConfirmBSVisible, setConfirmBSVisible] = useState(false);
  const [singleFile, setSingleFile] = useState({});

  return (
    <Card containerStyle={style.textContainer}>
      <View style={style.header}>
        <Text
          h4
          h4Style={style.headingStyle}
          numberOfLines={1}
          ellipsizeMode="tail">
          Auto Emporium
        </Text>
        <View style={style.paymentOption}>
          <Icon type="antdesign" name="checkcircle" color="#4ec747" />
          <Text>Online Payment </Text>
        </View>
      </View>
      <View style={style.subtitleInfo}>
        <Text style={style.subtitleText}> Automotive| Wholesale</Text>
      </View>
      <View>
        <Card.Divider />
        <Text style={style.locationText}>About</Text>
        <Text style={style.discription}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam eaque
          vero, minus amet magni modi maiores neque, officiis repudiandae sed
          eveniet similique fuga nam aspernatur sit iusto doloribus maxime
          dignissimos!
        </Text>
      </View>
      <View style={style.contactBox}>
        <Card.Divider />
        <Text style={style.locationText}> Location and Contact</Text>
        <View style={style.openTill}>
          <Icon type="material" name="access-time" />
          <Text>Open Till 10:30 pm</Text>
        </View>
        <View style={style.openTill}>
          <Icon type="entypo" name="location" />
          <Text>456 Car Avenue, Auto City</Text>
        </View>
        <View style={style.openTill}>
          <Icon type="ionicons" name="call" />
          <Text>98635817374</Text>
        </View>
        <View style={style.openTill}>
          <Icon type="fontisto" name="email" />
          <Text>autoep@gmail.com</Text>
        </View>
      </View>
      <View style={style.contactBox}>
        <Card.Divider />
        <Text style={style.locationText}>Features</Text>
        <View style={style.featureTextBox}>
          <Text style={style.featureText}>{'\u25CF Parking Avalable'}</Text>
          <Text style={style.featureText}>{'\u25CF Home Delivery'}</Text>
          <Text style={style.featureText}>
            {'\u25CF Deals in selling and purchasing of new cars also'}
          </Text>
        </View>
      </View>

      <View style={style.btnView}>
        <Button
          title="Add Image"
          buttonStyle={style.btn}
          containerStyle={style.btnContainer}
          icon={{
            name: 'plus',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          iconContainerStyle={{marginRight: 10}}
          titleStyle={{fontWeight: '700'}}
          onPress={() => setBottomsheetVisible(true)}
        />
      </View>
      {isBottomsheetVisible && (
        <UploadImgBottomsheet
          isVisible={isBottomsheetVisible}
          setIsVisible={setBottomsheetVisible}
          setConfirmBS={setConfirmBSVisible}
          setSingleFile={setSingleFile}
        />
      )}
      {isConfirmBSVisible && Object.keys(singleFile).length !== 0 && (
        <ConfirmBottomSheet
          file={singleFile}
          setBottomsheetClose={setConfirmBSVisible}
          isVisible={isConfirmBSVisible}
        />
      )}
    </Card>
  );
};

const style = StyleSheet.create({
  textContainer: {
    position: 'relative',
    top: '-6%',
    borderRadius: 10,
    zIndex: 1,
    backgroundColor: '#ffffff',
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentOption: {
    flexDirection: 'row',
    columnGap: 7,
    alignItems: 'center',
    width: 90,
    justifyContent: 'center',
    top: 10,
  },
  headingStyle: {
    fontWeight: '800',
    color: '#2F4F4F',
  },
  subtitleInfo: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#808080',
  },
  openTill: {
    flexDirection: 'row',
    columnGap: 7,
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  contactBox: {
    marginTop: 10,
  },
  discription: {
    textAlign: 'justify',
  },
  featureTextBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  featureText: {
    marginRight: 24,
    textAlign: 'justify',
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  btn:{
    backgroundColor: '#2E8B57',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  },
  btnContainer:{
    width: 200,
  },
});

export default DetailCard;
