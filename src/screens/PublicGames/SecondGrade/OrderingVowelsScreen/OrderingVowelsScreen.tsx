import React from 'react'
import { View, StyleSheet } from "react-native";

import WordList from "./WordList";
import Word from "./Word";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const words = [
  { id: 1, word: "A" },
  { id: 5, word: "U" },
  { id: 3, word: "I" },
  { id: 4, word: "O" },
  { id: 2, word: "E" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
export const OrderingVowelsScreen = () => {

  
  return (
  <GestureHandlerRootView 
    style={styles.container}
  >
    <Header />
      <WordList>
        {words.map((word) => (
          <Word key={word.id} {...word} />
        ))}
      </WordList>
    <Footer />
  </GestureHandlerRootView>
  )
}
