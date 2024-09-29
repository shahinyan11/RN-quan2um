import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import styles from './styles';
import {scaledSize} from '@utils/scaledSize';
import Text from '@components/textes/Text';

interface IBottomTabBarProps extends BottomTabBarProps {}

const BottomTabBar = (props: IBottomTabBarProps) => {
  const {state, descriptors, navigation, inactiveTintColor, activeTintColor} =
    props;
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.iconContainer}>
              <View>
                {options?.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? activeTintColor : inactiveTintColor,
                  size: scaledSize(24),
                })}
              </View>

              <Text type="hint">{options?.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomTabBar;
