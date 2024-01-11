import {View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import React from 'react';
import {BottomSheet, Text} from '@rneui/themed';
import {Card, Icon, Image} from '@rneui/base';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { updateData } from '../../firebase/controllers';

interface IConfirmBSVisible {
  file: Record<string, any>;
  setBottomsheetClose: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  name:string,
  setRender:React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmBottomSheet = ({
  file,
  setBottomsheetClose,
  isVisible,
  name,
  setRender
}: IConfirmBSVisible) => {
  const uploadImage = async () => {
    if (file.uri != null) {
      const fileToUpload = file.uri;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      console.log(file);
      await uploadImagetoDB(file?.uri);
    } else {
      ToastAndroid.show('Error Occured', ToastAndroid.SHORT);
    }
  };

  const uploadImagetoDB = async (uri: any) => {

    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const blob:Blob = await new Promise((resolve, rej) =>{
      const xhr = new XMLHttpRequest();
      xhr.onload = () =>{
        resolve(xhr.response)
      }
      xhr.onerror =( e) =>{
        rej("error")
      }
      xhr.responseType = 'blob'
      xhr.open('GET', uri, true);
      xhr.send(null);
    })
    
    const storage = getStorage();
    const storageRef = ref(storage, `images/${filename}`);
    const metadata = {
      contentType: 'image/jpeg',
    }
    uploadBytes(storageRef, blob, metadata)
      .then(snapshot => {
        console.log(`Upload is done`);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });

    await getDownloadURL(ref(storage, `images/${filename}`)).then(
      (url: any) => {
         updateData(name,url)
         setBottomsheetClose(false);
         setRender(true);
      },
    );
    // Store the download URL in the Realtime Database or wherever you need it
    // storeDownloadURL(downloadURL);
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
