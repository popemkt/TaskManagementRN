import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { BarCodeScanner } from 'expo-barcode-scanner';
import Modal from 'react-native-modal';

export default function QrScanner({ isVisible, setIsVisible, action }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsVisible(false);
    action(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal
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
    </Modal>
  );
}

const s = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
