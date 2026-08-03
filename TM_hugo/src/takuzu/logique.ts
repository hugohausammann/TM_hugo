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

function contientTropDeValeurs(ligne: Ligne): boolean {
  const maximum = ligne.length / 2
  const nombreDeZeros = compterZeros(ligne)
  const nombreDeUns = compterUns(ligne)

  if (nombreDeZeros > maximum) {
    return true
  }

  if (nombreDeUns > maximum) {
    return true
  }

  return false
}

export function ligneInvalide(ligne: Ligne): boolean {
  return (
    contientTroisConsecutifs(ligne) ||
    contientTropDeValeurs(ligne)
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
  for (let indexColonne = 0; indexColonne < grille.length; indexColonne++) {
    const colonne = obtenirColonne(grille, indexColonne)

    if (ligneInvalide(colonne)) {
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