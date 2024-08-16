import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const DirectMessages: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text>Welcome to DirectMessages Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DirectMessages;
