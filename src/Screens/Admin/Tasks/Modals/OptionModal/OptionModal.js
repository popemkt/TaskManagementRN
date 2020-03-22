import { Button, Picker, StyleSheet, Text, View } from 'react-native';

import DateTimePicker from '../../../../../Components/DatetimePicker';
import { Overlay } from 'react-native-elements';
import React from 'react';

function OptionModal({ isVisible, setIsVisile, options, setOptions }) {
  return (
    <Overlay
      width='auto'
      height='auto'
      isVisible={isVisible}
      overlayStyle={s.modal}
    >
      <View>
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
            width: '100%',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-around',
          }}
        >
          <Button
            style={{...s.margin, flex: 1}}
            title='OK'
            onPress={() => {
              setIsVisile(false);
              setOptions({ ...options, filter: true });
            }}
          />
          <Button
            color='red'
            style={{...s.margin, flex: 1}}
            title='Cancel'
            onPress={() => {setIsVisile(false), setOptions({...options, filter: false})}}
          />
        </View>
      </View>
    </Overlay>
  );
}

const s = StyleSheet.create({
  modal: {
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    width: '80%',
    paddingVertical: 10,
  },
  margin: {
    marginHorizontal: 10,
  },
  row: {
    marginVertical: 4,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default OptionModal;
