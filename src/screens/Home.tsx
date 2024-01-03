import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'

import ExerciseButtons from 'components/home/ExerciseButtons'

export default function Home({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.exercisesContainer}>
        <ExerciseButtons onPress={() => navigation.navigate('Exercise')} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  exercisesContainer: {
    flex: 1,
    alignItems: 'center',
    rowGap: 24,
    padding: 40,
  },
})
