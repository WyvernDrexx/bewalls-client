import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Brand } from '../../generated/graphql';
import { ItemGroup } from '../../types';
import { hp, isLastElement, wp } from '../../utilities';

type BrandsProps = {
  brands: Brand[];
  onClick?: (brand: Brand, group: ItemGroup) => void;
  height: string | number;
  width: string | number;
  group: ItemGroup;
};

const Brands: React.FC<BrandsProps> = function (props) {
  const height = hp(props.height);
  const width = wp(props.width);

  const handleClick = (brand: Brand) => {
    if (props.onClick) props.onClick(brand, props.group);
  };

  if (!props.brands) return null;

  return (
    <>
      {props.brands.map((item, index) => {
        const isLast = isLastElement(index, props.brands.length);
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.root, isLast ? styles.marginRight : undefined]}
            onPress={() => handleClick(item)}
            key={item.id}>
            <Image
              style={[
                styles.image,
                {
                  height,
                  width,
                },
              ]}
              source={{ uri: item.imageUri }}
            />
            <View style={styles.textView}>
              <Text style={[styles.title, { color: item.highlightColor }]}>
                {item.name}
              </Text>
              <Text style={[styles.subTitle, { color: item.highlightColor }]}>
                Wallpapers
              </Text>
            </View>
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
    marginLeft: wp(4),
  },
  image: {
    borderRadius: hp(1.5),
    width: wp('65'),
    height: hp('60'),
    resizeMode: 'cover',
  },
  textView: {
    position: 'absolute',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp(2.3),
  },
  subTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp(1.3),
    fontWeight: '400',
  },
  marginRight: {
    marginRight: wp(4),
  },
});

export default Brands;
