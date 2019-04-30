import React from 'react'
import {Text, View, StyleSheet} from '@react-pdf/renderer'
import Title from './Title'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    '@media max-width: 400': {
      paddingTop: 10,
      paddingLeft: 0
    }
  },
  entryContainer: {
    marginBottom: 10
  },
  date: {
    fontSize: 11,
    fontFamily: 'Helvetica'
  },
  detailContainer: {
    flexDirection: 'row'
  },
  detailLeftColumn: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10
  },
  detailRightColumn: {
    flexDirection: 'column',
    flexGrow: 9
  },
  bulletPoint: {
    fontSize: 10
  },
  details: {
    fontSize: 10,
    fontFamily: 'Helvetica'
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 9
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-end',
    justifySelf: 'flex-end'
  },
  title: {
    fontSize: 11,
    color: 'black',
    textDecoration: 'none',
    fontFamily: 'Helvetica'
  }
})

export default function Information(props) {
  return (
    <View style={styles.container}>
      <Title text="Title" />
      <View style={styles.entryContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.leftColumn}>
            <Text style={styles.title}>titleee</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.date}>dateee</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
