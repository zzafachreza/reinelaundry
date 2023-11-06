import { View, Text, Image, Animated, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ButtonAmbilTanpaRibet, ButtonPilihSendiri, DefaultPorfile, IconInfoLaundry, LogoLaundry, MeProfile, Notify, NotifyInfoLaundry } from '../../assets'
import colors from '../../utils/colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../../localstorage';

export default function HomeScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);
  const scale = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState({});

  useEffect(() => {
    // Mengambil data dari local storage dan mengatur ke dalam state data
    getData('androiduser').then(response => {
      setData(response);
      console.log('Data user:', response);
      const username = response.username;
      loadProfileImageFromLocal(username); // Memanggil fungsi ini untuk mengambil gambar profil dari local storage
    });
  }, []);


  const loadProfileImageFromLocal = async (id) => {
    try {
      const profileImageData = await AsyncStorage.getItem(`profileImage_${id}`);
      if (profileImageData) {
        setProfileImage(profileImageData);
      }
    } catch (error) {
      console.error('Error loading image from local storage:', error);
    }
  };


  useEffect(() => {
    // Menambahkan delay sebelum animasi dimulai (misalnya, 2 detik atau 2000ms)
    const delayDuration = 1200;

    // Menggunakan setTimeout untuk menambahkan delay
    const delayTimeout = setTimeout(() => {
      // Memulai animasi setelah delay
      Animated.timing(scale, {
        toValue: 1,
        duration: 500, // Durasi animasi setelah delay
        useNativeDriver: false,
      }).start();
    }, delayDuration);

    // Membersihkan timeout ketika komponen dibongkar
    return () => clearTimeout(delayTimeout);
  }, []);



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <ScrollView> */}
      <View style={{ padding: 10, }}>

        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', bottom: -8 }}>
          <View>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 18, }}>Selamat Pagi,</Text>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, }}>{data.nama_lengkap}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Profile1")}>
              <View>

                <Image style={{ width: 60, height: 60, borderRadius: 20 }} source={{ uri: data.foto_user }} />

              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ padding: 5, }}>
          <View style={{ alignItems: 'center' }}>
            {/* MUNCUL ANIMASI NOTIFIKASI  */}
            {/* <Animated.View
          style={{
            transform: [{ scale }],
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Image style={{ width: 336, height: 80 }} source={Notify} />
        </Animated.View> */}
          </View>
        </View>

        <View style={{ padding: 5, top: -18 }}>
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 25 }}>Pilih Jenis Paket!</Text>
        </View>

        <View style={{ padding: 10, top: -25 }}>


          <View>
            <TouchableOpacity onPress={() => navigation.navigate("AmbilTanpaRibet")}>
              <Image style={{ width: 340, height: 138 }} source={ButtonAmbilTanpaRibet} />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 30 }}>
            <TouchableOpacity onPress={() => navigation.navigate("PilihSendiri1")}>
              <Image style={{ width: 340, height: 138 }} source={ButtonPilihSendiri} />
            </TouchableOpacity>
          </View>


        </View>

        <View>

          <View style={{ padding: 10, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <View style={{ marginTop: -10, right: -50 }}>
                <TouchableOpacity onPress={() => navigation.navigate("InformasiLaudnryScreen")}>
                  <Image style={{ width: 55, height: 48, }} source={IconInfoLaundry} />
                  <Image style={{ width: 95, height: 35, left: -40, top: -7 }} source={NotifyInfoLaundry} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </View>
      <View style={{ padding: 0, height: 122, alignItems: 'center', }}>
        <Image style={{ width: 147, height: 122, top: -115 }} source={LogoLaundry} />
      </View>
      {/* </ScrollView> */}
      <View>
      </View>
    </View>
  )
}