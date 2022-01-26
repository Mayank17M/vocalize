import React from 'react';
import { Text, Button } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Audio } from 'expo-av';

let recording = new Audio.Recording();

const RecordingScreen = ({ navigation, route }) => {
  const [RecordedURI, SetRecordedURI] = useState('');
  const [AudioPerm, SetAudioPerm] = useState(false);
  const [isRecording, SetisRecording] = useState(false);
  const [isPLaying, SetisPLaying] = useState(false);
  const Player = useRef(new Audio.Sound());

  useEffect(() => {
    GetPermission();
  }, []);
  
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