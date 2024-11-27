// pages/PageSignUp.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import * as userService from '../services/userService';

export default function PageSignUp({ navigation }) {
  const [full_name, setFullname] = useState(''); // Novo estado para nome completo
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (!full_name || !username || !email || !password || !confirmPassword) {
        throw new Error('Todos os campos são obrigatórios.');
      }
  
      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem.');
      }
  
      const user = await userService.signUp({ email, password, username, full_name });
  
      navigation.navigate('PageSignUpCar', { userId: user.id, username });
    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert('Erro ao cadastrar', error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <View style={styles.main}>
        <Image source={require('../assets/images/CronometroInicio.png')} style={styles.icon} />
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: 'red' }]}>Tudo bueno?</Text>
          <Text style={styles.subtitle}>Pronto para mais uma corrida? Cadastre-se e vamos lá!</Text>
        </View>
      </View>

      <View style={styles.inputs}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput
            placeholder="Nome Completo"
            style={styles.input}
            placeholderTextColor="black"
            value={full_name}
            onChangeText={setFullname}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="at-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput
            placeholder="Usuário"
            style={styles.input}
            placeholderTextColor="black"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput
            placeholder="E-mail"
            style={styles.input}
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput
            placeholder="Senha"
            style={styles.input}
            placeholderTextColor="black"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput
            placeholder="Confirme sua senha"
            style={styles.input}
            placeholderTextColor="black"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.loginButtonText}>{loading ? 'Cadastrando...' : 'Próximo'}</Text>
        <Ionicons name="arrow-forward-outline" size={20} color="black" style={styles.iconRight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinha os itens no topo
    alignItems: 'center',
    paddingTop: 125, // Ajuste o padding superior conforme necessário
    backgroundColor: '#fff', // Fundo branco
  },
  main: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
  inputs: {
    width: '80%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  iconRight: {
    position: 'absolute',
    right: 20,
  },
  forgotPassword: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: 'red',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    width: '80%',
    justifyContent: 'center',
  },
  signupText: {
    color: 'red',
    textDecorationLine: 'underline',
  },
});
