import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../utils/colors'
import { LogoCeklis } from '../../assets'

export default function CancelPilihSendiri2({navigation}) {
           useEffect(() => {
        setTimeout(() => {
            navigation.navigate("HomeScreen")
        },2100)
    },[])

  const handleBack = () => {
    navigation.goBack()
  }
  return (
    <View style={{flex:1, backgroundColor:'white',}}>
     <View stle={{padding:10}}>

    <View style={{marginTop:'50%'}}>


    <View style={{ alignItems:'center',  }}>
        <Image style={{width:260, height: 218}} source={LogoCeklis}/>
    </View>

    <View style={{alignItems:'center'}}>
        <Text style={{fontFamily:'Poppins-SemiBold', fontSize: 20, textAlign:'center', }}>Pesanan berhasil dihapus</Text>
    </View>

    </View>


     </View>
    </View>
  )
}