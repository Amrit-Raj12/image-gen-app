import {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Clipboard,
  Alert,
  Platform,
} from 'react-native';
import colors from 'utils/colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { GeneratedImage } from 'store/generatedImages';
import { useNavigation, useRoute } from '@react-navigation/native';
import { requestStoragePermission } from 'utils/storagePermission';
import RNFetchBlob from 'rn-fetch-blob';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';



const DownloadImage: FC<GeneratedImage> = props => {

  const route: any = useRoute();
  const { newImage } = route.params;

  const dispatch = useDispatch();
  
  const navigation = useNavigation()


  const { height } = Dimensions.get('window');


  const copyPrompt = (prompt:string) =>{
    Clipboard.setString(prompt);
  }
  const downloadImageHandler = () =>{
   
    if (newImage.uri !== '') {
      if (Platform.Version >= '31') {
        downloadFileAndroid10AndAbove(); 
      } else {
        requestStoragePermission(downloadFile);
      }
    }
  }

  // Function to handle file downloads for Android 10+
  const downloadFileAndroid10AndAbove = async () => {
  const { config, fs } = RNFetchBlob;
  const date = new Date();
  const filename = `generate_${Math.floor(date.getTime() / 1000)}_image.jpg`;

  let downloadDest = `${fs.dirs.PictureDir}/${filename}`;

  config({
    fileCache: true,
    appendExt: 'jpg',
  })
    .fetch('GET', newImage.uri)
    .then((res) => {
      CameraRoll.save(res.path(), { type: 'photo', album: 'MyAppDownloads' })
        .then(() => {
          Alert.alert('Download complete', 'Image saved to your gallery!');
        })
        .catch((error) => {
          console.error('Error saving image:', error);
          Alert.alert('Error', 'Failed to save image to gallery.');
        });
    })
    .catch((error) => {
      console.error('Download failed:', error);
      Alert.alert('Download failed', 'Failed to download the image.');
    });
};


  const downloadFile = async () => {

    const { config, fs } = RNFetchBlob;
    const date = new Date()
    const downloadDest =   `${fs.dirs.DownloadDir}/generate_${Math.floor(date.getDate() + date.getSeconds()/2)}_image.jpg`;
  
    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: downloadDest,
        description: 'Downloading file...',
      },
    })
      .fetch('GET', newImage.uri)
      .then((res) => {
        console.log('File downloaded to:', res.path());
      })
      .catch((error) => {
        console.error('Download failed:', error);
      });
  } 


  return (
    <ScrollView scrollEnabled={false}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
          <AntDesign name="back" color={colors.CONTRAST} size={14} />
        </TouchableOpacity >
      </View>
      <View style={styles.container}>
        <Image
          // source={require('../assets/images/image14.jpeg')}
          source={{
            uri: `${newImage.uri}`,
          }}
          style={[styles.image, {height: height}]}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.prompText}>
          {newImage.prompt}
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>{copyPrompt(newImage.prompt)}}>
            <Fontisto name="copy" color={colors.CONTRAST} size={14} />
            <Text style={styles.buttonText}>Copy Prompt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={downloadImageHandler}>
            <AntDesign name="download" color={colors.CONTRAST} size={14} />
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  topContainer: {
    position: 'absolute',
    top: 10,
    padding: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 1,
  },
  backCircle: {
    borderRadius: 50,
    backgroundColor: '#3F385C',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    objectFit: 'cover',
    marginBottom: 5,
  },
  bottomContainer: {
    backgroundColor: 'rgba(106, 53, 156, 0.6)',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    bottom: 100,
  },
  prompText: {
    fontSize: 16,
    color: colors.CONTRAST,
     textTransform: 'capitalize'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: 'rgb(85, 37, 134)',
    borderRadius: 25,
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    color: colors.CONTRAST,
    textAlign: 'justify',
  },
});

export default DownloadImage;
