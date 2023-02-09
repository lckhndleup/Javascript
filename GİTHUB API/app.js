//ana js dosyamız

//elementleri seçme

const githubForm = document.getElementById("github-form"); //formu seçtik
const nameInput = document.getElementById("githubname"); //input u seçtik
const clearLastUsers = document.getElementById("clear-last-users"); // en alttaki buton

const lastUsers = document.getElementById("last-users");//ul yi seçeceğiz.son aramalar kısmını buraya eklicez.


//Github class ından bir obje oluşturcaz.
const github = new Github();

//UI classından obje oluşturcaz.

const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData); //forma submit oldugunda 

    clearLastUsers.addEventListener("click",clearAllSearch);

    document.addEventListener("DOMContentLoaded",getAllSearched) //son aramaları sayfa yenilendikçe storage dan alıp sayfaya yazıcaz.sayfa yüklendiğinde tüm bilgiler gelecek.
}


function getData(event){

    //input taki username i alarak fonksiyonu çalıştırmak amacımız.
    let username = nameInput.value.trim(); //kullanıcı boşluk bırakırsa onu trim lemesi için trim yazdık.

    if(username === ""){ //kullanıcı herhangi bir şey girmediyse
        alert("Lütfen geçerli bir kullanıcı adı giriniz...")
    }
    else{ //1) burada ilk olarak şu kontrolü yapmamız gereiyor. olmayan bir kullanıcı ismi  girdiğinde bize async getGithubData(username) dan dönen user ve repo dan , user un içindeki message özelliği "Not Found" şeklinde gelir. bu yüzden if else ile bunun kontrolünü yapmamız lazım. 
        
        github.getGithubData(username)//ancak fonksiyonumuz async olarak yazıldıgı için ve bize bir obje döneceği için bizim bunu promise ile yakalamamız gerekiyor.
        //.then(response => console.log(response)) //bize döneceği promise i yakaladık. getGithubData dan bir tane json objesi dönmüştük.user anahtar kelimesine karşılık gelen >> user in bilgilerini taşıyan json() objesi . repo anahtar kelimesine karşılık gelen >> repo bilgilerini taşıyan json array i. 
        .then(response => {
            if(response.user.message === "Not Found"){
                //hata mesajı
                ui.showError("lütfen geçerli bir kullanıcı giriniz...");
            }
            else{
                //arayüze arananları ekleme
                ui.addSearchedToUI(username); //bunu Storage.addSearchedUsersToStorage(username); dan sonra yazarsak localstorage de oldugu için eklemeyecek. onun için burda yazmamız gerekiyor.(önce çagırmamız gerekiyor)
                
                //Storage a ekleme
                Storage.addSearchedUsersToStorage(username);
                

                
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo); //repo bilgileri array şeklinde geleceği için her bir array in üzerinde forEach ile gezinicez.ve ekleyeceğiz.
            }
        }) //sadece user bilgilerine ulaşmak istersek response.user i kullancaz.
        .catch(err => console.log(err));

    }

    //her arama yapıldıgında input alanının temizlenmesi için; 
    ui.clearInput();

    event.preventDefault(); //sayfa yüklendiğinde tekrar yenilenmesini önlemek için.
};



function clearAllSearch(){
    //tüm arananları temizle.

    if(confirm("Emin misiniz??")){
        //silme
        Storage.clearAllSearchedUsersFromStorage();//storage dan temizleme
        ui.clearAllSearchedFromUI();
    }


};



function getAllSearched(){
    //arananları storagedan al ve ui a ekle.

    
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item">${user}</li`;
    });

    lastUsers.innerHTML = result;
}