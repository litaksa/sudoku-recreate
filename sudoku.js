// Objek audio untuk musik latar belakang
var backgroundMusic = document.getElementById('backgroundMusic');

// Tombol Play dan Stop
var playButton = document.getElementById('playButton');
var stopButton = document.getElementById('stopButton');

// Fungsi untuk memutar musik latar belakang
function playBackgroundMusic() {
    backgroundMusic.play();
    playButton.disbled = true;
    stopButton.disabled = false;
}

// Fungsi untuk menghentikan musik latar belakang
function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    playButton.disabled = false;
    stopButton.disabled = true;
}

// Menghubungkan fungsi ke tombol Play dan Stop
playButton.addEventListener('click', playBackgroundMusic);
stopButton.addEventListener('click', stopBackgroundMusic);

var numSelected = null;
var tileSelected = null;

var errors = 0;

// Variasi papan Sudoku
var board1 = [
    "123--567-9",
    "45-7-9-32",
    "-893-1645",
    "231-45-69",
    "3-5--7-81",
    "9-2-4-5-8",
    "51-672-9-",
    "-73-9--1-",
    "8-4--7--6"
];

var solution1 = [
    "123456789",
    "456789132",
    "789321645",
    "231845769",
    "345967281",
    "962134578",
    "518672394",
    "673298417",
    "894513726"
];

// ...
// (Variasi papan Sudoku lainnya)

var currentBoard = board1;
var currentSolution = solution1;

window.onload = function() {
    setGame();
    playButton.disabled = true; // Matikan tombol Play saat halaman dimuat
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (currentBoard[r][c] != "-") {
                tile.innerText = currentBoard[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (currentSolution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}
