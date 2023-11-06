import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import colors from '../../utils/colors';
import { LogoLaundry } from '../../assets';

export default function EmailScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const validateEmail = async () => {
    // Validasi email (bisa menggunakan regex atau library validasi email)
    if (email.trim() === '') {
      Alert.alert('Error', 'Mohon isi alamat email.');
    } else if (!isValidEmail(email)) {
      Alert.alert('Error', 'Alamat email tidak valid.');
    } else {
      // Kirim email ke server untuk meminta kode OTP
      try {
        const response = await axios.post('https://laundry.okeadmin.com/api/sendotpemail', { email: email });
        if (response.data === 'Email sent') {
          setIsEmailSubmitted(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const verifyOTP =  async () => {
    // Kirim kode OTP ke server untuk verifikasi
    try {
      const response = await axios.post('https://laundry.okeadmin.com/api/sendotpemail', { email: email, otp: otp });
      if (response.data === 'Verified') {
      } else {
        Alert.alert('Error', 'Kode OTP tidak valid. Silakan coba lagi.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isValidEmail = (email) => {
    // Fungsi validasi alamat email dengan regex
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 10 }}>
        <View style={{ marginTop: '50%' }}>
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 25, textAlign: 'center', color: colors.primary }}>
            Verification Code
          </Text>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, textAlign: 'center', color: colors.primary, top: 5 }}>
            Masukkan Email Anda
          </Text>
        </View>

        <View style={{ marginTop: '10%' }}>
          <TextInput
            style={{
              padding: 10,
              borderRadius: 5,
              borderColor: colors.primary,
              borderWidth: 1,
              height: 40,
              paddingRight: 10,
              paddingLeft: 10,
              color: 'black',
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
            }}
            placeholder="Masukkan Email..."
            placeholderTextColor="gray"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          {isEmailSubmitted ? (
            <>
              <TextInput
                placeholder="OTP"
                value={otp}
                onChangeText={(text) => setOtp(text)}
              />
              <TouchableOpacity onPress={verifyOTP}>
                <Text>Verify</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10, marginTop: 20 }}
              onPress={validateEmail}
            >
              <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, textAlign: 'center', color: 'white' }}>
                Kirim OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ alignItems: 'center', marginTop: '40%' }}>
          <Image style={{ height: 190, width: 200 }} source={LogoLaundry} />
        </View>
      </View>
    </View>
  );
}
