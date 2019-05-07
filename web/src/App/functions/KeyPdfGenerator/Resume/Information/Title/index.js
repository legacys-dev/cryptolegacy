import React from 'react'
import {Text, StyleSheet} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'uppercase'
  }
})

export default function Title(props) {
  return <Text style={styles.title}>{props.text}</Text>
}
