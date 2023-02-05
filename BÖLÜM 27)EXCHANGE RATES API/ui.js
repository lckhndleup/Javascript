class UI{
    constructor(firstSelect,secondSelect){
        this.firstSelect = firstSelect;
        this.secondSelect = secondSelect;

        //en altta bulunan para değerlerini seçelim

        this.outputFirst = document.getElementById("outputFirst");
        this.outputSecond = document.getElementById("outputSecond");
        this.outputResult = document.getElementById("outputResult");
        
    
    }

     //3 tane fonskiyonumuz olacak.

    //1.fonksiyon >> birinci para birimini(en alttaki) değiştirmek olcak. bu ne zaman çalışacak? >> firstSelect.onchange eventi tetiklendiği zaman oluşacak.
    changeFirst(){
        this.outputFirst.textContent = this.firstSelect.options[this.firstSelect.selectedIndex].textContent;

    }

    //2.fonksiyon >> ikincii para birimini(en alttaki) değiştirmek olcak. bu ne zaman çalışacak? >> secondSelect.onchange eventi tetiklendiği zaman oluşacak.
    changeSecond(){
        this.outputSecond.textContent = this.secondSelect.options[this.secondSelect.selectedIndex].textContent;

    }

    //3.fonksiyon >> sonucu yazdırcaz.
    displayResult(sonuc){
        //bize gönderilen result u dinamik bir şekilde outputResult a eklicez.

        this.outputResult.value = sonuc;  //bir input oldugu için .value dedik
    }
}