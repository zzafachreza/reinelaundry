import { View, Text, TouchableOpacity, Image, ScrollView, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../utils/colors';
import { DefaultPorfile, IconKeluar, IconLogout, LeftArrow, LogoCeklis, MeProfile, TombolLogout } from '../../assets';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MYAPP, UploadProfile, apiURL, editProfile, getData, storeData } from '../../localstorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import axios from 'axios';

export default function EditProfile({ navigation, route }) {
  const [data, setData] = useState(route.params);


  useEffect(() => {
    axios.post(apiURL + 'get_user', {
      email: route.params.email
    }).then(res => {
      setData(res.data)
    })
  }, [])


  const handleUploadPhoto = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response.assets[0].type);

      if (response.didCancel) {
        alert('Tidak Memilih Gambar!');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Kamera tidak tersedia di perangkat ini');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Izin tidak diberikan');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      } else {

        setData({
          ...data,
          newfoto_user: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
        })
      }




    });
  };

  const handleBack = () => {
    navigation.navigate("Profile1");
  };


  // ...

  const handleSaveChanges = () => {
    // console.log(data)
    axios.post(apiURL + 'update_profile', data).then(res => {
      storeData('androiduser', res.data.data);

      navigation.reset({
        index: 0,
        routes: [{ name: 'SplashScreen' }],
      });
    })
  };

  // ...

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'white', }}>Edit Profile</Text>
        </View>
        <View style={{ padding: 10, }}>
          <TouchableOpacity>
            <Image style={{ width: 24, height: 24, tintColor: colors.primary }} source={IconLogout} />
          </TouchableOpacity>
        </View>

      </View>

      <ScrollView>



        <View style={{ padding: 10, marginTop: '20%', height: '100%', }}>
          {/* PROFILE */}
          <View style={{ padding: 10, top: -50 }}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={handleUploadPhoto}>

                <Image style={{ width: 150, height: 150, borderRadius: 20 }} source={{ uri: data.newfoto_user == null ? data.foto_user : data.newfoto_user }} />

              </TouchableOpacity>
            </View>

            {/* NAME PROFILE */}
            <View style={{ marginTop: 20 }}>
              <TextInput placeholder='Enter your name' style={{
                padding: 10, backgroundColor: '#ececec', borderWidth: 1, borderRadius: 10, height: 40,
                color: 'black', fontFamily: 'Poppins-Regular', fontSize: 12, paddingRight: 10, paddingLeft: 10,
              }}
                value={data.nama_lengkap}
                onChangeText={x => {
                  setData({
                    ...data,
                    nama_lengkap: x
                  })
                }}
              />
            </View>

            {/* NOMOR HP */}
            <View style={{ marginTop: 20 }}>
              <TextInput placeholder='Enter your phone number' style={{
                padding: 10, backgroundColor: '#ececec', borderWidth: 1, borderRadius: 10, height: 40,
                color: 'black', fontFamily: 'Poppins-Regular', fontSize: 12, paddingRight: 10, paddingLeft: 10,
              }}
                value={data.telepon}
                onChangeText={x => {
                  setData({
                    ...data,
                    telepon: x
                  })
                }}
              />
            </View>

            {/* ALAMAT RUMAH */}
            <View style={{ marginTop: 20 }}>
              <TextInput placeholder='Enter your address' style={{
                padding: 10, backgroundColor: '#ececec', borderWidth: 1, borderRadius: 10, height: 40,
                color: 'black', fontFamily: 'Poppins-Regular', fontSize: 12, paddingRight: 10, paddingLeft: 10,
              }}
                value={data.alamat}
                onChangeText={x => {
                  setData({
                    ...data,
                    alamat: x
                  })
                }}
              />
            </View>

            {/* PASSWORD */}
            <View style={{ marginTop: 20 }}>
              <TextInput placeholder='If you will not change your password, please empty this field' style={{
                padding: 10, backgroundColor: '#ececec', borderWidth: 1, borderRadius: 10, height: 40,
                color: 'black', fontFamily: 'Poppins-Regular', fontSize: 12, paddingRight: 10, paddingLeft: 10,
              }}

                onChangeText={x => {
                  setData({
                    ...data,
                    newpassword: x
                  })
                }}
              />
            </View>



          </View>

          <View style={{ marginTop: '-10%' }}>
            <TouchableOpacity onPress={handleSaveChanges} style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10, }}>
              <Text style={{ color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 15, textAlign: 'center', }}>Simpan Perubahan</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </View>
  );
}
