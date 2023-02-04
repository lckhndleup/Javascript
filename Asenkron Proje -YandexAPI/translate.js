//Translate consrtuctor

function Translate(word,language){//çevirmek istediğimiz kelimeyi ve language i göndercez.
    //4 tane özellik olacak.
    this.apikey ="trnsl.1.1.20180930T080756Z.753c49142579b043.b2798189b8760e7b357c9d23a8736ef0a54be481";
    this.word = word ;

    this.language = language;

    //xhr objesi

    this.xhr = new XMLHttpRequest();
}


//callback sayesinde bunu app.js de yazdıgımız translateWord() functionda yakalamaya çalışcaz.
//callback ne işe yarayacak ?? >> callback ile app.js ye döndürmeye çalışıyoruz.
//callback gelen text i içine argüman olarak alacak.işlemimiz gerçekleştikten sonra callback i text ile çagırcaz. yani asenkron işlemi senkron hale çevirdik.
Translate.prototype.translateWord = function(callback){
    //AJAX işlemleri
    //prototype işlemlerinde arrow function larla yazamayız (this i kullancaksak). arrow function otomatik olarak bind(this) atar , ve burada kullanacagımız this window u gösterir.

    const endpoint = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.apikey}&text=${this.word}&lang=${this.language}`; //dinamik olarak değerleri almak için template litareal şeklinde yazdık.

    this.xhr.open("GET",endpoint); //true yazmadık default olarak geliyor zaten . asenkron olarak bu işlemlerin yapılacagını söyler.

    //requestten response dönerse bunu onload ile yakalıyoruz.
    this.xhr.onload = ()=>{  //ajax işlemlerinde arrow function kullanırsak this kelimesi objemizi gösterir.
        if(this.xhr.status === 200 ){
            const json = JSON.parse(this.xhr.responseText);

            const text = json.text[0];

            console.log(text);

            callback(null,text); //hata oluşmazsa null olacak hata yeri

            //console.log(JSON.parse(this.xhr.responseText).text[0]); //json.parse ile json objesine çevirdik. ve yazılan kelimeyi de text özeliiği ile alrıız. text in [0] 0 ncı indeksi kelimeyi verir.
        }
        else{ //hata oluşmuştur
            callback("bir hata oluştu",null); //hata oluşırsa response yeri null olacak ve hata mesajı fırlatacak.
        }
    }   


    this.xhr.send();
}

Translate.prototype.changeParameters = function(newWord,newLanguage){
    this.word = newWord;
    this.language = newLanguage;

}
