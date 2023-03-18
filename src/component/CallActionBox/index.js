import React, {useState,useEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AddFunctionBox } from '../AddFunctionBox';

const CallActionBox = ({callMode}) => {

  const [isSpeaker,setisSpeaker] = useState(false);
  const [isVideo,setisVideo] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isState,setIsState]=useState(false);

  useEffect(()=>{
    socket.on("hangup",handleHangup);
    socket.on("mutedAudio",handleMutedAudio);
    socket.on("mutedVideo",handleMuteVideo);
    return ()=>{
      socket.off("hangup",handleHangup);
      socket.off("muteAudio",handleMutedAudio);
      socket.off("mutedVideo",handleMuteVideo);
    }
  },[]);


componentHideAndShow = () => {
    setIsState(!isState);
};

const handleHangupPress=()=>{
  socket.emit("hangup");
};
const handleHangup=()=>{
  console.warn("call hangup");
 
};

const handleMutedAudio=()=>{
  audioTrack.enabled=!audioTrack.enabled;
  setIsMicOn(currentValue => !currentValue);
}
const handleMutedAudioPress=()=>{
  socket.emit("mutedAudio");
};
const handleMuteVideo=()=>{   
  setIsCameraOn(currentValue => !currentValue);
};
const handleMutedVideoPress=()=>{
socket.emit("mutedVideo");
};


  return (
    <>
    {callMode==='call'&&isState&&<AddFunctionBox componentHideAndShow={componentHideAndShow} />}
    <View style={styles.buttonsContainer}>
    
      <Pressable onPress={componentHideAndShow} style={styles.iconButton}>
        <Ionicons name="navigate-circle" size={30} color={'white'} />
      </Pressable>

      <Pressable onPress={handleMutedVideoPress} style={styles.iconButton}>
        <MaterialIcons
          name={isCameraOn ? 'camera-off' : 'camera'}
          size={30}
          color={'white'}
        />
      </Pressable>

      <Pressable onPress={handleMutedAudioPress} style={styles.iconButton}>
        <MaterialIcons
          name={isMicOn ? 'microphone-off' : 'microphone'}
          size={30}
          color={'white'}
        />
      </Pressable>

      <Pressable onPress={() =>{handleHangupPress();}}
        style={[styles.iconButton, {backgroundColor: 'red'}]}>
        <MaterialIcons name="phone-hangup" size={30} color={'white'} />
      </Pressable>
    </View>
    </>
   
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: '#333333',
    padding: 20,
    paddingBottom: 40,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
});

export default CallActionBox;