import React from 'react';
import { StyleProp, StyleSheet, ViewStyle, FlatList } from 'react-native';
import { Wallpaper } from '../../generated/graphql';
import { ItemGroup } from '../../types';
import { isLastElement, wp } from '../../utilities';
import { LoadingView } from '../Loader/LoadingView';
import { Card } from './Card';

type CardProps = {
  loaderColor?: string;
  items?: Wallpaper[];
  height: string | number;
  width: string | number;
  style?: StyleProp<ViewStyle>;
  disableLastMargin?: boolean;
  disableText?: boolean;
  onClick?: (wallpaper: Wallpaper, group: ItemGroup) => void;
  useFlatList?: boolean;
  group: ItemGroup;
  loading?: boolean;
  horizantal?: boolean;
  numColumns?: number;
};

type RenderItem = {
  item: Wallpaper;
  index: number;
};

const Cards: React.FC<CardProps> = function (props) {
  const numColumns = props.horizantal ? undefined : props.numColumns || 2;
  const loaderColor = props.loaderColor || 'black';
  const renderItem = (data: RenderItem) => {
    const isLast = isLastElement(data.index, props.items!.length);
    return (
      <Card
        group={props.group}
        key={data.item.id}
        style={[
          props.style,
          isLast && !props.disableLastMargin ? styles.marginRight : {},
        ]}
        wallpaper={data.item}
        height={props.height}
        width={props.width}
        index={data.index}
        onClick={props.onClick}
        hideText={props.disableText}
      />
    );
  };

  if (props.loading || typeof props.items === 'undefined') {
    return <LoadingView color={loaderColor} height={props.height} />;
  }

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      numColumns={numColumns}
      horizontal={props.horizantal}
      data={props.items!}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  marginRight: {
    marginRight: wp(2),
  },
  loadingView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Cards };
