const apiUrl = "/faq"; // JSON Server endpoint
const faqContainer = document.getElementById("faqContainer");
const searchInput = document.getElementById("searchInput");
const btnMostrarTodas = document.getElementById("btnMostrarTodas");

// Função para montar o FAQ dinamicamente
async function carregarFAQ(filtro = "") {
  try {
    const resposta = await fetch(apiUrl);
    const dados = await resposta.json();

    const filtrados = dados.filter(faq =>
      faq.pergunta.toLowerCase().includes(filtro.toLowerCase())
    );

    faqContainer.innerHTML = "";

    filtrados.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "accordion-item";

      card.innerHTML = `
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
            ${item.pergunta}
          </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#faqContainer">
          <div class="accordion-body">${item.resposta}</div>
        </div>
      `;

      faqContainer.appendChild(card);
    });
  } catch (erro) {
    faqContainer.innerHTML = "<p class='text-danger'>Erro ao carregar o FAQ.</p>";
    console.error("Erro ao buscar dados do FAQ:", erro);
  }
}

// EVENTOS:
window.onload = () => carregarFAQ(); // 1️⃣ onload
searchInput.oninput = () => carregarFAQ(searchInput.value); // 2️⃣ oninput
btnMostrarTodas.onclick = () => { // 3️⃣ onclick
  searchInput.value = "";
  carregarFAQ();
};
