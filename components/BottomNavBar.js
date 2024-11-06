import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';

export default function BottomNavBar({ navigation }) {
  return (
    <View style={styles.navBar}>
      <Pressable style={styles.navButton} onPress={() => {}}>
        <Image style={styles.icon} resizeMode="contain" source={require('../assets/images/icone local.png')} />
      </Pressable>
      <Pressable style={styles.navButton} onPress={() => {}}>
        <Image style={styles.icon} resizeMode="contain" source={require('../assets/images/trofeuNavBar.png')} />
      </Pressable>
      <Pressable style={styles.navButton} onPress={() => {}}>
        <Image style={styles.icon} resizeMode="contain" source={require('../assets/images/icone engrenagem.png')} />
      </Pressable>
      <Pressable style={styles.navButton} onPress={() => navigation.goBack()}>
      <Image style={styles.icon} resizeMode="contain" source={require('../assets/images/Icone perfil.png')} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#1c191f',
    borderRadius: 94,
    height: 80,
    width: "90%",
    justifyContent: 'space-between', // Coloca espaço igual entre os botões
    alignItems: 'center',
    paddingHorizontal: 15, // Adiciona um padding pequeno nas laterais
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 65,  // Ajuste o tamanho do ícone conforme necessário
    width: 65,
  },
});
