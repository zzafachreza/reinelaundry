import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import colors from '../../utils/colors'
import { HidePass, LogoLaundry, ShowPass } from '../../assets';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { apiURL } from '../../localstorage';

export default function LupaPassword2({ navigation, route }) {

    const OTP = route.params.otp;
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [eyeIconSource, setEyeIconSource] = useState(HidePass);

    const [kirim, setKirim] = useState({});

    const sendServer = () => {
        console.log(kirim);
        axios.post(apiURL + 'update_password', kirim).then(res => {
            console.log(res.data);
            showMessage({
                type: 'success',
                message: 'Your password has been change !'
            })
            navigation.reset({
                index: 0,
                routes: [{ name: 'SplashScreen' }],
            });
        })
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        setEyeIconSource(passwordVisible ? HidePass : ShowPass); // Mengubah gambar berdasarkan status passwordVisible
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>

                <View style={{ padding: 20, }}>
                    <View style={{ marginTop: '10%' }}>

                        <View>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 25, textAlign: "left", }}>Lupa Password</Text>
                        </View>

                        <View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, textAlign: "left", color: '#B0B0B0' }}>Silakan ganti Password anda</Text>
                        </View>

                        <View style={{ marginTop: 50 }}>
                            <TextInput onEndEditing={x => {
                                console.log(x.nativeEvent.text);

                                if (x.nativeEvent.text != OTP) {
                                    showMessage({
                                        type: 'danger',
                                        message: 'OTP is wrong please try again !'
                                    })
                                }
                            }} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    otp: x
                                })
                            }} maxLength={4} autoFocus style={{
                                backgroundColor: "white", borderWidth: 1, textAlign: 'left', borderRadius: 10, height: 40, color: "black",
                                fontFamily: 'Poppins-Medium', fontSize: 12, paddingRight: 10, paddingLeft: 10,
                            }} placeholder='masukan kode OTP' placeholderTextColor='black' keyboardType='number-pad' />



                            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, height: 40, borderRadius: 10, marginTop: 20 }}>
                                <TextInput onChangeText={x => {
                                    setKirim({
                                        ...kirim,
                                        password: x
                                    })
                                }} style={{ flex: 1, color: 'black', fontFamily: 'Poppins-Medium', fontSize: 12, paddingLeft: 10, paddingRight: 10 }} placeholder='Konfirmasi Password baru'
                                    placeholderTextColor='black' secureTextEntry={!passwordVisible}
                                />

                                <TouchableOpacity style={{ left: -10 }} onPress={togglePasswordVisibility}>
                                    <Image style={{ height: 21, width: 21 }} source={eyeIconSource} />
                                </TouchableOpacity>
                            </View>

                        </View>


                        <View style={{ marginTop: '50%' }}>
                            <TouchableOpacity onPress={sendServer} style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10, }}>
                                <Text style={{ color: "white", fontFamily: 'Poppins-SemiBold', fontSize: 15, textAlign: "center", }}>Ganti Password</Text>
                            </TouchableOpacity>
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