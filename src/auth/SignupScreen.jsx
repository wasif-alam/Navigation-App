//  import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// const SignupScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = () => {
//     // TEMP signup
//     navigation.replace('Home');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Signup</Text>

//       <TextInput
//         placeholder="Email"
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         placeholder="Password"
//         style={styles.input}
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TouchableOpacity style={styles.btn} onPress={handleSignup}>
//         <Text style={styles.btnText}>Signup</Text>
//       </TouchableOpacity>

//       <Text onPress={() => navigation.navigate('Login')}>
//         Already have account? Login
//       </Text>
//     </View>
//   );
// };

// export default SignupScreen;

import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { useMutation } from '@tanstack/react-query';

import { signupUser } from '../services/authApi';

const SignupScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  const [userId, setUserId] = useState('');

  const [password, setPassword] = useState('');

  const signupMutation = useMutation({
    mutationFn: signupUser,

    onSuccess: () => {
      Alert.alert('Success', 'Account created');

      navigation.navigate('Login', {
        username: userId,
      });
    },

    onError: err => {
      Alert.alert('Signup Failed', err?.message);
    },
  });

  const handleSignup = () => {
    if (!phone || !userId || !password) {
      Alert.alert('Error', 'Fill all fields');

      return;
    }

    signupMutation.mutate({
      phone,

      userId,

      password,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="Create User ID"
        style={styles.input}
        value={userId}
        onChangeText={setUserId}
      />

      <TextInput
        placeholder="Create Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={handleSignup}
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.btnText}>Create Account</Text>
        )}
      </TouchableOpacity>

      <Text onPress={() => navigation.navigate('Login')}>
        Already have account?
      </Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 30,
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
  },

  btn: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
  },

  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});
