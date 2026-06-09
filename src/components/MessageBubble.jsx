import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ message }) => {
  const isMe = message.sender === 'me';

  return (
    <View style={[styles.container, isMe ? styles.right : styles.left]}>
      <View style={[styles.bubble, isMe ? styles.me : styles.other]}>
        <Text style={isMe ? styles.myText : styles.otherText}>
          {message.text}
        </Text>
      </View>
    </View>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  bubble: {
    padding: 10,
    borderRadius: 12,
    maxWidth: '75%',
  },
  me: {
    backgroundColor: '#005C4B',
    borderTopRightRadius: 0,
  },
  other: {
    backgroundColor: '#314855',
    borderTopLeftRadius: 0,
  },
  myText: {
    color: '#fff',
  },
  otherText: {
    color: '#E9EDEF',
  },
});