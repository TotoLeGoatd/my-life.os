// All personal data stays scoped to this browser's local storage.
const STORAGE_KEY = "mylifeos.data.v1";
const CATEGORIES = ["Intelligence", "Maisongaudino", "Sport", "Discipline", "Vie sociale & autonomie"];
const NOTE_TYPES = ["Note", "Idée", "Découverte", "Citation", "Apprentissage"];

const ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  brain: '<path d="M9 4.5a3 3 0 0 0-5.5 1.7A3.5 3.5 0 0 0 4 13a3.5 3.5 0 0 0 4.5 5.2A3 3 0 0 0 12 20V5a2.5 2.5 0 0 0-3-2.5Z"/><path d="M15 4.5a3 3 0 0 1 5.5 1.7A3.5 3.5 0 0 1 20 13a3.5 3.5 0 0 1-4.5 5.2A3 3 0 0 1 12 20V5a2.5 2.5 0 0 1 3-2.5Z"/><path d="M8 8h.01M7 14h.01m10-6h.01m1 6h.01M12 8h.01M12 14h.01"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/><path d="M19 9h-4m4 0v4"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5m5-5v12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  idea: '<path d="M9 18h6m-5 4h4m-2-20a7 7 0 0 0-4 12.7c.6.4 1 1 1 1.8h6c0-.8.4-1.4 1-1.8A7 7 0 0 0 12 2Z"/>',
  discovery: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/>',
  quote: '<path d="M3 21c3-1 5-3.5 5-7V5H2v7h4c0 2-1 3-3 4v5Zm13 0c3-1 5-3.5 5-7V5h-6v7h4c0 2-1 3-3 4v5Z"/>',
  learning: '<path d="m3 7 9-4 9 4-9 4-9-4Z"/><path d="M7 9v5c3 3 7 3 10 0V9m5-2v7"/><path d="M22 14v4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
  trash: '<path d="M3 6h18m-2 0-.9 14H5.9L5 6m4 0V4h6v2m-5 4v6m4-6v6"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
  flame: '<path d="M12 22a7 7 0 0 0 7-7c0-3-2-5-4-7-.2 2-1 3-2 3-1-3-3-6-5-8 0 4-1 6-3 9a7 7 0 0 0 7 10Z"/><path d="M10 18a2.5 2.5 0 0 0 5 0c0-1.3-.8-2.2-2.5-3.5-.2 1.2-1 1.7-1.5 1.7-.3-.8-.6-1.4-1-1.9-.3 1-.8 2-.8 3.7Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5m-18 5 9 5 9-5"/>',
  spark: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z"/><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};

const CHALLENGE_PLANS = [
  {
    category: "Intelligence", code: "intel", tasks: [
      (n) => ({ title: `Lis ${[20, 22, 25, 27, 30][n]} pages`, description: "Garde une idée qui t’a marqué." }),
      (n) => ({ title: `Apprends ${[5, 6, 8, 10, 12][n]} mots dans une langue`, description: "Essaie de les glisser dans une phrase." }),
      (n) => ({ title: `Résume un article en ${3 + n} phrases`, description: "Raconte l’essentiel avec tes mots." }),
      (n) => ({ title: `Écoute un podcast pendant ${10 + n * 5} min`, description: "Note un fait que tu ne connaissais pas." }),
      (n) => ({ title: `Mémorise ${5 + n * 2} notions`, description: "Récite-les sans rouvrir tes notes." }),
      (n) => ({ title: `Fais ${5 + n * 2} exercices d’un cours`, description: "Prends le temps de vérifier tes réponses." }),
      (n) => ({ title: `Concentre-toi ${10 + n * 5} min sur un sujet`, description: "Garde une seule question devant toi." }),
      (n) => ({ title: `Écris ${100 + n * 50} mots sur ce que tu apprends`, description: "Explique-le comme à un ami." }),
      () => ({ title: "Lis un chapitre d’un livre", description: "Marque une phrase que tu veux retrouver." }),
      () => ({ title: "Résous une énigme ou un sudoku", description: "Va jusqu’à la solution." }),
      (n) => ({ title: `Apprends ${1 + n} règle${n ? "s" : ""} de grammaire`, description: "Mets chaque règle dans une phrase." }),
      () => ({ title: "Compare deux points de vue sur un sujet", description: "Qu’est-ce qui distingue leurs arguments ?" }),
      () => ({ title: "Relis une ancienne note", description: "Ajoute ce que tu comprends aujourd’hui." }),
      () => ({ title: "Explique un concept à voix haute", description: "Essaie de le dire sans jargon." }),
      (n) => ({ title: `Regarde une leçon de ${10 + n * 5} min`, description: "Note ce que tu retiens vraiment." }),
      (n) => ({ title: `Fais un quiz de ${5 + n * 2} questions`, description: "Cache les réponses et tente le quiz." }),
      (n) => ({ title: `Apprends ${2 + n} raccourcis clavier`, description: "Choisis ceux qui te feront gagner du temps." }),
      (n) => ({ title: `Crée une carte mentale en ${3 + n} branches`, description: "Dessine les liens qui te viennent." }),
      (n) => ({ title: `Révise ${5 + n * 2} cartes mémoire`, description: "Retourne chaque carte après ta réponse." }),
      (n) => ({ title: `Étudie une compétence pendant ${10 + n * 5} min`, description: "Essaie-la au lieu de juste regarder." }),
      () => ({ title: "Vérifie une information avec deux sources", description: "Garde les deux liens pour y revenir." }),
      (n) => ({ title: `Résous ${5 + n * 2} calculs de tête`, description: "Fais le calcul, puis vérifie." }),
      (n) => ({ title: `Écoute ${10 + n * 5} min dans une autre langue`, description: "Repère les mots que tu reconnais." }),
      (n) => ({ title: `Fais une synthèse en ${3 + n} phrases`, description: "Fais tenir l’idée en quelques lignes." }),
      () => ({ title: "Compare deux méthodes pour apprendre", description: "Laquelle te convient le mieux ?" }),
      () => ({ title: "Écris une question à approfondir", description: "Commence par une recherche courte." }),
      (n) => ({ title: `Apprends ${3 + n} termes sur un nouveau sujet`, description: "Essaie d’en donner un exemple concret." }),
      () => ({ title: "Rappelle de mémoire ce que tu as lu", description: "Écris ce qui te revient, puis vérifie." }),
      () => ({ title: "Résous une énigme logique", description: "Raconte ton raisonnement étape par étape." }),
      (n) => ({ title: `Explore un sujet nouveau pendant ${10 + n * 5} min`, description: "Note la question qui t’est venue." })
    ]
  },
  {
    category: "Maisongaudino", code: "brand", tasks: [
      (n) => ({ title: `Dessine un t-shirt ${["classique", "oversize", "sport", "minimaliste", "signature"][n]}`, description: "Fais apparaître le col, les manches et la coupe." }),
      (n) => ({ title: `Crée un moodboard avec ${5 + n * 2} images`, description: "Garde les images qui donnent le ton." }),
      (n) => ({ title: `Choisis ${3 + n} couleurs pour une pièce`, description: "Vérifie qu’elles vont bien ensemble." }),
      () => ({ title: "Dessine le devant et le dos d’un t-shirt", description: "Ajoute un détail qui le rend reconnaissable." }),
      (n) => ({ title: `Esquisse ${1 + n} logo${n ? "s" : ""} pour Maisongaudino`, description: "Essaie aussi une version en noir et blanc." }),
      (n) => ({ title: `Compare ${2 + n} coupes de t-shirt`, description: "Garde celle qui colle le mieux à l’univers." }),
      () => ({ title: "Imagine une pièce signature", description: "Qu’est-ce qui la rendrait reconnaissable ?" }),
      (n) => ({ title: `Repère ${3 + n * 2} matières pour un t-shirt`, description: "Pense au toucher, au confort et à l’usage." }),
      () => ({ title: "Photographie un détail qui t’inspire", description: "Garde-le comme référence pour un futur design." }),
      (n) => ({ title: `Écris une fiche produit de ${50 + n * 25} mots`, description: "Décris la coupe comme si tu la présentais à quelqu’un." }),
      () => ({ title: "Crée une étiquette pour un vêtement", description: "Essaie avec le nom de la marque et un symbole." }),
      (n) => ({ title: `Dessine ${2 + n} variantes d’un même col`, description: "Regarde-les côte à côte et choisis." }),
      () => ({ title: "Prépare une photo ou un post pour la marque", description: "Choisis une image et trouve-lui une légende." }),
      (n) => ({ title: `Étudie ${2 + n} marques de vêtements`, description: "Qu’est-ce que tu pourrais faire à ta façon ?" }),
      () => ({ title: "Fixe la prochaine étape de Maisongaudino", description: "Choisis une chose à faire cette semaine." }),
      (n) => ({ title: `Décris ${2 + n} personnes qui porteraient la marque`, description: "Imagine leur quotidien et ce qu’elles recherchent." }),
      (n) => ({ title: `Écris ${2 + n} idées de slogan`, description: "Lis-les à voix haute et garde ta préférée." }),
      () => ({ title: "Prépare une fiche technique de t-shirt", description: "Rassemble coupe, matière et finitions." }),
      (n) => ({ title: `Dessine ${2 + n} variantes d’un vêtement`, description: "Change un seul détail à chaque fois." }),
      () => ({ title: "Choisis une matière pour un t-shirt", description: "Pense au confort et à l’entretien." }),
      (n) => ({ title: `Repère ${2 + n} marques au même positionnement`, description: "Qu’est-ce qui pourrait distinguer la tienne ?" }),
      () => ({ title: "Imagine l’emballage d’une commande", description: "Dessine une version simple, sans te compliquer." }),
      (n) => ({ title: `Planifie ${2 + n} publications pour la marque`, description: "Donne un sujet différent à chacune." }),
      () => ({ title: "Demande un avis sur une idée de t-shirt", description: "Montre le dessin et pose une question précise." }),
      () => ({ title: "Crée une page de présentation de la marque", description: "Une phrase, un visuel, et c’est déjà un début." }),
      () => ({ title: "Nomme une mini-collection", description: "Trouve un nom qui lui ressemble." }),
      (n) => ({ title: `Imagine ${2 + n} détails de finition`, description: "Garde ceux qui pourraient devenir la signature." }),
      (n) => ({ title: `Compare ${2 + n} prix de t-shirts`, description: "Regarde la matière et la qualité autant que le prix." }),
      () => ({ title: "Prépare une séance photo produit", description: "Choisis un fond, une lumière et un angle." }),
      () => ({ title: "Écris l’histoire d’une pièce Maisongaudino", description: "Raconte d’où vient l’idée." }),
      (n) => ({ title: `Liste ${3 + n} étapes pour sortir une pièce`, description: "Entoure celle que tu peux commencer maintenant." })
    ]
  },
  {
    category: "Sport", code: "sport", tasks: [
      (n) => ({ title: `Fais ${[20, 22, 25, 28, 30][n]} pompes`, description: "En plusieurs fois ou sur les genoux, comme tu préfères." }),
      (n) => ({ title: `Fais ${[20, 25, 30, 35, 40][n]} squats`, description: "Prends ton temps, garde le mouvement confortable." }),
      (n) => ({ title: `Marche ${20 + n * 5} minutes`, description: "Un tour du quartier suffit." }),
      (n) => ({ title: `Tiens la planche ${[30, 40, 50, 60, 75][n]} secondes`, description: "Tu peux la faire en plusieurs fois." }),
      (n) => ({ title: `Fais ${10 + n * 2} fentes par jambe`, description: "Réduis l’amplitude si ça tire." }),
      (n) => ({ title: `Fais ${10 + n * 2} minutes de mobilité`, description: "Quelques mouvements lents suffisent." }),
      (n) => ({ title: `Fais ${15 + n * 5} ponts fessiers`, description: "Monte et redescends sans te presser." }),
      (n) => ({ title: `Fais ${20 + n * 5} jumping jacks`, description: "Tu peux remplacer les sauts par des pas de côté." }),
      (n) => ({ title: `Tiens la chaise ${[30, 40, 50, 60, 75][n]} secondes`, description: "Arrête-toi dès que tu en as besoin." }),
      (n) => ({ title: `Pédale ou marche vite ${20 + n * 5} minutes`, description: "Choisis ce qui te fait le plus envie." }),
      (n) => ({ title: `Fais ${10 + n * 2} relevés de bassin par jambe`, description: "Garde un rythme qui te convient." }),
      (n) => ({ title: `Tiens l’équilibre ${20 + n * 5} secondes par côté`, description: "Un mur à proximité peut aider." }),
      (n) => ({ title: `Fais ${5 + n} salutations au soleil`, description: "Va à ton rythme, sans forcer les étirements." }),
      (n) => ({ title: `Fais ${10 + n * 5} minutes de récupération active`, description: "Une marche tranquille fait l’affaire." }),
      (n) => ({ title: `Fais ${10 + n * 2} dead bugs par côté`, description: "Garde le dos au sol et prends ton temps." }),
      (n) => ({ title: `Fais ${8 + n * 2} pompes inclinées`, description: "Un mur ou un plan de travail stable suffit." }),
      (n) => ({ title: `Tiens la planche latérale ${15 + n * 5} sec par côté`, description: "Pose un genou au sol si c’est plus confortable." }),
      (n) => ({ title: `Fais ${8 + n * 2} bird dogs par côté`, description: "Alterner lentement bras et jambe." }),
      (n) => ({ title: `Danse ou bouge pendant ${10 + n * 5} min`, description: "Mets une musique que tu aimes." }),
      (n) => ({ title: `Fais ${8 + n * 2} montées de genoux par jambe`, description: "Choisis une hauteur qui te convient." }),
      (n) => ({ title: `Fais ${10 + n * 2} extensions mollets`, description: "Prends appui sur une chaise si besoin." }),
      (n) => ({ title: `Marche à bon rythme pendant ${15 + n * 5} min`, description: "Ralentis quand tu en as besoin." }),
      (n) => ({ title: `Fais ${8 + n * 2} relevés de buste contrôlés`, description: "Pas besoin de monter très haut." }),
      (n) => ({ title: `Fais ${10 + n * 2} extensions de bras avec une bouteille`, description: "Une petite bouteille suffit." }),
      (n) => ({ title: `Étire-toi doucement pendant ${5 + n * 2} min`, description: "Arrête si tu ressens une douleur." }),
      (n) => ({ title: `Fais ${8 + n * 2} squats sur chaise`, description: "Choisis une chaise bien stable." }),
      (n) => ({ title: `Fais ${10 + n * 2} rotations d’épaules`, description: "Fais des cercles faciles, sans tirer." }),
      (n) => ({ title: `Fais ${8 + n * 2} fentes arrière par jambe`, description: "Adapte le mouvement à ton niveau." }),
      (n) => ({ title: `Monte et descends une marche ${10 + n * 2} fois`, description: "Choisis une marche basse et prends appui." }),
      (n) => ({ title: `Fais ${10 + n * 5} min de mobilité du dos`, description: "Quelques mouvements doux suffisent." })
    ]
  },
  {
    category: "Discipline", code: "discipline", tasks: [
      () => ({ title: "Écris tes 3 priorités du jour", description: "Commence par celle qui compte le plus." }),
      (n) => ({ title: `Range ton bureau pendant ${5 + n * 5} min`, description: "Libère juste assez de place pour travailler." }),
      () => ({ title: "Termine une tâche que tu repousses", description: "Prends la plus courte et boucle-la." }),
      (n) => ({ title: `Planifie demain en ${5 + n * 2} minutes`, description: "Note les trois choses à ne pas oublier." }),
      (n) => ({ title: `Travaille ${20 + n * 5} min sans notifications`, description: "Une tâche, un minuteur, rien d’autre." }),
      () => ({ title: "Prépare tes affaires pour demain", description: "Pose-les là où tu les trouveras." }),
      (n) => ({ title: `Trie ${10 + n * 5} fichiers ou e-mails`, description: "Supprime ou archive ce qui t’encombre." }),
      (n) => ({ title: `Découpe un projet en ${3 + n} étapes`, description: "Écris simplement ce qu’il faut faire ensuite." }),
      () => ({ title: "Choisis une heure de coucher réaliste", description: "Mets un rappel pour t’aider à t’y tenir." }),
      (n) => ({ title: `Fais une pause sans écran de ${10 + n * 5} min`, description: "Laisse ton téléphone hors de portée." }),
      (n) => ({ title: `Note ${3 + n} dépenses du jour`, description: "Ajoute une catégorie à chacune." }),
      () => ({ title: "Nettoie une petite surface", description: "Lance dix minutes et arrête-toi au minuteur." }),
      () => ({ title: "Commence une tâche dans les 5 minutes", description: "Le premier geste suffit pour démarrer." }),
      (n) => ({ title: `Consacre ${15 + n * 5} min à un projet`, description: "Coupe les notifications le temps d’avancer." }),
      (n) => ({ title: `Écris un bilan de ${3 + n} lignes`, description: "Garde une réussite et la suite à faire." }),
      (n) => ({ title: `Range ${5 + n * 5} objets`, description: "Remets-les simplement à leur place." }),
      () => ({ title: "Écris une liste de trois tâches réalistes", description: "Évite de remplir toute ta journée." }),
      (n) => ({ title: `Travaille ${15 + n * 5} min sans changer de tâche`, description: "Reste sur le même sujet jusqu’au minuteur." }),
      () => ({ title: "Prépare un repas simple", description: "Sors les ingrédients avant de commencer." }),
      (n) => ({ title: `Trie ${5 + n * 5} photos ou documents`, description: "Garde ce que tu voudras retrouver." }),
      () => ({ title: "Choisis une tâche et commence-la maintenant", description: "Même deux minutes, c’est commencé." }),
      () => ({ title: "Prépare un endroit calme pour demain", description: "Laisse le nécessaire à portée de main." }),
      (n) => ({ title: `Consacre ${10 + n * 5} min à remettre une pièce en ordre`, description: "Occupe-toi d’un seul coin." }),
      () => ({ title: "Note une dépense et son utilité", description: "Ça t’aidera à voir où part ton argent." }),
      () => ({ title: "Désactive une notification inutile", description: "Tu pourras toujours la réactiver plus tard." }),
      (n) => ({ title: `Fais une pause de ${10 + n * 5} min sans écran`, description: "Prends l’air ou étire-toi un peu." }),
      () => ({ title: "Mets un document important à sa place", description: "Choisis un endroit où tu le retrouveras." }),
      (n) => ({ title: `Planifie ${1 + n} créneau${n ? "x" : ""} pour un projet`, description: "Bloque-les dans ton agenda." }),
      () => ({ title: "Fais une tâche administrative courte", description: "Réponds à un message ou classe un papier." }),
      () => ({ title: "Termine ta journée en préparant demain", description: "Choisis une priorité, pas toute une liste." })
    ]
  },
  {
    category: "Vie sociale & autonomie", code: "social", tasks: [
      () => ({ title: "Envoie un message à une personne qui compte", description: "Demande-lui comment elle va, tout simplement." }),
      (n) => ({ title: `Appelle un proche pendant ${5 + n * 2} min`, description: "Même un petit appel peut faire du bien." }),
      () => ({ title: "Remercie quelqu’un pour une attention précise", description: "Dis-lui ce que tu as apprécié." }),
      () => ({ title: "Propose une date pour voir quelqu’un", description: "Suggère un jour et une activité." }),
      (n) => ({ title: `Prépare un repas avec ${3 + Math.floor(n / 2)} ingrédients`, description: "Une recette que tu connais fera l’affaire." }),
      () => ({ title: "Fais une démarche pratique toi-même", description: "Un appel, un rendez-vous ou un formulaire." }),
      (n) => ({ title: `Fais une course avec une liste de ${5 + n} articles`, description: "Regarde ce qu’il manque avant de partir." }),
      (n) => ({ title: `Range un espace pendant ${10 + n * 2} min`, description: "Un tiroir ou une étagère, c’est déjà bien." }),
      () => ({ title: "Exprime clairement un besoin ou une préférence", description: "Dis-le simplement, avec tes mots." }),
      () => ({ title: "Demande de l’aide sur un point précis", description: "Explique ce qui te bloque." }),
      (n) => ({ title: `Explore un endroit du quartier pendant ${15 + n * 5} min`, description: "Prends un chemin que tu ne connais pas encore." }),
      () => ({ title: "Partage un repas ou une pause sans téléphone", description: "Pose-le et profite du moment." }),
      () => ({ title: "Prends un rendez-vous utile", description: "Choisis un créneau et ajoute-le à ton agenda." }),
      () => ({ title: "Prépare ton sac ou tes documents pour demain", description: "Rassemble-les dès maintenant." }),
      (n) => ({ title: `Fais ${1 + n} tâche${n ? "s" : ""} administrative${n ? "s" : ""}`, description: "Commence par celle qui prendra le moins de temps." }),
      () => ({ title: "Demande à quelqu’un comment se passe sa journée", description: "Prends le temps d’écouter la réponse." }),
      () => ({ title: "Propose ton aide sur une chose précise", description: "Demande ce qui lui serait vraiment utile." }),
      () => ({ title: "Prépare un repas pour toi ou quelqu’un", description: "Fais quelque chose de simple et bon." }),
      (n) => ({ title: `Prépare une liste de ${5 + n} courses utiles`, description: "Jette d’abord un œil dans les placards." }),
      () => ({ title: "Demande un renseignement en personne", description: "Dans un commerce ou un lieu public." }),
      () => ({ title: "Organise une sortie simple avec un proche", description: "Envoie une proposition avec un jour précis." }),
      () => ({ title: "Range et prépare ton espace de vie", description: "Occupe-toi de l’endroit que tu utilises le plus." }),
      () => ({ title: "Prends des nouvelles d’une personne que tu vois peu", description: "Un message sincère suffit." }),
      () => ({ title: "Fais une démarche sans la repousser", description: "Appelle, écris ou prends le rendez-vous." }),
      () => ({ title: "Prépare tes affaires pour une activité", description: "Regarde l’heure et le trajet avant demain." }),
      (n) => ({ title: `Repère ${2 + n} services utiles près de chez toi`, description: "Garde les adresses et horaires sous la main." }),
      () => ({ title: "Fais une activité sans téléphone avec quelqu’un", description: "Laisse-le de côté le temps du moment." }),
      () => ({ title: "Exprime un merci à quelqu’un", description: "Raconte-lui ce que son geste a changé." }),
      () => ({ title: "Prends une décision pratique par toi-même", description: "Choisis une option et passe à la suite." }),
      () => ({ title: "Prépare ton itinéraire pour un prochain rendez-vous", description: "Vérifie le trajet et l’heure de départ." })
    ]
  }
];

const CHALLENGE_DAYS = Array.from({ length: 365 }, (_, dayIndex) => {
  return CHALLENGE_PLANS.map((plan, categoryIndex) => {
    const taskIndex = dayIndex % plan.tasks.length;
    const level = Math.min(4, Math.floor(dayIndex / plan.tasks.length));
    const task = plan.tasks[taskIndex](level);
    return {
      id: `D${String(dayIndex + 1).padStart(3, "0")}-${plan.code}`,
      day: dayIndex + 1,
      slot: categoryIndex + 1,
      category: plan.category,
      title: task.title,
      description: task.description,
      level: level + 1
    };
  });
});
const CHALLENGES = CHALLENGE_DAYS.flat();
const CHALLENGE_IDS = new Set(CHALLENGES.map((challenge) => challenge.id));
const CHALLENGE_BY_ID = new Map(CHALLENGES.map((challenge) => [challenge.id, challenge]));

function normalizeCategorySettings(countValue, categoriesValue) {
  const requestedCount = Number.isInteger(countValue) && countValue >= 1 && countValue <= CATEGORIES.length
    ? countValue
    : (Array.isArray(categoriesValue) && categoriesValue.length ? Math.min(CATEGORIES.length, categoriesValue.length) : CATEGORIES.length);
  const selectedCategories = Array.isArray(categoriesValue)
    ? [...new Set(categoriesValue.filter((category) => CATEGORIES.includes(category)))].slice(0, requestedCount)
    : CATEGORIES.slice(0, requestedCount);
  return {
    categoryCount: requestedCount,
    selectedCategories: selectedCategories.length ? selectedCategories : CATEGORIES.slice(0, requestedCount)
  };
}

function normalizeChallengeLog(source) {
  const normalized = {};
  for (const [sourceId, value] of Object.entries(source || {})) {
    let id = sourceId;
    const legacy = /^C(\d{3})$/.exec(sourceId);
    if (legacy) {
      const oldNumber = Number(legacy[1]);
      if (oldNumber < 1 || oldNumber > 365) continue;
      const categoryIndex = Math.floor((oldNumber - 1) / 73);
      const day = ((oldNumber - 1) % 73) + 1;
      id = `D${String(day).padStart(3, "0")}-${CHALLENGE_PLANS[categoryIndex].code}`;
    }
    if (!CHALLENGE_IDS.has(id) || !value || typeof value !== "object") continue;
    const completedAt = isValidDateKey(value.completedAt) ? value.completedAt : null;
    const comment = typeof value.comment === "string" ? value.comment.slice(0, 2000) : "";
    if (completedAt || comment) normalized[id] = { completedAt, comment };
  }
  return normalized;
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isValidDateKey(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime()) && localDateKey(date) === value;
}

function inferChallengeStartDate(challengeLog = {}) {
  const dates = Object.values(challengeLog)
    .map((entry) => entry?.completedAt)
    .filter(isValidDateKey)
    .sort();
  return dates[0] || localDateKey();
}

function uid() {
  return globalThis.crypto?.randomUUID?.() || `n-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function sampleState() {
  return {
    version: 1,
    startedAt: localDateKey(),
    notes: [],
    challengeLog: {},
    ...normalizeCategorySettings(CATEGORIES.length, CATEGORIES)
  };
}

function readState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const initial = sampleState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(stored);
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.notes) || !parsed.challengeLog || typeof parsed.challengeLog !== "object") return sampleState();
    const challengeLog = normalizeChallengeLog(parsed.challengeLog);
    return {
      version: 1,
      startedAt: isValidDateKey(parsed.startedAt) ? parsed.startedAt : inferChallengeStartDate(challengeLog),
      notes: parsed.notes,
      challengeLog,
      ...normalizeCategorySettings(parsed.categoryCount, parsed.selectedCategories)
    };
  } catch {
    return sampleState();
  }
}

let state = readState();
let currentView = "dashboard";
let challengeFilter = "Toutes";
let challengeSearch = "";
let selectedChallengeDay = currentDayNumber();
let calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let toastTimeout;
let deferredInstallPrompt = null;

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    showToast("Le navigateur n'a pas pu enregistrer les données. Libérez de l'espace puis réessayez.");
    return false;
  }
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.note}</svg>`;
}

function replaceIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = icon(node.dataset.icon);
  });
}

function showToast(message) {
  const node = document.querySelector("#toast");
  node.textContent = message;
  node.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => node.classList.remove("visible"), 2800);
}

function formatDate(value, options = { day: "numeric", month: "short", year: "numeric" }) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

function currentDayNumber(date = new Date()) {
  const start = new Date(`${state.startedAt}T00:00:00`);
  const dayIndex = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000);
  return Math.min(Math.max(dayIndex + 1, 1), 365);
}

function completedEntries() {
  const selected = new Set(activeCategories());
  return Object.entries(state.challengeLog).filter(([id, log]) => CHALLENGE_IDS.has(id) && selected.has(CHALLENGE_BY_ID.get(id)?.category) && log && log.completedAt);
}

function activeCategories() {
  const saved = Array.isArray(state.selectedCategories) ? state.selectedCategories.filter((category) => CATEGORIES.includes(category)) : [];
  return saved.length ? saved : CATEGORIES;
}

function challengesForDay(day) {
  const selected = new Set(activeCategories());
  return (CHALLENGE_DAYS[day - 1] || [])
    .filter((challenge) => selected.has(challenge.category))
    .map((challenge, index, list) => ({ ...challenge, slot: index + 1, totalSlots: list.length }));
}

function totalSelectedChallenges() {
  return activeCategories().length * CHALLENGE_DAYS.length;
}

function completedDates() {
  return [...new Set(completedEntries().map(([, log]) => log.completedAt).filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date)))].sort();
}

function streakStats() {
  const dates = completedDates();
  if (!dates.length) return { current: 0, best: 0 };
  const set = new Set(dates);
  let best = 1;
  let run = 1;
  for (let i = 1; i < dates.length; i += 1) {
    const previous = new Date(`${dates[i - 1]}T00:00:00`);
    const current = new Date(`${dates[i]}T00:00:00`);
    const delta = Math.round((current - previous) / 86400000);
    run = delta === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  const today = localDateKey();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  let cursor = set.has(today) ? new Date(`${today}T00:00:00`) : set.has(localDateKey(yesterdayDate)) ? new Date(`${localDateKey(yesterdayDate)}T00:00:00`) : null;
  let current = 0;
  while (cursor && set.has(localDateKey(cursor))) {
    current += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return { current, best };
}

function completedForCategory(category) {
  return CHALLENGES.filter((challenge) => challenge.category === category && state.challengeLog[challenge.id]?.completedAt).length;
}

function completedForDay(day) {
  return challengesForDay(day).filter((challenge) => state.challengeLog[challenge.id]?.completedAt).length;
}

function completedDayCount() {
  return CHALLENGE_DAYS.filter((_, index) => {
    const day = challengesForDay(index + 1);
    return day.length && day.every((challenge) => state.challengeLog[challenge.id]?.completedAt);
  }).length;
}

function dateForChallengeDay(day) {
  const date = new Date(`${state.startedAt}T00:00:00`);
  date.setDate(date.getDate() + day - 1);
  return date;
}

function renderDashboard() {
  const day = currentDayNumber();
  const dayPack = challengesForDay(day);
  const dailyTotal = dayPack.length;
  const doneToday = completedForDay(day);
  const doneSummary = `${doneToday} défi${doneToday === 1 ? "" : "s"} terminé${doneToday === 1 ? "" : "s"}`;
  const streak = streakStats().current;
  const done = completedEntries().length;
  const dayDate = formatDate(dateForChallengeDay(day), { weekday: "long", day: "numeric", month: "long" });
  return `
    <section class="welcome">
      <div>
        <p class="eyebrow">365 CHALLENGES · JOUR ${String(day).padStart(3, "0")}</p>
        <h2>Tes défis.<br />À toi de jouer.</h2>
        <p class="welcome-description">${doneSummary} sur ${dailyTotal} · ${escapeHtml(dayDate)}</p>
        <a class="button welcome-button" href="#challenges" data-view="challenges">Voir les défis ${icon("arrow")}</a>
      </div>
      <div class="welcome-number" aria-hidden="true">365</div>
    </section>
    <div class="section-heading"><h2>À faire aujourd’hui</h2><span>${doneToday} / ${dailyTotal} ${doneToday === 1 ? "FAIT" : "FAITS"}</span></div>
    <section class="home-challenges">${dayPack.map(dashboardChallengeRow).join("")}</section>
    <div class="section-heading"><h2>Ton évolution</h2><a class="text-link" href="#progress" data-view="progress">Voir la progression ${icon("arrow")}</a></div>
    <section class="stats-grid dashboard-stats" aria-label="Statistiques personnelles">
      ${statCard("target", "ACTIONS VALIDÉES", done, `sur ${totalSelectedChallenges()}`)}
      ${statCard("calendar", "JOURS COMPLETS", completedDayCount(), "sur 365")}
      ${statCard("flame", "SÉRIE ACTUELLE", streak, streak === 1 ? "jour" : "jours")}
    </section>`;
}

function dashboardChallengeRow(challenge) {
  const done = !!state.challengeLog[challenge.id]?.completedAt;
  return `<article class="home-challenge-row ${done ? "is-complete" : ""}"><span class="home-challenge-index">${String(challenge.slot).padStart(2, "0")}</span><div class="home-challenge-copy"><span class="home-challenge-category">${escapeHtml(challenge.category)}</span><h3>${escapeHtml(challenge.title)}</h3><p>${escapeHtml(challenge.description)}</p></div><button class="home-challenge-check ${done ? "done" : ""}" data-action="toggle-challenge" data-id="${challenge.id}" aria-label="${done ? "Annuler" : "Valider"} ${escapeHtml(challenge.title)}">${done ? icon("check") : ""}</button></article>`;
}

function statCard(iconName, label, value, foot) {
  return `<article class="stat-card"><div class="stat-head"><span>${label}</span><span class="stat-icon">${icon(iconName)}</span></div><div class="stat-value">${escapeHtml(value)}</div><div class="stat-foot">${foot}</div></article>`;
}

function pageHeading(eyebrow, title, description, actions = "") {
  return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div>${actions ? `<div class="page-heading-actions">${actions}</div>` : ""}</div>`;
}

function emptyState(iconName, title, description, button = "") {
  return `<div class="empty-state"><span class="empty-state-mark">${icon(iconName)}</span><h3>${title}</h3><p>${description}</p>${button}</div>`;
}

function renderChallenges() {
  const query = challengeSearch.trim().toLocaleLowerCase("fr");
  const dayPack = challengesForDay(selectedChallengeDay);
  const filtered = dayPack.filter((challenge) => (challengeFilter === "Toutes" || challenge.category === challengeFilter) && (!query || `${challenge.title} ${challenge.description} ${challenge.category}`.toLocaleLowerCase("fr").includes(query)));
  const done = completedEntries().length;
  const doneToday = completedForDay(selectedChallengeDay);
  const doneSummary = `${doneToday} défi${doneToday === 1 ? "" : "s"} terminé${doneToday === 1 ? "" : "s"}`;
  const streak = streakStats().current;
  const progress = dayPack.length ? Math.round(doneToday / dayPack.length * 100) : 0;
  const dayDate = formatDate(dateForChallengeDay(selectedChallengeDay), { weekday: "long", day: "numeric", month: "long" });
  const todayNumber = currentDayNumber();
  const selected = activeCategories();
  const categoryExamples = new Map(CATEGORIES.map((category) => [category, CHALLENGE_DAYS[0].find((challenge) => challenge.category === category)]));
  const selectedCount = selected.length;
  document.querySelector("#mainView").innerHTML = `
    ${pageHeading("365 CHALLENGES", "Les défis du jour.", "Choisis ton rythme et les catégories qui te ressemblent.")}
    <section class="category-customizer surface">
      <div class="category-customizer-heading"><div><div class="eyebrow">TON PROGRAMME</div><h2>Combien de catégories par jour ?</h2><p>Une action par catégorie, chaque jour.</p></div><div class="category-count-picker" role="group" aria-label="Nombre de catégories par jour">${CATEGORIES.map((_, index) => index + 1).map((count) => `<button type="button" class="category-count-button ${state.categoryCount === count ? "active" : ""}" data-action="category-count" data-count="${count}" aria-label="${count} catégorie${count === 1 ? "" : "s"} par jour" aria-pressed="${state.categoryCount === count}">${count}</button>`).join("")}</div></div>
      <div class="category-choice-summary"><span>${selectedCount} / ${state.categoryCount} catégorie${state.categoryCount === 1 ? "" : "s"} choisie${selectedCount === 1 ? "" : "s"}</span><small>${selectedCount === state.categoryCount ? "Pour changer, décoche un choix puis sélectionne-en un autre." : `Choisis encore ${state.categoryCount - selectedCount} catégorie${state.categoryCount - selectedCount === 1 ? "" : "s"}.`}</small></div>
      <div class="category-choice-grid">${CATEGORIES.map((category) => {
        const example = categoryExamples.get(category);
        const isSelected = selected.includes(category);
        const isUnavailable = !isSelected && selectedCount >= state.categoryCount;
        return `<button type="button" class="category-choice ${isSelected ? "selected" : ""}" data-action="category-choice" data-category-choice="${escapeHtml(category)}" aria-pressed="${isSelected}" ${isUnavailable ? "disabled" : ""}><span class="category-choice-top"><strong>${escapeHtml(category)}</strong><span class="category-choice-mark">${isSelected ? icon("check") : "+"}</span></span><span class="category-choice-label">EXEMPLE</span><span class="category-choice-example">${escapeHtml(example?.title || "Un défi à découvrir")}</span></button>`;
      }).join("")}</div>
    </section>
    <div class="challenge-day-nav">
      <button class="day-nav-button" data-action="challenge-day" data-delta="-1" aria-label="Jour précédent" ${selectedChallengeDay === 1 ? "disabled" : ""}>${icon("left")}</button>
      <div class="day-nav-center"><span>JOUR</span><div class="day-number-line"><input id="challengeDayInput" type="number" min="1" max="365" value="${selectedChallengeDay}" aria-label="Choisir un jour" /><span>/ 365</span></div><small>${escapeHtml(dayDate)}</small></div>
      ${selectedChallengeDay !== todayNumber ? `<button class="day-nav-today" data-action="challenge-today">Aujourd’hui</button>` : ""}
      <button class="day-nav-button" data-action="challenge-day" data-delta="1" aria-label="Jour suivant" ${selectedChallengeDay === 365 ? "disabled" : ""}>${icon("right")}</button>
    </div>
    <section class="challenge-overview">
      <div class="challenge-overview-top"><div><h3>${doneSummary} sur ${dayPack.length}</h3><p>Jour ${String(selectedChallengeDay).padStart(3, "0")} · ${escapeHtml(dayDate)}</p></div><span class="challenge-percentage">${progress}%</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
    </section>
    <section class="challenge-stats">
      <article class="challenge-stat"><span>ACTIONS VALIDÉES</span><strong>${done}</strong></article>
      <article class="challenge-stat"><span>JOURS COMPLETS</span><strong>${completedDayCount()}</strong></article>
      <article class="challenge-stat"><span>SÉRIE ACTUELLE</span><strong>${streak}</strong></article>
    </section>
    <div class="toolbar">
      <label class="search-box"><span data-icon="search"></span><input id="challengeSearch" type="search" placeholder="Filtrer les ${dayPack.length} défis…" value="${escapeHtml(challengeSearch)}" /></label>
      <span class="toolbar-spacer"></span><span class="result-count">${filtered.length} / ${dayPack.length}</span>
    </div>
    <div class="category-tabs"><button class="category-tab ${challengeFilter === "Toutes" ? "active" : ""}" data-category="Toutes">Toutes</button>${selected.map((category) => `<button class="category-tab ${challengeFilter === category ? "active" : ""}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("")}</div>
    ${filtered.length ? `<div class="challenge-list">${filtered.map((challenge) => challengeCard(challenge, dayPack.length)).join("")}</div>` : emptyState("target", "Aucune action trouvée", "Modifie ta recherche.")}`;
  replaceIcons(document.querySelector("#mainView"));
  document.querySelector("#challengeSearch")?.addEventListener("input", (event) => {
    challengeSearch = event.target.value;
    renderChallenges();
    const input = document.querySelector("#challengeSearch");
    input?.focus();
    if (input) input.setSelectionRange(challengeSearch.length, challengeSearch.length);
  });
  document.querySelector("#challengeDayInput")?.addEventListener("change", (event) => {
    const day = Number(event.target.value);
    if (Number.isInteger(day) && day >= 1 && day <= 365) {
      selectedChallengeDay = day;
      renderChallenges();
    } else {
      event.target.value = selectedChallengeDay;
    }
  });
}

function challengeCard(challenge, dailyTotal = activeCategories().length) {
  const log = state.challengeLog[challenge.id] || {};
  const done = !!log.completedAt;
  const comment = (log.comment || "").trim();
  return `<article class="challenge-card ${done ? "completed" : ""}"><div class="challenge-card-top"><span class="challenge-category">${escapeHtml(challenge.category)}</span><span class="challenge-number">DÉFI ${String(challenge.slot).padStart(2, "0")} / ${String(dailyTotal).padStart(2, "0")}</span></div><h3>${escapeHtml(challenge.title)}</h3><p>${escapeHtml(challenge.description)}</p><div class="challenge-card-bottom"><button class="challenge-check ${done ? "done" : ""}" data-action="toggle-challenge" data-id="${challenge.id}" aria-label="${done ? "Annuler" : "Valider"} ${escapeHtml(challenge.title)}">${done ? icon("check") : `<span class="check-empty"></span>`}${done ? "Fait" : "Valider"}</button><button class="challenge-comment-button ${comment ? "has-comment" : ""}" data-action="edit-comment" data-id="${challenge.id}" aria-label="${comment ? "Modifier le commentaire" : "Ajouter un commentaire"}" title="Commentaire">${icon("message")}<span>${comment ? "Noté" : "Commenter"}</span></button></div>${comment ? `<div class="challenge-saved-comment">${icon("message")} ${escapeHtml(comment)}</div>` : ""}</article>`;
}

function renderProgress() {
  const month = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const monthTitle = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(month);
  const firstOffset = (month.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const today = localDateKey();
  const dayNames = ["L", "M", "M", "J", "V", "S", "D"];
  const days = [...Array(firstOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
  const streak = streakStats();
  const done = completedEntries().length;
  const categoryCounts = activeCategories().map((category) => ({ category, count: completedForCategory(category), total: 365 }));
  const monthDoneDays = new Set(completedDates().filter((key) => key.startsWith(`${year}-${String(monthIndex + 1).padStart(2, "0")}-`)));
  document.querySelector("#mainView").innerHTML = `
    ${pageHeading("SUIVI", "Ta progression.", "Un aperçu simple de ton parcours.")}
    <div class="stats-grid progress-stats">
      ${statCard("target", "Actions", done, `sur ${totalSelectedChallenges()}`)}
      ${statCard("calendar", "Jours actifs", completedDates().length, "au total")}
      ${statCard("flame", "Série", streak.current, streak.current === 1 ? "jour" : "jours")}
      ${statCard("spark", "Record", streak.best, streak.best === 1 ? "jour" : "jours")}
    </div>
    <div class="progress-overview">
      <section class="surface calendar-panel"><div class="calendar-head"><h2>Calendrier · ${escapeHtml(monthTitle)}</h2><div class="calendar-nav"><button class="icon-button" data-action="calendar-month" data-delta="-1" aria-label="Mois précédent">${icon("left")}</button><button class="icon-button" data-action="calendar-month" data-delta="1" aria-label="Mois suivant">${icon("right")}</button></div></div><div class="calendar-grid">${dayNames.map((day) => `<span class="calendar-day-name">${day}</span>`).join("")}${days.map((day) => {
      if (!day) return `<span class="calendar-day empty"></span>`;
      const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const hasProgress = monthDoneDays.has(key);
      return `<button class="calendar-day ${key === today ? "today" : ""} ${hasProgress ? "has-progress" : ""}" data-action="calendar-day" data-date="${key}" title="${hasProgress ? "Défi validé" : "Aucun défi validé"} le ${day}">${day}</button>`;
    }).join("")}</div><div class="calendar-legend"><span class="legend-dot"></span> Au moins un défi validé</div></section>
      <section class="surface streak-panel"><div><div class="streak-main"><div class="eyebrow">TON RYTHME</div><span class="streak-icon">${icon("flame")}</span></div><div class="streak-value">${streak.current}</div><p>${streak.current === 1 ? "jour consécutif" : "jours consécutifs"}</p></div><div class="streak-bottom"><div><strong>${streak.best}</strong><small>meilleure série</small></div><div><strong>${completedDates().length}</strong><small>jours actifs</small></div><div><strong>${Math.round(done / totalSelectedChallenges() * 100)}%</strong><small>du parcours</small></div></div></section>
    </div>
    <section class="surface category-progress-panel"><div class="section-head"><h2>Tes domaines</h2><span class="result-count">1 action par jour</span></div><div class="category-progress-list">${categoryCounts.map(({ category, count, total }) => `<div class="category-progress-row"><span class="category-progress-name"><span class="mini-dot"></span>${escapeHtml(category)}</span><div class="category-progress-track"><span style="width:${Math.min(100, count / total * 100)}%"></span></div><span class="category-progress-value">${count} / ${total}</span></div>`).join("")}</div></section>`;
  replaceIcons(document.querySelector("#mainView"));
}

function render() {
  const allowed = ["dashboard", "challenges", "progress"];
  const requested = location.hash.replace(/^#/, "") || "dashboard";
  currentView = allowed.includes(requested) ? requested : "dashboard";
  if (!location.hash || !allowed.includes(requested)) history.replaceState(null, "", `#${currentView}`);
  document.querySelectorAll("[data-view]").forEach((link) => link.classList.toggle("active", link.dataset.view === currentView));
  const pageTitles = { dashboard: "Accueil", challenges: "365 Challenges", progress: "Progression" };
  document.querySelector("#topbarPageTitle").textContent = pageTitles[currentView];
  if (currentView === "challenges") renderChallenges();
  else if (currentView === "progress") renderProgress();
  else document.querySelector("#mainView").innerHTML = renderDashboard();
  replaceIcons(document.querySelector("#mainView"));
}

function toggleChallenge(id) {
  if (!CHALLENGES.some((challenge) => challenge.id === id)) return;
  const current = state.challengeLog[id] || {};
  state.challengeLog[id] = { ...current, completedAt: current.completedAt ? null : localDateKey() };
  if (!state.challengeLog[id].completedAt && !state.challengeLog[id].comment) delete state.challengeLog[id];
  persist();
  render();
  showToast(state.challengeLog[id]?.completedAt ? "Bien joué, c’est fait." : "Défi remis à faire.");
}

function openChallengeComment(id) {
  const challenge = CHALLENGES.find((item) => item.id === id);
  if (!challenge) return;
  const form = document.querySelector("#challengeForm");
  form.reset();
  form.elements.id.value = id;
  form.elements.comment.value = state.challengeLog[id]?.comment || "";
  document.querySelector("#challengeDialogPrompt").textContent = `Jour ${challenge.day} · ${challenge.category} — ${challenge.title}`;
  document.querySelector("#challengeDialog").showModal();
}

function saveChallengeComment(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.elements.id.value;
  const comment = form.elements.comment.value.trim();
  const current = state.challengeLog[id] || {};
  if (comment || current.completedAt) state.challengeLog[id] = { ...current, comment };
  else delete state.challengeLog[id];
  persist();
  document.querySelector("#challengeDialog").close();
  render();
  showToast(comment ? "Commentaire enregistré." : "Commentaire supprimé.");
}

function exportBackup() {
  const backup = { app: "My Life OS", version: 1, exportedAt: new Date().toISOString(), payload: state };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `my-life-os-sauvegarde-${localDateKey()}.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  showToast("Sauvegarde téléchargée sur cet appareil.");
}

function validImportedState(raw) {
  const payload = raw?.payload || raw;
  if (!payload || payload.version !== 1 || !Array.isArray(payload.notes) || !payload.challengeLog || typeof payload.challengeLog !== "object" || Array.isArray(payload.challengeLog)) return null;
  const notes = payload.notes.filter((note) => note && typeof note === "object" && typeof note.title === "string" && typeof note.content === "string").map((note) => ({
    id: String(note.id || uid()), title: note.title.slice(0, 100), type: NOTE_TYPES.includes(note.type) ? note.type : "Note", category: String(note.category || "Personnel").slice(0, 35), content: note.content.slice(0, 12000), tags: Array.isArray(note.tags) ? note.tags.filter((tag) => typeof tag === "string").slice(0, 30).map((tag) => tag.slice(0, 40)) : [], createdAt: validTimestamp(note.createdAt), updatedAt: validTimestamp(note.updatedAt)
  }));
  const challengeLog = normalizeChallengeLog(payload.challengeLog);
  return {
    version: 1,
    startedAt: isValidDateKey(payload.startedAt) ? payload.startedAt : inferChallengeStartDate(challengeLog),
    notes,
    challengeLog,
    ...normalizeCategorySettings(payload.categoryCount, payload.selectedCategories)
  };
}

function validTimestamp(value) {
  return typeof value === "string" && !Number.isNaN(new Date(value).getTime()) ? value : new Date().toISOString();
}

async function importBackup(file) {
  if (!file) return;
  try {
    const raw = JSON.parse(await file.text());
    const next = validImportedState(raw);
    if (!next) throw new Error("Ce fichier ne semble pas être une sauvegarde My Life OS valide.");
    const completedCount = Object.values(next.challengeLog).filter((item) => item.completedAt).length;
    const completedText = `${completedCount} défi${completedCount === 1 ? "" : "s"} validé${completedCount === 1 ? "" : "s"}`;
    if (!confirm(`Restaurer cette sauvegarde ? Les défis, préférences et commentaires actuels seront remplacés. Le fichier contient ${completedText}.`)) return;
    state = next;
    persist();
    render();
    showToast("Sauvegarde restaurée sur cet appareil.");
  } catch (error) {
    showToast(error instanceof SyntaxError ? "Le fichier JSON n'a pas pu être lu." : (error.message || "Restauration impossible."));
  } finally {
    document.querySelector("#importFile").value = "";
  }
}

function configureInstall() {
  const install = document.querySelector("#installButton");
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  install.hidden = standalone || !isIos;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    install.hidden = standalone;
  });
  window.addEventListener("appinstalled", () => { install.hidden = true; showToast("My Life OS est installé."); });
  install.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const result = await deferredInstallPrompt.userChoice;
      if (result.outcome === "accepted") showToast("Installation lancée.");
      deferredInstallPrompt = null;
    } else if (isIos) {
      showToast("Dans Safari : Partager, puis Ajouter à l’écran d’accueil.");
    }
  });
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]");
  if (nav) {
    event.preventDefault();
    if (location.hash !== `#${nav.dataset.view}`) location.hash = nav.dataset.view;
    else render();
    return;
  }
  const category = event.target.closest("[data-category]");
  if (category) {
    challengeFilter = category.dataset.category;
    renderChallenges();
    return;
  }
  const close = event.target.closest(".close-dialog");
  if (close) { close.closest("dialog")?.close(); return; }
  const actionNode = event.target.closest("[data-action]");
  if (!actionNode) return;
  const { action, id } = actionNode.dataset;
  if (action === "category-count") {
    const count = Number(actionNode.dataset.count);
    if (!Number.isInteger(count) || count < 1 || count > CATEGORIES.length) return;
    const chosen = activeCategories().slice(0, count);
    for (const categoryName of CATEGORIES) {
      if (chosen.length >= count) break;
      if (!chosen.includes(categoryName)) chosen.push(categoryName);
    }
    state.categoryCount = count;
    state.selectedCategories = chosen;
    challengeFilter = "Toutes";
    persist();
    renderChallenges();
  }
  else if (action === "category-choice") {
    const categoryName = actionNode.dataset.categoryChoice;
    if (!CATEGORIES.includes(categoryName)) return;
    const chosen = activeCategories();
    if (chosen.includes(categoryName)) {
      if (chosen.length === 1) {
        showToast("Garde au moins une catégorie dans ton programme.");
        return;
      }
      state.selectedCategories = chosen.filter((categoryItem) => categoryItem !== categoryName);
    } else if (chosen.length < state.categoryCount) {
      state.selectedCategories = [...chosen, categoryName];
    } else {
      showToast("Décoche une catégorie pour pouvoir la remplacer.");
      return;
    }
    if (!state.selectedCategories.includes(challengeFilter)) challengeFilter = "Toutes";
    persist();
    renderChallenges();
  }
  else if (action === "toggle-challenge") toggleChallenge(id);
  else if (action === "edit-comment") openChallengeComment(id);
  else if (action === "challenge-day") {
    selectedChallengeDay = Math.max(1, Math.min(365, selectedChallengeDay + Number(actionNode.dataset.delta)));
    challengeFilter = "Toutes";
    challengeSearch = "";
    renderChallenges();
  }
  else if (action === "challenge-today") {
    selectedChallengeDay = currentDayNumber();
    challengeFilter = "Toutes";
    challengeSearch = "";
    renderChallenges();
  }
  else if (action === "calendar-month") { calendarMonth.setMonth(calendarMonth.getMonth() + Number(actionNode.dataset.delta)); renderProgress(); }
  else if (action === "calendar-day") {
    const count = completedEntries().filter(([, log]) => log.completedAt === actionNode.dataset.date).length;
    const dateLabel = formatDate(`${actionNode.dataset.date}T00:00:00`, { day: "numeric", month: "long" });
    showToast(count ? `${count} défi${count === 1 ? "" : "s"} validé${count === 1 ? "" : "s"} le ${dateLabel}.` : `Aucun défi validé le ${dateLabel}.`);
  }
});

document.querySelector("#challengeForm").addEventListener("submit", saveChallengeComment);
document.querySelector("#exportButton").addEventListener("click", exportBackup);
document.querySelector("#importButton").addEventListener("click", () => document.querySelector("#importFile").click());
document.querySelector("#exportButtonMobile").addEventListener("click", exportBackup);
document.querySelector("#importButtonMobile").addEventListener("click", () => document.querySelector("#importFile").click());
document.querySelector("#importFile").addEventListener("change", (event) => importBackup(event.target.files?.[0]));
window.addEventListener("hashchange", render);

function setTopbarDate(date = new Date()) {
  const label = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(date);
  document.querySelector("#topbarDate").textContent = label.charAt(0).toLocaleUpperCase("fr") + label.slice(1);
}

let activeDateKey = localDateKey();
function refreshDateContext() {
  const todayKey = localDateKey();
  if (todayKey === activeDateKey) return;
  const previousProgramDay = currentDayNumber(new Date(`${activeDateKey}T12:00:00`));
  activeDateKey = todayKey;
  setTopbarDate();
  const todayProgramDay = currentDayNumber();
  if (selectedChallengeDay === previousProgramDay) {
    selectedChallengeDay = todayProgramDay;
    challengeFilter = "Toutes";
    challengeSearch = "";
    if (currentView === "challenges") renderChallenges();
  }
  if (currentView === "dashboard") document.querySelector("#mainView").innerHTML = renderDashboard();
  if (currentView === "progress") renderProgress();
  if (currentView === "dashboard") replaceIcons(document.querySelector("#mainView"));
}

setTopbarDate();
window.setInterval(refreshDateContext, 30_000);
document.addEventListener("visibilitychange", refreshDateContext);
replaceIcons();
render();
configureInstall();

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => showToast("Mode hors ligne indisponible sur cette adresse.")));
}
