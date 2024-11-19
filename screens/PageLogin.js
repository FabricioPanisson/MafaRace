import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as authService from '../services/authService'; // Import the authentication service

export default function PageLogin({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const user = await authService.signIn({ email, password });
            console.log('Usuário logado:', user);
            navigation.navigate('PageHome'); // Navigate to home page after login
        } catch (error) {
            setError(error.message);
            Alert.alert("Erro ao logar", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image source={require("../assets/images/CronometroInicio.png")} style={styles.icon} />
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: "red" }]}>Buenas</Text>
                    <Text style={styles.title}>tchê!</Text>
                    <Text style={styles.subtitle}>Pronto para mais uma corrida? Faça login e vamos lá!</Text>
                </View>
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="red" style={styles.inputIcon} />
                    <TextInput
                        placeholder="Usuário (Email)"
                        style={styles.input}
                        placeholderTextColor="black"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="red" style={styles.inputIcon} />
                    <TextInput
                        placeholder="Senha"
                        style={styles.input}
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                <Text style={styles.loginButtonText}>{loading ? "Carregando..." : "Entrar"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword} onPress={() => {/* Add password recovery logic here */}}>
                <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
                <Text>Ainda não tem uma conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('PageSignUp')}>
                    <Text style={styles.signupText}>Clique aqui</Text>
                </TouchableOpacity>
                <Text>e cadastre-se</Text>
            </View>
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