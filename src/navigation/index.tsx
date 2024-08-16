import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {FC, useEffect} from 'react';
import AuthNavigator from './AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from 'store/auth';
import TabNavigator from './TabNavigator';
import {Keys, getFromAsyncStorage} from 'utils/asyncStorage';
import client from 'api/client';
import Loader from 'ui/Loader';
import colors from 'utils/colors';
import {View} from 'react-native';

interface Props {}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.SECONDARY,
    primary: colors.SECONDARY,
  },
};

const AppNavigator: FC<Props> = props => {
  const {loggedIn, busy} = useSelector(getAuthState);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchAuthInput = async () => {
  //     dispatch(updateBusyState(true));
  //     try {
  //       const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  //       if (!token) {
  //         return dispatch(updateBusyState(false));
  //       }
  //       const {data} = await client.get('/auth/is-auth', {
  //         headers: {
  //           Authorization: 'Bearer ' + token,
  //         },
  //       });

  //       dispatch(updateProfile(data.profile));
  //       dispatch(updateLoggedInState(true));
  //     } catch (error) {
  //       console.log('Auth error: ', error);
  //     }
  //     dispatch(updateBusyState(false));
  //   };
  //   fetchAuthInput();
  // }, []);

  return (
    <NavigationContainer theme={AppTheme}>
      {busy ? (
        <View
          style={{
            // ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.OVERLAY,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Loader />
        </View>
      ) : null}
      {/* {loggedIn ? <TabNavigator /> : <AuthNavigator />} */}
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
