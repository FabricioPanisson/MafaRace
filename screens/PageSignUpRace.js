import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Switch, FlatList, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import BackButton from '../components/BackButton';
import { signupsraceService } from '../services/signUpRace';
import { supabase } from '../services/supabaseClient'; // Certifique-se de importar o supabase client

export default function PageSignUpRace({ navigation }) {
  const [isTurnedOn, setIsTurnedOn] = useState(true); // Modo Racha ou Evento
  const [selectedDistance, setSelectedDistance] = useState(''); // Percurso selecionado
  const [showDistanceOptions, setShowDistanceOptions] = useState(false); // Exibir opções de percurso

  const [adversary, setAdversary] = useState(''); // Adversário no modo Racha
  const [eventName, setEventName] = useState(''); // Nome do evento
  const [location, setLocation] = useState(''); // Local do evento
  const [date, setDate] = useState(new Date()); // Data e hora do evento
  const [showDatePicker, setShowDatePicker] = useState(false); // Exibir o DateTimePicker

  const distanceOptions = ['5 km', '10 km', '20 km'];

  // Alternar entre Racha e Evento
  const handleToggleSwitch = () => {
    setIsTurnedOn(previousState => !previousState);
    // Limpa os campos quando alterna o modo
    setAdversary('');
    setSelectedDistance('');
    setEventName('');
    setLocation('');
    setDate(new Date());
  };

  // Selecionar o percurso
  const handleSelectDistance = (distance) => {
    setSelectedDistance(distance);
    setShowDistanceOptions(false);
  };

  // Manipular a alteração da data/hora
  const onChangeDateTime = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Função para cadastrar Racha ou Evento
  const handleSignUpRace = async () => {
    if (isTurnedOn) {
      // Cadastro de Racha
      if (!selectedDistance) {
        alert('Por favor, selecione um percurso.');
        return;
      }

      try {
        await signupsraceService.createRacha(adversary, selectedDistance);
        alert('Racha cadastrado com sucesso!');
        navigation.navigate('PageHome');
      } catch (error) {
        console.error('Erro ao cadastrar racha no componente:', JSON.stringify(error, null, 2));
        alert(`Ocorreu um erro ao cadastrar o racha: ${error.message || JSON.stringify(error)}`);
      }
    } else {
      // Cadastro de Evento
      if (!eventName || !location || !date) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      if (isNaN(date.getTime())) {
        alert('Data e hora inválidas.');
        return;
      }

      try {
        await signupsraceService.createEvento(eventName, location, date);
        alert('Evento cadastrado com sucesso!');
        navigation.navigate('PageHome');
      } catch (error) {
        console.error('Erro ao cadastrar evento no componente:', JSON.stringify(error, null, 2));
        alert(`Ocorreu um erro ao cadastrar o evento: ${error.message || JSON.stringify(error)}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <View style={styles.main}>
        <Image source={require("../assets/images/CronometroInicio.png")} style={styles.icon} />
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: "red" }]}>{isTurnedOn ? "Criação de Racha" : "Criação de Evento"}</Text>
          <Text style={styles.subtitle}>
            {isTurnedOn ? "Crie Seu Racha, Vença no Asfalto!" : "Prepare Seu Evento, Desafie os Limites!"}
          </Text>
        </View>
      </View>

      {/* Switch para alternar entre Racha e Evento */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{isTurnedOn ? 'Modo Racha' : 'Modo Evento'}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#FF0000' }}
          thumbColor={isTurnedOn ? '#ffffff' : '#f4f3f4'}
          onValueChange={handleToggleSwitch}
          value={isTurnedOn}
        />
      </View>

      {/* Formulário */}
      <View style={styles.inputs}>
        {isTurnedOn ? (
          <>
            {/* Formulário de Racha */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="red" style={styles.inputIcon} />
              <TextInput
                placeholder='Adversário (opcional)'
                style={styles.input}
                placeholderTextColor="black"
                value={adversary}
                onChangeText={setAdversary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="map-outline" size={20} color="red" style={styles.inputIcon} />
              <TextInput
                placeholder='Percurso'
                style={styles.input}
                placeholderTextColor="black"
                value={selectedDistance}
                editable={false}
                onPressIn={() => setShowDistanceOptions(true)}
              />
            </View>
            {/* Opções de percurso */}
            {showDistanceOptions && (
              <FlatList
                data={distanceOptions}
                renderItem={({ item }) => (
                  <TouchableHighlight onPress={() => handleSelectDistance(item)}>
                    <Text style={styles.distanceOption}>{item}</Text>
                  </TouchableHighlight>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.distanceList}
              />
            )}
            <Text style={styles.observacao}>*Para criar um racha público, deixe em branco o formulário de adversário*</Text>
          </>
        ) : (
          <>
            {/* Formulário de Evento */}
            <View style={styles.inputContainer}>
              <Ionicons name="map-outline" size={20} color="red" style={styles.inputIcon} />
              <TextInput
                placeholder='Nome do Evento'
                style={styles.input}
                placeholderTextColor="black"
                value={eventName}
                onChangeText={setEventName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={20} color="red" style={styles.inputIcon} />
              <TextInput
                placeholder='Local'
                style={styles.input}
                placeholderTextColor="black"
                value={location}
                onChangeText={setLocation}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="calendar-outline" size={20} color="red" style={styles.inputIcon} />
              <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                <Text style={{ color: 'black' }}>
                  {date ? date.toLocaleString() : 'Selecionar Data e Hora'}
                </Text>
              </TouchableOpacity>
            </View>
            {/* Exibir o DateTimePicker quando necessário */}
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="datetime"
                display="default"
                onChange={onChangeDateTime}
              />
            )}
          </>
        )}
      </View>

      {/* Botão de cadastro */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSignUpRace}>
        <Text style={styles.loginButtonText}>{isTurnedOn ? "Cadastrar Racha" : "Cadastrar Evento"}</Text>
        <Ionicons name="arrow-forward-outline" size={20} color="black" style={styles.iconRight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Seus estilos aqui
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 125,
    backgroundColor: '#fff',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: 'red',
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
  observacao: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  distanceList: {
    position: 'absolute',
    top: 100,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxHeight: 150,
    zIndex: 1,
  },
  distanceOption: {
    fontSize: 16,
    color: 'red',
    paddingVertical: 10,
  },
});