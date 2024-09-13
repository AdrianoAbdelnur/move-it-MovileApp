import 'react-native-gesture-handler'
import { Stacknavigators } from './src/navigations/Stacknavigators';
import { NavigationContainer } from '@react-navigation/native';
import FormProvider from './src/contexts/FormContext';
import AuthProvider from './src/contexts/AuthContext';
import PostsProvider from './src/contexts/PostsContext';
import OfferProvider from './src/contexts/OffersContext';
import { SocketProvider } from './src/contexts/SocketContext';
import { StripeProvider } from '@stripe/stripe-react-native';

const STRIPE_KEY ='pk_test_51PxlDHGJfGuwQtEZ9TGVYE4AsBiVkOwjLSmET0mpU4M8QGffPXEemdrIP3AoKDyS0yldOCdel8PyfwldRzLMuLVJ00OJiBODBz';


export default function App() {
  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
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
    </StripeProvider>      
       
  
  );
}
