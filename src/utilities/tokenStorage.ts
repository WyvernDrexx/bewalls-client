import AsyncStorage from '@react-native-async-storage/async-storage';

const tokenStorage = {
  async setToken(token: string) {
    try {
      await AsyncStorage.setItem('@token', token);
      return token;
    } catch (error) {
      return null;
    }
  },
  async getToken() {
    try {
      const token = await AsyncStorage.getItem('@token');
      return token;
    } catch (error) {
      return null;
    }
  },
  async deleteToken() {
    try {
      await AsyncStorage.removeItem('@token');
      return true;
    } catch {
      return null;
    }
  },
};

export default tokenStorage;
