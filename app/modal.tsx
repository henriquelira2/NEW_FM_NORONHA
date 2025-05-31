import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';

export default function SobreApp() {
  const [versao1Visible, setVersao1Visible] = useState(false);
  const [versao2Visible, setVersao2Visible] = useState(false);
  const router = useRouter();
  return (
    <ImageBackground
      source={require('../assets/images/Bacground-Radio.png')}
      style={styles.background}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Sobre o Aplicativo</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.description}>
            O FM NORONHA é o aplicativo que leva até você o melhor da ilha de Fernando de Noronha,
            um arquipélago paradisíaco que tem as praias mais bonitas do mundo. Com este aplicativo,
            você pode acompanhar as notícias, as músicas, as entrevistas e a agenda cultural da
            ilha.
          </Text>

          <TouchableOpacity
            onPress={() => setVersao1Visible(!versao1Visible)}
            style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Versão 2 </Text>
            <Text style={styles.subTitle}>(31/05/2025) </Text>
            <AntDesign name={versao1Visible ? 'up' : 'down'} size={20} color="black" />
          </TouchableOpacity>
          {versao1Visible && (
            <View style={styles.infoContainer}>
              <Text style={styles.role}>Administrador Geral Adjunto</Text>
              <Text style={styles.name}>Sr. Virgílio de Almeida Ignácio de Oliveira</Text>

              <Text style={styles.role}>Gerência de Comunicação</Text>
              <Text style={styles.name}>Léa Renata Melo de Medeiros</Text>

              <Text style={styles.role}>Assessor de Comunicação</Text>
              <Text style={styles.name}>Domingos Sávio de Godoy</Text>

              <Text style={styles.role}>Superintendente Administrativo, Financeiro e TI</Text>
              <Text style={styles.name}>Eliandro Rafael Torres Ferreira</Text>

              <Text style={styles.role}>Gerência de T.I</Text>
              <Text style={styles.name}>Ari Alves de Lucena</Text>

              <Text style={styles.role}>Desenvolvedor</Text>
              <Text style={styles.name}>Henrique Lira da Silva</Text>

              <Text style={styles.role}>Desenvolvedor e Analista de Dados</Text>
              <Text style={styles.name}>Raimundo Marcelo Nogueira Coimbra</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => setVersao2Visible(!versao2Visible)}
            style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Versão 1</Text>
            <Text style={styles.subTitle}>(24/10/2024) </Text>
            <AntDesign name={versao2Visible ? 'up' : 'down'} size={20} color="black" />
          </TouchableOpacity>
          {versao2Visible && (
            <View style={styles.infoContainer}>
              <Text style={styles.role}>Administradora Geral</Text>
              <Text style={styles.name}>Thallyta Figuerôa Peixoto</Text>
              <Text style={styles.role}>Gerência de Comunicação</Text>
              <Text style={styles.name}>Léa Renata Melo de Medeiros</Text>
              <Text style={styles.role}>Gerência de T.I</Text>
              <Text style={styles.name}>Ari Alves de Lucena</Text>
              <Text style={styles.role}>Desenvolvedor</Text>
              <Text style={styles.name}>Henrique Lira da Silva</Text>
              <Text style={styles.role}>Desenvolvedor e Analista de Dados</Text>
              <Text style={styles.name}>Raimundo Marcelo Nogueira Coimbra</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    marginTop: 30,
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginLeft: 100,
  },

  scrollContainer: {
    width: '100%',
    alignItems: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'justify',
    color: '#000000',
    marginBottom: 20,
  },
  sectionContainer: {
    width: '100%',
  },
  sectionHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8c5',
    padding: 10,
    borderTopStartRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  role: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  name: {
    fontSize: 14,
    color: '#555',
  },
});
