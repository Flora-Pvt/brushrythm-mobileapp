import axios from 'axios'

import React, { useState } from 'react'
import { View, Pressable, StyleSheet, TextInputProps } from 'react-native'
import AppText from 'components/general/AppText'
import AppInput from 'components/general/AppInput'
import AppButton from 'components/general/AppButton'

import { useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { logUser } from 'features/user/userSlice'

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
      autocomplete: 'email' as TextInputProps['autoComplete'],
    },
    {
      label: t('password', { keyPrefix: 'common' }),
      value: loginCredentials.password,
      key: 'password',
      autocomplete: 'current-password' as TextInputProps['autoComplete'],
    },
  ]

  const onSignin = async (event, { email, password }) => {
    event.preventDefault()

    // TODO: UI feedback if not valid
    if (!email || !password) return

    const response = await axios.post('/users/login', { email, password })
    const result = response.data

    // TODO: UI feedback if error

    dispatch(logUser(result))
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
            autocomplete={loginInput.autocomplete}
            onChangeText={(newVal) =>
              setLoginCredentials({
                ...loginCredentials,
                [loginInput.key]: newVal,
              })
            }
          />
        ))}
      </View>

      <AppButton
        text={t('signin')}
        onPress={(e) => onSignin(e, loginCredentials)}
      />

      <Pressable onPress={() => navigation.navigate('Signup')}>
        <AppText style={styles.signupLink}>{t('noAccountYet')}</AppText>
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
  signupLink: {
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
  },
})

export default Login
