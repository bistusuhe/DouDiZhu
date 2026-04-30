const stage = document.getElementById("stage");
const stageShell = document.getElementById("stage-shell");
const handCardsEl = document.getElementById("hand-cards");
const lastPlayEl = document.getElementById("last-play");
const lastPlayEmpty = document.getElementById("last-play-empty");
const playBtn = document.getElementById("play-btn");
const passBtn = document.getElementById("pass-btn");
const hintBtn = document.getElementById("hint-btn");
const validationText = document.getElementById("validation-text");
const opponentHint = document.getElementById("opponent-hint");
const opponentTitle = document.getElementById("opponent-title");
const opponentDesc = document.getElementById("opponent-desc");
const hintBar = document.getElementById("hint-bar");
const hintText = document.getElementById("hint-text");
const endModal = document.getElementById("end-modal");
const restartBtn = document.getElementById("restart-btn");
const endBtn = document.getElementById("end-btn");
const typeGrid = document.getElementById("type-grid");
const typeGallery = document.querySelector(".type-gallery");
const rulesBtn = document.getElementById("rules-btn");
const landlordCardsEl = document.getElementById("landlord-cards");
const startOverlay = document.getElementById("start-overlay");
const startStepIntro = document.getElementById("start-step-intro");
const startStepCall = document.getElementById("start-step-call");
const introStartBtn = document.getElementById("intro-start-btn");
const callLandlordBtn = document.getElementById("call-landlord-btn");
const passLandlordBtn = document.getElementById("pass-landlord-btn");
const bgMuteBtn = document.getElementById("bg-mute-btn");

const TYPE_INFO = {
  single: { name: "单张", desc: "单张：任意一张牌。" },
  wild: {
    name: "癞子牌",
    desc: "癞子牌：本局 6 为癞子，可替代除大小王外任意点数。",
  },
  pair: { name: "对子", desc: "对子：两张点数相同的牌。" },
  triple: { name: "三张", desc: "三张：三张点数相同的牌。" },
  "triple-single": { name: "三带一", desc: "三带一：三张相同牌 + 任意单张。" },
  "triple-pair": { name: "三带二", desc: "三带二：三张相同牌 + 一对。" },
  straight: { name: "顺子", desc: "顺子：至少5张连续单牌，2和王不能参与。" },
  "pair-straight": { name: "连对", desc: "连对：至少3组连续对子，2和王不能参与。" },
  plane: { name: "飞机", desc: "飞机：至少2组连续三张相同牌。" },
  "plane-single": { name: "飞机带翅膀", desc: "连续三张 + 等量单牌。" },
  "plane-pair": { name: "飞机带翅膀", desc: "连续三张 + 等量对子。" },
  bomb: { name: "炸弹", desc: "炸弹：四张点数相同的牌，可压过非炸弹牌型。" },
  rocket: { name: "王炸", desc: "王炸：大小王一起出，最大牌型。" },
};

const TYPE_SHOWCASE = [
  {
    type: "single",
    example: "示例：A♠",
    detail: "任意单张可出，比较单牌点数大小。适合探路或收尾，避免拆关键对子。",
  },
  {
    type: "wild",
    example: "示例：6♥(癞子)",
    detail: "癞子牌可补齐常见牌型缺口，顺子与连对不能替代2和王。",
  },
  {
    type: "pair",
    example: "示例：88",
    detail: "两张同点数组成，对子只能压对子。适合稳拿回合或清理手牌。",
  },
  {
    type: "triple",
    example: "示例：999",
    detail: "三张同点数，三张只能压三张。适合中盘控场，注意别拆飞机。",
  },
  {
    type: "triple-single",
    example: "示例：777+K",
    detail: "三张相同牌带任意一张单牌。只能压同类，优先用低单牌作带。",
  },
  {
    type: "triple-pair",
    example: "示例：666+44",
    detail: "三张相同牌带一对。只能压同类，适合带走一对杂牌形成节奏。",
  },
  {
    type: "straight",
    example: "示例：34567",
    detail: "至少5张连续单牌，不能包含2和王。只能压同长度顺子，比最大牌。",
  },
  {
    type: "pair-straight",
    example: "示例：445566",
    detail: "至少3组连续对子，不能包含2和王。只能压同长度连对，比最大对。",
  },
  {
    type: "plane",
    example: "示例：777888",
    detail: "至少2组连续三张相同牌。只能压同长度飞机，比最大三张。",
  },
  {
    type: "plane-single",
    example: "示例：777888+3+4",
    detail: "飞机带单翅膀，翅膀数量与三张组数相同。只能压同长度，翅膀尽量用小单牌。",
  },
  {
    type: "plane-pair",
    example: "示例：888999+44+55",
    detail: "飞机带对翅膀，翅膀数量与三张组数相同。只能压同长度，优先用小对子做翅膀。",
  },
  {
    type: "bomb",
    example: "示例：JJJJ",
    detail: "炸弹可压过非炸弹；炸弹之间比较点数。适合关键时机抢回合或收尾。",
  },
  {
    type: "rocket",
    example: "示例：小王+大王",
    detail: "王炸为全场最大牌型。不要轻易交出，留作终局或反制炸弹。",
  },
];

const TYPE_EXAMPLE_CARDS = {
  single: [
    { rank: "A", suit: "♠" },
  ],
  wild: [
    { rank: "6", suit: "♥", isWild: true },
  ],
  pair: [
    { rank: "8", suit: "♠" },
    { rank: "8", suit: "♥" },
  ],
  triple: [
    { rank: "9", suit: "♠" },
    { rank: "9", suit: "♥" },
    { rank: "9", suit: "♣" },
  ],
  "triple-single": [
    { rank: "7", suit: "♠" },
    { rank: "7", suit: "♥" },
    { rank: "7", suit: "♣" },
    { rank: "K", suit: "♦" },
  ],
  "triple-pair": [
    { rank: "6", suit: "♠" },
    { rank: "6", suit: "♥" },
    { rank: "6", suit: "♣" },
    { rank: "4", suit: "♠" },
    { rank: "4", suit: "♥" },
  ],
  straight: [
    { rank: "3", suit: "♠" },
    { rank: "4", suit: "♥" },
    { rank: "5", suit: "♣" },
    { rank: "6", suit: "♦" },
    { rank: "7", suit: "♠" },
  ],
  "pair-straight": [
    { rank: "4", suit: "♠" },
    { rank: "4", suit: "♥" },
    { rank: "5", suit: "♠" },
    { rank: "5", suit: "♥" },
    { rank: "6", suit: "♠" },
    { rank: "6", suit: "♥" },
  ],
  plane: [
    { rank: "7", suit: "♠" },
    { rank: "7", suit: "♥" },
    { rank: "7", suit: "♣" },
    { rank: "8", suit: "♠" },
    { rank: "8", suit: "♥" },
    { rank: "8", suit: "♣" },
  ],
  "plane-single": [
    { rank: "7", suit: "♠" },
    { rank: "7", suit: "♥" },
    { rank: "7", suit: "♣" },
    { rank: "8", suit: "♠" },
    { rank: "8", suit: "♥" },
    { rank: "8", suit: "♣" },
    { rank: "3", suit: "♠" },
    { rank: "4", suit: "♥" },
  ],
  "plane-pair": [
    { rank: "8", suit: "♠" },
    { rank: "8", suit: "♥" },
    { rank: "8", suit: "♣" },
    { rank: "9", suit: "♠" },
    { rank: "9", suit: "♥" },
    { rank: "9", suit: "♣" },
    { rank: "4", suit: "♠" },
    { rank: "4", suit: "♥" },
    { rank: "5", suit: "♠" },
    { rank: "5", suit: "♥" },
  ],
  bomb: [
    { rank: "J", suit: "♠" },
    { rank: "J", suit: "♥" },
    { rank: "J", suit: "♣" },
    { rank: "J", suit: "♦" },
  ],
  rocket: [
    { rank: "小", suit: "🃏", joker: true },
    { rank: "大", suit: "🃏", joker: true },
  ],
};

const SUIT_SYMBOLS = {
  spade: "♠",
  heart: "♥",
  club: "♣",
  diamond: "♦",
};

const SUIT_COLORS = {
  heart: "red",
  diamond: "red",
};

const WILD_BASE_RANK = 6;
const WILD_SINGLE_MAX = 15;

const USER_HAND_SEED = [
  { rank: 3, suit: "spade" },
  { rank: 4, suit: "spade" },
  { rank: 4, suit: "heart" },
  { rank: 4, suit: "club" },
  { rank: 4, suit: "diamond" },
  { rank: 5, suit: "spade" },
  { rank: 5, suit: "heart" },
  { rank: 6, suit: "diamond" },
  { rank: WILD_BASE_RANK, suit: "heart", isWild: true },
  { rank: 7, suit: "spade" },
  { rank: 7, suit: "heart" },
  { rank: 8, suit: "spade" },
  { rank: 8, suit: "club" },
  { rank: 8, suit: "heart" },
  { rank: 9, suit: "club" },
  { rank: 9, suit: "diamond" },
  { rank: 9, suit: "heart" },
  { rank: 10, suit: "spade" },
  { rank: 11, suit: "club" },
  { rank: 13, suit: "spade" },
  { rank: 15, suit: "heart" },
  { rank: 16, suit: "joker" },
  { rank: 17, suit: "joker" },
];

const LANDLORD_SEED = [
  { rank: 6, suit: "spade" },
  { rank: 12, suit: "heart" },
  { rank: 14, suit: "club" },
];

function shuffle(list) {
  const array = [...list];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateOpponentPlays() {
  const planeCandidates = [
    {
      player: "对手",
      cards: [
        { rank: 7, suit: "spade" },
        { rank: 7, suit: "heart" },
        { rank: 7, suit: "club" },
        { rank: 8, suit: "spade" },
        { rank: 8, suit: "heart" },
        { rank: 8, suit: "club" },
      ],
    },
    {
      player: "对手",
      cards: [
        { rank: 6, suit: "spade" },
        { rank: 6, suit: "heart" },
        { rank: 6, suit: "diamond" },
        { rank: 7, suit: "spade" },
        { rank: 7, suit: "heart" },
        { rank: 7, suit: "diamond" },
        { rank: 9, suit: "club" },
        { rank: 10, suit: "spade" },
      ],
    },
    {
      player: "对手",
      cards: [
        { rank: 9, suit: "spade" },
        { rank: 9, suit: "heart" },
        { rank: 9, suit: "club" },
        { rank: 10, suit: "spade" },
        { rank: 10, suit: "heart" },
        { rank: 10, suit: "club" },
        { rank: 3, suit: "spade" },
        { rank: 3, suit: "heart" },
        { rank: 4, suit: "spade" },
        { rank: 4, suit: "heart" },
      ],
    },
  ];
  const selectedPlane =
    planeCandidates[Math.floor(Math.random() * planeCandidates.length)];

  const plays = [
    { player: "对手", cards: [{ rank: 7, suit: "spade" }] },
    {
      player: "对手",
      cards: [
        { rank: 5, suit: "spade" },
        { rank: 5, suit: "heart" },
      ],
    },
    {
      player: "对手",
      cards: [
        { rank: 9, suit: "club" },
        { rank: 9, suit: "diamond" },
        { rank: 9, suit: "heart" },
      ],
    },
    {
      player: "对手",
      cards: [
        { rank: 8, suit: "spade" },
        { rank: 8, suit: "club" },
        { rank: 8, suit: "heart" },
        { rank: 3, suit: "diamond" },
      ],
    },
    {
      player: "对手",
      cards: [
        { rank: 6, suit: "spade" },
        { rank: 6, suit: "heart" },
        { rank: 6, suit: "diamond" },
        { rank: 4, suit: "club" },
        { rank: 4, suit: "diamond" },
      ],
    },
    {
      player: "对手",
      cards: [
        { rank: 3, suit: "spade" },
        { rank: 4, suit: "spade" },
        { rank: 5, suit: "spade" },
        { rank: 6, suit: "spade" },
        { rank: 7, suit: "spade" },
      ],
    },
    {
      player: "对手",
      cards: [
        { rank: 4, suit: "spade" },
        { rank: 4, suit: "heart" },
        { rank: 5, suit: "spade" },
        { rank: 5, suit: "heart" },
        { rank: 6, suit: "spade" },
        { rank: 6, suit: "heart" },
      ],
    },
    selectedPlane,
    {
      player: "对手",
      cards: [
        { rank: 11, suit: "spade" },
        { rank: 11, suit: "heart" },
        { rank: 11, suit: "club" },
        { rank: 11, suit: "diamond" },
      ],
    },
  ];

  return shuffle(plays);
}

const state = {
  hand: [],
  selectedIds: new Set(),
  targetPlay: null,
  displayLastPlay: null,
  opponentPlays: [],
  playIndex: 0,
  userActive: false,
  landlordCards: [],
  landlordRevealed: false,
  roundStarted: false,
};

function createCard(card, withId = true) {
  return {
    id: withId ? `${card.rank}-${card.suit}-${Math.random().toString(16).slice(2, 6)}` : null,
    rank: card.rank,
    suit: card.suit,
    isWild: Boolean(card.isWild),
  };
}

function rankLabel(rank) {
  if (rank <= 10) return String(rank);
  if (rank === 11) return "J";
  if (rank === 12) return "Q";
  if (rank === 13) return "K";
  if (rank === 14) return "A";
  if (rank === 15) return "2";
  if (rank === 16) return "小王";
  return "大王";
}

function renderCard(card, options = {}) {
  const el = document.createElement("div");
  el.className = "card";
  if (options.small) el.classList.add("small");
  if (card.suit === "joker") {
    el.classList.add("joker");
  }
  if (card.isWild) {
    el.classList.add("wild");
  }
  if (SUIT_COLORS[card.suit] === "red") {
    el.classList.add("red");
  }

  const corner = document.createElement("div");
  corner.className = "card-corner";
  corner.textContent = rankLabel(card.rank);
  const center = document.createElement("div");
  center.className = "card-center";

  if (card.suit === "joker") {
    center.textContent = "🃏";
  } else {
    center.textContent = `${rankLabel(card.rank)}${SUIT_SYMBOLS[card.suit]}`;
  }

  el.appendChild(corner);
  el.appendChild(center);

  if (options.selected) {
    el.classList.add("selected");
  }

  if (options.clickable) {
    el.style.cursor = "pointer";
    el.addEventListener("click", options.onClick);
  }

  return el;
}

function renderFaceDownCard(options = {}) {
  const el = document.createElement("div");
  el.className = "card facedown";
  if (options.small) el.classList.add("small");
  return el;
}

function sortCards(cards) {
  return [...cards].sort((a, b) => a.rank - b.rank);
}

function renderHand() {
  handCardsEl.innerHTML = "";
  const sorted = sortCards(state.hand);
  sorted.forEach((card) => {
    const el = renderCard(card, {
      clickable: state.userActive,
      selected: state.selectedIds.has(card.id),
      onClick: () => toggleSelect(card.id),
    });
    handCardsEl.appendChild(el);
  });
}

function renderPlayArea() {
  lastPlayEl.innerHTML = "";
  if (state.displayLastPlay) {
    renderCardsInto(lastPlayEl, state.displayLastPlay.cards);
    lastPlayEmpty.classList.add("hidden");
  } else {
    lastPlayEmpty.classList.remove("hidden");
  }
}

function renderCardsInto(container, cards) {
  sortCards(cards).forEach((card) => {
    container.appendChild(renderCard(card, { small: false }));
  });
}

function renderLandlordCards() {
  if (!landlordCardsEl) return;
  landlordCardsEl.innerHTML = "";
  if (!state.landlordCards.length) return;

  if (!state.landlordRevealed) {
    state.landlordCards.forEach(() => {
      landlordCardsEl.appendChild(renderFaceDownCard({ small: true }));
    });
    return;
  }

  sortCards(state.landlordCards).forEach((card) => {
    landlordCardsEl.appendChild(renderCard(card, { small: true }));
  });
}

function renderMiniExampleCards(cards) {
  if (!cards || cards.length === 0) return "";
  return cards
    .map((card) => {
      const isRed = card.suit === "♥" || card.suit === "♦";
      const classes = ["mini-card"];
      if (isRed) classes.push("red");
      if (card.joker) classes.push("joker");
      if (card.isWild) classes.push("wild");
      return `
        <span class="${classes.join(" ")}">
          <span class="mini-rank">${card.rank}</span>
          <span class="mini-suit">${card.suit}</span>
        </span>
      `;
    })
    .join("");
}

function renderTypeShowcase() {
  if (!typeGrid) return;
  typeGrid.innerHTML = "";

  const fragment = document.createDocumentFragment();
  TYPE_SHOWCASE.forEach((item) => {
    const info = TYPE_INFO[item.type];
    const miniExampleCards = renderMiniExampleCards(TYPE_EXAMPLE_CARDS[item.type]);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "type-card reveal-on-scroll";
    card.setAttribute("aria-label", `${info.name}牌型介绍`);
    card.innerHTML = `
      <div class="type-card-inner">
        <div class="type-face front">
          <div class="type-front-main">
            <div class="type-front-text">
              <span class="type-name">${info.name}</span>
              <span class="type-example">${item.example}</span>
            </div>
            <div class="mini-cards" aria-hidden="true">${miniExampleCards}</div>
          </div>
          <span class="type-tip">点击翻面查看规则</span>
        </div>
        <div class="type-face back">
          <span class="type-name">${info.name}</span>
          <span class="type-detail">${info.desc} ${item.detail}</span>
          <span class="type-tip">再次点击可翻回</span>
        </div>
      </div>
    `;
    card.addEventListener("click", () => {
      const shouldFlip = !card.classList.contains("is-flipped");
      typeGrid.querySelectorAll(".type-card").forEach((item) => {
        if (item !== card) {
          item.classList.remove("is-active", "is-flipped");
        }
      });
      card.classList.add("is-active");
      card.classList.toggle("is-flipped", shouldFlip);
    });
    fragment.appendChild(card);
  });

  typeGrid.appendChild(fragment);
  bindRevealOnScroll();
}

function bindRevealOnScroll() {
  const revealCards = document.querySelectorAll(".reveal-on-scroll");
  if (!revealCards.length) return;

  if (!("IntersectionObserver" in window)) {
    revealCards.forEach((card) => card.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealCards.forEach((card) => observer.observe(card));
}

function toggleSelect(cardId) {
  if (!state.userActive) return;
  if (state.selectedIds.has(cardId)) {
    state.selectedIds.delete(cardId);
  } else {
    state.selectedIds.add(cardId);
  }
  renderHand();
  updateActionState();
}

function countRanks(cards) {
  const counts = new Map();
  cards.forEach((card) => {
    counts.set(card.rank, (counts.get(card.rank) || 0) + 1);
  });
  return counts;
}

function countWild(cards) {
  return cards.reduce(
    (total, card) => (card.isWild ? total + 1 : total),
    0
  );
}

function splitWildCards(cards) {
  const wilds = [];
  const normals = [];
  cards.forEach((card) => {
    if (card.isWild) {
      wilds.push(card);
    } else {
      normals.push(card);
    }
  });
  return { wilds, normals };
}

function hasWild(cards) {
  return cards.some((card) => card.isWild);
}

function isConsecutive(ranks) {
  for (let i = 0; i < ranks.length - 1; i += 1) {
    if (ranks[i + 1] !== ranks[i] + 1) return false;
  }
  return true;
}

function detectPlay(cards) {
  if (cards.length === 0) {
    return { valid: false, reason: "请选择要出的牌。" };
  }

  const wildCount = countWild(cards);
  if (wildCount > 0) {
    const wildPlay = detectPlayWithWild(cards, wildCount);
    if (wildPlay) return wildPlay;
  }

  const counts = countRanks(cards);
  const ranks = [...counts.keys()].sort((a, b) => a - b);
  const length = cards.length;
  const countsArr = [...counts.values()].sort((a, b) => b - a);
  const allSame = counts.size === 1;

  if (length === 1) {
    return buildPlay("single", cards, ranks[0]);
  }

  if (length === 2) {
    const isRocket = ranks.includes(16) && ranks.includes(17);
    if (isRocket) {
      return buildPlay("rocket", cards, 17);
    }
    if (allSame) {
      return buildPlay("pair", cards, ranks[0]);
    }
  }

  if (length === 3 && allSame) {
    return buildPlay("triple", cards, ranks[0]);
  }

  if (length === 4) {
    if (allSame) {
      return buildPlay("bomb", cards, ranks[0]);
    }
    if (countsArr[0] === 3) {
      const tripleRank = ranks.find((rank) => counts.get(rank) === 3);
      return buildPlay("triple-single", cards, tripleRank);
    }
  }

  if (length === 5) {
    if (isStraight(ranks, counts)) {
      return buildPlay("straight", cards, ranks[ranks.length - 1], { seq: ranks });
    }
    if (countsArr[0] === 3 && countsArr[1] === 2) {
      const tripleRank = ranks.find((rank) => counts.get(rank) === 3);
      return buildPlay("triple-pair", cards, tripleRank);
    }
  }

  if (length >= 5 && isStraight(ranks, counts)) {
    return buildPlay("straight", cards, ranks[ranks.length - 1], { seq: ranks });
  }

  if (length >= 6 && length % 2 === 0 && isPairStraight(ranks, counts)) {
    return buildPlay("pair-straight", cards, ranks[ranks.length - 1], {
      seq: ranks,
    });
  }

  if (length >= 6 && length % 3 === 0 && isPlane(ranks, counts)) {
    return buildPlay("plane", cards, ranks[ranks.length - 1], { seq: ranks });
  }

  if (length >= 8 && length % 4 === 0) {
    const planeSingle = isPlaneWithSingles(ranks, counts, length);
    if (planeSingle) {
      return buildPlay("plane-single", cards, planeSingle.maxRank, planeSingle);
    }
  }

  if (length >= 10 && length % 5 === 0) {
    const planePair = isPlaneWithPairs(ranks, counts, length);
    if (planePair) {
      return buildPlay("plane-pair", cards, planePair.maxRank, planePair);
    }
  }

  return { valid: false, reason: "当前组合不符合牌型规则。" };
}

function detectPlayWithWild(cards, wildCount) {
  if (wildCount !== 1) return null;

  const { normals } = splitWildCards(cards);
  const counts = countRanks(normals);
  const ranks = [...counts.keys()].sort((a, b) => a - b);
  const countsArr = [...counts.values()].sort((a, b) => b - a);
  const length = cards.length;

  if (length === 1) {
    return buildPlay("single", cards, WILD_SINGLE_MAX, {
      wildAs: WILD_SINGLE_MAX,
    });
  }

  if (length === 2 && counts.size === 1) {
    const rank = ranks[0];
    if (rank < 16) {
      return buildPlay("pair", cards, rank, { wildAs: rank });
    }
  }

  if (length === 3 && counts.size === 1 && countsArr[0] === 2) {
    const rank = ranks[0];
    if (rank < 16) {
      return buildPlay("triple", cards, rank, { wildAs: rank });
    }
  }

  if (length === 4) {
    if (counts.size === 1 && countsArr[0] === 3) {
      const rank = ranks[0];
      if (rank < 16) {
        return buildPlay("bomb", cards, rank, { wildAs: rank });
      }
    }
    if (counts.size === 2 && countsArr[0] === 2 && countsArr[1] === 1) {
      const tripleRank = ranks.find((rank) => counts.get(rank) === 2);
      if (tripleRank !== undefined && tripleRank < 16) {
        return buildPlay("triple-single", cards, tripleRank, {
          wildAs: tripleRank,
        });
      }
    }
  }

  if (length >= 5) {
    const straight = findStraightWithWild(ranks, counts, length, wildCount);
    if (straight) {
      return buildPlay("straight", cards, straight.mainRank, {
        seq: straight.seq,
        wildAs: straight.wildAs,
      });
    }
  }

  if (length === 5) {
    const triplePair = findTriplePairWithWild(ranks, counts);
    if (triplePair) {
      return buildPlay("triple-pair", cards, triplePair.mainRank, {
        wildAs: triplePair.wildAs,
      });
    }
  }

  if (length >= 6 && length % 2 === 0) {
    const pairStraight = findPairStraightWithWild(ranks, counts, length);
    if (pairStraight) {
      return buildPlay("pair-straight", cards, pairStraight.mainRank, {
        seq: pairStraight.seq,
        wildAs: pairStraight.wildAs,
      });
    }
  }

  return null;
}

function findStraightWithWild(ranks, counts, length, wildCount) {
  if (ranks.length + wildCount !== length) return null;
  if (ranks.some((rank) => rank >= 15)) return null;
  if ([...counts.values()].some((count) => count !== 1)) return null;

  const rankSet = new Set(ranks);
  let best = null;
  for (let start = 3; start <= 14 - length + 1; start += 1) {
    const end = start + length - 1;
    if (ranks.some((rank) => rank < start || rank > end)) continue;
    const missing = [];
    for (let rank = start; rank <= end; rank += 1) {
      if (!rankSet.has(rank)) missing.push(rank);
    }
    if (missing.length <= wildCount) {
      best = {
        mainRank: end,
        wildAs: missing[0],
        seq: Array.from({ length }, (_, i) => start + i),
      };
    }
  }
  return best;
}

function findPairStraightWithWild(ranks, counts, length) {
  if (ranks.some((rank) => rank >= 15)) return null;
  if ([...counts.values()].some((count) => count > 2)) return null;

  const pairsNeeded = length / 2;
  const singles = ranks.filter((rank) => counts.get(rank) === 1);
  const pairs = ranks.filter((rank) => counts.get(rank) === 2);

  if (singles.length !== 1) return null;
  if (pairs.length + 1 !== pairsNeeded) return null;

  const seqRanks = [...pairs, singles[0]].sort((a, b) => a - b);
  if (!isConsecutive(seqRanks)) return null;

  return {
    mainRank: seqRanks[seqRanks.length - 1],
    wildAs: singles[0],
    seq: seqRanks,
  };
}

function findTriplePairWithWild(ranks, counts) {
  const tripleRanks = ranks.filter((rank) => counts.get(rank) === 3);
  if (tripleRanks.length === 1) {
    const singleRank = ranks.find((rank) => counts.get(rank) === 1);
    if (singleRank !== undefined && singleRank < 16) {
      return { mainRank: tripleRanks[0], wildAs: singleRank };
    }
  }

  const pairRanks = ranks.filter((rank) => counts.get(rank) === 2);
  if (pairRanks.length === 2) {
    const tripleRank = Math.max(...pairRanks);
    return { mainRank: tripleRank, wildAs: tripleRank };
  }

  return null;
}

function buildPlay(type, cards, mainRank, extra = {}) {
  return {
    valid: true,
    type,
    cards,
    mainRank,
    length: cards.length,
    ...extra,
  };
}

function getWildTip(play) {
  if (!play || !play.cards || !play.cards.some((card) => card.isWild)) return "";
  if (play.wildAs) {
    return `癞子牌当作${rankLabel(play.wildAs)}。`;
  }
  return "癞子牌参与组合。";
}

function isStraight(ranks, counts) {
  if (counts.size !== ranks.length) return false;
  if (ranks.some((rank) => counts.get(rank) !== 1)) return false;
  if (ranks.some((rank) => rank >= 15)) return false;
  return isConsecutive(ranks);
}

function isPairStraight(ranks, counts) {
  if (ranks.some((rank) => rank >= 15)) return false;
  if (!isConsecutive(ranks)) return false;
  return ranks.every((rank) => counts.get(rank) === 2);
}

function isPlane(ranks, counts) {
  if (ranks.some((rank) => rank >= 15)) return false;
  if (!isConsecutive(ranks)) return false;
  return ranks.every((rank) => counts.get(rank) === 3);
}

function isPlaneWithSingles(ranks, counts, length) {
  const tripleRanks = ranks.filter((rank) => counts.get(rank) === 3);
  if (tripleRanks.length < 2) return null;
  if (tripleRanks.some((rank) => rank >= 15)) return null;
  if (!isConsecutive(tripleRanks)) return null;
  const neededSingles = tripleRanks.length;
  const singleCount = length - tripleRanks.length * 3;
  if (singleCount !== neededSingles) return null;
  return { maxRank: tripleRanks[tripleRanks.length - 1], tripleRanks };
}

function isPlaneWithPairs(ranks, counts, length) {
  const tripleRanks = ranks.filter((rank) => counts.get(rank) === 3);
  if (tripleRanks.length < 2) return null;
  if (tripleRanks.some((rank) => rank >= 15)) return null;
  if (!isConsecutive(tripleRanks)) return null;
  const neededPairs = tripleRanks.length;
  const pairCount = length - tripleRanks.length * 3;
  if (pairCount !== neededPairs * 2) return null;
  const pairRanks = ranks.filter((rank) => counts.get(rank) === 2);
  if (pairRanks.length !== neededPairs) return null;
  return { maxRank: tripleRanks[tripleRanks.length - 1], tripleRanks };
}

function validateAgainstTarget(play) {
  if (!state.targetPlay) {
    return { canBeat: true };
  }

  const target = state.targetPlay;
  if (target.type === "rocket") {
    return { canBeat: false, reason: "王炸无法被压过。" };
  }

  if (play.type === "rocket") {
    return { canBeat: true };
  }

  if (play.type === "bomb") {
    if (target.type !== "bomb") {
      return { canBeat: true };
    }
    return play.mainRank > target.mainRank
      ? { canBeat: true }
      : { canBeat: false, reason: "炸弹点数需要更大。" };
  }

  if (target.type === "bomb") {
    return { canBeat: false, reason: "需要炸弹或王炸才能压过。" };
  }

  if (play.type !== target.type || play.length !== target.length) {
    return {
      canBeat: false,
      reason: `需要出${TYPE_INFO[target.type].name}才能压过。`,
    };
  }

  if (play.mainRank <= target.mainRank) {
    return { canBeat: false, reason: "点数需更大才能压过。" };
  }

  return { canBeat: true };
}

function updateActionState() {
  updateHintBar();
  if (!state.userActive) {
    playBtn.disabled = true;
    passBtn.disabled = true;
    hintBtn.disabled = true;
    validationText.textContent = state.roundStarted
      ? "等待上家出牌…"
      : "请先阅读规则并选择是否叫地主。";
    return;
  }

  if (state.targetPlay && !findBeatingHand(state.hand, state.targetPlay)) {
    if (!hasWild(state.hand)) {
      showEndModal();
      return;
    }
  }

  const selected = state.hand.filter((card) => state.selectedIds.has(card.id));
  if (selected.length === 0) {
    playBtn.disabled = true;
    passBtn.disabled = !state.targetPlay;
    hintBtn.disabled = !state.targetPlay;
    validationText.textContent = "请选择要出的牌。";
    return;
  }

  const play = detectPlay(selected);
  if (!play.valid) {
    playBtn.disabled = true;
    passBtn.disabled = !state.targetPlay;
    hintBtn.disabled = !state.targetPlay;
    validationText.textContent = play.reason;
    return;
  }

  const beatCheck = validateAgainstTarget(play);
  if (!beatCheck.canBeat) {
    playBtn.disabled = true;
    passBtn.disabled = !state.targetPlay;
    hintBtn.disabled = !state.targetPlay;
    validationText.textContent = beatCheck.reason;
    return;
  }

  playBtn.disabled = false;
  passBtn.disabled = !state.targetPlay;
  hintBtn.disabled = !state.targetPlay;
  const wildTip = getWildTip(play);
  validationText.textContent = wildTip
    ? `组合有效，可以出牌。${wildTip}`
    : "组合有效，可以出牌。";
}

function setTurn(turn) {
  state.userActive = turn === "user";
  renderHand();
  updateActionState();
}

function playAI() {
  if (!state.roundStarted) return;

  if (state.playIndex >= state.opponentPlays.length) {
    setTurn("end");
    validationText.textContent = "演示结束，可刷新重置。";
    return;
  }

  const entry = state.opponentPlays[state.playIndex];
  const playCards = entry.cards.map((card) => createCard(card, false));
  const play = detectPlay(playCards);
  state.targetPlay = play;
  state.displayLastPlay = play;
  state.selectedIds.clear();
  renderPlayArea();
  showOpponentHint(play.type);
  setTurn("user");
  state.playIndex += 1;
}

function playUser() {
  if (!state.userActive) return;
  const selected = state.hand.filter((card) => state.selectedIds.has(card.id));
  const play = detectPlay(selected);
  if (!play.valid) return;
  const beatCheck = validateAgainstTarget(play);
  if (!beatCheck.canBeat) return;

  state.hand = state.hand.filter((card) => !state.selectedIds.has(card.id));
  state.selectedIds.clear();
  state.displayLastPlay = play;
  state.targetPlay = null;
  hideOpponentHint();
  renderHand();
  renderPlayArea();
  setTurn("ai");
  setTimeout(playAI, 900);
}

function passUser() {
  if (!state.userActive || !state.targetPlay) return;
  state.selectedIds.clear();
  validationText.textContent = "你选择了过牌。";
  hideOpponentHint();
  setTurn("ai");
  setTimeout(playAI, 900);
}

function setHintBar(message, tone = "info") {
  if (!hintBar || !hintText) return;
  hintText.textContent = message;
  hintBar.classList.toggle("is-warn", tone === "warn");
}

function updateHintBar() {
  if (!hintBar || !hintText) return;

  if (!state.roundStarted) {
    setHintBar("请先阅读规则并选择是否叫地主。");
    return;
  }

  if (!state.userActive) {
    if (state.displayLastPlay && !state.targetPlay) {
      const info = TYPE_INFO[state.displayLastPlay.type];
      if (info) {
        setHintBar(`你已出${info.name}，等待上家出牌。`);
        return;
      }
    }
    setHintBar("等待上家出牌…");
    return;
  }

  if (state.targetPlay && !findBeatingHand(state.hand, state.targetPlay)) {
    setHintBar("当前手牌无法压过上家，建议过牌。", "warn");
    return;
  }

  const selected = state.hand.filter((card) => state.selectedIds.has(card.id));
  if (selected.length > 0) {
    const play = detectPlay(selected);
    if (!play.valid) {
      setHintBar(play.reason, "warn");
      return;
    }
    const beatCheck = validateAgainstTarget(play);
    if (!beatCheck.canBeat) {
      setHintBar(beatCheck.reason, "warn");
      return;
    }
    const info = TYPE_INFO[play.type];
    const wildTip = getWildTip(play);
    setHintBar(
      wildTip
        ? `检测到${info.name}，可以出牌。${wildTip}`
        : `检测到${info.name}，可以出牌。`
    );
    return;
  }

  if (state.targetPlay) {
    const hint = findBeatingHand(state.hand, state.targetPlay);
    if (hint) {
      const play = detectPlay(hint);
      if (play.valid) {
        const info = TYPE_INFO[play.type];
        const wildTip = getWildTip(play);
        setHintBar(
          wildTip
            ? `检测到${info.name}可压过上家，建议出牌。${wildTip}`
            : `检测到${info.name}可压过上家，建议出牌。`
        );
        return;
      }
    }
    setHintBar("暂无可压牌型，建议过牌。", "warn");
    return;
  }

  const availableType = detectAvailableType(state.hand);
  if (availableType) {
    const info = TYPE_INFO[availableType];
    setHintBar(`检测到${info.name}，建议出牌。`);
    return;
  }

  setHintBar("请选择要出的牌。");
}

function showOpponentHint(type) {
  const info = TYPE_INFO[type];
  if (!info) return;
  opponentTitle.textContent = `上家出牌：${info.name}`;
  opponentDesc.textContent = info.desc;
  opponentHint.classList.add("show");
  clearTimeout(showOpponentHint.timer);
  showOpponentHint.timer = setTimeout(hideOpponentHint, 3000);
}

function hideOpponentHint() {
  opponentHint.classList.remove("show");
}

function showEndModal() {
  endModal.classList.add("show");
  endModal.setAttribute("aria-hidden", "false");
  playBtn.disabled = true;
  passBtn.disabled = true;
  hintBtn.disabled = true;
}

function hideEndModal() {
  endModal.classList.remove("show");
  endModal.setAttribute("aria-hidden", "true");
}

function showStartOverlay(mode = "start") {
  if (!startOverlay) return;
  startOverlay.classList.add("show");
  startOverlay.classList.remove("is-hiding");
  startOverlay.setAttribute("aria-hidden", "false");
  if (startStepIntro) startStepIntro.classList.remove("hidden");
  if (startStepCall) startStepCall.classList.add("hidden");
  if (introStartBtn) {
    const isRulesOnly = mode === "rules";
    introStartBtn.textContent = isRulesOnly ? "返回对局" : "开始体验";
    introStartBtn.dataset.mode = isRulesOnly ? "close" : "start";
  }
}

function hideStartOverlay() {
  if (!startOverlay) return;
  startOverlay.classList.add("is-hiding");
  startOverlay.classList.remove("show");
  startOverlay.setAttribute("aria-hidden", "true");
}

function showCallLandlordStep() {
  if (startStepIntro) startStepIntro.classList.add("hidden");
  if (startStepCall) startStepCall.classList.remove("hidden");
}

function startMatch(callLandlord) {
  if (state.roundStarted) return;

  if (callLandlord) {
    state.landlordRevealed = true;
    const landlordToHand = state.landlordCards.map((card) =>
      createCard(card, true)
    );
    state.hand = sortCards([...state.hand, ...landlordToHand]);
    renderHand();
    renderLandlordCards();
    validationText.textContent = "你选择叫地主，底牌已加入手牌。";
  } else {
    validationText.textContent = "你选择不叫地主，对局开始。";
  }

  state.roundStarted = true;
  if (startOverlay) {
    hideStartOverlay();
  }

  setTimeout(() => {
    setTurn("ai");
    setTimeout(playAI, 700);
  }, 320);
}

function resetRound() {
  state.hand = USER_HAND_SEED.map((card) => createCard(card, true));
  state.selectedIds.clear();
  state.targetPlay = null;
  state.displayLastPlay = null;
  state.opponentPlays = generateOpponentPlays();
  state.playIndex = 0;
  state.landlordCards = LANDLORD_SEED.map((card) => createCard(card, false));
  state.landlordRevealed = false;
  state.roundStarted = false;
  hideOpponentHint();
  renderHand();
  renderPlayArea();
  renderLandlordCards();
  setTurn("idle");
}

function restartGame() {
  hideEndModal();
  resetRound();
  showStartOverlay();
}

function endExperience() {
  hideEndModal();
  state.roundStarted = false;
  setTurn("end");
  validationText.textContent = "体验结束，可刷新重置。";
}

function hintUser() {
  if (!state.userActive || !state.targetPlay) return;
  const hint = findBeatingHand(state.hand, state.targetPlay);
  if (!hint) {
    validationText.textContent = "没有能压过的牌，建议过牌。";
    return;
  }
  state.selectedIds = new Set(hint.map((card) => card.id));
  renderHand();
  updateActionState();
}

function findBeatingHand(hand, target) {
  if (!target) return null;

  const normalHand = hand.filter((card) => !card.isWild);
  const normalHint = findHint(normalHand, target);
  if (normalHint) {
    const normalPlay = detectPlay(normalHint);
    if (normalPlay.valid) {
      const normalBeat = validateAgainstTarget(normalPlay);
      if (normalBeat.canBeat) return normalHint;
    }
  }

  if (!hasWild(hand)) return null;

  const wildHint = findHintWithWildPriority(hand, target);
  if (!wildHint) return null;
  const play = detectPlay(wildHint);
  if (!play.valid) return null;
  const beatCheck = validateAgainstTarget(play);
  return beatCheck.canBeat ? wildHint : null;
}

function findHintWithWildPriority(hand, target) {
  if (!target) return null;
  
  const wildCard = hand.find((c) => c.isWild);
  if (!wildCard) return null;
  
  const normals = hand.filter((c) => !c.isWild);
  
  // 单张只在普通单张不存在时才考虑癞子单张
  if (target.type === "single") {
    return [wildCard];
  }
  
  // 对对子：检查是否有同点数的牌
  if (target.type === "pair") {
    const groups = groupByRank(normals);
    for (const [rank, cards] of groups) {
      if (rank > target.mainRank && cards.length >= 1) {
        return [wildCard, cards[0]];
      }
    }
  }
  
  // 三张：检查是否有同点数的两张
  if (target.type === "triple") {
    const groups = groupByRank(normals);
    for (const [rank, cards] of groups) {
      if (rank > target.mainRank && cards.length >= 2) {
        return [wildCard, ...cards.slice(0, 2)];
      }
    }
  }
  
  // 三带一
  if (target.type === "triple-single") {
    const groups = groupByRank(normals);
    for (const [rank, cards] of groups) {
      if (rank > target.mainRank && cards.length >= 2) {
        const single = normals.find((c) => c.rank !== rank);
        if (single) return [wildCard, ...cards.slice(0, 2), single];
      }
    }
  }
  
  // 三带二
  if (target.type === "triple-pair") {
    const groups = groupByRank(normals);
    for (const [rank, cards] of groups) {
      if (rank > target.mainRank && cards.length >= 2) {
        const pairRank = [...groups.keys()].find(
          (r) => r !== rank && groups.get(r).length >= 2
        );
        if (pairRank !== undefined) {
          return [
            wildCard,
            ...cards.slice(0, 2),
            ...groups.get(pairRank).slice(0, 2),
          ];
        }
      }
    }
  }
  
  // 顺子
  if (target.type === "straight") {
    const straight = findStraightWithWildForHint(normals, target.length, target.mainRank);
    if (straight) return [wildCard, ...straight];
  }
  
  // 连对
  if (target.type === "pair-straight") {
    const pairStraight = findPairStraightWithWildForHint(normals, target.length, target.mainRank);
    if (pairStraight) return [wildCard, ...pairStraight];
  }
  
  // 飞机
  if (target.type === "plane") {
    const plane = findPlaneWithWildForHint(normals, target.length, target.mainRank);
    if (plane) return [wildCard, ...plane];
  }
  
  // 飞机带单翅膀
  if (target.type === "plane-single") {
    const planeSingle = findPlaneWithWildForHintSingles(normals, target.length, target.mainRank);
    if (planeSingle) return [wildCard, ...planeSingle];
  }
  
  // 飞机带对翅膀
  if (target.type === "plane-pair") {
    const planePair = findPlaneWithWildForHintPairs(normals, target.length, target.mainRank);
    if (planePair) return [wildCard, ...planePair];
  }
  
  return null;
}

function findStraightWithWildForHint(normals, length, minHigh) {
  const ranks = [...new Set(normals.map((c) => c.rank))]
    .filter((r) => r < 15)
    .sort((a, b) => a - b);
  
  for (let start = 3; start <= 14 - length + 1; start += 1) {
    const end = start + length - 1;
    const needed = [];
    for (let i = start; i <= end; i += 1) {
      if (!ranks.includes(i)) needed.push(i);
    }
    
    if (needed.length === 1 && end > minHigh) {
      const result = [];
      for (let i = start; i <= end; i += 1) {
        if (i !== needed[0]) {
          const card = normals.find((c) => c.rank === i);
          if (card) result.push(card);
        }
      }
      if (result.length === length - 1) return result;
    }
  }
  return null;
}

function findPairStraightWithWildForHint(normals, length, minHigh) {
  const groups = groupByRank(normals);
  const ranks = [...groups.keys()]
    .filter((r) => r < 15 && groups.get(r).length >= 2)
    .sort((a, b) => a - b);
  
  const needPairs = length / 2;
  for (let i = 0; i <= ranks.length - needPairs; i += 1) {
    const slice = ranks.slice(i, i + needPairs);
    if (isConsecutive(slice) && slice[slice.length - 1] > minHigh) {
      return slice.flatMap((rank) => groups.get(rank).slice(0, 2));
    }
  }
  return null;
}

function findPlaneWithWildForHint(normals, length, minHigh) {
  const groups = groupByRank(normals);
  const ranks = [...groups.keys()]
    .filter((r) => r < 15 && groups.get(r).length >= 3)
    .sort((a, b) => a - b);
  
  const needTriples = length / 3;
  for (let i = 0; i <= ranks.length - needTriples + 1; i += 1) {
    const slice = ranks.slice(i, i + needTriples);
    if (isConsecutive(slice) && slice[slice.length - 1] > minHigh) {
      return slice.flatMap((rank) => groups.get(rank).slice(0, 3));
    }
  }
  return null;
}

function findPlaneWithWildForHintSingles(normals, length, minHigh) {
  const groups = groupByRank(normals);
  const tripleRanks = [...groups.keys()]
    .filter((r) => r < 15 && groups.get(r).length >= 3)
    .sort((a, b) => a - b);
  
  const needTriples = length / 4;
  for (let i = 0; i <= tripleRanks.length - needTriples + 1; i += 1) {
    const slice = tripleRanks.slice(i, i + needTriples);
    if (isConsecutive(slice) && slice[slice.length - 1] > minHigh) {
      const triples = slice.flatMap((rank) => groups.get(rank).slice(0, 3));
      const singles = sortCards(normals).filter(
        (c) => !slice.includes(c.rank)
      );
      if (singles.length >= needTriples) {
        return [...triples, ...singles.slice(0, needTriples)];
      }
    }
  }
  return null;
}

function findPlaneWithWildForHintPairs(normals, length, minHigh) {
  const groups = groupByRank(normals);
  const tripleRanks = [...groups.keys()]
    .filter((r) => r < 15 && groups.get(r).length >= 3)
    .sort((a, b) => a - b);
  
  const needTriples = length / 5;
  for (let i = 0; i <= tripleRanks.length - needTriples + 1; i += 1) {
    const slice = tripleRanks.slice(i, i + needTriples);
    if (isConsecutive(slice) && slice[slice.length - 1] > minHigh) {
      const triples = slice.flatMap((rank) => groups.get(rank).slice(0, 3));
      const pairRanks = [...groups.keys()]
        .filter((r) => !slice.includes(r) && groups.get(r).length >= 2)
        .sort((a, b) => a - b);
      if (pairRanks.length >= needTriples) {
        const pairs = pairRanks.slice(0, needTriples).flatMap((r) =>
          groups.get(r).slice(0, 2)
        );
        return [...triples, ...pairs];
      }
    }
  }
  return null;
}

function findHint(hand, target) {
  if (!target) return null;
  if (target.type === "single") return findSingle(hand, target.mainRank);
  if (target.type === "pair") return findPair(hand, target.mainRank);
  if (target.type === "triple") return findTriple(hand, target.mainRank);
  if (target.type === "triple-single")
    return findTripleWithSingle(hand, target.mainRank);
  if (target.type === "triple-pair")
    return findTripleWithPair(hand, target.mainRank);
  if (target.type === "straight")
    return findStraight(hand, target.length, target.mainRank);
  if (target.type === "pair-straight")
    return findPairStraight(hand, target.length, target.mainRank);
  if (target.type === "plane")
    return findPlane(hand, target.length, target.mainRank);
  if (target.type === "plane-single")
    return findPlaneWithSingles(hand, target.length, target.mainRank);
  if (target.type === "plane-pair")
    return findPlaneWithPairs(hand, target.length, target.mainRank);
  if (target.type === "bomb") return findBomb(hand, target.mainRank);

  return findRocket(hand);
}

function findSingle(hand, minRank) {
  const sorted = sortCards(hand);
  // 优先找不含癞子的单张
  const card = sorted.find((c) => c.rank > minRank && !c.isWild);
  if (card) return [card];
  // 再考虑炸弹和王炸，但不用癞子作为单张
  return findBombOrRocket(hand);
}

function findPair(hand, minRank) {
  const groups = groupByRank(hand);
  const ranks = [...groups.keys()].sort((a, b) => a - b);
  const rank = ranks.find((r) => r > minRank && groups.get(r).length >= 2);
  if (rank !== undefined) return groups.get(rank).slice(0, 2);
  return findBombOrRocket(hand);
}

function findTriple(hand, minRank) {
  const groups = groupByRank(hand);
  const ranks = [...groups.keys()].sort((a, b) => a - b);
  const rank = ranks.find((r) => r > minRank && groups.get(r).length >= 3);
  if (rank !== undefined) return groups.get(rank).slice(0, 3);
  return findBombOrRocket(hand);
}

function findTripleWithSingle(hand, minRank) {
  const groups = groupByRank(hand);
  const ranks = [...groups.keys()].sort((a, b) => a - b);
  for (const rank of ranks) {
    if (rank <= minRank) continue;
    const triple = groups.get(rank);
    if (!triple || triple.length < 3) continue;
    const single = sortCards(hand).find((c) => c.rank !== rank);
    if (single) return [...triple.slice(0, 3), single];
  }
  return findBombOrRocket(hand);
}

function findTripleWithPair(hand, minRank) {
  const groups = groupByRank(hand);
  const ranks = [...groups.keys()].sort((a, b) => a - b);
  for (const rank of ranks) {
    if (rank <= minRank) continue;
    const triple = groups.get(rank);
    if (!triple || triple.length < 3) continue;
    const pairRank = ranks.find(
      (r) => r !== rank && groups.get(r).length >= 2
    );
    if (pairRank !== undefined) {
      return [...triple.slice(0, 3), ...groups.get(pairRank).slice(0, 2)];
    }
  }
  return findBombOrRocket(hand);
}

function findStraight(hand, length, minHigh) {
  const ranks = [...new Set(hand.map((c) => c.rank))]
    .filter((r) => r < 15)
    .sort((a, b) => a - b);
  for (let i = 0; i <= ranks.length - length; i += 1) {
    const slice = ranks.slice(i, i + length);
    if (isConsecutive(slice) && slice[slice.length - 1] > minHigh) {
      return slice.map((rank) => hand.find((c) => c.rank === rank));
    }
  }
  return findBombOrRocket(hand);
}

function findPairStraight(hand, length, minHigh) {
  const groups = groupByRank(hand);
  const ranks = [...groups.keys()]
    .filter((r) => r < 15 && groups.get(r).length >= 2)
    .sort((a, b) => a - b);
  const needPairs = length / 2;
  for (let i = 0; i <= ranks.length - needPairs; i += 1) {
    const slice = ranks.slice(i, i + needPairs);
    if (isConsecutive(slice) && slice[slice.length - 1] > minHigh) {
      return slice.flatMap((rank) => groups.get(rank).slice(0, 2));
    }
  }
  return findBombOrRocket(hand);
}

function findPlane(hand, length, minHigh) {
  const groups = groupByRank(hand);
  const ranks = [...groups.keys()]
    .filter((r) => r < 15 && groups.get(r).length >= 3)
    .sort((a, b) => a - b);
  const needTriples = length / 3;
  for (let i = 0; i <= ranks.length - needTriples; i += 1) {
    const slice = ranks.slice(i, i + needTriples);
    if (isConsecutive(slice) && slice[slice.length - 1] > minHigh) {
      return slice.flatMap((rank) => groups.get(rank).slice(0, 3));
    }
  }
  return findBombOrRocket(hand);
}

function findPlaneWithSingles(hand, length, minHigh) {
  const groups = groupByRank(hand);
  const ranks = [...groups.keys()]
    .filter((r) => r < 15 && groups.get(r).length >= 3)
    .sort((a, b) => a - b);
  const needTriples = length / 4;
  for (let i = 0; i <= ranks.length - needTriples; i += 1) {
    const slice = ranks.slice(i, i + needTriples);
    if (!isConsecutive(slice) || slice[slice.length - 1] <= minHigh) continue;
    const singles = sortCards(hand).filter((c) => !slice.includes(c.rank));
    if (singles.length >= needTriples) {
      return [
        ...slice.flatMap((rank) => groups.get(rank).slice(0, 3)),
        ...singles.slice(0, needTriples),
      ];
    }
  }
  return findBombOrRocket(hand);
}

function findPlaneWithPairs(hand, length, minHigh) {
  const groups = groupByRank(hand);
  const ranks = [...groups.keys()]
    .filter((r) => r < 15 && groups.get(r).length >= 3)
    .sort((a, b) => a - b);
  const needTriples = length / 5;
  for (let i = 0; i <= ranks.length - needTriples; i += 1) {
    const slice = ranks.slice(i, i + needTriples);
    if (!isConsecutive(slice) || slice[slice.length - 1] <= minHigh) continue;
    const pairRanks = [...groups.keys()]
      .filter((r) => !slice.includes(r) && groups.get(r).length >= 2)
      .sort((a, b) => a - b);
    if (pairRanks.length >= needTriples) {
      const pairs = pairRanks.slice(0, needTriples).flatMap((r) =>
        groups.get(r).slice(0, 2)
      );
      return [
        ...slice.flatMap((rank) => groups.get(rank).slice(0, 3)),
        ...pairs,
      ];
    }
  }
  return findBombOrRocket(hand);
}

function findBomb(hand, minRank) {
  const groups = groupByRank(hand);
  const ranks = [...groups.keys()].sort((a, b) => a - b);
  const rank = ranks.find((r) => r > minRank && groups.get(r).length === 4);
  if (rank !== undefined) return groups.get(rank).slice(0, 4);
  return findRocket(hand);
}

function findRocket(hand) {
  const jokers = hand.filter((c) => c.rank >= 16);
  if (jokers.length >= 2) return jokers.slice(0, 2);
  return null;
}

function findBombOrRocket(hand) {
  const groups = groupByRank(hand);
  const bombRanks = [...groups.keys()]
    .filter((rank) => groups.get(rank).length === 4)
    .sort((a, b) => a - b);
  if (bombRanks.length > 0) return groups.get(bombRanks[0]).slice(0, 4);
  return findRocket(hand);
}

function groupByRank(hand) {
  const groups = new Map();
  hand.forEach((card) => {
    if (!groups.has(card.rank)) groups.set(card.rank, []);
    groups.get(card.rank).push(card);
  });
  return groups;
}

function detectAvailableType(hand) {
  if (!hand.length) return null;
  const counts = countRanks(hand);

  if (hasRocket(hand)) return "rocket";
  if (hasBomb(counts)) return "bomb";
  if (hasPlaneWithPairs(hand, counts)) return "plane-pair";
  if (hasPlaneWithSingles(hand, counts)) return "plane-single";
  if (hasPlane(counts)) return "plane";
  if (hasPairStraight(counts)) return "pair-straight";
  if (hasStraight(counts)) return "straight";
  if (hasTripleWithPair(counts)) return "triple-pair";
  if (hasTripleWithSingle(counts, hand)) return "triple-single";
  if (hasTriple(counts)) return "triple";
  if (hasPair(counts)) return "pair";

  return "single";
}

function hasRocket(hand) {
  return hand.filter((card) => card.rank >= 16).length >= 2;
}

function hasBomb(counts) {
  return [...counts.values()].some((count) => count === 4);
}

function hasPair(counts) {
  return [...counts.values()].some((count) => count >= 2);
}

function hasTriple(counts) {
  return [...counts.values()].some((count) => count >= 3);
}

function hasTripleWithSingle(counts, hand) {
  for (const [rank, count] of counts.entries()) {
    if (count < 3) continue;
    if (hand.length - count >= 1) return true;
  }
  return false;
}

function hasTripleWithPair(counts) {
  const tripleRanks = [...counts.keys()].filter((rank) => counts.get(rank) >= 3);
  if (!tripleRanks.length) return false;
  for (const tripleRank of tripleRanks) {
    for (const [rank, count] of counts.entries()) {
      if (rank !== tripleRank && count >= 2) return true;
    }
  }
  return false;
}

function hasStraight(counts) {
  const ranks = [...counts.keys()]
    .filter((rank) => rank < 15)
    .sort((a, b) => a - b);
  return getConsecutiveRuns(ranks, 5).length > 0;
}

function hasPairStraight(counts) {
  const ranks = [...counts.keys()]
    .filter((rank) => rank < 15 && counts.get(rank) >= 2)
    .sort((a, b) => a - b);
  return getConsecutiveRuns(ranks, 3).length > 0;
}

function hasPlane(counts) {
  const ranks = [...counts.keys()]
    .filter((rank) => rank < 15 && counts.get(rank) >= 3)
    .sort((a, b) => a - b);
  return getConsecutiveRuns(ranks, 2).length > 0;
}

function hasPlaneWithSingles(hand, counts) {
  const tripleRanks = [...counts.keys()]
    .filter((rank) => rank < 15 && counts.get(rank) >= 3)
    .sort((a, b) => a - b);
  const runs = getConsecutiveRuns(tripleRanks, 2);
  if (!runs.length) return false;

  for (const run of runs) {
    for (let size = 2; size <= run.length; size += 1) {
      for (let i = 0; i <= run.length - size; i += 1) {
        const slice = run.slice(i, i + size);
        const singles = countCardsOutside(new Set(slice), hand);
        if (singles >= size) return true;
      }
    }
  }
  return false;
}

function hasPlaneWithPairs(hand, counts) {
  const tripleRanks = [...counts.keys()]
    .filter((rank) => rank < 15 && counts.get(rank) >= 3)
    .sort((a, b) => a - b);
  const runs = getConsecutiveRuns(tripleRanks, 2);
  if (!runs.length) return false;

  for (const run of runs) {
    for (let size = 2; size <= run.length; size += 1) {
      for (let i = 0; i <= run.length - size; i += 1) {
        const slice = run.slice(i, i + size);
        const pairRanks = countPairRanksOutside(new Set(slice), counts);
        if (pairRanks >= size) return true;
      }
    }
  }
  return false;
}

function getConsecutiveRuns(ranks, minLength) {
  if (ranks.length < minLength) return [];
  const runs = [];
  let start = 0;
  for (let i = 1; i <= ranks.length; i += 1) {
    if (i === ranks.length || ranks[i] !== ranks[i - 1] + 1) {
      const run = ranks.slice(start, i);
      if (run.length >= minLength) runs.push(run);
      start = i;
    }
  }
  return runs;
}

function countCardsOutside(rankSet, hand) {
  return hand.reduce(
    (total, card) => (rankSet.has(card.rank) ? total : total + 1),
    0
  );
}

function countPairRanksOutside(rankSet, counts) {
  let total = 0;
  counts.forEach((count, rank) => {
    if (!rankSet.has(rank) && count >= 2) total += 1;
  });
  return total;
}

function updateStageSize() {
  const viewportWidth = window.visualViewport?.width || window.innerWidth;
  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  const compact = viewportWidth < 620 || viewportHeight < 620;
  stage.dataset.size = compact ? "compact" : "full";
  const base = compact ? { w: 380, h: 456 } : { w: 788, h: 492 };
  stage.style.setProperty("--stage-w", `${base.w}px`);
  stage.style.setProperty("--stage-h", `${base.h}px`);
  const scale = Math.min(
    (viewportWidth - 24) / base.w,
    (viewportHeight - 24) / base.h,
    1
  );
  stage.style.transform = `scale(${scale})`;
  stageShell.style.width = `${base.w * scale}px`;
  stageShell.style.height = `${base.h * scale}px`;
  if (typeGallery) {
    typeGallery.style.width = `${Math.min(base.w * scale, viewportWidth - 24)}px`;
  }
}

function scheduleStageSizeSync() {
  requestAnimationFrame(updateStageSize);
  setTimeout(updateStageSize, 120);
}

function setup() {
  updateStageSize();
  window.addEventListener("resize", updateStageSize);
  window.addEventListener("orientationchange", scheduleStageSizeSync);
  window.addEventListener("pageshow", scheduleStageSizeSync);
  window.visualViewport?.addEventListener("resize", scheduleStageSizeSync);

  resetRound();
  renderTypeShowcase();
  showStartOverlay();
  scheduleStageSizeSync();

  playBtn.addEventListener("click", playUser);
  passBtn.addEventListener("click", passUser);
  hintBtn.addEventListener("click", hintUser);
  restartBtn.addEventListener("click", restartGame);
  endBtn.addEventListener("click", endExperience);

  const bgAudio = document.getElementById("bg-audio");
  function tryPlayBackground() {
    if (!bgAudio) return;
    try {
      bgAudio.volume = 0.45;
      const p = bgAudio.play();
      if (p && p instanceof Promise) {
        p.catch(() => {
          // Autoplay was prevented; will remain silent until next user gesture
        });
      }
    } catch (e) {
      // ignore play errors
    }
  }

  // 初始化静音按钮状态与交互
  if (bgMuteBtn) {
    try {
      const saved = localStorage.getItem("bgMuted");
      if (saved !== null && bgAudio) {
        bgAudio.muted = saved === "true";
      }
      const isMuted = bgAudio ? bgAudio.muted : false;
      bgMuteBtn.textContent = isMuted ? "有声" : "静音";
      bgMuteBtn.setAttribute("aria-pressed", isMuted ? "true" : "false");
    } catch (e) {
      // ignore
    }

    bgMuteBtn.addEventListener("click", () => {
      if (!bgAudio) return;
      bgAudio.muted = !bgAudio.muted;
      localStorage.setItem("bgMuted", bgAudio.muted ? "true" : "false");
      bgMuteBtn.textContent = bgAudio.muted ? "有声" : "静音";
      bgMuteBtn.setAttribute("aria-pressed", bgAudio.muted ? "true" : "false");
    });
  }

  if (introStartBtn) {
    introStartBtn.addEventListener("click", () => {
      tryPlayBackground();
      if (introStartBtn.dataset.mode === "close") {
        hideStartOverlay();
        return;
      }
      showCallLandlordStep();
    });
  }
  if (callLandlordBtn) {
    callLandlordBtn.addEventListener("click", () => {
      tryPlayBackground();
      startMatch(true);
    });
  }
  if (passLandlordBtn) {
    passLandlordBtn.addEventListener("click", () => {
      tryPlayBackground();
      startMatch(false);
    });
  }
  if (rulesBtn) {
    rulesBtn.addEventListener("click", () => showStartOverlay("rules"));
  }
}

setup();
