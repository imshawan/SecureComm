import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileAvtar from '../../components/ProfileAvtar';
import Image from '../../components/Image';
import { colors, HEADER_HEIGHT, fontSizes, LABELS, fontFamily, AUTHOR, IMAGES } from '../../common';
import { log } from '../../config';

const { ABOUT_SCREEN } = LABELS;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
},

headerContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    flexDirection: 'column',
    height: HEADER_HEIGHT - 10,
    shadowColor: colors.lightestGrey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 9,
            
  },
  headerRow: {
      flexDirection: 'row', 
      height: '100%', 
      alignItems: 'center',
  },
  headerTextStyle: {
      flexDirection: 'row',
      fontSize: fontSizes.extraLarge, 
      color: colors.black,
      fontFamily: fontFamily.bold,
      lineHeight: fontSizes.extraLarge + 5,
  },
  headerContent: {
      flexDirection: 'row', 
      paddingHorizontal: 25,
  },
  touchControlStyle: {
    marginLeft: 0,
    paddingLeft: 0,
    marginTop: -2,
    width: 35,
  },
  iconStyles: {
    color: colors.black
  },
  sectionCard: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    // backgroundColor: colors.red
  },
  sectionHeading: {
    color: colors.black,
    fontSize: fontSizes.regular + 2,
    fontFamily: fontFamily.bold,
    lineHeight: fontSizes.regular + 5,
    marginBottom: 20,
  },
  sectionSubHeading: {
    color: colors.black,
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.regular,
    lineHeight: fontSizes.medium + 5,
    marginTop: 2,
  },
  profileAvtar: {
    height: 110,
    width: 110,
    borderRadius: 120,
    marginBottom: 20,
    marginTop: 8
  },
  authorInfo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  authorText: {
    color: colors.black,
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.extraLarge,
    lineHeight: fontSizes.extraLarge
  },
  authorSubText: {
    color: colors.lightBlack,
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.medium,
    marginBottom: 10
  },
  social: {
    width: '90%',
    flexDirection: 'row',
    marginBottom: 15
  },
  displayIconsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    width: 45,
    height: 45,
    backgroundColor: colors.brandColor,
    borderRadius: 10,
  },
  displayIcons: {
    color: colors.white,
  },
  listCard: {
    // marginHorizontal: 12,
    marginVertical: 10,
    flexDirection: 'row',
  },
  listCardIcon: {
    color: colors.black
  },
  listText: {
    justifyContent: 'center',
    width: '80%'
  },
  listHeader: {
    color: colors.black,
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.medium,
    lineHeight: fontSizes.regular + 5,
  },
  listSubText: {
    color: colors.lightBlack,
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    lineHeight: fontSizes.regular + 5,
  },
  displayIconCustom: {
    backgroundColor: colors.white, 
    marginLeft: 0
  },
  displayIconCustomIcon: {
    color: colors.black
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  footerText: {
    color: colors.black,
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.medium
  }
});
 

const DisplayIcon = ({icon, link, customStyles={}, iconStyles={}}) => {
    return (
        <TouchableOpacity onPress={() => { link ? Linking.openURL(link) : ''}} activeOpacity={0.8} style={[styles.displayIconsContainer, customStyles]}>
            <Icon name={icon} style={[styles.displayIcons, iconStyles]} size={28} />
        </TouchableOpacity>
    );
}

const ListCard = ({header, subHeader, icon}) => {
    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.listCard}>
            <DisplayIcon icon={icon} customStyles={styles.displayIconCustom} iconStyles={styles.displayIconCustomIcon}/>
            <View style={styles.listText}>
                <Text style={styles.listHeader}>{header}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.listSubText}>{subHeader}</Text>
            </View>
        </TouchableOpacity>
    );
}

const About = ({navigation}) => { 
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
      <View style={styles.container}>
          <View style={styles.headerContainer}>
              <View style={styles.headerContent}>
                  <View style={styles.headerRow}>
                      <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                          <Icon name="arrow-left" style={styles.iconStyles} size={fontSizes.large} />
                      </TouchableOpacity>
                      <Text style={styles.headerTextStyle}>{ABOUT_SCREEN.title}</Text>
                  </View>
              </View>
          </View>

          <View style={styles.sectionCard}>
            <Image imageSource={IMAGES.authorImage} height={110} width={110} styles={styles.profileAvtar}/>
            <View style={styles.authorInfo}>
                <Text style={styles.authorText}>{AUTHOR.name}</Text>
                <Text style={styles.authorSubText}>{AUTHOR.contribution}</Text>

                <View style={styles.social}>
                    <DisplayIcon icon={'facebook'} link={AUTHOR.facebook} />
                    <DisplayIcon icon={'linkedin'} link={AUTHOR.linkedin} />
                    <DisplayIcon icon={'github'} link={AUTHOR.github} />
                </View>
            </View>
          </View>

          <View style={{...styles.sectionCard, alignItems: 'flex-start'}}>
            <View style={{width: '90%', marginLeft: 10,}}>
                <Text style={styles.sectionHeading}>{ABOUT_SCREEN.software}</Text>
                {/* <Text style={styles.sectionSubHeading}>{ABOUT_SCREEN.development}</Text> */}
            </View>

            <ListCard icon={'github'} header={ABOUT_SCREEN.github.header} subHeader={ABOUT_SCREEN.github.text} />
            <ListCard icon={'flag-o'} header={ABOUT_SCREEN.report.header} subHeader={ABOUT_SCREEN.report.text} />
            <ListCard icon={'share-alt'} header={ABOUT_SCREEN.share.header} subHeader={ABOUT_SCREEN.share.text} />
            <ListCard icon={'code'} header={ABOUT_SCREEN.dependencies.header} subHeader={ABOUT_SCREEN.dependencies.text} />
            <ListCard icon={'info'} header={ABOUT_SCREEN.version.header} subHeader={ABOUT_SCREEN.version.text} />
          </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{ABOUT_SCREEN.footer}</Text>
        </View>

        </View>  
    </>
  );
};
 
export default About; 
