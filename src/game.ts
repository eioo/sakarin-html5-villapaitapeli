import { playSound, stopSound } from './sound';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const startBtn = $('.start-button') as HTMLButtonElement;
const noBtn = $('.no-button') as HTMLButtonElement;
const yesBtn = $('.yes-button') as HTMLButtonElement;
const retryButtons = Array.from($$('.retry-button')) as HTMLButtonElement[];

const gameStates = {
  intro: () => {
    playSound('sakarin_villapaitapeli');
  },
  question: () => {
    playSound('pue_sakarille_villapaita');
  },
  selectedNo: async () => {
    await playSound('hmm');
    changeGameState('gameLost');
  },
  selectedYes: () => {
    stopSound();
    setTimeout(() => {
      changeGameState('tickling');
    }, 1500);
  },
  tickling: async () => {
    await playSound('hihihi_kutittaa');
    changeGameState('gameWon');
  },
  gameLost: () => {
    playSound('hävisit_pelin');
  },
  gameWon: () => {
    playSound('voitit_pelin');
  },
};

function bindEventListeners() {
  startBtn.onclick = () => {
    changeGameState('question');
  };
  noBtn.onclick = () => {
    changeGameState('selectedNo');
  };
  yesBtn.onclick = () => {
    changeGameState('selectedYes');
  };
  retryButtons.forEach(
    btn =>
      (btn.onclick = () => {
        changeGameState('intro');
      })
  );
}

function changeGameState(name: keyof typeof gameStates) {
  const children = Array.from($$('.game > div')) as HTMLElement[];
  children.forEach(c => (c.style.display = 'none'));

  const stageElement = $(`div[data-stage="${name}"]`) as HTMLDivElement;
  stageElement.style.display = 'block';

  gameStates[name]();
}

function start() {
  bindEventListeners();
  changeGameState('intro');
}

start();
