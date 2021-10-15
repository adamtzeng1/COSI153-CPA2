import React, { useState, useEffect } from 'react';
import {View,StyleSheet,Text, ScrollView, TextInput , Button} from 'react-native';
import {useValue} from './ValueContext';
import NameChecker from './NameChecker';


const SecondScreen = ({route, navigation}) => {
 const {currentValue} = route.params;
 const [newName, setNewName] = useState('')
 if(currentValue !== ""){
     return (
    <ScrollView style = {styles.container}>
      <View style = {{borderWidth: 5, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,}}>
        <Text>Current player:{currentValue}</Text>
      </View>
      <View>
        <Text style = {styles.textFormat}>Find new people to play with!</Text>
      </View>
        <Text>In the future. This screen will be responsibile for listing other players available to play</Text>  
    </ScrollView>
  );
 }else {
     return (
    <ScrollView style = {styles.container}>
      <View style = {{borderWidth: 5, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,}}>
        <Text>Current player:{currentValue}</Text>
      </View>

      <View>
      <Text>Oops, you did not provide a name. Please provide your name.</Text>
      <TextInput
        placeholder = "Name here"
        onChangeText = {newName => setNewName(newName)}/>

      <Button
        title = "done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { name: newName },
            merge: true,
          });
        }}/>
      </View>
    </ScrollView>
  );
  }

}
export default SecondScreen

const styles = StyleSheet.create ({
    container:{
      flex:1,
      backgroundColor: 'lightblue',
    },
    textFormat: {
      textAlign:'center',
      fontSize: 50
    }
})
