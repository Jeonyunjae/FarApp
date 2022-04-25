import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginStackParamList } from '../../types';
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { InputText } from "../components/auth/AuthShared";
import { TextInput } from "react-native";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $userCode: String!
    $password: String!
    $phoneNumber: String!
    $email: String!
  ) {
    createAccount(
      userCode: $userCode
      password: $password
      phoneNumber: $phoneNumber
      email: $email
    ) {
      ok
      id
      error
    }
  }
`;

type CreateAccountStackNavigationProp = NativeStackScreenProps<LoginStackParamList, 'Welcome'>

export default function CreateAccount({ navigation } : CreateAccountStackNavigationProp) {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data:any) => {
    const {
      createAccount: { ok },
    } = data;
    const { userCode, password } = getValues();
    if (ok) {
      navigation.navigate("Login", {
        userCode,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const userCodeRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const phoneNumberRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const onNext = (nextOne:any) => {
    nextOne?.current?.focus();
  };

  const onValid = (data:any) => {
    if (!loading) {
      createAccountMutation({
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
    register("email", {
      required: true,
    });
    register("phoneNumber", {
      required: true,
    });
  }, [register]);
  return (
    <AuthLayout>
      <InputText
        ref={userCodeRef}
        placeholder="ID"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("userCode", text)}
      />
      <InputText
        ref={passwordRef}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("password", text)}
      />
      <InputText
        ref={emailRef}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(phoneNumberRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("email", text)}
      />
      <InputText
        ref={phoneNumberRef}
        placeholder="Phone Number"
        returnKeyType="done"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("phoneNumber", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />
      <AuthButton
        text="Create Account"
        disabled={false}
        loading={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}