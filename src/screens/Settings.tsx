import React, { useState } from 'react'
import { ScrollView, View, Pressable, StyleSheet } from 'react-native'
import AppInput from 'components/general/AppInput'
import AppText from 'components/general/AppText'

import { useSelector } from 'react-redux'
import { selectUser } from 'features/user/userSlice'

import { useTranslation } from 'react-i18next'

import { COLORS } from 'utils/constants'

import axios from 'axios'
import AppButton from 'components/general/AppButton'

export default function Settings() {
  const { t } = useTranslation('translation', { keyPrefix: 'signup' })

  const userToChange = useSelector(selectUser)
  const userCopy = { ...userToChange }

  const [user, setUser] = useState(userToChange)
  const [isUserChanged, setIsUserChanged] = useState(false)

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

  const onChangeText = (newUserVal) => {
    setUser(newUserVal)

    const isChange =
      user.name !== userCopy.name ||
      user.username !== userCopy.username ||
      user.email !== userCopy.email

    setIsUserChanged(isChange)
  }

  const onSaveChange = async () => {
    const { name, username, email } = user
    axios.patch(`/users/${user.id}`, { name, username, email })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.initialContainer}>
          <AppText style={styles.initial}>{userInitial}</AppText>
        </View>

        <View style={styles.inputContainer}>
          {settingsInputs.map((settingInput, inputIndex) => (
            <AppInput
              key={`setting-input-${inputIndex}`}
              label={settingInput.label}
              value={settingInput.value}
              onChangeText={(newVal) =>
                onChangeText({ ...user, [settingInput.key]: newVal })
              }
            />
          ))}
        </View>

        <AppButton
          text={t('save', { keyPrefix: 'common' })}
          disabled={!isUserChanged}
          onPress={onSaveChange}
        />
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
