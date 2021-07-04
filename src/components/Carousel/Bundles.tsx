import React from 'react';
import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Bundle } from '../../generated/graphql';
import { ItemGroup } from '../../types';
import { hp, isLastElement, wp } from '../../utilities';
import { LoadingView } from '../Loader/LoadingView';

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
  loading?: boolean;
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
          progressiveRenderingEnabled
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
  let width = props.width || '30%';

  if (props.loading || typeof props.items === 'undefined') {
    return <LoadingView height={props.height} />;
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
    marginLeft: wp(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: wp(4),
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
    marginRight: wp(2),
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  marginBottom: {
    marginBottom: wp(2),
  },
  loadingView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Bundles };
