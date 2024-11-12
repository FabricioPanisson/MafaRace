import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PageLogin({ navigation }) {
  return (
    <View style={styles.container}>
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
          <TextInput placeholder='Usuário' style={styles.input} placeholderTextColor="black" />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput placeholder='Senha' style={styles.input} placeholderTextColor="black" secureTextEntry={true} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinha os itens no topo
    alignItems: 'center',
    paddingTop: 125, // Ajuste o padding superior conforme necessário
    backgroundColor: '#fff', // Adicione um fundo branco ou outra cor
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
