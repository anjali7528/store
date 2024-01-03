import {View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import React from 'react';
import {BottomSheet, Text} from '@rneui/themed';
import {Card, Icon, Image} from '@rneui/base';

interface IConfirmBSVisible {
  file: any;
  setBottomsheetClose: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
}

const ConfirmBottomSheet = ({
  file,
  setBottomsheetClose,
  isVisible,
}: IConfirmBSVisible) => {
  const uploadImage = async () => {
    // Check if any file is selected or not
    if (file.uri != null) {
      // If file selected then create FormData
      const fileToUpload = file.uri;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);

      let res = await fetch('', {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      });
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        ToastAndroid.show('Image Uploaded successfully!', ToastAndroid.SHORT);
        setBottomsheetClose(false);
      }
    } else {
      // If no file selected the show alert
      ToastAndroid.show('Error Occured', ToastAndroid.SHORT);
    }
  };

  return (
    <View>
      <BottomSheet isVisible={isVisible}>
        <View style={style.container}>
          <View style={style.headerFlex}>
            <Text h4 style={style.header}>
              Confirm Upload
            </Text>
            <TouchableOpacity
              style={style.crossFlex}
              onPress={() => setBottomsheetClose(false)}>
              <Icon type="entypo" name="cross" color="#ff0000" />
            </TouchableOpacity>
          </View>
          <View style={style.imageView}>
            <Image
              style={style.imageStyle}
              resizeMode="cover"
              source={{uri: file.uri}}
            />
            <Text
              style={style.testStyle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {JSON.stringify(file.name) || JSON.stringify(file.fileName)}
            </Text>
          </View>
          <View style={style.optionContainer}>
            <TouchableOpacity
              style={style.galleryContainer}
              onPress={uploadImage}>
              <Icon type="entypo" name="upload" />
              <Text>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  optionContainer: {
    flexDirection: 'row',
  },
  galleryContainer: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  crossFlex: {
    flex: 0.1,
    width: 20,
    padding: 10,
  },
  header: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 40,
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  testStyle: {
    textAlign: 'justify',
    marginHorizontal: 10,
    paddingHorizontal: 20,
    marginTop: 8,
  },
});

export default ConfirmBottomSheet;
