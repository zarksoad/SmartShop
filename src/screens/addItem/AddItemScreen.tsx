import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  name: string;
  category: string;
}

const categories = [
  'Fruits and Vegetables',
  'Dairy and Eggs',
  'Meat and Seafood',
  'Pantry and Dry Goods',
  'Snacks and Beverages',
  'Household and Personal Care',
];

const AddItemScreen = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0] || '');

  const handleAdd = async () => {
    if (name.trim()) {
      try {
        const newProduct: Product = { name, category };
        const storedProducts = await AsyncStorage.getItem('products');
        const products = storedProducts ? JSON.parse(storedProducts) : [];
        products.push(newProduct);
        await AsyncStorage.setItem('products', JSON.stringify(products));
        Alert.alert('Success', 'Product added!');
        setName('');
        setCategory(categories[0]);
      } catch (error) {
        console.error('Error saving product', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter product name"
        style={styles.input}
      />
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
      <Button title="Add Item" onPress={handleAdd} color="#FFA500" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', // Dark background color
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderColor: '#ccc', // Lighter color for borders
    color: '#fff', // White text for input field
    backgroundColor: '#444', // Dark input field background
  },
  picker: {
    marginBottom: 20,
    color: '#fff', // White text color for picker
    backgroundColor: '#444', // Dark background for the picker
  },
});

export default AddItemScreen;
