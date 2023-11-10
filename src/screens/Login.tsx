import React, { useState } from 'react'
import { View, TextInput, Pressable, Text } from 'react-native'
import { useTranslation } from 'react-i18next'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const Login = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'login' })

  const [user, setUser] = useState({ name: '', email: '', password: '' })

  const onSignin = () => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((result) => {
        console.log(result.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View>
      <TextInput
        placeholder={t('name', { keyPrefix: 'common' })}
        onChangeText={(name) => setUser({ ...user, name })}
      />
      <TextInput
        placeholder={t('email', { keyPrefix: 'common' })}
        onChangeText={(email) => setUser({ ...user, email })}
      />
      <TextInput
        placeholder={t('password', { keyPrefix: 'common' })}
        secureTextEntry={true}
        onChangeText={(password) => setUser({ ...user, password })}
      />
      <Pressable onPress={onSignin}>
        <Text>{t('signin')}</Text>
      </Pressable>
    </View>
  )
}

export default Login
