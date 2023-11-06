import React, { useState } from 'react'
import { Alert, Image, PanResponder, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import colors from '../../utils/colors'
import { HidePass, LogoLaundry, ShowPass } from '../../assets'
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { MYAPP, RegisterURL, storeData } from '../../localstorage';

export default function SignupScreen({ navigation }) {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [eyeIconSource, setEyeIconSource] = useState(HidePass);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        setEyeIconSource(passwordVisible ? HidePass : ShowPass); // Mengubah gambar berdasarkan status passwordVisible
    };


    const [from, setForm] = useState({
        nama_lengkap: '',
        telepon: '',
        password: '',
    })

    const handleRegister = () => {
        // MEMBUAT LOGIKA JIKA USER TIDAK MEGISI SEMUA FEILD
        if ((from.nama_lengkap.length == 0) | (from.telepon.length == 0) | (from.password.length == 0) | (from.email.length == 0)) {
            showMessage({
                type: 'default',
                color: 'white',
                backgroundColor: colors.errormessage,
                message: 'Mohon untuk semua feild di isi!'
            })
            // LOGIKA JIKA NOMOR TELEPON LEBIH DARI 15 NOMOR
        } else if (from.telepon.length < 1) {
            Alert.alert("Nomor Telepon Tidak Boleh Lebih Dari 15 Nomor!");
            // LOGIKA JIKA NOMOR TELEPON KURANG DARI 10 NOMOR
        } else if (from.telepon.length < 1) {
            Alert.alert("Nomor Telepon TidaK Boleh Kurang Dari 10 Nomor!");
            // LOGIKA JIKA nama_lengkap KURAN DARI 5 KATA
        } else if (from.nama_lengkap.length < 2) {
            Alert.alert("Nama Tidak Boleh Kurang Dari 5 Huruf!");

            // JIKA TIDAK ADA YANG SALAH DI FEILD MAKA LOGIKA INI AKAN
        } else if (from.email.length < 2) {
            Alert.alert("email Tidak Boleh Kurang Dari 5 Huruf!");

            // JIKA TIDAK ADA YANG SALAH DI FEILD MAKA LOGIKA INI AKAN
        } else {
            console.log("Log Sebelum ke AXIOS : ", from);
            axios
                .post(RegisterURL, from)
                .then(res => {
                    console.log(res.data);
                    if (res.data.status == 200) {
                        showMessage({
                            type: 'success',
                            message: res.data.message
                        });
                        navigation.navigate('OTPScreen', from)
                    } else {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    }
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
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 30, }}>Sign Up</Text>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'gray' }}>Segera buat akun anda!</Text>
                    </View>

                    <View style={{ padding: 10, marginTop: 30 }}>
                        <TextInput style={{
                            color: 'black', fontSize: 12, fontFamily: 'Poppins-Regular', paddingLeft: 10, paddingRight: 10, borderRadius: 5,
                            backgroundColor: 'white', borderWidth: 1, height: 40,
                        }} placeholder='Nama...' placeholderTextColor='gray' value={from.nama_lengkap}
                            onChangeText={value => setForm({ ...from, nama_lengkap: value })}
                        />


                        <TextInput autoCapitalize='none' style={{
                            color: 'black', fontSize: 12, fontFamily: 'Poppins-Regular', paddingLeft: 10, paddingRight: 10, borderRadius: 5,
                            backgroundColor: 'white', borderWidth: 1, height: 40, marginTop: 20
                        }} placeholder='Email...' placeholderTextColor='gray'
                            value={from.email} onChangeText={value => setForm({ ...from, email: value })}
                        />

                        <TextInput style={{
                            color: 'black', fontSize: 12, fontFamily: 'Poppins-Regular', paddingLeft: 10, paddingRight: 10, borderRadius: 5,
                            backgroundColor: 'white', borderWidth: 1, height: 40, marginTop: 20
                        }} placeholder='Nomor Telepon...' placeholderTextColor='gray' keyboardType='numeric'
                            value={from.telepon} onChangeText={value => setForm({ ...from, telepon: value })}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, height: 40, borderRadius: 5, marginTop: 20 }}>
                            <TextInput style={{ flex: 1, color: 'black', fontFamily: 'Poppins-Regular', fontSize: 12, paddingLeft: 10, paddingRight: 10 }} placeholder='Password...'
                                placeholderTextColor='gray' secureTextEntry={!passwordVisible} value={from.password} onChangeText={value => setForm({ ...from, password: value })} />
                            <TouchableOpacity style={{ left: -10 }} onPress={togglePasswordVisibility}>
                                <Image style={{ height: 21, width: 21 }} source={eyeIconSource} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{ padding: 10 }}>
                            <Text style={{ textAlign: 'right', fontFamily: 'Poppins-Regular', fontSize: 12, }}>Lupa Password ?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleRegister} style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10, marginTop: 50 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'white' }}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={{ padding: 10 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 12, }}>Sudah punya akun? Sign In</Text>
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