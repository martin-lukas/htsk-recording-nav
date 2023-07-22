// ==UserScript==
// @name         Recordings Navigation
// @version      1
// @match        http*://www.howtostudykorean.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const recIdKey = window.location.href + "recId";

  var recId = initRecId();

  document.addEventListener("keydown", (event) => {
    if (event.key === ".") clickPlay(1);
    else if (event.key === ",") clickPlay(-1);
    else if (event.key === "l") clickPlay(0);

    function clickPlay(change) {
      updateRecId(change);
      const btn = document.getElementsByClassName("play-button")[recId];
      btn.click();
      scrollTo(btn);

      function scrollTo(elem) {
        const elemRect = elem.getBoundingClientRect();
        const absoluteElementTop = elemRect.top + window.scrollY;
        const middle = absoluteElementTop - window.innerHeight / 2;

        window.scrollTo({
          top: middle,
          behavior: "smooth",
        });
      }
    }
  });

  function initRecId() {
    const initial = 0;
    const saved = localStorage.getItem(recIdKey);

    if (saved !== null) {
      return Number(saved);
    } else {
      localStorage.setItem(recIdKey, initial);
      return initial;
    }
  }

  function updateRecId(change) {
    recId += change;
    localStorage.setItem(recIdKey, recId);
  }
})();
