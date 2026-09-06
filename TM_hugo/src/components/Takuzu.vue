<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  creerGrilleVide,
  partieGagnee,
  creerGrilleAleatoire,
  creerGrilleJeu,
  grilleComplete,
  ligneAvecErreur,
  colonneAvecErreur
} from '../takuzu/logique'
import type { Grille, Ligne } from '../takuzu/types'

const taille = ref(4)

const tailleCase = computed(() => {
  if (window.innerWidth <= 600) {
    return 75 / taille.value
  }

  return 62 / taille.value
})
const taillechiffre = computed(() => tailleCase.value * 0.4)

const solution = ref<Grille>([])
const grille = ref<Grille>(creerGrilleVide(taille.value))
const cellulesFixes = ref<boolean[][]>([])
const grilleInitiale = ref<Grille>(creerGrilleVide(taille.value))

const lignesEnErreur = ref<number[]>([])
const colonnesEnErreur = ref<number[]>([])


function changerCellule(indexLigne: number, indexCellule: number) {
  if (jeuTermine.value || nombreErreurs.value >= 3) {
    return
  }

  if (cellulesFixes.value[indexLigne]?.[indexCellule]) {
    return
  }

  jouerSonClic()
  lignesEnErreur.value = []
  colonnesEnErreur.value = []
  messageValidation.value = ''

  const ligne = grille.value[indexLigne]

  if (!ligne) {
    return
  }

  if (ligne[indexCellule] === null) {
    ligne[indexCellule] = 0
  } else if (ligne[indexCellule] === 0) {
    ligne[indexCellule] = 1
  } else {
    ligne[indexCellule] = null
  }
}

function recommencer() {
  grille.value = grilleInitiale.value.map(ligne => [...ligne])

  lignesEnErreur.value = []
  colonnesEnErreur.value = []

  jeuTermine.value = false
  messageValidation.value = ''

  secondesEcoulees.value = 0
  demarrerChrono()

  nombreErreurs.value = 0
}

function genererGrille() {
  if (jeuTermine.value) {
    return
  }

  solution.value = creerGrilleAleatoire(taille.value)

  const nombreCasesVides = Math.floor(
    (taille.value * taille.value) * 0.6
  )

  grilleInitiale.value = creerGrilleJeu(
    solution.value,
    nombreCasesVides
  )

  grille.value = grilleInitiale.value.map(ligne => [...ligne])

  cellulesFixes.value = grilleInitiale.value.map(ligne =>
    ligne.map(cellule => cellule !== null)
  )

  lignesEnErreur.value = []
  colonnesEnErreur.value = []

  jeuTermine.value = false
  messageValidation.value = ''

  secondesEcoulees.value = 0
  demarrerChrono()

  nombreErreurs.value = 0
}

function validerPartie() {
  lignesEnErreur.value = []
  colonnesEnErreur.value = []

  if (!grilleComplete(grille.value)) {
    messageValidation.value = 'La grille est incomplète'
    jouerSonErreur()
    return
  }

  if (partieGagnee(grille.value)) {
    jeuTermine.value = true
    jouerSonVictoire()
    messageValidation.value = 'VICTOIRE !'
    enregistrerRecord()
    arreterChrono()
  } else {
    messageValidation.value = 'Il y a une erreur dans la grille'
    jouerSonErreur()

    nombreErreurs.value++

    chercherLignesEnErreur()
    chercherColonnesEnErreur()

    if (nombreErreurs.value >= 3) {
      messageValidation.value = '3 erreurs — partie terminée'
      arreterChrono()
    }
  }
}

const jeuTermine = ref(false)
const messageValidation = ref('')

function changerTaille() {
  solution.value = []

  grille.value = creerGrilleVide(taille.value)
  grilleInitiale.value = creerGrilleVide(taille.value)
  cellulesFixes.value = []

  lignesEnErreur.value = []
  colonnesEnErreur.value = []
  jeuTermine.value = false
  messageValidation.value = ''

  secondesEcoulees.value = 0
  arreterChrono()

  nombreErreurs.value = 0
}

function chercherLignesEnErreur() {
  lignesEnErreur.value = []

  for (let i = 0; i < taille.value; i++) {
    if (ligneAvecErreur(grille.value, i)) {
      lignesEnErreur.value.push(i)
    }
  }
}

function chercherColonnesEnErreur() {
  colonnesEnErreur.value = []

  for (let j = 0; j < taille.value; j++) {
    if (colonneAvecErreur(grille.value, j)) {
      colonnesEnErreur.value.push(j)
    }
  }
}

const sonClic = new Audio('/sons/touch.mp3')

function jouerSonClic() {
  if (!sonActive.value) {
    return
  }

  sonClic.currentTime = 0
  sonClic.play()
}

const sonErreur = new Audio('/sons/erreur.mp3')
const sonVictoire = new Audio('/sons/victoire.mp3')

function jouerSonErreur() {
  if (!sonActive.value) {
    return
  }

  sonErreur.currentTime = 0
  sonErreur.play()
}

function jouerSonVictoire() {
  if (!sonActive.value) {
    return
  }

  sonVictoire.currentTime = 0
  sonVictoire.play()
}

const sonActive = ref(true)

function changerSon() {
  sonActive.value = !sonActive.value
}

const musiqueActive = ref(false)

const musique = new Audio('/sons/musique.mp3')
musique.loop = true
musique.volume = 0.05

function changerMusique() {
  musiqueActive.value = !musiqueActive.value

  if (musiqueActive.value) {
    musique.play()
  } else {
    musique.pause()
  }
}

const secondesEcoulees = ref(0)

const chrono = computed(() => {
  const minutes = Math.floor(secondesEcoulees.value / 60)
  const secondes = secondesEcoulees.value % 60

  return (
    String(minutes).padStart(2, '0') +
    ':' +
    String(secondes).padStart(2, '0')
  )
})

let intervalChrono: number | undefined

function demarrerChrono() {
  arreterChrono()

  intervalChrono = window.setInterval(() => {
    secondesEcoulees.value++
  }, 1000)
}

function arreterChrono() {
  if (intervalChrono !== undefined) {
    clearInterval(intervalChrono)
    intervalChrono = undefined
  }
}

const nombreErreurs = ref(0)

const record4 = ref(0)
const record6 = ref(0)
const record8 = ref(0)
const record12 = ref(0)

function enregistrerRecord() {
  if (taille.value === 4) {
    if (record4.value === 0 || secondesEcoulees.value < record4.value) {
      record4.value = secondesEcoulees.value
    }
  }

  if (taille.value === 6) {
    if (record6.value === 0 || secondesEcoulees.value < record6.value) {
      record6.value = secondesEcoulees.value
    }
  }

  if (taille.value === 8) {
    if (record8.value === 0 || secondesEcoulees.value < record8.value) {
      record8.value = secondesEcoulees.value
    }
  }

  if (taille.value === 12) {
    if (record12.value === 0 || secondesEcoulees.value < record12.value) {
      record12.value = secondesEcoulees.value
    }
  }
}

function afficherRecord() {
  let record = 0

  if (taille.value === 4) record = record4.value
  if (taille.value === 6) record = record6.value
  if (taille.value === 8) record = record8.value
  if (taille.value === 12) record = record12.value

  if (record === 0) {
    return '--:--'
  }

  const minutes = Math.floor(record / 60)
  const secondes = record % 60

  return String(minutes).padStart(2, '0') + ':' +
         String(secondes).padStart(2, '0')
}

// Easters Eggs

const modeSombre = ref(false)
const modeCouleur = ref(false)
const skin = ref('')
const chronoBizarre = ref(false)
const afficherEasterEggs = ref(false)

let code = ''

window.addEventListener('keydown', (event) => {
  
  if (event.key === ' ') {
    code = ''
    return
  }
  
  code = code + event.key

  if (code === '1234') {
    secondesEcoulees.value = 0
    code = ''
  }

  if (code === 'dark') {
    modeSombre.value = !modeSombre.value
    skin.value = ''
    code = ''
  }

  if (code === 'color') {
    modeCouleur.value = !modeCouleur.value
    code = ''
  }

  if (code === 'pink') {
    skin.value = 'pink'
    modeSombre.value = false
    code = ''
  }

  if (code === 'water') {
    skin.value = 'water'
    modeSombre.value = false
    code = ''
  }

  if (code === 'swiss') {
    skin.value = 'swiss'
    modeSombre.value = false
    code = ''
  }

  if (code === 'time') {
    chronoBizarre.value = !chronoBizarre.value
    code = ''
  }

  if (code === 'solve') {
    grille.value = solution.value.map(ligne => [...ligne])
    validerPartie()
    code = ''
  }

  if (code === 'normal') {
    skin.value = ''
    modeSombre.value = false
    modeCouleur.value = false
    chronoBizarre.value = false
    code = ''
  }

  if (code.length > 6) {
    code = ''
  }
})

function nombreManquant(ligne: Ligne, valeur: 0 | 1) {
  let nombrePresent = 0

  for (const cellule of ligne) {
    if (cellule === valeur) {
      nombrePresent++
    }
  }

  return taille.value / 2 - nombrePresent
}

function colonneManquante(indexColonne: number, valeur: 0 | 1) {
  let nombrePresent = 0

  for (const ligne of grille.value) {
    if (ligne[indexColonne] === valeur) {
      nombrePresent++
    }
  }

  return taille.value / 2 - nombrePresent
}

const aideActive = ref(false)
</script>

<template>
  <div 
    class="page" 
    :class="{
      sombre: modeSombre,
      pink: skin === 'pink',
      swiss: skin === 'swiss',
      water: skin === 'water'
    }">
    <div
      class="coin-secret"
      @click="afficherEasterEggs = !afficherEasterEggs"
    ></div>
    <div class="liste-easter-eggs" v-if="afficherEasterEggs">
      <p><b>🥚 Easter Eggs !</b></p>
      <p>1234 → Chrono à 0</p>
      <p>dark → Mode sombre</p>
      <p>color → Couleurs secrètes</p>
      <p>pink → Skin Rose</p>
      <p>water → Skin Eau</p>
      <p>swiss → Skin Suisse</p>
      <p>time → Chrono à 99:99</p>
      <p>solve → Solution</p>
      <p>normal → Retour normal</p>
    </div>
  
    <div class="jeu">
      <h1 class="titre">Takuzu</h1>

      <div class="infos-partie">
        <span>⏱ {{ chronoBizarre ? '99:99' : chrono }}</span>
        <span>❌ {{ nombreErreurs }} / 3</span>
        <span>🏆 {{ afficherRecord() }}</span>
      </div>

      <div class="barre-haut">
        <label>
          Taille de la grille :
          <select v-model.number="taille" :disabled="jeuTermine" @change="changerTaille">
            <option :value="4">Facile</option>
            <option :value="6">Moyen</option>
            <option :value="8">Difficile</option>
            <option :value="12">Expert</option>
          </select>
        </label>

        <div class="boutons-son">
          <button @click="changerSon">{{ sonActive ? '🔊' : '🔇' }}</button>
          <button @click="changerMusique">{{ musiqueActive ? '🎵 ON' : '🎵 OFF' }}</button>
        </div>
      </div>

      <div class="grille" :class="{ 'grille-victoire': jeuTermine }">
        <div class="triangle triangle-haut"></div>
        <div class="triangle triangle-bas"></div>
        <div class="triangle triangle-gauche"></div>
        <div class="triangle triangle-droite"></div>

        <div v-for="(ligne, indexLigne) in grille" class="ligne">
          <div
            v-for="(cellule, indexCellule) in ligne"
            class="cellule"
            :class="{
              erreur: lignesEnErreur.includes(indexLigne) || colonnesEnErreur.includes(indexCellule),
              fixe: cellulesFixes[indexLigne]?.[indexCellule],
              jouable: !cellulesFixes[indexLigne]?.[indexCellule] && !jeuTermine && nombreErreurs < 3,
              zero: cellule === 0,
              un: cellule === 1,
              zeroSecret: cellule === 0 && modeCouleur,
              unSecret: cellule === 1 && modeCouleur
            }"
            @click="changerCellule(indexLigne, indexCellule)"
            :style="{
              width: tailleCase + 'vmin',
              height: tailleCase + 'vmin',
              fontSize: taillechiffre + 'vmin'
            }"
          >
            {{ cellule }}
          </div>
          <div class="compteur-ligne"
          v-if ="aideActive"
          >
            0: {{ nombreManquant(ligne, 0) }}
            1: {{ nombreManquant(ligne, 1) }}
          </div>
        </div>
      </div>
    <div
      class="compteurs-colonnes"
      v-if="aideActive"
      :style="{ gridTemplateColumns: 'repeat(' + taille + ', 1fr)' }"
    >
      <div
        v-for="index in taille"
        :key="index"
        class="compteur-colonne"
      >
        0: {{ colonneManquante(index - 1, 0) }}<br>
        1: {{ colonneManquante(index - 1, 1) }}
      </div>
    </div>

    <p v-if="messageValidation" class="message" :class="{ victoire: jeuTermine }">
      {{ messageValidation }}
    </p>

    <div class="boutons-jeu">
      <button
        :disabled="jeuTermine || nombreErreurs >= 3 || grilleInitiale.length === 0"
        @click="validerPartie"
      >
        Valider
      </button>

      <button :disabled="grilleInitiale.length === 0" @click="recommencer">
        Recommencer
      </button>

      <button
        :disabled="jeuTermine || nombreErreurs >= 3"
        @click="genererGrille"
      >
        Générer une grille
      </button>
      <button @click="aideActive = !aideActive">
        💡
      </button>
    </div>
    </div>
  </div>
</template>

<style scoped>
.compteurs-colonnes {
  display: grid;
  width: 62vmin;
  margin-top: 5px;
}

.compteur-colonne {
  text-align: center;
  font-size: 12px;
  color: gray;
}

.ligne {
  position: relative;
}

.compteur-ligne {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
  font-size: 12px;
  color: gray;
  white-space: nowrap;
  text-align: center;
}

.infos-partie {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 8px 0;
  font-weight: 600;
  color: #344054;
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #e8eef5, #cbd8e6);
  font-family: "Trebuchet MS", sans-serif;
}

.titre {
  margin: 0 0 15px;
  text-align: center;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 5px;
  color: #344054;
}

.jeu {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.ligne {
  display: flex;
}

.cellule {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #d8dee8;
  background: #ffffff;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.15s,
    transform 0.1s,
    box-shadow 0.15s;
}

.cellule.jouable {
  cursor: pointer;
}

.cellule.jouable:hover {
  background: #f4f7fb;
  box-shadow: inset 0 0 0 2px #cbd5e1;
}

.cellule.jouable:active {
  transform: scale(0.94);
}

.cellule.zero {
  color: #2563eb;
}

.cellule.un {
  color: #e05a47;
}

.cellule.fixe {
  font-weight: 800;
  background: #f1f3f6;
  cursor: default;
}

.cellule.erreur {
  background-color: #ffd6d6;
}

.grille {
  position: relative;
  width: fit-content;
  margin: 15px auto;
  border: 2px solid #344054;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.10);
  transition: transform 0.3s;
}

.message {
  margin: 10px 0;
  padding: 10px 16px;
  border-radius: 10px;
  background: #fff1f1;
  color: #b42318;
  font-weight: 600;
  text-align: center;
}

.message.victoire {
  background: #ecfdf3;
  color: #067647;
  animation: victoire 0.5s ease;
}

@keyframes victoire {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }

  60% {
    transform: scale(1.08);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.grille-victoire {
  transform: scale(1.02);
}

.triangle {
  position: absolute;
  background-color: black;
  z-index: 10;
}

.triangle-haut {
  width: 16px;
  height: 16px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.triangle-bas {
  width: 16px;
  height: 16px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  clip-path: polygon(0 100%, 100% 100%, 50% 0);
}

.triangle-gauche {
  width: 16px;
  height: 16px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  clip-path: polygon(0 0, 0 100%, 100% 50%);
}

.triangle-droite {
  width: 16px;
  height: 16px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  clip-path: polygon(100% 0, 100% 100%, 0 50%);
}

.boutons-jeu {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.barre-haut {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
}

.boutons-son {
  display: flex;
  gap: 8px;
}

.coin-secret {
  position: fixed;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 20;
}

.liste-easter-eggs {
  position: fixed;
  top: 35px;
  right: 10px;
  background: white;
  color: black;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
  z-index: 20;
}

.liste-easter-eggs p {
  margin: 4px;
}

.page.sombre {
  background: #111;
}

.page.sombre .jeu {
  background: #222;
  color: dark;
}

.page.sombre .grille {
  background: black;
}

.page.sombre .cellule {
  background: black;
  color: white;
}

.page.sombre .boutons-son {
  color: black;
}

.page.sombre select {
  background: #333;
  color: white;
}

.zeroSecret {
  background: purple !important;
}

.unSecret {
  background: green !important;
}

.page.pink {
  background: pink;
}

.page.pink .jeu {
  background: #ffe5f0;
  color: purple;
}

.page.pink .zero {
  background: hotpink;
}

.page.pink .un {
  background: purple;
}

.page.pink select {
  background: pink;
  color: purple;
}

.page.water {
  background: lightblue;
}

.page.water .jeu {
  background: #e0f7ff;
  color: #006994;
}

.page.water .zero {
  background: deepskyblue;
}

.page.water .un {
  background: dodgerblue;
}

.page.water select {
  background: lightblue;
  color: #006994;
}

.page.swiss {
  background: red;
}

.page.swiss .jeu {
  background: white;
  color: red;
}

.page.swiss .zero {
  background: red;
}

.page.swiss .un {
  background: white;
  color: red;
}

.page.swiss select {
  background: white;
  color: red;
}

.page.pink .fixe,
.page.water .fixe,
.page.swiss .fixe,
.page.sombre .fixe {
  font-weight: 900;
  font-size: 1.1em;
}

select,
button {
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #cfd6df;
  padding: 8px 14px;
}

select {
  background: white;
  margin-left: 8px;
}

button {
  background: #ffffff;
  cursor: pointer;
  margin: 4px;
  transition:
    transform 0.1s,
    box-shadow 0.15s,
    background-color 0.15s;
}

button:hover:not(:disabled) {
  background: #f4f7fb;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

button:active:not(:disabled) {
  transform: scale(0.96);
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 600px) {

  .page {
    padding: 10px;
    box-sizing: border-box;
  }

  .jeu {
    width: 95vw;
    padding: 12px;
    box-sizing: border-box;
  }

  .titre {
    font-size: 28px;
  }

  .barre-haut {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }

  .infos-partie {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .boutons-jeu {
    flex-wrap: wrap;
    justify-content: center;
  }

  button {
    font-size: 13px;
    padding: 7px 10px;
  }

  select {
    font-size: 13px;
  }

  .compteur-ligne {
    font-size: 9px;
    margin-left: 4px;
  }

  .compteur-colonne {
    font-size: 9px;
  }

}
</style>