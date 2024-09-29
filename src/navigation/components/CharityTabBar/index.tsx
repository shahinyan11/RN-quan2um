import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import styles from './styles';

interface IBottomTabBarProps extends BottomTabBarProps {}

const CharityTabBar = (props: IBottomTabBarProps) => {
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
              <View>{options?.tabBarIcon({focused: isFocused})}</View>

              <Text style={{marginTop: 8, opacity: isFocused ? 1 : 0.4}}>
                {options?.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CharityTabBar;
