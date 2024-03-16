async function fetchKanyeQuote() {
  const res = await fetch('https://api.kanye.rest/');
  const data = await res.json();
  const kanyeQuote = document.getElementById('kanyeQuote');

  if (data.quote) {
    kanyeQuote.textContent = data.quote;
  } else {
    kanyeQuote.textContent = '[ERR: UNABLE_TO_GET_QUOTE_DATA]';
  }
}

fetchKanyeQuote();
