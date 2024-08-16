import {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from 'utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';

interface Props {}

const Profile: FC<Props> = props => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const fullText = `Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit`;

  const truncatedText = fullText.substring(0, 100) + '...';

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2021/03/02/08/37/woman-6061852_640.jpg',
                }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.col}>
              <Text style={styles.counter}>2k</Text>
              <Text style={styles.counterTitle}>Posts</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.counter}>20k</Text>
              <Text style={styles.counterTitle}>Followers</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.counter}>2k</Text>
              <Text style={styles.counterTitle}>Following</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>
              Natalie{' '}
              <AntDesign
                name="star"
                color={colors.SUCCESS}
                size={14}
                style={styles.starIcon}
              />
            </Text>
            <Text style={styles.uniqueName}>@natalie</Text>
            <Text style={styles.designation}>Designer</Text>
            <Text style={styles.bio}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              nisi quo veritatis dicta cumque eaque omnis corporis laborum
              nostrum blanditiis!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => console.log('edit clicked')}
            style={styles.editButton}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postMainContainer}>
          <View style={styles.profileMainContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2021/03/02/08/37/woman-6061852_640.jpg',
                  }}
                  style={[styles.avatar]}
                />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.name}>Natalie</Text>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>30 min</Text>
                </View>
              </View>
            </View>
            <View style={styles.iconCounter}>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={colors.CONTRAST}
              />
            </View>
          </View>
          <View style={styles.postContainer}>
            <Image
              source={{
                uri: 'https://www.criticatv.com/wp-content/uploads/00037-3454843081.jpg',
              }}
              style={styles.image}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}>
            <View style={[styles.countersContainer, {gap: 15}]}>
              <View style={styles.iconCounter}>
                <AntDesign name="heart" size={28} color={'red'} />
                <Text style={styles.followerCount}>20K+</Text>
              </View>
              <View style={styles.iconCounter}>
                <FontAwesomeIcon
                  name="comment"
                  size={28}
                  color={colors.CONTRAST}
                />
                <Text style={styles.followerCount}>10K+</Text>
              </View>
              <View style={styles.iconCounter}>
                <FoundationIcon
                  name="graph-bar"
                  size={28}
                  color={colors.CONTRAST}
                />
                <Text style={styles.followerCount}>10K+</Text>
              </View>
              <View style={styles.iconCounter}>
                <AntDesign name="sharealt" size={28} color={colors.CONTRAST} />
                <Text style={styles.followerCount}>10K+</Text>
              </View>
              {/* <View style={styles.iconCounter}>
                <AntDesign name="adduser" size={28} color={colors.CONTRAST} />
                <Text style={styles.followerCount}>Be Friend</Text>
              </View> */}
            </View>
          </ScrollView>

          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              {showFullText ? fullText : truncatedText}
            </Text>
            <TouchableOpacity onPress={toggleText}>
              <Text style={styles.readMoreText}>
                {showFullText ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  scrollView: {
    // alignItems: 'center',
  },
  topContainer: {
    backgroundColor: '#202427',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
    alignItems: 'center',
  },
  col: {
    backgroundColor: '#2A2E31',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  counter: {
    fontSize: 14,
    color: colors.INACTIVE_CONTRAST,
  },
  counterTitle: {
    fontSize: 12,
    color: colors.CONTRAST,
  },
  detailsContainer: {
    margin: 10,
  },
  name: {
    fontSize: 16,
    color: colors.CONTRAST,
  },
  starIcon: {},
  uniqueName: {
    fontSize: 12,
    color: colors.SECONDARY,
  },
  designation: {
    fontSize: 14,
    color: colors.INACTIVE_CONTRAST,
  },
  bio: {
    fontSize: 14,
    color: colors.CONTRAST,
  },
  avatarContainer: {
    position: 'relative',
    borderRadius: 50,
  },
  editButton: {
    backgroundColor: '#2A2E31',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  editText: {
    color: colors.CONTRAST,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginHorizontal: 4,
    resizeMode: 'cover',
  },

  profileMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // profileContainer: {
  //   flexDirection: 'row',
  //   padding: 10,
  //   // backgroundColor: '#202427',
  //   margin: 10,
  //   borderRadius: 10,
  // },
  // detailsContainer: {
  //   marginLeft: 10,
  // },
  // name: {
  //   fontSize: 14,
  //   color: colors.CONTRAST,
  // },

  followingStatus: {
    fontSize: 12,
    color: colors.INACTIVE_CONTRAST,
  },
  countContainer: {
    marginTop: 20,
  },
  timeContainer: {
    // marginTop: 10,
  },
  time: {
    fontSize: 12,
    color: colors.INACTIVE_CONTRAST,
  },
  postMainContainer: {
    backgroundColor: '#202427',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  postContainer: {
    // flex: 1,
    marginVertical: 12,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  badge: {
    position: 'absolute',
    width: 60,
    height: 30,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftBadge: {
    top: 10,
    left: 10,
    backgroundColor: colors.SECONDARY,
  },
  topRightBadge: {
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    width: 'auto',
  },
  liveText: {
    color: colors.DARK,
    fontSize: 18,
    fontWeight: 'bold',
  },

  followerCount: {
    color: colors.CONTRAST,
    fontSize: 12,
    marginLeft: 6,
  },
  countersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  iconCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },

  messageContainer: {
    padding: 10,
  },
  messageText: {
    color: colors.CONTRAST,
    fontSize: 14,
    marginLeft: 6,
    lineHeight: 12,
    textAlign: 'left',
  },
  readMoreText: {
    color: 'gray',
    marginTop: 5,
    fontSize: 14,
  },
  heartContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -50}, {translateY: -50}],
  },
  heartIcon: {
    opacity: 0.8,
  },
});

export default Profile;
