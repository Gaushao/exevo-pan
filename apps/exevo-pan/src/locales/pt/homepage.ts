import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/homepage'

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: 'Leilões',
    description: 'Filtre e explore chares de Tibia no Char Bazaar oficial!',
  },
  AuctionsGrid: {
    filterButtonLabel: 'Abrir menu de filtros',
    sortingButtonLabel: 'Defina um critério de ordenação',
    filter: 'filtro',
    filters: 'filtros',
    is: 'está',
    are: 'estão',
    active: 'ativo',
    noItemsPagination: 'Nenhum personagem',
    filterDrawerLabel: 'Formulário de filtros',
    descendingSwitchLabel: 'Ordenar por ordem decrescente',
    descending: 'Decrescente',
    sortModes: {
      auctionEnd: 'Fim do leilão',
      level: 'Level',
      price: 'Preço',
      priceBidded: 'Preço (apenas com lance)',
    },
    separators: {
      current: 'Leilões atuais',
      history: 'Histórico do Bazaar',
    },
    TibiaTradeBanner: {
      heading: 'Encontre no {{link}}:',
      selling: 'Vendendo',
      buying: 'Comprando',
    },
    noAuctionFound: 'Desculpe, nenhum leilão foi encontrado',
    noFavorites: 'Nenhum leilão favoritado',
    changeFilters: 'Mudar filtros',
    NotFoundAlert:
      'Os seguintes leilões ainda não estão disponíveis em nossa base de dados:',
    ExpandableCharacterCard: {
      details: 'Detalhes',
      copyLink: 'Copiar link',
      findSimilar: 'Buscar similares',
      notify: 'Notificar',
      favorite: {
        add: 'Favoritar',
        remove: 'Desfavoritar',
        added: 'Adicionado aos favoritos',
        removed: 'Removido dos favoritos',
      },
      estimatePrice: 'Estimar preço',
      estimateSkills: 'Estimar skills',
    },
    useAuctionNotifications: {
      heading: 'Configurar notificação',
      bidNotification: 'Notificar quando houver bid',
      proExclusive: '(apenas para {{exevopro}})',
      timeNotification: 'Notificar antes do leilão encerrar:',
      minutesLeft: 'Minutos faltando',
      hoursLeft: 'Horas faltando',
      cancelButton: 'Cancelar',
      confirmButton: 'Confirmar',
      success: 'Notificação foi agendada!',
    },
    EstimatedPriceDialog: {
      heading: 'Preço estimado de leilão',
      goToCalculator: 'Avalie mais personagens com a nossa {{calculatorPage}}',
      calculatorPage: 'calculadora de preços',
    },
    EstimatedSkillDialog: {
      heading: 'Skills do personagem',
      loyaltyPoints: 'pontos',
      none: 'Nenhum',
      skillValue: 'Valor da skill',
      tooltip: 'Custo necessário para atingir essa skill usando',
      skillWithLoyalty: 'Skill com bônus de Loyalty',
      goToCalculator:
        'Experimente com esse personagem em nossa {{calculatorPage}}',
      calculatorPage: 'calculadora de skills',
    },
  },
  FilterControl: {
    modes: {
      current: 'Leilões atuais',
      history: 'Histórico do Bazaar',
      favorites: 'Favoritos',
    },
    biddedOnly: 'Apenas com lance',
    invested: 'investido',
    allImbuements: 'Todos os imbuements',
    allCharms: 'Todos os charms',
    rareNickname: 'Nickname raro',
  },
  FilterDrawer: {
    title: 'Filtros',
    exevoProExclusive: '(exclusivo {{exevopro}})',
    labels: {
      searchNickname: 'Procurar nickname',
      vocation: 'Vocação',
      serverLocation: 'Localização do servidor',
      storeItems: 'Items da store',
      tcInvested: 'Tibia Coins investidos',
      biddedOnly: 'Apenas com lance',
      rareAchievements: 'Achievements raros',
      rareItems: 'Items raros',
      misc: 'Diversos',
      minCharmPoints: 'Min pontos de charm',
      maxCharmPoints: 'Max pontos de charm',
    },
    placeholders: {
      server: 'Escolha um servidor',
      imbuements: 'Selecionar imbuements',
      charms: 'Selecionar charms',
      quests: 'Selecionar quests',
      achievements: 'Selecionar achievements',
      rareItems: 'Escolha um item',
    },
    tooltips: {
      rareItems:
        'Se um item raro não estiver nesta lista é porque não há nenhum leilão com ele no momento.',
      rareNicknames:
        "Nicknames com caracteres especiais (äëïöüÿ'-.,), comprimento de 2-3 caracteres e letras maiúsculas consecutivas (e.g XVI)",
    },
    toggleAll: {
      imbuements: 'Todos os imbuements',
      charms: 'Todos os charms',
      items: 'Todos os items',
    },
    resetFilters: 'Resetar filtros',
    green: 'Verde',
    yellow: 'Amarelo',
    rareNicknamesButton: 'Nicknames raros',
    skullEmoji: 'caveira',
    SpritePicker: {
      search: 'Procurar por nome',
      item: 'item está selecionado',
      items: 'items estão selecionados',
    },
  },
})
