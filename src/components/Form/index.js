import React, {useState, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import usuarioService from "../../services/UsuarioService";
import styles from "./styles";
import Splash from "../Splash";
import * as Location from 'expo-location';

export default function Form() {
    const [numero, setNumero] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [ValorConvertido, setValorConvertido] = useState(0)

    useEffect(() => {
        (async () => {
          const { statusLoc } = await Location.requestForegroundPermissionsAsync();
          if (statusLoc !== 'granted') {
            setErrorMsg('Permissão da localização Negada');
          }
        })();
      }, []);
      
    async function salvarLocalizacao() {
        let actualLocation = await Location.getCurrentPositionAsync({});
        setLocation(actualLocation.coords);
        console.log(actualLocation.coords);    
      }

    useEffect(() => {
        salvarLocalizacao();
    }, [])

    function converterParaDollar() {
        if ( numero != null ){
            
            usuarioService.converterReal().then((response) => {
                setValorConvertido(response.data.BRLUSD.ask * numero)
            })
            .catch((error) => {
                console.log("Algo deu errado com a sua requisição")
                console.log(error)
            })
            setValorConvertido((0))
            setNumero(null)
        }       

        else{
            Alert.alert('Escreva um valor')
            setNumero(null)
        }
        setValorConvertido(0)
        setNumero(null)
    }


    return(
        <View style={styles.form}>  
              <Splash/>   
              <Text style={styles.formLabel}>Informe o Valor</Text>
              <TextInput style={styles.input} keyboardType="numeric" onChangeText={setNumero} value={numero}/>
              <Text style={styles.result}>Valor Convertido: {ValorConvertido.toFixed(2)}</Text>
              <TouchableOpacity style={styles.button} onPress={() => converterParaDollar()}><Text>Calcular</Text></TouchableOpacity>
        </View>
        
    );
}