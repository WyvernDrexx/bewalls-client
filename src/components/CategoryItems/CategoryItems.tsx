import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Category } from '../../generated/graphql';
import { ItemGroup } from '../../types';
import { hp, isLastElement, numberToMetricScale, wp } from '../../utilities';
import { LoadingView } from '../Loader/LoadingView';

type CategoryProps = {
  categories: Category[];
  onClick?: (category: Category, group: ItemGroup) => void;
  height: string | number;
  width: string | number;
  group: ItemGroup;
  isVertical?: boolean;
  loading?: boolean;
};

const Categories: React.FC<CategoryProps> = function (props) {
  const height = hp(props.height);
  const width = wp(props.width);
  const [imageLoading, setImageLoading] = useState(true);

  const handleClick = (category: Category) => {
    if (props.onClick) props.onClick(category, props.group);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (props.loading || typeof props.categories === 'undefined') {
    return <LoadingView height={props.height} width={100} />;
  }

  return (
    <>
      {props.categories.map((item, index) => {
        const isLast = isLastElement(index, props.categories.length);
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.root,
              isLast && !props.isVertical ? styles.marginRight : undefined,
              props.isVertical ? styles.marginBottom : styles.marginLeft,
            ]}
            onPress={() => handleClick(item)}
            key={item.id}>
            <Image
              progressiveRenderingEnabled
              blurRadius={imageLoading ? 5 : 0}
              onLoadEnd={handleImageLoad}
              style={[
                styles.image,
                {
                  height,
                  width,
                },
              ]}
              source={{ uri: item.imageUri }}
            />
            <View style={[styles.totalNumberOfItems]}>
              <Text style={[styles.numberOfItemsText]}>
                {item.totalNumberOfItems}
              </Text>
            </View>
            <LinearGradient
              colors={['transparent', 'rgba(21, 21, 21, 0.7)']}
              style={[styles.textView, { height: height / 1.5, width }]}>
              <View
                style={[styles.flex, { width: width - wp(4), left: wp(2) }]}>
                <Text style={styles.title}>{item!.name}</Text>
                <Text style={styles.lightText}>
                  {numberToMetricScale(item.visits)}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(1.5),
  },
  image: {
    borderRadius: hp(1.5),
    width: wp('66'),
    height: hp('60'),
    resizeMode: 'cover',
  },
  textView: {
    position: 'absolute',
    bottom: 0,
    borderRadius: wp(3),
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: wp(4),
  },
  marginRight: {
    marginRight: wp(2),
  },
  marginLeft: {
    marginLeft: wp(2),
  },
  marginBottom: {
    marginBottom: wp(2),
  },
  loadingView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalNumberOfItems: {
    position: 'absolute',
    top: hp(1),
    right: wp(4),
    backgroundColor: 'white',
    padding: wp(1),
    paddingHorizontal: wp(2.4),
    borderRadius: wp(2),
  },
  numberOfItemsText: {
    fontWeight: 'bold',
    color: '#5b5bff',
    fontSize: wp(3.4),
  },
  flex: {
    position: 'absolute',
    bottom: hp(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lightText: {
    color: 'white',
  },
});

export default Categories;
