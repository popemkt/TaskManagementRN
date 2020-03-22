import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { getDatetime } from '../../Common/utils'

const MyDateTimePicker = ({ date, setDate , ...moreProps}) => {
  const [mode, setMode] = useState();
  const [show, setShow] = useState(false);
  const [reset, setReset] = useState(true);
  const [check, setCheck] = useState(true);

  const onChange = (event, selectedDate) => {
    setReset(false);
    let dateValue = selectedDate || date;
    setDate(dateValue);
    if (selectedDate != null && check == true) {
      setCheck(false);
      setMode('time');
      setReset(true);
    } 
};

  const showTimepicker = () => {
    setMode('date');
    setShow(true);
    setReset(true);
    setCheck(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={showTimepicker}>
        <Text  >{date ? getDatetime(date) : 'Select Date'} </Text>
      </TouchableOpacity>
      {(show&&reset) && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0}
          value={date || new Date()}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
          {...moreProps}
        />
      )}
    </View>
  );
};

export default MyDateTimePicker;
