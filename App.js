import react from 'react';
import { SafeAreaView,StatusBar} from 'react-native';
import CallingScreen from './src/screen/callingScreen';
import CallScreen from './src/screen/callScreen';
import ContactScreen from './src/screen/contact';
import IncomingCallScreen from './src/screen/incomingCall';


export default function App() {
  return (
   <SafeAreaView>
       <StatusBar barStyle={'dark-content'}/>
       <ContactScreen/>
   </SafeAreaView>
  );
};

