(function () {
  "use strict";

  let forms = document.querySelectorAll(".php-email-form");

  forms.forEach(function (e) {
    e.addEventListener("submit", function (event) {
      event.preventDefault();

      let thisForm = this;

      // let action = thisForm.getAttribute('action');
      //   let action = "http://localhost:8086/send-mapping-ninja-mail";

      let action =
        "https://daebackend.netlify.app/.netlify/functions/api/send-mapping-ninja-mail";

      thisForm.querySelector(".loading").classList.add("d-block");
      thisForm.querySelector(".error-message").classList.remove("d-block");
      thisForm.querySelector(".sent-message").classList.remove("d-block");

      let formData = new FormData(thisForm);

      const formDataObj = {};
      for (const [key, value] of formData.entries()) {
        formDataObj[key] = value;
      }

      const formDataJsonString = JSON.stringify(formDataObj);
      php_email_form_submit(thisForm, action, formDataJsonString);
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return true;
        } else {
          throw new Error(
            `${response.status} ${response.statusText} ${response.url}`
          );
        }
      })
      .then((data) => {
        thisForm.querySelector(".loading").classList.remove("d-block");
        if (data) {
          thisForm.querySelector(".sent-message").classList.add("d-block");
          thisForm.reset();
          setTimeout(() => {
            thisForm.querySelector(".sent-message").classList.remove("d-block");
          }, 2000);
        } else {
          throw new Error(
            data ? data : "Oops! Something went wrong. Please try again later."
          );
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector(".loading").classList.remove("d-block");
    thisForm.querySelector(".error-message").innerHTML = error;
    thisForm.querySelector(".error-message").classList.add("d-block");
  }
})();
