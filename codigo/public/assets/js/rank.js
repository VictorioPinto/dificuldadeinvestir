// Pega o usuário logado do sessionStorage
const usuarioCorrenteJSON = sessionStorage.getItem("usuarioCorrente");

// Seleciona os containers do HTML
const containerTop10 = document.getElementById("ranking-top-10");
const containerUser = document.getElementById("ranking-user");

// --- MUDANÇA AQUI: Nome da variável alterado para evitar conflito ---
const API_RANK_URL = "http://localhost:3000/usuarios";

// Verificação de login
if (!usuarioCorrenteJSON) {
  if (containerTop10) {
    containerTop10.innerHTML =
      "<p style='text-align:center; color:#2d3748'>Você precisa estar logado para ver o ranking.</p>";
  }
} else {
  const usuarioLogado = JSON.parse(usuarioCorrenteJSON);
  carregarRanking(usuarioLogado);
}

/**
 * Função assíncrona para buscar e exibir os dados do ranking
 */
async function carregarRanking(usuarioLogado) {
  // Proteção caso os elementos não existam na página (evita erro null)
  if (!containerTop10 || !containerUser) return;

  try {
    // 1. Buscar todos os usuários usando a NOVA variável
    const response = await fetch(API_RANK_URL);

    if (!response.ok) {
      throw new Error("Não foi possível carregar os dados do ranking.");
    }
    let todosUsuarios = await response.json();

    // 2. Tratar dados: Garantir que pontos são números e ordenar (Maior -> Menor)
    todosUsuarios.forEach((u) => (u.pontos = Number(u.pontos) || 0));
    todosUsuarios.sort((a, b) => b.pontos - a.pontos);

    // 3. Pegar os 10 primeiros
    const top10 = todosUsuarios.slice(0, 10);

    // 4. Descobrir posição do usuário atual
    const rankUsuarioLogado =
      todosUsuarios.findIndex((u) => u.id === usuarioLogado.id) + 1;
    let usuarioEstaNoTop10 = false;

    // 5. Limpa o container antes de preencher
    containerTop10.innerHTML = "";

    // 6. GERAÇÃO DO HTML
    top10.forEach((usuario, index) => {
      const posicao = index + 1;

      if (usuario.id === usuarioLogado.id) {
        usuarioEstaNoTop10 = true;
      }

      // Define as classes especiais do CSS
      let classesItem = "ranking-item";

      if (posicao === 1) classesItem += " rank-1";
      else if (posicao === 2) classesItem += " rank-2";
      else if (posicao === 3) classesItem += " rank-3";

      if (usuario.id === usuarioLogado.id) {
        classesItem += " user-highlight";
      }

      const htmlCard = `
        <div class="${classesItem}">
          <div class="rank-pos">${posicao}</div>
          <div class="rank-name">${usuario.nome}</div>
          <div class="rank-points">${usuario.pontos} <span>pts</span></div>
        </div>
      `;

      containerTop10.innerHTML += htmlCard;
    });

    // 7. Se o usuário logado NÃO está no Top 10, mostra ele no final
    containerUser.innerHTML = "";

    if (!usuarioEstaNoTop10 && rankUsuarioLogado > 0) {
      const dadosAtualizadosUser = todosUsuarios.find(
        (u) => u.id === usuarioLogado.id
      );
      const pontosAtuais = dadosAtualizadosUser
        ? dadosAtualizadosUser.pontos
        : usuarioLogado.pontos;

      containerUser.innerHTML = `
        <div class="ranking-item user-highlight">
          <div class="rank-pos">${rankUsuarioLogado}</div>
          <div class="rank-name">${usuarioLogado.nome} (Você)</div>
          <div class="rank-points">${pontosAtuais} <span>pts</span></div>
        </div>
      `;
    }
  } catch (error) {
    console.error("Erro ao carregar ranking:", error);
    containerTop10.innerHTML = `<p style="color: red; text-align:center;">Erro: ${error.message}. Verifique se o json-server está rodando.</p>`;
  }
}
