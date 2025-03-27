/* eslint-disable prettier/prettier */
import { router } from 'expo-router';
import TrackPlayer, { Event } from 'react-native-track-player';

export async function playbackService() {
   TrackPlayer.addEventListener(Event.PlaybackState, async () => {
     console.log('O estado da reprodução mudou!');
   });
 
   TrackPlayer.addEventListener(Event.RemotePlay, async () => {
     await TrackPlayer.play();
   });
 
   TrackPlayer.addEventListener(Event.RemotePause, async () => {
     await TrackPlayer.pause();
   });
 
   TrackPlayer.addEventListener(Event.RemoteStop, async () => {
     await TrackPlayer.stop();
   });
 
  TrackPlayer.addEventListener(Event.RemoteDuck, async () => {
    console.log('Usuário tocou na notificação do player!');
    router.push('/(tabs)/sound'); 
  });
}
