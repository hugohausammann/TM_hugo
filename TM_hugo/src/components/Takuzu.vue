<script setup lang="ts">
import { ref } from 'vue'
import { creerGrilleVide, ligneInvalide, obtenirColonne, partieGagnee } from '../takuzu/logique'
import type { Grille } from '../takuzu/types'

const taille = 4
const tailleCase = 80 / taille
const taillechiffre = tailleCase * 0.4


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

  const estInvalide = ligneInvalide(ligne)
  console.log('Ligne invalide :', estInvalide)

  const colonne = obtenirColonne(grille.value, indexCellule)
  const colonneEstInvalide = ligneInvalide(colonne)
  console.log('Colonne invalide :', colonneEstInvalide)

  if (partieGagnee(grille.value)) {
    jeuTermine.value = true
  }
}

const grille = ref<Grille>(creerGrilleVide(taille))
const jeuTermine = ref(false)




</script>

<template>
  <div class="page">
    <div>
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
    <p v-if="jeuTermine">VICTOIRE, jeu terminé !</p>

  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
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
</style>