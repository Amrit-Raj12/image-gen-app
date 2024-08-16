import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import ArrowIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import colors from 'utils/colors';

interface Props {
  emojisWithIcons: Array<{title: string; icon?: string}>;
  defaultTitle: string;
  width: any;
  height?: number;
  fontSize?: number;
  DropDownLeftIcon: any;
  selected: string | number;
  setSelected: (value: any) => void;
}

const DropDownSelection: FC<Props> = ({
  emojisWithIcons,
  defaultTitle,
  width,
  height = 25,
  fontSize = 12,
  DropDownLeftIcon,
  selected,
  setSelected,
}) => {
  // const emojisWithIcons = [
  //   {title: 'public', icon: 'emoticon-happy-outline'},
  //   {title: 'private', icon: 'emoticon-cool-outline'},
  // ];

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={emojisWithIcons}
        onSelect={(selectedItem, index) => {
          setSelected(selectedItem.title);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View
              style={[
                styles.dropdownButtonStyle,
                {width: width, height: height},
              ]}>
              {selectedItem && (
                <Icon
                  name={selectedItem.icon}
                  style={styles.dropdownButtonIconStyle}
                />
              )}
              <View style={styles.dropdownButtonTxtStyle}>
                {/* <Feather
                  name="globe"
                  size={12}
                  color={colors.CONTRAST}
                  style={{marginRight: -6}}
                /> */}
                <DropDownLeftIcon />
                <Text style={styles.dropdownTitle}>
                  {(selectedItem && selectedItem.title) || defaultTitle}
                </Text>
              </View>
              <ArrowIcon
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}>
              <Icon
                name={item.icon}
                style={[styles.dropdownItemIconStyle, {fontSize: fontSize}]}
              />
              <Text style={[styles.dropdownItemTxtStyle, {fontSize: fontSize}]}>
                {item.title}
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  dropdownButtonStyle: {
    // height: 25,
    // backgroundColor: '#151515',
    // borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 12,
    margin: 0,
    borderRadius: 20,
    borderColor: colors.INACTIVE_CONTRAST,
    borderWidth: 2,
    paddingHorizontal: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontWeight: '500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: colors.INACTIVE_CONTRAST,
  },
  dropdownTitle: {
    fontSize: 12,
    marginLeft: 15,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dropdownButtonArrowStyle: {
    fontSize: 18,
    // marginRight: 28,
    color: colors.INACTIVE_CONTRAST,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontWeight: '500',
    color: '#151E26',
    marginLeft: 10,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: '#151E26',
  },
});

export default DropDownSelection;
