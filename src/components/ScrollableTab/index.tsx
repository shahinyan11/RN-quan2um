import React, {useRef} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import Props from './types';
import st from './styles';

export default function ScrollableTab({
  onChange,
  tabs,
  containerStyle,
  activeTab,
}: Props) {
  const flatListRef = useRef(null);

  const handleTabChange = (index: number, id?: number) => () => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.5,
    });

    onChange(id);
  };

  const renderItem = ({item, index}: any) => {
    return (
      <Pressable
        style={item.id === activeTab ? st.activeTabItem : st.tabItem}
        onPress={handleTabChange(index, item.id)}>
        <Text style={item.id === activeTab ? st.activeTabText : st.tabText}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={[st.container, containerStyle]}>
      <FlatList
        ref={flatListRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={tabs}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{width: 8}} />}
        contentContainerStyle={st.flatList}
      />
    </View>
  );
}
