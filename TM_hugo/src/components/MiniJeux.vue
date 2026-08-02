<script setup lang="ts">
import { ref } from 'vue'

type Cellule = null | 0 | 1
type Ligne = Cellule[]
type Grille = Ligne[]

const taille = 8
const tailleCase = 80 / taille
const taillechiffre = tailleCase * 0.4

function creerGrilleVide(taille: number): Grille {
  const grille: Grille = []

  for (let i = 0; i < taille; i++) {
    const ligne: Ligne = Array(taille).fill(null)
    grille.push(ligne)
  }

  return grille
}

function changerCellule(indexLigne: number, indexCellule: number) {
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

const grille = ref<Grille>(creerGrilleVide(taille))

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