function drawChessBoard() {
	let chessboard = document.querySelector('.container');
	let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
	let numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];
	for (let i = 0; i < numbers.length; i++) {
		for (let j = 0; j < letters.length; j++) {
			let square = document.createElement('div');
			square.classList.add('square', ((i + j) % 2 === 0) ? 'white' : 'black');
			square.dataset.row = i;
			square.dataset.col = j;
			if (i === 0) {
				let topLabel = document.createElement('span');
				topLabel.innerText = letters[j];
				topLabel.style.transform = 'translateY(-50px)';
				topLabel.className = 'label'
				square.append(topLabel);
			}
			if (j === 0) {
				let leftLabel = document.createElement('span');
				leftLabel.innerText = numbers[i];
				leftLabel.className = 'label'
				leftLabel.style.transform = 'translateX(-50px)';
				square.append(leftLabel);
			}
			square.addEventListener('click', () => highlightKnightMoves(i, j));
			chessboard.append(square);
		}
	}
}

function getHorseSteps(row, col) {
	let moves = [
		[row + 2, col + 1], [row + 2, col - 1],
		[row - 2, col + 1], [row - 2, col - 1],
		[row + 1, col + 2], [row + 1, col - 2],
		[row - 1, col + 2], [row - 1, col - 2]
	];
	return moves.filter(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8);
}
function highlightKnightMoves(row, col) {
	clearHighlights();
	let moves = getHorseSteps(row, col);
	moves.forEach(([r, c]) => {
		let square = document.querySelector(`.square[data-row='${r}'][data-col='${c}']`);
		if (square) {
			square.classList.add('highlight');
		}
	});
}
function clearHighlights() {
	document.querySelectorAll('.highlight').forEach(square => {
		square.classList.remove('highlight');
	});
}
drawChessBoard();