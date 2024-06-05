import 'react-native-gesture-handler'
import { Stacknavigators } from './src/navigations/Stacknavigators';
import { NavigationContainer } from '@react-navigation/native';
import FormUserProvider from './src/contexts/FormUserContext';
import AuthProvider from './src/contexts/AuthContext';
import PostsProvider from './src/contexts/PostsContext';
import OfferProvider from './src/contexts/OffersContext';

export default function App() {
  return (
        
   <AuthProvider>
    <FormUserProvider>
      <PostsProvider>
        <OfferProvider>
          <NavigationContainer>
              <Stacknavigators/>
          </NavigationContainer>
        </OfferProvider>
      </PostsProvider>
    </FormUserProvider>
   </AuthProvider>
       
  
  );
}
