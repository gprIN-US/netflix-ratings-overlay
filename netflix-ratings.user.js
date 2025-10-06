// ==UserScript==
// @name         Netflix Ratings Overlay
// @namespace    https://github.com/yourname/netflix-ratings-overlay
// @version      1.0
// @description  Show IMDb and Rotten Tomatoes ratings on Netflix titles
// @match        https://www.netflix.com/*
// @grant        GM_xmlhttpRequest
// @connect      omdbapi.com
// @connect      www.omdbapi.com
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';

  const OMDB_API_KEY = "YOUR_API_KEY"; // replace with your OMDb key
  const CACHE = {};

  function cleanTitle(s) {
    if (!s) return null;
    return s.replace(/- Netflix/i, "")
            .replace(/: A Netflix.*$/i, "")
            .replace(/\| Netflix/i, "")
            .trim();
  }

  function findNetflixTitle() {
    let meta = document.querySelector('meta[property="og:title"]');
    if (meta && meta.content) return cleanTitle(meta.content);

    let modal = document.querySelector('.previewModal--player-title');
    if (modal && modal.innerText) return cleanTitle(modal.innerText);

    return cleanTitle(document.title.split("|")[0]);
  }

  function createBadge(text) {
    let old = document.getElementById("nf-ratings-badge");
    if (old) old.remove();
    let div = document.createElement("div");
    div.id = "nf-ratings-badge";
    div.style.position = "fixed";
    div.style.top = "70px";
    div.style.right = "20px";
    div.style.zIndex = "99999";
    div.style.background = "rgba(0,0,0,0.8)";
    div.style.color = "#fff";
    div.style.padding = "8px 12px";
    div.style.borderRadius = "8px";
    div.style.fontSize = "14px";
    div.style.fontFamily = "Arial,sans-serif";
    div.innerHTML = text;
    document.body.appendChild(div);
  }

  function fetchRatings(title) {
    if (CACHE[title]) {
      createBadge(CACHE[title]);
      return;
    }
    GM_xmlhttpRequest({
      method: "GET",
      url: `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`,
      onload: function(response) {
        let data = JSON.parse(response.responseText);
        if (data && data.Response === "True") {
          let imdb = data.imdbRating || "N/A";
          let rtObj = (data.Ratings || []).find(r => r.Source === "Rotten Tomatoes");
          let rt = rtObj ? rtObj.Value : "N/A";
          let badgeText = `🎬 ${data.Title} (${data.Year})<br>⭐ IMDb: ${imdb} &nbsp; 🍅 RT: ${rt}`;
          CACHE[title] = badgeText;
          createBadge(badgeText);
        } else {
          createBadge(`No ratings found for ${title}`);
        }
      }
    });
  }

  let lastTitle = null;
  setInterval(() => {
    let t = findNetflixTitle();
    if (t && t !== lastTitle) {
      lastTitle = t;
      fetchRatings(t);
    }
  }, 2000);
})();
