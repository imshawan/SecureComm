import React from 'react';
import { StyleSheet, View, Dimensions, TouchableHighlight } from "react-native";
import { View as AnimatedView } from 'react-native-animatable';
import TopNavigation from './TopNavigation';
import { colors, BASE_ANIMATION_DURATION } from "../common";

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.white,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        marginTop: -(Dimensions.get('window').width / 2),
        marginLeft: -(Dimensions.get('window').width / 3.2),
      },
    backgroundContainer: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        backgroundColor: colors.brandColor,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }
})

const PageHeader = ({name}) => {
    return (
      <AnimatedView animation={'fadeInDownBig'} duration={BASE_ANIMATION_DURATION}>
        <TopNavigation name={name} />
        <View style={styles.headerContainer}>
            <TouchableHighlight style={styles.backgroundContainer}>
                <View />
            </TouchableHighlight>
        </View>
      </AnimatedView>
    );
  }

export default PageHeader;