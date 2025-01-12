import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type NavigationMainScreen = NativeStackNavigationProp<
  RootStackParamList,
  'MainScreen'
>;

const SplashScreenComponent: React.FC = () => {
  const navigation = useNavigation<NavigationMainScreen>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainScreen');
    }, 3000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../assets/logo.webp')}
        style={{width: 100, height: 100}}
      />
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreenComponent;
