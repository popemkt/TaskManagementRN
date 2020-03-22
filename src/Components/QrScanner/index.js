import { Alert, Button, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Overlay } from 'react-native-elements';

export default function QrScanner({ isVisible, setIsVisible, action }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (isVisible)
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
  }, [isVisible]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsVisible(false);
    action(data);
  };

  if (hasPermission === false) {
    Alert.alert('Info', 'No permission to use camera!');
    return;
  }

  return (
    <Overlay
      width='auto'
      height='auto'
      isVisible={isVisible}
      style={{
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          ...s.modal,
        }}
      >
        {scanned && (
          <Button
            style={{ width: 300 }}
            title={'Tap to Scan'}
            onPress={() => setScanned(false)}
          />
        )}
        {isVisible ? (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ width: 300, height: 400 }}
          />
        ) : null}
        <Button
          style={{ width: 300, backgroundColor: 'red', color: 'red' }}
          title='Cancel'
          color='red'
          onPress={() => {
            setScanned(true);
            setIsVisible(false);
          }}
        />
      </View>
    </Overlay>
  );
}

const s = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
