import React from "react"
import { View, Text, Image } from "react-native"
import styles from "./style"

export default function Splash(){
    return(   
            <View>
                <Image source={{uri: "https://images.educamaisbrasil.com.br/content/superior/instituicao/logo/g/universidade-de-vassouras.png"}} style={styles.test} />
            </View>
    );
}