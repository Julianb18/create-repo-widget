import "../styles/main.scss";

import "regenerator-runtime/runtime";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";

console.log(process.env.API_KEY);

class NewRepo {
  constructor() {
    this.formCreateRepo = document.querySelector(`.formCreateRepo`);
    this.formDeleteRepo = document.querySelector(`.formDeleteRepo`);
    this.repoUl = document.querySelector(`.repoList`);
    this.attachEvent();
    this.userUrl = "https://api.github.com/user";
    this.url = "https://api.github.com/user/repos?sort=created&direction=desc";
    this.deleteUrlBase = "https://api.github.com/repos/Julianb18";
    this.getRepos();
    // this.deleteRepo();
    this.deleteRepoEvent();
  }

  attachEvent() {
    this.formCreateRepo.addEventListener(`submit`, e => {
      e.preventDefault();

      let repoName = document.querySelector(`#repoName`);
      let repoDescription = document.querySelector(`#description`);
      let repoPrivacy = this.formCreateRepo.elements.repoPrivacy;
      let createReadme = document.querySelector(`#createReadme`);

      this.submitData({
        name: repoName.value,
        description: repoDescription.value,
        private: repoPrivacy.value === "private",
        auto_init: createReadme.checked
      });
    });
  }

  deleteRepoEvent() {
    this.formDeleteRepo.addEventListener(`submit`, e => {
      e.preventDefault();

      let repoNameDel = document.querySelector(`#repoNameDel`);
      let deleteUrl = `${this.deleteUrlBase}/${repoNameDel.value}`;

      fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `token ${process.env.API_KEY}`
        },
        mode: "cors"
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    });
  }

  submitData(data) {
    fetch(this.url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `token ${process.env.API_KEY}`,
        "content-type": "application/json",
        accept: "application/json",
        "Access-Control-Request-Method": "POST"
      },
      mode: "cors"
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
        this.getRepos();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  getRepos() {
    fetch(this.url, {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.API_KEY}`,
        "content-type": "application/json",
        accept: "application/json",
        "Access-Control-Request-Method": "GET"
      },
      mode: "cors"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let repoHtml = "";
        data.forEach(element => {
          repoHtml += this.getListTemp(element);
        });
        this.repoUl.innerHTML = repoHtml;
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  getListTemp(element) {
    let description = "";
    let created = moment(element.created_at, "YYYYMMDD").fromNow();
    if (element.description) {
      description = ` <p class="mb-1">
    ${element.description}
    </p>`;
    }
    return `

       <li class="col-6 mb-4">
         <a
           href=""
           target="_blank"
           class="list-group-item list-group-item-action bg-dark text-light"
         >
           <div class="d-flex w-100 justify-content-between mb-3">
             <h5 class="mb-1 font-weight-bold">${element.name}</h5>
             <small>${created}</small>
           </div>
           ${description}
         </a>
       </li>`;
  }
  getUserData() {
    fetch;
  }
}

new NewRepo();
