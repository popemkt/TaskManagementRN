import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDateTimePicker = ({ date, setDate }) => {
  const [mode, setMode] = useState();
  const [show, setShow] = useState(false);
  const [reset, setReset] = useState(true);

  const onChange = (event, selectedDate) => {
    setReset(false);
    let dateValue = selectedDate || date;
    setDate(dateValue);
    if (mode === 'date') {
      setMode('time');
      setReset(true);
    } 
};

  const showTimepicker = () => {
    setMode('date');
    setShow(true);
    setReset(false);
    setReset(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={showTimepicker}>
        <Text  >{date?.toString() || 'Select Date'} </Text>
      </TouchableOpacity>
      {(show&&reset) && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0}
          value={date || new Date()}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default MyDateTimePicker;
