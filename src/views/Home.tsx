import {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors from 'utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownSelection from 'components/DropdownSelection';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, GeneratedImage, selectImages } from 'store/generatedImages';
import { useNavigation } from '@react-navigation/native';
import Tooltip from 'components/Tooltip';
import Loader from 'ui/Loader';
import { RootState } from 'store';
// import {resposeData} from 'data/respose';

interface Props {}

const Home: FC<Props> = props => {
  const scrollViewRef = useRef<any>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const [prompt, setPrompt] = useState<string>('');
  const [sample, setSample] = useState<number>(1);
  const [quality, setQuality] = useState<string>('MID');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [promptLength, setPromptLength] = useState<number>(0);
  const [artStyle, setArtStyle] = useState<string>('NoSTYLE');
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const [resposeData, setResposeData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  


  const dispatch = useDispatch();

  const navigation: any = useNavigation()

  const imagesData = useSelector((state: RootState) => selectImages(state));

  useEffect(() => {
    if (contentHeight > 0 && scrollViewHeight > 0) {
      const scrollToPosition = contentHeight / 2 - scrollViewHeight / 2;
      scrollViewRef.current.scrollTo({y: scrollToPosition, animated: true});
    }
  }, [contentHeight, scrollViewHeight]);

  const handlePromptChange = (text: string) => {
    if (text.length <= 2000) {
      setPrompt(text);
    }
  };

  useEffect(() => {
    setPromptLength(prompt.length);
  }, [prompt]);
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  }, [errorMessage]);

  const visiblityOptions = [
    {title: '1'},
    {title: '2'},
    {title: '3'},
    {title: '4'},
    {title: '5'},
  ];
  const qualityOptions = [{title: 'LOW'}, {title: 'MID'}, {title: 'HIGH'}];
  const ratioOptions = [
    {title: '1:1'},
    // {title: '13:9'},
    // {title: '19:13'},
    // {title: '2:3'},
    // {title: '3:2'},
  ];

  const DropDownSampleIcon = () => (
    <Entypo
      name="images"
      size={12}
      color={colors.CONTRAST}
      style={{marginRight: -6}}
    />
  );
  const DropDownQualityIcon = () => (
    <MaterialIcons
      name="high-quality"
      size={12}
      color={colors.CONTRAST}
      style={{marginRight: -6}}
    />
  );
  const DropDownRatioIcon = () => (
    <MaterialIcons
      name="aspect-ratio"
      size={12}
      color={colors.CONTRAST}
      style={{marginRight: -6}}
    />
  );

  const artStyleHandler = (sample:number) => {
   if(sample === 1) {
    setArtStyle("PHOTOREALISTIC")
    setTooltipVisible(true)
  } else if(sample === 2) {
    setArtStyle("SCIFI")
    setTooltipVisible(true)
  } else if(sample === 3){
    setArtStyle("LANDSCAPE")
    setTooltipVisible(true)
  } else {
    setArtStyle("NOSTYLE")
    setTooltipVisible(true)
  }


  setTimeout(() => {
    setTooltipVisible(false)
  }, 1000);
}

  const API_Key = 'lmwr_sk_uzc3pwkw76_CP9SmAJzX0YlZTHh4U6RvisILW2oZ7tLHbFfw';

  const generateImage = async () => {
    setIsLoading(true)
    if (prompt.length === 0) {
      setErrorMessage('Please Enter Prompt');
    }
    const resp = await fetch(`https://api.limewire.com/api/image/generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Version': 'v1',
        Accept: 'application/json',
        Authorization: `Bearer ${API_Key}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        aspect_ratio: aspectRatio,
        quality: quality,
        samples: sample,
        style: artStyle !== "NoSTYLE" ? artStyle : "",
      }),
    });

    const data = await resp.json();

    if (data.status === 403) {
      setErrorMessage('No Credits Remaining.');
      setIsLoading(false)
    }
    if (data.status === 'COMPLETED') {
      setIsLoading(false)
      setResposeData([data]);
      // dispatch(addImage(data));
    } else {
      setIsLoading(false)
    }
  };

  const handleAddImage = (imageUri: string, id: string, prompt:string) => {
    const newImage: GeneratedImage = {
      id: new Date().toISOString(),
      uri: imageUri,
      prompt: prompt,
      createdAt: new Date().toISOString(),
    };

    dispatch(addImage(newImage));
    navigation.navigate('DownloadImage', {newImage})
  };


  return (
    <ScrollView>
      <LinearGradient
        colors={['rgba(105, 24, 223, 0)', 'rgba(2,13,34, 1)']}
        style={styles.container}>
        <View style={styles.promptContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              Transform Your Ideas Into Stunning Visuals
            </Text>
          </View>
          <View style={styles.creditContainer}>
            <Text style={styles.creditText}>{`Credits Remaining: ${
              resposeData ? Math.floor(resposeData[0].credits_remaining) : 0
            }`}</Text>
            <Text style={styles.creditText}>{`Credits Userd: ${
              resposeData ? Math.floor(resposeData[0].credits_used) : 0
            }`}</Text>
          </View>
          <View style={styles.InputBoxContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Describe your image..."
                placeholderTextColor="rgba(255, 255, 255, 0.8)"
                value={prompt}
                onChangeText={handlePromptChange}
                maxLength={2000}
              />
              <Text style={styles.charCount}>{promptLength}/2000</Text>
            </View>
            <View style={styles.optionsContainer}>
              <View style={styles.col1}>
                <View style={styles.row}>
                  <View style={styles.innerCol}>
                    <DropDownSelection
                      DropDownLeftIcon={DropDownSampleIcon}
                      emojisWithIcons={visiblityOptions}
                      defaultTitle="Samples"
                      width={100}
                      selected={sample}
                      setSelected={setSample}
                    />
                  </View>
                  <View style={styles.innerCol}>
                    <DropDownSelection
                      DropDownLeftIcon={DropDownQualityIcon}
                      emojisWithIcons={qualityOptions}
                      defaultTitle="Quality"
                      width={100}
                      selected={quality}
                      setSelected={setQuality}
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.innerCol}>
                    <DropDownSelection
                      DropDownLeftIcon={DropDownRatioIcon}
                      emojisWithIcons={ratioOptions}
                      defaultTitle="Aspect Ratio"
                      width={140}
                      selected={aspectRatio}
                      setSelected={setAspectRatio}
                    />
                  </View>
                  {/* <View style={styles.innerCol}>
                    <DropDownSelection
                      DropDownLeftIcon={DropDownQualityIcon}
                      emojisWithIcons={qualityOptions}
                      defaultTitle="Quality sss"
                      width={100}
                    />
                  </View> */}
                </View>
              </View>
              <View style={styles.col2}>
                <TouchableOpacity
                  style={[styles.generateSmallButton, {paddingHorizontal: isLoading ? 25: 10, opacity: isLoading ? 0.5 : 1}]}
                  onPress={generateImage}>
                  <FontAwesome name="magic" color={colors.CONTRAST} size={16} />
                  {isLoading ? <Loader /> : <Text style={{color: colors.CONTRAST}}>Generate</Text>}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
        </View>
         <Tooltip visible={tooltipVisible} text={artStyle}>
        </Tooltip>
        <View style={styles.artContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Art Style</Text>
          </View>
          <ScrollView horizontal style={styles.styleGrid}>
            <View style={styles.styleItem}>
              <TouchableOpacity onPress={() => {artStyleHandler(0)}} style={styles.noStyle}>
                <MaterialIcons
                  name="do-not-disturb-alt"
                  color={colors.CONTRAST}
                  size={24}
                />
                <Text style={styles.noStyleText}>No Style</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {artStyleHandler(1)}} style={styles.styleItem}>
              <Image
                source={require('../assets/images/image2.jpg')}
                style={styles.styleImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {artStyleHandler(2)}} style={styles.styleItem}>
              <Image
                source={require('../assets/images/image4.jpg')}
                style={styles.styleImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {artStyleHandler(3)}} style={styles.styleItem}>
              <Image
                source={require('../assets/images/image6.jpg')}
                style={styles.styleImage}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.exploreContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Explore Images</Text>
          </View>
          <View style={styles.imagesGrid}>
            {imagesData &&
              imagesData.map((item: any) => (
                <TouchableOpacity onPress={() =>{handleAddImage(item.uri, item.id, item.prompt)}} key={item.asset_id} style={styles.column}>
                  <Image
                    source={{
                      uri: `${item.uri}`,
                    }}
                    style={styles.exploreImage}
                  />
                </TouchableOpacity>
              ))}
            {resposeData &&
              resposeData[0].data.map((item: any) => (
                <TouchableOpacity onPress={() =>{handleAddImage(item.asset_url, item.asset_id, item.asset_type)}} key={item.asset_id} style={styles.column}>
                  <Image
                    source={{
                      uri: `${item.asset_url}`,
                    }}
                    style={styles.exploreImage}
                  />
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SECONDARY,
  },
  headingContainer: {
    padding: 10,
  },
  heading: {
    fontSize: 32,
    color: colors.CONTRAST,
    fontWeight: 'bold',
  },
  creditContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  creditText: {
    fontSize: 12,
    color: colors.CONTRAST,
  },
  errorMessage: {
    fontSize: 12,
    color: colors.ERROR,
    marginLeft: 10,
  },
  promptContainer: {
    flex: 1,
  },
  InputBoxContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: colors.INACTIVE_CONTRAST,
    borderWidth: 2,
    margin: 5,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  label: {
    fontSize: 18,
    color: colors.CONTRAST,
  },
  exploreText: {
    fontSize: 16,
    color: colors.INACTIVE_CONTRAST,
  },
  inputContainer: {
    // paddingHorizontal: 10,
  },
  input: {
    // backgroundColor: colors.INACTIVE_CONTRAST,
    color: colors.INACTIVE_CONTRAST,
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    // padding: 10,
  },
  hiddenBox: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgreen',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0
  },
  hiddenBoxText: {
    opacity: 1,
  },
  col1: {
    flex: 2,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  col2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  innerCol: {
    flex: 1,
    marginRight: 10,
  },
  generateSmallButton: {
    // width: '30%',
    flexDirection: 'row-reverse',
    gap: 5,
    // borderRadius: 20,
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    borderBottomColor: 'indigo',
    borderBottomWidth: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopEndRadius: 20,
    shadowColor: '#CDA7F3',
    shadowRadius: 10,
    elevation: 10,
    shadowOffset: {width: 0, height: 10},
  },
  buttonContainer: {
    margin: 10,
  },
  generateButton: {
    backgroundColor: colors.CONTRAST,
    borderRadius: 20,
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#CDA7F3',
    shadowRadius: 20,
    elevation: 20,
    shadowOffset: {width: 0, height: 20},
  },
  buttonText: {
    fontSize: 20,
    color: colors.SECONDARY,
  },
  artContainer: {},
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noStyle: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.INACTIVE_CONTRAST,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noStyleText: {
    fontSize: 14,
    color: colors.CONTRAST,
  },
  styleItem: {
    alignItems: 'center',
    padding: 10,
  },
  styleImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  exploreContainer: {},
  imagesGrid: {
    // flex: 1,
    width: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // gap: 2,
  },
  column: {
    margin: 10,
    width: 180,
    // paddingRight: 10,
  },
  exploreImage: {
    width: 180,
    height: 180,
    borderRadius: 20,
  },
});

export default Home;
