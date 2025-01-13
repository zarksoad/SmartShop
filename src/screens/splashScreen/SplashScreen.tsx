import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
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
    <View style={styles.container}>
      <Image source={require('../../assets/logo.webp')} style={styles.logo} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  logo: {
    width: 100,
    height: 100,
  },
  loadingText: {
    marginTop: 20,
    color: 'white',
    fontSize: 18,
  },
});

export default SplashScreenComponent;
