<script setup lang="ts">
import { computed, ref } from 'vue';

const grille  = [
  [1, 2],
  [3, 4]
]
</script>

<template>

<div v-for="ligne in grille">
  <span v-for="cellule in ligne">
    {{ cellule }}
  </span>
</div>

</template>
