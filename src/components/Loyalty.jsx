import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Portal, Dialog, Button, Text } from 'react-native-paper';
import ChatView from "./ChatView";
import { setOnOrderComplete } from "../Order.js";

export default function Loyalty() {
  const [visible, setVisible] = useState(false);
  const [points, setPoints] = useState(0); 

  useEffect(() => {
    setOnOrderComplete(() => {
      setPoints((prev) => {
        const newPoints = prev + 1;

        if (newPoints >= 10) {
          alert("🎉 Your 10th order is FREE!");
          return 0;
        }

        return newPoints;
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Loyalty Points</Text>
      <Text style={styles.points}>{points} / 10</Text>

      {/* 🔥 Floating Chat (Using Portal) */}
      <Portal>
        {visible && (
          <View style={styles.chatBox}>
            <View style={styles.chatHeader}>
              <Text style={styles.headerText}>Order Bot</Text>
            </View>

            <View style={styles.chatWrapper}>
              <ChatView />
            </View>

            <Button onPress={() => setVisible(false)}>
              Dismiss
            </Button>
          </View>
        )}
      </Portal>

      <FAB
        style={styles.fab}
        icon="message"
        onPress={() => setVisible(true)}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1,
  },

  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 80
  },

  points: {
    fontSize: 40,
    textAlign: 'center',
    marginVertical: 10
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },

  chatBox: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    top: 200,
    width: 350,
    height: 500,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    overflow: 'hidden'
  },

  chatHeader: {
    backgroundColor: '#3b2f4a',
    padding: 12
  },

  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },

  chatWrapper: {
    flex: 1
  }

});