// --- CONFIGURAÇÃO DA API ---
// IMPORTANTE: Agora apontamos para /quizzes no json-server
const API_QUIZZES = "http://localhost:3000/quizzes";

let perguntasAtuais = [];
let indiceAtual = 0;
let acertos = 0;
let nivelAtual = 1;

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  nivelAtual = urlParams.get("nivel") || 1;
  carregarQuiz(nivelAtual);
});

function carregarQuiz(nivel) {
  console.log(`Buscando quiz em: ${API_QUIZZES}`);

  fetch(API_QUIZZES)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erro na resposta da API: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Procura o quiz com o nivelId correspondente
      const quiz = data.find((t) => t.nivelId == nivel);

      if (quiz && quiz.perguntas) {
        perguntasAtuais = quiz.perguntas;
        document.getElementById("titulo-tarefa").innerText = quiz.titulo;
        mostrarPergunta();
      } else {
        console.error("Quiz não encontrado para o nível:", nivel);
        document.getElementById(
          "quiz-container"
        ).innerHTML = `<h3>Quiz do Nível ${nivel} não encontrado.</h3>
             <p>Verifique se o db.json contém um item em "quizzes" com "nivelId": ${nivel}</p>`;
      }
    })
    .catch((err) => {
      console.error("Erro ao carregar quiz:", err);
      document.getElementById(
        "quiz-container"
      ).innerHTML = `<h3>Erro de Conexão</h3>
           <p>Não foi possível carregar as perguntas.</p>
           <p>Detalhe: ${err.message}</p>
           <p><strong>Verifique se o json-server está rodando.</strong></p>`;
    });
}

function mostrarPergunta() {
  const perguntaObj = perguntasAtuais[indiceAtual];

  // Atualiza contadores e texto
  document.getElementById("num-questao").innerText = indiceAtual + 1;
  document.getElementById("texto-pergunta").innerText = perguntaObj.pergunta;

  // Limpa área de opções e feedback
  const containerOpcoes = document.getElementById("opcoes-container");
  containerOpcoes.innerHTML = "";
  document.getElementById("feedback-area").classList.add("oculto");

  // Cria os botões
  perguntaObj.opcoes.forEach((texto, index) => {
    const btn = document.createElement("button");
    btn.className = "btn-opcao";
    btn.innerText = texto;
    btn.onclick = () => verificarResposta(index, btn);
    containerOpcoes.appendChild(btn);
  });
}

function verificarResposta(indiceEscolhido, botaoClicado) {
  const perguntaObj = perguntasAtuais[indiceAtual];
  const botoes = document.querySelectorAll(".btn-opcao");

  // Trava todos os botões
  botoes.forEach((btn) => (btn.disabled = true));

  if (indiceEscolhido === perguntaObj.correta) {
    botaoClicado.classList.add("correto");
    acertos++;
    exibirFeedback(true, perguntaObj.explicacao);
  } else {
    botaoClicado.classList.add("errado");
    // Mostra a correta
    botoes[perguntaObj.correta].classList.add("correto");
    exibirFeedback(false, perguntaObj.explicacao);
  }
}

function exibirFeedback(acertou, explicacao) {
  const elFeedback = document.getElementById("feedback-texto");
  const containerFeedback = document.getElementById("feedback-area");

  if (acertou) {
    elFeedback.innerHTML = `<strong>Correto!</strong> ${explicacao}`;
    elFeedback.style.color = "#155724";
    containerFeedback.style.backgroundColor = "#d4edda";
    containerFeedback.style.borderColor = "#c3e6cb";
  } else {
    elFeedback.innerHTML = `<strong>Incorreto.</strong> ${explicacao}`;
    elFeedback.style.color = "#721c24";
    containerFeedback.style.backgroundColor = "#f8d7da";
    containerFeedback.style.borderColor = "#f5c6cb";
  }

  containerFeedback.classList.remove("oculto");
}

function proximaPergunta() {
  indiceAtual++;
  if (indiceAtual < perguntasAtuais.length) {
    mostrarPergunta();
  } else {
    finalizarQuiz();
  }
}

function finalizarQuiz() {
  // Oculta o quiz e mostra resultado
  document.querySelector(".pergunta-box").style.display = "none";
  document.getElementById("opcoes-container").style.display = "none";
  document.getElementById("feedback-area").style.display = "none";
  document.querySelector(".quiz-header").style.display = "none";

  const divResultado = document.getElementById("resultado-final");
  divResultado.classList.remove("oculto");
  document.getElementById("pontuacao-final").innerText = acertos;

  // Regra: Precisa de 3 acertos (60%)
  if (acertos >= 3) {
    const pontosGanhos = 100;
    document.getElementById(
      "mensagem-bonus"
    ).innerHTML = `<h3>Parabéns!</h3><p>Você dominou este assunto e ganhou <strong>${pontosGanhos} pontos</strong>.</p>`;
    adicionarPontosUsuario(pontosGanhos);
  } else {
    document.getElementById(
      "mensagem-bonus"
    ).innerHTML = `<h3>Quase lá!</h3><p>Você acertou ${acertos} de 5. Precisa de 3 para passar.</p>`;
  }
}

function adicionarPontosUsuario(pontos) {
  if (usuarioCorrente) {
    // 1. Atualiza Pontos na memória
    const novosPontos = (usuarioCorrente.pontos || 0) + pontos;
    usuarioCorrente.pontos = novosPontos;

    // 2. --- MUDANÇA: Atualiza a lista de Tarefas Completas ---
    // Garante que o array existe
    if (!usuarioCorrente.tarefascompletar) {
      usuarioCorrente.tarefascompletar = [];
    }

    // Verifica se a tarefa já foi feita para não duplicar o número na lista
    const nivelNumero = parseInt(nivelAtual); // Garante que seja número

    if (!usuarioCorrente.tarefascompletar.includes(nivelNumero)) {
      usuarioCorrente.tarefascompletar.push(nivelNumero);
    }

    // 3. Atualiza no SessionStorage (Navegador)
    sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuarioCorrente));

    // 4. Atualiza cabeçalho visualmente
    if (typeof showUserInfo === "function") {
      showUserInfo("userInfo");
    }

    // 5. Persiste no Banco de Dados (JSON Server)
    fetch(`http://localhost:3000/usuarios/${usuarioCorrente.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pontos: novosPontos,
        tarefascompletar: usuarioCorrente.tarefascompletar, // Envia a nova lista
      }),
    })
      .then((res) => {
        if (res.ok) console.log("Pontos e tarefa salvos no servidor!");
        else console.error("Erro ao salvar dados.");
      })
      .catch((err) => console.error("Erro de conexão ao salvar dados:", err));
  }
}
