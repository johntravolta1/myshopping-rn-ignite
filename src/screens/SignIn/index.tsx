import { Alert } from 'react-native';
import React, { useState } from 'react';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import auth from '@react-native-firebase/auth'


export function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonimously() {
    const {user} = await auth().signInAnonymously()
    console.log(user)
  }

  function handleCreateUserAccount() {
    auth().createUserWithEmailAndPassword(email,password)
    .then(() => {Alert.alert('Usuaário criado com sucesso!')})
    .catch(error => {
      console.log(error.code)
      switch (error.code) {
        case 'auth/email-already-in-use': 
          Alert.alert('Esse e-mail já está em uso!')
          break;
        case 'auth/weak-password':
          Alert.alert('Senha muito fraca!')
          break;
        case 'auth/invalid-email':
          Alert.alert('E-mail inválido!')
          break;
        default:
          Alert.alert(error.code)
          break;
      }
    })
  }

  function handleSignInWithEmailAndPassword() {
    auth().signInWithEmailAndPassword(email,password)
    .then(({user}) => {console.log(user.email)})
    .catch(error => {
      console.log(error.code)

      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Usuário não encontrado!')
          break;
        case 'auth/wrong-password':
          Alert.alert('Senha incorreta!')
          break;
        default:
          Alert.alert(error.code)
          break;
      }
    })
  }

  function handleForgotPassword() {
    auth().sendPasswordResetEmail(email).then(()=> Alert.alert('E-mail de reset enviado com sucesso'))
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compras pra te ajudar</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}