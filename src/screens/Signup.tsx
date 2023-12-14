import axios from 'axios'

import React, { useState } from 'react'
import { ScrollView, View, Pressable, StyleSheet } from 'react-native'
import AppInput from 'components/general/AppInput'
import AppText from 'components/general/AppText'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { logUser } from 'features/user/userSlice'

import { COLORS } from 'utils/constants'

export const Signup = ({ navigation, setIsLoggedIn = (state) => {} }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'signup' })

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const today = new Date()
  const currentMonth = today.getMonth()

  const [newUser, setNewUser] = useState({
    age: '',
    name: '',
    username: '',
    email: '',
    password: '',
    month: currentMonth,
  })

  const signupInputs = [
    {
      label: t('age', { keyPrefix: 'common' }),
      inputMode: 'numeric',
      maxLength: 2,
      value: newUser.age,
      key: 'age',
    },
    {
      label: t('name', { keyPrefix: 'common' }),
      value: newUser.name,
      key: 'name',
    },
    {
      label: t('username', { keyPrefix: 'common' }),
      value: newUser.username,
      key: 'username',
    },
    {
      label: t('email', { keyPrefix: 'common' }),
      inputMode: 'email',
      value: newUser.email,
      key: 'email',
    },
    {
      label: t('password', { keyPrefix: 'common' }),
      value: newUser.password,
      key: 'password',
    },
  ]

  const onSignup = async (event) => {
    event.preventDefault()

    // TODO: Check if valid email and strong password
    // TODO: UI feedback if not valid
    if (!newUser.email || !newUser.password) return

    const response = await axios.post('/users/signup', newUser)
    const result = response.data

    dispatch(logUser({ id: result.userId, token: result.token }))
    setIsLoggedIn(true)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          {signupInputs.map((signupInput, inputIndex) => (
            <AppInput
              key={`setting-input-${inputIndex}`}
              label={signupInput.label}
              value={signupInput.value}
              onChangeText={(newVal) =>
                setNewUser({ ...newUser, [signupInput.key]: newVal })
              }
            />
          ))}
        </View>

        <Pressable style={styles.button} onPress={onSignup}>
          <AppText>{t('createAccount')}</AppText>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Login')}>
          <AppText style={styles.login}>{t('alreadyAccount')}</AppText>
        </Pressable>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 40,
    backgroundColor: COLORS.secondary,
    flex: 1,
  },
  inputContainer: {
    gap: 30,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 40,
    marginTop: 60,
    marginBottom: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    color: COLORS.white,
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
  },
})

export default Signup
