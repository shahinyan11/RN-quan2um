import React from 'react';
import {Pressable, SafeAreaView, View} from 'react-native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

import Text from '@components/textes/Text';

import styles from './styles';

export function TopTabBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

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
            <Pressable
              key={index}
              onPress={onPress}
              style={[styles.tab, isFocused && styles.activeTab]}>
              <Text type="t6" style={styles.tabLabel}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
