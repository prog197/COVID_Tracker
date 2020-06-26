/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Button, Text, StatusBar, StyleSheet, ScrollView, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Tracker from './screens/Tracker';
import Detail from './screens/Detail';
import Header from './Header';

const Stack = createStackNavigator();

class App extends Component
{
  url = 'https://pomber.github.io/covid19/timeseries.json';

  state = {
      json: null,
      cities: null,
      holl: <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 30,}}>Загрузка... </Text></View>
  };

  constructor(){
      super();
  }

  componentDidMount(){
      this.getData();
      this.setState();
   }

  async getData(){
      try{
          let response = await fetch(this.url);
          let json = await response.json();
          let cities = Object.keys(json);
          this.setState({json: json, holl:         
          <NavigationContainer>
            <Stack.Navigator initialRouteName="COVID Tracker">
              <Stack.Screen name="Актуальная статистика" component={Tracker} initialParams={{json: json, cities: cities}} />
              <Stack.Screen name="Статистика в цифрах" component={Detail} initialParams={{json: json, cities: cities}}/>
            </Stack.Navigator>
          </NavigationContainer>});
      } catch (error){
      alert('Failed with ' + error.message)
      }
  }



  render(){
    return(
      <View style={styles.container}>      
        <Header title={'COVID Tracker'}/>
          {this.state.holl}
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#E6E6FA',
  },
  text: {
      flex: 0.5,
      fontSize: 28,
      fontFamily: 'mr_ITCSerifGothic',
      paddingLeft: 10,
      paddingTop: 7,
  },
  small_text:{
      // flex: 1,
      fontSize: 22,
      fontFamily: 'mr_ITCSerifGothic',
      paddingLeft: 10,
      // height: 60,
      paddingBottom: 10,
  },
  button:{
      fontSize: 14,
      fontFamily: 'mr_ITCSerifGothic',
  },
});

export default App;
