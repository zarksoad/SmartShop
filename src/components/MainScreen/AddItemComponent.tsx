import {Pressable, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {Icon} from '@ui-kitten/components';

type NavigationCreateItemProps = NativeStackNavigationProp<
  RootStackParamList,
  'AddItemScreen'
>;

const AddItemComponent = () => {
  const navigation = useNavigation<NavigationCreateItemProps>();

  const createNewContact = () => {
    navigation.navigate('AddItemScreen');
  };
  return (
    <Pressable style={styles.button} onPress={createNewContact}>
      <Icon name="plus" style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#66b2ff',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default AddItemComponent;
