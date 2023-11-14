import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, FlatList, TouchableNativeFeedback, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../utils/colors';
import { DefaultPorfile, IconKeluar, IconLogout, KoasKaki, LeftArrow, LogoCeklis, MeProfile, RightArrow, SarungBantal, editIcon } from '../../assets';
import { MYAPP, UploadProfile, apiURL, getData, storeData } from '../../localstorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollIndicator from 'react-native-scroll-indicator';
import { IconEdit } from '../../assets/img/index2';
import axios from 'axios';

const MydataList = ({ label, value }) => {
    return (
        <View style={{
            flexDirection: 'row'
        }}>
            <Text style={{
                flex: 1,
                fontFamily: 'Poppins-SemiBold',
                color: colors.black,
                fontSize: 14,
            }}>{label}</Text>
            <Text style={{
                fontFamily: 'Poppins-Regular',
                color: colors.black,
                fontSize: 14,
            }}>{value}</Text>
        </View>
    )
}
export default function TransaksiDetail({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post(apiURL + 'transaksi_detail', {
            kode: item.kode
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }, []);

    const __renderItem = ({ item }) => {

        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{
                    uri: item.image
                }} style={{
                    width: 50, height: 50, marginRight: 5,
                }} />
                <Text style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 13, marginRight: 10,
                }}>X {item.qty}</Text>
                <Text style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 13,
                }}>Rp {new Intl.NumberFormat().format(item.harga)}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#FFFFFD'
        }}>
            {/* header */}
            <View style={{
                padding: 10,
                flexDirection: 'row',
                backgroundColor: colors.primary,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ tintColor: 'white', height: 24, width: 24, }} source={LeftArrow} />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    fontFamily: 'Poppins-SemiBold',
                    color: colors.white,
                    fontSize: 20,
                    textAlign: 'center'
                }}>Detail Transaksi</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10, }}>
                <MydataList label="No. Transaksi" value={item.kode} />
                <MydataList label="Tanggal" value={item.tanggal + ' ' + item.jam + 'WIB'} />
                <MydataList label="Paket Laundry" value={item.tipe} />
                <MydataList label="Jenis Pembayaran" value={item.jenis_pembayaran} />
                <MydataList label="Jenis Transaksi" value={item.jenis} />
                <View style={{
                    marginVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border
                }} />
                <FlatList data={data} renderItem={__renderItem} numColumns={2} />

                <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'center', marginTop: 0 }}>
                    <View>
                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, }}>Total Rp Rp {new Intl.NumberFormat().format(item.total)}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})