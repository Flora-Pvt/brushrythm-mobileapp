import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'

import { useSelector } from 'react-redux'
import { selectUser } from '../store/features/userSlice'

import Step from 'components/home/Step'
import HorizontalConnector from 'components/home/HorizontalConnector'
import { VerticalConnector } from 'utils/svg-images'

export default function Home() {
  const user = useSelector(selectUser)

  console.log(user)

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <VerticalConnector style={styles.firstVerticalConnector} />

        <View style={styles.lineContainer}>
          {/* <Text>{user?.streak || 0}</Text> */}
          <View style={styles.stepsLine}>
            <Step />
            <HorizontalConnector />
            <Step />
          </View>

          <View style={styles.stepsLine}>
            <Step />
            <HorizontalConnector />
            <Step />
          </View>

          <View style={styles.stepsLine}>
            <Step />
            <HorizontalConnector />
            <Step />
          </View>

          <View style={styles.stepsLine}>
            <Step />
            <HorizontalConnector style={styles.lastHorizontalConnector} />
          </View>
        </View>

        <View>
          <VerticalConnector style={styles.secondVerticalConnector} />
          <VerticalConnector style={styles.thirdVerticalConnector} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  lineContainer: {
    gap: 100,
  },
  stepsLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lastHorizontalConnector: {
    position: 'absolute',
    right: 0,
  },
  firstVerticalConnector: {
    transform: [{ rotate: '180deg' }],
    marginTop: 199.5,
    marginRight: -8,
  },
  secondVerticalConnector: { marginTop: 29.5, marginLeft: -8 },
  thirdVerticalConnector: { marginTop: 158, marginLeft: -8 },
})
