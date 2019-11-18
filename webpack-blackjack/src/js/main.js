import BlackJack from "blackjack-dealer-logic"

export default () => {
    alert("Lets play some blackjack");
    const game = BlackJack.singleDeckGame;
    const doubleButton = document.getElementById("btn-double");
    const hitButton = document.getElementById("btn-hit");
    const standButton = document.getElementById("btn-stand");
    const playButton = document.getElementById("btn-play");
    const dealer = document.getElementById("dealer");
    const player = document.getElementById("player");
    const bust = document.getElementById("bust");
    const name = document.getElementById("name")
    const play = document.getElementById("play");
    const result = BlackJack.result;
    const history = document.getElementById("history")
    const outcome = document.getElementById("outcome")
    var gameHistory = []
    var playerName = window.prompt("enter name")
    const reset = document.getElementById("btn-reset")
    
  
    name.innerHTML = playerName;
    reset.onclick = function(){
        window.location.reload();
    }
    playButton.onclick = function(){
        bust.innerHTML = ``;
        outcome.innerHTML = ``;
        start.innerHTML = `Chip count ${game.getUserChips()}`;
        history.innerHTML = gameHistory;
        
        const wager = window.prompt("Ante");
        game.receiveAnte(wager);

        
        play.innerHTML = `Your bet ${wager}`;
        
        game.deal();
        
        dealer.innerHTML = `Dealer Hand ${game.getDealerCardUp()}`;
        player.innerHTML = `Your Hand ${game.getUserHandValue()}`;

        hitButton.onclick = function(){
            game.hitUser();
            game.evaluateUser();
            player.innerHTML = `Your Hand ${game.getUserHandValue()}`;
            // check if bust
            if (game.isUserBust()){
                bust.innerHTML = "Bust"
                hitButton.onclick = function(){}
                game.settleDealerHand();
                outcome.innerHTML ="Loser"
                gameHistory.push("lost")
                game.resetAnte();
        }
            game.settleDealerHand();
            game.resetPlayers();

        };

        doubleButton.onclick = function(){
            game.evaluateUser();
            game.doubleUser();
            player.innerHTML = `Your Hand ${game.getUserHandValue()}`;
            // check if bust
            play.innerHTML = `Your Bet ${game.getAnte()}`;
            player.innerHTML = `Your Hand ${game.getUserHandValue()}`;
            game.settleDealerHand();

            if (game.isUserBust()){
                bust.innerHTML = "Bust"
                hitButton.onclick = function(){}
                game.settleDealerHand();
                dealer.innerHTML = `Dealer Hand ${game.getDealerHandValue()}`;
                outcome.innerHTML =`"Dealer Wins`
                gameHistory.push("lost")
                game.resetAnte();

            }
            game.resetPlayers();


        };
        standButton.onclick = function(){
            game.standUser();
            game.evaluateUser();
            player.innerHTML = `Your Hand ${game.getUserHandValue()}`;
            game.settleDealerHand();
            dealer.innerHTML = `Dealer Hand ${game.getDealerHandValue()}`;
            switch (game.outcome()){
                case result.LOSS:
                    outcome.innerHTML ="Loser"
                    gameHistory.push("lost")
                    game.resetAnte();
                    break;
                  case result.PUSH:
                    outcome.innerHTML= "Push"
                    gameHistory.push("push")
                    game.pushHand();
                  case result.WIN:
                    outcome.innerHTML ="Winner"
                    gameHistory.push("win")
                    game.userWin();
              
                  default:
                    break;           
                }
            game.resetPlayers();

        };
        

    }
}