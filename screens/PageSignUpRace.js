import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Switch, FlatList, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';

export default function PageSignUpRace({ navigation }) {
  // Estado que determina se o formulário está ativado para 'Racha' (On) ou 'Evento' (Off)
  const [isTurnedOn, setIsTurnedOn] = useState(true);

  // Estado para armazenar a seleção de percurso ou distância
  const [selectedDistance, setSelectedDistance] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  // Estado para controlar a exibição da lista de opções de percurso
  const [showDistanceOptions, setShowDistanceOptions] = useState(false);

  // Lista de percursos disponíveis
  const distanceOptions = ['5 km', '10 km', '20 km'];

  const handleToggleSwitch = () => setIsTurnedOn(previousState => !previousState);

  const handleSelectDistance = (distance) => {
    setSelectedDistance(distance);
    setShowDistanceOptions(false); // Fecha a lista após a seleção
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
        <Text style={styles.switchLabel}>{isTurnedOn ? 'Modo Racha' : 'Modo Racha'}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#FF0000' }}
          thumbColor={isTurnedOn ? '#ffffff' : '#f4f3f4'}
          onValueChange={handleToggleSwitch}
          value={isTurnedOn}
        />
      </View>

      {/* Formulário baseado no estado 'isTurnedOn' */}
      <View style={styles.inputs}>
        {/* Condicionalmente renderiza o formulário de Racha ou Evento */}
        {isTurnedOn ? (
          <>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="red" style={styles.inputIcon} />
              <TextInput placeholder='Adversário (opcional)' style={styles.input} placeholderTextColor="black" />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="map-outline" size={20} color="red" style={styles.inputIcon} />
              <TextInput 
                placeholder='Percurso' 
                style={styles.input} 
                placeholderTextColor="black" 
                value={selectedDistance}
                editable={false}  // Impede a digitação manual
                onPressIn={() => setShowDistanceOptions(true)} // Abre a lista ao clicar
              />
            </View>

            {/* Lista de opções de percurso aparece sobre os outros campos */}
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
              <TextInput placeholder='Nome do Evento' style={styles.input} placeholderTextColor="black" />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={20} color="red" style={styles.inputIcon} />
              <TextInput placeholder='Local' style={styles.input} placeholderTextColor="black" />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="time-outline" size={20} color="red" style={styles.inputIcon} />
              <TextInput placeholder='Data e Horário' style={styles.input} placeholderTextColor="black" />
            </View>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('PageHome')}>
        <Text style={styles.loginButtonText}>{isTurnedOn ? "Cadastrar Racha" : "Cadastrar Evento"}</Text>
        <Ionicons name="arrow-forward-outline" size={20} color="black" style={styles.iconRight} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
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
    position: 'absolute', // Faz com que a lista se sobreponha aos outros campos
    top: 100, // Alinha a lista abaixo do campo // Deixa a lista alinhada com o campo
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxHeight: 150, // Limita o tamanho da lista
    zIndex: 1, // Garante que a lista ficará acima dos outros campos
  },
  distanceOption: {
    fontSize: 16,
    color: 'red',
    paddingVertical: 10,
  },
});
