const ICON = {
  EYE: "ico-eye",
  EYE_OFF: "ico-eye-off",
};
const PASSWORD_MIN_LENGTH = 8;

const REGEX = {
  ONE_UPPERCASE: /(?=.*[A-Z])/,
  ONE_LOWERCASE: /(?=.*[a-z])/,
  ONE_NUMBERIC: /(?=.*[0-9])/,
};

const passwordInput = document.getElementById("password-input");
const showPwToggler = document.getElementById("show-pw-toggler");
const showPwTogglerUse = showPwToggler.querySelector("use");
const validatePwTags = document.querySelector(".vld-pw-tags");
const lowercaseTag = validatePwTags.querySelector(".lowercase");
const uppercaseTag = validatePwTags.querySelector(".uppercase");
const numbericTag = validatePwTags.querySelector(".numberic");
const lengthTag = validatePwTags.querySelector(".length");

// toggle show password event
showPwToggler.addEventListener("click", function () {
  const pwInputType = passwordInput.getAttribute("type");
  if (pwInputType === "password") {
    passwordInput.setAttribute("type", "text");
    showPwTogglerUse.setAttribute("xlink:href", `#${ICON.EYE_OFF}`);
  } else {
    passwordInput.setAttribute("type", "password");
    showPwTogglerUse.setAttribute("xlink:href", `#${ICON.EYE}`);
  }
});

passwordInput.addEventListener("input", function (event) {
  const value = event.currentTarget.value;
  uppercaseTag.classList.toggle("valid", REGEX.ONE_UPPERCASE.test(value));
  lowercaseTag.classList.toggle("valid", REGEX.ONE_LOWERCASE.test(value));
  numbericTag.classList.toggle("valid", REGEX.ONE_NUMBERIC.test(value));
  lengthTag.classList.toggle("valid", value.length >= 8);
});
