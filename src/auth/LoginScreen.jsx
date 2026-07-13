import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../Assets/Chat_App-logo.png';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: async data => {
      try {
        // Save token
        await AsyncStorage.setItem('token', data.accessToken);

        console.log('Login success:', data);

        setIsLoggedIn(true);

        navigation.replace('Home');
      } catch (error) {
        console.log('Storage Error:', error);
      }
    },

    onError: error => {
      console.log('Error:', error?.message);

      Alert.alert('Login Failed', 'Invalid username or password!');
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <LinearGradient colors={['#1e3a8a', '#0f172a']} style={styles.container}>
      <View style={styles.card}>
        {/* <Image source={logo} style={styles.logo}  /> */}

        <Image source={logo} style={styles.logo}  />
        <Text style={styles.subtitle}>Login to your account</Text>

        {/* Email */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Username.."
            placeholderTextColor="#cbd5f5"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Password.."
            placeholderTextColor="#cbd5f5"
            secureTextEntry={secure}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Text style={styles.eye}>{secure ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.btn}
          onPress={handleLogin}
          disabled={loginMutation.isPending}
        >
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            style={styles.btnGradient}
          >
            {loginMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Login</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.08)', // glass effect
    borderRadius: 25,
    padding: 25,
    backdropFilter: 'blur(10px)',
  },
  // logo: {
  //   textAlign: 'center',
  //   fontSize: 40,
  // },
  logo: {
    width: 500,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: '#cbd5f5',
    marginBottom: 15,
    fontSize: 15,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 14,
  },

  eye: {
    fontSize: 18,
    color: '#fff',
  },

  btn: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },

  btnGradient: {
    padding: 15,
    borderRadius: 12,
  },

  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: 205
  },

  footer: {
    textAlign: 'center',
    color: '#cbd5f5',
    marginTop: 20,
  },

  signup: {
    color: '#60a5fa',
    fontWeight: 'bold',
  },
});
