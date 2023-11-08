import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import colors from '../../utils/colors';
import { useNavigationBuilder } from '@react-navigation/native';
import {
  BankPayIcon, CODIcon, GopayIcon, LeftArrow, MethodIcon, NotifikasiAmbilTanpaRibet3, OVOIcon, RincianPesananBantal, RincianPesananCelanaPanjang,
  RincianPesananCelanaPendek, RincianPesananJaket, RincianPesananKaos, Shoopepayicon, back,
} from '../../assets';


export default function AmbilTanpaRibet3({ navigation, route }) {
  const item = route.params;
  const __renderItem = ({ item }) => {
    if (item.qty > 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{
            uri: item.image
          }} style={{
            width: 50, height: 50, marginRight: 5,
          }} />
          <Text style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 13, marginRight: 10,
          }}>X {item.qty}</Text>
          <Text style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 13,
          }}>Rp {new Intl.NumberFormat().format(item.harga_produk)}</Text>
        </View>
      )
    }
  }

  useEffect(() => {

  }, []);

  const handleBack = () => {
    navigation.navigate("HomeScreen")
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
          alignItems: 'center'
        }}
      >
        <TouchableOpacity onPress={handleBack} style={{ left: -40 }}>
          <Image style={{ height: 45, width: 45, }} source={back} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', left: -15 }}>
          <Text style={{ color: 'black', fontFamily: 'Poppins-SemiBold', fontSize: 20, textAlign: 'center' }}>
            Ambil Tanpa Ribet
          </Text>
        </View>
      </View>


      <ScrollView style={{ flex: 1 }} horizontal={false}>
        <View style={{ padding: 10, }}>

          {/* NOTIFIKASI */}
          <View style={{ padding: 10, alignItems: 'center' }}>
            <Image style={{ width: 391, height: 90 }} source={NotifikasiAmbilTanpaRibet3} />
          </View>


          {/* RINCIAN PAKAIAN */}
          <View style={{ padding: 20, }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, }}>Rincian Pakaian</Text>

            <FlatList data={item.produk} renderItem={__renderItem} numColumns={2} />
            {/* GARIS */}
            <View style={{ padding: 1, backgroundColor: 'black', width: '100%', marginTop: 10 }}></View>


            {/* TOTAL */}
            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'center', marginTop: 0 }}>
              <View>
                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, }}>Total {new Intl.NumberFormat().format(item.total_harga)}</Text>
              </View>
            </View>


            {/* PAYMENT METHOD */}
            <View style={{ padding: 10, }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 12, top: 2, }}>Payment Methods</Text>
                <Image style={{ width: 25, height: 25, left: 10 }} source={MethodIcon} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                {/* PAYMENT BANK */}
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate("BankPayment2", {
                    total: item.total_harga
                  })}>
                    <Image style={{ height: 50, width: 50, }} source={BankPayIcon} />
                  </TouchableOpacity>
                </View>

                {/* PAYMENT BANK */}
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate("OVOPayment", {
                    total: item.total_harga
                  })}>
                    <Image style={{ height: 40, width: 40, }} source={OVOIcon} />
                  </TouchableOpacity>
                </View>

                {/* PAYMENT BANK */}
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate("QrisPayment", {
                    total: item.total_harga
                  })}>
                    <Image style={{ height: 50, width: 50, top: -5 }} source={Shoopepayicon} />
                  </TouchableOpacity>
                </View>

                {/* PAYMENT BANK */}
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate("GopayPayment", {
                    total: item.total_harga
                  })}>
                    <Image style={{ height: 40, width: 40, }} source={GopayIcon} />
                  </TouchableOpacity>
                </View>

                {/* PAYMENT BANK */}
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate("CODPayment", {
                    total: item.total_harga
                  })}>
                    <Image style={{ height: 40, width: 40, }} source={CODIcon} />
                  </TouchableOpacity>
                </View>

              </View>

            </View>


            <TouchableOpacity style={{ width: '100%' }} onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
              });
            }}>
              <View
                style={{
                  backgroundColor: colors.primary,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{ color: 'white', fontFamily: 'Poppins-SemiBold' }}>
                  Selesai
                </Text>
              </View>
            </TouchableOpacity>


          </View>
        </View>
      </ScrollView>
    </View>
  );
}
