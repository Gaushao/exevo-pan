export default {
  Meta: {
    title: 'Bosses',
    description: 'Find out where and when bosses will spawn!',
  },
  updated: {
    recently: 'Updated a few minutes ago',
    hoursAgo: {
      prefix: 'Updated',
      suffix: 'ago',
    },
  },
  ServerNavigation: {
    label: 'Current server:',
  },
  RecentlyAppeared: {
    title: 'Recently appeared',
    /* 'hours ago' */
    ago: 'ago',
  },
  BossGrid: {
    listBosses: 'List bosses by:',
    exclusiveBosses: 'Exclusive {{exevopro}} bosses 🕵️',
    EmptyState: 'No bosses',
    listOptions: {
      chance: 'Chance',
      name: 'Name',
      lastSeen: 'Last seen',
      favorites: 'Favorites',
    },
    BossDialog: {
      loot: 'Relevant loot',
      raidMessages: 'Raid messages',
      bossWillSpawn: 'Boss will spawn',
      location: 'Location',
      locations: 'Locations',
      /* 'using' TibiaMaps.io ❤️ */
      using: 'using',
      descriptions: {
        Grorlam: 'Several spots inside Mount Sternum (Thais)',
      },
    },
  },
}
