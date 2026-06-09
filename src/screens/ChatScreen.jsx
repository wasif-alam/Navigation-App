import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import ChatHeader from '../components/ChatHeader';
import TypingIndicator from '../components/TypingIndicator';
// Make sure to place your image at src/Assets/Chat_Background.png or update the path accordingly
import bgImage from '../Assets/Chat_Background.png';

const ChatScreen = ({ navigation, route }) => {
  const user = route?.params?.user;

  const [messages, setMessages] = useState([
    { id: '1', text: `Hi! I am ${user?.name} 👋`, sender: 'other' },
    { id: '2', text: 'Hello!', sender: 'me' },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);

  const sendMessage = async (text) => {
    const myMsg = {
      id: Date.now().toString(),
      text,
      sender: 'me',
    };

    setMessages(prev => [myMsg, ...prev]);
    setIsTyping(true);

    try {
      await new Promise(res => setTimeout(res, 1500));

      const res = await axios.get('https://dummyjson.com/quotes/random');
      const replyMsg = {
        id: (Date.now() + 1).toString(),
        text: res.data.quote,
        sender: 'other',
      };

      setMessages(prev => [replyMsg, ...prev]);

    } catch (error) {
      setMessages(prev => [
        {
          id: (Date.now() + 1).toString(),
          text: 'Sorry, I am busy right now 😅',
          sender: 'other',
        },
        ...prev,
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTyping = () => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {}, 2000);
  };

  return (
    <ImageBackground source={bgImage} style={styles.container} resizeMode="cover">
      <ChatHeader navigation={navigation} user={user} />

      <View style={styles.chatArea}>
        <FlatList
          data={messages}
          inverted
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => (
            <MessageBubble message={item} />
          )}
        />

        {isTyping && (
          <View style={styles.typingWrapper}>
            <TypingIndicator />
          </View>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <ChatInput onSend={sendMessage} onTyping={handleTyping} />
      </View>
    </ImageBackground>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2382c27c', // dark theme
  },
  chatArea: {
    flex: 1,
  },
  typingWrapper: {
    marginLeft: 10,
    marginBottom: 5,
  },
  inputWrapper: {
    padding: 5,
    paddingHorizontal:10,
    paddingVertical:10,
  },
});