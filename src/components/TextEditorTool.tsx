import React, {useRef, useState} from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {launchImageLibrary} from 'react-native-image-picker';

const handleHead = ({tintColor}: any) => (
  <Text style={{color: tintColor}}>H1</Text>
);
const TextEditorTool = () => {
  const richText = useRef<any>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const handleMediaUpload = async (mediaType: 'photo' | 'video') => {
    launchImageLibrary(
      {
        mediaType,
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          if (mediaType === 'photo') {
            setImageUri(asset.uri ?? null);
            // setPostContent(prev => prev + '\n[Image]');
          } else {
            setVideoUri(asset.uri ?? null);
            // setPostContent(prev => prev + '\n[Video]');
          }
          //   setSelectedTool(null);
        }
      },
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <RichEditor
            ref={richText}
            onChange={descriptionText => {
              console.log('descriptionText:', descriptionText);
            }}
            placeholder="Write something..."
            initialFocus={true}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0}}></View>

      <RichToolbar
        editor={richText}
        actions={[
          actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.keyboard,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.removeFormat,
          actions.insertVideo,
          actions.checkboxList,
          actions.undo,
          actions.redo,
        ]}
        onPressAddImage={() => {
          handleMediaUpload('photo');
        }}
        iconMap={{[actions.heading1]: handleHead}}
      />
    </SafeAreaView>
  );
};

export default TextEditorTool;
