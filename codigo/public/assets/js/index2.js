const baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogadoJSON = sessionStorage.getItem("usuarioCorrente");

  // Se não tiver login, manda para a tela de login
  if (!usuarioLogadoJSON) {
    window.location.href = "/modulos/login/login.html";
    return;
  }

  const usuarioLogado = JSON.parse(usuarioLogadoJSON);

  // --- NOVO: Configura o botão de Logout ---
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      // 1. Limpa a sessão
      sessionStorage.removeItem("usuarioCorrente");
      // 2. Redireciona para o login
      window.location.href = "/modulos/login/login.html";
    });
  }

  // Inicia o carregamento
  carregarDashboard(usuarioLogado.id);
});

async function carregarDashboard(id) {
  console.log(`Buscando dados para o ID: ${id}`);

  try {
    const respostaUser = await fetch(`${baseUrl}/usuarios/${id}`);

    // --- PROTEÇÃO CONTRA USUÁRIO INEXISTENTE (ERRO 404) ---
    if (respostaUser.status === 404) {
      alert(
        "Usuário não encontrado na base de dados. Por favor, faça login novamente."
      );
      sessionStorage.removeItem("usuarioCorrente");
      window.location.href = "/modulos/login/login.html";
      return;
    }

    if (!respostaUser.ok) {
      throw new Error(`Erro na API: ${respostaUser.status}`);
    }

    const usuario = await respostaUser.json();

    // --- 1. ATUALIZA NOME ---
    const elementoNome = document.getElementById("nome-usuario");
    if (elementoNome) {
      const primeiroNome = usuario.nome.split(" ")[0];
      elementoNome.innerText = `${primeiroNome}`;
    }

    // --- 2. ATUALIZA PONTOS (HEADER) ---
    const pontosCabecalho = document.getElementById("pontos-cabecalho");
    if (pontosCabecalho) {
      const pontos = usuario.pontos || 0;
      pontosCabecalho.innerText = `${pontos.toLocaleString("pt-BR")} Pontos`;
    }

    // --- 3. ATUALIZA PONTOS (SIDEBAR - Se existir) ---
    const pontosSidebar = document.getElementById("pontos-sidebar");
    if (pontosSidebar) {
      const pontos = usuario.pontos || 0;
      pontosSidebar.innerText = `${pontos.toLocaleString("pt-BR")}: Pontos`;
    }

    // Carrega os cards de investimento
    carregarInvestimentos();
  } catch (erro) {
    console.error("Erro crítico:", erro);
  }
}

async function carregarInvestimentos() {
  try {
    const respostaInvest = await fetch(`${baseUrl}/investimentos`);
    if (respostaInvest.ok) {
      const investimentos = await respostaInvest.json();
      const container = document.getElementById("lista-oportunidades");

      if (container) {
        container.innerHTML = "";
        investimentos.forEach((inv) => {
          const card = document.createElement("div");
          card.className = "card-investimento";
          card.innerHTML = `<h4>${inv.nome}</h4><p>Retorno: ${inv.retorno}%</p>`;
          container.appendChild(card);
        });
      }
    }
  } catch (e) {
    console.log("Erro ao carregar investimentos.");
  }
}
