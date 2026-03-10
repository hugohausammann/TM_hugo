<script setup lang="ts">
import { ref } from 'vue';

const mode = ref<'ligne' | 'colonne' | 'diagonale 1' | 'diagonale 2'>('ligne');

const coups = ref(0);

const victoire = ref(false);

const plateau = ref([
  [true, false, true],
  [false, false, true],
  [false, false, false]
]);

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

  } coups.value++;
}




</script>

<template>
  
  <div class="flex justify-center items-start p-8 bg-gray-200">
    <h2 class="text-2xl font-bold mb-4">Exercice 1 : Plateau de jeu</h2>
  </div>

  <div class="flex justify-center items-start p-10 bg-gray-200">
    <p v-if="victoire" class="text-pink-500 font-bold text-xl mt-4">
      🎉 Bravo ! Tu as gagné en {{ coups }} coups !
    </p>
  </div>

  <div class="flex items-center justify-center h-screen bg-gray-200 gap-4">
    
    

    <div class="mb-4 flex gap-4">
    <button
      @click="mode = 'ligne'"
      class="py-2 px-4 bg-blue-500 hover:bg-red-500 text-white rounded"
      
    > MODE LIGNE </button>
    <button
      @click="mode = 'colonne'"
      class="py-2 px-4 bg-green-500 hover:bg-red-500 text-white rounded"
    > MODE COLONNE </button>

    <button
      @click="mode = 'diagonale 1'"
      class="py-2 px-4 bg-purple-500 hover:bg-red-500 text-white rounded"
      > MODE DIAGONALE 1 </button>

    <button
      @click="mode = 'diagonale 2'"
      class="py-2 px-4 bg-orange-500 hover:bg-red-500 text-white rounded"
      > MODE DIAGONALE 2 </button>
    
  <p class="text-xl">Mode actuel : {{ mode }}</p> 
  </div>
    <p class="mb-2"> Nombre de coupes : {{ coups }}</p>
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
          class="w-20 h-20 border rounded-full"
          :class="caseValue ? 'bg-black' : 'bg-white'"
          >
        </div>
      </div>
    </div>
  </div>

</template>
