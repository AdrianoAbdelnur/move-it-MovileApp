import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet,} from 'react-native';
import { Home } from './src/screens/users/Home';
import { Stacknavigators } from './src/navigations/Stacknavigators';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
        <Stacknavigators/>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
    general_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
});
