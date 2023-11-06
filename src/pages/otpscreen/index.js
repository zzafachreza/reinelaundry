import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, BackHandler, Image } from 'react-native';
import colors from '../../utils/colors';
import { LogoLaundry } from '../../assets';
import axios from 'axios';
import { RegisterURL, apiURL, storeData } from '../../localstorage';
import { showMessage } from 'react-native-flash-message';

export default function OtpScreen({ navigation, route }) {
  const item = route.params;
  const [otp, setOtp] = useState(['', '', '', '']); // Membuat state untuk kode OTP
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]; // Menggunakan useRef

  // Handle peristiwa saat tombol "Kembali" ditekan
  const handleBackButton = () => {
    for (let i = otp.length - 1; i >= 0; i--) {
      if (otp[i] !== '') {
        const newOtp = [...otp];
        newOtp[i] = '';
        setOtp(newOtp);
        // Fokus ke TextInput sebelumnya (jika ada)
        if (i > 0) {
          inputRefs[i - 1].current.focus();
        }
        return true; // Mencegah tindakan bawaan tombol "Kembali"
      }
    }
    return false; // Biarkan tombol "Kembali" berperilaku seperti biasa jika tidak ada karakter yang tersisa
  };

  // Tambahkan pendengar peristiwa tombol "Kembali" saat komponen dipasang
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    // Hapus pendengar saat komponen dibongkar
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Fokus ke TextInput berikutnya (jika ada)
    if (index < otp.length - 1 && text.length > 0) {
      inputRefs[index + 1].current.focus();
    } else if (index > 0 && text.length === 0) {
      // Fokus ke TextInput sebelumnya saat karakter dihapus
      inputRefs[index - 1].current.focus();
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 10 }}>
        <View style={{ marginTop: '50%' }}>
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 25, textAlign: 'center', color: colors.primary }}>
            Verification Code
          </Text>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, textAlign: 'center', color: colors.primary, top: 10 }}>
            Masukkan kode yang kami{'\n'}kirim ke Email <Text style={{
              fontFamily: 'Poppins-SemiBold',
              color: 'black'
            }}>{item.email}</Text>
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '8%' }}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={{
                borderWidth: 2,
                borderColor: colors.primary,
                borderRadius: 5,
                width: 50,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 15,
                textAlign: 'center',
              }}
              onChangeText={(text) => handleOtpChange(text, index)}
              value={value}
              maxLength={1}
              keyboardType="numeric"
              ref={inputRefs[index]} // Menggunakan useRef
            />
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={() => {

            axios.post(apiURL + 'validasi_otp', {
              email: item.email,
              otp: otp.join("")
            }).then(res => {
              console.log(res.data);

              if (res.data.status == 200) {
                showMessage({
                  type: 'success',
                  message: res.data.message
                });
                navigation.navigate('loginPageScreen')

              } else {
                showMessage({
                  type: 'danger',
                  message: res.data.message
                })
              }
            })


          }} style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, textAlign: 'center', color: 'white' }}>Verify Now</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginTop: '40%' }}>
          <Image style={{ height: 190, width: 200 }} source={LogoLaundry} />
        </View>
      </View>
    </View>
  );
}
