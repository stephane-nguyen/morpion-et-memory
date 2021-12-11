// Variables globales
let array_9cells = document.getElementsByTagName("td");
var form = "cross";
let randomNumber;
let image;
//éviter pb ds conditions pour la fonction end que d'associer différentes lettres 
let array_fortheWin = ["z","e","c","f","a","s","t","j","b"];
let k = 0;

// src = path 

function getImgName(index){
    //Obtention du nom de l'image
    let img_path = array_9cells[index].querySelector('img').getAttribute("src");
    img_name = img_path.substring(img_path.lastIndexOf('/')+1);    
    img_name = img_name.split('.').slice(0, -1).join('.');
    return img_name;
}

function checkCorrectMove(index){
    img_name = getImgName(index);
    if (img_name != "fond0"){
        if (form == "cross"){
            alert("La case est déjà pleine, vous ne pouvez pas cliquez dessus.");
            return false;
        }
        else{
            return false;
        }
    }
    return true;
}


function set_on_click() {
    //parse the array until the cell clicked 
    for (let i = 0; i < array_9cells.length; i++){
        array_9cells[i].onclick = function(){handle_click_cell(i);};
    }
       
}


function handle_click_cell(index){
    image = array_9cells[index].querySelector('img');
    if (checkCorrectMove(index) == true){
        // display image
        image.setAttribute("src", "images/cartes-morpion/croix.png");
        array_fortheWin[index] = "X";
        checkWinDraw();
        //affectation après end pour que joueur qui vient de jouer ait le msg de victoire en cas de victoire
        form = "circle"; //chgt de forme 

        //AI 
        console.log("yoooo");

        randomNumber = Math.floor(Math.random() * 9);  //random cell 0-8
        while (checkCorrectMove(randomNumber) != true){
            randomNumber = Math.floor(Math.random() * 9);  //random cell 0-8
        }
        image = array_9cells[randomNumber].querySelector('img');
        image.setAttribute("src", "images/cartes-morpion/rond.png");
        array_fortheWin[randomNumber] = "O";
        checkWinDraw();
        form = "cross";
    }
}

function checkWinDraw(){
    if (k == 0){
        if (end() == true ){
            alert(form + " est le vainqueur !");
            k = 1;
            return;
        }
        else
            draw();
    }
}

function draw(){
    for (let i=0; i<array_fortheWin.length; i++){
        if ((array_fortheWin[i] == "X") || (array_fortheWin[i] == "O")){
            if (i == array_fortheWin.length - 1){
                if (end() == false){
                    alert("DRAW: Aucun vainqueur, aucun perdant");
                    return;
                }
            }
        }
        else{
            break;
        }
    }
}

function end(){
    //  HORIZONTAL CELLS
    if (array_fortheWin[0] == array_fortheWin[1] &&  array_fortheWin[1] == array_fortheWin[2]){
        return true;

    }
    else if (array_fortheWin[3] == array_fortheWin[4] &&  array_fortheWin[4] == array_fortheWin[5]){
        return true;

    }
    else if (array_fortheWin[6] == array_fortheWin[7] &&  array_fortheWin[7] == array_fortheWin[8]){
        return true;
        
    }
    // //  VERTICAL CELLS
    else if (array_fortheWin[0] == array_fortheWin[3] &&  array_fortheWin[3] == array_fortheWin[6]){
        return true;
        
    }
    else if (array_fortheWin[1] == array_fortheWin[4] &&  array_fortheWin[4] == array_fortheWin[7]){
        return true;
        
    }
    else if (array_fortheWin[2] == array_fortheWin[5] &&  array_fortheWin[5] == array_fortheWin[8]){
        return true;
        
    }
    // //DIAGONAL CELLS
    else if (array_fortheWin[0] == array_fortheWin[4] &&  array_fortheWin[4] == array_fortheWin[8]){
        return true;
        
    }
    else if (array_fortheWin[2] == array_fortheWin[4] &&  array_fortheWin[4] == array_fortheWin[6]){
        return true;
        
    }
    else{
        return false;
    }
}


function reload_game(){
    // Recharge la page actuelle
    document.location.reload();
}


//LOAD FUNCTION
set_on_click();
