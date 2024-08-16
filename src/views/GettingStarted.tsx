import {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from 'utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  onGetStarted: () => void;
}

const GettingStarted: FC<Props> = ({onGetStarted}) => {
  const scrollViewRef = useRef<any>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  useEffect(() => {
    if (contentHeight > 0 && scrollViewHeight > 0) {
      const scrollToPosition = contentHeight / 2 - scrollViewHeight / 2;
      scrollViewRef.current.scrollTo({y: scrollToPosition, animated: true});
    }
  }, [contentHeight, scrollViewHeight]);

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('hasSeenGettingStarted', 'true');
    } catch (e) {
      console.error('Error saving value to AsyncStorage', e);
    }
    onGetStarted();
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      onLayout={event => {
        setScrollViewHeight(event.nativeEvent.layout.height);
      }}
      scrollEnabled={false}
      style={{backgroundColor: colors.PRIMARY}}>
      <View
        style={styles.container}
        onLayout={event => {
          setContentHeight(event.nativeEvent.layout.height);
        }}>
        <View style={styles.photoGallery}>
          <View style={styles.column}>
            <View style={styles.photo}>
              {/* <Image
                source={require('../assets/images/image1.jpg')}
                style={styles.image}
              /> */}
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
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(2,13,34, 1)', 'rgba(2,13,34, 1)']}
          style={styles.linearGradient}>
          <View style={styles.bottomCard}>
            <Text style={styles.cardHeading}>
              Transform your ideas into captivating visuals
            </Text>
            <Text style={styles.cardText}>
              Elavate your digiatl artistry with ease and unlock a world of
              endless possibilities with ImagiText AI Image Generator.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    width: '100%',
    marginHorizontal: '25%',
    paddingVertical: 40,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: colors.PRIMARY,
  },
  photoGallery: {
    flex: 1,
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
    borderRadius: 10,
    objectFit: 'cover',
  },
  linearGradient: {
    flex: 1,
    padding: 25,
    paddingBottom: 40,
    borderRadius: 5,
    position: 'absolute',
    bottom: '34%',
    right: '20%',
    width: 450,
  },
  bottomCard: {
    paddingHorizontal: 40,
    marginTop: 20,
    borderRadius: 20,
    // position: 'relative',
    // left: '20%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cardHeading: {
    color: colors.CONTRAST,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  cardText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: colors.CONTRAST,
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: colors.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GettingStarted;
