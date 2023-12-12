import axios from 'axios'

import React, { useState } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import AppText from 'components/general/AppText'
import AppInput from 'components/general/AppInput'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { logUser } from 'features/user/userSlice'

import { storeStringData } from 'utils/async-storage'
import { COLORS } from 'utils/constants'

export const Login = ({ navigation, setIsLoggedIn = (state) => {} }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'login' })

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const [loginCredentials, setLoginCredentials] = useState({
    name: '',
    email: '',
    password: '',
  })

  const loginInputs = [
    {
      label: t('email', { keyPrefix: 'common' }),
      inputMode: 'email',
      value: loginCredentials.email,
      key: 'email',
    },
    {
      label: t('password', { keyPrefix: 'common' }),
      value: loginCredentials.password,
      key: 'password',
    },
  ]

  const onSignin = async (event, { email, password }) => {
    event.preventDefault()

    // TODO: Check if valid email and strong password
    // TODO: UI feedback if not valid
    if (!email || !password) return

    const response = await axios.post('/users/login', { email, password })
    const result = response.data

    storeStringData('userId', result.id)
    storeStringData('token', result.token)

    dispatch(logUser(result.id, result.token))
    setIsLoggedIn(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {loginInputs.map((loginInput, inputIndex) => (
          <AppInput
            key={`setting-input-${inputIndex}`}
            label={loginInput.label}
            value={loginInput.value}
            onChangeText={(newVal) =>
              setLoginCredentials({
                ...loginCredentials,
                [loginInput.key]: newVal,
              })
            }
          />
        ))}
      </View>

      <Pressable
        style={styles.button}
        onPress={(e) => onSignin(e, loginCredentials)}
      >
        <AppText>{t('signin')}</AppText>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Signup')}>
        <AppText style={styles.signup}>{t('noAccountYet')}</AppText>
      </Pressable>
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
  signup: {
    color: COLORS.white,
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
  },
})

export default Login
