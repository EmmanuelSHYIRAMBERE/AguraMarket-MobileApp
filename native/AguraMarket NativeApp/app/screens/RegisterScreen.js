import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import Screen from "../assets/components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../assets/components/forms";
import authApi from "../api/auth";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../assets/components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.message);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    const { data: authToken } = await loginApi.request({ email, password });
    auth.logIn(authToken);
  };

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={true} />
      <Image
        style={styles.logo}
        source={require("../assets/images/image/hero-banner.png")}
      />
      <AppForm
        initialValues={{ fullNames: "", email: "", phoneNo: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="account"
          name="fullNames"
          placeholder="Full names"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email address"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCorrect={false}
          icon="phone"
          keyboardType="phone-pad"
          name="phoneNo"
          placeholder="Phone number"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});

export default RegisterScreen;
