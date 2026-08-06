<script setup lang="ts">
import { computed,ref } from 'vue'
import { creerGrilleVide, partieGagnee, creerGrilleAleatoire } from '../takuzu/logique'
import type { Grille } from '../takuzu/types'

const taille = ref(4)

const tailleCase = computed(() => 80 / taille.value)
const taillechiffre = computed(() => tailleCase.value * 0.4)

const grille = ref<Grille>(creerGrilleVide(taille.value))


function changerCellule(indexLigne: number, indexCellule: number) {
  if (jeuTermine.value) {
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
  grille.value = creerGrilleVide(taille.value)
  jeuTermine.value = false
  messageValidation.value = ''
}

function genererGrille() {
  if (jeuTermine.value) {
    return
  }
  grille.value = creerGrilleAleatoire(taille.value)
  jeuTermine.value = false
  messageValidation.value = ''
}

function validerPartie() {
  if (partieGagnee(grille.value)) {
    jeuTermine.value = true
    messageValidation.value = 'Félicitations, vous avez gagné !'
  } else {
    messageValidation.value = 'La partie n\'est pas encore terminée.'
  }
}

const jeuTermine = ref(false)
const messageValidation = ref('')




</script>

<template>
  <div class="page">
    <div>
      <label>
        Taille de la grille :

        <select
          v-model.number="taille"
          @change="recommencer"
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

    <button @click="validerPartie">Valider</button>
    <button @click="recommencer">Recommencer</button>
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

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>