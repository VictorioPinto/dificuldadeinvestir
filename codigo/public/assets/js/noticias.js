const API_KEY = "b9177d3e708eab9d7a16d82276d60032"; // coloque sua key da GNews
const API_NOTICIA = `https://gnews.io/api/v4/search?q=investimentos&lang=pt&country=br&max=10&apikey=${API_KEY}`;

const container = document.getElementById("news-container");

async function carregarNoticias() {
  const res = await fetch(API_NOTICIA);
  const data = await res.json();

  console.log(data);

  data.articles.forEach((noticia) => {
    const card = document.createElement("div");
    card.className = "carda";

    card.innerHTML = `
      <img src="${
        noticia.image || "https://via.placeholder.com/400"
      }" alt="imagem">
      <div class="card-content">
        <h3>${noticia.title}</h3>
        <p>${noticia.description || "Sem descrição disponível."}</p>
      </div>
    `;

    // 👉 AO CLICAR: abre a notícia original do site
    card.addEventListener("click", () => {
      window.open(noticia.url, "_blank");
    });

    container.appendChild(card);
  });
}

carregarNoticias();
