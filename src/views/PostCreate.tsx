import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import DropDownSelection from 'components/DropdownSelection';
import colors from 'utils/colors';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';
import TextEditorTool from 'components/TextEditorTool';

interface Props {}

const PostCreate: FC<Props> = props => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [postContent, setPostContent] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const visiblityOptions = [
    {title: 'public', icon: 'public'},
    {title: 'private', icon: 'public-off'},
  ];
  const commentVisibilityOptions = [
    {title: 'Everyone can comment', icon: 'public'},
    {title: 'No one can comment', icon: 'public-off'},
  ];

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
  };

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
            setPostContent(prev => prev + '\n[Image]');
          } else {
            setVideoUri(asset.uri ?? null);
            setPostContent(prev => prev + '\n[Video]');
          }
          setSelectedTool(null);
        }
      },
    );
  };

  const handleTextInsert = () => {
    setPostContent(prev => prev + '\n[Text]');
    setSelectedTool(null);
  };

  const handleListInsert = () => {
    setPostContent(prev => prev + '\n[List]');
    setSelectedTool(null);
  };

  const handleBoldText = () => {
    // Implement text bolding logic here
    setPostContent(prev => prev + '\n[BOLD]');
    setSelectedTool(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2021/03/02/08/37/woman-6061852_640.jpg',
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.visiblityBox}>
          <Text style={styles.name}>Name</Text>
          <DropDownSelection
            emojisWithIcons={visiblityOptions}
            defaultTitle="Visibility"
            width={110}
          />
        </View>
      </View>

      <View style={styles.postContainer}>
        <View style={{marginBottom: 10}}>
          <DropDownSelection
            emojisWithIcons={commentVisibilityOptions}
            defaultTitle="Everyone can comment"
            width={'100%'}
            height={40}
            fontSize={18}
          />
        </View>

        <TextEditorTool />
        {/* <TextInput
          style={styles.textInput}
          multiline
          placeholder="Write something..."
          value={postContent}
          onChangeText={setPostContent}
        />
        {selectedTool === 'image' && (
          <Button
            title="Upload Image"
            onPress={() => handleMediaUpload('photo')}
          />
        )}
        {selectedTool === 'video' && (
          <Button
            title="Upload Video"
            onPress={() => handleMediaUpload('video')}
          />
        )}
        {selectedTool === 'text' && handleTextInsert()}
        {selectedTool === 'list' && handleListInsert()}
        {selectedTool === 'bold' && handleBoldText()}

        <View style={styles.toolContainer}>
          <TouchableOpacity onPress={() => handleToolSelect('image')}>
            <Feather name="image" size={22} color={colors.CONTRAST} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleToolSelect('video')}>
            <Feather name="video" size={22} color={colors.CONTRAST} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleToolSelect('text')}>
            <Entypo name="text" size={18} color={colors.CONTRAST} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleToolSelect('link')}>
            <Entypo name="link" size={18} color={colors.CONTRAST} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleToolSelect('list')}>
            <Feather name="list" size={18} color={colors.CONTRAST} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleToolSelect('bold')}>
            <Feather name="bold" size={18} color={colors.CONTRAST} />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  profileContainer: {
    flexDirection: 'row',
    backgroundColor: '#202427',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  avatarContainer: {
    position: 'relative',
    borderRadius: 50,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginHorizontal: 4,
    resizeMode: 'cover',
  },
  visiblityBox: {
    marginLeft: 5,
    padding: 5,
  },
  name: {
    fontSize: 12,
    color: colors.CONTRAST,
    marginBottom: 5,
  },
  postContainer: {
    backgroundColor: '#202427',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    height: '85%',
  },
  textInput: {
    backgroundColor: 'transparent',
    color: colors.CONTRAST,
    padding: 10,
    borderRadius: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  toolContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-evenly',
    backgroundColor: '#2A2E31',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

export default PostCreate;
