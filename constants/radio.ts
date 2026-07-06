import type { Ionicons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Image, type ColorValue } from 'react-native';
import type { Track } from 'react-native-track-player';

export const RADIO_FREQUENCY = '96.9';

export const RADIO_CONNECTION_ERROR =
  'Não foi possível conectar à rádio no momento. Isso pode ser devido a problemas na conexão com a internet ou a uma instabilidade temporária no servidor. Tente novamente mais tarde...';

export const RADIO_STREAM_URL = 'https://8136.brasilstream.com.br/stream';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.atdefn.FM.Noronha';

export const RADIO_NOTIFICATION_ARTWORK = require('~/assets/images/noronha-sea-turtle-wide.jpg');

export const RADIO_NOTIFICATION_ARTWORK_URI = Image.resolveAssetSource(
  RADIO_NOTIFICATION_ARTWORK
)?.uri;

export const RADIO_TRACK: Track = {
  id: 'fm-noronha-live',
  url: RADIO_STREAM_URL,
  title: 'FM Noronha',
  artist: 'Noronha Radio',
  artwork: RADIO_NOTIFICATION_ARTWORK_URI,
};

export type SocialButton =
  | {
      label: string;
      iconSet: 'ionicons';
      iconName: ComponentProps<typeof Ionicons>['name'];
      color: ColorValue;
      url: string;
    }
  | {
      label: string;
      iconSet: 'fontawesome';
      iconName: ComponentProps<typeof FontAwesome>['name'];
      color: ColorValue;
      url: string;
    }
  | {
      label: string;
      iconSet: 'fontawesome6';
      iconName: ComponentProps<typeof FontAwesome6>['name'];
      color: ColorValue;
      url: string;
    };

export const SOCIAL_BUTTONS: SocialButton[] = [
  {
    label: 'Facebook',
    iconSet: 'ionicons',
    iconName: 'logo-facebook',
    color: '#3b5998',
    url: 'https://www.facebook.com/tvgolfinho/',
  },
  {
    label: 'WhatsApp',
    iconSet: 'ionicons',
    iconName: 'logo-whatsapp',
    color: '#25d366',
    url: 'https://wa.me/5581994883168',
  },
  {
    label: 'X',
    iconSet: 'fontawesome6',
    iconName: 'x-twitter',
    color: '#1da1f2',
    url: 'https://x.com/TvGolfinhoNoron?t=ofIpMIGN-BkabqsFsFAR6Q&s=08',
  },
  {
    label: 'Instagram',
    iconSet: 'ionicons',
    iconName: 'logo-instagram',
    color: '#C13584',
    url: 'https://www.instagram.com/sistemagolfinho.noronha/',
  },
  {
    label: 'YouTube',
    iconSet: 'ionicons',
    iconName: 'logo-youtube',
    color: '#da0c0c',
    url: 'https://www.youtube.com/c/SistemaGolfinhodeComunica%C3%A7%C3%A3o',
  },
  {
    label: 'Spotify',
    iconSet: 'fontawesome',
    iconName: 'spotify',
    color: '#1DB954',
    url: 'https://open.spotify.com/show/22X6bcFzCGPVh9HHDWr8FK?si=BxVk1rlhSteCWilDOLwdmA',
  },
];

export const WEEKLY_PROGRAMMING = [
  { time: '8h45', program: 'Reprise do Jornal da Ilha' },
  { time: '9h', program: 'Momentos de Alegria (Pedro Ribeiro)' },
  { time: '12h', program: 'Pernambuco Esportivo (Rádio Sei)' },
  { time: '13h', program: 'Pernambuco no Rádio (Rádio Sei)' },
  { time: '14h', program: 'Balaio de Gato (Thânia Brito)' },
  { time: '19h', program: 'Jornal da Ilha (Karlilian Magalhães e Karol Vieira)' },
] as const;

export const INDEPENDENT_PROGRAMS = [
  { day: 'Segunda-feira', time: '18h', program: 'Momentos com Cristo' },
  { day: 'Terça-feira', time: '18h', program: 'A Caminho da Luz' },
  { day: 'Quarta-feira', time: '19h30', program: 'Quarta Onda (Virgínia Anghinoni)' },
  { day: 'Quinta-feira', time: '10h30', program: 'Momento da Gestão' },
  { day: 'Quinta-feira', time: '18h', program: 'Voz que Liberta' },
  { day: 'Quinta-feira', time: '20h', program: 'Pernambuco Cultural' },
  { day: 'Sexta-feira', time: '18h', program: 'Rei Jesus' },
  { day: 'Sexta-feira', time: '19h', program: 'B do Rock (Rafael Robles)' },
  { day: 'Sexta-feira', time: '22h', program: 'Alma Leve (Elô Araújo)' },
] as const;
