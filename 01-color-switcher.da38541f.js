const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),r=document.querySelector("button[data-stop]");r.setAttribute("disabled",!1);let o=null;function n(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}function d(e){t.style.backgroundColor=n()}e.addEventListener("click",(function(l){t.style.backgroundColor=n(),e.setAttribute("disabled",!0),r.removeAttribute("disabled"),o=setInterval(d,1e3)})),r.addEventListener("click",(function(t){clearInterval(o),e.removeAttribute("disabled"),r.setAttribute("disabled",!0)}));
//# sourceMappingURL=01-color-switcher.da38541f.js.map