import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '~/constants/theme';

const VERSION_TWO = [
  ['Administrador Geral Adjunto', 'Sr. Virgílio de Almeida Ignácio de Oliveira'],
  ['Gerência de Comunicação', 'Léa Renata Melo de Medeiros'],
  ['Assessor de Comunicação', 'Domingos Sávio de Godoy'],
  ['Superintendente Administrativo, Financeiro e TI', 'Eliandro Rafael Torres Ferreira'],
  ['Gerência de T.I', 'Ari Alves de Lucena'],
  ['Desenvolvedor', 'Henrique Lira da Silva'],
  ['Desenvolvedor e Analista de Dados', 'Raimundo Marcelo Nogueira Coimbra'],
] as const;

const VERSION_ONE = [
  ['Administradora Geral', 'Thallyta Figuerôa Peixoto'],
  ['Gerência de Comunicação', 'Léa Renata Melo de Medeiros'],
  ['Gerência de T.I', 'Ari Alves de Lucena'],
  ['Desenvolvedor', 'Henrique Lira da Silva'],
  ['Desenvolvedor e Analista de Dados', 'Raimundo Marcelo Nogueira Coimbra'],
] as const;

function VersionSection({
  title,
  date,
  visible,
  onPress,
  people,
}: {
  title: string;
  date: string;
  visible: boolean;
  onPress: () => void;
  people: readonly (readonly [string, string])[];
}) {
  return (
    <View style={styles.sectionCard}>
      <TouchableOpacity onPress={onPress} style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.subTitle}>{date}</Text>
        </View>
        <AntDesign name={visible ? 'up' : 'down'} size={18} color={theme.colors.primary} />
      </TouchableOpacity>

      {visible && (
        <View style={styles.infoContainer}>
          {people.map(([role, name]) => (
            <View key={`${role}-${name}`} style={styles.personRow}>
              <Text style={styles.role}>{role}</Text>
              <Text selectable style={styles.name}>
                {name}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default function SobreApp() {
  const [versao1Visible, setVersao1Visible] = useState(false);
  const [versao2Visible, setVersao2Visible] = useState(false);
  const router = useRouter();

  return (
    <ImageBackground
      source={require('~/assets/images/noronha-island-extra.jpg')}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={25} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Sobre o Aplicativo</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>FM NORONHA</Text>
            <Text selectable style={styles.heroTitle}>
              O som do paraíso
            </Text>
            <Text selectable style={styles.description}>
              O FM Noronha leva até você o melhor da ilha de Fernando de Noronha: notícias, músicas,
              entrevistas e agenda cultural em uma experiência feita para acompanhar a energia da
              ilha.
            </Text>
          </View>

          <VersionSection
            date="31/05/2025"
            people={VERSION_TWO}
            title="Versão 2"
            visible={versao1Visible}
            onPress={() => setVersao1Visible(!versao1Visible)}
          />

          <VersionSection
            date="24/10/2024"
            people={VERSION_ONE}
            title="Versão 1"
            visible={versao2Visible}
            onPress={() => setVersao2Visible(!versao2Visible)}
          />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 8, 11, 0.66)',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.outlineMuted,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  title: {
    color: theme.colors.white,
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 42,
  },
  scrollContainer: {
    gap: 14,
    padding: 18,
    paddingBottom: 28,
  },
  heroCard: {
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.outlineMuted,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    gap: 10,
    padding: 20,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2.2,
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: 28,
    fontWeight: '900',
  },
  description: {
    color: theme.colors.onSurface,
    fontSize: 16,
    lineHeight: 24,
  },
  sectionCard: {
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.outlineMuted,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  sectionTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  subTitle: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  infoContainer: {
    borderTopColor: theme.colors.outlineMuted,
    borderTopWidth: 1,
    padding: 14,
  },
  personRow: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: theme.colors.outlineMuted,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    gap: 3,
    marginBottom: 8,
    padding: 12,
  },
  role: {
    color: theme.colors.secondary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  name: {
    color: theme.colors.onSurface,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
});
