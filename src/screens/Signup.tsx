import React, { useState } from 'react'
import { View, TextInput, Pressable, Text } from 'react-native'
import { useTranslation } from 'react-i18next'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'

export const Signup = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'signup' })

  const [newUser, setNewUser] = useState({
    age: 0,
    name: '',
    username: '',
    email: '',
    password: '',
    streak: 0,
    experience: 0,
    league: 0,
    items: {
      gems: 5,
      cheatBreaks: 1,
      morningBonus: false,
      eveningBonus: false,
      purchasedBonuses: 0,
    },
    quests: {
      completed: 0,
      month: 0,
    },
  })

  const onSignup = () => {
    const auth = getAuth()
    const db = getFirestore()

    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async () => {
        const usersCol = collection(db, 'users')
        const newUserRef = doc(usersCol, auth.currentUser.uid)
        await setDoc(newUserRef, newUser)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={{ padding: 80 }}>
      <TextInput
        placeholder={t('age', { keyPrefix: 'common' })}
        inputMode="numeric"
        maxLength={2}
        onChangeText={(age) => setNewUser({ ...newUser, age: Number(age) })}
      />
      <TextInput
        placeholder={t('name', { keyPrefix: 'common' })}
        onChangeText={(name) => setNewUser({ ...newUser, name })}
      />
      <TextInput
        placeholder={t('username', { keyPrefix: 'common' })}
        onChangeText={(username) => setNewUser({ ...newUser, username })}
      />
      <TextInput
        placeholder={t('email', { keyPrefix: 'common' })}
        onChangeText={(email) => setNewUser({ ...newUser, email })}
      />
      <TextInput
        placeholder={t('password', { keyPrefix: 'common' })}
        secureTextEntry={true}
        onChangeText={(password) => setNewUser({ ...newUser, password })}
      />
      <Pressable onPress={onSignup}>
        <Text>{t('create-account')}</Text>
      </Pressable>
    </View>
  )
}

export default Signup
