// // alert("hello");
// let buttonColours = ["red", "blue", "green", "yellow"];
// let randomChosenColour = buttonColours[nextSequence()];
// let gamePattern = [];
// gamePattern.push(randomChosenColour);
// console.log(gamePattern);
// console.log(randomChosenColour);

// function nextSequence() {
// 	let randomNumber = Math.random() * 4;
// 	let rn = Math.floor(randomNumber);
// 	return rn;
// }
// nextSequence();
// if (randomChosenColour == "red") {
// 	$("#red").css("box-shadow", "10px", "10px", "5px", "#888");
// } else if (nextSequence() === 1) {
// 	$("#blue").css("box-shadow", "10px", "10px", "5px", "#888");
// } else if (nextSequence() === 2) {
// 	$("#green").css("box-shadow", "10px", "10px", "5px", "#888");
// } else if (nextSequence() === 3) {
// 	$("#yellow").css("box-shadow", "10px", "10px", "5px", "#888");
// }
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

$(".btn").click(function () {
	let userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length - 1); //0
});

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		$("#level-title").text("Game Over, Press Any Key to Restart");

		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}
}

function nextSequence() {
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level " + level);
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColour);
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

function playSound(name) {
	let audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
