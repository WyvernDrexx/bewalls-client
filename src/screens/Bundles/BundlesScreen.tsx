import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Bundles } from '../../components/Carousel';
import StackHeader from '../../components/StackHeader';
import { useTheme } from '../../hooks';
import { BundlesScreenProps } from '../../navigation/types';
import { Bundle, useBundlesScreenQuery } from '../../generated/graphql';
import { ItemGroup } from '../../types';
import MiniSearchButton from '../../components/SearchBar/MiniSearchButton';

const BundlesScreen: React.FC<BundlesScreenProps> = function (props) {
  const { themedStyles } = useTheme();
  const { loading, data } = useBundlesScreenQuery();

  if (loading) return null;

  const goBack = () => {
    props.navigation.goBack();
  };

  const handleBundleClick = (bundle: Bundle, group: ItemGroup) => {
    props.navigation.navigate('Selection', {
      title: bundle.name,
      group,
      groupId: bundle.id,
    });
  };

  const handleSearchButtonClick = () => {
    props.navigation.navigate('Search');
  };

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader
        right={<MiniSearchButton onClick={handleSearchButtonClick} />}
        onLeftClick={goBack}
        title="Bundles"
        titlePosition="left"
      />
      <View>
        <Bundles
          onClick={handleBundleClick}
          vertical
          items={data?.bundles as Bundle[]}
          itemType="bundle"
          width="28"
          height="15"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export { BundlesScreen };
