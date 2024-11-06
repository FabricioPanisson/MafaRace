import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones para o botão "Voltar"

export default function PageLogin({ navigation }) {
  return (
    <ImageBackground source={require('../assets/images/backgroundMapLogin1.jpg')} style={styles.background}>
      <View style={styles.main}>
        <Image source={require("../assets/images/CronometroInicio.png")} style={styles.icon} />
        
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: "red" }]}>Buenas</Text>
          <Text style={styles.title}>tchê!</Text>
          <Text style={styles.subtitle}>Pronto para mais uma corrida? Faça login e vamos lá!</Text>
        </View>
      </View>

      <View style={styles.inputs}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput placeholder='Username' style={styles.input} placeholderTextColor="black" />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput placeholder='Password' style={styles.input} placeholderTextColor="black" secureTextEntry={true} />
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('PageHome')}>
        <Text style={styles.loginButtonText}>Entrar</Text>
        <Ionicons name="arrow-forward-outline" size={20} color="black" style={styles.iconRight} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPassword} onPress={() => {/* Adicionar lógica de recuperação de senha aqui */}}>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text>Ainda não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PageSignUp')}>
          <Text style={styles.signupText}> Clique aqui</Text>
        </TouchableOpacity>
        <Text> e cadastre-se</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'left',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'left',
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
    marginTop: 10, // Espaçamento entre os inputs e o botão de login
    justifyContent: 'center', // Centraliza os elementos na horizontal
  },
  loginButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    flex: 1, // Permite que o texto ocupe o espaço disponível
  },
  iconRight: {
    position: 'absolute', // Coloca o ícone na posição absoluta
    right: 20, // Ajuste conforme necessário para o espaço à direita
  },
  forgotPassword: {
    marginBottom: 20,
    textAlign: 'left',
  },
  forgotPasswordText: {
    color: 'red',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'left',
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
