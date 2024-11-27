import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Switch, FlatList, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import { signupsraceService } from '../services/signUpRace';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../services/supabaseClient'; 

export default function PageSignUpRace({ navigation }) {
  const [isTurnedOn, setIsTurnedOn] = useState(true); 
  const [selectedDistance, setSelectedDistance] = useState(''); 
  const [showDistanceOptions, setShowDistanceOptions] = useState(false); 
  const [adversary, setAdversary] = useState(''); // Variável adversário (como string)
  const [eventName, setEventName] = useState(''); 
  const [location, setLocation] = useState(''); 
  const [date, setDate] = useState(new Date()); 
  const [showDatePicker, setShowDatePicker] = useState(false); 

  const distanceOptions = ['5', '10', '20'];  // Agora a lista de opções de percurso contém apenas números

  const handleToggleSwitch = () => {
    setIsTurnedOn(previousState => !previousState);
    setAdversary(''); // Resetando o adversário
    setSelectedDistance('');
    setEventName(''); 
    setLocation('');
    setDate(new Date());
  };

  const handleSelectDistance = (distance) => {
    setSelectedDistance(distance);
    setShowDistanceOptions(false);
  };

  const onChangeDateTime = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSignUpRace = async () => {
    if (isTurnedOn) {
      if (!selectedDistance) {
        alert('Por favor, preencha todos os campos obrigatórios (Percurso).');
        return;
      }

      try {
        // Certificando-se de que o adversário seja enviado como string
        await signupsraceService.createRacha(adversary ? String(adversary) : '', selectedDistance);  // Garantindo que adversary seja uma string
        alert('Racha cadastrado com sucesso!');
        navigation.navigate('PageHome');
      } catch (error) {
        console.error('Erro ao cadastrar racha:', error);
        alert(`Ocorreu um erro ao cadastrar o racha: ${error.message || JSON.stringify(error)}`);
      }
    } else {
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
        console.error('Erro ao cadastrar evento:', error);
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

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{isTurnedOn ? 'Modo Racha' : 'Modo Evento'}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#FF0000' }}
          thumbColor={isTurnedOn ? '#ffffff' : '#f4f3f4'}
          onValueChange={handleToggleSwitch}
          value={isTurnedOn}
        />
      </View>

      <View style={styles.inputs}>
        {isTurnedOn ? (
          <>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="red" style={styles.inputIcon} />
              <TextInput
                placeholder='Adversário (opcional)'
                style={styles.input}
                placeholderTextColor="black"
                value={adversary}
                onChangeText={setAdversary}  // Capturando string do adversário
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
            {showDistanceOptions && (
              <FlatList
                data={distanceOptions}
                renderItem={({ item }) => (
                  <TouchableHighlight onPress={() => handleSelectDistance(item)}>
                    <Text style={styles.distanceOption}>{item} km</Text>
                  </TouchableHighlight>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.distanceList}
              />
            )}
          </>
        ) : (
          <>
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
    borderRadius: 5,
    marginBottom: 30,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  distanceList: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    position: 'absolute',
    top: 75,
    left: 40,
    right: 40,
    zIndex: 10,
  },
  distanceOption: {
    fontSize: 18,
    padding: 10,
    color: 'black',
  },
});
