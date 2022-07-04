import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LoginStackParamList } from "../../types";
import AuthLayout from "../components/auth/AuthLayout";
import { InputText } from "../components/auth/AuthShared";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";
import { isLoggedInVar, logUserIn } from "../../apollo";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation login($userCode: String!, $password: String!) {
    login(userCode: $userCode, password: $password) {
      ok
      token
    }
  }
`;

type LoginStackNavigationProp = NativeStackScreenProps<LoginStackParamList, 'Login'>

export default function Login({ navigation, route: { params } }: LoginStackNavigationProp) {
  let loadCheck = false;
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      password: params?.password,
      userCode: params?.userCode,
    },
  });
  const passwordRef = useRef();
  const onCompleted = async(data:any) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

   const onNext = (nextOne:any) => {
    nextOne?.current?.focus();
  };
  const onValid = (data:any) => {
    if (!loadCheck) {
      loadCheck = true;
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  useEffect(() => {
    register("userCode", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout>
      <InputText
        placeholder="UserCode"
        returnKeyType="next"
        placeholderTextColor="gray"
        value={watch("userCode")}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text:any) => setValue("userCode", text)}
      />
      <InputText
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="gray"
        returnKeyType="done"
        value={watch("password")}
        onChangeText={(text:any) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        loading={loadCheck}
        disabled={!watch("userCode") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}