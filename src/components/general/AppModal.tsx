import React from 'react'
import { ModalProps, View, Modal, StyleSheet } from 'react-native'
import AppButton from './AppButton'
import { COLORS } from 'utils/constants'

export default function AppModal({
  modalVisible,
  setModalVisible,
  animationType = 'none' as ModalProps['animationType'],
  containerStyle = {},
  modalStyle = {},
  ctaStyle = {},
  children,
  ctaText,
}) {
  /** TODO: add clikoutside */

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View style={{ ...styles.container, ...containerStyle }}>
        <View style={{ ...styles.modal, ...modalStyle }}>
          {children}

          <AppButton
            text={ctaText}
            customStyles={{ ...styles.button, ...ctaStyle }}
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
  modal: {
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
  button: {
    width: 200,
    alignSelf: 'center',
  },
})
