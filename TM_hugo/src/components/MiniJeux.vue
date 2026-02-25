<script setup lang="ts">
import { computed, ref } from 'vue';

const compteur = ref(0);

const trop=computed(() => {
  return compteur.value > 10;
});


function alert() {
compteur.value++;
}
</script>

<template>
  <div class="mini-jeux">
    <h2 class="text-2xl">Mini Jeux</h2>
    <p>Bienvenue dans la section des mini jeux !</p>
    <!-- Ajoutez ici vos mini jeux -->
<button 
class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
@click="alert()">Mini Jeu {{ compteur }}</button>
<p v-if="trop">Trop de clics !</p>
</div>
</template>

