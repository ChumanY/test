import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../app/_layout';

const { width, height } = Dimensions.get('window');

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const isMobile = screenWidth < 768;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Dashboard');
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.background}>
      <ImageBackground 
        source={require('../assets/images/login-background.jpg')} 
        style={styles.leftSection}
      />
      <LinearGradient
        colors={["#000", "#F7A823"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.rightSection}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>SIGN IN</Text>
          <Text style={styles.subtitle}>Sign in with email address</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Yourname@gmail.com" 
            placeholderTextColor="#ccc" 
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: isMobile ? 'column' : 'row',
  },
  leftSection: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: isMobile ? screenHeight * 0.6 : '100%',
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: isMobile ? '100%' : '30%',
    height: isMobile ? screenHeight * 0.6 : '100%',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});