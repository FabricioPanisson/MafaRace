import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import * as registerCar from '../services/registerCar';

export default function PageSignUpCar({ navigation, route }) {
  const { userId, username } = route.params;

  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [power, setPower] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterCar = async () => {
    setLoading(true);
    try {
      // Validar campos
      if (!model || !color || !year || !power) {
        throw new Error('Todos os campos são obrigatórios.');
      }

      if (!/^\d{4}$/.test(year) || year < 1900 || year > new Date().getFullYear()) {
        throw new Error('Ano de fabricação inválido.');
      }

      if (isNaN(power) || power <= 0) {
        throw new Error('Potência deve ser um número positivo.');
      }

      // Registrar o carro
      await registerCar.registerCar({
        userId,
        model,
        color,
        year: parseInt(year, 10),
        power: parseFloat(power),
      });

      // Navegar para a tela de login ou principal
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('PageLogin');

    } catch (error) {
      console.error('Erro ao cadastrar o carro:', error);
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return  (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <View style={styles.main}>
        <Image source={require("../assets/images/CronometroInicio.png")} style={styles.icon} />
        
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: "red" }]}>Cadastre seu veículo</Text>
          <Text style={styles.subtitle}>Preencha as informações do seu veículo para continuar.</Text>
        </View>
      </View>

      <View style={styles.inputs}>
        <View style={styles.inputContainer}>
          <Ionicons name="car-sport-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput
            placeholder='Modelo'
            style={styles.input}
            placeholderTextColor="black"
            value={model}
            onChangeText={setModel}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="color-palette-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput
            placeholder='Cor'
            style={styles.input}
            placeholderTextColor="black"
            value={color}
            onChangeText={setColor}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="calendar-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput
            placeholder='Ano de fabricação'
            style={styles.input}
            placeholderTextColor="black"
            keyboardType="numeric"
            value={year}
            onChangeText={setYear}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="speedometer-outline" size={20} color="red" style={styles.inputIcon} />
          <TextInput
            placeholder='Potência (cv)'
            style={styles.input}
            placeholderTextColor="black"
            keyboardType="numeric"
            value={power}
            onChangeText={setPower}
          />
        </View>
        
      </View>
      

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleRegisterCar}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? 'Cadastrando...' : 'Finalizar cadastro'}
        </Text>
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
