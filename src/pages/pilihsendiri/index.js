import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CelanaDalam, KoasKaki, LeftArrow, RincianPesananBantal, RincianPesananCelanaPanjang, RincianPesananCelanaPendek, RincianPesananJaket, RincianPesananKaos, SarungBantal, back } from '../../assets';
import colors from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiURL } from '../../localstorage';
import 'intl';
import 'intl/locale-data/jsonp/en';


export default function PilihSendiri1({ navigation }) {


  const [produk, setProduk] = useState([]);

  const handleBack = () => {
    navigation.navigate("HomeScreen")
  }

  const __getProduct = () => {
    setLoading(true)
    axios.post(apiURL + 'produk').then(res => {
      console.log(res.data);
      setProduk(res.data);
    }).finally(() => {
      setLoading(false);
    })
  }
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    __getProduct();
  }, []);

  const cartUpdate = (index, type) => {

    let TMPdata = [...produk];

    if (type == 'ADD') {
      if (TMPdata[index].qty == null) {
        TMPdata[index].qty = 1;
      } else {
        TMPdata[index].qty = TMPdata[index].qty + 1;
      }

    } else {

      if (TMPdata[index].qty == null) {
        TMPdata[index].qty = 0;
      } else if (TMPdata[index].qty <= 0) {
        TMPdata[index].qty = 0;
      } else {
        TMPdata[index].qty = TMPdata[index].qty - 1;
      }
    }

    setProduk(TMPdata);
    console.log(TMPdata[index])

  }


  const __renderItem = ({ item, index }) => {
    return (
      <View style={{
        flex: 1,
        backgroundColor: item.qty > 0 && item.qty !== null ? colors.primary : '#FFFF',
        margin: 8,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        padding: 10,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          {item.qty > 0 && item.qty !== null ? <>
            <View style={{
              width: 60,
              height: 60,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{
                width: 60,
                height: 60,
                backgroundColor: '#FFFFFF',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  color: colors.primary,
                  fontSize: 50,
                  textAlign: 'center',
                  fontFamily: 'Poppins-Bold'
                }}>{item.qty}</Text>
              </View>
            </View>
          </> : <>

            <Image source={{
              uri: item.image
            }} style={{
              width: 60,
              height: 60,

            }} />
          </>}
          <View style={{
            padding: 10,
          }}>
            <TouchableOpacity onPress={() => cartUpdate(index, 'ADD')} style={{
              paddingHorizontal: 10,
              backgroundColor: item.qty > 0 && item.qty !== null ? colors.white : colors.primary,
              marginBottom: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}>
              <Text style={{
                fontSize: 20,
                color: item.qty > 0 && item.qty !== null ? colors.primary : colors.white,
              }}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => cartUpdate(index, 'MIN')} style={{
              marginTop: 1,
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: item.qty > 0 && item.qty !== null ? colors.white : colors.border,
              backgroundColor: item.qty > 0 && item.qty !== null ? colors.primary : colors.border
            }}>
              <Text style={{
                fontSize: 20,
                color: item.qty > 0 && item.qty !== null ? colors.border : colors.primary
              }}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          marginTop: 5,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            color: item.qty > 0 && item.qty !== null ? '#FFFFFF' : colors.primary,
            fontSize: 14,
            fontFamily: 'Poppins-Bold'
          }}>{item.nama_produk}</Text>
          <Text style={{
            color: item.qty > 0 && item.qty !== null ? '#FFFFFF' : colors.primary,
            fontSize: 12,
            fontFamily: 'Poppins-Regular'
          }}>Rp {new Intl.NumberFormat().format(item.harga_produk)} / pcs</Text>
        </View>
      </View >
    )
  }

  const sum = produk.reduce((accumulator, object) => {
    return accumulator + parseFloat(object.qty);
  }, 0);

  const sendServer = () => {

    console.log(sum)
    navigation.navigate('PilihSendiri3', produk)

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

      <View style={{
        flex: 1,
        padding: 10
      }}>
        {!loading && <FlatList showsVerticalScrollIndicator={false} data={produk} renderItem={__renderItem} numColumns={2} />}

        {loading && <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}><ActivityIndicator size="large" color={colors.primary} /></View>}
      </View>

      {sum > 0 && <TouchableOpacity onPress={sendServer} style={{
        padding: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
        marginBottom: 10,


      }}>
        <Text style={{
          color: 'white',
          fontFamily: 'Poppins-SemiBold',
          textAlign: 'center',
          fontSize: 15,

        }}>Pesan Sekarang!</Text>
      </TouchableOpacity>}


    </View>

  );
}
