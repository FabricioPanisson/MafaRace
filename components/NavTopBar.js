import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

export default function NavTopBar({ navigation }) {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.ellipseIcon} onPress={() => {}}>
        <Text style={styles.iconText1}>125</Text> 
      </TouchableOpacity>
      {/* Adicione mais botões ou elementos aqui */}
        <Text style={styles.iconText}>Av. Raul Sapequinha</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: 55,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 94,
    height: '6%',
    width: "50%",
    alignItems: 'center', // Alinha verticalmente os itens na barra
  },
  ellipseIcon: {
    backgroundColor: '#fff',  // Círculo branco
    borderRadius: 35,         // Deixa o contêiner circular
    height: 25,               // Tamanho do círculo
    width: 25,
    justifyContent: 'center',  // Centraliza o texto
    alignItems: 'center',      // Centraliza o texto
    marginHorizontal: 10,      // Espaçamento entre círculos
  },
  iconText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold",            // Tamanho do texto dentro do círculo
    color: '#fff',           // Cor do texto
  },
  iconText1: {
    fontSize: 12,            // Tamanho do texto dentro do círculo
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold",     
    color: '#000',           // Cor do texto
  },
});
