import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PageProfile = ({ navigation }) => {
  const handleLogout = () => {
    alert('Você saiu da conta!');
    navigation.replace('PageLogin');
  };

  const handleEdit = (item) => {
    alert(`Editar: ${item}`);
  };

  return (
    <ScrollView backgroundColor={'#fff'}>
      {/* Botões do topo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#FD0100" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
          <Ionicons name="exit-outline" size={24} color="#FD0100" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Imagem de Perfil */}
        <Image
          style={styles.profileImage}
          source={require('../assets/images/profileImage.jpg')} //integrar com banco
        />

        {/* Informações do Perfil */}
        <Text style={styles.profileName}>CR7 do Unera</Text>  {/*integrar com banco*/}
        <Text style={styles.profileUsername}>@cr7dounera</Text>  {/*integrar com banco*/}
        <Text style={styles.profileBio}>  {/*integrar com banco*/}
          Só senta na frente se souber passar marcha! lá ele
        </Text>

        {/* Lista de informações */}
        <View style={styles.infoItem}>
          <Ionicons name="car" size={20} color="#FD0100" style={styles.infoIcon} />
          <Text style={styles.infoText}>Fiat Uno Eletronic 1.0</Text> {/*integrar com banco*/}
          <TouchableOpacity onPress={() => handleEdit('Fiat Uno Eletronic 1.0')}>
            <Ionicons name="pencil" size={20} color="#FD0100" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="color-palette" size={20} color="#FD0100" style={styles.infoIcon} />
          <Text style={styles.infoText}>Azul</Text>  {/*integrar com banco*/}
          <TouchableOpacity onPress={() => handleEdit('Azul')}>
            <Ionicons name="pencil" size={20} color="#FD0100" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="calendar" size={20} color="#FD0100" style={styles.infoIcon} />
          <Text style={styles.infoText}>1995</Text>  {/*integrar com banco*/}
          <TouchableOpacity onPress={() => handleEdit('1995')}>
            <Ionicons name="pencil" size={20} color="#FD0100" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="flash" size={20} color="#FD0100" style={styles.infoIcon} />
          <Text style={styles.infoText}>56</Text>  {/*integrar com banco*/}
          <TouchableOpacity onPress={() => handleEdit('56')}>
            <Ionicons name="pencil" size={20} color="#FD0100" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="analytics" size={20} color="#FD0100" style={styles.infoIcon} />
          <Text style={styles.infoText}>Não abaixo de 100 Km/h</Text>   {/*integrar com banco*/}
          <TouchableOpacity onPress={() => handleEdit('Não abaixo de 100 Km/h')}>
            <Ionicons name="pencil" size={20} color="#FD0100" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: '#fff',
    height: 60,
    marginTop: 20,
  },
  iconButton: {
    padding: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginTop: '10%',
  },
  profileImage: {
    width: 280,
    height: 280,
    borderRadius: 15,
    marginBottom: 15,
    borderColor: '#FD0100',
    borderWidth: 1.5,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  profileUsername: {
    fontSize: 16,
    color: '#FD0100',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 30,
    marginBottom: '10%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F7',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    height: 50,
    width: '90%',
    justifyContent: 'space-between',
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
    color: '#000',
  },
});

export default PageProfile;
