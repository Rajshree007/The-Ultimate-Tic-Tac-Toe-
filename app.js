let boxes=document.querySelectorAll(".box");
let grids=document.querySelector(".grid");
let info=document.querySelector(".info");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let container=document.querySelector(".container");
let game_title= document.querySelector(".game_title");
let resetButton=document.querySelector(".reset");

// Parse player names from URL
let urlParams = new URLSearchParams(window.location.search);
let playerX = urlParams.get('playerX') || 'Player X';
let playerO = urlParams.get('playerO') || 'Player O';


let turn0=true;
  
const grid = []; 
boxes.forEach(box => {
  const a = +box.dataset.a;
  const b = +box.dataset.b;
  const c = +box.dataset.c;
  const d = +box.dataset.d;

  grid[a] ??= [];
  grid[a][b] ??= [];
  grid[a][b][c] ??= [];
  grid[a][b][c][d] = box;
});

const winpatterns=[
    [0,0,1,1,2,2],
    [0,2,1,1,2,0],
    [0,0,1,0,2,0],
    [0,1,1,1,2,1],
    [0,2,1,2,2,2],
    [0,0,0,1,0,2],
    [1,0,1,1,1,2],
    [2,0,2,1,2,2],
];
const finelWin=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let winCells = Array.from({ length: 9 }, () => Array(2).fill(10));

let i=0;
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        
        if(turn0){
            box.innerText="X";
            turn0=false;
        }else{
            box.innerText="O";
            turn0=true;
        }
        box.disabled=true;
        let a=box.getAttribute("data-a");
        let b=box.getAttribute("data-b");
        let c=box.getAttribute("data-c");
        let d=box.getAttribute("data-d");
        let x=box.getAttribute("data-x");
        checkCellWin(a,b,c,d,x);
    });
});

const checkCellWin=(a,b,c,d,x)=>{
    for(pattern of winpatterns){
        let pos1=grid[a][b][pattern[0]][pattern[1]];
        let pos2=grid[a][b][pattern[2]][pattern[3]];
        let pos3=grid[a][b][pattern[4]][pattern[5]];
        
        if(pos1.innerText !="" && pos2.innerText !="" && pos3.innerText !=""){
            if(pos1.innerText === pos2.innerText && pos2.innerText === pos3.innerText){
                let notPresent = winCells.every(row => row[0] !== x);

                if (notPresent) {
                    winCells[i][0]=x;
                    winCells[i][1]=pos1.innerText;
                    for(box of boxes){
                        if(box.getAttribute("data-x")===String(x)){
                            if (pos1.innerText === "X") {
                                box.style.backgroundColor="#FED2E2";
                            }
                            else if (pos1.innerText === "O") {
                                box.style.backgroundColor="#C4D9FF";
                            }
                        }
                        
                    }
                    i++;
                    checkFinalWin(c,d);
                }
               
            }
        }
    }
    for(box of boxes){
        if(c===box.getAttribute("data-a") && d===box.getAttribute("data-b")){
            
            box.disabled=false;
            if(box.innerText != ""){
                box.disabled=true;
            }
        }
        else{
            box.disabled=true;
        }
    }
   
    
}


const checkFinalWin=(c,d)=>{
    if(i>=3){
        for(win of finelWin){
            let pos1=win[0];
            let pos2=win[1];
            let pos3=win[2];
            
            
            let found = [];
            for (let j = 0; j < 9; j++) {
                if (winCells[j][0] == pos1 || winCells[j][0] == pos2 || winCells[j][0] == pos3) {
                    found.push(winCells[j][1]);
                }
            }
            
            if (found.length === 3 && found[0] === found[1] && found[1] === found[2]) {
                
                setTimeout(() => {
                if(found[0]==="X"){
                   
                    msg.innerText =`Congratulations: ${playerX} is the winner`;
                    msgContainer.style.backgroundColor="#A53860";
                    game_title.style.backgroundColor="#A53860";
                   

                }
                else if(found[0]==="O"){
                    
                    msg.innerText =`Congratulations: ${playerO} is the winner`;
                    msgContainer.style.backgroundColor="#687FE5";
                    game_title.style.backgroundColor="#687FE5";
                    
                }
                for(box of boxes){
                    box.disabled=true;
                }
               
                    msgContainer.classList.remove("hide");
                }, 1000);
                
                return;
            }
        }
    }
    
}  
resetButton.addEventListener("click", () => {

      for (let box of boxes) {
        box.disabled = false;
        box.style.backgroundColor = "#fff";
        box.innerText = "";
      }
  
      for (let i = 0; i < winCells.length; i++) {
        winCells[i][0] = 10;
        winCells[i][1] = 10;
      }

      msgContainer.classList.add("hide");
      game_title.style.backgroundColor="#1E3E62";

      window.location.href = "index.html";

});
  
 