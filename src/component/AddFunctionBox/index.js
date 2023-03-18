import React,{useState} from 'react';
import { Platform, StyleSheet, View, Text, Button,Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export function AddFunctionBox({callerUserId,calleeUserId,socket}) {
    const [transferPeerConnection,setTransferPeerConnection]=useState(new RTCPeerConnection());
    const [isOnHold,setisOnHold]=useState(false);
    const [peerConnection]=useState(new RTCPeerConnection());
    const [isSpeaker,setIsSpeaker] = useState(false);
    const [isPause, setIsPause] = useState(true);
    const [isRecording,setIsRecording]=useState(false);
    const [Recording,setRecording]=useState(null);
    

useEffect(()=>{
    socket.on("holdCall",handleholdCall);
    socket.on("speaker",handleSpeaker);
    socket.on("startRecording",handleStartRecording);
    socket.on("stopRecording",handleStopRecording);

    return()=>{
    socket.off("holdCall",handleholdCall);
    socket.off("speaker",handleSpeaker);
    socket.off("startRecording",handleStartRecording);
    socket.off("stopRecording",handleStopRecording);
    };
},[]);
    socket.on('transferCall',(calleeId)=>{
      transferPeerConnection.close();
      const newPeerConnection= new RTCPeerConnection();
      setTransferPeerConnection(newPeerConnection);
    });
     const handldTransferCallPress= (calleeId)=>{
      socket.emit('transferCall',calleeId);
     }
const handleStartRecording = async ()=>{
  const recording = await MediaRecorder.startRecordingAsync();
  setRecording(recording);
  setIsRecording(true);
};
const handleStopRecording = async ()=>{
  const recording = await MediaRecorder.stopRecordingAsync();
  setRecording(recording);
  setIsRecording(false);
  socket.emit("recording",{recordingUri:recording.uri});
};

const handleStartRecordingPress =()=>{
  socket.emit("startRecording");
};

const handleStopRecordingPress =()=>{
  socket.emit("stopRecording");
};
const handleSpeaker=(isSpeaker)=>{
  setisVideo(setisSpeaker);
};
const handleholdCall=()=>{
  if(isOnHold){
    peerConnection.addTrack(audioTrack);
  }else{
    peerConnection.removeTrack(audioTrack);
  }
  setisOnHold(currentValue => !currentValue);
};
const onToggleCallHold = () => {
  socket.emit('holdcall');
};
// const onToggleRecording = () => {
//   setIsRecording(currentValue => !currentValue);
//   socket.emit("",!isMuted);
// };
const onToggleSpeaker = () => {
    setIsSpeaker(currentValue => !currentValue);
    socket.emit("speaker",!isSpeaker);
  };
    return (
     <View style={styles.buttonsContainer}>

<Pressable >
        <Ionicons name= {isPause ? "pause-circle" : 'play-circle-outline'}
        onPress={()=>{onToggleCallHold();}}
        size={40} color={'white'} />
      </Pressable>

      {isRecording ? <Pressable onPress={()=>{handleStartRecording();handleStartRecordingPress();}}>
        <MaterialIcons
        
          name='record-rec'
          size={40}
          color={'white'}
        />
      </Pressable>
      : <Pressable onPress={()=>{handleStopRecording();handleStopRecordingPress();}}>
        <MaterialIcons
        
          name='stop-circle'
          size={40}
          color={'white'}
        />
      </Pressable>}

      <Pressable onPress={()=>{handldTransferCallPress();}}>
        <MaterialIcons
          name= {'phone-forward' }
          size={40}
          color={'white'}
        />
      </Pressable>

      <Pressable onPress={()=>{onToggleSpeaker();}}
        >
        <MaterialIcons name={isSpeaker ? "speaker-wireless" : 'speaker-off'}
         size={30} color={'white'} />
      </Pressable>
    </View>
   
      );
};
  
const styles = StyleSheet.create({
    buttonsContainer: {
      backgroundColor: '#333333',
      padding: 10,
      paddingBottom: 10,
     
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
