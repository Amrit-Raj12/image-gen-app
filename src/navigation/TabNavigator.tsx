import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from 'utils/colors';
import Home from 'views/Home';
import Profile from 'views/Profile';
import Upload from 'views/Upload';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from 'views/Search';
import PostCreate from 'views/PostCreate';
import DirectMessages from 'views/DirectMessages';
import {useState} from 'react';
import DownloadImage from 'views/DownloadImage';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [isTouced, setIsTouched] = useState(false);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.PRIMARY,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: props => {
            return (
              <AntDesign name="home" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="DownloadImage"
        component={DownloadImage}
        // component={Search}
        options={{
          tabBarIcon: props => {
            return (
              <AntDesign name="download" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: 'DownloadImage',
        }}
      />
      {/* <Tab.Screen
        name="PostCreate"
        component={PostCreate}
        options={{
          tabBarIcon: props => {
            return (
              <AntDesign name="plus" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: 'Create',
        }}
      /> */}
      {/* <Tab.Screen
        name="DirectMessages"
        component={DirectMessages}
        options={{
          tabBarIcon: props => {
            return (
              <MaterialComunityIcon
                name="android-messages"
                size={props.size}
                color={props.color}
              />
            );
          },
          tabBarLabel: 'DM',
        }}
      /> */}
      {/* <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarIcon: props => {
            return (
              <AntDesign name="user" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: 'Profile',
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
