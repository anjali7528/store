import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button, Card, Icon} from '@rneui/base';
import {Text} from '@rneui/themed';
import UploadImgBottomsheet from '../UploadImgBottomsheet/UploadImgBottomsheet';
import ConfirmBottomSheet from '../ConfirmImageUploadBottomsheet/ConfirmBottomSheet';

const DetailCard = ({data, setRender}: any) => {
  const [isBottomsheetVisible, setBottomsheetVisible] = useState(false);
  const [isConfirmBSVisible, setConfirmBSVisible] = useState(false);
  const [singleFile, setSingleFile] = useState({});

  const {
    name,
    type,
    category,
    address,
    about,
    openTill,
    onlinePayments,
    phoneNumber,
    email,
    features,
  } = data;

  return (
    <Card containerStyle={style.textContainer}>
      <View style={style.header}>
        <Text
          h4
          h4Style={style.headingStyle}
          numberOfLines={1}
          ellipsizeMode="tail">
          {name}
        </Text>
        <View style={style.paymentOption}>
          <Icon
            type="antdesign"
            name={onlinePayments ? 'checkcircle' : 'closecircle'}
            color={onlinePayments ? '#4ec747' : '#ff0000'}
          />
          <Text>Online Payment </Text>
        </View>
      </View>
      <View style={style.subtitleInfo}>
        <Text style={style.subtitleText}>
          {' '}
          {category} | {type}
        </Text>
      </View>
      <View>
        <Card.Divider />
        <Text style={style.locationText}>About</Text>
        <Text style={style.discription}>{about}</Text>
      </View>
      <View style={style.contactBox}>
        <Card.Divider />
        <Text style={style.locationText}> Location and Contact</Text>
        <View style={style.openTill}>
          <Icon type="material" name="access-time" />
          <Text>Open Till {openTill}</Text>
        </View>
        <View style={style.openTill}>
          <Icon type="entypo" name="location" />
          <Text>{address}</Text>
        </View>
        <View style={style.openTill}>
          <Icon type="ionicons" name="call" />
          <Text>{phoneNumber}</Text>
        </View>
        <View style={style.openTill}>
          <Icon type="fontisto" name="email" />
          <Text>{email}</Text>
        </View>
      </View>
      <View style={style.contactBox}>
        <Card.Divider />
        <Text style={style.locationText}>Features</Text>
        <View style={style.featureTextBox}>
          {features?.map((feature: any, key:any) => (
            <Text style={style.featureText} key={key}>{`\u25CF ${feature}`}</Text>
          ))}
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
      <UploadImgBottomsheet
        isVisible={isBottomsheetVisible}
        setIsVisible={setBottomsheetVisible}
        setConfirmBS={setConfirmBSVisible}
        setSingleFile={setSingleFile}
      />
      {Object.keys(singleFile).length !== 0 && (
        <ConfirmBottomSheet
          file={singleFile}
          setBottomsheetClose={setConfirmBSVisible}
          isVisible={isConfirmBSVisible}
          name={name}
          setRender={setRender}
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
  btn: {
    backgroundColor: '#2E8B57',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  },
  btnContainer: {
    width: 200,
  },
});

export default DetailCard;
