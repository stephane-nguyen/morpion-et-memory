// Variables globales
let array_9cells = document.getElementsByTagName("td");
var player = "player1";

//éviter pb ds conditions pour la fonction end que d'associer différentes lettres 
let array_fortheWin = ["z","e","c","f","a","s","t","j","b"];
// console.log(array_9cells)


function turn(){
    //console.log("salut");
    if (player == "player1"){
        document.getElementById("player1").style.backgroundColor="red";
        document.getElementById("turn_player1").innerHTML = "PLAYER1: Ton tour de jouer !"; 
        document.getElementById("player2").style.backgroundColor="white";
        document.getElementById("turn_player2").innerHTML = "PLAYER 2"; 

    }
    else{
        document.getElementById("player2").style.backgroundColor="red";
        document.getElementById("turn_player2").innerHTML = "PLAYER2: Ton tour de jouer !"; 
        document.getElementById("player1").style.backgroundColor="white";
        document.getElementById("turn_player1").innerHTML = "PLAYER 1"; 
    }
}

// src = path 

function getImgName(index){
    //Obtention du nom de l'image
    let img_path = array_9cells[index].querySelector('img').getAttribute("src");
    //console.log(img_path);
    img_name = img_path.substring(img_path.lastIndexOf('/')+1);    
    img_name = img_name.split('.').slice(0, -1).join('.');
    return img_name;
}

function checkCorrectMove(index){
    img_name = getImgName(index);
    if (img_name != "fond0"){
        alert("La case est déjà pleine, vous ne pouvez pas cliquez dessus.");
        return false;
    }
    return true;
}

function set_on_click() {
    //parse the array until the cell clicked 
    for (let i = 0; i < array_9cells.length; i++) { 
        array_9cells[i].onclick = function(){handle_click_cell(i);};
    }
}


function handle_click_cell(index){
    const image = array_9cells[index].querySelector('img');
    if (checkCorrectMove(index) == true){
        // display image
        if (player == "player1"){
            image.setAttribute("src", "images/cartes-morpion/croix.png");
            array_fortheWin[index] = "X";
            end();
            draw();
            //affectation après end pour que joueur qui vient de jouer ait le msg de victoire en cas de victoire
            player = "player2";
            //console.log(array_fortheWin[index])
        }
        else{
            image.setAttribute("src", "images/cartes-morpion/rond.png");
            array_fortheWin[index] = "O";
            end();
            draw();
            player = "player1";
            //console.log(array_fortheWin[index])
        }
       
    }
}

function draw(){
    for (let i=0; i<array_fortheWin.length; i++){
        if ((array_fortheWin[i] == "X") || (array_fortheWin[i] == "O")){
            if (i == array_fortheWin.length - 1){
                if (end() != true){
                    alert("DRAW: Aucun vainqueur, aucun perdant");
                }
            }
        }
        else{
            break;
        }
    }
}


function end(){
        // if ((array_fortheWin[0] == array_fortheWin[1]) && (array_fortheWin[1] == array_fortheWin[2] == "X")){
    //     alert(player + " est le vainqueur !"); NE MARCHE PAS 
    // } 
    //  HORIZONTAL CELLS
    if (array_fortheWin[0] == array_fortheWin[1] &&  array_fortheWin[1] == array_fortheWin[2]){
        alert(player + " est le vainqueur !");
        return true; //draw function 
    }
    else if (array_fortheWin[3] == array_fortheWin[4] &&  array_fortheWin[4] == array_fortheWin[5]){
        alert(player + " est le vainqueur !");
        return true;
    }
    else if (array_fortheWin[6] == array_fortheWin[7] &&  array_fortheWin[7] == array_fortheWin[8]){
        alert(player + " est le vainqueur !");
        return true;
    }
    // //  VERTICAL CELLS
    else if (array_fortheWin[0] == array_fortheWin[3] &&  array_fortheWin[3] == array_fortheWin[6]){
        alert(player + " est le vainqueur !");
        return true;
    }
    else if (array_fortheWin[1] == array_fortheWin[4] &&  array_fortheWin[4] == array_fortheWin[7]){
        alert(player + " est le vainqueur !");
    }
    else if (array_fortheWin[2] == array_fortheWin[5] &&  array_fortheWin[5] == array_fortheWin[8]){
        alert(player + " est le vainqueur !");
        return true;
    }
    // //DIAGONAL CELLS
    else if (array_fortheWin[0] == array_fortheWin[4] &&  array_fortheWin[4] == array_fortheWin[8]){
        alert(player + " est le vainqueur !");
        return true;
    }
    else if (array_fortheWin[2] == array_fortheWin[4] &&  array_fortheWin[4] == array_fortheWin[6]){
        alert(player + " est le vainqueur !");
        return true;
    }
}


function reload_game(){
    // Recharge la page actuelle
    document.location.reload();
}


// Déterminer le joueur en détectant le clic sur le tableau 
const elt = document.getElementById('array');    // On récupère l'élément sur lequel on veut détecter le clic
// On écoute l'événement click
elt.addEventListener('click', turn);

//LOAD FUNCTION
set_on_click();