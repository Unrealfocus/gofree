import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8080');

const IncomingCallScreen = ({offer}) => {

 async function processAccept(offer){
    try{
        await pc.setRemoteDescription(offer);
        const answer=await pc.createAnswer();
        socket.emit("answer",answer);
    }catch(error){
        console.log(error);
    }
}
async function processDecline(){
 socket.emit('decline');
  }
socket.on("candidate",async(candidate)=>{
    try{
        await pc.addIceCandidate(candidate);
    }catch(error){
        console.log(error);
    }
});
socket.on("bye",()=>{
   endcall();
});

pc.onIceCandidate=(e)=>{
  if(e.candidate){
      sendMessage({candidate:e.candidate});
  }
};

pc.onNegotiationNeeded=async()=>{
  try{
      await pc.setLocalDescription(await pc.createOffer());
      sendMessage({ sedp: pc.localDescription});
  }catch(error){
      console.log(error);
  }
};

pc.onTrack=(e)=>{
  if(e.stream && e.streams[0]){
      setRemoteStream(e.streams[0]);
  }
};


      useEffect(()=>{
          const handleIncomingCall = (callerUserId)=>{
              showIncomingCallNotification(callerUserId);
          };
           socket.on("call",handleIncomingCall);
           return()=>{
              socket.off("call",handleIncomingCall);
           };
      },[]);
  
 const showIncomingCallNotification=(callerUserId)=>{
 return (
    <View style={styles.page}>
      <Text style={styles.name}>{callerUserId}</Text>
      <Text style={styles.phoneNumber}>Gofree App video...</Text>

      <View style={[styles.row, {marginTop: 'auto'}]}>
       
      </View>

      <View style={styles.row}>
        {/* Decline Button */}
        <Pressable  style={styles.iconContainer}
        onPress={() => {
          processDecline();
          setType('HOME');
        }}
        >
          <View style={styles.iconButtonContainer}>
            <Feather name="x" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </Pressable>

        {/* Accept Button */}
        <Pressable  style={styles.iconContainer}
         onPress={() => {
          processAccept();
          setType('ON_CALL');
        }}
     
          >
          <View
            style={[styles.iconButtonContainer, {backgroundColor: '#2e7bff'}]}>
            <Feather name="check" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Accept</Text>
        </Pressable>
      </View>
   </View>
  );
};
};


const styles = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: '#7b4e80',
      },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 100,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: 'white',
  },
  bg: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 50,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconText: {
    color: 'white',
    marginTop: 10,
  },
  iconButtonContainer: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },
});

export default IncomingCallScreen;


