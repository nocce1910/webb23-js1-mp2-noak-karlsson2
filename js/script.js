document.addEventListener("DOMContentLoaded", function () {
    // Hämta referenser till olika HTML-element från deras ID
    const gameForm = document.getElementById("game-form"); // Formuläret för spelet
    const playerNameInput = document.getElementById("player-name-input"); // Textinmatningsfält för spelarens namn
    const startGameBtn = document.getElementById("start-game-btn"); // Knapp för att starta spelet
    const gameContainer = document.getElementById("game-container"); // Kontainer för själva spelet
    const playerName = document.getElementById("player-name"); // Visning av spelarens namn
    const playerScore = document.getElementById("player-score"); // Visning av spelarens poäng
    const computerScore = document.getElementById("computer-score"); // Visning av datorns poäng
    const rockBtn = document.getElementById("rock-btn"); // Knapp för att välja sten
    const paperBtn = document.getElementById("paper-btn"); // Knapp för att välja papper
    const scissorsBtn = document.getElementById("scissors-btn"); // Knapp för att välja sax
    const result = document.getElementById("result"); // Resultatet av spelet visas här
    const restartGameBtn = document.getElementById("restart-game-btn"); // Knapp för att starta om spelet

    // Deklarera och initiera variabler för spelarens val och poäng
    let playerChoice = ""; // Variabel för spelarens val
    let playerPoints = 0; // Variabel för spelarens poäng
    let computerPoints = 0; // Variabel för datorns poäng

    // Lyssna på händelsen "submit" för formuläret
    gameForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Förhindra standard beteende för att skicka formuläret

        const name = playerNameInput.value; // Hämta värdet från textinmatningsfältet för spelarens namn
        if (name) {
            playerName.textContent = name; // Visa spelarens namn i DOM:en
            gameContainer.style.display = "block"; // Visa spelet genom att ändra display-egenskapen för kontainern
            startGameBtn.disabled = true; // Inaktivera startknappen
        }
    });

    // Funktion för att generera datorns val
    function generateComputerChoice() {
        const choices = ["Sten", "Sax", "Påse"]; // En array med möjliga val för datorn
        const randomIndex = Math.floor(Math.random() * choices.length); // Slumpmässigt index för att välja ett val
        return choices[randomIndex]; // Returnera det slumpade valet
    }

    // Funktion för att uppdatera poängen i DOM:en
    function updateScores() {
        playerScore.textContent = `${playerName.textContent}: ${playerPoints}`; // Visa spelarens poäng
        computerScore.textContent = `Datorn: ${computerPoints}`; // Visa datorns poäng
    }

    // Funktion för att kontrollera vinnaren och avsluta spelet vid behov
    function checkWinner() {
        if (playerPoints === 3 || computerPoints === 3) {
            let winner = "";
            if (playerPoints === 3) {
                winner = playerName.textContent;
            } else {
                winner = "Datorn";
            }
            result.textContent = `${winner} vinner spelet!`;
            endGame();
        }
    }

    // Funktion för att avsluta spelet
    function endGame() {
        rockBtn.disabled = true;
        paperBtn.disabled = true;
        scissorsBtn.disabled = true;
        restartGameBtn.style.display = "block";
    }

    // Funktion för att spela en runda
    function playRound(playerChoice) {
        const computerChoice = generateComputerChoice();
        result.textContent = `Ditt val: ${playerChoice} | Datorns val: ${computerChoice}`;

        if (playerChoice === computerChoice) {
            result.textContent += " | Oavgjort!";
        } else if (
            (playerChoice === "Sten" && computerChoice === "Sax") ||
            (playerChoice === "Sax" && computerChoice === "Påse") ||
            (playerChoice === "Påse" && computerChoice === "Sten")
        ) {
            playerPoints++;
            result.textContent += " | Du vinner rundan!";
        } else {
            computerPoints++;
            result.textContent += " | Datorn vinner rundan!";
        }

        updateScores();
        checkWinner();
    }

    // Lägger till en händelselyssnare för knappen med id "rockBtn"
    rockBtn.addEventListener("click", function () {
        playRound("Sten");
    });

    // Lägger till en händelselyssnare för knappen med id "paperBtn"
    paperBtn.addEventListener("click", function () {
        playRound("Påse");
    });

    // Lägger till en händelselyssnare för knappen med id "scissorsBtn"
    scissorsBtn.addEventListener("click", function () {
        playRound("Sax");
    });

    // Lägger till en händelselyssnare för knappen med id "restartGameBtn"
    restartGameBtn.addEventListener("click", function () {
        playerChoice = "";
        playerPoints = 0;
        computerPoints = 0;
        updateScores();
        result.textContent = "";
        rockBtn.disabled = false;
        paperBtn.disabled = false;
        scissorsBtn.disabled = false;
        restartGameBtn.style.display = "none";
    });
});
