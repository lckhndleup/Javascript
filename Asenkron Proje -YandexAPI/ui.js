function UI(){
    this.outputImage = document.getElementById("outputImage");
    this.outputLanguage = document.getElementById("outputLanguage");
    this.outputWord = document.getElementById("ouputWord");

    this.languageList = document.getElementById("language");

}

UI.prototype.changeUI = function(){//changuUI fonk. onchange oldugunda çalışacak bir fonskşyon olacak.
    //Arayüz Değiştir

    this.outputImage.src = `ìmages/${this.languageList.value}.png`;
    this.outputImage.innerHTML = this.languageList.options[this.languageList.selectedIndex].textContent

} 

UI.prototype.displayTranslate = function(word){
    this.outputWord.textContent = word;
}