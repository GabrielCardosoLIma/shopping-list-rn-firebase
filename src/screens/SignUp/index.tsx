import React, { useState } from "react";
import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import auth from "@react-native-firebase/auth";
import { Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const navigation = useNavigation();

  function handleSignUp() {
    if(password === confirmpassword){
      auth()
      .createUserWithEmailAndPassword((email), (password))
      .then(() => {
        navigation.navigate("SignIn");
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
    
        console.error(error);
      });
    } else {
      Alert.alert("Erro: credenciais inválidas!!")
    }
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input onChangeText={setEmail} placeholder="e-mail" keyboardType="email-address" />

      <Input onChangeText={setPassword}placeholder="senha" secureTextEntry />

      <Input onChangeText={setConfirmpassword} placeholder="confirme a senha" secureTextEntry />

      <Button title="Cadastrar" onPress={handleSignUp} />
    </Container>
  );
}
