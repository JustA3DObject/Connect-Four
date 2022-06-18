let player1 = prompt('Player One: Enter your name , you will be blue');
let player1Color = 'rgb(86, 151, 255)';

let player2 = prompt('Player Two: Enter your name, you will be red');
let player2Color = 'rgb(237, 45, 73)';

let board = document.querySelector('.board');

let columns = board.children;

let lastSelection = '';

let resetBtn = document.querySelector('.reset');

resetBtn.addEventListener('click', () => {
  window.location.reload();
});

// chip selection function
const playerChipSelection = (col) => {
  let chips = [...col.children];

  let filtered = chips.filter((chip) => chip.classList[0] !== 'selected');

  const lastChip = document.querySelector(`.${col.classList[0]}`).children[
    filtered.length - 1
  ];

  if (lastSelection === '' || lastSelection === 'p2') {
    lastSelection = 'p1';

    lastChip.style.backgroundColor = player1Color;
    lastChip.classList.add('selected');
    lastChip.classList.add('p1');
  } else {
    lastSelection = 'p2';

    lastChip.style.backgroundColor = player2Color;
    lastChip.classList.add('selected');
    lastChip.classList.add('p2');
  }
};

[...columns].forEach((col) => {
  document
    .querySelector(`.${col.classList[0]}`)
    .addEventListener('click', () => playerChipSelection(col));
});

const verticalCheck = () => {
  let result;

  [...columns].forEach((col) => {
    let resultArr = [];
    [...col.children].forEach(
      (chip) =>
        chip.classList[1] !== undefined && resultArr.unshift(chip.classList[1])
    );

    resultArr.forEach((c, i, all) => {
      if (i <= 3 && result !== true) {
        result =
          c === all[i + 1] &&
          all[i + 1] === all[i + 2] &&
          all[i + 2] === all[i + 3];
      }
    });
  });
  return result;
};

const horizontalCheck = () => {
  let result;

  let collection = {};

  [...columns].forEach((col, index) => {
    collection[index] = [...col.children]
      .map((chip) => chip.classList[1])
      .filter((item) => item !== undefined);
  });

  [...Array(7)].forEach((_, index) => collection[index].reverse());

  [...Array(7)].forEach((_, index) => {
    collection[index].forEach((c, i) => {
      if (index <= 3 && i <= 3 && result !== true) {
        result =
          c === collection[index + 1][i] &&
          collection[index + 1][i] === collection[index + 2][i] &&
          collection[index + 2][i] === collection[index + 3][i];
      }
    });
  });

  return result;
};

const diagonalCheck = () => {
  let result;

  let collection = {};

  [...columns].forEach((col, index) => {
    collection[index] = [...col.children]
      .map((chip) => chip.classList[1])
      .filter((item) => item !== undefined);
  });

  [...Array(7)].forEach((_, index) => collection[index].reverse());

  [...Array(7)].forEach((_, index) => {
    collection[index].forEach((c, i) => {
      if (index <= 3 && i <= 2 && result !== true) {
        result =
          c === collection[index + 1][i + 1] &&
          collection[index + 1][i + 1] === collection[index + 2][i + 2] &&
          collection[index + 2][i + 2] === collection[index + 3][i + 3];
      }

      if (index >= 3 && index <= 6 && i <= 2 && result !== true) {
        result =
          c === collection[index - 1][i + 1] &&
          collection[index - 1][i + 1] === collection[index - 2][i + 2] &&
          collection[index - 2][i + 2] === collection[index - 3][i + 3];
      }
    });
  });

  return result;
};

//Function to report win to console
function reportWin() {
  document.querySelector('.win-reset-container').style.display = 'block';

  if (lastSelection === 'p1') {
    console.log(`${player1} has won the game`);
    document.querySelector(
      '.win-info'
    ).innerHTML = `${player1} has won the game`;
  } else {
    console.log(`${player2} has won the game`);
    document.querySelector(
      '.win-info'
    ).innerHTML = `${player2} has won the game`;
  }

  board.style.pointerEvents = 'none';
}

const winChecker = () => {
  if (horizontalCheck() || verticalCheck() || diagonalCheck()) {
    reportWin();
  }
};

board.addEventListener('click', winChecker);
