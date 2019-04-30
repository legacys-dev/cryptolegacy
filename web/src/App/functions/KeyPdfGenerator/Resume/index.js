import React from 'react'
// import styles from './styles.css'
import {Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import Header from './Header'
import Information from './Information'

const styles = StyleSheet.create({
  page: {
    padding: 30
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column'
    }
  },
  image: {
    marginBottom: 10
  },
  leftColumn: {
    flexDirection: 'column',
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    '@media max-width: 400': {
      width: '100%',
      paddingRight: 0
    },
    '@media orientation: landscape': {
      width: 200
    }
  },
  footer: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    marginTop: 25,
    paddingTop: 10,
    borderWidth: 3,
    borderColor: 'gray',
    borderStyle: 'dashed',
    '@media orientation: landscape': {
      marginTop: 10
    }
  }
})

export default function Resume(props) {
  return (
    <Page {...props} style={styles.page}>
      <Header />
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Image
            src="https://images.unsplash.com/photo-1556480955-0f16fab40297?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
            style={styles.image}
          />
        </View>
        <Information />
      </View>
      <Text style={styles.footer}>This IS the candidate you are looking for</Text>
    </Page>
  )
}
