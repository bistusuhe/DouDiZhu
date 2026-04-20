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
const typeToast = document.getElementById("type-toast");
const toastTitle = document.getElementById("toast-title");
const toastBody = document.getElementById("toast-body");
const toastClose = document.getElementById("toast-close");
const endModal = document.getElementById("end-modal");
const restartBtn = document.getElementById("restart-btn");
const endBtn = document.getElementById("end-btn");
const typeGrid = document.getElementById("type-grid");
const typeGallery = document.querySelector(".type-gallery");
const landlordCardsEl = document.getElementById("landlord-cards");
const startOverlay = document.getElementById("start-overlay");
const startStepIntro = document.getElementById("start-step-intro");
const startStepCall = document.getElementById("start-step-call");
const introStartBtn = document.getElementById("intro-start-btn");
const callLandlordBtn = document.getElementById("call-landlord-btn");
const passLandlordBtn = document.getElementById("pass-landlord-btn");

const TYPE_INFO = {
  single: { name: "单张", desc: "单张：任意一张牌。" },
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
    detail: "任意单张可出，比较单牌点数大小。",
  },
  {
    type: "pair",
    example: "示例：88",
    detail: "两张同点数组成，对子只能压对子。",
  },
  {
    type: "triple",
    example: "示例：999",
    detail: "三张同点数，三张只能压三张。",
  },
  {
    type: "triple-single",
    example: "示例：777+K",
    detail: "三张相同牌带任意一张单牌。",
  },
  {
    type: "triple-pair",
    example: "示例：666+44",
    detail: "三张相同牌带一对。",
  },
  {
    type: "straight",
    example: "示例：34567",
    detail: "至少5张连续单牌，不能包含2和王。",
  },
  {
    type: "pair-straight",
    example: "示例：445566",
    detail: "至少3组连续对子，不能包含2和王。",
  },
  {
    type: "plane",
    example: "示例：777888",
    detail: "至少2组连续三张相同牌。",
  },
  {
    type: "plane-single",
    example: "示例：777888+3+4",
    detail: "飞机带单翅膀，翅膀数量与三张组数相同。",
  },
  {
    type: "plane-pair",
    example: "示例：888999+44+55",
    detail: "飞机带对翅膀，翅膀数量与三张组数相同。",
  },
  {
    type: "bomb",
    example: "示例：JJJJ",
    detail: "炸弹可压过非炸弹；炸弹之间比较点数。",
  },
  {
    type: "rocket",
    example: "示例：小王+大王",
    detail: "王炸为全场最大牌型。",
  },
];

const TYPE_EXAMPLE_CARDS = {
  single: [
    { rank: "A", suit: "♠" },
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

const USER_HAND_SEED = [
  { rank: 3, suit: "spade" },
  { rank: 4, suit: "spade" },
  { rank: 4, suit: "heart" },
  { rank: 4, suit: "club" },
  { rank: 4, suit: "diamond" },
  { rank: 5, suit: "spade" },
  { rank: 5, suit: "heart" },
  { rank: 6, suit: "club" },
  { rank: 6, suit: "diamond" },
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
  { rank: 12, suit: "diamond" },
  { rank: 13, suit: "spade" },
  { rank: 14, suit: "spade" },
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

  return { valid: false, reason: "你选择了单张+对子，这不是合法牌型。" };
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
    showEndModal();
    return;
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
  validationText.textContent = "组合有效，可以出牌。";
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
  showTypeToast(play.type);
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

function showTypeToast(type) {
  const info = TYPE_INFO[type];
  if (!info) return;
  toastTitle.textContent = info.name;
  toastBody.textContent = info.desc;
  typeToast.classList.add("show");
  clearTimeout(showTypeToast.timer);
  showTypeToast.timer = setTimeout(hideTypeToast, 3000);
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

function hideTypeToast() {
  typeToast.classList.remove("show");
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

function showStartOverlay() {
  if (!startOverlay) return;
  startOverlay.classList.add("show");
  startOverlay.classList.remove("is-hiding");
  startOverlay.setAttribute("aria-hidden", "false");
  if (startStepIntro) startStepIntro.classList.remove("hidden");
  if (startStepCall) startStepCall.classList.add("hidden");
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
    startOverlay.classList.add("is-hiding");
    startOverlay.classList.remove("show");
    startOverlay.setAttribute("aria-hidden", "true");
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

  hideTypeToast();
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
  const hint = findHint(hand, target);
  if (!hint) return null;
  const play = detectPlay(hint);
  if (!play.valid) return null;
  const beatCheck = validateAgainstTarget(play);
  return beatCheck.canBeat ? hint : null;
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
  const card = sorted.find((c) => c.rank > minRank);
  return card ? [card] : findBombOrRocket(hand);
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

function updateStageSize() {
  const compact = window.innerWidth < 620 || window.innerHeight < 620;
  stage.dataset.size = compact ? "compact" : "full";
  const base = compact ? { w: 380, h: 456 } : { w: 788, h: 492 };
  stage.style.setProperty("--stage-w", `${base.w}px`);
  stage.style.setProperty("--stage-h", `${base.h}px`);
  const scale = Math.min(
    (window.innerWidth - 24) / base.w,
    (window.innerHeight - 24) / base.h,
    1
  );
  stage.style.transform = `scale(${scale})`;
  stageShell.style.width = `${base.w * scale}px`;
  stageShell.style.height = `${base.h * scale}px`;
  if (typeGallery) {
    typeGallery.style.width = `${base.w * scale}px`;
  }
}

function setup() {
  updateStageSize();
  window.addEventListener("resize", updateStageSize);

  resetRound();
  renderTypeShowcase();
  showStartOverlay();

  playBtn.addEventListener("click", playUser);
  passBtn.addEventListener("click", passUser);
  hintBtn.addEventListener("click", hintUser);
  toastClose.addEventListener("click", hideTypeToast);
  restartBtn.addEventListener("click", restartGame);
  endBtn.addEventListener("click", endExperience);
  if (introStartBtn) {
    introStartBtn.addEventListener("click", showCallLandlordStep);
  }
  if (callLandlordBtn) {
    callLandlordBtn.addEventListener("click", () => startMatch(true));
  }
  if (passLandlordBtn) {
    passLandlordBtn.addEventListener("click", () => startMatch(false));
  }
}

setup();
