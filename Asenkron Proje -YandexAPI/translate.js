//Translate constructor

function Translate(word,language){
    
    this.apikey ="ENTER YOUR YANDEX TRANSLATE API KEY";
    this.word = word ;
    this.language = language;
    this.xhr = new XMLHttpRequest();
}


Translate.prototype.translateWord = function(callback){
    //AJAX işlemleri
    const endpoint = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.apikey}&text=${this.word}&lang=${this.language}`; //dinamik olarak değerleri almak için template litareal şeklinde yazdık.

    this.xhr.open("GET",endpoint); 
    this.xhr.onload = ()=>{  
        if(this.xhr.status === 200 ){
            const json = JSON.parse(this.xhr.responseText);
            const text = json.text[0];
            console.log(text);
            callback(null,text); 
        }
        else{ 
            callback("bir hata oluştu",null); 
        }
    }   

    this.xhr.send();
}

Translate.prototype.changeParameters = function(newWord,newLanguage){
    this.word = newWord;
    this.language = newLanguage;

}
