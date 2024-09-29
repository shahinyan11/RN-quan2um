import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(
      `[AsyncStorage]: Trouble with save item key[${key}] to storage`,
    );
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      return value;
    }
    return '';
  } catch (e) {
    console.error(
      `[AsyncStorage]: Trouble with get item key[${key}] from storage`,
    );
  }
};

export const clearData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(
      `[AsyncStorage]: Trouble with clear storage item with key[${key}]`,
    );
  }
};
