import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const key = "authToken";

const storeToken = async (authUser) => {
  try {
    await SecureStore.setItemAsync(key, authUser);
  } catch (error) {
    console.log("Error storing the decoded user", error);
  }
};

const getUser = async () => {
  let userInfo = await AsyncStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);

  return userInfo ? userInfo : null;
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the decoded user", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the decoded user", error);
  }
};

export default {
  getToken,
  getUser,
  removeToken,
  storeToken,
};
