import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from 'react-native';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import { handleInput } from '../Order.js';

export default function ChatView() {
  const [messages, setMessages] = useState([]);
  const [inputBarText, setInputBarText] = useState('');
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', scrollToBottom);
    const hideSub = Keyboard.addListener('keyboardDidHide', scrollToBottom);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputBarText.trim().length === 0) return;

    let newMessages = [{ direction: 'right', text: inputBarText }];
    const botResponses = handleInput(inputBarText);

    for (const msg of botResponses) {
      newMessages.push({ direction: 'left', text: msg });
    }

    setMessages((prev) => [...prev, ...newMessages]);
    setInputBarText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.inner}>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messages}
          contentContainerStyle={{ padding: 10 }}
        >
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              direction={msg.direction}
              text={msg.text}
            />
          ))}
        </ScrollView>

        <InputBar
          onSendPressed={sendMessage}
          onChangeText={setInputBarText}
          text={inputBarText}
        />

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inner: {
    flex: 1,
  },

  messages: {
    flex: 1,
  },
  
});