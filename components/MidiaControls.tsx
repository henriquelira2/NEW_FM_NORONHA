/* eslint-disable prettier/prettier */
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Linking } from 'react-native';

import { useMedia } from './MediaProvider';

const MediaControls: React.FC = () => {
  const { play, pause, isPlaying } = useMedia();
  const [modalVisible, setModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const openPlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.atdefn.FM.Noronha');
    setRatingModalVisible(false);
  };

  const weeklyProgramming = [
    { time: '8h45', program: 'Reprise do Jornal da Ilha' },
    { time: '9h', program: 'Momentos de Alegria (Pedro Ribeiro)' },
    { time: '12h', program: 'Pernambuco Esportivo (Rádio Sei)' },
    { time: '13h', program: 'Pernambuco no Rádio (Rádio Sei)' },
    { time: '14h', program: 'Balaio de Gato (Thânia Brito)' },
    { time: '19h', program: 'Jornal da Ilha (Karlilian Magalhães e Karol Vieira)' },
  ];

  const independentPrograms = [
    { day: 'Segunda-feira', time: '18h', program: 'Momentos com Cristo' },
    { day: 'Terça-feira', time: '18h', program: 'A Caminho da Luz' },
    { day: 'Quarta-feira', time: '19h30', program: 'Quarta Onda (Virgínia Anghinoni)' },
    { day: 'Quinta-feira', time: '10h30', program: 'Momento da Gestão' },
    { day: 'Quinta-feira', time: '18h', program: 'Voz que Liberta' },
    { day: 'Quinta-feira', time: '20h', program: 'Pernambuco Cultural' },
    { day: 'Sexta-feira', time: '18h', program: 'Rei Jesus' },
    { day: 'Sexta-feira', time: '19h', program: 'B do Rock (Rafael Robles)' },
    { day: 'Sexta-feira', time: '22h', program: 'Alma Leve (Elô Araújo)' },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nowPlaying} />
        <Text style={styles.live}>🔴 LIVE</Text>
      </View>
      <Text style={styles.songTitle}>Pensando em voz alta</Text>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setRatingModalVisible(true)}>
          <FontAwesome name="heart-o" size={24} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="list" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📻 Programação da Rádio</Text>
            <ScrollView style={styles.scrollContainer}>
              <Text style={styles.sectionTitle}>📅 Programação Semanal</Text>
              {weeklyProgramming.map((item, index) => (
                <Text key={index} style={styles.programItem}>
                  {item.time} - {item.program}
                </Text>
              ))}
              <Text style={styles.sectionTitle}>🎙️ Programas Independentes</Text>
              {independentPrograms.map((item, index) => (
                <Text key={index} style={styles.programItem}>
                  {item.day}, {item.time} - {item.program}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent
        visible={ratingModalVisible}
        onRequestClose={() => setRatingModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Gostando do app?</Text>
            <Text style={styles.modalText}>Nos ajude avaliando na Play Store!</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.closeButton} onPress={openPlayStore}>
                <Text style={styles.closeButtonText}>Avaliar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setRatingModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Agora não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  nowPlaying: {
    fontSize: 12,
    color: '#888',
  },
  live: {
    fontSize: 12,
    color: '#3067ff',
    fontWeight: 'bold',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  iconButton: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 50,
  },
  playButton: {
    backgroundColor: '#5a9cff',
    padding: 20,
    borderRadius: 50,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 15,
  },
  scrollContainer: {
    maxHeight: 300,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
  },
  programItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#5a9cff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    marginTop: 15,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default MediaControls;
