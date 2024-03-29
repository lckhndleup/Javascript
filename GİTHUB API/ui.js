class UI{
    constructor(){
        this.profileDiv = document.getElementById("profile"); //div e ekleme yapacagımız için seçmemiz gerekiyor.buna ekleyecez.

        this.repoDiv = document.getElementById("repos"); //repoyu gösterecegimiz için seçiyoruz.

        this.lastUsers = document.getElementById("last-users") //ul yi seçiyoruz.

        this.inputField = document.getElementById("githubname");  //input alanımızı seçiyoruz. arama yaptıktan sonra temizlicez.
        
        this.cardBody = document.querySelector(".card-body");
    }

    clearInput(){ //her arama yaptıktan sonra ınput alanının içini temizlicez.
        this.inputField.value = "";
    }

    showUserInfo(user){
        //https://api.github.com/users/lckhndleup adresinden bakarak yaptım.
        this.profileDiv.innerHTML = `

        
        <div class="card card-body mb-3">
            <div class="row">
                <div class="col-md-4">
                <a href="${user.html_url}" target = "_blank">
                    <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
                    <hr>
                    <div id="fullName"><strong>${user.name}</strong></div>
                    <hr>
                    <div id="bio">${user.bio}</div>
                </div>
                <div class="col-md-8">
                    <button class="btn btn-secondary">
                            Takipçi  <span class="badge badge-light">${user.followers}</span>
                    </button>
                    <button class="btn btn-info">
                            Takip Edilen  <span class="badge badge-light">${user.following}</span>
                        </button>
                    <button class="btn btn-danger">
                        Repolar  <span class="badge badge-light">${user.public_repos}</span>
                    </button>
                    <hr>
                    <li class="list-group">
                        <li class="list-group-item borderzero">
                            <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                            
                        </li>
                        <li class="list-group-item borderzero">
                            <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>
                            
                        </li>
                        <li class="list-group-item borderzero">
                            <img src="images/mail.png" width="30px"> <span id="company">${user.email}</span>
                            
                    </li>
                        
                </div>
                        
                    
            </div>
        </div>
        
        
        
        
        `
    }
    showError(message){

        const div = document.createElement("div");

        div.className="alert alert-danger";

        div.textContent = message;

        this.cardBody.appendChild(div);

        setTimeout(() => {
            div.remove();
        },2000);
        
    }

    showRepoInfo(repos){ //bir array parametresi alacak.
        this.repoDiv.innerHTML = "" ; //daha önceki sorgulanan kullanıcının repolarını ilk olarak temizleyeceğiz.

        //daha sonrasında bize gönderilen array in içinde forEach ile gezinebiliriz.

        repos.forEach(repo => {
            this.repoDiv.innerHTML += `
            
            <div class="mb-2 card-body">
                <div class="row">
                    <div class="col-md-2">
                    <span></span> 
                    <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-secondary">
                            Language  <span class="badge badge-light" id="language">${repo.language}</span>
                        </button>

                        <button class="btn btn-info">
                            Açıklama  <span class="badge badge-light" id ="description">${repo.description}</span>
                        </button>
                        <button class="btn btn-info">
                            Stars  <span class="badge badge-light" id ="stars">${repo.stargazers_count}</span>
                        </button>
                        <button class="btn btn-info">
                            Forklar  <span class="badge badge-light" id ="Forks">${repo.forks_count}</span>
                        </button>

                
                    </div>
                </div>

            </div> `;  
        });
    }
    addSearchedToUI(username){
        let users = Storage.getSearchedUsersFromStorage();
        
        //sorgulanan username storage da varsa bunu ekelemycez.

        if(users.indexOf(username) === -1){
            // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
            const li = document.createElement("li");

            li.className ="list-group-item";
            li.textContent = username;

            this.lastUsers.appendChild(li);
        }
        
    }

    clearAllSearchedFromUI(){
        while(this.lastUsers.firstElementChild !== "null"){
            this.lastUsers.removeChild(this.lastUsers.firstElementChild);
        }
    }

}