import { Ionicons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
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
  ImageBackground,
  Image,
} from 'react-native';

import { useMedia } from './MediaProvider';

import {
  INDEPENDENT_PROGRAMS,
  PLAY_STORE_URL,
  SOCIAL_BUTTONS,
  WEEKLY_PROGRAMMING,
} from '~/constants/radio';
import type { SocialButton } from '~/constants/radio';
import { theme } from '~/constants/theme';

type MediaControlsProps = {
  compact?: boolean;
};

function SocialIcon({ button }: { button: SocialButton }) {
  if (button.iconSet === 'ionicons') {
    return <Ionicons name={button.iconName} size={30} color="white" />;
  }

  if (button.iconSet === 'fontawesome6') {
    return <FontAwesome6 name={button.iconName} size={30} color="white" />;
  }

  return <FontAwesome name={button.iconName} size={30} color="white" />;
}

function ProgramRow({ title, meta }: { title: string; meta: string }) {
  return (
    <View style={styles.programRow}>
      <Text style={styles.programTime}>{meta}</Text>
      <Text selectable style={styles.programTitle}>
        {title}
      </Text>
    </View>
  );
}

const MediaControls: React.FC<MediaControlsProps> = ({ compact = false }) => {
  const { play, pause, isPlaying, isLoading, statusMessage } = useMedia();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSocial, setModalVisibleSocial] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;

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

  const togglePlayPause = () => {
    if (isLoading) {
      return;
    }

    if (isPlaying) {
      pause().catch(() => undefined);
    } else {
      play().catch(() => undefined);
    }
  };

  const openUrl = async (url: string) => {
    try {
      const canOpenUrl = await Linking.canOpenURL(url);

      if (canOpenUrl) {
        await Linking.openURL(url);
      }
    } catch {
      // Link failures should not interrupt playback controls.
    }
  };

  const openPlayStore = async () => {
    await openUrl(PLAY_STORE_URL);
    setRatingModalVisible(false);
  };

  return (
    <View style={[styles.card, compact && styles.compactCard]}>
      <Text style={styles.overline}>PLAYER PRINCIPAL</Text>
      <Text selectable style={[styles.songTitle, compact && styles.compactSongTitle]}>
        {statusMessage ? 'Conexão instável' : 'Noronha ao vivo'}
      </Text>
      {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}

      <View style={styles.controls}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setRatingModalVisible(true)}>
          <FontAwesome name="heart-o" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisibleSocial(true)}>
          <Ionicons name="share-social" size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isLoading}
          style={[
            styles.playButton,
            compact && styles.compactPlayButton,
            isLoading && styles.playButtonDisabled,
          ]}
          onPress={togglePlayPause}>
          <Ionicons
            name={isLoading ? 'hourglass' : isPlaying ? 'pause' : 'play'}
            size={32}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="list" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/modal')}>
          <Ionicons name="information-sharp" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.sheetOverlay}>
          <View style={styles.scheduleSheet}>
            <View style={styles.sheetHandle} />
            <ImageBackground
              source={require('~/assets/images/noronha-sea-turtle-wide.jpg')}
              resizeMode="cover"
              style={styles.scheduleHero}
              imageStyle={styles.scheduleHeroImage}>
              <View style={styles.scheduleHeroOverlay} />
              <Image
                source={require('~/assets/images/noronha-crab-detail.jpg')}
                resizeMode="cover"
                style={styles.crabBadge}
              />
              <Text style={styles.modalTitle}>Programação da Rádio</Text>
              <Text style={styles.modalSubtitle}>Acompanhe os horários da FM Noronha</Text>
            </ImageBackground>

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>Programação Semanal</Text>
              {WEEKLY_PROGRAMMING.map((item) => (
                <ProgramRow
                  key={`${item.time}-${item.program}`}
                  meta={item.time}
                  title={item.program}
                />
              ))}
              <Text style={styles.sectionTitle}>Programas Independentes</Text>
              {INDEPENDENT_PROGRAMS.map((item) => (
                <ProgramRow
                  key={`${item.day}-${item.time}-${item.program}`}
                  meta={`${item.day} • ${item.time}`}
                  title={item.program}
                />
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.sheetCloseButton}
              onPress={() => setModalVisible(false)}>
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
              {SOCIAL_BUTTONS.map((button) => (
                <View key={button.label} style={styles.socialItem}>
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: button.color }]}
                    onPress={async () => {
                      await openUrl(button.url);
                      setModalVisibleSocial(false);
                    }}>
                    <SocialIcon button={button} />
                  </TouchableOpacity>
                  <Text style={styles.socialButtonText}>{button.label}</Text>
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
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.outlineMuted,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
    borderRadius: theme.radius.xl,
    shadowColor: '#000',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 18,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  compactCard: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
  },
  overline: {
    color: theme.colors.outline,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.2,
    marginBottom: 6,
  },
  songTitle: {
    color: theme.colors.onSurface,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
  },
  compactSongTitle: {
    fontSize: 17,
    marginBottom: 12,
  },
  statusText: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  iconButton: {
    backgroundColor: theme.colors.glassSoft,
    borderColor: theme.colors.outlineMuted,
    borderWidth: 1,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: theme.colors.secondaryContainer,
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactPlayButton: {
    height: 58,
    width: 58,
    borderRadius: 29,
  },
  playButtonDisabled: {
    opacity: 0.72,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.deepOverlay,
  },
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.deepOverlay,
  },
  scheduleSheet: {
    backgroundColor: theme.colors.surfaceContainer,
    borderColor: theme.colors.outlineMuted,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    maxHeight: '86%',
    overflow: 'hidden',
    paddingBottom: 18,
    width: '100%',
  },
  sheetHandle: {
    alignSelf: 'center',
    backgroundColor: theme.colors.outline,
    borderRadius: 999,
    height: 5,
    marginTop: 10,
    opacity: 0.55,
    position: 'absolute',
    top: 0,
    width: 44,
    zIndex: 2,
  },
  scheduleHero: {
    minHeight: 112,
    justifyContent: 'flex-end',
    padding: 18,
    paddingTop: 26,
  },
  scheduleHeroImage: {
    opacity: 0.55,
  },
  scheduleHeroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14, 21, 19, 0.56)',
  },
  crabBadge: {
    borderColor: theme.colors.outlineMuted,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    height: 58,
    position: 'absolute',
    right: 18,
    top: 24,
    width: 82,
  },
  modalContent: {
    backgroundColor: theme.colors.surfaceContainer,
    borderColor: theme.colors.outlineMuted,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 420,
    maxHeight: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: theme.colors.onSurface,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 15,
  },
  modalSubtitle: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 13,
  },
  scrollContainer: {
    maxHeight: 430,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 8,
  },
  sectionTitle: {
    color: theme.colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  programRow: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: theme.colors.outlineMuted,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    gap: 4,
    marginBottom: 8,
    padding: 12,
  },
  programTime: {
    color: theme.colors.secondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  programTitle: {
    color: theme.colors.onSurface,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: theme.colors.secondaryContainer,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sheetCloseButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: theme.colors.secondaryContainer,
    borderRadius: theme.radius.full,
    marginTop: 8,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  modalText: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    marginTop: 15,
    backgroundColor: theme.colors.glassSoft,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: theme.colors.onSurface,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.deepOverlay,
    justifyContent: 'flex-end',
  },
  modalContainerSocial: {
    backgroundColor: theme.colors.surfaceContainer,
    borderColor: theme.colors.outlineMuted,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    width: '100%',
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: theme.colors.outline,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
  },
  socialItem: {
    width: '30%',
    alignItems: 'center',
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
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
});

export default MediaControls;
