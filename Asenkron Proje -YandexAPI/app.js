//prototype , ajax ve callback kullanarak işlemri yapıcaz.

eventListeners();

function eventListeners(){

//butona bastıgımızda kelimemizi çevirmek istiyoruz.forma submit yapıldıgında kelimeyi çevirmek isitiyoruz.
    document.getElementById("translate-form").addEventListener("submit",translateWord);
    //change eventi 
    document.getElementById("language").onchange = function(){
        //select listemizdeki değerler değiştikçe eventimiz tetiklenecek.
        console.log("event ")
        ui.changeUI();
    }

}

//Translate constructordan bir tane obje üretelim.
const translate = new Translate(document.getElementById("word").value,document.getElementById
("language").value); //word ve language parametresi alır.bunların anlık değerlerini alalım.

//ui objesi oluşturma

const ui = new UI();

function translateWord(event){

    translate.changeParameters(document.getElementById("word").value,document.getElementById("language").value);

    translate.translateWord(function(err,response){
        //translateWord functionı bir tane callback alıyor.içine bir callback yazıcaz.
        //bu fonksiyon bize 2 tane değer döner eğer hata yoksa error null olacak. ve hata olmaazsa çevrilen kelime direk olarak gelecek.ancak hata varsa hata oluştu şeklinde gelecek ve response null olacak.
        if(err){ 
            console.log(err);
            //hata olmazsa response u yazdıralım.
        
        }
        else{
            //hata olursa 
            ui.displayTranslate(response);
        }

    }); 

    event.preventDefault();

    //sayfa yenilenmesini önlemek için event.preventDefault()
}

