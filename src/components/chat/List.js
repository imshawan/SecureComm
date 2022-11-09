import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import ProfileAvtar from '../ProfileAvtar';
import UnreadMessagesCount from './Unread';
import { roomActions } from '../../store/roomListStore';
import { colors, fontFamily, fontSizes, TOUCHABLE_TAP } from '../../common'
import { log } from '../../config';
import { AnimColor, showFocusColor, showOriginColor, getUserPicture, processTime } from '../../utils';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: 6,
    paddingVertical: 12,
    marginVertical: 2,
  },
  avtarStyles: {
    height: 50,
    width: 50,
  },
  avtarTextStyle: {
    fontSize: fontSizes.large,
  },
  avtarContainer: {
    marginTop: -2.5,
    paddingBottom: 10,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    width: '80%',
  },
  userNameText: {
    fontSize: fontSizes.regular,
    fontFamily: fontFamily.bold,
    color: colors.black,
    lineHeight: fontSizes.regular + 6,
    width: '60%',
  },
  latestMsgText: {
    fontSize: fontSizes.small,
    color: colors.subText,
    minHeight: 30,
  },
  timeStyles: {
    fontSize: fontSizes.small,
    color: colors.lightBlack,
    fontFamily: fontFamily.bold,
  }
});

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const List = ({item, message}) => {
    const interpolatedColor = new Animated.Value(0);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const unreadMessagesCount = useSelector(state => state.counters.unreadMessagesCount);
    
    let {memberDetails, lastActive, _id} = item;
    let chatUser = memberDetails || {};

    if (typeof memberDetails == 'string') {
        chatUser = JSON.parse(memberDetails);
    }

    let name = [chatUser.firstname, chatUser.lastname].join(' ') || chatUser.username;

    const userCardOnClick = async card => {
      card = JSON.parse(JSON.stringify(card));
      dispatch(roomActions.addToRecent(card));
      navigation.navigate('ChatScreen', card);
    };

    const getUnreadMessagesCount = () => {
      let objIndex = unreadMessagesCount.findIndex(obj => obj && Object.keys(obj)[0] == chatUser._id);
      let count = null;

      if (objIndex > -1) {
        count = unreadMessagesCount[objIndex][chatUser._id];
      }

      return count;
    }

    return (
        <AnimatedTouchable 
        activeOpacity={1}
        style={{backgroundColor: AnimColor(interpolatedColor, colors.white, colors.grey), borderRadius: 10, marginHorizontal: 10}}
        onPressIn={() => showFocusColor(interpolatedColor, TOUCHABLE_TAP.onTapDuration)} 
        onPressOut={() => showOriginColor(interpolatedColor, TOUCHABLE_TAP.onReleaseDuration)}
        onPress={() => userCardOnClick({currentRoom: item, chatUser})}
        >
            <View style={styles.container}>
                <View style={styles.avtarContainer}>
                    <UnreadMessagesCount count={getUnreadMessagesCount()} />
                    <ProfileAvtar name={name} image={getUserPicture(chatUser)} textStyle={styles.avtarTextStyle} customStyles={styles.avtarStyles} />
                </View>
                <View style={styles.textContainer}>

                    <View style={{justifyContent: 'space-between', flexDirection: 'row', }}>
                        <Text style={styles.userNameText} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
                        {lastActive ? <Text style={styles.timeStyles} numberOfLines={1} ellipsizeMode='tail'>{processTime(lastActive)}</Text> : ''}
                    </View>
                    <Text style={styles.latestMsgText} numberOfLines={2} ellipsizeMode='tail'>{message || `@${chatUser.username}`}</Text>
                    
                </View>
            </View>
        </AnimatedTouchable>
    );
}