// PageSignUp.js
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';

export default function PageSignUp({ navigation }) {
    return  (
        <View style={styles.container}>
            <BackButton navigation={navigation} />
        <View style={styles.main}>
          <Image source={require("../assets/images/CronometroInicio.png")} style={styles.icon} />
          
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: "red" }]}>Tudo bueno</Text>
            <Text style={styles.subtitle}>Pronto para mais uma corrida? Faça login e vamos lá!</Text>
          </View>
        </View>
  
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="red" style={styles.inputIcon} />
            <TextInput placeholder='Username' style={styles.input} placeholderTextColor="black" />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="red" style={styles.inputIcon} />
            <TextInput placeholder='Email' style={styles.input} placeholderTextColor="black" />
          </View>
          
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="red" style={styles.inputIcon} />
            <TextInput placeholder='Password' style={styles.input} placeholderTextColor="black" secureTextEntry={true} />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="red" style={styles.inputIcon} />
            <TextInput placeholder='Confirm Password' style={styles.input} placeholderTextColor="black" secureTextEntry={true} />
          </View>
        </View>
        
  
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('PageSignUpCar')}>
          <Text style={styles.loginButtonText}>Próxima etapa</Text>
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