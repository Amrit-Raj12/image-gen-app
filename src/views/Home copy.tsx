import {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'utils/colors';
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';

interface Props {}

const Home: FC<Props> = props => {
  const [showFullText, setShowFullText] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lastTap = useRef<number | null>(null);

  const scrollViewRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  useEffect(() => {
    if (contentHeight > 0 && scrollViewHeight > 0) {
      const scrollToPosition = contentHeight / 2 - scrollViewHeight / 2;
      scrollViewRef.current.scrollTo({y: scrollToPosition, animated: true});
    }
  }, [contentHeight, scrollViewHeight]);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const fullText = `Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit`;

  const truncatedText = fullText.substring(0, 100) + '...';

  // show like heart
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      setShowHeart(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setShowHeart(false);
          });
        }, 1000);
      });
    } else {
      lastTap.current = now;
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      onLayout={event => {
        setScrollViewHeight(event.nativeEvent.layout.height);
      }}>
      <View
        style={styles.container}
        onLayout={event => {
          setContentHeight(event.nativeEvent.layout.height);
        }}>
        <View style={styles.photoGallery}>
          <View style={styles.column}>
            <View style={styles.photo}>
              <Image
                source={require('../assets/images/image1.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.photo}>
              <Image
                source={require('../assets/images/image2.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.photo}>
              <Image
                source={require('../assets/images/image3.jpg')}
                style={styles.image}
              />
            </View>
          </View>
          <View style={[styles.column]}>
            <View style={styles.photo}>
              <Image
                source={require('../assets/images/image4.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.photo}>
              <Image
                source={require('../assets/images/image5.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.photo}>
              <Image
                source={require('../assets/images/image6.jpg')}
                style={styles.image}
              />
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.photo}>
              <Image
                source={require('../assets/images/image7.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.photo}>
              <Image
                source={require('../assets/images/image8.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.photo}>
              <Image
                source={require('../assets/images/image6.jpg')}
                style={styles.image}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    width: '100%',
    // margin: 'auto',
    marginHorizontal: '25%',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  photoGallery: {
    flexDirection: 'row-reverse',
    gap: 20,
    alignItems: 'stretch',
  },
  column: {
    flexDirection: 'column',
    gap: 20,
  },
  photo: {},
  image: {
    width: 300,
    // height: ,
    borderRadius: 10,
    objectFit: 'cover',
  },
  // scrollView: {
  //   // alignItems: 'center',
  // },
  // folowerContainer: {
  //   flexDirection: 'row',
  //   backgroundColor: '#202427',
  //   marginBottom: 10,
  //   borderRadius: 10,
  //   padding: 10,
  //   margin: 10,
  // },
  // avatar: {
  //   width: 60,
  //   height: 60,
  //   borderRadius: 50,
  //   marginHorizontal: 4,
  //   resizeMode: 'cover',
  // },
  // yourStoryBtnContainer: {
  //   width: 60,
  //   height: 60,
  //   borderRadius: 25,
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   borderStyle: 'dashed',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   position: 'relative',
  //   marginHorizontal: 4,
  // },
  // plusIcon: {
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 0,
  //   backgroundColor: colors.SECONDARY, // Background color for the icon, adjust as needed
  //   borderRadius: 9, // Half of icon size for a circle
  //   padding: 4,
  // },
  // avatarContainer: {
  //   position: 'relative',
  //   borderRadius: 50,
  // },
  // onlineDot: {
  //   position: 'absolute',
  //   top: 5, // Adjust top position according to your requirements
  //   right: 5, // Adjust right position according to your requirements
  //   width: 10,
  //   height: 10,
  //   borderRadius: 5,
  //   backgroundColor: colors.SECONDARY, // Adjust color according to your requirements
  // },
  // profileMainContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // profileContainer: {
  //   flexDirection: 'row',
  //   padding: 10,
  //   // backgroundColor: '#202427',
  //   margin: 10,
  //   borderRadius: 10,
  // },
  // detailsContainer: {
  //   marginLeft: 10,
  // },
  // name: {
  //   fontSize: 14,
  //   color: colors.CONTRAST,
  // },

  // followingStatus: {
  //   fontSize: 12,
  //   color: colors.INACTIVE_CONTRAST,
  // },
  // countContainer: {
  //   marginTop: 20,
  // },
  // timeContainer: {
  //   marginTop: 30,
  // },
  // time: {
  //   fontSize: 12,
  //   color: colors.INACTIVE_CONTRAST,
  // },
  // postMainContainer: {
  //   backgroundColor: '#202427',
  //   padding: 10,
  //   margin: 10,
  //   borderRadius: 10,
  // },
  // postContainer: {
  //   // flex: 1,
  //   marginVertical: 12,
  // },
  // imageContainer: {
  //   position: 'relative',
  // },
  // image: {
  //   width: '100%',
  //   height: 400,
  //   resizeMode: 'cover',
  //   borderRadius: 20,
  // },
  // badge: {
  //   position: 'absolute',
  //   width: 60,
  //   height: 30,
  //   borderRadius: 10,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // topLeftBadge: {
  //   top: 10,
  //   left: 10,
  //   backgroundColor: colors.SECONDARY,
  // },
  // topRightBadge: {
  //   top: 10,
  //   right: 10,
  //   backgroundColor: 'rgba(255, 255, 255, 0.2)',
  //   paddingHorizontal: 10,
  //   width: 'auto',
  // },
  // liveText: {
  //   color: colors.DARK,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },

  // followerCount: {
  //   color: colors.CONTRAST,
  //   fontSize: 12,
  //   marginLeft: 6,
  // },
  // countersContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginHorizontal: 8,
  // },
  // iconCounter: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginHorizontal: 8,
  // },

  // messageContainer: {
  //   padding: 10,
  // },
  // messageText: {
  //   color: colors.CONTRAST,
  //   fontSize: 14,
  //   marginLeft: 6,
  //   lineHeight: 12,
  //   textAlign: 'left',
  // },
  // readMoreText: {
  //   color: 'gray',
  //   marginTop: 5,
  //   fontSize: 14,
  // },
  // heartContainer: {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: [{translateX: -50}, {translateY: -50}],
  // },
  // heartIcon: {
  //   opacity: 0.8,
  // },
});

export default Home;
