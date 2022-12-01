import React, { useState } from 'react';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export function SignIn() {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  function handleSignIn(){
    auth()
    .signInWithEmailAndPassword((user), (password))
    .then(() => {
      navigation.navigate("Produtos");
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
      if (error.code === 'auth/user-not-found') {
        Alert.alert('That email address is invalid!');
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Password is invalid!');
      }
      console.error(error);
    });
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setUser}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignIn} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => { }} />
        <ButtonText title="Criar minha conta" onPress={() => navigation.navigate("SignUp")} />
      </Account>
    </Container>
  );
}