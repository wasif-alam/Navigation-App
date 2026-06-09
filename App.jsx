import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <StackNavigator isLoggedIn={isLoggedIn} 
      setIsLoggedIn={setIsLoggedIn} />
    </NavigationContainer>
  );
};

export default App;