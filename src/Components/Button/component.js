import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

export default function MyButton({ icon, title, onPress, ...moreArgs }) {
  return (
    <Button
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'auto',
      }}
      icon={
        icon ? (
          <Icon
            name={icon.name}
            size={icon.size || 10}
            color={icon.color || 'white'}
          />
        ) : null
      }
      iconRight
      title={title}
      onPress={onPress}
      {...moreArgs}
    />
  );
}
