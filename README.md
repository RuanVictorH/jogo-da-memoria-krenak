# 🌿 Jogo da Memória Digitalizado - Povo Krenak 🐢

Um jogo da memória interativo, colorido e culturalmente enriquecedor desenvolvido para ficar aberto ao público (totens interativos, computadores de exibição, museus, feiras culturais, escolas ou navegadores web).

O jogo utiliza fielmente as cartas e artes do acervo da língua **Krenak**, conectando palavras em Krenak às suas correspondentes em Língua Portuguesa.

---

## 🎨 Distribuição dos Versos das Cartas (Pré-definido e Salvo)

Cada par de cartas possui seu próprio tipo de verso cultural pré-definido, distribuído exatamente da seguinte forma:

1. **1º Grupo (8 pares = 16 cartas):** Verso com o **Grafismo Geométrico Tradicional Krenak**
   - *Pares 1 a 8:* Gut (Tartaruga), Kuparak (Onça), Amboók (Árvore), Bakãn (Pássaro), Dhiüm Dhiüm (Gambá), E Ná (Siriema), Fûro (Flor), Gaip (Goiaba).
2. **2º Grupo (8 pares = 16 cartas):** Verso com a **Guerreira Indígena & Onça Pintada**
   - *Pares 9 a 16:* Inhame (Inhame), Jãkrim (Jabuticaba), Mitirik (Mexerica), Nat-nat (Rato), Õm Õm (Gavião), Peião (Feijão), Rakeké (Borboleta), Thaporot (Gafanhoto).
3. **3º Grupo (8 pares = 16 cartas):** Verso com a **Pintura Artística Rio Watu & Onça**
   - *Pares 17 a 24:* Uati (Milho), Uet Uet (Melancia), Tombek (Fogo), Tomiak (Lua), Taomeete (Vagalume), Ruá Ruá (Arara), Pukri (Boi/Vaca), Marrõne (Abóbora).
4. **4º Grupo (7 pares = 14 cartas):** Verso com o **Retrato em Homenagem a Ailton Krenak**
   - *Pares 25 a 31:* Kulhino (Chocalho), Bitim (Gato), Amukiun (Nuvem), Anguri (Aranha), Grán (Cobra), Gón (Cachorro), Tepó (Sol).

> **Total:** 8 + 8 + 8 + 7 = **31 pares** (62 cartas no acervo completo).

---

## 🚀 Como Iniciar

Você pode iniciar o jogo de três formas simples:

1. **Início Rápido (Qualquer Computador):**
   - Dê um duplo clique no arquivo [`iniciar_jogo.bat`](file:///c:/Users/ruanh/OneDrive/Área%20de%20Trabalho/Jogo%20da%20Memória%20-%20KRENAK/iniciar_jogo.bat) ou abra diretamente o [`index.html`](file:///c:/Users/ruanh/OneDrive/Área%20de%20Trabalho/Jogo%20da%20Memória%20-%20KRENAK/index.html).

2. **Modo Totem / Kiosk (Espaço Público / Tela Cheia Sem Barras):**
   - Dê um duplo clique no arquivo [`iniciar_modo_kiosk.bat`](file:///c:/Users/ruanh/OneDrive/Área%20de%20Trabalho/Jogo%20da%20Memória%20-%20KRENAK/iniciar_modo_kiosk.bat).
   - O jogo iniciará em tela cheia imersiva (ideal para telas touch e eventos).
   - Para sair do modo quiosque: pressione `ALT + F4` ou `F11`.

3. **Totalmente Offline:**
   - O jogo não depende de conexão com a internet. Todos os efeitos sonoros são gerados nativamente pelo navegador (Web Audio API) e as imagens estão salvas localmente.

---

## 📜 Regras do Jogo (Como Jogar)

1. **Embaralhe as cartas:** Todas as cartas começam viradas para baixo sobre a mesa digital.
2. **Ordem dos jogadores:** O jogo sorteia e indica no topo da tela de quem é a vez.
3. **Vire 2 cartas por vez:**
   - Cada par é formado por **1 carta em Krenak** + **1 carta em Português**.
   - *Exemplo:* **GUT** (Krenak) ⇄ **TARTARUGA** (Português).
4. **Acertou o par? (✅):**
   - O jogador fica com o par (+1 ponto) e **joga novamente**!
5. **Errou o par? (⏭):**
   - As cartas voltam a virar para baixo e a vez **passa para o próximo jogador**.
6. **Fim de Jogo (🏆):**
   - Quando todas as cartas acabarem, o jogador com mais pares combinados vence a partida com festa de confetes e pódio!

---

## ⚙️ Recursos para Espaços Públicos e Totens

- **Efeitos Sonoros Táteis:** Áudio sintético suave para toque/virada de cartas, acordes de comemoração de acerto e fanfarra de vitória (sem narração por voz).
- **Modo Multijogador:** 1 Jogador (solo), 2 Jogadores (duelo clássico), 3 ou 4 Jogadores com avatares e cores individuais.
- **Sensor de Inatividade Inteligente:** Se ninguém interagir por 3 minutos durante um evento público, o jogo avisa e reinicia sozinho na tela inicial para o próximo visitante.
- **Dicionário Cultural Krenak:** Modal interativo que permite consultar todas as 31 palavras e seus versos associados.
