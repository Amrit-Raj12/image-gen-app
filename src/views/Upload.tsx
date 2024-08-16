import FileSelector from 'components/FileSelector';
import {FC} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'utils/colors';

interface Props {}

const Upload: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector
          icon={
            <MaterialComunityIcon
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Poster"
        />
        <FileSelector
          icon={
            <MaterialComunityIcon
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Audio"
          style={{marginLeft: 20}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  fileSelectorContainer: {
    flexDirection: 'row',
  },
});

export default Upload;
