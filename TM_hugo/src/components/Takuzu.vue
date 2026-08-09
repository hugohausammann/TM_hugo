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
</script>

<template>
  <div class="page">
    <div>
      <label>
        Taille de la grille :

        <select
          v-model.number="taille"
          @change="changerTaille"
        >
          <option :value="4">4 × 4</option>
          <option :value="6">6 × 6</option>
          <option :value="8">8 × 8</option>
        </select>
      </label>
      <div
        v-for="(ligne, indexLigne) in grille"
        class="ligne"
      >
        <div
          v-for="(cellule, indexCellule) in ligne"
          class="cellule"
          :class="{
            erreur:
              lignesEnErreur.includes(indexLigne) ||
              colonnesEnErreur.includes(indexCellule)
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
    <p v-if="messageValidation">{{ messageValidation }}</p>

    <button :disabled="jeuTermine" @click="validerPartie">Valider</button>
    <button :disabled="grilleInitiale.length === 0" @click="recommencer">Recommencer</button>
    <button @click="genererGrille">Générer une grille</button>

  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.ligne {
  display: flex;
}

.cellule {
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cellule.erreur {
  background-color: red;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>