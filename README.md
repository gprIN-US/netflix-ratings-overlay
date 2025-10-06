# Netflix Ratings Overlay 🎬

I built this Tampermonkey userscript because I was tired of googling for IMDb and Rotten Tomatoes ratings while watching Netflix.  
This script automatically fetches the ratings for the title you’re looking at and shows them as a small floating badge on the screen.

---

## ✨ Features
- Detects Netflix titles on detail pages, watch pages, and preview modals.
- Pulls ratings from the [OMDb API](https://www.omdbapi.com/).
- Shows a floating badge with IMDb ⭐ and Rotten Tomatoes 🍅 scores.
- Caches ratings so it doesn’t keep calling the API for the same show.

---

## 🚀 How to install
1. Install the [Tampermonkey extension](https://www.tampermonkey.net/) in your browser.
2. Download the [netflix-ratings.user.js](./netflix-ratings.user.js) file from this repo.
3. Open Tampermonkey → Dashboard → Utilities → Import → select the file.
4. Replace `YOUR_API_KEY` in the script with your free [OMDb API key](https://www.omdbapi.com/apikey.aspx).
5. Open Netflix, click into a title, and you’ll see the ratings badge appear after a couple of seconds.

---

## 🖼️ Example

<img width="1374" height="745" alt="image" src="https://github.com/user-attachments/assets/3e82b7e1-a415-4b6c-897e-0f5c3402189d" />

---

## 🛠️ Stack
- JavaScript (plain ES6)
- Tampermonkey userscript
- OMDb API

---

## 📜 License
MIT License
