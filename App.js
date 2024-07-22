import 'react-native-gesture-handler'
import { Stacknavigators } from './src/navigations/Stacknavigators';
import { NavigationContainer } from '@react-navigation/native';
import FormProvider from './src/contexts/FormContext';
import AuthProvider from './src/contexts/AuthContext';
import PostsProvider from './src/contexts/PostsContext';
import OfferProvider from './src/contexts/OffersContext';
import { SocketProvider } from './src/contexts/SocketContext';

export default function App() {
  return (
        
  <FormProvider>
    <AuthProvider>
      <PostsProvider>
        <SocketProvider>
          <OfferProvider>
            <NavigationContainer>
                <Stacknavigators/>
            </NavigationContainer>
          </OfferProvider>
        </SocketProvider>
      </PostsProvider>
    </AuthProvider>
  </FormProvider>
       
  
  );
}
