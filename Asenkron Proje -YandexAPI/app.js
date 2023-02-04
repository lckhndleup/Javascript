//prototype , ajax ve callback .

eventListeners();

function eventListeners(){

    document.getElementById("translate-form").addEventListener("submit",translateWord);
    //change event 
    document.getElementById("language").onchange = function(){
        console.log("event ")
        ui.changeUI();
    }

}


const translate = new Translate(document.getElementById("word").value,document.getElementById
("language").value); 
const ui = new UI();

function translateWord(event){

    translate.changeParameters(document.getElementById("word").value,document.getElementById("language").value);

    translate.translateWord(function(err,response){
        if(err){ 
            //error
            console.log(err);
            
        
        }
        else{
            //not error
            ui.displayTranslate(response);
        }

    }); 

    event.preventDefault();
}

