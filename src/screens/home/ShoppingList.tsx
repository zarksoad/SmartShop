import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PieChart} from 'react-native-chart-kit';
import AddItemComponent from '../../components/MainScreen/AddItemComponent';

interface Product {
  name: string;
  category: string;
  purchased: boolean;
}

const ShoppingListApp = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem('products');
        if (storedProducts) {
          setAvailableProducts(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.error('Error loading products', error);
      }
    };
    loadProducts();
  }, []);

  const addProductToShoppingList = (product: Product) => {
    setProductList([...productList, {...product, purchased: false}]);
  };

  const togglePurchased = (index: number) => {
    const newList = [...productList];
    newList[index].purchased = !newList[index].purchased;
    setProductList(newList);
  };

  const removeProductFromList = (index: number) => {
    const newList = productList.filter((_, i) => i !== index);
    setProductList(newList);
  };

  const purchasedCount = productList.filter(item => item.purchased).length;
  const totalCount = productList.length;
  const purchasePercentage =
    totalCount === 0 ? 0 : (purchasedCount / totalCount) * 100;

  const chartData = [
    {name: 'Purchased', count: purchasedCount, color: 'green'},
    {name: 'Remaining', count: totalCount - purchasedCount, color: 'red'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products to Add</Text>
      <FlatList
        data={availableProducts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => addProductToShoppingList(item)}>
            <Text style={styles.productItem}>
              {item.name} - <Text style={styles.boldText}>{item.category}</Text>
            </Text>
          </TouchableOpacity>
        )}
      />

      <PieChart
        data={chartData}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: '#333',
          backgroundGradientFrom: '#444',
          backgroundGradientTo: '#555',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={'count'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
      />
      <Text style={styles.progressText}>
        Purchase Progress: {purchasePercentage.toFixed(2)}%
      </Text>

      <Text style={styles.title}>Shopping List</Text>
      <ScrollView>
        <FlatList
          data={productList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={styles.listItem}>
              <Text style={styles.productText}>
                {item.name} -{' '}
                <Text style={styles.boldText}>{item.category}</Text>
              </Text>

              <TouchableOpacity
                onPress={() => togglePurchased(index)}
                style={styles.checkbox}>
                <Text
                  style={item.purchased ? styles.checked : styles.unchecked}>
                  {item.purchased ? '✔' : '⬜'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => removeProductFromList(index)}
                style={styles.removeButton}>
                <Text style={styles.removeText}>❌</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
      <View ></View>
      <AddItemComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  productItem: {
    marginVertical: 5,
    color: 'white',
  },
  boldText: {
    fontWeight: 'bold',
  },
  progressText: {
    marginTop: 20,
    color: 'white',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#555',
  },
  productText: {
    color: 'white',
  },
  checkbox: {
    padding: 10,
  },
  checked: {
    fontSize: 18,
    color: 'green',
  },
  unchecked: {
    fontSize: 18,
    color: 'gray',
  },
  removeButton: {
    padding: 10,
  },
  removeText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ShoppingListApp;
