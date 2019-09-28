let numOfSquares = 6;
let colors = [];
let pickedColor;
let h1 = document.querySelector("h1");
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let resetButton = document.getElementById("reset");
let modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", reset);

function init(){

	//MODE BUTTONS FOR EVENT LISTENERS
	setUpModeButtons();

    //SET UP SQUARES
    setUpSquares();

    //INITIALIZE/RESET PAGE
	reset();

} //END 'INIT' FUNCTION

function setUpModeButtons(){
	for(let i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			//TERNARY OPERATOR (SAME AS IF-ELSE)
			this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;

			//IF-ELSE OPTION TO TERNARY
			/*
			if(this.textContent === "Easy"){
				numOfSquares = 3;
			}
			else{ // HARD MODE
				numOfSquares = 6;
			}
			*/
			reset();
		});
	}; //END FOR LOOP
}

function setUpSquares(){

	for(let i = 0; i< squares.length; i++){
	
		//ADD CLICK LISTENERS TO SQUARES
		squares[i].addEventListener("click",function(){
			//GRAB COLOR OF CLICKED SQUARE
			let clickedColor = this.style.backgroundColor;
			//COMPARE COLOR TO "pickedColor"
			if(clickedColor===pickedColor){
				messageDisplay.textContent = "Correct!!!";
				resetButton.textContent = "Play Again?";
				changeColors(pickedColor);
				h1.style.backgroundColor = clickedColor;
			}
			else{
				this.style.backgroundColor = "#1a1a1a";
				messageDisplay.textContent = "Try Again...";		
			}
		});

	} // END FOR LOOP
}


function reset(){

	//GHANGE MESSAGE BACK AND HEADER BACK TO BACKGROUND COLOR

	h1.style.backgroundColor = "#ff8080"
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	
	//GENERATE ALL NEW COLORS

	colors = generateRandomColors(numOfSquares);
	
	//PICK A NEW RANDOM COLOR FROM ARRAY
	
	pickedColor = pickColor();
	
	//CHANGE colorDisplay() TO MATCH PICKED COLOR
	
	colorDisplay.textContent = pickedColor;
	
	//CHANGE COLORS OF SQUARES
	
	for(let i = 0; i< squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else{
			squares[i].style.display = "none";
		}	
	}
}

function changeColors(color){
	//LOOP THROUGH ALL SQUARES

	for(let i = 0; i<squares.length; i++){
		//CHANGE EACH SQUARE TO MATCH GIVEN COLOR
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	//PICK A RANDOM NUMBER
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//GENERATE RANDOM COLORS

function generateRandomColors(num){
	//MAKE AN ARRAY
	let arr = [];
	//ADD NUM RANDOM COLORS TO ARRAY, REPEAT 'NUM' TIMES
	for(let i = 0; i < num; i++){
		//GET RANDOM COLOR AND PUSH INTO ARRAY
		arr.push(randomColor());
	}
	//RETURN THAT ARRAY
	return arr;
}

function randomColor(){
	//PICK A "RED" FROM 0 - 255
	let r = Math.floor(Math.random() * 256);
	//PICK A "GREEN" FROM 0 -255
	let g = Math.floor(Math.random() * 256);
	//PICK A "BLUE" FROM 0 -255
	let b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";

	//**EXTRA SPACE NEEDED AFTER COMMA, BUG OCCURS WHERE CSS ADDS ANOTHER SPACE 
	//INBETWEEN ITS NUMBERS console.log(clickedColor, pickedColor); TO VERIFY**//

	//** Math.random() => Gives random number, a whole number w/decimal **//
	//** Math.floor() => Rounds the number to the lowest integer **//
}
