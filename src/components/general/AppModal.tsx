import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import AppButton from './AppButton'
import { COLORS } from 'utils/constants'

export default function AppModal({
  modalVisible,
  setModalVisible,
  children,
  ctaText,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          {children}

          <AppButton
            text={ctaText}
            customStyles={{ width: 200 }}
            onPress={() => setModalVisible(!modalVisible)}
          ></AppButton>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
