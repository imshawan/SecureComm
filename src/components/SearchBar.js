import React from "react";
import { StyleSheet, TextInput, Text, View, Keyboard, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, fontSizes } from "../common";


const styles = StyleSheet.create({
    container: {
      margin: 15,
      marginTop: 0,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      width: "92%",
      height: 50
  
    },
    searchBarUnClicked: {
      paddingHorizontal: 15,
      flexDirection: "row",
      width: "100%",
      backgroundColor: colors.grey,
      borderRadius: 15,
      alignItems: "center",
    },
    searchBarClicked: {
      paddingHorizontal: 15,
      flexDirection: "row",
      width: "85%",
      backgroundColor: colors.grey,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    input: {
      marginLeft: 10,
      width: "90%",
    },
    buttonStyle: {
        padding: 12,
        paddingLeft: 10,
        borderWidth: 0,
        height: 50,
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: 'blue',
        fontSize: fontSizes.regular
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
            <Icon name="search" size={20} color="black" style={{ marginLeft: 1 }} />

            <TextInput
            style={styles.input}
            placeholder="Search"
            value={value}
            onChangeText={setValue}
            onFocus={() => {
                setClicked(true);
            }}
            />
        
            {clicked && (
                <TouchableOpacity onPress={() => { setValue("") }}>
                    <Icon name="close" size={20} color="black" style={{ padding: 1 }}/>
                </TouchableOpacity>
            )}
      </View>
      
      {clicked && (
        <View>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
                }}>
                <Text style={styles.buttonTextStyle}>Cancel</Text>
            </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default SearchBar;