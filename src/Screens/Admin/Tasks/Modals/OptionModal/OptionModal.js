import { Button, Picker, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import DateTimePicker from '../../../../../Components/DatetimePicker';
import Modal from 'react-native-modal';

function OptionModal({
  isVisible,
  setIsVisile,
  options,
  setOptions,
}) {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [status, setStatus] = useState('Java');

  return (
    <Modal isVisible={isVisible} style={{ alignItems: 'center' }}>
      <View style={{ ...styles.margin, ...styles.modal, paddingVertical: 10, paddingHorizontal: 20, }}>
        <Text>{'Options'}</Text>
        <Picker
          selectedValue={status}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
        >
          <Picker.Item label='Java' value='java' />
          <Picker.Item label='JavaScript' value='js' />
        </Picker>
        <View>
          <DateTimePicker
            date={fromDate}
            setDate={setFromDate}
          ></DateTimePicker>
          <DateTimePicker date={toDate} setDate={setToDate}></DateTimePicker>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Button style={styles.margin} title='OK' />
          <Button style={styles.margin} title='Cancel' onPress={() => setIsVisile(false)} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  margin: {
    marginHorizontal: 10,
  },
});

export default OptionModal;
