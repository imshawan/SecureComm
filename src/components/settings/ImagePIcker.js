import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dialog } from '@rneui/themed';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import { currentUserActions } from '../../store/userStore';
import { updateCachedUserObject, notifyUser } from '../../utils';
import { HTTP } from '../../services';
import { colors, ENDPOINTS, fontSizes, LABELS, fontFamily, PROFILE_PICTURE_DIMENSIONS } from '../../common';
import { log } from '../../config';

const { BASIC_PROFILE_EDIT } = LABELS;
const imagePickerOptions = {
  width: PROFILE_PICTURE_DIMENSIONS.width,
  height: PROFILE_PICTURE_DIMENSIONS.height,
  cropping: true,
  includeBase64: true,
  useFrontCamera: true,
  mediaType: 'photo',
  cropperStatusBarColor: colors.black,
  cropperActiveWidgetColor: colors.brandColor,
  cropperToolbarColor: colors.black,
  cropperToolbarWidgetColor: colors.white,
  compressImageQuality: 0.8
}

const styles = StyleSheet.create({
    dialogContainer: {
        width: '80%',
        height: 160,
        elevation: 20,
        borderRadius: 15,
      },
    dialogInnerContainer: {
      marginTop: 5
    },
    dialogHeader: {
      fontSize: fontSizes.big,
      fontFamily: fontFamily.bold,
      lineHeight: fontSizes.big,
      color: colors.black
    },
    controlSection: {
      flexDirection: 'row',
      width: '80%',
      height: 100,
      alignSelf: 'center',
    },
    controlItem: {
      marginTop: 10,
      marginRight: 25,
      height: 90,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      height: 55,
      width: 55,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: colors.drawerBackGroundGray
    },
    iconStyles: {
      color: colors.black,
    },
    controlItemText: {
      color: colors.black,
      fontSize: fontSizes.medium,
      fontFamily: fontFamily.regular,
    }
})

const ImagePickerDialog = ({visible, setVisible, onChange}) => {
  const dispatch = useDispatch();

  const toggleDialog = () => {
      setVisible(!visible);
  };
  
  const openImagePicker = () => {
    ImagePicker.openPicker(imagePickerOptions).then(image => {
      onChange(`data:${image.mime};base64,${image.data}`);
      toggleDialog();
    }).catch((err) => log(err));
  }

  const openCamera = () => {
    ImagePicker.openCamera(imagePickerOptions).then(image => {
      onChange(`data:${image.mime};base64,${image.data}`);
      toggleDialog();
    }).catch((err) => {
      
    });
  }

  const deleteProfilePicture = async () => {
    try {
      let {payload} = await HTTP.del(ENDPOINTS.changePicture);
      dispatch(currentUserActions.updateProfilePicture(null));
      await updateCachedUserObject({picture: null});

      if (payload.message) {
        notifyUser(payload.message);
      }

    } catch (err) {
      notifyUser(err.status ? err.status.message : err);
    }
  }


  const removePicture = () => {
    onChange('');
    toggleDialog();
    deleteProfilePicture()
  }

    return (
          <Dialog
            overlayStyle={styles.dialogContainer}
            animationType='fade'
            isVisible={visible}
            onBackdropPress={toggleDialog}
            statusBarTranslucent
            >
        
            <View style={styles.dialogInnerContainer}>
                <Text style={styles.dialogHeader}>{BASIC_PROFILE_EDIT.changePicture}</Text>
                <View style={styles.controlSection}>

                  <View style={styles.controlItem}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => openImagePicker()}>
                      <Icon name="picture-o" style={styles.iconStyles} size={fontSizes.extraLarge} />
                    </TouchableOpacity>
                    <Text style={styles.controlItemText}>Gallery</Text>
                  </View>

                  <View style={styles.controlItem}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => openCamera()}>
                      <Icon name="camera" style={styles.iconStyles} size={fontSizes.extraLarge} />
                    </TouchableOpacity>
                    <Text style={styles.controlItemText}>Capture</Text>
                  </View>

                  <View style={styles.controlItem}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => removePicture()}>
                      <Icon name="trash-o" style={styles.iconStyles} size={fontSizes.extraLarge} />
                    </TouchableOpacity>
                    <Text style={styles.controlItemText}>Remove</Text>
                  </View>

                </View>

            </View>
            
            
          </Dialog>
      );
  }

export default ImagePickerDialog;