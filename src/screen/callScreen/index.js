import React, {useState} from 'react';
import { View, Text,StyleSheet,Pressable,ImageBackground } from "react-native";
import CallActionBox from '../../component/CallActionBox';

const CallScreen=()=>{

  
 return(
     <View style={styles.page}>
        <View style={styles.cameraPreview}>
        <Text style={styles.name}>kefas</Text>
        <Text style={styles.phoneNumber}>0897t5t</Text>
      </View>
      
      <CallActionBox callMode='call' />
    </View>
    )
}
   
const styles = StyleSheet.create({
    page: {
      height: '100%',
      backgroundColor: '#7b4e80',
    },
    cameraPreview: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 10,
      paddingHorizontal: 10,
    },
    localVideo: {
      width: 100,
      height: 150,
      backgroundColor: '#ffff6e',
  
      borderRadius: 10,
  
      position: 'absolute',
      right: 10,
      top: 100,
    },
    remoteVideo: {
      backgroundColor: '#7b4e80',
      borderRadius: 10,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 100,
    },
    name: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      marginTop: 50,
      marginBottom: 15,
    },
    phoneNumber: {
      fontSize: 20,
      color: 'white',
    },
    backButton: {
      position: 'absolute',
      top: 50,
      left: 10,
      zIndex: 10,
    },
  });
  
    

export default CallScreen