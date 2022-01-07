function HideLoginBox() {
  const styleEl = document.createElement("style");
  styleEl.setAttribute("type", "text/css");
  const style = `div.passport-container.passport-container-mini { 
    display:none;
  }
  body{color: red !important;}`;
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
  console.log(123);
  //  document.getElementsByTagName('head').item(0).appendChild(style);
}
HideLoginBox();

document.querySelectorAll("pre code").forEach((c) => {
  c.contentEditable = "true";
});
