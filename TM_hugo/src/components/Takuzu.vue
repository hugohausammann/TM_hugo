<script setup lang="ts">
import { computed,ref } from 'vue'
import {
  creerGrilleVide,
  partieGagnee,
  creerGrilleAleatoire,
  creerGrilleJeu,
  grilleComplete,
  ligneAvecErreur,
  colonneAvecErreur
} from '../takuzu/logique'
import type { Grille } from '../takuzu/types'

const taille = ref(4)

const tailleCase = computed(() => 80 / taille.value)
const taillechiffre = computed(() => tailleCase.value * 0.4)

const solution = ref<Grille>([])
const grille = ref<Grille>(creerGrilleVide(taille.value))
const cellulesFixes = ref<boolean[][]>([])
const grilleInitiale = ref<Grille>(creerGrilleVide(taille.value))

const lignesEnErreur = ref<number[]>([])
const colonnesEnErreur = ref<number[]>([])


function changerCellule(indexLigne: number, indexCellule: number) {
  if (jeuTermine.value) {
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
}

function genererGrille() {
  if (jeuTermine.value) {
    return
  }
  solution.value = creerGrilleAleatoire(taille.value)

  const nombreCasesVides = Math.floor(
    (taille.value * taille.value) / 2
  )

  grilleInitiale.value = creerGrilleJeu(
    solution.value,
    nombreCasesVides
  )
  grille.value = grilleInitiale.value.map(ligne => [...ligne]

  )
  cellulesFixes.value = grilleInitiale.value.map(ligne =>
    ligne.map(cellule => cellule !== null)
  )

  lignesEnErreur.value = []
  colonnesEnErreur.value = []

  jeuTermine.value = false
  messageValidation.value = ''
}

function validerPartie() {
  lignesEnErreur.value = []
  colonnesEnErreur.value = []
  
  if (!grilleComplete(grille.value)) {
    messageValidation.value = 'La grille est incomplète'
    return
  }

  if (partieGagnee(grille.value)) {
    jeuTermine.value = true
    messageValidation.value = 'VICTORY'
  } else {
    messageValidation.value = 'Il y a une erreur dans la grille'

    chercherLignesEnErreur()
    chercherColonnesEnErreur()
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

const sonClic = new Audio('/son/touch.mp3')

function jouerSonClic() {
  sonClic.currentTime = 0
  sonClic.play()
}
</script>

<template>
  <div class="page">
    <div class="jeu">
      <label>
        Taille de la grille :
        <select v-model.number="taille" :disabled="jeuTermine"@change="changerTaille">
          <option :value="4">4 × 4</option>
          <option :value="6">6 × 6</option>
          <option :value="8">8 × 8</option>
        </select>
      </label>

      <div class="grille"
      :class="{ 'grille-victoire': jeuTermine }">
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
              zero: cellule === 0,
              un: cellule === 1
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
        </div>
      </div>
    </div>

    <p v-if="messageValidation" class="message" :class="{ victoire: jeuTermine}">{{ messageValidation }}</p>

    <button :disabled="jeuTermine || grilleInitiale.length === 0" @click="validerPartie">Valider</button>
    <button :disabled="grilleInitiale.length === 0" @click="recommencer">Recommencer</button>
    <button :disabled="jeuTermine" @click="genererGrille">Générer une grille</button>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  background: linear-gradient(135deg, #eef2f7, #dfe7f1);
  font-family: Arial, sans-serif;
}

.jeu {
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0, 12);
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

.cellule:hover {
  background: #f4f7fb;
}

.cellule:active {
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

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.grille {
  position: relative;
  width: fit-content;
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

.grille {
  transition: transform 0.3s;
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

button {
  margin: 4px;
}
</style>