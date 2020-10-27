/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  board: {
    width: 312,
    height: 312,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  line: {
    position: 'absolute',
    width: 3,
    height: 306,
    backgroundColor: '#E9E9E9',
    transform: [
      {translateX: 100},
    ]
  },
  score:{
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20,marginBottom:40
  },
  scorelist:{
    width: '33%', alignItems: 'center',
  },
  scorecount:{
    marginTop:5,fontWeight:'bold',
  }

  
})
