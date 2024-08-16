import {FC, ReactNode} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {getAuthState} from 'store/auth';
import colors from 'utils/colors';

interface Props {
  children: ReactNode;
  showGettingStarted: boolean;
}

const AppContainer: FC<Props> = ({children, showGettingStarted}) => {
  // const {loggedIn, busy} = useSelector(getAuthState);
  return (
    <SafeAreaView style={styles.container}>
      {/* {loggedIn && ( */}
      {!showGettingStarted && (
        <View style={styles.upperHeader}>
          <View style={styles.iconContainer}>
            <Entypo name="menu" color={colors.CONTRAST} size={24} />
          </View>
          <View>
            {/* <Text style={[styles.socialTitle, styles.lightText]}>
              ImagiText
            </Text> */}
            <Image
              source={{uri:'https://res.cloudinary.com/dcdchgx6z/image/upload/v1722843613/ImagiTextAsserts/ImgiText_tk0h0k.png'}}
              style={styles.logo}
            />
          </View>
          <View style={styles.iconContainer}>
            <AntDesign name="bells" color={colors.CONTRAST} size={24} />
            {/* <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2021/03/02/08/37/woman-6061852_640.jpg',
              }}
              style={styles.userAvatar}
            /> */}
          </View>
        </View>
      )}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY,
  },
  upperHeader: {
    backgroundColor: colors.SECONDARY,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo:{
    width: 120,
    height: 40,
  },
  socialTitle: {
    color: colors.DARK,
    fontWeight: 'bold',
  },
  lightText: {
    color: colors.CONTRAST,
    textTransform: 'uppercase',
  },
  iconContainer: {
    opacity:0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.INACTIVE_CONTRAST,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
  },
  badge: {
    height: 20,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.SECONDARY,
    paddingLeft: 2,
    paddingRight: 2,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    resizeMode: 'cover',
    marginLeft: 5,
  },
});

export default AppContainer;
