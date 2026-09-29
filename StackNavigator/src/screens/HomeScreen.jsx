import React from "react";
import { View, Button } from "react-native";

export default function HomeScreen({navigation}) {
    return (
        <View style={{flex:1, justifyContent: "center", padding: 20 }}>
            <Button 
            title="Calcular IMC"
            onPress={() => navigation.navigate('IMC')}
            />
            <Button 
            title="Calcular Propina"
            onPress={() => navigation.navigate('tips')}
            />
            <Button 
            title="Convertir Divisas"
            onPress={() => navigation.navigate('divisas')}
            />
        </View>
    );
};