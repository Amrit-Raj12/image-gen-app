import { PermissionsAndroid, Platform } from "react-native";
import { getPermissionToReadImages } from "./helper";

export const requestStoragePermission = async (callback:() => void) => {
  if (Platform.OS === 'android') {
    try {
      console.log('Requesting permission');
      await getPermissionToReadImages();
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Downalod App Storage Permission',
          message:
            'Downalod App needs access to your storage ' +
            'so you can download files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        callback();
        // console.log('You can use the camera');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
   
  };



