import AppContainer from 'components/AppContainer';
import AppNavigator from 'navigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from 'store';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        {/* For Hide Top Status Bar */}
        <StatusBar hidden={true} />
        <AppNavigator />
      </AppContainer>
    </Provider>
  );
};

export default App;
