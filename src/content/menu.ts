/**
 * ------------------------------------------------------------------
 *  MARELUNA — the full card
 * ------------------------------------------------------------------
 *  Transcribed 1:1 from the official PDF `menu-mareluna-2026.pdf`,
 *  which remains the binding reference (linked from the menu page).
 *
 *  Rules applied while transcribing:
 *   • Prices are exactly the printed CHF values. Decimal separators were
 *     normalised to a dot (the PDF mixes "7,50" and "22.50"); no value
 *     was rounded, added or removed.
 *   • Italian dish names are kept in Italian in all three languages.
 *     Only genuinely French entries (drinks, spirits) are translated.
 *   • Descriptions are translated, never invented. Nothing that is not
 *     on the card appears here.
 *   • Four obvious typographic slips in the PDF were corrected and are
 *     listed in HANDOVER.md ("Salade étée", "pulpe grillé",
 *     "stacciata", "PETITES BOULLES").
 * ------------------------------------------------------------------
 */

export type Lang = 'fr' | 'it' | 'en';
export type L10n = Record<Lang, string>;

/** Allergen codes exactly as used on the printed card. */
export type Allergen = 'G' | 'L' | 'O' | 'P' | 'F' | 'A' | 'C' | 'M';

export type MenuItem = {
  id: string;
  /** Name as printed. Italian names stay Italian in every language. */
  name: string;
  /** Used instead of `name` when the printed entry is French. */
  nameL10n?: L10n;
  desc?: L10n;
  /** Price in CHF, exactly as printed. Two formats are separated by " / ". */
  price: string;
  /** Extra metadata printed next to the item (format, preparation). */
  meta?: L10n;
  allergens?: Allergen[];
};

export type MenuCategory = {
  id: string;
  title: L10n;
  /** Small line under the heading, e.g. the gluten-free notice. */
  note?: L10n;
  /** Price column header printed on the card, e.g. "1 dl / 75 cl". */
  priceHeader?: L10n;
  items: MenuItem[];
};

export const allergenLegend: { code: Allergen; label: L10n }[] = [
  { code: 'G', label: { fr: 'Gluten', it: 'Glutine', en: 'Gluten' } },
  { code: 'L', label: { fr: 'Produits laitiers', it: 'Latticini', en: 'Dairy' } },
  { code: 'O', label: { fr: 'Œufs', it: 'Uova', en: 'Eggs' } },
  { code: 'P', label: { fr: 'Poisson', it: 'Pesce', en: 'Fish' } },
  { code: 'F', label: { fr: 'Fruits à coque', it: 'Frutta a guscio', en: 'Nuts' } },
  { code: 'A', label: { fr: 'Arachides', it: 'Arachidi', en: 'Peanuts' } },
  { code: 'C', label: { fr: 'Crustacés', it: 'Crostacei', en: 'Crustaceans' } },
  { code: 'M', label: { fr: 'Mollusques', it: 'Molluschi', en: 'Molluscs' } },
];

/** Printed at the foot of the card, next to the allergen legend. */
export const meatOrigin: L10n = {
  fr: 'Provenance de nos viandes — Porc : Italie · Bœuf : Suisse · Poulet : Suisse',
  it: 'Provenienza delle nostre carni — Maiale: Italia · Manzo: Svizzera · Pollo: Svizzera',
  en: 'Origin of our meats — Pork: Italy · Beef: Switzerland · Chicken: Switzerland',
};

/** The gluten-free notice printed above the pizza list. Kept visible. */
export const glutenFreeNotice: L10n = {
  fr: 'Toutes nos pizzas sont disponibles sans gluten avec un supplément de 6 CHF.',
  it: 'Tutte le nostre pizze sono disponibili senza glutine con un supplemento di 6 CHF.',
  en: 'All our pizzas are available gluten-free for a supplement of 6 CHF.',
};

const bottleHeader: L10n = { fr: '1 dl / 75 cl', it: '1 dl / 75 cl', en: '1 dl / 75 cl' };

export const menu: MenuCategory[] = [
  /* ------------------------------------------------------------- */
  {
    id: 'antipasti',
    title: { fr: 'Pour bien commencer', it: 'Antipasti', en: 'To begin' },
    items: [
      {
        id: 'selezione-salumi-formaggi',
        name: 'La nostra selezione di salumi e formaggi',
        price: '24',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Notre sélection de charcuterie et de fromages.',
          it: 'La nostra selezione di salumi e formaggi.',
          en: 'Our selection of cured meats and cheeses.',
        },
      },
      {
        id: 'fritto-misto',
        name: 'Fritto misto partenopeo',
        price: '18',
        allergens: ['G', 'L', 'O'],
        desc: {
          fr: 'Frites, pacchero farci à la ricotta et au salami, frittatina napoletana, arancino, crocchè de pommes de terre.',
          it: 'Patatine fritte, pacchero ripieno di ricotta e salame, frittatina napoletana, arancino, crocchè di patate.',
          en: 'Fries, pacchero filled with ricotta and salami, Neapolitan frittatina, arancino, potato crocchè.',
        },
      },
      {
        id: 'parmigiana-melanzane',
        name: 'Parmigiana di melanzane',
        price: '16',
        allergens: ['L'],
        desc: {
          fr: 'Parmigiana d’aubergines.',
          it: 'Parmigiana di melanzane.',
          en: 'Aubergine parmigiana.',
        },
      },
      {
        id: 'fantasia-bruschette',
        name: 'Fantasia di bruschette',
        price: '15',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Assortiment de bruschette.',
          it: 'Assortimento di bruschette.',
          en: 'An assortment of bruschette.',
        },
      },
      {
        id: 'tris-montanare',
        name: 'Tris di montanare',
        price: '16',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Trio de mini-pizzas frites.',
          it: 'Tris di mini pizze fritte.',
          en: 'Three little fried pizzas.',
        },
      },
      {
        id: 'carpaccio-polpo',
        name: 'Carpaccio di polpo',
        price: '25',
        allergens: ['M'],
        desc: {
          fr: 'Carpaccio de poulpe sur lit de tomates côtelées, avec câpres, zestes de citron et poivre rose.',
          it: 'Carpaccio di polpo su letto di pomodori costoluti, con capperi, scorza di limone e pepe rosa.',
          en: 'Octopus carpaccio on a bed of ribbed tomatoes, with capers, lemon zest and pink pepper.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'salades',
    title: { fr: 'Les salades', it: 'Le insalate', en: 'Salads' },
    items: [
      {
        id: 'insalata-verde',
        name: 'Insalata verde',
        price: '7',
        desc: { fr: 'Salade verte.', it: 'Insalata verde.', en: 'Green salad.' },
      },
      {
        id: 'insalata-mista',
        name: 'Insalata mista',
        price: '9',
        desc: {
          fr: 'Salade mêlée, mélange de crudités.',
          it: 'Insalata mista, misto di verdure crude.',
          en: 'Mixed salad, assorted raw vegetables.',
        },
      },
      {
        id: 'insalata-caprese',
        name: 'Insalata caprese',
        price: '19',
        allergens: ['L'],
        desc: {
          fr: 'Mozzarella di bufala, tomates, basilic.',
          it: 'Mozzarella di bufala, pomodori, basilico.',
          en: 'Buffalo mozzarella, tomatoes, basil.',
        },
      },
      {
        id: 'insalata-estate',
        name: 'Insalata estate',
        price: '24',
        allergens: ['P'],
        desc: {
          fr: 'Salade d’été : salade mêlée, saumon fumé, oignons rouges de Tropea, tomates datterino jaunes et rouges, asperges.',
          it: 'Insalata d’estate: insalata mista, salmone affumicato, cipolla rossa di Tropea, datterini gialli e rossi, asparagi.',
          en: 'Summer salad: mixed leaves, smoked salmon, Tropea red onions, yellow and red datterino tomatoes, asparagus.',
        },
      },
      {
        id: 'insalata-cesare',
        name: 'Insalata cesare',
        price: '24',
        allergens: ['L'],
        desc: {
          fr: 'Salade césar : salade mêlée, poulet grillé, olives, copeaux de grana padano, croûtons, réduction balsamique.',
          it: 'Insalata caesar: insalata mista, pollo grigliato, olive, scaglie di grana padano, crostini, riduzione di balsamico.',
          en: 'Caesar salad: mixed leaves, grilled chicken, olives, grana padano shavings, croutons, balsamic reduction.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'pates',
    title: { fr: 'Nos pâtes', it: 'Le nostre paste', en: 'Our pasta' },
    items: [
      {
        id: 'gnocchi-sorrentina',
        name: 'Gnocchi alla sorrentina',
        price: '23',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Gnocchi à la sauce tomate et provola fumée fondante, gratinés au four.',
          it: 'Gnocchi al sugo di pomodoro e provola affumicata filante, gratinati al forno.',
          en: 'Gnocchi in tomato sauce with melting smoked provola, baked until golden.',
        },
      },
      {
        id: 'spaghettone-nerano',
        name: 'Spaghettone alla Nerano',
        price: '24',
        allergens: ['G'],
        desc: {
          fr: 'Spaghettoni à la crème de courgettes et basilic, garnis de provolone del Monaco.',
          it: 'Spaghettoni alla crema di zucchine e basilico, con provolone del Monaco.',
          en: 'Spaghettoni in a courgette and basil cream, finished with provolone del Monaco.',
        },
      },
      {
        id: 'ziti-genovese',
        name: 'Ziti alla genovese',
        price: '26',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Ziti au ragoût d’oignons doux et tendre viande de bœuf, longuement mijotés selon la tradition napolitaine.',
          it: 'Ziti al ragù di cipolle dolci e tenera carne di manzo, cotti a lungo secondo la tradizione napoletana.',
          en: 'Ziti with a ragù of sweet onions and tender beef, slow-cooked in the Neapolitan tradition.',
        },
      },
      {
        id: 'spaghettone-carbonara',
        name: 'Spaghettone alla carbonara',
        price: '25',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Spaghettoni à la crème d’œufs, pecorino et guanciale croustillant.',
          it: 'Spaghettoni alla crema di uova, pecorino e guanciale croccante.',
          en: 'Spaghettoni in an egg and pecorino cream with crisp guanciale.',
        },
      },
      {
        id: 'paccheri-gambero-rosso',
        name: 'Paccheri con crema di pomodoro giallo, tartare di gambero rosso di Mazara e granella di pistacchio',
        price: '33',
        allergens: ['G', 'P'],
        desc: {
          fr: 'Paccheri à la crème de tomates datterino jaunes, tartare de crevette rouge de Mazara del Vallo et éclats de pistaches.',
          it: 'Paccheri alla crema di datterini gialli, tartare di gambero rosso di Mazara del Vallo e granella di pistacchio.',
          en: 'Paccheri in a yellow datterino tomato cream, with red Mazara del Vallo prawn tartare and crushed pistachios.',
        },
      },
      {
        id: 'linguine-astice',
        name: 'Linguine all’astice',
        price: '40',
        allergens: ['G', 'C'],
        desc: {
          fr: 'Linguine au homard et tomates datterino jaunes et rouges.',
          it: 'Linguine all’astice con datterini gialli e rossi.',
          en: 'Linguine with lobster and yellow and red datterino tomatoes.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'secondi',
    title: { fr: 'Pour continuer', it: 'Secondi', en: 'To continue' },
    items: [
      {
        id: 'la-polpetta',
        name: 'La polpetta',
        price: '24',
        allergens: ['G', 'L', 'O'],
        desc: {
          fr: 'Boulettes de bœuf à la sauce tomate maison, accompagnées de pommes de terre rôties aux herbes aromatiques.',
          it: 'Polpette di manzo al sugo di pomodoro fatto in casa, con patate arrosto alle erbe aromatiche.',
          en: 'Beef meatballs in a house tomato sauce, with herb-roasted potatoes.',
        },
      },
      {
        id: 'la-salsiccia',
        name: 'La salsiccia',
        price: '34',
        allergens: ['L'],
        desc: {
          fr: 'Saucisses de porc grillées, servies avec des friarielli relevés à l’huile d’olive et des frites croustillantes.',
          it: 'Salsicce di maiale alla griglia, servite con friarielli saltati all’olio d’oliva e patatine croccanti.',
          en: 'Grilled pork sausages, served with friarielli in olive oil and crisp fries.',
        },
      },
      {
        id: 'la-tagliata',
        name: 'La tagliata',
        price: '42',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Tagliata d’entrecôte de bœuf accompagnée de courgettes parfumées à la menthe, tomates séchées et crème au parmesan, avec asperges sautées au beurre.',
          it: 'Tagliata di entrecôte di manzo con zucchine profumate alla menta, pomodori secchi e crema di parmigiano, e asparagi saltati al burro.',
          en: 'Sliced beef entrecôte with mint-scented courgettes, sun-dried tomatoes and parmesan cream, with butter-sautéed asparagus.',
        },
      },
      {
        id: 'il-polpo',
        name: 'Il polpo',
        price: '40',
        allergens: ['L', 'M'],
        desc: {
          fr: 'Tentacules de poulpe grillé sur un lit de friarielli, nappés d’une crème de provola fumée, accompagnés de pommes de terre rôties.',
          it: 'Tentacoli di polpo grigliati su un letto di friarielli, con crema di provola affumicata e patate arrosto.',
          en: 'Grilled octopus tentacles on a bed of friarielli, with a smoked provola cream and roast potatoes.',
        },
      },
      {
        id: 'il-tonno',
        name: 'Il tonno',
        price: '35',
        allergens: ['P'],
        desc: {
          fr: 'Steak de thon saisi, servi avec roquette, tomates cerises et réduction de vinaigre balsamique, accompagné de frites.',
          it: 'Trancio di tonno scottato, servito con rucola, pomodorini e riduzione di aceto balsamico, con patatine.',
          en: 'Seared tuna steak, served with rocket, cherry tomatoes and a balsamic reduction, with fries.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'pizzas',
    title: { fr: 'Nos pizzas', it: 'Le nostre pizze', en: 'Our pizzas' },
    note: glutenFreeNotice,
    items: [
      {
        id: 'marinara',
        name: 'Marinara',
        price: '15',
        allergens: ['G'],
        desc: {
          fr: 'Sauce tomate, origan, ail, basilic.',
          it: 'Pomodoro, origano, aglio, basilico.',
          en: 'Tomato sauce, oregano, garlic, basil.',
        },
      },
      {
        id: 'pizza-margherita',
        name: 'Margherita',
        price: '16',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Sauce tomate, fior di latte, grana padano, basilic.',
          it: 'Pomodoro, fior di latte, grana padano, basilico.',
          en: 'Tomato sauce, fior di latte, grana padano, basil.',
        },
      },
      {
        id: 'margherita-provola-pepe',
        name: 'Margherita provola e pepe',
        price: '17',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Sauce tomate, provola fumée, poivre, grana padano, basilic.',
          it: 'Pomodoro, provola affumicata, pepe, grana padano, basilico.',
          en: 'Tomato sauce, smoked provola, pepper, grana padano, basil.',
        },
      },
      {
        id: 'napoli-mia',
        name: 'Napoli mia',
        price: '21',
        allergens: ['G', 'L', 'P'],
        desc: {
          fr: 'Sauce tomate, origan, ail, anchois, câpres, olives, basilic.',
          it: 'Pomodoro, origano, aglio, acciughe, capperi, olive, basilico.',
          en: 'Tomato sauce, oregano, garlic, anchovies, capers, olives, basil.',
        },
      },
      {
        id: 'bufalina',
        name: 'Bufalina',
        price: '21',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Sauce tomate, bufala DOP, grana padano, basilic.',
          it: 'Pomodoro, bufala DOP, grana padano, basilico.',
          en: 'Tomato sauce, DOP buffalo mozzarella, grana padano, basil.',
        },
      },
      {
        id: 'prosciutto-funghi',
        name: 'Prosciutto e funghi',
        price: '22',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Sauce tomate, fior di latte, jambon cuit, champignons, grana padano, basilic.',
          it: 'Pomodoro, fior di latte, prosciutto cotto, funghi, grana padano, basilico.',
          en: 'Tomato sauce, fior di latte, cooked ham, mushrooms, grana padano, basil.',
        },
      },
      {
        id: 'quattro-stagioni',
        name: 'Quattro stagioni',
        price: '23',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Sauce tomate, fior di latte, jambon cuit, champignons, poivrons, artichauts, grana padano, basilic.',
          it: 'Pomodoro, fior di latte, prosciutto cotto, funghi, peperoni, carciofi, grana padano, basilico.',
          en: 'Tomato sauce, fior di latte, cooked ham, mushrooms, peppers, artichokes, grana padano, basil.',
        },
      },
      {
        id: 'siciliana',
        name: 'Siciliana',
        price: '23',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Sauce tomate, fior di latte, aubergines, ricotta salée, grana padano, basilic.',
          it: 'Pomodoro, fior di latte, melanzane, ricotta salata, grana padano, basilico.',
          en: 'Tomato sauce, fior di latte, aubergines, salted ricotta, grana padano, basil.',
        },
      },
      {
        id: 'capricciosa',
        name: 'Capricciosa',
        price: '24',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Sauce tomate, fior di latte, artichauts, champignons, salami, jambon cuit, olives, grana padano, basilic.',
          it: 'Pomodoro, fior di latte, carciofi, funghi, salame, prosciutto cotto, olive, grana padano, basilico.',
          en: 'Tomato sauce, fior di latte, artichokes, mushrooms, salami, cooked ham, olives, grana padano, basil.',
        },
      },
      {
        id: 'diavola',
        name: 'Diavola',
        price: '22.50',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Sauce tomate, fior di latte, salami piquant, nduja, grana padano, basilic.',
          it: 'Pomodoro, fior di latte, salame piccante, nduja, grana padano, basilico.',
          en: 'Tomato sauce, fior di latte, spicy salami, nduja, grana padano, basil.',
        },
      },
      {
        id: 'calzone-napoletano',
        name: 'Calzone napoletano',
        price: '23.50',
        allergens: ['G', 'L'],
        meta: { fr: 'Frit ou au four', it: 'Fritto o al forno', en: 'Fried or baked' },
        desc: {
          fr: 'Sauce tomate, salami, ricotta, fior di latte, grana padano, basilic.',
          it: 'Pomodoro, salame, ricotta, fior di latte, grana padano, basilico.',
          en: 'Tomato sauce, salami, ricotta, fior di latte, grana padano, basil.',
        },
      },
      {
        id: 'pizza-cornice',
        name: 'Pizza cornice',
        price: '26',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Bord farci à la ricotta, ragoût, boulettes de bœuf, provola fumée, poivre, grana padano, basilic.',
          it: 'Cornicione ripieno di ricotta, ragù, polpette di manzo, provola affumicata, pepe, grana padano, basilico.',
          en: 'Ricotta-filled crust, ragù, beef meatballs, smoked provola, pepper, grana padano, basil.',
        },
      },
      {
        id: 'pizza-parmigiana',
        name: 'Parmigiana',
        price: '25',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Parmigiana d’aubergines, jambon cuit, copeaux de grana padano, basilic.',
          it: 'Parmigiana di melanzane, prosciutto cotto, scaglie di grana padano, basilico.',
          en: 'Aubergine parmigiana, cooked ham, grana padano shavings, basil.',
        },
      },
      {
        id: 'sahara',
        name: 'Sahara',
        price: '23',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Sauce tomate, fior di latte, merguez, olives noires, copeaux de grana padano, basilic.',
          it: 'Pomodoro, fior di latte, merguez, olive nere, scaglie di grana padano, basilico.',
          en: 'Tomato sauce, fior di latte, merguez, black olives, grana padano shavings, basil.',
        },
      },
      {
        id: 'tonno-cipolle',
        name: 'Tonno e cipolle',
        price: '23.50',
        allergens: ['G', 'L', 'P'],
        desc: {
          fr: 'Sauce tomate, fior di latte, thon, oignons rouges, basilic.',
          it: 'Pomodoro, fior di latte, tonno, cipolla rossa, basilico.',
          en: 'Tomato sauce, fior di latte, tuna, red onions, basil.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'pizzas-blanches',
    title: { fr: 'Pizzas blanches', it: 'Pizze bianche', en: 'White pizzas' },
    note: glutenFreeNotice,
    items: [
      {
        id: 'verace',
        name: 'Verace',
        price: '23.50',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Bufala DOP, tomates jaunes et rouges, copeaux de grana padano, basilic.',
          it: 'Bufala DOP, pomodorini gialli e rossi, scaglie di grana padano, basilico.',
          en: 'DOP buffalo mozzarella, yellow and red tomatoes, grana padano shavings, basil.',
        },
      },
      {
        id: 'cafona',
        name: 'Cafona',
        price: '26.50',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Saucisse, pommes de terre, provola fumée, crème de grana padano, basilic.',
          it: 'Salsiccia, patate, provola affumicata, crema di grana padano, basilico.',
          en: 'Sausage, potatoes, smoked provola, grana padano cream, basil.',
        },
      },
      {
        id: 'primavera',
        name: 'Primavera',
        price: '24',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Fior di latte, jambon de Parme, roquette, copeaux de grana padano.',
          it: 'Fior di latte, prosciutto di Parma, rucola, scaglie di grana padano.',
          en: 'Fior di latte, Parma ham, rocket, grana padano shavings.',
        },
      },
      {
        id: 'valtellina',
        name: 'Valtellina',
        price: '26.50',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Fior di latte, bresaola, roquette, stracciata di bufala.',
          it: 'Fior di latte, bresaola, rucola, stracciata di bufala.',
          en: 'Fior di latte, bresaola, rocket, stracciata di bufala.',
        },
      },
      {
        id: 'salsiccia-friarielli',
        name: 'Salsiccia e friarielli',
        price: '25.50',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Provola fumée, saucisse, friarielli, crème de grana padano.',
          it: 'Provola affumicata, salsiccia, friarielli, crema di grana padano.',
          en: 'Smoked provola, sausage, friarielli, grana padano cream.',
        },
      },
      {
        id: 'cinque-formaggi',
        name: 'Cinque formaggi',
        price: '24',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Provola fumée, bufala DOP, gorgonzola, fior di latte, grana padano.',
          it: 'Provola affumicata, bufala DOP, gorgonzola, fior di latte, grana padano.',
          en: 'Smoked provola, DOP buffalo mozzarella, gorgonzola, fior di latte, grana padano.',
        },
      },
      {
        id: 'ortolana',
        name: 'Ortolana',
        price: '22.50',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Fior di latte, aubergines, poivrons, courgettes, grana padano, basilic.',
          it: 'Fior di latte, melanzane, peperoni, zucchine, grana padano, basilico.',
          en: 'Fior di latte, aubergines, peppers, courgettes, grana padano, basil.',
        },
      },
      {
        id: 'profumata',
        name: 'Profumata',
        price: '26.50',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Bufala DOP, lard de Colonnata, huile à la truffe, lamelles de grana padano, basilic.',
          it: 'Bufala DOP, lardo di Colonnata, olio al tartufo, lamelle di grana padano, basilico.',
          en: 'DOP buffalo mozzarella, Colonnata lardo, truffle oil, grana padano slivers, basil.',
        },
      },
      {
        id: 'mortadella',
        name: 'Mortadella',
        price: '27',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Fior di latte, burrata, mortadelle, crème de pistache, graines de pistaches, grana padano, basilic.',
          it: 'Fior di latte, burrata, mortadella, crema di pistacchio, granella di pistacchio, grana padano, basilico.',
          en: 'Fior di latte, burrata, mortadella, pistachio cream, pistachio grains, grana padano, basil.',
        },
      },
      {
        id: 'pizza-nerano',
        name: 'Nerano',
        price: '28',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Provola fumée, crème de courgettes et basilic, stracciata di bufala, rondelles de courgettes et provolone del Monaco.',
          it: 'Provola affumicata, crema di zucchine e basilico, stracciata di bufala, rondelle di zucchine e provolone del Monaco.',
          en: 'Smoked provola, courgette and basil cream, stracciata di bufala, courgette rounds and provolone del Monaco.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'focaccie',
    title: { fr: 'Les focaccie', it: 'Le focacce', en: 'Focaccie' },
    items: [
      {
        id: 'focaccia-classica',
        name: 'La classica',
        price: '9',
        allergens: ['G'],
        desc: { fr: 'Huile d’olive, origan.', it: 'Olio d’oliva, origano.', en: 'Olive oil, oregano.' },
      },
      {
        id: 'focaccia-mareluna',
        name: 'Mareluna',
        price: '28',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Huile d’olive, origan, stracciata di bufala DOP, jambon de Parme, tomates datterino jaunes et rouges, basilic frais.',
          it: 'Olio d’oliva, origano, stracciata di bufala DOP, prosciutto di Parma, datterini gialli e rossi, basilico fresco.',
          en: 'Olive oil, oregano, DOP stracciata di bufala, Parma ham, yellow and red datterino tomatoes, fresh basil.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'enfants',
    title: { fr: 'Pour les enfants', it: 'Per i bambini', en: 'For children' },
    note: {
      fr: 'Nous adaptons volontiers selon vos demandes.',
      it: 'Adattiamo volentieri secondo le vostre richieste.',
      en: 'We are happy to adapt to your requests.',
    },
    items: [
      {
        id: 'pizza-margherita-mini',
        name: 'Pizza margherita mini',
        price: '11',
        allergens: ['G', 'L'],
        desc: { fr: 'Mini pizza margherita.', it: 'Mini pizza margherita.', en: 'Mini margherita pizza.' },
      },
      {
        id: 'pennette-pomodoro',
        name: 'Pennette al pomodoro',
        price: '15',
        allergens: ['G', 'L'],
        desc: {
          fr: 'Pâtes penne à la sauce tomate maison.',
          it: 'Pennette al sugo di pomodoro fatto in casa.',
          en: 'Penne in a house tomato sauce.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'boissons',
    title: { fr: 'Les boissons', it: 'Le bevande', en: 'Drinks' },
    items: [
      {
        id: 'eau-microfiltree',
        name: 'Eau micro filtrée',
        nameL10n: { fr: 'Eau micro filtrée', it: 'Acqua microfiltrata', en: 'Micro-filtered water' },
        price: '5',
        meta: {
          fr: 'Plate, gazeuse ou tempérée · 70 cl',
          it: 'Naturale, frizzante o a temperatura ambiente · 70 cl',
          en: 'Still, sparkling or room temperature · 70 cl',
        },
      },
      {
        id: 'san-pellegrino',
        name: 'Eau minérale San Pellegrino',
        nameL10n: {
          fr: 'Eau minérale San Pellegrino',
          it: 'Acqua minerale San Pellegrino',
          en: 'San Pellegrino mineral water',
        },
        price: '7',
        meta: { fr: '75 cl', it: '75 cl', en: '75 cl' },
      },
      {
        id: 'sirop',
        name: 'Sirop',
        nameL10n: { fr: 'Sirop', it: 'Sciroppo', en: 'Cordial' },
        price: '2',
        meta: {
          fr: 'Grenadine ou menthe · 33 cl',
          it: 'Granatina o menta · 33 cl',
          en: 'Grenadine or mint · 33 cl',
        },
      },
      {
        id: 'jus-pomme',
        name: 'Jus de pomme Ramseier',
        nameL10n: {
          fr: 'Jus de pomme Ramseier',
          it: 'Succo di mela Ramseier',
          en: 'Ramseier apple juice',
        },
        price: '6',
        meta: { fr: '33 cl', it: '33 cl', en: '33 cl' },
      },
      {
        id: 'jus-orange',
        name: 'Jus d’orange',
        nameL10n: { fr: 'Jus d’orange', it: 'Succo d’arancia', en: 'Orange juice' },
        price: '4',
        meta: { fr: '33 cl', it: '33 cl', en: '33 cl' },
      },
      {
        id: 'jus-peche',
        name: 'Jus de pêche',
        nameL10n: { fr: 'Jus de pêche', it: 'Succo di pesca', en: 'Peach juice' },
        price: '4',
        meta: { fr: '33 cl', it: '33 cl', en: '33 cl' },
      },
      {
        id: 'jus-tomate',
        name: 'Jus de tomate',
        nameL10n: { fr: 'Jus de tomate', it: 'Succo di pomodoro', en: 'Tomato juice' },
        price: '4',
        meta: { fr: '33 cl', it: '33 cl', en: '33 cl' },
      },
      {
        id: 'rivella',
        name: 'Rivella',
        price: '5',
        meta: { fr: '33 cl', it: '33 cl', en: '33 cl' },
      },
      {
        id: 'the-froid',
        name: 'Thé froid',
        nameL10n: { fr: 'Thé froid', it: 'Tè freddo', en: 'Iced tea' },
        price: '5',
        meta: {
          fr: 'Citron ou pêche · 33 cl',
          it: 'Limone o pesca · 33 cl',
          en: 'Lemon or peach · 33 cl',
        },
      },
      { id: 'coca-cola', name: 'Coca-Cola', price: '5', meta: { fr: '33 cl', it: '33 cl', en: '33 cl' } },
      {
        id: 'coca-cola-zero',
        name: 'Coca-Cola Zero',
        price: '5',
        meta: { fr: '33 cl', it: '33 cl', en: '33 cl' },
      },
      { id: 'fanta', name: 'Fanta', price: '5', meta: { fr: '33 cl', it: '33 cl', en: '33 cl' } },
      { id: 'sprite', name: 'Sprite', price: '5', meta: { fr: '33 cl', it: '33 cl', en: '33 cl' } },
      { id: 'schweppes-tonic', name: 'Schweppes Tonic', price: '6' },
      {
        id: 'sanbitter',
        name: 'Sanbitter rouge',
        nameL10n: { fr: 'Sanbitter rouge', it: 'Sanbittèr rosso', en: 'Sanbitter red' },
        price: '6',
        meta: { fr: '1 dl', it: '1 dl', en: '1 dl' },
      },
      { id: 'chinotto', name: 'Chinotto', price: '5', meta: { fr: '2 dl', it: '2 dl', en: '2 dl' } },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'aperitifs',
    title: { fr: 'Apéritifs', it: 'Aperitivi', en: 'Aperitifs' },
    items: [
      {
        id: 'aperol-spritz',
        name: 'Aperol Spritz',
        price: '11',
        desc: {
          fr: 'Aperol, prosecco, eau gazeuse.',
          it: 'Aperol, prosecco, soda.',
          en: 'Aperol, prosecco, soda water.',
        },
      },
      {
        id: 'hugo-spritz',
        name: 'Hugo Spritz',
        price: '11',
        desc: {
          fr: 'Prosecco, sirop de fleurs de sureau, eau gazeuse.',
          it: 'Prosecco, sciroppo di fiori di sambuco, soda.',
          en: 'Prosecco, elderflower cordial, soda water.',
        },
      },
      {
        id: 'campari-spritz',
        name: 'Campari Spritz',
        price: '13',
        desc: {
          fr: 'Campari, prosecco, eau gazeuse.',
          it: 'Campari, prosecco, soda.',
          en: 'Campari, prosecco, soda water.',
        },
      },
      {
        id: 'limoncello-spritz',
        name: 'Limoncello Spritz',
        price: '15',
        desc: {
          fr: 'Limoncello, prosecco, eau gazeuse.',
          it: 'Limoncello, prosecco, soda.',
          en: 'Limoncello, prosecco, soda water.',
        },
      },
      {
        id: 'gin-tonic',
        name: 'Gin & Tonic',
        price: '14',
        desc: { fr: 'Gin, eau tonique.', it: 'Gin, acqua tonica.', en: 'Gin, tonic water.' },
      },
      {
        id: 'americano',
        name: 'Americano',
        price: '13',
        desc: {
          fr: 'Campari, vermouth rouge, eau gazeuse.',
          it: 'Campari, vermouth rosso, soda.',
          en: 'Campari, red vermouth, soda water.',
        },
      },
      {
        id: 'negroni',
        name: 'Negroni',
        price: '15',
        desc: {
          fr: 'Campari, vermouth rouge, gin.',
          it: 'Campari, vermouth rosso, gin.',
          en: 'Campari, red vermouth, gin.',
        },
      },
      {
        id: 'negroni-sbagliato',
        name: 'Negroni sbagliato',
        price: '15',
        desc: {
          fr: 'Campari, vermouth rouge, prosecco.',
          it: 'Campari, vermouth rosso, prosecco.',
          en: 'Campari, red vermouth, prosecco.',
        },
      },
      {
        id: 'capotonic',
        name: 'Capotonic',
        price: '15',
        desc: {
          fr: 'Amaro del Capo, eau tonique.',
          it: 'Amaro del Capo, acqua tonica.',
          en: 'Amaro del Capo, tonic water.',
        },
      },
      {
        id: 'kir',
        name: 'Kir vin blanc',
        nameL10n: { fr: 'Kir vin blanc', it: 'Kir vino bianco', en: 'Kir, white wine' },
        price: '9',
        desc: {
          fr: 'Crème de cassis, vin blanc.',
          it: 'Crema di cassis, vino bianco.',
          en: 'Crème de cassis, white wine.',
        },
      },
      {
        id: 'martini-blanc',
        name: 'Martini Blanc',
        nameL10n: { fr: 'Martini Blanc', it: 'Martini Bianco', en: 'Martini Bianco' },
        price: '9',
      },
      {
        id: 'martini-rouge',
        name: 'Martini Rouge',
        nameL10n: { fr: 'Martini Rouge', it: 'Martini Rosso', en: 'Martini Rosso' },
        price: '9',
      },
      {
        id: 'porto-rouge',
        name: 'Porto rouge',
        nameL10n: { fr: 'Porto rouge', it: 'Porto rosso', en: 'Red port' },
        price: '8',
      },
      { id: 'ricard', name: 'Ricard', price: '7' },
      { id: 'suze', name: 'Suze', price: '7' },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'bieres',
    title: { fr: 'Les bières', it: 'Le birre', en: 'Beers' },
    items: [
      {
        id: 'peroni-pression',
        name: 'Peroni Nastro Azzurro',
        price: '5.50 / 9',
        meta: {
          fr: 'Pression · 3 dl / 5 dl',
          it: 'Alla spina · 3 dl / 5 dl',
          en: 'Draught · 3 dl / 5 dl',
        },
        allergens: ['G'],
      },
      {
        id: 'peroni-bouteille',
        name: 'Peroni Nastro Azzurro',
        price: '6.50',
        meta: { fr: '33 cl', it: '33 cl', en: '33 cl' },
        allergens: ['G'],
      },
      {
        id: 'peroni-capri',
        name: 'Peroni Nastro Azzurro Capri',
        price: '6.50',
        meta: { fr: '33 cl', it: '33 cl', en: '33 cl' },
        allergens: ['G'],
      },
      {
        id: 'peroni-sans-alcool',
        name: 'Peroni Nastro Azzurro sans alcool',
        nameL10n: {
          fr: 'Peroni Nastro Azzurro sans alcool',
          it: 'Peroni Nastro Azzurro analcolica',
          en: 'Peroni Nastro Azzurro alcohol-free',
        },
        price: '6.50',
        meta: { fr: '33 cl', it: '33 cl', en: '33 cl' },
        allergens: ['G'],
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'petites-bulles',
    title: { fr: 'Petites bulles', it: 'Bollicine', en: 'Sparkling' },
    priceHeader: bottleHeader,
    items: [
      { id: 'lo-sparviere-franciacorta', name: 'Lo Sparviere Franciacorta DOCG Satèn BIO', price: '79' },
      { id: 'le-rughe-prosecco', name: 'Le Rughe Prosecco DOC Extra Dry', price: '8 / 49' },
      {
        id: 'besserat-de-bellefon',
        name: 'Besserat de Bellefon Cuvée des Moines Brut',
        price: '120',
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'vins-rouges',
    title: { fr: 'Vins rouges', it: 'Vini rossi', en: 'Red wines' },
    priceHeader: bottleHeader,
    items: [
      { id: 'fumin-esprit-follet', name: 'Vallée d’Aoste DOC Fumin Esprit Follet (2021)', price: '82' },
      { id: 'mario-costa-nebbiolo', name: 'Mario Costa Langhe Nebbiolo DOC (2024)', price: '52' },
      { id: 'barbaresco-canova', name: 'Barbaresco DOCG Canova (2022)', price: '94' },
      {
        id: 'ettore-germano-barolo',
        name: 'Ettore Germano Barolo del Comune di Serralunga d’Alba DOCG (2021)',
        price: '90',
      },
      {
        id: 'monte-la-parte-amarone',
        name: 'Monte la Parte Amarone della Valpolicella DOCG (2013)',
        price: '109',
      },
      { id: 'matero-rosso', name: 'Matero Rosso Toscana IGT (2024)', price: '7 / 47' },
      { id: 'la-badiola-serafino', name: 'La Badiola Serafino Rosso DOC (2021)', price: '80' },
      { id: 'tenuta-fertuna-pactio', name: 'Tenuta Fertuna Pactio Toscana IGT (2021)', price: '58' },
      { id: 'marzia-canale-taurasi', name: 'Marzia Canale Taurasi DOCG (2017)', price: '69' },
      { id: 'nero-mora-aglianico', name: 'Nero Mora Aglianico IGT (2022)', price: '7.50 / 49' },
      { id: 'torre-antica-primitivo', name: 'Torre Antica Primitivo Puglia IGP (2023)', price: '6.50 / 45' },
      { id: 'vineka-negroamaro', name: 'Vineka Negroamaro Puglia IGP (2023)', price: '47' },
      { id: 'primo-scuro-cannonau', name: 'Primo Scuro Cannonau di Sardegna DOC (2023)', price: '52' },
      { id: 'colpasso-nero-davola', name: 'Colpasso Nero d’Avola Sicilia DOC (2025)', price: '45' },
      {
        id: 'gamaret-garanoir',
        name: 'Gamaret Garanoir Expression La Côte AOC (2023)',
        price: '51',
      },
      { id: 'cuvee-du-peintre-gamay', name: 'Cuvée du Peintre Gamay AOC (2022)', price: '6.50 / 45' },
      {
        id: 'le-mage-pinot-noir',
        name: 'Le Mage Pinot Noir Grand Cru d’Etoy (2024)',
        price: '32',
        meta: { fr: '5 dl', it: '5 dl', en: '5 dl' },
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'vins-blancs',
    title: { fr: 'Vins blancs', it: 'Vini bianchi', en: 'White wines' },
    priceHeader: bottleHeader,
    items: [
      { id: 'mario-costa-arneis', name: 'Mario Costa Roero Arneis DOCG (2024)', price: '45' },
      {
        id: 'villa-canestrari-chardonnay',
        name: 'Villa Canestrari Chardonnay Veneto IGT (2024)',
        price: '6 / 42',
      },
      {
        id: 'i-territori-pinot-grigio',
        name: 'I Territori Pinot Grigio delle Venezie DOC (2024)',
        price: '6.50 / 42',
      },
      { id: 'lariella-greco-di-tufo', name: 'L’Ariella Greco di Tufo DOCG (2025)', price: '49' },
      { id: 'le-grade-fiano', name: 'Le Grade Fiano di Avellino DOCG (2021)', price: '46' },
      {
        id: 'vinosia-falanghina',
        name: 'Vinosia Falanghina del Beneventano IGT (2025)',
        price: '7 / 46',
      },
      {
        id: 'primo-bianco-vermentino',
        name: 'Primo Bianco Vermentino di Sardegna DOC (2022)',
        price: '49',
      },
      { id: 'doral-expression', name: 'Doral Expression La Côte AOC (2024)', price: '47' },
      {
        id: 'la-pepite-chasselas',
        name: 'La Pépite Chasselas Grand Cru d’Etoy (2025)',
        price: '6.50 / 42',
      },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'vins-roses',
    title: { fr: 'Vins rosés', it: 'Vini rosati', en: 'Rosé wines' },
    priceHeader: bottleHeader,
    items: [
      {
        id: 'rosa-di-santa-tresa',
        name: 'Rosa di Santa Tresa Rosé Terre Siciliane IGP bio organic (2024)',
        price: '7 / 49',
      },
      { id: 'cuvee-des-pedzes', name: 'Cuvée des Pèdzes La Tiaffe (2024)', price: '6 / 43' },
    ],
  },

  /* ------------------------------------------------------------- */
  {
    id: 'spiritueux',
    title: {
      fr: 'Spiritueux et digestifs',
      it: 'Liquori e digestivi',
      en: 'Spirits & digestifs',
    },
    items: [
      {
        id: 'cafe',
        name: 'Café',
        nameL10n: { fr: 'Café', it: 'Caffè', en: 'Coffee' },
        price: '4',
      },
      {
        id: 'the-chaud',
        name: 'Thé chaud',
        nameL10n: { fr: 'Thé chaud', it: 'Tè caldo', en: 'Hot tea' },
        price: '4',
      },
      { id: 'cappuccino', name: 'Cappuccino', price: '4.50', allergens: ['L'] },
      { id: 'limoncello', name: 'Limoncello', price: '8' },
      { id: 'amaro-del-capo', name: 'Amaro del Capo', price: '8' },
      { id: 'amaro-averna', name: 'Amaro Averna', price: '8' },
      { id: 'fernet-branca', name: 'Fernet Branca', price: '8' },
      { id: 'jagermeister', name: 'Jägermeister', price: '8' },
      { id: 'amaretto-disaronno', name: 'Amaretto Disaronno', price: '8' },
      { id: 'sambuca', name: 'Sambuca', price: '9' },
      { id: 'jb', name: 'J&B', price: '11' },
      { id: 'red-label', name: 'Red Label', price: '12' },
      { id: 'williamine', name: 'Williamine', price: '12' },
      { id: 'abricotine', name: 'Abricotine', price: '12' },
      { id: 'diplomatico', name: 'Diplomatico', price: '14' },
      {
        id: 'grappa-barbaresco',
        name: 'Grappa di Barbaresco invecchiata in botti di rovere',
        price: '13',
      },
      {
        id: 'grappa-valpolicella',
        name: 'Villa Canestrari Grappa della Valpolicella',
        price: '12',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */

const itemIndex = new Map<string, { item: MenuItem; category: MenuCategory }>();
for (const category of menu) {
  for (const item of category.items) {
    itemIndex.set(item.id, { item, category });
  }
}

export function findItem(id: string) {
  return itemIndex.get(id);
}

export function itemName(item: MenuItem, lang: Lang): string {
  return item.nameL10n ? item.nameL10n[lang] : item.name;
}

/**
 * The dishes featured in the “Signature” section of the home page.
 *
 * Chosen from the dishes for which a REAL photograph of that exact dish
 * exists. A dish is never illustrated with a photo of another dish, so
 * e.g. Spaghettone alla Nerano and Carpaccio di polpo are left out until
 * Mareluna supplies a photo of them. Swapping a dish in is a one-line
 * change here plus one entry in `signaturePhoto`.
 */
export const signatureDishIds = [
  'linguine-astice',
  'pizza-margherita',
  'ziti-genovese',
  'fritto-misto',
] as const;

/** Photo id used alongside each signature dish (see content/images.ts). */
export const signaturePhoto: Record<string, string> = {
  'linguine-astice': 'linguine-homard',
  'pizza-margherita': 'pizza-margherita',
  'ziti-genovese': 'ziti-genovese',
  'fritto-misto': 'fritto-misto',
};
