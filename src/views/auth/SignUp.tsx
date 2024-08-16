import AuthInputField from 'components/form/AuthInputField';
import Form from 'components/form';
import {FC, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import colors from 'utils/colors';
import * as yup from 'yup';
import SubmitBtn from 'components/form/SubmitBtn';
import PasswordVisiblity from 'ui/PasswordVisiblity';
import AppLink from 'ui/AppLink';
import AuthFormContainer from 'components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'types/navigation';
import {FormikHelpers} from 'formik';
import client from 'api/client';
import SignWithGoogle from 'components/form/SignInWithGoogle';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

const signUpSchema = yup.object({
  name: yup
    .string()
    .trim('Name is missing!')
    .min(3, 'Invalid Name!')
    .required('Name is required!'),
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid Email!')
    .required('Email is required!'),
  password: yup
    .string()
    .trim('Password is missing!')
    .min(8, 'Password is too short!')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Password is too simple!',
    )
    .required('Password is required!'),
  dob: yup.date().required('Date of Birth is required!'),
});

interface Props {}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  dob: Date;
}

const initialValues = {
  name: '',
  email: '',
  password: '',
  dob: new Date(),
};

const SignUp: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerPlaceholder, setShowDatePickerPlaceholder] =
    useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const togglePasswordView = () => setSecureEntry(!secureEntry);

  const handleSubmit = async (
    values: NewUser,
    actions: FormikHelpers<NewUser>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('/auth/create', {
        ...values,
      });
      navigation.navigate('Verification', {userInfo: data.user});
    } catch (error) {
      console.log('Sign Up Error: ', error);
    }
    actions.setSubmitting(false);
  };

  const toogleDatePicker = () => setShowDatePicker(!showDatePicker);

  const onChange = (event: DateTimePickerEvent, selectedDate: any) => {
    const {type} = event;
    if (type === 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      setShowDatePickerPlaceholder(false);
      if (Platform.OS === 'android') {
        toogleDatePicker();
        setDate(currentDate);
      }
    } else {
      toogleDatePicker();
      // setShowDatePickerPlaceholder(true);
    }
  };

  const signUpWithGoogle = () => {
    return '';
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signUpSchema}>
      <AuthFormContainer
        heading="Sign-Up!"
        subHeading="Let's get started by creating your account.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="Enter Your Name"
            label="Name"
            containerStyles={styles.marginBottom}
          />
          <AuthInputField
            name="email"
            placeholder="Enter Your Email"
            label="Email"
            containerStyles={styles.marginBottom}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.datePickerContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            {!showDatePicker && (
              <TouchableOpacity
                onPress={toogleDatePicker}
                style={styles.datePickerButton}>
                {showDatePickerPlaceholder ? (
                  <Text style={styles.placeholderText}>Select your DOB</Text>
                ) : (
                  <Text style={styles.datePickerText}>
                    {date.toDateString()}
                  </Text>
                )}
              </TouchableOpacity>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={onChange}
              />
            )}
          </View>
          <AuthInputField
            name="password"
            placeholder="********"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyles={styles.marginBottom}
            rightIcon={<PasswordVisiblity privateIcon={secureEntry} />}
            onRightIconPress={togglePasswordView}
          />
          <SubmitBtn title="Sign Up" />

          <SignWithGoogle
            title="Sign Up With Google"
            onPress={signUpWithGoogle}
          />
          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => {
                navigation.navigate('LostPassword');
              }}
            />
            <AppLink
              title="Sign In"
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,
    color: colors.CONTRAST,
    padding: 10,
  },
  label: {
    color: colors.CONTRAST,
  },
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  datePickerButton: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: colors.SECONDARY,
    padding: 10,
    height: 45,
    justifyContent: 'center',
  },
  datePickerText: {
    color: colors.CONTRAST,
  },
  placeholderText: {
    color: colors.INACTIVE_CONTRAST,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default SignUp;
