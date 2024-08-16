import { PermissionsAndroid, Platform } from 'react-native';

export const getPermissionToReadImages = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      const allPermissionsGranted = Object.values(granted).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );

      return allPermissionsGranted;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    // iOS doesn't need special permissions for storage
    return true;
  }
};
