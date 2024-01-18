import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
    let [text, setText] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [loc, setLoc] = useState([])
    const [wet, setWet] = useState([])
    const [cond, setCond] = useState([])
    const [timeODay, setTime] = useState([])

    const onPress = () => {
      console.log(text)
      fetch('http://api.weatherapi.com/v1/current.json?&q=' + text + '&aqi=no').then(response => response.json()).then((json) => {
        console.log(json.location)
        console.log(json)
        console.log(json.status)
        setLoc(json.location)
        setWet(json.current)
        setCond(json.current.condition)
        setShowResults(true)
        if (json.current.is_day == 1){
          setTime('Daytime')
        }
        else{
          setTime('Nighttime')
        }
      });
      };

      return (
    <View style = {styles.container}>
      <Text style = {styles.homeText}>Weather</Text>
      <View style = {styles.sideBySide}>
        <TextInput
        style = {styles.searchBar}
        placeholder = "Enter a location!"
        onChangeText={(inputText) => setText(inputText)}
        defaultValue={text}></TextInput>
          <TouchableOpacity style = {styles.searchButton} onPress = {onPress}>
          <Image source = {require('./assets/searchBar.png')} style = {{width: 25, height: 25}}/>
        </TouchableOpacity>
      </View>
      {showResults && (
        <View style = {{paddingTop: 20}}>
          <View style = {{justifyContent: 'center', flexDirection: 'row', paddingBottom: 10}}>
            <Text style = {styles.bigComponent}>{loc.name + " " + loc.region}</Text>
          </View>
          <View style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 10}}>
            <Text style = {styles.smallComponent}>{timeODay}</Text>
            <Text style = {styles.smallComponent}>{'Currently ' + cond.text}</Text>
          </View>
          <View style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 10}}>
            <Text style = {styles.smallComponent}>{'Temperature: ' + wet.temp_f}</Text>
            <Text style = {styles.smallComponent}>{'Feels like: ' + wet.feelslike_f}</Text>
          </View>
          <View style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 10}}>
            <Text style = {styles.smallComponent}>{'Humidity: ' + wet.humidity + '%'}</Text>
            <Text style = {styles.smallComponent}>{'Wind Speed ' + wet.wind_mph + "mph"}</Text>
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontStyle: 'italic',
  },
  sideBySide:{
    fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  searchBar: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#FFFFFF',
    color: '#FFFFFF'
  },
  searchButton: {
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  bigComponent:{
    flexWrap: 'wrap',
    fontSize: 25,
    textAlign: 'center',
    width: 300,
    fontStyle: 'italic',
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 15
  },
  smallComponent: {
    fontStyle: 'italic',
    textAlign: 'center',
    color: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#FFFFFF',
    width: 150,
    height: 40,
    paddingTop: 10
  }
});
