import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Alert, Platform } from 'react-native';

// Function to request storage permission and save the file to the gallery
export const requestStoragePermission2 = async (callback) => {
    if (Platform.OS === 'android') {
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          callback();
        } else {
          Alert.alert('Permission Denied', 'Cannot download file without storage permission.');
        }
      } catch (err) {
        console.warn('Permission request error:', err);
      }
    } else {
      // On iOS, you can directly proceed with the callback
      callback();
    }
  };
  
  // Function to save the file to the gallery
 export const saveFileToGallery = async (fileUri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync('Download');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Download', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      console.error('Failed to save image to gallery:', error);
    }
  };