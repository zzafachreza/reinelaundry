import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'
import { IconRumah, LogoBCA, LogoWhatsApp } from '../../assets'

export default function AmbilTanpaRibet4({navigation}) {
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
   
   <ScrollView>


    <View style={{padding:10,}}>

{/* TOTAL TF */}
<View style={{padding:10,}}>
<Text style={{fontFamily:'Poppins-Bold', fontSize: 18, }}>Transfer Via Bank</Text>
<Text style={{fontFamily:'Poppins-SemiBold', fontSize: 18, }}>Total  Rp 164.530</Text>
</View>

<View style={{padding:10, alignItems:'center', marginTop: -30}}>

{/* LOGO BCA */}
<View>
    <Image style={{width:208, height: 228}} source={LogoBCA}/>
</View>

{/* REK BANK BCA */}
<View style={{marginTop: -30}}>
    <Text style={{fontFamily:'Poppins-SemiBold', fontSize: 25, textAlign:'center'}}>BCA</Text>
    <Text style={{fontFamily:'Poppins-SemiBold', fontSize: 25, textAlign:'center'}}>12997121003</Text>
    <Text style={{fontFamily:'Poppins-SemiBold', fontSize: 25, textAlign:'center'}}>Reine Laundry</Text>

</View>

<View>
    <Text style={{textAlign:'center', fontFamily:'Poppins-SemiBold', fontSize: 12, marginTop: 10, }}>
        Silakan kirim bukti transfer pada{'\n'}nomor admin laundry ini
    </Text>
</View>

{/* LOGO WA */}
<View>
    <View >
        <Image style={{width:100, height: 100}} source={LogoWhatsApp}/>
    </View>
</View>

<View>
    <Text style={{textAlign:'center', fontFamily:'Poppins-SemiBold', fontSize: 12, marginTop: 10, }}>
      Jika ada pertanyaan atau kendala adna dapat juga{'\n'}menghubungi WA admin
    </Text>
</View>

</View>

    </View>
       </ScrollView>

       {/* TOMBOL KEMBALI KE HOME */}
<View style={{}}>
<TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={{padding:10, backgroundColor:colors.primary,alignItems:'center', borderTopLeftRadius: 10, borderTopRightRadius:10,}}>
 <Image style={{width: 30, height: 45, alignItems:'center'}} source={IconRumah}/>
</TouchableOpacity>
</View>


    </View>
  )
}