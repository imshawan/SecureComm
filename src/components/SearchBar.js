import React from "react";
import { StyleSheet, TextInput, Text, View, Keyboard, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { View as AnimatedView } from 'react-native-animatable';
import { colors, fontSizes, SEARCHBAR_HEIGHT, BASE_ANIMATION_DURATION, fontFamily } from "../common";


const styles = StyleSheet.create({
    container: {
      margin: 15,
      marginTop: 0,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      width: "92%",
      height: SEARCHBAR_HEIGHT
  
    },
    searchBarUnClicked: {
      paddingHorizontal: 15,
      flexDirection: "row",
      width: "100%",
      backgroundColor: colors.lightestBlue,
      borderRadius: 15,
      alignItems: "center",
    },
    searchBarClicked: {
      paddingHorizontal: 15,
      flexDirection: "row",
      width: "85%",
      backgroundColor: colors.lightestBlue,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    input: {
      marginLeft: 10,
      width: "90%",
      height: 48,
      color: colors.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSizes.medium,
      lineHeight: fontSizes.medium,
      alignSelf: 'center',
    },
    buttonStyle: {
        padding: 11,
        paddingLeft: 10,
        borderWidth: 0,
        height: SEARCHBAR_HEIGHT,
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: 'blue',
        fontSize: fontSizes.regular,
        fontFamily: fontFamily.regular,
        lineHeight: fontSizes.large,
    }
  });
  

const SearchBar = ({clicked, value, setValue, setClicked}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBarClicked
            : styles.searchBarUnClicked
        }>
            <Icon name="search" size={18} color="black" style={{ marginLeft: 1 }} />

            <TextInput
              style={styles.input}
              placeholder="Name or username"
              value={value}
              placeholderTextColor={colors.placeholderColor}
              onChangeText={setValue}
              onFocus={() => {
                  setClicked(true);
              }}
              />
        
            {clicked && (
                <TouchableOpacity onPress={() => { setValue("") }}>
                    <Icon name="close" size={18} color="black" style={{ padding: 1 }}/>
                </TouchableOpacity>
            )}
      </View>
      
      {clicked && (
        <AnimatedView animation={'fadeInRight'} duration={BASE_ANIMATION_DURATION}>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
                }}>
                <Text style={styles.buttonTextStyle}>Cancel</Text>
            </TouchableOpacity>
        </AnimatedView>
      )}
    </View>
  );
};
export default SearchBar;