/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore,activePlayer,dice,gameplaying;

init();



// document.querySelector('#current-'+ activePlayer).textContent=dice;
// // document.querySelector('#current-'+ activePlayer).innerHTML='<em>'+dice+'</em>';


// // read or get the value from score-0
// var x=document.querySelector('#score-0').textContent;
// console.log(x);


function init(){
	
	scores=[0,0];
 	roundScore=0;
 	activePlayer=0;
 	gameplaying=true;
 	//before the game start.
	document.querySelector('.dice').style.display='none';
	document.getElementById('score-0').textContent='0';
	document.getElementById('score-1').textContent='0';
	document.getElementById('current-0').textContent='0';
	document.getElementById('current-1').textContent='0';
	document.querySelector('#name-0').textContent='player1';
	document.querySelector('#name-1').textContent='player2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');		

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');	

	document.querySelector('.player-0-panel').classList.add('active');	
}


document.querySelector('.btn-new').addEventListener('click',init);


function nextPlayer(){

		activePlayer=== 0?activePlayer=1:activePlayer =0;
		roundScore=0;
		document.getElementById('current-0').textContent='0';
		document.getElementById('current-1').textContent='0';

		// document.querySelector('.player-0-panel').classList.remove('active');
		// document.querySelector('.player-1-panel').classList.add('active');		
		//toggle add active class if not there and remove it if it is present. it does the same work as add and remove in the above code.
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');		

		document.querySelector('.dice').style.display='none';
}



document.querySelector('.btn-roll').addEventListener('click',function () {
	if(gameplaying){
	// random number generation
		var	dice=Math.floor(Math.random()* 6)+1;

	//display result
		var diceDOM=document.querySelector('.dice')
		diceDOM.style.display='block';
		diceDOM.src='dice-'+dice+'.png';

	//update the round score if the rolled no is not 1
		if(dice!= 1){
			//add score
			roundScore+=dice;
			document.querySelector('#current-'+ activePlayer).textContent= roundScore;

		}	else {
			//next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click',function(){
	if (gameplaying) {
		//add current score to global score
		scores[activePlayer]+=roundScore;

		//update UI 
		document.querySelector('#score-'+ activePlayer).textContent=scores[activePlayer];

		//Check if player won the game.
		var input=document.querySelector('.final-score').value;
		var finalscore;
		if (input) {
			finalscore=input;
		} else {
			finalscore=100;
		}
		 if(scores[activePlayer]>=finalscore){
		document.querySelector('#name-'+ activePlayer).textContent='winner';
		document.querySelector('.dice').style.display='none';
		document.querySelector('.player-'+ activePlayer+'-panel').classList.toggle('winner');
		document.querySelector('.player-'+ activePlayer+'-panel').classList.toggle('winner');
		gameplaying=false;
		}
		else {
		//nextPlayer
		nextPlayer();
		}
	}
});

