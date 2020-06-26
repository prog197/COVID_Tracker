import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Header ({title})
{
    return(
        <View style = {style.header}>
            <Text style = {style.text}>{title}</Text>
        </View>
    );
}

const style = StyleSheet.create(
{
    header:{
        backgroundColor: '#E6E6FA',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    text:{
        fontSize:35,
        fontFamily: 'mr_ITCSerifGothic',
    },
});