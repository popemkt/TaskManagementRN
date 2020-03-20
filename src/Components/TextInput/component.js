import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'react-native-elements';
import React from 'react';

export default function TextInput({
  label,
  placeholder,
  icon,
  errorMessage,
  value,
  onChangeText,
  style,
  ...moreProps
}) {
  return (
    <Input
      placeholder={placeholder}
      placeholderTextColor='grey'
      leftIcon={
        icon ? (
          <Icon name={icon.name} size={ icon.size || 24} color={icon.color || 'black'} />
        ) : null
      }
      labelStyle={{ fontSize: 20, fontWeight: 'bold' }}
      label={label}
      errorStyle={{ color: 'red' }}
      errorMessage={errorMessage}
      value={value}
      onChangeText={onChangeText}
      inputStyle={{ paddingLeft: 30 }}
      {...moreProps}
    />
  );
}
