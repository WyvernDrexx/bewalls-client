import React from 'react';
import {
  Image,
  FlatList,
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

type RenderItem = {
  item: Bundle;
  index: number;
};

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
  numColumns?: number;
  loaderLight?: boolean;
  HeaderComponent?: React.ReactElement
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
          source={{ uri: props.item.imageSmall }}
        />
        <Text style={[boxStyles.text, { color: props.item.highlightColor }]}>
          {props.item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Bundles: React.FC<BundlesProps> = React.memo(function (props) {
  let height = props.height || '13%';
  let width = props.width || '30%';
  const numColumns = props.vertical ? props.numColumns || 3 : undefined;
  if (props.loading || typeof props.items === 'undefined') {
    return <LoadingView light={props.loaderLight} height={props.height} />;
  }

  const renderItem: (data: RenderItem) => JSX.Element = ({ item, index }) => {
    return (
      <BundleItem
        itemType={props.itemType}
        disabled={props.disableClick}
        style={[
          isLastElement(index, props.items!) && !props.vertical
            ? boxStyles.lastItem
            : {},
          props.vertical ? styles.marginBottom : {},
          !props.vertical ? boxStyles.horizantal : {},
        ]}
        key={index}
        onClick={props.onClick}
        item={item}
        height={height!}
        width={width!}
      />
    );
  };

  return (
    <View style={[styles.root, props.style]}>
      <FlatList
        ListHeaderComponent={props.HeaderComponent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        horizontal={!props.vertical}
        data={props.items}
        keyExtractor={i => i.id}
        renderItem={renderItem}
      />
    </View>
  );
});

const boxStyles = StyleSheet.create({
  box: {
    backgroundColor: 'black',
    borderRadius: hp(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(2),
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
  horizantal: {
    marginLeft: wp(2),
  },
  lastItem: {
    marginRight: wp(2),
  },
});

const styles = StyleSheet.create({
  root: {},

  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
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
