import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import AppInput from 'components/general/AppInput'

import { useSelector } from 'react-redux'
import { selectUser } from '../store/features/userSlice'

import { COLORS } from 'utils/constants'

export default function Settings() {
  const user = useSelector(selectUser)

  const userInitial = user.username.slice(0, 1)

  const inputs = [
    { label: 'Name', placeholder: '', value: user.name },
    { label: 'Username', placeholder: '', value: user.username },
    { label: 'Password', placeholder: '*******', value: '' },
    { label: 'Email', placeholder: '', value: user.email },
  ]

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.initialContainer}>
          <Text style={styles.initial}>{userInitial}</Text>
        </View>

        <View style={styles.inputContainer}>
          {inputs.map((settingInput, inputIndex) => (
            <AppInput
              key={`setting-input-${inputIndex}`}
              label={settingInput.label}
              placeholder={settingInput.placeholder}
              value={settingInput.value}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  initialContainer: {
    backgroundColor: COLORS.accent,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  initial: {
    fontSize: 40,
  },
  inputContainer: {
    gap: 30,
  },
})
