import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BankPayIcon, CODIcon, GopayIcon, LeftArrow, MethodIcon, NotifikasiAmbilTanpaRibet3, OVOIcon, PaymentIcon, RincianPesananBantal, RincianPesananCelanaPanjang, RincianPesananCelanaPendek, RincianPesananJaket, RincianPesananKaos, Shoopepayicon, back } from '../../assets';
import colors from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'intl';
import 'intl/locale-data/jsonp/en';
import axios from 'axios';
import { apiURL } from '../../localstorage';
export default function PilihSendiri4({ navigation, route }) {
  const [typedText, setTypedText] = useState('');
  const [kirim, setKirim] = useState(route.params);

  const totalTransaksi = kirim.produk.reduce((accumulator, object) => {
    return accumulator + parseFloat(object.qty * object.harga_produk);
  }, 0);

  const updatePayment = (tujuan, method) => {
    axios.post(apiURL + 'transaksi_payment', {
      kode: kirim.kode,
      jenis_pembayaran: method
    }).then(res => {
      console.log(res.data)
      navigation.navigate(tujuan, {
        total: totalTransaksi,
        kode: kirim.kode
      })
    })

  }

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
          alignItems: 'center'
        }}
      >
        <TouchableOpacity onPress={handleBack} style={{ left: -70 }}>
          <Image style={{ height: 45, width: 45, }} source={back} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', left: -15 }}>
          <Text style={{ color: 'black', fontFamily: 'Poppins-SemiBold', fontSize: 20, textAlign: 'center' }}>
            Pisah Sendiri
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} horizontal={false}>


        {/* NOTIFIKASI */}
        <View style={{ padding: 10, alignItems: 'center' }}>
          <Image style={{ width: 391, height: 90 }} source={NotifikasiAmbilTanpaRibet3} />
        </View>


        {/* RINCIAN PAKAIAN */}
        <View style={{ padding: 20, }}>
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, }}>Rincian Pakaian {kirim.kode}</Text>

          <FlatList data={kirim.produk} renderItem={__renderItem} numColumns={2} />

          {/* GARIS */}
          <View style={{ padding: 1, backgroundColor: 'black', width: '100%', marginTop: 10 }}></View>


          {/* TOTAL */}
          <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'center', marginTop: 0 }}>
            <View>
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, }}>Total Rp Rp {new Intl.NumberFormat().format(totalTransaksi)}</Text>
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
                <TouchableOpacity onPress={() => updatePayment('BankPayment2', 'Transfer Via Bank')}>
                  <Image style={{ height: 50, width: 50, }} source={BankPayIcon} />
                </TouchableOpacity>
              </View>

              {/* PAYMENT BANK */}
              <View>
                <TouchableOpacity onPress={() => updatePayment('OVOPayment', 'Transfer Via OVO')}>
                  <Image style={{ height: 40, width: 40, }} source={OVOIcon} />
                </TouchableOpacity>
              </View>

              {/* PAYMENT BANK */}
              <View>
                <TouchableOpacity onPress={() => updatePayment('QrisPayment', 'QRIS')}>
                  <Image style={{ height: 50, width: 50, top: -5 }} source={Shoopepayicon} />
                </TouchableOpacity>
              </View>

              {/* PAYMENT BANK */}
              <View>
                <TouchableOpacity onPress={() => updatePayment('GopayPayment', 'Transfer Via GOPAY')}>
                  <Image style={{ height: 40, width: 40, }} source={GopayIcon} />
                </TouchableOpacity>
              </View>

              {/* PAYMENT BANK */}
              <View>
                <TouchableOpacity onPress={() => updatePayment('CODPayment', 'COD QRIS')}>
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

      </ScrollView >
    </View >
  );
}
