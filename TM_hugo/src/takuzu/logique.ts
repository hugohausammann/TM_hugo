import type { Grille, Ligne } from './types'

export function creerGrilleVide(taille: number): Grille {
  const grille: Grille = []

  for (let i = 0; i < taille; i++) {
    grille.push(Array(taille).fill(null))
  }

  return grille
}

function compterValeur(ligne: Ligne, valeur: 0 | 1): number {
  let total = 0

  for (const cellule of ligne) {
    if (cellule === valeur) {
      total++
    }
  }

  return total
}

function contientTroisConsecutifs(ligne: Ligne): boolean {
  for (let i = 0; i < ligne.length - 2; i++) {
    const cellule = ligne[i]

    if (
      cellule !== null &&
      cellule === ligne[i + 1] &&
      cellule === ligne[i + 2]
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
    compterValeur(ligne, 0) > maximum ||
    compterValeur(ligne, 1) > maximum
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
  const taille = grille[0]?.length ?? 0

  for (let i = 0; i < taille; i++) {
    const colonne = obtenirColonne(grille, i)

    if (ligneInvalide(colonne, taille)) {
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

function ligneComplete(ligne: Ligne): boolean {
  for (const cellule of ligne) {
    if (cellule === null) {
      return false
    }
  }

  return true
}

export function grilleComplete(grille: Grille): boolean {
  for (const ligne of grille) {
    if (!ligneComplete(ligne)) {
      return false
    }
  }

  return true
}

export function partieGagnee(grille: Grille): boolean {
  return grilleComplete(grille) && !grilleInvalide(grille)
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
      ligne.push(0, 1)
    }

    melangerLigne(ligne)
  } while (ligneInvalide(ligne))

  return ligne
}

function melangerLigne(ligne: Ligne) {
  for (let i = 0; i < ligne.length; i++) {
    const indexA = Math.floor(Math.random() * ligne.length)
    const indexB = Math.floor(Math.random() * ligne.length)

    const celluleA = ligne[indexA]
    const celluleB = ligne[indexB]

    if (celluleA === undefined || celluleB === undefined) {
      continue
    }

    ligne[indexA] = celluleB
    ligne[indexB] = celluleA
  }
}

function ligneDejaPresente(
  grille: Grille,
  ligneCandidate: Ligne
): boolean {
  for (const ligne of grille) {
    if (lignesIdentiques(ligne, ligneCandidate)) {
      return true
    }
  }

  return false
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

    if (
      grille.length < taille ||
      contientColonnesIdentiques(grille)
    ) {
      continue
    }

    return grille
  }
}

function essayerEnleverCase(grille: Grille): boolean {
  const i = Math.floor(Math.random() * grille.length)
  const j = Math.floor(Math.random() * grille.length)

  const ligne = grille[i]

  if (!ligne || ligne[j] === null) {
    return false
  }

  const valeur = ligne[j]
  ligne[j] = null

  if (grilleResoluble(grille)) {
    return true
  }

  if (valeur !== undefined && valeur !== null) {
    ligne[j] = valeur
  }
  return false
}

export function creerGrilleJeu(
  solution: Grille,
  nombreCasesVides: number
): Grille {
  while (true) {
    const grille = solution.map(ligne => [...ligne])
    let casesRetirees = 0
    let essais = 0

    while (casesRetirees < nombreCasesVides && essais < 500) {
      if (essayerEnleverCase(grille)) {
        casesRetirees++
        essais = 0
      } else {
        essais++
      }
    }

    if (casesRetirees === nombreCasesVides) {
      return grille
    }
  }
}

export function ligneAvecErreur(
  grille: Grille,
  indexLigne: number
): boolean {
  const ligne = grille[indexLigne]

  if (!ligne) {
    return false
  }

  return (
    ligneInvalide(ligne) ||
    ligneEnDouble(grille, indexLigne)
  )
}

export function colonneAvecErreur(
  grille: Grille,
  indexColonne: number
): boolean {
  const colonne = obtenirColonne(grille, indexColonne)

  return (
    ligneInvalide(colonne) ||
    colonneEnDouble(grille, indexColonne)
  )
}

function ligneEnDouble(
  grille: Grille,
  indexLigne: number
): boolean {
  const ligne = grille[indexLigne]

  if (!ligne) {
    return false
  }

  for (let i = 0; i < grille.length; i++) {
    if (i === indexLigne) {
      continue
    }

    const autreLigne = grille[i]

    if (
      autreLigne &&
      lignesIdentiques(ligne, autreLigne)
    ) {
      return true
    }
  }

  return false
}

function colonneEnDouble(
  grille: Grille,
  indexColonne: number
): boolean {
  const nombreColonnes = grille[0]?.length ?? 0
  const colonne = obtenirColonne(grille, indexColonne)

  for (let i = 0; i < nombreColonnes; i++) {
    if (i === indexColonne) {
      continue
    }

    const autreColonne = obtenirColonne(grille, i)

    if (lignesIdentiques(colonne, autreColonne)) {
      return true
    }
  }

  return false
}

function remplirUneCase(grille: Grille): boolean {
  for (const ligne of grille) {
    for (let i = 0; i < ligne.length; i++) {

      if (ligne[i] === null) {
        ligne[i] = 0
        const zeroValide = !grilleInvalide(grille)

        ligne[i] = 1
        const unValide = !grilleInvalide(grille)

        ligne[i] = null

        if (zeroValide && !unValide) {
          ligne[i] = 0
          return true
        }

        if (unValide && !zeroValide) {
          ligne[i] = 1
          return true
        }
      }
    }
  }

  return false
}

function grilleResoluble(grille: Grille): boolean {
  const copie = grille.map(ligne => [...ligne])

  while (remplirUneCase(copie)) {
  }

  return grilleComplete(copie)
}