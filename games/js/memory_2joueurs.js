//Global var
var i = 0;
var player = "player1";
//check presence + win?
let img_presence = [1,1,2,2,3,3,4,4,5,5,6,6];
let randomNumber = 0;
let numberClick = 0;
let clickNumberP1 = 0;
let clickNumberP2 = 0;
//remplir ce tableau de manière aléatoire pour faire correspondre position image  
// <=> correspondre cell clicked avec indice du tableau random 
let random_array = [];

//tableau de comparaison
let get_cell_number = [];
let compare_imgName = [];
let compare_img_nb = [];
//utile pour faire correspondre clic aux cellules
let array_12cells = document.getElementsByTagName("td");

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


function random_filling_array(){
    let occ = 0;
    while (random_array.length != 12){
        randomNumber = Math.floor(Math.random() * 6) + 1;  //random nb 1-6
        random_array.push(randomNumber);
        //check occurence à travers la boucle 
        for (let k = 0; k < random_array.length; k++){
            if (random_array[k] == randomNumber)
                occ += 1;
        }
        if (occ > 2)
            random_array.pop(); //supprime le dernier elt ajouté 
        occ = 0;
    }
}




function returnCard(index){
    if (array_12cells[index].style.backgroundColor == "red"){
        alert("image déjà trouvée");
        numberClick -= 1;
        if (player == "player1")
            clickNumberP1 -= 1;
        else
            clickNumberP2 -= 1;
    }
    else{
        const image = array_12cells[index].querySelector('img');
         //l'index = case cliqué et correspond à la index-ème valeur de random_array
        switch(random_array[index]){
            case 1:
                image.setAttribute("src", "images/cartes-memory/fond1.png");
                //information de comparaison pour fonctions 
                getInformation(index);
                break;
            case 2:
                image.setAttribute("src", "images/cartes-memory/fond2.png");
                getInformation(index);
                break;
            case 3:
                image.setAttribute("src", "images/cartes-memory/fond3.png");
                getInformation(index);
                break;
            case 4:
                image.setAttribute("src", "images/cartes-memory/fond4.png");
                getInformation(index);
                break;
            case 5:
                image.setAttribute("src", "images/cartes-memory/fond5.png");
                getInformation(index);
                break;
            case 6:
                image.setAttribute("src", "images/cartes-memory/fond6.png");
                getInformation(index);
                break;
        }
    }
}


function getInformation(index){
    get_cell_number.push(index);
    compare_img_nb.push(random_array[index]);
    console.log(compare_img_nb)
}

function resetVar(){
    numberClick = 0;
    get_cell_number = [];
    compare_img_nb = [];
    if (player == "player1")
        player = "player2";
    else
        player = "player1";
}


function hideCard(){
    let img1 = array_12cells[get_cell_number[0]].querySelector('img');
    let img2 = array_12cells[get_cell_number[1]].querySelector('img');
    //hide 1ere  et 2eme images retournées
    setTimeout(() => {
        img1.setAttribute("src", "images/cartes-memory/fond0.png");
        img2.setAttribute("src", "images/cartes-memory/fond0.png");
    }, 300); 
}

function deleteCard(){
    while (i < img_presence.length) {
        if (img_presence[i] == compare_img_nb[0])
            img_presence.splice(i, 1);
        else
            ++i; //increments the variable, returning the new value.
    }
    array_12cells[get_cell_number[0]].style.backgroundColor = "red";
    array_12cells[get_cell_number[1]].style.backgroundColor = "red";
    if (player == "player1")
        clickNumberP1 += 1;
    else
        clickNumberP2 += 1; 
    i = 0 
}


function end(){
    if (img_presence.length == 0){
        if (clickNumberP1 < clickNumberP2){
            player = "player2";
            alert("bravo, fin de partie \n nombre de coups joué pour le joueur 1: " +clickNumberP1 +"\n nombre de coups joué pour le joueur 2: " +clickNumberP2 +"\n vainqueur: " +player);
        }
        else if (clickNumberP1 == clickNumberP2)
            alert("bravo, fin de partie \n nombre de coups joué pour le joueur 1: " +clickNumberP1 +"\n nombre de coups joué pour le joueur 2: " +clickNumberP2 +"\n draw");
        else{
            player = "player1";
            alert("bravo, fin de partie \n nombre de coups joué pour le joueur 1: " +clickNumberP1 +"\n nombre de coups joué pour le joueur 2: " +clickNumberP2 +"\n vainqueur: " +player);
        }
    }
}

function reload_game(){
    // Recharge la page actuelle
    document.location.reload();
}

function checkNumberOfClick(){
    if (numberClick == 2) {
        if (compare_img_nb[0] == compare_img_nb[1] && array_12cells[get_cell_number[0]] != array_12cells[get_cell_number[1]])
            deleteCard();
        else
            hideCard();
        //reset pour les autres images
        resetVar();
    }
}

function set_on_click() {
    random_filling_array();
    //parse the array until the cell clicked is detected
    for (let i = 0; i < array_12cells.length; i++)
        array_12cells[i].onclick = function(){handle_click_cell(i);};
}

function handle_click_cell(index){
    numberClick += 1;
    returnCard(index);
    //définir 2 clic puis comparer images
    checkNumberOfClick()
    end();
}

// Déterminer le joueur en détectant le clic sur le tableau 
const elt = document.getElementById('array');    // On récupère l'élément sur lequel on veut détecter le clic
// On écoute l'événement click
elt.addEventListener('click', turn);
//LOAD FUNCTION
set_on_click();