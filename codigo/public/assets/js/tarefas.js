document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    carregarCards();
  }, 100);
});

function carregarCards() {
  const container = document.getElementById("grid-cards");

  if (!usuarioCorrente || !usuarioCorrente.login) {
    container.innerHTML =
      "<p>Por favor, faça login para ver as atividades.</p>";
    return;
  }

  const pontosUsuario = usuarioCorrente.pontos || 0;
  // Garante que é um array, mesmo que vazio
  const listaConcluidas = usuarioCorrente.tarefascompletar || [];

  let htmlContent = "";

  for (let i = 1; i <= 20; i++) {
    const pontosNecessarios = (i - 1) * 100;

    // Verificações de estado
    const estaDesbloqueado = pontosUsuario >= pontosNecessarios;
    const estaConcluido = listaConcluidas.includes(i); // Verifica se o número do nível está na lista

    // Definição das variáveis visuais baseadas no estado
    let classeStatus = "";
    let textoBotao = "";
    let atributoDisabled = "";
    let iconeOverlay = "";

    if (estaConcluido) {
      // --- ESTADO 1: CONCLUÍDO (VERDE) ---
      classeStatus = "concluido";
      textoBotao = "Concluído";
      atributoDisabled = "disabled"; // Botão não clicável
      iconeOverlay = '<span class="overlay-lock">✅</span>';
    } else if (estaDesbloqueado) {
      // --- ESTADO 2: LIBERADO (AZUL/BRANCO) ---
      classeStatus = "liberado";
      textoBotao = "Acessar Quiz";
      atributoDisabled = ""; // Clicável
      iconeOverlay = ""; // Sem ícone
    } else {
      // --- ESTADO 3: BLOQUEADO (CINZA) ---
      classeStatus = "bloqueado";
      textoBotao = `Bloqueado (${pontosNecessarios} pts)`;
      atributoDisabled = "disabled"; // Botão não clicável
      iconeOverlay = '<span class="overlay-lock">🔒</span>';
    }

    htmlContent += `
        <div class="card-atividade ${classeStatus}" id="card-${i}">
            <div class="card-img-header">
                ${iconeOverlay}
            </div>
            <div class="card-body">
                <h3 class="card-title">Quiz Nível ${i}</h3>
                <p class="card-text">
                   Requisito: Você precisa de <strong>${pontosNecessarios}</strong> pontos para liberar este conteúdo.
                </p>
                <button 
                    class="btn-atividade" 
                    onclick="abrirQuiz(${i})" 
                    ${atributoDisabled}
                >
                    ${textoBotao}
                </button>
            </div>
        </div>
    `;
  }
  container.innerHTML = htmlContent;
}

function abrirQuiz(nivel) {
  // Redireciona para a página de tarefa
  window.location.href = `tarefa.html?nivel=${nivel}`;
}
