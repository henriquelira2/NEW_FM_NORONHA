# Release, Build e EAS Update

Este guia resume como publicar builds e updates do FM Noronha com Expo/EAS.

## Configuracao Atual

| Item            | Valor                                                     |
| --------------- | --------------------------------------------------------- |
| Expo SDK        | `53`                                                      |
| React Native    | `0.79.6`                                                  |
| App version     | `1.0.1`                                                   |
| Runtime version | `1.0.1`                                                   |
| Android package | `com.atdefn.FM.Noronha`                                   |
| EAS project ID  | `48566ed8-cff0-4dbc-a64f-ce83a2c847bd`                    |
| Updates URL     | `https://u.expo.dev/48566ed8-cff0-4dbc-a64f-ce83a2c847bd` |

## Canais

| Perfil EAS    | Canal         | Finalidade                            |
| ------------- | ------------- | ------------------------------------- |
| `development` | `development` | Testes com development client.        |
| `preview`     | `preview`     | Build interno sem ferramentas de dev. |
| `production`  | `production`  | Build final/publicacao.               |

Arquivo de referencia: `eas.json`.

## Quando Usar EAS Update

Use `eas update` para:

- Mudancas em JS/TS.
- Ajustes de layout, cores, textos e componentes.
- Imagens novas ou alteradas dentro do bundle.
- Correcoes de bug que nao mudam API nativa.
- Atualizacao de URL de stream, mensagens e programacao.

Exemplo:

```bash
npx eas-cli@latest update --channel development --message "Ajustes visuais e radio"
```

## Quando Gerar Novo Build

Gere um novo build quando alterar:

- `app.json` em campos nativos.
- `runtimeVersion`.
- Plugins Expo.
- Dependencias nativas.
- Permissoes Android/iOS.
- SDK do Expo.
- Patch nativo ou comportamento nativo do TrackPlayer.

Como houve mudanca em `app.json` e `runtimeVersion`, a proxima validacao deve usar um build novo.

## Build Android

Development build:

```bash
npx eas-cli@latest build -p android --profile development
```

Preview build:

```bash
npx eas-cli@latest build -p android --profile preview
```

Production build:

```bash
npx eas-cli@latest build -p android --profile production
```

Se `npx eas build` falhar com `could not determine executable to run`, use explicitamente:

```bash
npx eas-cli@latest build -p android --profile development
```

## Checklist Antes do Build

```bash
npx tsc --noEmit
npm run lint
```

Validar manualmente:

- Home abre com imagem de fundo correta.
- Botao `Ouvir agora` navega para a radio.
- Radio toca o stream novo.
- Play/pause funcionam no app e na notificacao.
- Notificacao Android mostra titulo, artista e artwork.
- Clique na notificacao volta para a tela da radio.
- Modal de programacao abre e fecha.
- Tela Sobre abre com fundo correto.
- Sem internet/stream fora do ar exibe erro amigavel.

## Fluxo Recomendado

1. Fazer alteracoes localmente.
2. Rodar TypeScript e lint.
3. Gerar build `development`.
4. Instalar no aparelho.
5. Testar radio e notificacao.
6. Publicar updates no canal `development` durante ajustes finos.
7. Gerar `preview` para validacao interna.
8. Promover para `production` quando aprovado.

## Observacoes do TrackPlayer

- `newArchEnabled` esta `false` por compatibilidade com `react-native-track-player` `4.1.1` e `patch-package`.
- A artwork da notificacao usa URI resolvida a partir de `noronha-sea-turtle-wide.jpg`.
- Se a notificacao mantiver metadata antiga, pare a radio, feche totalmente o app e abra novamente.
