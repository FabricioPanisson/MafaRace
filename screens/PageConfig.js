import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Biblioteca de ícones
import BackButton from '../components/BackButton.js';

const PageConfig = ({ navigation }) => {
  const [settings, setSettings] = useState({
    notifications: false,
    darkMode: false,
    autoUpdate: true,
    locationAccess: true,
    cameraAccess: false,
  });

  const toggleSetting = (key) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  const saveSettings = () => {
    Alert.alert('Configurações salvas!', JSON.stringify(settings, null, 2));
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Text style={styles.title}>Configurações</Text>

      <Text style={styles.category}>Notificações</Text>
      <View style={styles.option}>
        <Icon name="notifications-outline" size={24} color="#333" />
        <Text style={styles.optionText}>Notificações</Text>
        <Switch
          value={settings.notifications}
          onValueChange={() => toggleSetting('notifications')}
        />
      </View>

      <Text style={styles.category}>Aparência</Text>
      <View style={styles.option}>
        <Icon name="moon-outline" size={24} color="#333" />
        <Text style={styles.optionText}>Modo escuro</Text>
        <Switch
          value={settings.darkMode}
          onValueChange={() => toggleSetting('darkMode')}
        />
      </View>

      <Text style={styles.category}>Aplicativo</Text>
      <View style={styles.option}>
        <Icon name="refresh-outline" size={24} color="#333" />
        <Text style={styles.optionText}>Atualizações automáticas</Text>
        <Switch
          value={settings.autoUpdate}
          onValueChange={() => toggleSetting('autoUpdate')}
        />
      </View>

      <Text style={styles.category}>Privacidade</Text>
      <View style={styles.option}>
        <Icon name="location-outline" size={24} color="#333" />
        <Text style={styles.optionText}>Acesso à localização</Text>
        <Switch
          value={settings.locationAccess}
          onValueChange={() => toggleSetting('locationAccess')}
        />
      </View>

      <View style={styles.option}>
        <Icon name="camera-outline" size={24} color="#333" />
        <Text style={styles.optionText}>Acesso à câmera</Text>
        <Switch
          value={settings.cameraAccess}
          onValueChange={() => toggleSetting('cameraAccess')}
        />
      </View>
      <TouchableOpacity style={styles.deleteButton}
  onPress={() =>
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => console.log('Conta excluída') },
      ]
    )
  }
>
  <Text style={styles.deleteButtonText}>Excluir Conta</Text>
</TouchableOpacity>

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 60,
    textAlign: 'center',
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#555',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    marginTop: 30,
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default PageConfig;
