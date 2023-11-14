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
export default function Transaksi({ navigation, route }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        getData('androiduser').then(uu => {
            axios.post(apiURL + 'transaksi_all', {
                fid_user: uu.id
            }).then(res => {
                console.log(res.data);
                setData(res.data)
            })
        })
    }, []);

    const __renderItem = ({ item }) => {

        return (
            <TouchableNativeFeedback onPress={() => navigation.navigate('TransaksiDetail', item)}>
                <View style={{
                    padding: 10,
                    borderWidth: 1,
                    margin: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    borderColor: colors.border
                }}>

                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins-Regular',
                            fontSize: 15,
                        }}>{item.kode}</Text>
                        <Text style={{
                            fontFamily: 'Poppins-Regular',
                            fontSize: 15,
                        }}>{item.tanggal}</Text>
                        <Text style={{
                            fontFamily: 'Poppins-Bold',
                            color: colors.primary,
                            fontSize: 15,
                        }}>{item.tipe}</Text>
                        <Text style={{
                            fontFamily: 'Poppins-Light',
                            color: colors.primary,
                            fontSize: 15,
                        }}>{item.jenis}</Text>

                    </View>
                    <View>
                        <Text style={{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 15,
                            textAlign: 'right'
                        }}>Rp {new Intl.NumberFormat().format(item.total)}</Text>
                        <Text style={{
                            fontFamily: 'Poppins-Light',
                            color: colors.secondary,
                            fontSize: 15,
                        }}>{item.jenis_pembayaran}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
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
                }}>Semua Transaksi</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10, }}>

                <FlatList data={data} renderItem={__renderItem} />


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})