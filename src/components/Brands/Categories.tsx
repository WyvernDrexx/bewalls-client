import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Category } from '../../generated/graphql';
import { ItemGroup } from '../../types';
import { hp, isLastElement, wp } from '../../utilities';

type CategoryProps = {
  categories: Category[];
  onClick?: (category: Category, group: ItemGroup) => void;
  height: string | number;
  width: string | number;
  group: ItemGroup;
};

const Categories: React.FC<CategoryProps> = function (props) {
  const height = hp(props.height);
  const width = wp(props.width);

  const handleClick = (category: Category) => {
    if (props.onClick) props.onClick(category, props.group);
  };

  if (!props.categories) return null;

  return (
    <>
      {props.categories.map((item, index) => {
        const isLast = isLastElement(index, props.categories.length);
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
            <LinearGradient
              colors={['transparent', 'rgba(21, 21, 21, 0.7)']}
              style={[styles.textView, { height: height / 1.5, width }]}>
              <Text style={styles.title}>{item!.name}</Text>
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
    bottom: 0,
    borderRadius: wp(1.5),
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp(2.3),
    position: 'absolute',
    bottom: hp(1),
    left: wp(3),
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

export default Categories;
