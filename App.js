import 'react-native-gesture-handler'
import { Stacknavigators } from './src/navigations/Stacknavigators';
import { NavigationContainer } from '@react-navigation/native';
import FormProvider from './src/contexts/FormContext';
import AuthProvider from './src/contexts/AuthContext';
import PostsProvider from './src/contexts/PostsContext';
import OfferProvider from './src/contexts/OffersContext';

export default function App() {
  return (
        
   <AuthProvider>
    <FormProvider>
      <PostsProvider>
        <OfferProvider>
          <NavigationContainer>
              <Stacknavigators/>
          </NavigationContainer>
        </OfferProvider>
      </PostsProvider>
    </FormProvider>
   </AuthProvider>
       
  
  );
}
