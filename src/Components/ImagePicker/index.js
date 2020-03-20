import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { Image, StyleSheet, View } from 'react-native';

import Button from '../Button';
import Constants from 'expo-constants';
import React from 'react';

export default class MyImagePicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { image } = this.props;

    return (
      <>
        <View style={s.row}>
          <Button icon={{ name: 'folder-plus' }} onPress={this._pickImage} />
          <Button
            buttonStyle={{ marginLeft: 10 }}
            icon={{ name: 'camera' }}
            onPress={this._takePicture}
          />
        </View>
        {image && (
          <View style={s.imageContainer}>
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}
      </>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.props.setImage(result.uri);
    }
  };
  _takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.props.setImage(result.uri);
    }
  };
}

const s = StyleSheet.create({
  imageContainer: {
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
