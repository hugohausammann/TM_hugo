<script setup lang="ts">
import { computed, ref } from 'vue';

const mode = ref<'ligne' | 'colonne' | 'diagonale 1' | 'diagonale 2'>('ligne');

const coups = ref(0);

const victoire = ref(false);

const ligne = [
  Math.random() < 0.5,
  Math.random() < 0.5,
  Math.random() < 0.5  
];

const plateau = ref(genererPlateau());

const jetons_restants = computed(() => {
  let count = 0;
  for (const ligne of plateau.value) {
    for (const caseValue of ligne) {
      if (!caseValue) {
        count++;
      }
    }
  }
  return count;
});

const hover = ref<{ i: number, j: number } | null>(null);

const sonVictoire = new Audio('/son/victoire.mp3');

function genererPlateau() {return [
  [
    Math.random() > 0.5,
    Math.random() > 0.5,
    Math.random() > 0.5
  ],
  [
    Math.random() > 0.5,
    Math.random() > 0.5,
    Math.random() > 0.5
  ],
  [
    Math.random() > 0.5,
    Math.random() > 0.5,
    Math.random() > 0.5
  ]
];}

function recommencer() {
  plateau.value = genererPlateau();
  coups.value = 0;
  victoire.value = false;
}

function retournerLigne(index: number) {
  const ligne = plateau.value[index];
  if (ligne) {
    for (let i=0; i < 3; i++) {
      ligne[i] = !ligne[i];
    }
  }
}

function retournerColonne(index: number) {
  for (let i=0; i < 3; i++) {
    const ligne = plateau.value[i];
    if (ligne) {
      ligne[index] = !ligne[index];
    }
  }
}

function retournerDiagonale1() {
  for (let i=0; i<3; i++) {
    const ligne = plateau.value[i];
    if (ligne) {
      ligne[i] = !ligne[i];
    }
  }
}

function retournerDiagonale2() {
  for (let i=0; i<3; i++) {
    const ligne = plateau.value[i];
    if (ligne) {
      ligne[2 - i] = !ligne[2 - i];
    }
  }
}

function verifierVictoire() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const ligne = plateau.value[i];
      if (!ligne || !ligne[j]) {
        return false;
      }

    }
  }

  return true;
}

function gererClick(i: number, j: number) {
  if (victoire.value) return;
  
  if (mode.value === 'ligne') {
    retournerLigne(i);
  
  } else if (mode.value === 'colonne') {
    retournerColonne(j);
  
  } else if (mode.value === 'diagonale 1') {
    retournerDiagonale1();
  
  } else if (mode.value === 'diagonale 2') {
    retournerDiagonale2();
  
  } if (verifierVictoire()) {
    victoire.value = true;
    sonVictoire.currentTime = 0;
    sonVictoire.play();

  } coups.value++;
}

function estSurbrille(i: number, j: number) {
  if (!hover.value) return false;

  if (mode.value === 'ligne') {
    return hover.value.i === i;
  }

  if (mode.value === 'colonne') {
    return hover.value.j === j;
  }

  if (mode.value === 'diagonale 1') {
    return i === j;
  }

  if (mode.value === 'diagonale 2') {
    return i + j === 2;
  }

  return false;
}


</script>

<template>

  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-200 gap-6 p-8">

    <!-- Titre -->
    <h2 class="text-2xl font-bold">
      Exercice 1 : Plateau de jeu
    </h2>

    <!-- Boutons -->
    <div class="flex gap-4">
      <button
        @click="mode = 'ligne'"
        class="py-2 px-4 bg-blue-500 hover:bg-red-500 text-white rounded"
        :class="mode === 'ligne' ? 'ring-4 ring-yellow-300 scale-105' : ''"      
        >
        MODE LIGNE
      </button>

      <button
        @click="mode = 'colonne'"
        class="py-2 px-4 bg-green-500 hover:bg-red-500 text-white rounded"
        :class="mode === 'colonne' ? 'ring-4 ring-yellow-300 scale-105' : ''"
        >
        MODE COLONNE
      </button>

      <button
        @click="mode = 'diagonale 1'"
        class="py-2 px-4 bg-purple-500 hover:bg-red-500 text-white rounded"
        :class="mode === 'diagonale 1' ? 'ring-4 ring-yellow-300 scale-105' : ''"
      >
        MODE DIAGONALE 1
      </button>

      <button
        @click="mode = 'diagonale 2'"
        class="py-2 px-4 bg-orange-500 hover:bg-red-500 text-white rounded"
        :class="mode === 'diagonale 2' ? 'ring-4 ring-yellow-300 scale-105' : ''"
      >
        MODE DIAGONALE 2
      </button>

      <button
        @click="recommencer"
        class="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded"
      >
        RECOMMENCER
      </button>
    </div>

    <!-- Mode actuel -->
    <p class="text-xl">
      Mode actuel : {{ mode }}
    </p>

    <!-- Compteur -->
    <p>
      Nombre de coups : {{ coups }}
    </p>

    <!-- Grille -->
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="(ligne, i) in plateau"
        :key="i"
        class="contents"
      >
        <div
          v-for="(caseValue, j) in ligne"
          :key="j"
          @click="gererClick(i, j)"
          @mouseenter="hover = { i, j }"
          @mouseleave="hover = null"
          class="w-20 h-20 border rounded-full cursor-pointer"
          :class="[caseValue ? 'bg-black' : 'bg-white', estSurbrille(i, j) ? 'ring-4 ring-yellow-300' : '']"
        ></div>
      </div>
    </div>

    <!-- Message victoire -->
    <p v-if="victoire" class="text-pink-500 font-bold text-xl">
      🎉 Bravo ! Tu as gagné en {{ coups }} coups !
    </p>

    {{ jetons_restants }} jetons restants

  </div>

</template>
