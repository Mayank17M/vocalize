import React from 'react';
import { Text, Button } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet,} from 'react-native';
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
  
  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    SetAudioPerm(getAudioPerm.granted);
  };

  const startRecording = async () => {
    if (AudioPerm === true) {
      try {
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
        SetisRecording(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      GetPermission();
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const result = recording.getURI();
      SetRecordedURI(result); // Here is the URI
      recording = new Audio.Recording();
      SetisRecording(false);
    } catch (error) {
      console.log(error);
    }
  };

  const playSound = async () => {
    try {
      const result = await Player.current.loadAsync(
        { uri: RecordedURI },
        {},
        true
      );

      const response = await Player.current.getStatusAsync();
      if (response.isLoaded) {
        if (response.isPlaying === false) {
          Player.current.playAsync();
          SetisPLaying(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopSound = async () => {
    try {
      const checkLoading = await Player.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        await Player.current.stopAsync();
        SetisPLaying(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Button
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
          onPress={isRecording ? () => stopRecording() : () => startRecording()}
        />
        <Button
          title='Play Sound'
          onPress={isPLaying ? () => stopSound : () => playSound()}
        />
        <Text>{RecordedURI}</Text>
      </View>

      <Button
        title='Go to Insight Screen'
        onPress={() => navigation.navigate('Insight', { name: 'Joe' })}
      />
    </>
  );
};

export default RecordingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});