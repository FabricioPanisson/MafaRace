import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabaseClient.js';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

const PageProfile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [car, setCar] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFieldValue, setEditFieldValue] = useState('');
  const [editFieldKey, setEditFieldKey] = useState('');

  useEffect(() => {
    const fetchUserAndCar = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError) {
          console.error('Error fetching user', userError);
          Alert.alert('Error', 'Could not fetch user data. Please try again.');
          return;
        }

        if (!userData?.user) {
          console.error('User data not found');
          Alert.alert('Error', 'User not found. Please log in again.');
          navigation.replace('PageLogin');
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userData.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile data', profileError);
          return;
        }

        // Obter URL assinada da imagem de perfil
        if (profileData.profile_image) {
          const { data: signedUrlData, error: signedUrlError } = await supabase
            .storage
            .from('avatars')
            .createSignedUrl(profileData.profile_image, 60 * 60 * 24); // URL válida por 24 horas

          if (!signedUrlError) {
            profileData.profile_image_url = signedUrlData.signedUrl;
          } else {
            console.error('Error getting signed URL for profile image', signedUrlError);
          }
        }

        setUser(profileData);

        const { data: carData, error: carError } = await supabase
          .from('cars')
          .select('*')
          .eq('user_id', userData.user.id)
          .single();

        if (carError) {
          console.error('Error fetching car data', carError);
          return;
        }

        setCar(carData);
      } catch (err) {
        console.error('Error fetching user and car', err);
      }
    };

    fetchUserAndCar();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigation.replace('PageLogin');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const handleEditStart = (field) => {
    setEditingField(field);
    const initialValue = field.startsWith('car_')
      ? car[field.replace('car_', '')]
      : user[field];
    setEditFieldValue(initialValue);
    setEditFieldKey(field);
    setEditModalVisible(true);
  };

  const handleEditSave = async () => {
    try {
      let updatedData = {};
      if (editFieldKey.startsWith('car_')) {
        updatedData = { [editFieldKey.replace('car_', '')]: editFieldValue };
        const { error } = await supabase
          .from('cars')
          .update(updatedData)
          .eq('id', car.id);
        if (error) throw error;
        setCar({ ...car, [editFieldKey.replace('car_', '')]: editFieldValue });
      } else {
        updatedData = { [editFieldKey]: editFieldValue };
        const { error } = await supabase
          .from('profiles')
          .update(updatedData)
          .eq('id', user.id);
        if (error) throw error;
        setUser({ ...user, [editFieldKey]: editFieldValue });
      }
      setEditingField(null);
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating profile', error);
      Alert.alert('Error', 'Failed to update the field. Please try again.');
    }
  };

  const handleProfileImageUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to upload a profile image.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const fileUri = result.assets[0].uri;
        const fileName = `${user.id}/avatar.jpg`;

        // Ler o arquivo como base64
        const base64File = await FileSystem.readAsStringAsync(fileUri, { encoding: 'base64' });

        // Decodificar a string base64 em um ArrayBuffer
        const fileBytes = decode(base64File);

        // Enviar o ArrayBuffer para o Supabase Storage
        const { data, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, fileBytes, {
            contentType: 'image/jpeg',
            upsert: true,
          });

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          Alert.alert('Error', 'Failed to upload the image. Please try again.');
        } else {
          const { data: signedUrlData, error: signedUrlError } = await supabase
            .storage
            .from('avatars')
            .createSignedUrl(fileName, 60 * 60 * 24); // URL válida por 24 horas

          if (!signedUrlError) {
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ profile_image: fileName })
              .eq('id', user.id);

            if (!updateError) {
              setUser({ ...user, profile_image: fileName, profile_image_url: signedUrlData.signedUrl });
              Alert.alert('Success', 'Profile image updated successfully!');
            } else {
              console.error('Error updating profile image:', updateError);
            }
          } else {
            console.error('Error creating signed URL:', signedUrlError);
          }
        }
      }
    } catch (error) {
      console.error('Error handling profile image upload:', error);
      Alert.alert('Error', 'An error occurred while uploading the image.');
    }
  };

  return (
    <ScrollView backgroundColor={'#fff'}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#FD0100" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
          <Ionicons name="exit-outline" size={24} color="#FD0100" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={handleProfileImageUpload}>
          <Image
            style={styles.profileImage}
            source={{ uri: user?.profile_image_url || 'https://via.placeholder.com/280' }}
          />
        </TouchableOpacity>

        <Text style={styles.profileName}>{user?.full_name}</Text>
        <Text style={styles.profileUsername}>@{user?.username}</Text>
        <Text style={styles.profileBio}>{user?.bio}</Text>

        {car && (
          <>
            <View style={styles.infoItem}>
              <Ionicons name="car" size={20} color="#FD0100" />
              <Text style={styles.infoText}>Modelo: {car?.model}</Text>
              <TouchableOpacity onPress={() => handleEditStart('car_model')}>
                <Ionicons name="pencil" size={20} color="#FD0100" />
              </TouchableOpacity>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="color-palette" size={20} color="#FD0100" />
              <Text style={styles.infoText}>Cor: {car?.color}</Text>
              <TouchableOpacity onPress={() => handleEditStart('car_color')}>
                <Ionicons name="pencil" size={20} color="#FD0100" />
              </TouchableOpacity>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="calendar" size={20} color="#FD0100" />
              <Text style={styles.infoText}>Ano: {car?.year}</Text>
              <TouchableOpacity onPress={() => handleEditStart('car_year')}>
                <Ionicons name="pencil" size={20} color="#FD0100" />
              </TouchableOpacity>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="flash" size={20} color="#FD0100" />
              <Text style={styles.infoText}>Potência: {car?.power}</Text>
              <TouchableOpacity onPress={() => handleEditStart('car_power')}>
                <Ionicons name="pencil" size={20} color="#FD0100" />
              </TouchableOpacity>
            </View>
          </>
        )}

        <Modal visible={editModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Campo</Text>
              <TextInput
                style={styles.modalInput}
                value={editFieldValue}
                onChangeText={(text) => setEditFieldValue(text)}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEditSave}>
                  <Text style={styles.modalButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  infoText: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonText: {
    color: '#FD0100',
    fontWeight: 'bold',
  },
});

export default PageProfile;
