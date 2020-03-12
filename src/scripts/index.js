import "../styles/main.scss";

import "regenerator-runtime/runtime";
import "bootstrap/dist/css/bootstrap.css";

console.log(process.env.API_KEY);
// const form = document.querySelector(`form`);

// form.addEventListener(`submit`, e => {
//   e.preventDefault();
// });

class NewRepo {
  constructor() {
    this.form = document.querySelector(`form`);
    this.attachEvent();
    this.url = "https://api.github.com/user/repos";
  }

  attachEvent() {
    this.form.addEventListener(`submit`, e => {
      e.preventDefault();
      let repoName = document.querySelector(`#repoName`);
      let repoDescription = document.querySelector(`#description`);
      let repoPrivacy = this.form.elements.repoPrivacy;
      let createReadme = document.querySelector(`#createReadme`);

      this.submitData({
        name: repoName.value,
        description: repoDescription.value,
        private: repoPrivacy.value === "private",
        auto_init: createReadme.checked
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
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
}

new NewRepo();
