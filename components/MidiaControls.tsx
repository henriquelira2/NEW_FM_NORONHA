/* eslint-disable prettier/prettier */
import { Ionicons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Animated,
  Linking,
  PanResponder,
} from 'react-native';

import { useMedia } from './MediaProvider';

const MediaControls: React.FC = () => {
  const { play, pause, isPlaying } = useMedia();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSocial, setModalVisibleSocial] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;

  const [liveText, setLiveText] = useState('');

  useEffect(() => {
    const dayOfWeek = new Date().getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setLiveText('🟡 Conteúdo pré-gravado');
    } else {
      setLiveText('🔴 Transmissão ao vivo');
    }
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 0;
      },
      onPanResponderMove: Animated.event([null, { dy: translateY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(translateY, {
            toValue: 500,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setModalVisibleSocial(false);
            translateY.setValue(0);
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (modalVisible || modalVisibleSocial || ratingModalVisible) {
      NavigationBar.setVisibilityAsync('hidden');
    }
  }, [modalVisible, modalVisibleSocial, ratingModalVisible]);

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

  const socialButtons = [
    {
      name: 'logo-facebook',
      color: '#3b5998',
      type: 'ionicons',
      url: 'https://www.facebook.com/tvgolfinho/',
    },
    {
      name: 'logo-whatsapp',
      color: '#25d366',
      type: 'ionicons',
      url: 'https://wa.me/5581994883168',
    },
    {
      name: 'x-twitter',
      color: '#1da1f2',
      type: 'FontAwesome6',
      url: 'https://x.com/TvGolfinhoNoron?t=ofIpMIGN-BkabqsFsFAR6Q&s=08',
    },
    {
      name: 'logo-instagram',
      color: '#C13584',
      type: 'ionicons',
      url: 'https://www.instagram.com/sistemagolfinho.noronha/',
    },
    {
      name: 'logo-youtube',
      color: '#da0c0c',
      type: 'ionicons',
      url: 'https://www.youtube.com/c/SistemaGolfinhodeComunica%C3%A7%C3%A3o',
    },
    {
      name: 'spotify',
      color: '#1DB954',
      type: 'fontawesome',
      url: 'https://open.spotify.com/show/22X6bcFzCGPVh9HHDWr8FK?si=BxVk1rlhSteCWilDOLwdmA',
    },
  ];

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
        <Text style={styles.live}>{liveText}</Text>
      </View>
      <Text style={styles.songTitle}>Pensando em voz alta</Text>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setRatingModalVisible(true)}>
          <FontAwesome name="heart-o" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisibleSocial(true)}>
          <Ionicons name="share-social" size={24} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="list" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/modal')}>
          <Ionicons name="information-sharp" size={24} color="#333" />
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

      <Modal
        visible={modalVisibleSocial}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisibleSocial(false)}>
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[styles.modalContainerSocial, { transform: [{ translateY }] }]}
            {...panResponder.panHandlers}>
            <View style={styles.dragIndicator} />

            <View style={styles.socialGrid}>
              {socialButtons.map((button, index) => (
                <View key={index} style={styles.socialItem}>
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: button.color }]}
                    onPress={() => {
                      Linking.openURL(button.url);
                      setModalVisibleSocial(false);
                    }}>
                    {button.type === 'ionicons' ? (
                      <Ionicons name={button.name as any} size={30} color="white" />
                    ) : button.type === 'FontAwesome6' ? (
                      <FontAwesome6 name={button.name} size={30} color="white" />
                    ) : (
                      <FontAwesome name={button.name as any} size={30} color="white" />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.socialButtonText}>
                    {button.name.replace('logo-', '').replace('x-', '').charAt(0).toUpperCase() +
                      button.name.replace('logo-', '').replace('x-', '').slice(1)}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
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
    paddingBottom: 5,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainerSocial: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    width: '100%',
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  socialItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  socialButtonText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  cancelButtonSocial: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default MediaControls;
