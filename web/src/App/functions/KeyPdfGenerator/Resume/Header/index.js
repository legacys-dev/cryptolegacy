import React from 'react'
import {Image, View, StyleSheet} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    height: '20px',
    width: '100px'
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end'
  },
  name: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica'
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
    textTransform: 'uppercase',
    fontFamily: 'Helvetica'
  },
  link: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end'
  },
  image: {
    marginBottom: 10
  }
})

export default function Header(props) {
  return (
    <View style={styles.container}>
      <Image
        src="https://f002.backblazeb2.com/file/Crytolegacy/twoColorsBT.png"
        style={styles.image}
      />
    </View>
  )
}
