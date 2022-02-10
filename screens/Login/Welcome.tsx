import { NativeStackScreenProps } from "react-native-screens/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { LoginStackParamList } from '../../types';
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

type WelcomeScreenNavigationProp = NativeStackScreenProps<LoginStackParamList, 'Welcome'>

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

export default function Welcome({ navigation } : WelcomeScreenNavigationProp) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("Login");
  return (
    <AuthLayout>
      <AuthButton
        text='Create New Account'
        disabled={false}
        loading={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}