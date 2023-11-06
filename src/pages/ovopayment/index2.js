import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GopayIcon, IconRumah, LogoWhatsApp, OVOIcon, OvoIcon, WhatsAppLogo } from '../../assets'
import colors from '../../utils/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function OVOPayment2({navigation}) {
    // const [hargaPakaian, setHargaPakaian] = useState(0);
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //           // Mendapatkan data harga dari penyimpanan lokal
    //           const hargaPakaianString = await AsyncStorage.getItem('totalHarga');
    //           console.log('Data harga yang diambil:', hargaPakaianString);
          
    //           // Mengonversi data harga dari string ke number
    //           const hargaPakaianNumber = parseInt(hargaPakaianString, 10);
    //           console.log('Data harga yang diubah ke number:', hargaPakaianNumber);
          
    //           // Menyimpan harga pakaian dalam state
    //           setHargaPakaian(hargaPakaianNumber);
    //         } catch (error) {
    //           console.error('Gagal mendapatkan data harga:', error);
    //         }
    //       }
          
    
    //     getData();
    //   }, []);
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
 
 <ScrollView>
    <View style={{padding:10}}>
        <View>
        <Text style={{fontFamily:"Poppins-SemiBold", fontSize:15, }}>Tranfer Via OVO</Text>
        <Text style={{fontFamily:'Poppins-SemiBold', fontSize:15, }}>Total Rp 164.530</Text>
        </View>
    </View>

    <View style={{alignItems:"center", marginTop:'10%'}}>
        <Image style={{width:150, height:150, }} source={OVOIcon}/>
        <Text style={{fontFamily:'Poppins-SemiBold', fontSize:12, textAlign:"center", marginTop:10,}}>Tolong Transfer sesuai dengan nominal transaksi</Text>
        <Text style={{fontFamily:"Poppins-SemiBold", fontSize:15, }}>NO OVO : 0812345678912</Text>
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