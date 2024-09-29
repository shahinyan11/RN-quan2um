import Icon from '@components/icons/Icon';
import {scaledSize} from '@utils/scaledSize';
import React, {useEffect, useRef, useState} from 'react';
import {
  Platform,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Text from '@components/textes/Text';
import Popover, {PopoverPlacement} from 'react-native-popover-view';
import styles from './style';

interface IPopOverCustomProps {
  description: string;
  containerStyle?: StyleProp<ViewStyle>;
}

function PopoverInfo({description, containerStyle}: IPopOverCustomProps) {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      onRequestClose();
    }, 1500);
  }, []);

  const onRequestOpen = () => {
    if (showPopover) {
      setShowPopover(false);
    }
    setShowPopover(true);
  };

  const onRequestClose = () => {
    setShowPopover(false);
  };

  return (
    <Popover
      placement={PopoverPlacement.TOP}
      isVisible={showPopover}
      onRequestClose={() => {
        onRequestClose();
      }}
      backgroundStyle={styles.backgroundStyle}
      popoverStyle={styles.content}
      from={
        <TouchableOpacity onPress={() => setShowPopover(true)}>
          <Text>
            <Icon
              containerStyle={[
                {
                  paddingHorizontal: scaledSize(2),
                  paddingTop:
                    Platform.OS !== 'ios' ? scaledSize(2) : scaledSize(8),
                },
                containerStyle,
              ]}
              name="info"
              size={15}
            />
          </Text>
        </TouchableOpacity>
      }>
      <Text type="textMini" style={styles.infoDescription}>
        {description}
      </Text>
    </Popover>
  );
}

export default PopoverInfo;
