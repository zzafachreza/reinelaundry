import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { GopayIcon, IconRumah, LogoWhatsApp, OvoIcon, WhatsAppLogo } from '../../assets'
import colors from '../../utils/colors'

export default function GopayPayment2({navigation}) {
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
 
 <ScrollView>
    <View style={{padding:10}}>
        <View>
        <Text style={{fontFamily:"Poppins-SemiBold", fontSize:15, }}>Tranfer Via GOPAY</Text>
        <Text style={{fontFamily:'Poppins-SemiBold', fontSize:15, }}>Total Rp 164.530</Text>
        </View>
    </View>

    <View style={{alignItems:"center", marginTop:'10%'}}>
        <Image style={{width:150, height:150, }} source={GopayIcon}/>
        <Text style={{fontFamily:'Poppins-SemiBold', fontSize:12, textAlign:"center", marginTop:10,}}>Tolong Transfer sesuai dengan nominal transaksi</Text>
        <Text style={{fontFamily:"Poppins-SemiBold", fontSize:15, }}>NO GOPAY : 0812345678912</Text>
    </View>

    <View style={{alignItems:"center", marginTop:'10%'}}>
    <View>
        <Text style={{fontFamily:'Poppins-SemiBold', fontSize:12, textAlign:"center"}}>Silakan kirim bukti transfer pada{'\n'}nomor admin laundry ini</Text>
    </View>
    <View style={{alignItems:'center'}}>
        <Image style={{height:101, width:101,}} source={LogoWhatsApp}/>
        <Text style={{fontFamily:"Poppins-SemiBold", fontSize:12, textAlign:"center"}}>Jika ada pertanyaan atau kendala adna dapat juga menghubungi WA admin</Text>
    </View>
    </View>
   </ScrollView>

   <View>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={{padding:10, backgroundColor:colors.primary, alignItems:'center'}}>
                    <Image style={{width: 30, height: 45, }} source={IconRumah} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("CancelPilihSendiri1")} style={{padding:10, backgroundColor:colors.errormessage}}>
                    <Text style={{color:'white', fontFamily:'Poppins-SemiBold', fontSize:15, textAlign:'center'}}>Cancel Pesanan</Text>
                </TouchableOpacity>
            </View>
    </View>
  )
}