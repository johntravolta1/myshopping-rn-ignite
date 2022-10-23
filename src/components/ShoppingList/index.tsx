import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';
import firestore from '@react-native-firebase/firestore'

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(()=> {
    const subscribe = firestore().collection('products')
    .orderBy('quantity')
    .onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as ProductProps[];

      setProducts(data)
    })

    return () => subscribe()
  }, [])

  // useEffect(() => {
  //   firestore().collection('products').doc('9SM2CVu3JyFEFdkTPAGr').get().then(res => console.log({id: res.id, ...res.data()}))
  // },[])

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
