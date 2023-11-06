import { View, Text, Button } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'
import axios from 'axios'

export default function TestEmailOTP() {
    const sendOtpEmail = async () => {
        try {
            const response = await axios.post('https://laundry.okeadmin.com/api/sendotpemail')
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    }

  return (
    <View style={{flex:1, backgroundColor:"white", }}>
      <Button onPress={sendOtpEmail} title='Send OTP'/>
    </View>
  )
}