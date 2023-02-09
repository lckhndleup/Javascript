//github da get request işlemlerini gerçekleştiricez. aldıgımız json u promise yapısı şeklinde döndürmeye çalışcaz.

//burdan async ile değerleri dönmemiz gerekiyor.

class Github{
    constructor(){
        this.url = "https://api.github.com/users/";
    }

    //async ve await kullancaz.

    async getGithubData(username){
        //app.js de nameInput tan değer username , parametrese olarak gelecek.bu async bir promise olarak dönecek.
        //username e göre get request yapacaz.(fetch ile)

        //url ye gödnerilen user bilgisini eklicez.ve json u alacaz.

        //1) username e get request yaparak username bilgilerini alalım
        const responseUser = await fetch(this.url + username) //await,fetch den dönecek olan promise i bekler. bu yapı bize bir Response Object döner.
        
        //2) şimdide repos a get request yapıp repos bilgilerini array olarak alalım.
        const responseRepo = await fetch(this.url + username + "/repos"); //Response Object döner.


        //3) responseUser >>> Response Object dönecekti . onun içinden json() objectimizi alacaz.awaitle beklicez.

        const userData = await responseUser.json(); //bu bize bir Promise döner.bu Promise i awaitle bekleyecez.

        //4) responseRepo >>> Response Object dönecekti. onun içinden json() objectimizi alıcaz. awaitle beklicez.

        const repoData = await responseRepo.json(); // bu bize bir Promise dönecek.onu da awaitle beklicez.

        //5) verilerimizi return ile dönecez.
        return {
            user : userData,  //userData yı user olarak dönecez.
            repo : repoData   //repoData yı repo olarak döncez.
        }


    }
}