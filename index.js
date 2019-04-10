// **
// * This program is a boilerplate code for the standard tic tac toe game
// * Here the “box” represents one placeholder for either a “X” or a “0”
// * We have a 2D array to represent the arrangement of X or O is a grid
// * 0 -> empty box
// * 1 -> box with X
// * 2 -> box with O
// *
// * Below are the tasks which needs to be completed:
// * Imagine you are playing with the computer so every alternate move should be done by the computer
// * X -> player
// * O -> Computer
// *
// * Winner needs to be decided and has to be flashed
// *
// * Extra points will be given for approaching the problem more creatively
// *
// */

const grid = [];
const GRID_LENGTH = 5;
let turn = 'X';

let rowSum = [];
let colSum = [];
let dig1 = 0;
let dig2 = 0;

function initializeValidationData() {
	for (let index = 0; index < GRID_LENGTH; index++) {
		rowSum.push(0);
		colSum.push(0);
	}
}

function initializeGrid() {
	for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
		const tempArray = [];
		for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
			tempArray.push(0);
		}
		grid.push(tempArray);
	}
}

function getRowBoxes(colIdx) {
	let rowDivs = '';

	for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
		let additionalClass = 'darkBackground';
		let content = '';
		const sum = colIdx + rowIdx;
		if (sum % 2 === 0) {
			additionalClass = 'lightBackground';
		}
		const gridValue = grid[colIdx][rowIdx];
		if (gridValue === 1) {
			content = '<span class="cross">X</span>';
		} else if (gridValue === 2) {
			content = '<span class="cross">O</span>';
		}
		rowDivs =
			rowDivs +
			'<div colIdx="' +
			colIdx +
			'" rowIdx="' +
			rowIdx +
			'" class="box ' +
			additionalClass +
			'">' +
			content +
			'</div>';
	}
	return rowDivs;
}

function getColumns() {
	let columnDivs = '';
	for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
		let coldiv = getRowBoxes(colIdx);
		coldiv = '<div class="rowStyle">' + coldiv + '</div>';
		columnDivs = columnDivs + coldiv;
	}
	return columnDivs;
}

function renderMainGrid() {
	const parent = document.getElementById('grid');
	const columnDivs = getColumns();
	parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function updateValidationDataAndCheckFOrWinner(row, col, value) {
	rowSum[row] += value;
	colSum[col] += value;
	if (row == col) {
		dig1 += value;
	}
	if (parseInt(row) + parseInt(col) == GRID_LENGTH - 1) {
		console.log('here');
		dig2 += value;
	}

	if (rowSum[row] == GRID_LENGTH * value) {
		return true;
	} else if (colSum[col] == GRID_LENGTH * value) {
		return true;
	} else if (dig1 == GRID_LENGTH * value) {
		return true;
	} else if (dig2 == GRID_LENGTH * value) {
		return true;
	} else {
		return false;
	}
}

function onBoxClick() {
	var rowIdx = this.getAttribute('rowIdx');
	var colIdx = this.getAttribute('colIdx');
	let newValue = 1;
	grid[colIdx][rowIdx] = newValue;
	if (updateValidationDataAndCheckFOrWinner(rowIdx, colIdx, newValue)) {
		renderMainGrid();
		window.alert('winner is User');
	} else {
		computerTurn();
	}
	// renderMainGrid();
	// addClickHandlers();
}

function computerTurn() {
    let result = false;
    
    // We can disable cliks on the grid, as well as put delay of about 1 second for computer turn
    //to do : currently computer just picks the first empty box. But we can turn this into a function where it randomly picks an box from all available boxes.
    // If want to put intelligence, we can right some kind of huristic algo as well, where computer picks the best possible solution. 
	for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
		let done = 0;
		for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
			if (grid[colIdx][rowIdx] == 0) {
				grid[colIdx][rowIdx] = 2;
				done = 1;
				result = updateValidationDataAndCheckFOrWinner(rowIdx, colIdx, 100);
				break;
			}
		}
		if (done) {
			break;
		}
	}
	if (result) {
		renderMainGrid();
        window.alert('wineer is Computer');
        // Initialise main grid.
	} else {
		renderMainGrid();
		addClickHandlers();
	}
}

function addClickHandlers() {
	var boxes = document.getElementsByClassName('box');
	for (var idx = 0; idx < boxes.length; idx++) {
		boxes[idx].addEventListener('click', onBoxClick, false);
	}
}

initializeGrid();
renderMainGrid();
addClickHandlers();
initializeValidationData();
