import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import auth from "@react-native-firebase/auth";
import { Envelope, Key } from "phosphor-react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Box, Heading, Icon, KeyboardAvoidingView, useTheme, VStack, } from "native-base";

import { Button } from "../components/Button";
import Logo from "../assets/logo_primary.svg";
import { FormInput } from "../components/FormInput";

const signInValidationSchema = zod.object({
  email: zod
    .string({ required_error: "E-mail obrigatório" })
    .email("Informe um e-mail válido"),
  password: zod
    .string({ required_error: "Senha obrigatória" })
    .min(6, "A senha deve conter no mínimo 6 caracteres"),
});

type SignInFormData = zod.infer<typeof signInValidationSchema>;

const SignIn: React.FC = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInValidationSchema),
  });

  async function handleSignIn({ email, password }: SignInFormData) {
    setIsLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      setIsLoading(false);

      let errorMessage = "Não foi possível entrar.";

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Usuário ou senha inválida.";
      } else {
        console.warn(error);
      }

      Alert.alert("Entrar", errorMessage);
    }
  }

  function handleSignUp() {
    navigate("signUp");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <Box flex={1} bg="gray.600">
        <KeyboardAvoidingView behavior="position" enabled>
          <VStack alignItems="center" px={8} pt={24}>
            <Logo />

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
              Acesse sua conta
            </Heading>

            <FormInput
              placeholder="E-mail"
              keyboardType="email-address"
              mb={4}
              InputLeftElement={
                <Icon ml={4} as={<Envelope color={colors.gray[300]} />} />
              }
              name="email"
              control={control}
              error={errors.email?.message}
            />

            <FormInput
              placeholder="Senha"
              secureTextEntry
              mb={8}
              InputLeftElement={
                <Icon ml={4} as={<Key color={colors.gray[300]} />} />
              }
              name="password"
              control={control}
              error={errors.password?.message}
            />

            <Button
              title="Entrar"
              w="full"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />

            <Button
              variant="secondary"
              bg="gray.600"
              borderWidth={2}
              borderColor="green.500"
              my={4}
              title="Criar conta"
              w="full"
              onPress={handleSignUp}
            />
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
