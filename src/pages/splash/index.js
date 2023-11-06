import React, { useEffect } from 'react'
import { Image, View } from 'react-native'
import { SplashGIF } from '../../assets'
import { getData } from '../../localstorage';

export default function SplashScreen({navigation}) {
  useEffect(()=>{
    setTimeout(()=> {
   
     getData('androiduser').then(res=>{
       if(!res){
    navigation.replace('LoginScreen');
       }else{
    navigation.replace('HomeScreen');
       }
     })
    
    }, 2000)
   }, []);
  return (
    <View style={{flex:1, backgroundColor:'white', }}>
     <View style={{padding:10, alignItems:'center', marginTop:'10%'}}>
            <Image style={{
                height:500,
                width:500,
                }} source={SplashGIF} />
     </View>
    </View>
  )
}