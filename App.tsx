import React, {useEffect, useState} from 'react';
import {StatusBar, View, ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from 'store';
import AppContainer from 'components/AppContainer';
import AppNavigator from 'navigation';
import GettingStarted from 'views/GettingStarted';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showGettingStarted, setShowGettingStarted] = useState(true);

  useEffect(() => {
    const checkGettingStarted = async () => {
      try {
        const value = await AsyncStorage.getItem('hasSeenGettingStarted');
        if (value === null) {
          setShowGettingStarted(true);
        }
      } catch (e) {
        console.error('Error reading value from AsyncStorage', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkGettingStarted();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AppContainer showGettingStarted={showGettingStarted}>
        <StatusBar hidden={true} />
        {showGettingStarted ? (
          <GettingStarted onGetStarted={() => setShowGettingStarted(false)} />
        ) : (
          <AppNavigator />
        )}
      </AppContainer>
    </Provider>
  );
};

export default App;
