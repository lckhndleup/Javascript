//es6 ile yazıcaz. promise yapılarını kuallanarak veri alışverişi yapmaya çalışscaz. diğer projede async ve awaitleri kullancaz.
class Currency{
    constructor(firstCurrency,secondCurrency){ //USD-TRY bilgisini buraya getiricez.app.js den buna firstCurrency,secondCurrency diye iki değer göndercez
        this.firstCurrency = firstCurrency;
        this.secondCurrency = secondCurrency;
        this.url = "https://api.exchangerate.host/latest?base=";

        this.amount = null ; // amount bilgisi her event oluştugu zaman sürekli değişecek , ilk değerini null yapıcaz.

    }
    //veri alışverişi için kullancagımız >> exchange metodunu yazalım
    exchange(){
        //------PROMİSE DÖNDÜRME---------------
        //en son yapılan işlem şu resolve ve rejecti kullanıyoruz fakat promise döndürmemiz gerekiyor.bunun için return le promise imizi  döndürmemiz gerekiyor.
        return new Promise((resolve,reject)=>{ //fetch i bunun içine yerleştiriyoruz.
            //fetch api yi kullancaz. promise kullancaz.
            fetch(this.url + this.firstCurrency)//bu yapı bize verimizi Response Object olarak vericek.(Response Object döner)
            .then(response => response.json())//bize bir response gelecek , biz bu response un içindeki json metodunu u alarak dönücez.bu da bize bir promise döner.(Json u döner)
            .then(data => {
            const parity = data["rates"][this.secondCurrency]; //data >>bir json objesi. data.rates >>de bir json objesi. onun içinden birinci değere kaşılık ikinci değeri bulucaz.
            const deger2 = Number(this.amount); //string olarak gelcek sayıya çevirmemiz gerkeiyor.

            let total = parity* deger2 ;

            //console.log(total);

            //console.log(total) değerini biz burda değil,BİZ DEĞERİMİZİ APP.JS DE CURRENCY.EXCHANGE İÇİNDE GÖRMEK İSİTİYORUZ.BUNUN İÇİN BİZİM BİR PROMİSE DÖNDÜRMEMİZ GEREKİYOR.

            resolve(total); //
            
        }
            ) //datamız gelmiş oluyor burda
            .catch(err => reject(err)); //hata olması durumunda reject ile app.js ye döncez.

            })
        //---------------------------------------- bu işlem yani exhange fonksiyonu >> artık  bir promise dönüüyor.biz bu promise i app.js de yakalıcaz.(then ile) hatayıda catch ile yakalıcaz.-------------------
        

    }

    //şimdi yapmamız gereken şey şu : 
    //miktarı değiştirdiğimiz zaman : yukardaki amount u değştirmemiz gerkeiyor.
    //birinci para birimini değiştirdiğimizde : firstSelect eventi onchange oldugunda , firstCurrency i değiştirmemiz lazım
    //ikinci para birimini değiştirdiğimizde : secondSelect eventi onchange oldugunda , secondCurrency i değiştirmemiz lazım.
    //bunun için 3 tane fonskiyon yazıcaz.
    changeAmount(yenimiktar){
        this.amount = yenimiktar; //yeni girilen değer artık bu this.amount a eşit olacak.
    }
    changeFirstCurrency(yenibirinciparabirimi){
        this.firstCurrency = yenibirinciparabirimi;
    }
    changeSecondCurrency(yeniikinciparabirimi){
        this.secondCurrency = yeniikinciparabirimi;
    }

}