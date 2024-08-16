import {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'utils/colors';

interface Props {}

const Search: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Ionicons name="arrow-back" size={24} color={colors.CONTRAST} />
      </View>

      <View style={styles.searchContainer}>
        <Fontisto name="search" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={colors.DARK}
        />
      </View>
      <View style={styles.recentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.recentText}>Recent</Text>
          <Text style={styles.seeAllText}>See All</Text>
        </View>
        <View style={styles.itemsBoxes}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2021/03/02/08/37/woman-6061852_640.jpg',
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>Natalie</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2021/03/02/08/37/woman-6061852_640.jpg',
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>Natalie</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2021/03/02/08/37/woman-6061852_640.jpg',
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>Natalie</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2021/03/02/08/37/woman-6061852_640.jpg',
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>Natalie</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.listContainer}>
        <View style={styles.resultsContainer}>
          <View style={styles.resultCard}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2021/03/02/08/37/woman-6061852_640.jpg',
              }}
              style={styles.avatar}
            />
            <View style={{marginLeft: 10}}>
              <Text style={styles.name}>
                Natalie{' '}
                <AntDesign name="star" color={colors.SUCCESS} size={12} />
              </Text>
              <Text style={styles.uniqueName}>@natalie</Text>
              <Text style={styles.designation}>Designer</Text>
              <Text style={styles.followers}>
                2k+ <Text style={styles.followersText}>Followeres</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.SUCCESS,
    margin: 10,
    paddingLeft: 15,
    paddingRight: 10,
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.DARK,
  },
  recentContainer: {
    backgroundColor: '#2A2E31',
    margin: 10,
    padding: 5,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
  },
  recentText: {
    fontSize: 14,
    color: colors.INACTIVE_CONTRAST,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.SECONDARY,
  },
  itemsBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  avatarContainer: {
    position: 'relative',
    borderRadius: 50,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 4,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 12,
    color: colors.CONTRAST,
    marginTop: 5,
  },
  uniqueName: {
    fontSize: 12,
    color: colors.SECONDARY,
    marginBottom: 5,
  },
  listContainer: {
    backgroundColor: '#202427',
  },
  resultsContainer: {
    backgroundColor: '#2A2E31',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  resultCard: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  designation: {
    fontSize: 12,
    color: colors.INACTIVE_CONTRAST,
  },
  followers: {
    fontSize: 12,
    color: colors.CONTRAST,
  },
  followersText: {
    fontSize: 12,
    color: colors.INACTIVE_CONTRAST,
  },
});

export default Search;
