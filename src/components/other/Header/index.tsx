import React from 'react';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';

import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from '@components/icons/Icon';
import InputSearch from '@components/inputs/InputSearch';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  inpContainerStyle: {
    flex: 1,
    marginBottom: scaledSize(8),
  },
  iconContainerStyle: {
    marginRight: scaledSize(16),
  },
});

interface IHeader {
  title?: string;
  onBack: () => void;
}

interface IHeaderSearch extends IHeader {
  onSearch: (value: string) => void;
}

export const Header = React.memo(({title, onBack}: IHeader) => {
  const white50 = EStyleSheet.value('$white50');
  return (
    <Row>
      <Icon
        disabled={false}
        name="arrow-left"
        color={white50}
        size={20}
        onPress={onBack}
        containerStyle={styles.iconContainerStyle}
      />

      <Text>{title}</Text>
    </Row>
  );
});

export const HeaderWithSearch = React.memo(
  ({onBack, onSearch}: IHeaderSearch) => {
    return (
      <Row>
        <Icon
          disabled={false}
          name="arrow-left"
          size={20}
          onPress={onBack}
          containerStyle={styles.iconContainerStyle}
        />

        <InputSearch
          onChangeText={onSearch}
          containerStyle={styles.inpContainerStyle}
        />
      </Row>
    );
  },
);
