var widthOfSquare = 40; // szerokosc jednego kwadratu
var canvas = document.getElementById("chessboardCanvas"); // Get the canvas element
var ctx = canvas.getContext("2d");
var positionOfWolf = [7,4] // array for collecting current position of wolf
var positionOfSheeps = [[0,1],[0,3],[0,5],[0,7]] // array for collecting current positions of sheeps
var nextSq = [];
var colour = true;
var moveOfSheep = true;
var moveOfWolf = false;

function toDefault() {
  positionOfWolf = [7,4]; // array for collecting current position of wolf
  positionOfSheeps = [[0,1],[0,3],[0,5],[0,7]]; // array for collecting current positions of sheeps
  defaultSettings();
  defaultWolf();
}
function createBoard() {
    let board = []; // create empty array
    for (let i=0;i<8;i++) {
        let tempBoard = [];
        for (let j=0;j<8;j++) {
            if ((i%2==0 || j%2==0) && (i%2==1 || j%2==1)) tempBoard.push(1); // 1 means available square - black square
            else tempBoard.push(0);

        }
        board.push(tempBoard);
    }
    return board;
}

function defaultSheeps() {
 board = createBoard();
 positionOfSheeps=[];
 for (let i =1;i<8;i+=2){
   if(board[0][i] ==1 ) {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc((i+0.5)*widthOfSquare, 7.5*widthOfSquare, widthOfSquare/2-1, 0, 2 * Math.PI); //7.5 is const i+0.5
      ctx.fill();
      positionOfSheeps.push([0,i]);
      board[0][i]=2;
     }
  }
  return board;
}

function listsContain(listA, listB) {
    for (let i = 0; i < listA.length; i++) {
        if (arraysAreEqual(listA[i], listB)) {
            return true;
        }
    }
    return false;
}

function moveSheep() {
  board = createBoard();
  
  for (el of positionOfSheeps) {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc((el[1]+0.5)*widthOfSquare, (7-el[0]+0.5)*widthOfSquare, widthOfSquare/2-1, 0, 2 * Math.PI); //7.5 is const i+0.5
      ctx.fill();
      board[el[0]][el[1]]=2;
  }
  return board;
}



function defaultWolf() {
    board = moveSheep();
    moveSheep(); // Call moveSheep to draw the sheep on the canvas
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    let X = positionOfWolf[1];
    let Y = positionOfWolf[0];
    ctx.arc((X + 0.5) * widthOfSquare, (7-Y+0.5) * widthOfSquare, widthOfSquare / 2 - 1, 0, 2 * Math.PI); //7.5 is const i+0.5
    board[Y][X]=3;
    ctx.fill();
    return board;
}




function drawSquare(x, y){
  board = createBoard();
 
  if (board[x][y] == 0)
    ctx.fillStyle="#000000";
  else
    ctx.fillStyle="#889999";
  ctx.fillRect(x*widthOfSquare,y*widthOfSquare,widthOfSquare-1,widthOfSquare-1);

}

function defaultSettings(){
  for (let i=0;i<8;i++) {
        for (let j=0;j<8;j++) {
          drawSquare(i,j);
        }
  }

}


function nextPos(pos){
    let nextPos = [];
    let board = defaultWolf();
    if (board[pos[0]][pos[1]]==2) {
        //console.log("Jestem w IF")
        if (0<=pos[0]<=6 && pos[1]>=1 && pos[1]<=6 ) {
            if (board[pos[0]+1][pos[1]+1]==1) nextPos.push([pos[0]+1,pos[1]+1]);
            if (board[pos[0]+1][pos[1]-1]==1) nextPos.push([pos[0]+1,pos[1]-1]);
        }
        if (0<=pos[0]<=6 &&  pos[1]==7 ) {
            //console.log("JESTEM W IF2");
            if (board[pos[0]+1][pos[1]-1]==1)  nextPos.push([pos[0]+1,pos[1]-1]);
        }
      if (0<=pos[0]<=6 &&  pos[1]==0 ) {
            //console.log("JESTEM W IF2");
            if (board[pos[0]+1][pos[1]+1]==1)  nextPos.push([pos[0]+1,pos[1]+1]);
        }
        

       
       
    }
    return nextPos;
}


function nextWolfPos(pos){
    let board = defaultWolf(); // Pobierz aktualną planszę
    let nextPos = []; 

    if (board[pos[0]][pos[1]] == 3) {
        // Sprawdzanie ruchu do przodu
        if (pos[0] > 0 && pos[1] >= 1 && pos[1] <= 6) {
            if (board[pos[0]-1][pos[1]+1] == 1) nextPos.push([pos[0]-1, pos[1]+1]);
            if (board[pos[0]-1][pos[1]-1] == 1) nextPos.push([pos[0]-1, pos[1]-1]);
        }
        if (pos[0] > 0 && pos[1] == 7) {
            if (board[pos[0]-1][pos[1]-1] == 1) nextPos.push([pos[0]-1, pos[1]-1]);
        }
        if (pos[0] > 0 && pos[1] == 0) {
            if (board[pos[0]-1][pos[1]+1] == 1) nextPos.push([pos[0]-1, pos[1]+1]);
        }

        // Sprawdzanie ruchu do tyłu
        if (pos[0] < 7 && pos[1] >= 1 && pos[1] <= 6) {
            if (board[pos[0]+1][pos[1]+1] == 1) nextPos.push([pos[0]+1, pos[1]+1]);
            if (board[pos[0]+1][pos[1]-1] == 1) nextPos.push([pos[0]+1, pos[1]-1]);
        }
        if (pos[0] < 7 && pos[1] == 7) {
            if (board[pos[0]+1][pos[1]-1] == 1) nextPos.push([pos[0]+1, pos[1]-1]);
        }
        if (pos[0] < 7 && pos[1] == 0) {
            if (board[pos[0]+1][pos[1]+1] == 1) nextPos.push([pos[0]+1, pos[1]+1]);
        }
    }

    return nextPos;
}





function arraysAreEqual(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}



//if (listsContain([1,2],[1,2])) document.getElementById('test2').innerHTML="TEST";
//Click event
canvas.addEventListener("click", handleClick, false);


// Click event
canvas.addEventListener("click", handleClick, false);

function handleClick(e) {
    if (!colour) {
        defaultSettings();
        moveSheep();
        defaultWolf();
    }

    cursorX = e.pageX - this.offsetLeft;
    cursorY = e.pageY - this.offsetTop;
    Y = Math.floor(8 - cursorY / 40);
    X = Math.floor(cursorX / 40);

    let value = board[Y][X];
    let nextPositions = nextPos([Y, X]);

    ctx.fillStyle = "#101870";

    if (value == 2 && moveOfSheep) {
        nextSq = [];
        // Color the squares in nextPositions
        for (let i = 0; i < nextPositions.length; i++) {
            let posX = nextPositions[i][1];
            let posY = nextPositions[i][0];
            if (colour) ctx.fillRect(posX * widthOfSquare, (7 - posY) * widthOfSquare, widthOfSquare - 1, widthOfSquare - 1);
            nextSq.push([Y, X], [posY, posX]);
        }
    } else {
        if (listsContain(nextSq, [Y, X]) && moveOfSheep) {
            let isSheepIndex = positionOfSheeps.findIndex(function (element) {
                return element[0] == nextSq[0][0] && element[1] == nextSq[0][1];
            });
            board[nextSq[0][0]][nextSq[0][1]] = 1;
            positionOfSheeps[isSheepIndex] = [Y, X];
            board[Y][X] = 2;
            nextSq = [];
            defaultSettings();
            defaultWolf();
            moveOfSheep = false;
            moveOfWolf = true; // Enable wolf move after sheep move
	    
	    if (nextWolfPos(positionOfWolf).length===0) {
                document.getElementById('test').innerHTML = ("KONIEC - WYGRAŁY OWCE");
                toDefault();
            }
        }
    }

    if (value == 3 && moveOfWolf) {
        nextSq = [];
        let nextWolfPositions = nextWolfPos([Y, X]); // Calculate possible moves for the wolf
        for (let i = 0; i < nextWolfPositions.length; i++) {
            let posX = nextWolfPositions[i][1];
            let posY = nextWolfPositions[i][0];
            if (colour) {
                ctx.fillStyle = "green"; // Highlight possible move with green color
                ctx.fillRect(posX * widthOfSquare, (7 - posY) * widthOfSquare, widthOfSquare - 1, widthOfSquare - 1);
            }
            nextSq.push([Y, X], [posY, posX]);
        }
    } else {
        if (listsContain(nextSq, [Y, X]) && moveOfWolf && !moveOfSheep && board[Y][X] != 2) {
            board[nextSq[0][0]][nextSq[0][1]] = 1;
            positionOfWolf = [Y, X];
            board[Y][X] = 3;
            nextSq = [];
            defaultSettings();
            defaultWolf();
            moveOfSheep = true; // Enable sheep move after wolf move
            moveOfWolf = false;
            if (Y == 0) {
                document.getElementById('test').innerHTML = ("KONIEC - WYGRAŁ WILK");
                toDefault();
            }
        }
    }
    colour = !colour;
}








defaultSettings();
defaultWolf();
