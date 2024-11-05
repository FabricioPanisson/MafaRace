import { StyleSheet, Text, View, TextInput, ImageBackground, Image, TouchableOpacity } from 'react-native';
import PageHome from './screens/PageHome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Criação da pilha de navegação
const Stack = createNativeStackNavigator();

function LoginScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/images/backgroundMapLogin.png')} style={styles.background}>
      <View style={styles.main}>
        <Image source={require("./assets/images/CronometroInicio.png")} />
        <View style={{ alignItems: "left", marginLeft: "5%", marginRight: "5%" }}>
          <Text style={[styles.titulo, { color: "red" }]}>Buenas</Text>
          <Text style={styles.titulo}>Tche!</Text>
          <Text style={styles.tituloSecundario}>Pronto para mais uma corrida? Faça login e vamos lá!</Text>
        </View>
      </View>
      <View style={styles.imputs}>
        <TextInput placeholder='Username' style={styles.imput} placeholderTextColor="black" />
        <TextInput placeholder='Password' style={styles.imput} placeholderTextColor="black" secureTextEntry={true} />
      </View>
      <View style={styles.viewBtn}>
        <TouchableOpacity style={[styles.buttons, { backgroundColor: "red" }]} onPress={() => navigation.navigate('PageHome')}>
          <Text style={{ color: "black", fontWeight: "bold" }}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "left", width: "80%" }}>
          <Text style={{ color: "red", textDecorationLine: 'underline', fontWeight: "bold", fontStyle: "italic" }}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <View style={{ maxWidth: "80%", flexDirection: "row", }}>
          <Text style={{ textAlign: "center" }}>Ainda não tem uma conta?</Text>
          <TouchableOpacity><Text style={{ color: "red" }}> Clique aqui</Text></TouchableOpacity>
          <Text style={{ textAlign: "" }}> e cadastre-se</Text>
        </View>
        <TouchableOpacity style={styles.buttons}>
          <Text style={{ color: "white" }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PageHome" component={PageHome} options={{ headerShown: false ,
            animation: 'fade_from_bottom', // Animação personalizada ao transitar para a PageHome
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    flex: 1,
    resizeMode: 'cover',
  },
  main: {
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  titulo: {
    textAlign: "left",
    fontSize: 40,
    fontWeight: "800",
  },
  tituloSecundario: {
    textAlign: "left",
    fontSize: 20,
  },
  imputs: {
    width: "80%",
  },
  imput: {
    marginBottom: "5%",
    paddingHorizontal: 10,
    backgroundColor: "#f1f3f7",
    width: "100%",
    height: 39,
    borderRadius: 10,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  buttons: {
    margin: "2%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: "80%",
    height: 39,
    color: "white",
    borderRadius: 10,
  },
});
