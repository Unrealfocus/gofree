const Login = () => {
    const [callerId] = useState(
        Math.floor((Math.random() * 5) + 1)
      );
      
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.top}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View
              style={styles.keypad}>
              <Text
                style={styles.keypadText}>
                Your Caller ID
              </Text>
              <View
                style={styles.keypadText1}>
                <Text
                  style={styles.callView}>
                  {callerId}
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  setType('OUTGOING_CALL');
                }}
                style={styles.keypad2}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                  }}>
                  login
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };

  const styles = StyleSheet.create({
  top:{
    flex: 1,
    backgroundColor: '#050A0E',
    justifyContent: 'center',
    paddingHorizontal: 42,
  },
  keypad:{
    padding: 35,
    backgroundColor: '#1A1C22',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  keypadText:{
    fontSize: 18,
    color: '#D0D4DD',
  },
  keypadText1:{
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  callView:{
    fontSize: 32,
    color: '#ffff',
    letterSpacing: 6,
  },
  callView1:{
    backgroundColor: '#1A1C22',
    padding: 40,
    marginTop: 25,
     justifyContent: 'center',
    borderRadius: 14,
  },
  keypad2:{
    height: 50,
    backgroundColor: '#5568FE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 16,
  }
});

export default Login;