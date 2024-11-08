import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BackButton = ({ navigation }) => (
  <TouchableOpacity
    style={{
      position: 'absolute',
      top: 40, // Ajuste conforme necessário para posicionamento
      left: 20, // Posiciona o botão à esquerda
      padding: 10,
      zIndex: 1,
    }}
    onPress={() => navigation.goBack()}
  >
    <Ionicons name="arrow-back" size={24} color="black" />
  </TouchableOpacity>
);

export default BackButton;
