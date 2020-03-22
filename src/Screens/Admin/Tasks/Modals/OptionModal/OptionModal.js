import { Button, Picker, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import DateTimePicker from '../../../../../Components/DatetimePicker';
import Modal from 'react-native-modal';

function OptionModal({ isVisible, setIsVisile, options, setOptions }) {
  return (
    <Modal isVisible={isVisible} style={{ alignItems: 'center' }}>
      <View style={s.modal}>
        <Text>{'Options'}</Text>
        <View style={s.row}>
          <Text>{'Status'}</Text>
          <Picker
            selectedValue={options.status}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setOptions({ ...options, status: itemValue })
            }
          >
            <Picker.Item label='None' value={null} />
            <Picker.Item label='Unstarted' value={1} />
            <Picker.Item label='Processing' value={2} />
            <Picker.Item label='Finished' value={3} />
            <Picker.Item label='Overdue' value={4} />
            <Picker.Item label='Dropped' value={5} />
          </Picker>
        </View>
        <View style={s.row}>
          <Text>{'From date: '}</Text>
          <DateTimePicker
            date={options.fromDate}
            setDate={date => setOptions({ ...options, fromDate: date })}
          ></DateTimePicker>
        </View>
        <View style={s.row}>
          <Text>{'To date: '}</Text>
          <DateTimePicker
            date={options.toDate}
            setDate={date => setOptions({ ...options, toDate: date })}
          ></DateTimePicker>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            style={s.margin}
            title='OK'
            onPress={() => {
              setIsVisile(false);
              setOptions({ ...options, filter: true });
            }}
          />
          <Button
            style={s.margin}
            title='Cancel'
            onPress={() => setIsVisile(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  margin: {
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default OptionModal;
