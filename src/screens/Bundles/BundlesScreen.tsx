import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Bundles } from '../../components/Carousel';
import MiniSearchButton from '../../components/SearchBar/MiniSearchButton';
import StackHeader from '../../components/StackHeader';
import { Bundle, useBundlesScreenQuery } from '../../generated/graphql';
import { useTheme } from '../../hooks';
import { BundlesScreenProps } from '../../navigation/types';
import { ItemGroup } from '../../types';

const BundlesScreen: React.FC<BundlesScreenProps> = function (props) {
  const { themedStyles } = useTheme();
  const { loading, data } = useBundlesScreenQuery();

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

  if (loading) return null;

  return (
    <View style={[styles.root, themedStyles.bg]}>
      <StackHeader
        right={<MiniSearchButton onClick={handleSearchButtonClick} />}
        title="Bundles"
      />
      <View>
        <Bundles
          onClick={handleBundleClick}
          vertical
          items={data?.bundles as Bundle[]}
          itemType="bundle"
          width="30.7"
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
  container: {
    justifyContent: 'flex-start',
  },
});

export { BundlesScreen };
