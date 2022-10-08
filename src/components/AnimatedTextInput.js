import React from "react";
import { Animated, TextInput, StyleSheet, Text, View } from "react-native";

import { showFocusColor, showOriginColor, AnimColor } from '../utils';
import { colors, fontFamily, fontSizes } from "../common";

const styles = StyleSheet.create({
    formLabel: {
        fontSize: fontSizes.regular, 
        color: colors.black,
        fontFamily: fontFamily.bold,
        lineHeight: fontSizes.regular + 5,
        marginTop: 12,
        marginBottom: 5,
    },
    sectionStyle: {
        position: 'relative',
        flexDirection: 'row',
    },
    inputStyle: {
        flex: 1,
        color: colors.black,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        height: 50,
        fontSize: fontSizes.medium,
        backgroundColor: colors.inputBackground,
        fontFamily: fontFamily.regular,
        borderWidth: 1,
    },
});


const AnimatedInput = Animated.createAnimatedComponent(TextInput);
const AnimatedTextInput = ({label, placeholder, value, onChange, inputStyle, multiline=false, disabled=false, error=false, onFocused}) => {
    let props = {};
    if (disabled) {
        props = {
            editable: false,
            selectTextOnFocus: false,
        }
    }
    
    const interpolatedColor = new Animated.Value(0);

    return (
          <>
            <Text style={styles.formLabel}>{label}</Text>
            <View style={styles.sectionStyle}>
              <AnimatedInput
                style={[styles.inputStyle, inputStyle, {borderColor: error ? colors.red : AnimColor(interpolatedColor, 'transparent')}]}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={AnimColor(interpolatedColor, colors.placeholderColor)}
                keyboardType="default"
                defaultValue={value}
                onFocus={() => {
                    if (typeof onFocused === 'function') {
                        onFocused();
                    }
                    
                    showFocusColor(interpolatedColor);
                }}
                onBlur={() => showOriginColor(interpolatedColor)}
                multiline={multiline}
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                {...props}
                />
            </View>
          </>
    );
}

export default AnimatedTextInput;