import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatInput = ({ onSend, onTyping }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <View style={styles.container}>

      <Ionicons name="happy-outline" size={24} color="#aaa" />

      <TextInput
        style={styles.input}
        placeholder="Type a message"
        placeholderTextColor="#aaa"
        value={message}
        onChangeText={(text) => {
          setMessage(text);
          onTyping && onTyping();
        }}
      />

      {message.length === 0 ? (
        <Ionicons name="mic-outline" size={24} color="#aaa" />
      ) : (
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="send" size={24} color="#00A884" />
        </TouchableOpacity>
      )}

    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A3942',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    color: '#fff',
    paddingVertical: 6,
  },
});