import type { Grille, Ligne } from './types'

export function creerGrilleVide(taille: number): Grille {
  const grille: Grille = []

  for (let i = 0; i < taille; i++) {
    const ligne: Ligne = Array(taille).fill(null)
    grille.push(ligne)
  }

  return grille
}


function compterZeros(ligne: Ligne): number {
  let nombreDeZeros = 0

  for (const cellule of ligne) {
    if (cellule === 0) {
      nombreDeZeros++
    }
  }

  return nombreDeZeros
}

function compterUns(ligne: Ligne): number {
  let nombreDeUns = 0

  for (const cellule of ligne) {
    if (cellule === 1) {
      nombreDeUns++
    }
  }

  return nombreDeUns
}

function contientTroisConsecutifs(ligne: Ligne): boolean {
  for (let i = 0; i < ligne.length - 2; i++) {
    const cellule1 = ligne[i]
    const cellule2 = ligne[i + 1]
    const cellule3 = ligne[i + 2]

    if (
      cellule1 !== null &&
      cellule1 === cellule2 &&
      cellule2 === cellule3
    ) {
      return true
    }
  }

  return false
}

function contientTropDeValeurs(
  ligne: Ligne,
  tailleComplete: number = ligne.length
): boolean {
  const maximum = tailleComplete / 2

  return (
    compterZeros(ligne) > maximum ||
    compterUns(ligne) > maximum
  )
}

export function ligneInvalide(
  ligne: Ligne,
  tailleComplete: number = ligne.length
): boolean {
  return (
    contientTroisConsecutifs(ligne) ||
    contientTropDeValeurs(ligne, tailleComplete)
  )
}


export function obtenirColonne(
  grille: Grille,
  indexColonne: number
): Ligne {
  const colonne: Ligne = []

  for (const ligne of grille) {
    const cellule = ligne[indexColonne]

    if (cellule !== undefined) {
      colonne.push(cellule)
    }
  }

  return colonne
}


function contientLigneInvalide(grille: Grille): boolean {
  for (const ligne of grille) {
    if (ligneInvalide(ligne)) {
      return true
    }
  }

  return false
}

function contientColonneInvalide(grille: Grille): boolean {
  const tailleComplete = grille[0]?.length ?? 0

  for (
    let indexColonne = 0;
    indexColonne < tailleComplete;
    indexColonne++
  ) {
    const colonne = obtenirColonne(grille, indexColonne)

    if (ligneInvalide(colonne, tailleComplete)) {
      return true
    }
  }

  return false
}

function grilleInvalide(grille: Grille): boolean {
  return (
    contientLigneInvalide(grille) ||
    contientColonneInvalide(grille) ||
    contientLignesIdentiques(grille) ||
    contientColonnesIdentiques(grille)
  )
}

function grilleComplete(grille: Grille): boolean {
  for (const ligne of grille) {
    for (const cellule of ligne) {
      if (cellule === null) {
        return false
      }
    }
  }

  return true
}

export function partieGagnee(grille: Grille): boolean {
  return grilleComplete(grille) && !grilleInvalide(grille)
}

function ligneComplete(ligne: Ligne): boolean {
  for (const cellule of ligne) {
    if (cellule === null) {
      return false
    }
  }

  return true
}

function lignesIdentiques(ligne1: Ligne, ligne2: Ligne): boolean {
  for (let i = 0; i < ligne1.length; i++) {
    if (ligne1[i] !== ligne2[i]) {
      return false
    }
  }

  return true
}

function contientLignesIdentiques(grille: Grille): boolean {
  for (let i = 0; i < grille.length; i++) {
    for (let j = i + 1; j < grille.length; j++) {
      const ligne1 = grille[i]
      const ligne2 = grille[j]

      if (!ligne1 || !ligne2) {
        continue
      }

      if (
        ligneComplete(ligne1) &&
        ligneComplete(ligne2) &&
        lignesIdentiques(ligne1, ligne2)
      ) {
        return true
      }
    }
  }

  return false
}

function contientColonnesIdentiques(grille: Grille): boolean {
  for (let i = 0; i < grille.length; i++) {
    for (let j = i + 1; j < grille.length; j++) {
      const colonne1 = obtenirColonne(grille, i)
      const colonne2 = obtenirColonne(grille, j)

      if (
        ligneComplete(colonne1) &&
        ligneComplete(colonne2) &&
        lignesIdentiques(colonne1, colonne2)
      ) {
        return true
      }
    }
  }

  return false
}

function creerLigneEquilibree(taille: number): Ligne {
  let ligne: Ligne = []
  const moitie = taille / 2

  do {
    ligne = []

    for (let i = 0; i < moitie; i++) {
      ligne.push(0)
    }

    for (let i = 0; i < moitie; i++) {
      ligne.push(1)
    }

    melangerLigne(ligne)
  } while (ligneInvalide(ligne))

  return ligne
}

function echangerCellules(
  ligne: Ligne,
  indexA: number,
  indexB: number
) {
  const celluleA = ligne[indexA]
  const celluleB = ligne[indexB]

  if (celluleA === undefined || celluleB === undefined) {
    return
  }

  ligne[indexA] = celluleB
  ligne[indexB] = celluleA
}

function melangerLigne(ligne: Ligne) {
  for (let i = 0; i < ligne.length; i++) {
    const indexA = Math.floor(Math.random() * ligne.length)
    const indexB = Math.floor(Math.random() * ligne.length)

    echangerCellules(ligne, indexA, indexB)
  }
}

export function creerGrilleAleatoire(taille: number): Grille {
  while (true) {
    const grille: Grille = []
    let nombreEssais = 0
    const maximumEssais = 1000

    while (
      grille.length < taille &&
      nombreEssais < maximumEssais
    ) {
      const nouvelleLigne = creerLigneEquilibree(taille)

      if (ligneDejaPresente(grille, nouvelleLigne)) {
        nombreEssais++
        continue
      }

      grille.push(nouvelleLigne)

      if (contientColonneInvalide(grille)) {
        grille.pop()
        nombreEssais++
      } else {
        nombreEssais = 0
      }
    }

    // PREMIER BOUT : immédiatement après la boucle while intérieure
    if (grille.length < taille) {
      continue
    }

    // DEUXIÈME BOUT : juste après le test précédent
    if (contientColonnesIdentiques(grille)) {
      continue
    }

    return grille
  }
}

function ligneDejaPresente(
  grille: Grille,
  ligneCandidate: Ligne
): boolean {
  for (const ligneExistante of grille) {
    if (lignesIdentiques(ligneExistante, ligneCandidate)) {
      return true
    }
  }

  return false
}