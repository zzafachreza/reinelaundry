import React, { useState } from 'react'
import { Image, Linking, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { HandPhoneLogo, LeftArrow, LogoLaundry, LogoWhatsApp, MapPointLogo, OpenLogo, ProfileLaundry, WhatsAppLogo, back } from '../../assets'
import colors from '../../utils/colors'

export default function InformasiLaundry({ navigation }) {
  const handleBack = () => {
    navigation.goBack()
  }

  const [open, setOpen] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: 'white', }}>
      <View
        style={{
          padding: 20,
          // backgroundColor: colors.primary,
          // borderBottomEndRadius: 5,
          // borderBottomStartRadius: 5,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={handleBack} style={{ left: -48 }}>
          <Image
            style={{ height: 45, width: 45, }}
            source={back}
          />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: colors.black,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 20,
              textAlign: 'center',
              top: 10,
              right: 10
            }}>
            Informasi Laundry
          </Text>
        </View>
      </View>

      <ScrollView style={{
        flex: 1,
      }} horizontal={false}>

        <View style={{ padding: 10, }}>

          {/* PROFILE LAUNDRY */}
          <View style={{ alignItems: 'center' }}>
            <Image style={{ height: 225, width: 230, }} source={ProfileLaundry} />
            <Text style={{ color: 'black', fontFamily: 'Poppins-SemiBold', fontSize: 28, textAlign: 'center', top: 10, }}>Reine Laundry</Text>
          </View>

          {/* INFORMASI LAUNDRY*/}
          <View style={{ padding: 10, marginTop: '10%' }}>
            {/* MAP POINT / ALAMAT LAUNDRY */}
            <View style={{ flexDirection: 'row', padding: 10, }}>
              <Image style={{ width: 49, height: 60, }} source={MapPointLogo} />
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, top: -3, left: 5 }}>Lokasi{'\n'}Jln. Tawakal 11 No. 10A</Text>
            </View>
            {/* NO TELEPON LAUNDRY */}
            <View style={{ flexDirection: 'row', padding: 10, }}>
              <Image style={{ width: 49, height: 60, }} source={HandPhoneLogo} />
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, top: -3, left: 5 }}>No.Telepon{'\n'}082151524161</Text>
            </View>
            {/* JAMM OPERASIONAL */}
            <View style={{ flexDirection: 'row', padding: 10, }}>
              <Image style={{ width: 49, height: 60, }} source={OpenLogo} />
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, top: -3, left: 5 }}>Jam Operasional{'\n'}07.00 -22.00</Text>
            </View>
          </View>

          <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image style={{ width: 181, height: 169, resizeMode: 'contain' }} source={LogoLaundry} />
            <View style={{
              position: 'relative',
              backgroundColor: open ? '#A5CEEB' : '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              width: 100,
              height: 100,
            }}>

              <TouchableWithoutFeedback onPress={() => {
                setOpen(!open)
              }}>
                <Image style={{ width: 80, height: 80, }} source={LogoWhatsApp} />
              </TouchableWithoutFeedback>
              {open &&

                <TouchableWithoutFeedback onPress={() => {
                  Linking.openURL('https://wa.me/6282123828206')
                }}>
                  <Text style={{
                    position: "absolute",
                    width: 130,
                    bottom: -20,
                    padding: 10,
                    fontFamily: 'Poppins-Regular',
                    color: colors.white,
                    backgroundColor: colors.primary,
                    fontSize: 10,
                    textAlign: 'center',
                    borderRadius: 10,
                    left: -50,
                  }}>WA Admin Sekarang</Text>
                </TouchableWithoutFeedback>
              }

            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}