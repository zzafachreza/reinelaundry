import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import colors from '../../utils/colors'
import { LogoLaundry } from '../../assets'
import { showMessage } from 'react-native-flash-message'
import axios from 'axios'
import { apiURL } from '../../localstorage'

export default function LupaPassword({ navigation }) {
    // BERIKAN LOGIKA KAMU DI SINI (BY FADHLAN)

    const sendOTP = () => {


        if (email.length > 0) {
            console.log(email);
            axios.post(apiURL + 'lupa_password', {
                email: email
            }).then(res => {

                navigation.navigate('LupaPassword2', {
                    otp: res.data
                })

            })
        } else {
            showMessage({
                type: 'danger',
                message: 'Please input your email for send otp code'
            })
        }

    }

    const [email, setEmail] = useState('')

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>

                <View style={{ padding: 20, }}>
                    <View style={{ marginTop: '10%' }}>

                        <View>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 25, textAlign: "left", }}>Lupa Password</Text>
                        </View>

                        <View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, textAlign: "left", color: '#B0B0B0' }}>Silakan isi data yang sudah terdaftar</Text>
                        </View>

                        <View style={{ marginTop: 50 }}>
                            <TextInput autoCapitalize='none' onChangeText={x => setEmail(x)} value={email} style={{
                                backgroundColor: "white", borderWidth: 1, borderRadius: 10, height: 40, color: "black",
                                fontFamily: 'Poppins-Medium', fontSize: 12, paddingRight: 10, paddingLeft: 10,
                            }} placeholder='Email' placeholderTextColor='black' />
                        </View>


                        <View style={{ marginTop: '50%' }}>
                            <TouchableOpacity onPress={sendOTP} style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10, }}>
                                <Text style={{ color: "white", fontFamily: 'Poppins-SemiBold', fontSize: 15, textAlign: "center", }}>Kirim Kode OTP</Text>
                            </TouchableOpacity>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#b0b0b0', top: 5, }}>
                                Silakan periksa apakah kode OTP anda sudah Masuk
                            </Text>
                        </View>

                        <View style={{ alignItems: "center", marginTop: '30%' }}>
                            <Image style={{ width: 221, height: 173 }} source={LogoLaundry} />
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}