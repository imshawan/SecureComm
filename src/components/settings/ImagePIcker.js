import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dialog } from '@rneui/themed';
import ImagePicker from 'react-native-image-crop-picker';

import { colors, HEADER_HEIGHT, fontSizes, LABELS, fontFamily } from '../../common';
import { log } from '../../config';

const { BASIC_PROFILE_EDIT } = LABELS;

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

const ImagePickerDialog = ({visible, setVisible}) => {
  const toggleDialog = () => {
      setVisible(!visible);
    };
  
  const handleItemSelect = (item) => {
      setSelected(item);
      toggleDialog();
    }
  
  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    }).catch((err) => log(err));
  }

  const openCamera = () => {
    log('hiii')
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    }).catch((err) => log(err));
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
                    <TouchableOpacity style={styles.iconContainer}>
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