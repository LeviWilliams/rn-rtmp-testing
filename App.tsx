import React, {useRef, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text} from 'react-native';
import {NodePlayerView} from 'react-native-nodemediaclient';

const {width, height} = Dimensions.get('window');

const App = () => {
  const [status, setStatus] = useState<{status: string; message: string}>({
    status: '',
    message: '',
  });
  const playerRef = useRef();
  const streamUrl =
    'rtmps://rtmp.oneputt.app:443/live_92e2bc2e-7d91-41e3-9f66-8c8a8f1474d9/dubstream';
  console.log(status.message);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.statusText}>Player Status: {status.status}</Text>
      <Text style={styles.statusText}>Player Message: {status.message}</Text>
      <NodePlayerView
        style={styles.video}
        ref={playerRef}
        inputUrl={streamUrl}
        scaleMode={'ScaleAspectFit'}
        bufferTime={0}
        maxBufferTime={1000}
        autoplay={true}
        onStatus={(playerStatus: string, message: string) =>
          setStatus({status: playerStatus, message})
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  video: {
    width,
    height,
  },
  statusText: {
    color: 'white',
    fontSize: 17,
  },
});

export default App;
