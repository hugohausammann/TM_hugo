<script setup lang="ts">
type Cellule = null | 0 | 1
type Ligne = Cellule[]
type Grille = Ligne[]

const taille = 4

function creerGrilleVide(taille: number): Grille {
  const grille: Grille = []

  for (let i = 0; i < taille; i++) {
    const ligne: Ligne = Array(taille).fill(null)
    grille.push(ligne)
  }

  return grille
}

const grille: Grille = creerGrilleVide(taille)

const premiereLigne = grille[0]

if (premiereLigne) {
  premiereLigne[0] = 1
}
</script>

<template>
  <div>
    <div v-for="ligne in grille" style="display: flex">
      <div
        v-for="cellule in ligne"
        style="
        border: 1px solid black;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        "
        >
        {{ cellule === null ? "·" : cellule }}
      </div>
    </div>
  </div>
</template>