function removeLoginBox() {}

document.querySelector(".passport-login-container").style.display =
  "none !important";

document.querySelectorAll("pre code").forEach((c) => {
  c.contentEditable = "true";
});
