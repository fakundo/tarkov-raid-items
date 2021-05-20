module.exports = (publicPath) => ([
  {
    path: publicPath,
    filename: 'index.html',
    lang: 'en',
    title: 'Escape from Tarkov [EFT] – Find in Raid Quest Items',
    description: 'Interactive list of quest items in Escape from Tarkov (EFT) game needed to be found in raid. Progress tracker.',
    keywords: 'Escape From Tarkov, EFT, items, find in raid, quest, quest items, find in raid items, interactive list',
  },
  {
    path: `${publicPath}ru.html`,
    filename: 'ru.html',
    lang: 'ru',
    title: 'Побег из Таркова [EFT] – Найдено в рейде, квестовые предметы',
    description: 'Интерактивный список квестовых предметов из игры Escape from Tarkov (Побег из Таркова), которые необходимо найти в рейде. Трекер прогресса.',
    keywords: 'Тарков, Escape From Tarkov, EFT, найдено в рейде, квестовые предметы, предметы найдены в рейде, интерактивный список',
  },
  {
    path: `${publicPath}de.html`,
    filename: 'de.html',
    lang: 'de',
    title: 'Escape from Tarkov – [EFT] Gegenstände, die bei der Razzia gefunden wurden',
    description: 'Die interaktive Liste der Questgegenstände im Spiel Escape from Tarkov (EFT) musste im Schlachtzug gefunden werden. Fortschrittsanzeige.',
    keywords: 'Escape From Tarkov, EFT die bei der razzia gefunden wurden, EFT, questgegenstände die bei der razzia gefunden wurden, interaktive',
  },
  {
    path: `${publicPath}fr.html`,
    filename: 'fr.html',
    lang: 'fr',
    title: 'Escape from Tarkov – [EFT] Objets trouvés dans le raid',
    description: 'La liste interactive des objets de quête dans le jeu Escape from Tarkov (EFT) devait être trouvée dans le raid. Suivi de progression.',
    keywords: 'Escape From Tarkov, EFT trouvée dans le raid, EFT, objets trouvés dans le raid, interactive',
  },
])
