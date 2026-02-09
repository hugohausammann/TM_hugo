<script setup lang="ts">
import { ref } from 'vue'

// État pour les exercices interactifs
const compteur = ref(0)
const couleurBouton = ref('blue')
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-center mb-12 text-gray-800">
      🎨 Exercices Tailwind CSS
    </h1>

    <!-- ============================================
         EXERCICE 1 : Boutons simples
         ============================================ -->
    <section class="mb-16 bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-blue-600">
        Exercice 1 : Créer des boutons simples
      </h2>
      
      <p class="text-gray-600 mb-6">
        <strong>Consignes :</strong> Crée 3 boutons avec les caractéristiques suivantes :
      </p>
      <ul class="list-disc list-inside text-gray-600 mb-6 space-y-2">
        <li>Bouton 1 : fond bleu, texte blanc, padding moyen, coins arrondis</li>
        <li>Bouton 2 : fond vert, texte blanc, padding plus grand, coins très arrondis</li>
        <li>Bouton 3 : fond rouge, texte blanc, petit padding, coins peu arrondis</li>
      </ul>

      <div class="bg-yellow-50 p-4 rounded mb-6 border-l-4 border-yellow-400">
        <p class="text-sm text-gray-700">
          💡 <strong>Indices :</strong> 
          padding = px-X py-Y | couleurs = bg-blue-500, bg-green-500, bg-red-500 | 
          coins = rounded-sm, rounded-lg, rounded-full
        </p>
      </div>

      <!-- À REMPLIR PAR L'UTILISATEUR -->
      <div class="bg-gray-100 p-6 rounded border-2 border-dashed border-gray-300 flex gap-4 flex-wrap items-center">
        <p class="text-gray-500 italic mb-0 w-full">Ajoute tes boutons ici ↓</p>
        <button class="px-4 py-2 bg-blue-500 rounded-lg text-white">Bouton 1</button>
        <button class="px-6 py-3 bg-green-500 rounded-3xl text-white">Bouton 2</button>
        <button class="px-2 py-1 bg-red-500 rounded text-white">Bouton 3</button>
      </div>
    </section>

    <!-- ============================================
         EXERCICE 2 : Boutons avec survol
         ============================================ -->
    <section class="mb-16 bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-blue-600">
        Exercice 2 : Boutons avec effet au survol
      </h2>
      
      <p class="text-gray-600 mb-6">
        <strong>Consignes :</strong> Crée un bouton qui :
      </p>
      <ul class="list-disc list-inside text-gray-600 mb-6 space-y-2">
        <li>Au repos : fond bleu, coins arrondis (lg), texte blanc</li>
        <li>Au survol : fond violet, coins deviennent plus arrondis (xl ou full), texte gras</li>
        <li>Ajoute une transition smooth (300ms)</li>
      </ul>

      <div class="bg-yellow-50 p-4 rounded mb-6 border-l-4 border-yellow-400">
        <p class="text-sm text-gray-700">
          💡 <strong>Indices :</strong> 
          hover:bg-purple-600 | hover:rounded-full | hover:font-bold | 
          transition-all duration-300
        </p>
      </div>

      <div class="bg-gray-100 p-4 rounded border-2 border-dashed border-gray-300">
        <p class="text-gray-500 italic mb-4">Ajoute ton bouton ici ↓</p>
        <!-- 
          EXERCICE 2 - À FAIRE:
          <button class="...">Survole-moi ! 🎯</button>
        -->
      </div>
    </section>

    <!-- ============================================
         EXERCICE 3 : Bouton avec ombre
         ============================================ -->
    <section class="mb-16 bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-blue-600">
        Exercice 3 : Bouton avec ombre et effet 3D
      </h2>
      
      <p class="text-gray-600 mb-6">
        <strong>Consignes :</strong> Crée un bouton qui a :
      </p>
      <ul class="list-disc list-inside text-gray-600 mb-6 space-y-2">
        <li>Une ombre initiale (shadow-md ou shadow-lg)</li>
        <li>Au survol : l'ombre devient plus grande (shadow-xl)</li>
        <li>Au survol : le bouton monte légèrement (transform -translate-y-1)</li>
      </ul>

      <div class="bg-yellow-50 p-4 rounded mb-6 border-l-4 border-yellow-400">
        <p class="text-sm text-gray-700">
          💡 <strong>Indices :</strong> 
          shadow-md | hover:shadow-xl | hover:-translate-y-1 | transition-all duration-300
        </p>
      </div>

      <div class="bg-gray-100 p-4 rounded border-2 border-dashed border-gray-300">
        <p class="text-gray-500 italic mb-4">Ajoute ton bouton ici ↓</p>
        <!-- 
          EXERCICE 3 - À FAIRE:
          <button class="...">Clique-moi ! ✨</button>
        -->
      </div>
    </section>

    <!-- ============================================
         EXERCICE 4 : Carte (Card)
         ============================================ -->
    <section class="mb-16 bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-blue-600">
        Exercice 4 : Créer une carte (Card)
      </h2>
      
      <p class="text-gray-600 mb-6">
        <strong>Consignes :</strong> Crée une carte avec :
      </p>
      <ul class="list-disc list-inside text-gray-600 mb-6 space-y-2">
        <li>Fond blanc avec ombre</li>
        <li>Coins arrondis</li>
        <li>Padding intérieur</li>
        <li>Un titre (texte gros et gras)</li>
        <li>Une description (texte gris et petit)</li>
        <li>Un bouton à la fin</li>
        <li>Au survol : l'ombre augmente légèrement</li>
      </ul>

      <div class="bg-yellow-50 p-4 rounded mb-6 border-l-4 border-yellow-400">
        <p class="text-sm text-gray-700">
          💡 <strong>Indices :</strong> 
          bg-white | rounded-lg | shadow-md | p-6 | hover:shadow-lg | transition-shadow duration-300
        </p>
      </div>

      <div class="bg-gray-100 p-4 rounded border-2 border-dashed border-gray-300">
        <p class="text-gray-500 italic mb-4">Ajoute ta carte ici ↓</p>
        <!-- 
          EXERCICE 4 - À FAIRE:
          <div class="...">
            <h3 class="...">Titre de la carte</h3>
            <p class="...">Description...</p>
            <button class="...">Lire plus</button>
          </div>
        -->
      </div>
    </section>

    <!-- ============================================
         EXERCICE 5 : Compteur interactif
         ============================================ -->
    <section class="mb-16 bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-blue-600">
        Exercice 5 : Compteur avec boutons
      </h2>
      
      <p class="text-gray-600 mb-6">
        <strong>Consignes :</strong> Crée un compteur qui :
      </p>
      <ul class="list-disc list-inside text-gray-600 mb-6 space-y-2">
        <li>Affiche un nombre (commence à 0)</li>
        <li>A un bouton "+1" pour l'augmenter</li>
        <li>A un bouton "-1" pour le diminuer</li>
        <li>Les boutons changent de couleur au survol</li>
        <li>Le nombre est affiché en gros et en gras</li>
      </ul>

      <div class="bg-yellow-50 p-4 rounded mb-6 border-l-4 border-yellow-400">
        <p class="text-sm text-gray-700">
          💡 <strong>Indices :</strong> 
          Utilise @click="compteur++" et @click="compteur--" | 
          Affiche compteur avec {{ compteur }}
        </p>
      </div>

      <div class="bg-gray-100 p-4 rounded border-2 border-dashed border-gray-300">
        <p class="text-gray-500 italic mb-4">Ajoute ton compteur ici ↓</p>
        <!-- 
          EXERCICE 5 - À FAIRE:
          <div class="...">
            <p class="...">{{ compteur }}</p>
            <button @click="compteur++">+1</button>
            <button @click="compteur--">-1</button>
          </div>
        -->
      </div>
    </section>

    <!-- ============================================
         EXERCICE 6 : Grille responsive
         ============================================ -->
    <section class="mb-16 bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-blue-600">
        Exercice 6 : Grille de cartes responsive
      </h2>
      
      <p class="text-gray-600 mb-6">
        <strong>Consignes :</strong> Crée 3 cartes en ligne (grid) qui :
      </p>
      <ul class="list-disc list-inside text-gray-600 mb-6 space-y-2">
        <li>Sur mobile (petit écran) : 1 carte par ligne</li>
        <li>Sur tablette : 2 cartes par ligne</li>
        <li>Sur desktop : 3 cartes par ligne</li>
        <li>Chaque carte a un titre, description et bouton</li>
        <li>Espacement entre les cartes</li>
      </ul>

      <div class="bg-yellow-50 p-4 rounded mb-6 border-l-4 border-yellow-400">
        <p class="text-sm text-gray-700">
          💡 <strong>Indices :</strong> 
          grid | grid-cols-1 md:grid-cols-2 lg:grid-cols-3 | gap-6
        </p>
      </div>

      <div class="bg-gray-100 p-4 rounded border-2 border-dashed border-gray-300">
        <p class="text-gray-500 italic mb-4">Ajoute ta grille ici ↓</p>
        <!-- 
          EXERCICE 6 - À FAIRE:
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="...">Carte 1</div>
            <div class="...">Carte 2</div>
            <div class="...">Carte 3</div>
          </div>
        -->
      </div>
    </section>

    <!-- ============================================
         DÉFI : Créer ta propre composition
         ============================================ -->
    <section class="mb-16 bg-white p-8 rounded-lg shadow-md border-2 border-green-500">
      <h2 class="text-2xl font-bold mb-4 text-green-600">
        🚀 DÉFI : Composition libre
      </h2>
      
      <p class="text-gray-600 mb-6">
        <strong>Consignes :</strong> À toi d'inventer !
      </p>
      <ul class="list-disc list-inside text-gray-600 mb-6 space-y-2">
        <li>Combine ce que tu as appris (boutons, cartes, grille)</li>
        <li>Crée une section complète avec titre, description et plusieurs éléments</li>
        <li>Utilise Tailwind pour le style (couleurs, espacement, etc)</li>
        <li>Ajoute des interactions (hover, click si tu veux)</li>
        <li>Sois créatif ! 🎨</li>
      </ul>

      <div class="bg-gray-100 p-4 rounded border-2 border-dashed border-gray-300">
        <p class="text-gray-500 italic mb-4">Ajoute ta création ici ↓</p>
        <!-- DÉFI - À FAIRE -->
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Aucun style custom ici ! Tout doit se faire avec Tailwind CSS */
</style>
