import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Tab1 } from './src/navigator/Tab1';
import { Tabs } from './src/navigator/Tabs';

const App = () => {
  return (
    <NavigationContainer>
     <Tabs />
    </NavigationContainer>
  )
}

export default App