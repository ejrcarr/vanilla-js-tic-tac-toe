const gameBoard = (() => {
	let boardTiles = document.querySelectorAll('.board-tile');
	let boardTileArray = [];
	boardTiles.forEach((tile) => boardTileArray.push(tile.textContent));

	const getBoardTileArray = () => {
		return boardTileArray;
	};

	const setBoardTile = (index, player) => {
		boardTileArray[index] = player.getPlayerMarker();
		displayController.renderTile(index, player.getPlayerMarker());
	};

	const isGameOver = () => {
		for (let i = 0; i < Math.sqrt(boardTileArray.length); i++) {}
	};

	return { getBoardTileArray, setBoardTile };
})();

const Player = (marker) => {
	const getPlayerMarker = () => {
		return marker;
	};
	return { getPlayerMarker };
};

const gameController = (() => {
	let playerOne = Player('X');
	let playerTwo = Player('O');
	let isPlayerOnesTurn = true;

	const getCurrentPlayer = () => {
		return isPlayerOnesTurn ? playerOne : playerTwo;
	};

	const switchCurrentPlayer = () => (isPlayerOnesTurn = !isPlayerOnesTurn);
	return { getCurrentPlayer, switchCurrentPlayer };
})();

const displayController = (() => {
	const gameBoardContainer = document.getElementById('gameboard');
	const _init = (size = 3) => {
		_createBoardTileDivs(size);
	};

	const _createBoardTileDivs = (size) => {
		gameBoardContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
		gameBoardContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
		for (let i = 0; i < size * size; i++) {
			const boardTileButton = document.createElement('button');
			boardTileButton.classList.add('board-tile');
			boardTileButton.id = i;
			boardTileButton.addEventListener(
				'click',
				() => {
					gameBoard.setBoardTile(
						boardTileButton.id,
						gameController.getCurrentPlayer()
					);
					gameController.switchCurrentPlayer();
				},
				{ once: true }
			);
			gameBoardContainer.appendChild(boardTileButton);
		}
	};

	_init();

	const renderTile = (index, marker) => {
		const boardTile = document.getElementById(`${index}`);
		// const h1 = document.createElement('h1');
		// h1.textContent = marker;
		// boardTile.appendChild(h1);
		boardTile.textContent = marker;
	};
	return { renderTile };
})();
