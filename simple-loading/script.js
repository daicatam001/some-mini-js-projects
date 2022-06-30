const loadingTemplate = document.querySelector("#loading-template");
const button = document.querySelector("button");

button.addEventListener("click", function () {
  const loading = loadingTemplate.content.cloneNode(true);
  const buttonContent = button.innerHTML;
  button.innerHTML = "";
  button.disabled = true;
  button.appendChild(loading);
  setTimeout(() => {
    button.innerHTML = buttonContent;
    button.disabled = false;
  }, 2000);
});
