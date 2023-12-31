import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LeftArrow, NotifikasiAmbilTanpaRibet2, OrangNyuci } from '../../assets';
import colors from '../../utils/colors';
import { useNavigationBuilder } from '@react-navigation/native';
import { MYAPP, apiURL, getData } from '../../localstorage';
import axios from 'axios';

export default function AmbilTanpaRibet2({ navigation, route }) {

  const kode = route.params.kode;

  const handleBack = () => {
    navigation.goBack()
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          padding: 10,
          borderBottomEndRadius: 5,
          borderBottomStartRadius: 5,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >

        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'black', fontFamily: 'Poppins-SemiBold', fontSize: 20, textAlign: 'center' }}>
            Ambil Tanpa Ribet
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} horizontal={false}>
        <View style={{ padding: 10, }}>

          {/* NOTIFIKASI */}
          <View style={{ padding: 10, alignItems: 'center' }}>
            <Image style={{ width: 391, height: 90 }} source={NotifikasiAmbilTanpaRibet2} />
          </View>


          {/* ORANG NYUCI */}
          <View style={{ padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', }}>
            <View style={{ marginLeft: '20%' }}>
              <Image style={{ width: 255, height: 325 }} source={OrangNyuci} />
            </View>

            <View style={{ left: -80, top: -80 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, }}>Sebentar ya masih{'\n'}dihitung~</Text>
            </View>
          </View>

          {/* TOTAL */}
          <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'center', marginTop: 0 }}>
            <View>
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20, }}>Total            -</Text>
            </View>


          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={(() => {
        console.log(kode)
        axios.post(apiURL + 'transaksi_cek', {
          kode: kode
        }).then(res => {
          console.log(res.data);
          if (res.data == 404) {
            Alert.alert(MYAPP, 'Laundry kamu masih dihitung ya . . .')
          } else {
            navigation.navigate('AmbilTanpaRibet3', res.data)
          }
        })
      })} style={{
        padding: 20,
        backgroundColor: colors.primary,
      }}>
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, textAlign: 'center', color: colors.white }}>Cek Selesai Hitung</Text>
      </TouchableOpacity>
    </View>
  );
}
