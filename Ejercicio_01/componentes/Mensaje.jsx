import { View, Text } from "react-native";

export default function Mensaje(props){
    const variableMensaje= "Esto es mi mensaje";
    const num=1000;
    const double = n => n*2; 

    return(
        <View style={{ backgroundColor: "black" }}> 
            <Text style={{ color: "blue" }}>{props.msg}</Text>
            <Text style={{ color: "red" }}>{double(num)}</Text>
        </View>
    );
}