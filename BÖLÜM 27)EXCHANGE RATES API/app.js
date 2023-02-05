// Elementleri seçme

const amountElement = document.querySelector("#amount");
const firstSelect = document.querySelector("#firstCurrency");
const secondSelect = document.querySelector("#secondCurrency");


//currency objesi oluşturma:
const currency = new Currency("USD","TRY"); 

//ui objesi oluşturma:

const ui = new UI(firstSelect,secondSelect);

eventListeners();

function eventListeners(){
    amountElement.addEventListener("input",exchangeCurrency); //buton koymadık , miktar değiştikçe sürekli usd-try değeri değişecek. input değiştikçe "input" diye bir event oluşacak.
    firstSelect.onchange = function(){  //addeventlisteners kullanamıyoruz çünkü bazı browserlarda sorun çıkartıyor.onun yerine onchange kullandık. bu onchange ,değer değiştikçe tetikleniyor.
        //ilk para biriminin değeri değiştikçe yeni değeri göndercek.
        currency.changeFirstCurrency(firstSelect.options[firstSelect.selectedIndex].textContent); //options lar bize array tarzı bir obje döndürecek.objenin içinden de selectedIndex değeriyle değeri alacaz.

        //--------arayüz işlemi--------//
        //firstSelect.onchange eventi oluştugunda arayüzde para değerlerini dğeiştircez.
        ui.changeFirst();

        //-----------------------------//


    };
    secondSelect.onchange = function(){ //onchange ler ne işe yarayacaklar >>  para birimleri 1 ve 2 değiştikçe aşağıdaki gözüken sonuç kısmındaki 1 nci ve 2 nci değerler bu yeni olan değerlere eşit olacak.
        currency.changeSecondCurrency(secondSelect.options[secondSelect.selectedIndex].textContent);

        //--------arayüz işlemi--------//
        //secondSelect.onchange eventi oluştugunda arayüzde para değerlerini dğeiştircez.
        ui.changeSecond();

        //-----------------------------//
    };
}

function exchangeCurrency(){
    currency.changeAmount(amountElement.value); //her event oluştuğunda miktarı güncellememiz gerekiyor.

    currency.exchange() //exchange napıyor>>>>fetch fonksiyonu kullanarak json objemizi alıyor ve datayı dönüyor.
    .then(result => ui.displayResult(result))  // exchange den dönen promise in response unu burda yakalıyoruz.
    .catch(err => console.log(err));      // exchange den dönen promise in reject ini burda yakalıyoruz.
}