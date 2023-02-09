class Storage{
    
    //Storage dan obje üretmicez. 2 tane fonskyion yazıcaz bunlar statik olacak.class dan bunlara erişebilicez.

    static getSearchedUsersFromStorage(){
        //tüm kullanacıları al
        
        //array oluşturma
        let users;

        if(localStorage.getItem("searched") === null){
            users =[];
        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));

        }
        return users;

    }

    static addSearchedUsersToStorage(username){
        //kullanıcı ekleyecek fakat o kullanıcı varsa eklemeyecek ve oyle bir kullanıcı varmı bakacak.

        let users = this.getSearchedUsersFromStorage(); //this kullanmamızın amacı şu >> Storage şeklinde de kullanabiliridik.this bu Storage class ımızı gösteriyor zaten . isterse Storage isterse de this kullanabiliriz.

        //IndexOf :eger bu username indexof ile sorgularsak ve -1 sonucu gelirse bu username o users arrayinde yok demektir.

        if(users.indexOf(username) === -1){ //yok demektir.
            users.push(username);
        } 
        //else durumunu eklememize gerek yok . yani oyle bir username varsa birşey yapamayacak.
        localStorage.setItem("searched",JSON.stringify(users))


    }

    static clearAllSearchedUsersFromStorage(){
        //tüm kullancııları sil

        localStorage.removeItem("searched");
    }

    
}