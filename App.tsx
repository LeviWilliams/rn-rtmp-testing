import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  AppState,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NodePlayerView} from 'react-native-nodemediaclient';

const {width, height} = Dimensions.get('window');

const CustomNodePlayer = React.forwardRef((props: any, ref) => {
  useEffect(() => {
    const instance = ref?.current;
    return () => {
      console.log('inside custom', instance?.stop);
      instance?.stop()!;
    };
  }, [ref]);

  return (
    <>
      <NodePlayerView {...props} ref={ref} />
    </>
  );
});

const App = () => {
  const [status, setStatus] = useState<{status: string; message: string}>({
    status: '',
    message: '',
  });
  const [mount, setMount] = useState<boolean>(true);
  const streamUrl =
    'rtmps://watch.oneputt.app:443/live_92e2bc2e-7d91-41e3-9f66-8c8a8f1474d9/d673855b-8a19-41c5-90b9-1c26ab2874e9:1';

  const toggleMount = () => {
    setMount(!mount);
  };

  const playerRef = useRef<any>();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const onStop = () => {
    playerRef?.current!.stop();
  };
  const onStart = () => {
    playerRef?.current!.start();
  };

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      onStart();
    } else if (
      (appState.current.match(/active/) && nextAppState === 'inactive') ||
      nextAppState === 'background'
    ) {
      onStop();
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  useLayoutEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.statusText}>Player Status: {status.status}</Text>
      <Text style={styles.statusText}>Player Message: {status.message}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={onStop}
          style={{backgroundColor: 'red', width: 100, height: 50}}>
          <Text style={{color: 'white', fontSize: 20}}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onStart}
          style={{backgroundColor: 'green', width: 100, height: 50}}>
          <Text style={{color: 'white', fontSize: 20}}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleMount}
          style={{backgroundColor: 'purple', width: 100, height: 50}}>
          <Text style={{color: 'white', fontSize: 20}}>
            {mount ? 'Unmount' : 'Mount'}
          </Text>
        </TouchableOpacity>
      </View>
      {mount ? (
        <CustomNodePlayer
          ref={playerRef}
          toggleMount={toggleMount}
          mount={mount}
          style={styles.video}
          inputUrl={streamUrl}
          scaleMode={'ScaleAspectFit'}
          bufferTime={0}
          maxBufferTime={1000}
          autoplay={true}
          onStatus={(playerStatus: string, message: string) =>
            setStatus({status: playerStatus, message})
          }
        />
      ) : null}
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
