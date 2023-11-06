import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconIlustrasiQRSIS, IconRumah, IconTukangLaundryNaikMotor, LogoWhatsApp, QrisLaundry, WhatsAppLogo } from '../../assets'
import colors from '../../utils/colors'

export default function QrisPilihSendiri2({ navigation, route }) {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <ScrollView style={{ flex: 1, padding: 10 }} >
                <View>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, }}>QRIS</Text>
                </View>

                <View style={{ alignItems: 'center', }}>
                    <TouchableOpacity>
                        <Image source={IconIlustrasiQRSIS} style={{ width: 334, height: 343, }} />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20, textAlign: 'center', }}>Pakaian Kamu Sedang Kami Bersihkan~</Text>
                </View>

                <View style={{ alignItems: 'center', }}>
                    <TouchableOpacity>
                        <Image style={{ width: 100, height: 100 }} source={LogoWhatsApp} />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 12, textAlign: 'center', }}>Jika ada pertanyaan atau kendala adna dapat juga{'\n'}menghubungi WA admin</Text>
                </View>

            </ScrollView>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={{ padding: 10, backgroundColor: colors.primary, alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 45, }} source={IconRumah} />
                </TouchableOpacity>
            </View>
        </View>
    )
}