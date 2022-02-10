import { NativeStackScreenProps } from "react-native-screens/native-stack";
import React, { useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LoginStackParamList } from "../../types";
import AuthLayout from "../components/auth/AuthLayout";
import { InputText } from "../components/auth/AuthShared";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../../apollo";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;

type LoginStackNavigationProp = NativeStackScreenProps<LoginStackParamList, 'Login'>

export default function LogIn({ navigation }: LoginStackNavigationProp) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const passwordRef = useRef();
  const onCompleted = (data:any) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      isLoggedInVar(true);
    }
  };
  const [logInMutation, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

   const onNext = (nextOne:any) => {
    nextOne?.current?.focus();
  };
  const onValid = (data:any) => {
    console.log(data);
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  useEffect(() => {
    register("userName", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout>
      <InputText
        placeholder="Username"
        returnKeyType="next"
        placeholderTextColor="gray"
        style={{ backgroundColor: "white", width: "100%" }}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text:any) => setValue("userName", text)}
      />
      <InputText
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        style={{ backgroundColor: "white", width: "100%" }}
        onChangeText={(text:any) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch("userName") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}