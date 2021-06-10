import React, {useRef} from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {NodePlayerView} from 'react-native-nodemediaclient';

const {width, height} = Dimensions.get('window');

const App = () => {
  const playerRef = useRef();
  const streamUrl =
    'rtmps://rtmp.oneputt.app:443/live_92e2bc2e-7d91-41e3-9f66-8c8a8f1474d9/dubstream';
  return (
    <SafeAreaView style={styles.container}>
      <NodePlayerView
        style={styles.video}
        ref={playerRef}
        inputUrl={streamUrl}
        scaleMode={'ScaleAspectFit'}
        bufferTime={0}
        maxBufferTime={1000}
        autoplay={true}
        onStatus={(status, message) => console.log(status, message)}
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
});

export default App;
