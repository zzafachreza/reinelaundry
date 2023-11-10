import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'
import axios from 'axios';
import { apiURL } from '../../localstorage';
export default function CancelPilihSendiri1({ navigation, route }) {

  const handleBack = () => {
    navigation.goBack()
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white', }}>
      <View stle={{ padding: 10 }}>

        <View style={{ marginTop: '50%' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20, textAlign: 'center', }}>Yakin ingin cancel{'\n'}pesanan ini?</Text>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>

            <TouchableOpacity onPress={() => {

              axios.post(apiURL + 'transaksi_cancel', {
                kode: route.params.kode
              }).then(res => {
                console.log(res.data)
                navigation.navigate("CancelPilihSendiri2")
              })

            }} style={{ padding: 10, backgroundColor: colors.errormessage, width: 100, borderRadius: 5 }}>
              <Text style={{ color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 15, textAlign: 'center' }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleBack} style={{ padding: 10, backgroundColor: colors.primary, width: 100, borderRadius: 5 }}>
              <Text style={{ color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 15, textAlign: 'center' }}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>


      </View>
    </View>
  )
}