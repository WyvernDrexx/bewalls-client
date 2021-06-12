import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ScrollView,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Bundle } from '../../generated/graphql';
import { ItemGroup } from '../../types';

import { hp, wp, isLastElement } from '../../utilities';

type BundlesProps = {
  items?: Bundle[];
  style?: StyleProp<ViewStyle>;
  onClick?: (bundle: Bundle, itemType: ItemGroup) => void;
  scrollEnabled?: boolean;
  disableClick?: boolean;
  itemType: ItemGroup;
  width?: string;
  height?: string;
  vertical?: boolean;
};

type BundleItemProps = {
  item: Bundle;
  style?: StyleProp<ViewStyle>;
  onClick?: (bundle: Bundle, itemType: ItemGroup) => void;
  disabled?: boolean;
  itemType: ItemGroup;
  width: string;
  height: string;
};

const BundleItem: React.FC<BundleItemProps> = function (props) {
  const handleClick = () => {
    if (props.onClick) props.onClick(props.item, props.itemType);
  };

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={handleClick}
      activeOpacity={0.8}>
      <View
        style={[
          boxStyles.box,
          {
            backgroundColor: props.item.color,
          },
          {
            height: hp(props.height),
            width: wp(props.width),
          },
          props.style,
        ]}>
        <Image
          style={[
            { height: hp(props.height), width: wp(props.width) },
            boxStyles.image,
          ]}
          source={{ uri: props.item.imageUri }}
        />
        <Text style={[boxStyles.text, { color: props.item.highlightColor }]}>
          {props.item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Bundles: React.FC<BundlesProps> = function (props) {
  let height = props.height || '13%';
  let width = props.width || '27%';

  if (!props.items) {
    return null;
  }

  return (
    <View style={[styles.root, props.style]}>
      <ScrollView
        scrollEnabled={!props.scrollEnabled}
        horizontal={!props.vertical}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}>
        <View style={styles.scrollView}>
          {props.items.map((item, index) => {
            return (
              <BundleItem
                itemType={props.itemType}
                disabled={props.disableClick}
                style={[
                  isLastElement(index, props.items!) ? styles.lastBox : {},
                  props.vertical ? styles.marginBottom : {},
                ]}
                key={index}
                onClick={props.onClick}
                item={item}
                height={height!}
                width={width!}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const boxStyles = StyleSheet.create({
  box: {
    backgroundColor: 'black',
    borderRadius: hp(2),
    marginLeft: wp(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: hp(2.3),
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: wp(2),
    position: 'absolute',
  },
  image: {
    borderRadius: hp(2),
  },
});

const styles = StyleSheet.create({
  root: {},
  lastBox: {
    marginRight: wp(4),
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  marginBottom: {
    marginBottom: hp(2),
  },
});

export { Bundles };
