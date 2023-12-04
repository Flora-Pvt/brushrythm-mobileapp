import React, { useState } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import AppInput from 'components/general/AppInput'

import { useSelector } from 'react-redux'
import { selectUser } from '../store/features/userSlice'

import { useTranslation } from 'react-i18next'

import { COLORS } from 'utils/constants'

export default function Settings() {
  const { t } = useTranslation('translation', { keyPrefix: 'signup' })

  const userToChange = useSelector(selectUser)

  const [user, setUser] = useState(userToChange)

  const userInitial = user.username.slice(0, 1)

  const settingsInputs = [
    {
      label: t('name', { keyPrefix: 'common' }),
      value: user.name,
      key: 'name',
    },
    {
      label: t('username', { keyPrefix: 'common' }),
      value: user.username,
      key: 'username',
    },
    {
      label: t('password', { keyPrefix: 'common' }),
      value: '*******',
      key: 'password',
    },
    {
      label: t('email', { keyPrefix: 'common' }),
      value: user.email,
      key: 'email',
    },
  ]

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.initialContainer}>
          <Text style={styles.initial}>{userInitial}</Text>
        </View>

        <View style={styles.inputContainer}>
          {settingsInputs.map((settingInput, inputIndex) => (
            <AppInput
              key={`setting-input-${inputIndex}`}
              label={settingInput.label}
              value={settingInput.value}
              onChangeText={(newVal) =>
                setUser({ ...user, [settingInput.key]: newVal })
              }
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
