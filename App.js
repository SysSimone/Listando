import React from 'react';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ListItem from './components/ListItem';

import results from './results';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(results); // 
//state especifico para modificar o FlatList, pegando  resultando e passando para a variavel dianamica
  
useEffect(() => {
    if (searchText === '') {  //se não tem nada ou seja search text vazio
      setList(results);
    } else {
      setList(
        results.filter( //filtro em um array
          (item) => //funcao para receber o dado
            item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
              //mesmo se o usuario colocar letra maiuscula ou minuscula, uso essa funcao toLowerCase, na busca ela chamara todos.
        )
      );
    }
  }, [searchText]);

  const handleOrderClick = () => {
    let newList = [...results]; //criando uma copia da variavel original

    //simplificando o ifelse
    newList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    setList(newList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          style={styles.input}
          placeholder="Pesquise uma pessoa"
          placeholderTextColor="#888"
          value={searchText} //salva na state
          onChangeText={(t) => setSearchText(t)} //mudar o texto e salvar na state searchText
        />
        
        <TouchableOpacity onPress={handleOrderClick} style={styles.orderButton}>
        

            <MaterialCommunityIcons
            name="order-alphabetical-ascending"
            size={32}
            color="#888"
          />
        </TouchableOpacity>
      </View>


         <FlatList
        data={list} // são as informações que estão na variavel results que é um array, então tenho que transformar essa variavel em dinamico usando o state
        style={styles.list}
        renderItem={({ item }) => <ListItem data={item} />}
        keyExtractor={(item) => item.id}
        
      />
    

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
  },
  input: {
    flex: 1,
    height: 50,

    backgroundColor: '#ffff',
    margin: 50,
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#FFFFFF',
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderButton: {
    width: 32,
    marginRight: 30,
  },
  list: {
    flex: 1,
  },
});

export default App;
