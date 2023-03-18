import React ,{useState,useEffect} from "react";
import {View,FlatList,Text,StyleSheet,TextInput, Button,TouchableOpacity} from 'react-native';
import IncomingCallScreen from "../incomingCall";
import CallingScreen from "../CallingScreen";
import CallScreen from "../CallScreen";
import dummyContacts from '../../../assets/data/contact.json';
import { RTCPeerConnection, 
  RTCIceCandidate,
  RTCSessionDescription, 
  RTCView, 
  MediaStream,
  MediaStreamTrack,
  mediaDevices } from 'react-native-webrtc';

import io from 'socket.io-client';

const socket = io('http://localhost:8080');
const [type, setType] = useState('HOME'); 

socket.on('connect', () => {
  console.log('Connected to Socket.io server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.io server');
});


useEffect(() => {
  socket.on('Call', data => {
    const offer = data.pclocalDescription;
    const caller = data.caller;
    setType('INCOMING_CALL');
  });
  socket.on("answer",async(answer)=>{
    try{
        await pc.setRemoteDescription(answer);
        const answer=await pc.createAnswer();
        setType('ON_CALL');
    }catch(error){
        console.log(error);
    }
    socket.on("decline",async()=>{
      pc.setRemoteDescription(null);
      setType('HOME');
    })
});

  return () => {
    socket.off('Call');
    socket.off('answer');
    socket.off('decline');
  };
}, []);


  const ContactScreen=()=>{
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredContacts, setFilteredContacts] = useState(dummyContacts);  
    const [filteredHistory, setFilteredHistory] = useState(dummyContacts);  
    const [filteredGroup, setFilteredGroup] = useState(dummyContacts);  
    const [dataType,setDataType]=useState('groupCall');
    const onToggleContact = () => {
        setDataType('contact');
      };
     
     
      const onToggleHistory = () => {
        setDataType('history');
      };
      const onToggleGroupChat = () => {
        setDataType('groupChat');
      };

      //socket
      async function startVideoCall() {
        try {
          const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
          setLocalStream(stream);
          stream.getTracks().forEach((track) => pc.addTrack(track, stream));
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          pclocalDescription=pc.localDescription;
          socket.emit('call', { caller:"user 1", callee:"user 2", pclocalDescription: pclocalDescription });
          setType('CALLING');
      
        } catch (error) {
          console.log(error);
        }
      }
      
    useEffect(() => {

        const newContacts = dummyContacts.filter(contact =>
            contact.user_display_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );
        setFilteredContacts(newContacts);
      }, [searchTerm]);
      useEffect(() => {

        const history = dummyContacts.filter(contact =>
            contact.user_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );
        setFilteredHistory(history);
      }, [searchTerm]);
      useEffect(() => {

        const groupChat = dummyContacts.filter(contact =>
            contact.user_id
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );
        setFilteredGroup(groupChat);
      }, [searchTerm]);

  
    return(
      <>  
      <IncomingCallScreen/>
      <View style={styles.page}>
            <View style={styles.buttonsContainer}>
            <TouchableOpacity
         style={styles.button}
         onPress={onToggleContact}
       >
         <Text> contact </Text>
        </TouchableOpacity>
            <TouchableOpacity
         style={styles.button}
         onPress={onToggleHistory}
       >
         <Text> History </Text></TouchableOpacity>
         <TouchableOpacity
         style={styles.button}
         onPress={onToggleGroupChat}
       >
         <Text> Group Chat </Text>
        </TouchableOpacity>
        </View>
         <TextInput  value={searchTerm}
           onChangeText={setSearchTerm}
          style={styles.textinput} 
          placeholder='search .....'/>
        {dataType==='contact'&&<><FlatList  data={users} renderItem={({item})=>
            <TouchableOpacity
            style={styles.button}
            onPress={startVideoCall}
            // onPress={({}) => {// Send the call request to the Socket.io server
            //   socket.emit('call', { caller:user_id , callee: item.id });
            //   }}
          ><Text style={styles.contact}>{item.user_display_name}</Text></TouchableOpacity>}
          ItemSeparatorComponent={()=><View style={styles.seprate}/>}
        /></>}
        {dataType==='history'&&<><FlatList  data={filteredHistory} renderItem={({item})=>
          <Text style={styles.contact}>{item.user_name}</Text>}
          ItemSeparatorComponent={()=><View style={styles.seprate}/>}
        /></>}
         {dataType==='groupChat'&&<><FlatList  data={filteredGroup} renderItem={({item})=>
          <Text style={styles.contact}>{item.user_id}</Text>}
          ItemSeparatorComponent={()=><View style={styles.seprate}/>}
        /></>}
      
        </View>
      </>
    )  
 };

 switch (type) {
  case 'HOME':
    return ContactScreen();
  case 'INCOMING_CALL':
    return <IncomingCallScreen type={type} offer={offer} />;
  case 'CALLING':
   return <CallingScreen/>;
  case 'HOME':
   return <CallScreen/>;
  default:
    return null;
}
 const styles = StyleSheet.create({
    page:{
       padding:10,
    },
    contact:{
        fontSize:16,
        marginVertical:10
    },
  seprate:{
    width:'100%',
    height:1,
    backgroundColor:'#f0f0f0'
  },
  textinput:{
  backgroundColor:'#f0f0f0',
  padding:10,
  borderRadius:5,
  },
    buttonsContainer: {
      backgroundColor: '#DDDDDD',
      padding: 10,
      paddingBottom: 10,
     
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 'auto',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
      }
  });

  export default ContactScreen