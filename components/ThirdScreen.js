import React, { useState, useEffect } from 'react'
import {View,StyleSheet,Text, ScrollView, TextInput} from 'react-native';
import HomeScreenCard from './HomeScreenCard';
import NameChecker from './NameChecker';

const ThirdScreen = ({route, navigation}) => {
  const {currentValue} = route.params;
  const [rank, setRank] = useState(0)
  const [hand, setHand] = useState('')
  return (
    <ScrollView style = {styles.container}>
      <View style = {{borderWidth: 5, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,}}>
        <Text>Current player:{currentValue}</Text>
      </View>
      <Text style = {styles.textFormat}><NameChecker name = {currentValue}/></Text>
      <TextInput 
        placeholder = 'Input your NTRP ranking'
        onChangeText = {setRank}/>
      <TextInput 
        placeholder = 'Which hand do you use?'
        onChangeText = {hand => setHand(hand)}/>
      <Text style = {styles.textFormat}>(work in progress) This page will be like the profile page. It will detail the characteristics of the player</Text>
    </ScrollView>
  )
}
export default ThirdScreen

const styles = StyleSheet.create ({
    container:{
      flex:1,
      backgroundColor: 'lightblue',
    },
    textFormat: {
      fontSize: 30
    }
})