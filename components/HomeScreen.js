import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValueProvider from './ValueContext';
import { useRoute } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import HomeScreenCard from './HomeScreenCard';

const HomeScreen = ({ navigation , route}) => {
  const [currentValue, setCurrentValue] = useState("")
  const [debugging, setDebugging] = useState(false)

  useEffect(() => {
    getData()
  }, [])

useEffect(() => {
    if (route.params?.name) {

    }
  }, [route.params?.name]);

  let debugView = ""
  if (debugging) {
    debugView = 
      <View>
        <Text>current: {currentValue}</Text>
        <Button title="clear memory" onPress={() => clearAll()} /> 
      </View>
  }
  let saveData = (<View></View>)

  if (currentValue !== "") {
    saveData = (
      <Button title = "Save Data"
        onPress={()=> storeData({currentValue})}
        style = {{justifyContent:'center'}}
        />
    )
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Home');
      let data = null;
      if (jsonValue != null) {
        data = JSON.parse(jsonValue);
        setCurrentValue(data.currentValue);
      }
    } catch (e) {
      console.dir(e);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@Home', jsonValue);
      alert('Data successfully saved')
    } catch (e) {
      console.dir(e);
    }
  };
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage successfully cleared!')
    } catch (e) {
      console.dir(e);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 0.8 }}>
        <Text style={styles.textFormat}>Welcome, </Text>
        
        <TextInput
          style={styles.textFormat}
          placeholder="Your name here"
          onChangeText={(currentValue) => setCurrentValue(currentValue)}
          value={currentValue}
        />
        <Text>name: {route.params?.name} </Text>
        {saveData}
        <View style={{ flex: 0.1, alignItems: 'center' }}>
          <Card>
            <HomeScreenCard name = {currentValue,navigation}/>
          </Card>
        </View>
        <Image
          source={{
            uri: 'https://www.tennisexpress.com/prodimages/alt_images/WRT106200CS-4.jpg',
          }}
          style={{ margin: 20, width: 350, height: 400, borderRadius: 150 / 2 }}
        />
      
      <View style={{flex: 0.1, flexDirection:'row', alignItems: 'center', justifyContent:'center' }}>
        <Button
          title="Go To About"
          onPress={() => navigation.navigate('SecondScreen', { currentValue })}
        />
        <Button
          title="Go To Third Screen"
          onPress={() => navigation.navigate('ThirdScreen', { currentValue })}
        />
      </View>
      <View>
      <Button
        title={(debugging ? 'hide' : 'show') + ' debug info'}
        color="red"
        onPress={() => setDebugging(!debugging)}
      />
      </View>
      <Text>{debugView}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  textFormat: {
    fontSize: 50,
  },
});
