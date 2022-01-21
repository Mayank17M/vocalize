import React from 'react';
import { Text, Button } from 'react-native';

const RecordingScreen = ({ navigation, route }) => {
  return (
    <>
      <Text>This is {route.params.name}'s recording screen</Text>

      <Button
        title='Go to Insight Screen'
        onPress={() => navigation.navigate('Insight', { name: 'Joe' })}
      />
    </>
  );
};
export default RecordingScreen;