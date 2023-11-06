import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { HidePass, LogoLaundry, ShowPass } from '../../assets'
import colors from '../../utils/colors'
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { LoginURL, apiURL, storeData } from '../../localstorage';

export default function LoginPageScreen({ navigation }) {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [eyeIconSource, setEyeIconSource] = useState(HidePass);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        setEyeIconSource(passwordVisible ? HidePass : ShowPass); // Mengubah gambar berdasarkan status passwordVisible
    };

    const [from, setFrom] = useState({
        telepon: '',
        password: '',
    });

    // LOGIKA UNTUK LOGIN
    const handleLogin = () => {
        // LOGIKA MENGECEK APAKAH SEMUA FEILD SUDAH TERISI
        if ((from.telepon.length == 0) | (from.password.length == 0)) {
            showMessage({
                type: 'default',
                color: 'white',
                backgroundColor: colors.errormessage,
                message: 'Mohon untuk semua feild di isi!',
            })
            // JIKA FEILD SUDAH TERISI MAKA LOGIKA INI AKAN BERJALAN
        } else {
            console.log(from);

            axios
                .post(apiURL + 'login', from)
                .then(res => {
                    console.log(res.data);

                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    } else {
                        storeData('androiduser', res.data.data);
                        navigation.replace("HomeScreen");
                        Alert.alert("Selamat Datang!");
                    }


                    // console.log(response.data);

                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{
                    padding: 10,
                    marginTop: '10%'
                }}>
                    <View style={{ padding: 10, }}>
                        {/* JUDUL */}
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 30, }}>Sign In</Text>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'gray' }}>Silakan isi data yang sudah terdaftar</Text>
                    </View>

                    <View style={{ padding: 10, marginTop: 30 }}>


                        <TextInput style={{
                            color: 'black', fontSize: 12, fontFamily: 'Poppins-Regular', paddingLeft: 10, paddingRight: 10, borderRadius: 5,
                            backgroundColor: 'white', borderWidth: 1, height: 40, marginTop: 20
                        }} placeholder='Nomor Telepon...' placeholderTextColor='gray' keyboardType='numeric'
                            value={from.telepon} onChangeText={value => setFrom({ ...from, telepon: value })}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, height: 40, borderRadius: 5, marginTop: 20 }}>
                            <TextInput style={{ flex: 1, color: 'black', fontFamily: 'Poppins-Regular', fontSize: 12, paddingLeft: 10, paddingRight: 10 }} placeholder='Password...'
                                placeholderTextColor='gray' secureTextEntry={!passwordVisible} value={from.password}
                                onChangeText={value => setFrom({ ...from, password: value })} />

                            <TouchableOpacity style={{ left: -10 }} onPress={togglePasswordVisibility}>
                                <Image style={{ height: 21, width: 21 }} source={eyeIconSource} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate("LupaPassword")}>
                            <Text style={{ textAlign: 'right', fontFamily: 'Poppins-Regular', fontSize: 12, }}>Lupa Password ?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLogin} style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10, marginTop: 50 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'white' }}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")} style={{ padding: 10 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 12, }}>Belum punya akun? Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: '10%' }}>
                        <Image style={{ height: 190, width: 200 }} source={LogoLaundry} />
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}