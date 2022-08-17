import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeee4",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logo:{width: "100%", height: 200, alignSelf: 'center'},
  title:{fontSize: 24, fontWeight: 'bold', letterSpacing:1, textAlign:'center', marginVertical: 15}
  ,input:{backgroundColor: "#eee", padding: 15, fontSize: 18, marginTop: 7, borderRadius: 5, borderWidth: .7}
})


export default function App() {
  const [cep,setCep] = useState('');
  const [Logradouro,setLogradouro] = useState('');
  const [Complemento,setComplemento] = useState('');
  const [Bairro,setBairro] = useState('');
  const [Localidade,setLocalidade] = useState('');
  const [UF,setUF] = useState('');

  async function callCep(cep){
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    let req = await fetch(url);
    let res = await req.json();

    setBairro(res.bairro);
    setLocalidade(res.localidade);
    setComplemento(res.complemento);
    setLogradouro(res.logradouro);
    setUF(res.uf);
  }

  return (
    <View style={style.container}>
      <Text style={style.title}> Buscamos endereços apartir do CEP</Text>
      <TextInput style={style.input} placeholder='CEP: 00000-000' 
      onChangeText={text =>{
        if(text.length == 8){
          callCep(text);
        }
      }}
      keyboardType='number-pad'></TextInput>
      <TextInput style={style.input} value={Logradouro} placeholder='Logradouro'></TextInput>
      <TextInput style={style.input} value={Complemento} placeholder='Complemento'></TextInput>
      <TextInput style={style.input} value={Bairro} placeholder='Bairro'></TextInput>
      <TextInput style={style.input} value={Localidade} placeholder='Cidade'></TextInput>
      <TextInput style={style.input} value={UF} placeholder='Estado'></TextInput>
      <StatusBar style="auto" />
    </View>
  );
}
