import React from 'react'
import { ModalProps, Modal, Pressable, View, StyleSheet } from 'react-native'
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
  const closeIfPressOutside = (event) => {
    const isPressOnModal = event.target.closest('#modalInner')

    if (isPressOnModal) return
    setModalVisible(false)
  }

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <Pressable
        style={{ ...styles.container, ...containerStyle }}
        onPress={closeIfPressOutside}
      >
        <View id="modalInner" style={{ ...styles.modal, ...modalStyle }}>
          {children}

          <AppButton
            text={ctaText}
            customStyles={{ ...styles.button, ...ctaStyle }}
            onPress={() => setModalVisible(!modalVisible)}
          ></AppButton>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
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
