import React, { useState } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import AppText from 'components/general/AppText'
import AppInput from 'components/general/AppInput'
import { COLORS } from 'utils/constants'

import { useTranslation } from 'react-i18next'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const Login = ({ navigation }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'login' })

  const [user, setUser] = useState({ name: '', email: '', password: '' })

  const loginInputs = [
    {
      label: t('email', { keyPrefix: 'common' }),
      inputMode: 'email',
      value: user.email,
      key: 'email',
    },
    {
      label: t('password', { keyPrefix: 'common' }),
      value: user.password,
      key: 'password',
    },
  ]

  const onSignin = () => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error))
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
              setUser({ ...user, [loginInput.key]: newVal })
            }
          />
        ))}
      </View>

      <Pressable style={styles.button} onPress={onSignin}>
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
