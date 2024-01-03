import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {BottomSheet} from '@rneui/themed';
import {Card, Icon} from '@rneui/base';
import {Text} from '@rneui/themed';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';

interface IUploadImgBottomsheet {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmBS?: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleFile: React.Dispatch<React.SetStateAction<{}>>;
}

const UploadImgBottomsheet = ({
  isVisible,
  setIsVisible,
  setConfirmBS,
  setSingleFile,
}: IUploadImgBottomsheet) => {
  const selectFile = async () => {
    try {
      const documentPickerResult = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles, DocumentPicker.types.images],
      });
      console.log('res : ' + JSON.stringify(documentPickerResult));
      setSingleFile(documentPickerResult[0]);
      setIsVisible(false);
      if (setConfirmBS) setConfirmBS(true);
    } catch (err) {
      setSingleFile({});
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled');
      } else {
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const handleCameraLaunch = () => {
    let options = {};
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        let imageUri = response?.assets[0];
        setSingleFile(imageUri);
        console.log(response?.assets[0]);
        setIsVisible(false);
        if (setConfirmBS) setConfirmBS(true);
      }
    });
  };
  return (
    <View>
      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}>
        <View style={style.container}>
          <View style={style.headerFlex}>
            <Text h4 style={style.header}>
              Upload Photo{' '}
            </Text>
            <TouchableOpacity
              style={style.crossFlex}
              onPress={() => setIsVisible(false)}>
              <Icon type="entypo" name="cross" color="#ff0000" />
            </TouchableOpacity>
          </View>
          <View style={style.optionContainer}>
            <TouchableOpacity
              style={style.cameraContainer}
              onPress={handleCameraLaunch}>
              <Icon type="antdesign" name="camera" />
              <Text>Camera</Text>
            </TouchableOpacity>
            <Card.Divider orientation="vertical" />
            <TouchableOpacity
              style={style.galleryContainer}
              onPress={selectFile}>
              <Icon type="MaterialIcons" name="browse-gallery" />
              <Text>Gallery</Text>
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
  cameraContainer: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default UploadImgBottomsheet;
