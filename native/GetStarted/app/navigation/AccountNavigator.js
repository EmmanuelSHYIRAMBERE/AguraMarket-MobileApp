import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "../screens/AccountScreen";
import MessageScreen from "../screens/MessageScreen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AccountDetails"
      component={AccountScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Messages" component={MessageScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
