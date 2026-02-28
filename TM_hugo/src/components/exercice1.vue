<script setup lang="ts">
import { ref } from 'vue';

const mode = ref<'ligne' | 'colonne' | 'diagonale'>('ligne');

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

function retournerDiagonale() {
  for (let i=0; i<3; i++) {
    const ligne = plateau.value[i];
    if (ligne) {
      ligne[i] = !ligne[i];
    }
  }
}

function gererClick(i: number, j: number) {
  if (mode.value === 'ligne') {
    retournerLigne(i);
  } else if (mode.value === 'colonne') {
    retournerColonne(j);
  } else if (mode.value === 'diagonale') {
    retournerDiagonale();
  }
}
</script>

<template>
  
  
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
      @click="mode = 'diagonale'"
      class="py-2 px-4 bg-purple-500 hover:bg-red-500 text-white rounded"
      > MODE DIAGONALE </button>
    
  <p class="text-xl">Mode actuel : {{ mode }}</p> 
  </div>
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
