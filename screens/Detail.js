import React, {Component} from 'react';
import {View, Button, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
let Head = ["Дата", "Зараженных", "Выздоровевших", "Умерших"];

export default function Detail(props)
{
    console.log(props)
    let tabData = [];
    let x = props.route.params.data.sort(function(a, b){return(b - a)})
    for (var i=x.length-1; i > 0 ; --i)
    {
        tabData.push([x[i].date, x[i].confirmed-x[i-1].confirmed, x[i].recovered-x[i-1].recovered, x[i].deaths-x[i-1].deaths])
    }
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <ScrollView>
                <Table borderStyle={{borderWidth: 2, borderColor: 'black'}}>
                    <Row data={Head} style={styles.head} textStyle={styles.small_text}/>
                    <Rows data={tabData} style={styles.head} textStyle={styles.small_text}/>
                </Table>
                </ScrollView> 
            </View>
            <View style={styles.button}>
                <Button title="Назад" color='black' onPress={() => props.navigation.goBack()} />
            </View>
        </View>
    );
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
        fontSize: 10,
        fontFamily: 'mr_ITCSerifGothic',
        paddingLeft: 10,
        alignContent: 'center',
        justifyContent: 'center',
        // height: 60,
        // paddingBottom: 0,
        // margin: 10,
    },
    button:{
        borderRadius: 40,
        paddingTop: 10,
        paddingBottom: 30,
        paddingLeft: 50,
        paddingRight: 50,
    },
    chart:{
        flex: 5,
        padding: 20,
    },
    head:{ 
        height: 40, 
        backgroundColor: '#E6E6FA' 
    },
});