/* eslint-disable no-alert */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState} from 'react';
import {View, Button, Text, StyleSheet, ScrollView, Picker, Settings} from 'react-native';
import {VictoryZoomContainer, VictoryBar, VictoryLegend, VictoryLine, VictoryTheme, VictoryChart, VictoryStack, VictoryArea, Curve, handleClick} from 'victory-native';

export default function Tracker(props)
{  

    let flatDataC = [];
    let flatDataR = [];
    let flatDataD = [];
    let confirmedToday = 0;
    let recoveredToday = 0;
    let deathsToday = 0;
    let allToday = 0;
    let countItem = 0;

    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    for (var i = 0; i<props.route.params.json.Russia.length; ++i)
    {
        flatDataC.push({x: props.route.params.json.Russia[i].date, y: 0});
        flatDataR.push({x: props.route.params.json.Russia[i].date, y: 0});
        flatDataD.push({x: props.route.params.json.Russia[i].date, y: 0});
    }

    const [selectedValue, setSelectedValue] = useState("Russia");
    const [data, setData] = useState(props.route.params.json.Russia.map((s, i) => {
        s.id = i;
        return s;
      }),
    );

    console.log(data);

    for (let key in data) {
        var len = data.length;
        confirmedToday = data[len-1].confirmed;
        recoveredToday = data[len-1].recovered;
        deathsToday = data[len-1].deaths;
        data.map((j, i) => {
            flatDataC[i].y = j.confirmed;
            flatDataR[i].y = j.recovered;
            flatDataD[i].y = j.deaths;
        });
    }

    countryList = () =>{
        return(props.route.params.cities.map( (x,i) => { 
              return( <Picker.Item label={x} key={i} value={x}/>)} ))};

    return(
        <View style={styles.container}>
            <ScrollView>
                <Text style = {styles.text}>Статистика на {day}.{month}.{year}</Text>
                <View style = {styles.picker}>
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: 250 }}
                        onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue),
                            setData(
                                props.route.params.json[itemValue].map((s, i) => {
                                  s.id = i;
                                  return s;
                                }),
                              );
                            }}
                    >
                        {countryList()}
                    </Picker>
                </View>
                <View style = {{flex: 1, paddingTop: 20}}>
                    <Text style = {styles.small_text}>Заражённых: {confirmedToday}</Text>
                    <Text style = {styles.small_text}>Умерших: {deathsToday}</Text>
                    <Text style = {styles.small_text}>Выздоровевших: {recoveredToday}</Text>
                    <Text style = {styles.small_text}>Больных сейчас: {confirmedToday - recoveredToday -deathsToday}</Text>                    
                </View>
                <View style={styles.button}>
                    <Button
                        style={styles.button}
                        color="black"
                        title="Подробнее"
                        onPress={() => props.navigation.navigate('Статистика в цифрах', initialParams={data: data})}
                    />
                </View>
                <ScrollView horizontal
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight)=>{        
                        this.scrollView.scrollToEnd({animated: true});
                    }}
                    >
                    <VictoryChart
                        theme={VictoryTheme.material}
                        width={10000}
                        height={500}
                        domainPadding={{x: [10, -10], y: 5}}
                    >
                        <VictoryBar
                            labels={({ datum }) => datum.y}
                            style={{ data: { fill: "red" } }}
                            data={flatDataC}
                        />
                        <VictoryBar
                            labels={({ datum }) => datum.y}
                            style={{ data: { fill: "orange" } }}
                            data={flatDataR}
                        />
                        <VictoryBar
                            labels={({ datum }) => datum.y}
                            style={{ data: { fill: "gold" } }}
                            data={flatDataD}
                        />
                    </VictoryChart>
                </ScrollView>
                <VictoryLegend
                        orientation="vertical"
                        centerTitle
                        gutter={40}
                        style={{ border: { stroke: "black"}, flex:0, paddingBottom: 0}}
                        colorScale={[ "red", "orange", "gold" ]}
                        data={[
                            { name: "Заразившиеся" }, { name: "Выздоровевшие" }, { name: "Умершие" }
                        ]}
                    />
            </ScrollView>
        </View>           
    );   
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#E6E6FA',
        paddingLeft: 10
    },
    text: {
        flex: 0.5,
        fontSize: 28,
        fontFamily: 'mr_ITCSerifGothic',
        paddingLeft: 5,
        paddingTop: 7,
    },
    small_text:{
        // flex: 1,
        fontSize: 22,
        fontFamily: 'mr_ITCSerifGothic',
        paddingLeft: 5,
        // height: 60,
        paddingBottom: 10,
    },
    button:{
        borderRadius: 40,
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 50,
        paddingRight: 50,
    },
    chart:{
        padding: 0,
    },
    picker: {
        // margin: 40,
        marginVertical: 10,
        marginLeft: 0,
        marginRight: 80,
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#1f5865',
    },
});