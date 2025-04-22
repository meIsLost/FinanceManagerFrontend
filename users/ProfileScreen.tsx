import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from './userSlice'

export default function ProfileScreen() {
    const dispatch = useDispatch()
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Logout" onPress={() => dispatch(logout())}/>
    </View>
  )
}