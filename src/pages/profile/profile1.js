import { View, Text, TouchableOpacity, Image, ScrollView, Alert, FlatList, TouchableNativeFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../utils/colors';
import { DefaultPorfile, IconKeluar, IconLogout, KoasKaki, LeftArrow, LogoCeklis, MeProfile, RightArrow, SarungBantal, editIcon } from '../../assets';
import { MYAPP, UploadProfile, apiURL, getData, storeData } from '../../localstorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollIndicator from 'react-native-scroll-indicator';
import { IconEdit } from '../../assets/img/index2';
import axios from 'axios';



export default function Profile1({ navigation }) {
  const [data, setData] = useState({});

  const [transaksi, setTransaksi] = useState([]);



  useEffect(() => {
    getData('androiduser').then((response) => {


      axios.post(apiURL + 'get_user', {
        email: response.email
      }).then(res => {
        storeData('androiduser', res.data);
        setData(res.data)
      })

      console.log('Data User: ', response);
      axios.post(apiURL + 'transaksi', {
        fid_user: response.id
      }).then(res => {
        console.log(res.data);
        setTransaksi(res.data);
      })
      // Mengeksekusi fungsi loadProfileImageFromLocal dan mencetak hasilnya
    });

  }, []);

  const handleBack = () => {
    navigation.navigate("HomeScreen");
  };


  const handleLogout = () => {
    // Menampilkan konfirmasi popup
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => {
            // Menghapus parameter username sementara
            storeData('androiduser', null);
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            });
            Alert.alert(MYAPP, 'Berhasil Logout');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const __renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback onPress={() => navigation.navigate('TransaksiDetail', item)}>
        <View style={{
          marginVertical: 5,
          marginLeft: 30,
          marginRight: 10,
          borderRadius: 10,
          position: 'relative',
          width: 200,
          height: 100,
          padding: 10,
          backgroundColor: colors.primary
        }}>
          <Text style={{
            fontFamily: 'Poppins-Regular',
            color: colors.white,
            textAlign: 'right'
          }}>{item.tanggal}</Text>
          <View style={{
            bottom: 10,
            left: -30,
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image source={{
              uri: item.image
            }} style={{
              width: 70,
              height: 70,
            }} />
            <View style={{
              paddingLeft: 10,
            }}>
              <Text style={{
                fontFamily: 'Poppins-SemiBold',
                color: colors.white,
              }}>{item.nama_produk}</Text>
              <Text style={{
                fontFamily: 'Poppins-Regular',
                color: colors.white,
              }}>Rp. {new Intl.NumberFormat().format(item.total)}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }


  const handleEditProfile = () => {
    //NAVUGASI KE EDITPROFILE

    navigation.navigate("EditProfile", data);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <View
        style={{
          padding: 10,
          backgroundColor: colors.primary,
          borderBottomEndRadius: 5,
          borderBottomStartRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ padding: 10, }}>
          <TouchableOpacity onPress={handleBack}>
            <Image style={{ tintColor: 'white', height: 24, width: 24, }} source={LeftArrow} />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10, }}>
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'white', }}>Profile</Text>
        </View>
        <View style={{ padding: 10, }}>
          <TouchableOpacity onPress={handleLogout}>
            <Image style={{ width: 24, height: 24, tintColor: 'white' }} source={IconLogout} />
          </TouchableOpacity>
        </View>

      </View>


      <View style={{
        backgroundColor: 'white', padding: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: '20%',
        height: '100%'
      }}>
        {/* PROFILE */}
        <View style={{ padding: 10, alignItems: 'center', top: -50 }}>
          <View>

            <Image style={{ width: 150, height: 150, borderRadius: 20 }} source={{ uri: data.foto_user }} />

          </View>

          {/* NAME PROFILE */}
          <View style={{ top: 5 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>{data.nama_lengkap}</Text>
          </View>

          {/* NOMOR HP */}
          <View style={{ top: 5 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>{data.telepon}</Text>
          </View>

          {/* ALAMAT EMAIL */}
          <View style={{ top: 5 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>{data.email}</Text>
          </View>

          {/* ALAMAT RUMAH */}
          <View style={{ top: 5 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>{data.alamat}</Text>
          </View>


          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={handleEditProfile} style={{
              padding: 10, backgroundColor: colors.primary, borderRadius: 10, flexDirection: 'row',
              justifyContent: 'space-evenly', width: '50%'
            }}>
              <Image style={{ width: 24, height: 24, tintColor: 'white', }} source={editIcon} />
              <Text style={{ color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 15, }}>Edit Profile</Text>
            </TouchableOpacity>

          </View>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, marginTop: 10 }}>History</Text>


          <FlatList data={transaksi} renderItem={__renderItem} horizontal />
          {/* See More */}
          <TouchableNativeFeedback onPress={() => navigation.navigate('Transaksi')}>
            <View style={{ alignItems: 'flex-end', top: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ fontFamily: 'Poppins-Regular', color: colors.primary, fontSize: 12, }}>See More</Text>
                <Image style={{ width: 24, height: 24, tintColor: colors.primary }} source={RightArrow} />
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>


      </View>

    </View>
  );
}
