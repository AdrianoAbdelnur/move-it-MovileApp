import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/users/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>HOLA Fonolaaaa</Text>
      <Home/>
      <StatusBar style="auto" backgroundColor='gray'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
