import {FC} from 'react';
import {TextInputProps, StyleSheet, TextInput} from 'react-native';
import colors from 'utils/colors';

interface Props extends TextInputProps {}

const AppInput: FC<Props> = props => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: colors.SECONDARY,
    height: 45,
    color: colors.CONTRAST,
    padding: 10,
  },
});

export default AppInput;
