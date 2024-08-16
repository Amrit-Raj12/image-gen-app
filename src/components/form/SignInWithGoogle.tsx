import {useFormikContext} from 'formik';
import {FC} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AppButon from 'ui/AppButton';
import Loader from 'ui/Loader';
import colors from 'utils/colors';

interface Props {
  title: string;
  onPress?(): void;
  busy?: boolean;
}

const SignWithGoogle: FC<Props> = ({title, onPress, busy}) => {
  const {handleSubmit, isSubmitting} = useFormikContext();
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {!busy ? (
        <View style={styles.buttonContainer}>
          <Image
            source={require('./../../assets/google.png')}
            style={styles.googleLogo}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : (
        <Loader />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.CONTRAST,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    color: colors.DARK,
    fontSize: 18,
  },
});

export default SignWithGoogle;
