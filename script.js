const apiKey = "1907b3fb68c541d8a389630129b52baf"; // Replace with your own API key from newsapi.org
const newsContainer = document.getElementById("news-container");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

async function fetchNews(query = "latest") {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=10&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    if (data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No articles found. Try a different keyword.</p>";
      return;
    }

    newsContainer.innerHTML = "";
    data.articles.forEach(article => {
      const news = document.createElement("article");
      news.innerHTML = `
        <h2>${article.title}</h2>
        <p><strong>Source:</strong> ${article.source.name}</p>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read full article</a>
      `;
      newsContainer.appendChild(news);
    });
  } catch (err) {
    newsContainer.innerHTML = `<p>Error loading news: ${err.message}</p>`;
  }
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  } else {
    newsContainer.innerHTML = "<p>Please enter a topic to search.</p>";
  }
});

// Load top news by default
fetchNews();
