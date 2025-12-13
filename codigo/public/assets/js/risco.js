/**
 * ARQUIVO: assets/js/risco.js
 * Descrição: Lógica consolidada para Análise de Perfil de Investidor.
 * Contém: Dados simulados, configuração de gráfico e lógica de formulário.
 */

// --- 1. DADOS (SIMULAÇÃO DE API) ---
// Simula a resposta que viria de um servidor/banco de dados
const INVESTOR_DATA = {
  profiles: {
    conservative: {
      name: "Conservador",
      description:
        "Prioridade total na segurança e preservação do patrimônio. Você prefere evitar perdas a qualquer custo, mesmo que isso signifique rendimentos menores.",
      scoreRange: [0, 40],
      characteristics: { risk: "Baixo", return: "Baixo", volatility: "Mínima" },
    },
    moderate: {
      name: "Moderado",
      description:
        "Busca equilíbrio entre segurança e crescimento. Você aceita oscilações de curto prazo em troca de um retorno melhor que a poupança no longo prazo.",
      scoreRange: [41, 70],
      characteristics: { risk: "Médio", return: "Médio", volatility: "Média" },
    },
    aggressive: {
      name: "Agressivo",
      description:
        "Foco em maximizar retornos. Você entende que para ganhar mais é preciso aceitar alta volatilidade e riscos de perda no curto prazo.",
      scoreRange: [71, 100],
      characteristics: { risk: "Alto", return: "Alto", volatility: "Alta" },
    },
  },
  strategies: {
    conservative: {
      recommendation: "Foco em Renda Fixa e Preservação de Capital.",
      allocation: { equity: 20, fixedIncome: 75, alternatives: 5 },
      strategies: [
        "Tesouro Selic (Reserva de Emergência)",
        "Tesouro IPCA+ (Proteção contra inflação)",
        "CDBs de grandes bancos",
        "Fundos de Renda Fixa Referenciados",
      ],
    },
    moderate: {
      recommendation: "Crescimento Equilibrado e Diversificação.",
      allocation: { equity: 45, fixedIncome: 45, alternatives: 10 },
      strategies: [
        "Fundos Multimercado",
        "Ações de empresas sólidas (Blue Chips)",
        "Fundos Imobiliários (FIIs)",
        "Tesouro IPCA+ longo prazo",
      ],
    },
    aggressive: {
      recommendation: "Crescimento Agressivo e Renda Variável.",
      allocation: { equity: 70, fixedIncome: 15, alternatives: 15 },
      strategies: [
        "Ações (Small Caps e Valor)",
        "Criptomoedas e Investimentos Alternativos",
        "Exposição Internacional (Dólar/Stocks)",
        "Renda Fixa apenas para caixa/oportunidade",
      ],
    },
  },
};

// --- 2. CONFIGURAÇÃO DO GRÁFICO (CHART.JS) ---
const ChartConfig = {
  createConfig: (allocation) => {
    return {
      type: "doughnut",
      data: {
        labels: ["Renda Variável (Ações)", "Renda Fixa", "Alternativos"],
        datasets: [
          {
            data: [
              allocation.equity,
              allocation.fixedIncome,
              allocation.alternatives,
            ],
            // Cores: Azul (Variável), Verde (Fixa), Amarelo/Gold (Alternativos)
            backgroundColor: ["#4facfe", "#48bb78", "#ffd700"],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              color: "#333", // Cor do texto da legenda
              font: { size: 12 },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ` ${context.label}: ${context.raw}%`;
              },
            },
          },
        },
        cutout: "70%", // Espessura do anel (donut)
      },
    };
  },
};

// --- 3. SERVIÇO DE CÁLCULO (REGRA DE NEGÓCIO) ---
class InvestorService {
  constructor() {
    this.data = INVESTOR_DATA;
  }

  // Simula uma chamada assíncrona (como se fosse buscar na API)
  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.data), 300); // Pequeno delay artificial
    });
  }

  // Lógica principal de pontuação
  calculateScore(formData) {
    let score = 0;

    // 1. Idade: Mais jovem = Mais tempo para recuperar perdas = Mais risco permitido
    const age = parseInt(formData.age);
    if (age <= 25) score += 20;
    else if (age <= 35) score += 15;
    else if (age <= 45) score += 10;
    else if (age <= 55) score += 5;

    // 2. Tolerância declarada (Cards selecionados)
    if (formData.risk === "high") score += 50;
    else if (formData.risk === "medium") score += 25;

    // 3. Conhecimento
    if (formData.knowledge === "advanced") score += 20;
    else if (formData.knowledge === "intermediate") score += 10;

    // 4. Horizonte de tempo
    const horizon = parseInt(formData.horizon);
    if (horizon > 10) score += 20;
    else if (horizon > 5) score += 10;

    // 5. Capacidade Financeira (Patrimônio / Renda Anual)
    // Se a pessoa tem muito patrimônio acumulado em relação ao que ganha, pode arriscar mais.
    const income = parseFloat(formData.income) || 1; // Evita divisão por zero
    const assets = parseFloat(formData.assets) || 0;
    const ratio = assets / income;

    if (ratio > 5) score += 10;
    else if (ratio > 1) score += 5;

    // Garante que o score fique entre 0 e 100
    return Math.min(100, Math.max(0, score));
  }

  // Define o perfil com base na pontuação
  determineProfile(score) {
    if (score <= 40) return "conservative";
    if (score <= 70) return "moderate";
    return "aggressive";
  }

  // Gera o objeto final de análise
  generateAnalysis(formData) {
    const score = this.calculateScore(formData);
    const type = this.determineProfile(score);

    const profileData = this.data.profiles[type];
    const strategyData = this.data.strategies[type];

    return {
      type: type, // conservative, moderate, aggressive
      score: score,
      name: profileData.name,
      description: profileData.description,
      characteristics: profileData.characteristics,
      allocation: strategyData.allocation,
      recommendation: strategyData.recommendation,
      strategies: strategyData.strategies,
      horizon:
        parseInt(formData.horizon) > 5 ? "Longo Prazo" : "Curto/Médio Prazo",
      volatility: profileData.characteristics.volatility,
    };
  }
}

// --- 4. APLICAÇÃO (INTERAÇÃO COM O USUÁRIO) ---
class App {
  constructor() {
    this.service = new InvestorService();
    this.chartInstance = null;

    // Cache dos elementos HTML para não buscar toda hora
    this.els = {
      form: document.getElementById("investorForm"),
      resultSection: document.querySelector(".result-section"),

      // Inputs
      ageSlider: document.getElementById("age"),
      ageDisplay: document.getElementById("ageValue"),
      horizonSlider: document.getElementById("investmentHorizon"),
      horizonDisplay: document.getElementById("horizonValue"),
      riskInput: document.getElementById("riskTolerance"),
      knowledgeInput: document.getElementById("knowledge"),
      nameInput: document.getElementById("name"),
      incomeInput: document.getElementById("annualIncome"),
      assetsInput: document.getElementById("totalAssets"),

      // Resultados
      profileType: document.getElementById("profileType"),
      profileName: document.getElementById("profileName"),
      scoreValue: document.getElementById("scoreValue"),
      scoreFill: document.getElementById("scoreFill"),
      mainGoal: document.getElementById("mainGoal"),
      recommendedHorizon: document.getElementById("recommendedHorizon"),
      volatility: document.getElementById("volatility"),
      recommendationText: document.getElementById("recommendationText"),
      equityPercent: document.getElementById("equityPercent"),
      fixedIncomePercent: document.getElementById("fixedIncomePercent"),
      alternativesPercent: document.getElementById("alternativesPercent"),
      strategyList: document.getElementById("strategyList"),
      canvas: document.getElementById("allocationChart"),

      // Botões
      resetBtn: document.getElementById("resetBtn"),
    };

    this.init();
  }

  async init() {
    this.setupListeners();
    // Carrega dados iniciais (simulação)
    await this.service.fetchData();
  }

  setupListeners() {
    // 1. Sliders (Atualiza o texto ao arrastar)
    this.els.ageSlider.addEventListener(
      "input",
      (e) => (this.els.ageDisplay.textContent = `${e.target.value} anos`)
    );
    this.els.horizonSlider.addEventListener(
      "input",
      (e) => (this.els.horizonDisplay.textContent = `${e.target.value} anos`)
    );

    // 2. Cards de Risco (Seleção visual)
    document.querySelectorAll(".risk-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        document
          .querySelectorAll(".risk-option")
          .forEach((el) => el.classList.remove("selected"));
        opt.classList.add("selected");
        this.els.riskInput.value = opt.dataset.value;
      });
    });

    // 3. Cards de Conhecimento (Seleção visual)
    document.querySelectorAll(".knowledge-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        document
          .querySelectorAll(".knowledge-option")
          .forEach((el) => el.classList.remove("selected"));
        opt.classList.add("selected");
        this.els.knowledgeInput.value = opt.dataset.value;
      });
    });

    // 4. Tags de Objetivos (Apenas visual neste exemplo)
    document.querySelectorAll(".goal-tag").forEach((tag) => {
      tag.addEventListener("click", () => {
        tag.classList.toggle("selected");
      });
    });

    // 5. Envio do Formulário (Botão Gerar Análise)
    this.els.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.runAnalysis();
    });

    // 6. Botão Nova Análise (Reset)
    if (this.els.resetBtn) {
      this.els.resetBtn.addEventListener("click", () => {
        this.resetForm();
      });
    }
  }

  runAnalysis() {
    // Coleta dados dos inputs
    const formData = {
      name: this.els.nameInput.value,
      age: this.els.ageSlider.value,
      horizon: this.els.horizonSlider.value,
      risk: this.els.riskInput.value,
      income: this.els.incomeInput.value,
      assets: this.els.assetsInput.value,
      knowledge: this.els.knowledgeInput.value,
    };

    // Executa o cálculo
    const result = this.service.generateAnalysis(formData);

    // Exibe na tela
    this.renderResults(result);
  }

  renderResults(result) {
    // Mostra a div de resultados
    this.els.resultSection.style.display = "block";

    // Preenche os textos
    this.els.profileType.textContent = result.type.toUpperCase();
    this.els.profileName.textContent = result.name;
    this.els.scoreValue.textContent = `${result.score}/100`;
    this.els.scoreFill.style.width = `${result.score}%`;

    this.els.mainGoal.textContent = result.description;
    this.els.recommendedHorizon.textContent = result.horizon;
    this.els.volatility.textContent = result.volatility;
    this.els.recommendationText.textContent = result.recommendation;

    this.els.equityPercent.textContent = `${result.allocation.equity}%`;
    this.els.fixedIncomePercent.textContent = `${result.allocation.fixedIncome}%`;
    this.els.alternativesPercent.textContent = `${result.allocation.alternatives}%`;

    // Cria a lista de estratégias (<li>)
    this.els.strategyList.innerHTML = "";
    result.strategies.forEach((strat) => {
      const li = document.createElement("li");
      li.textContent = strat;
      this.els.strategyList.appendChild(li);
    });

    // Renderiza o gráfico
    this.renderChart(result.allocation);

    // Rola a página até o resultado
    this.els.resultSection.scrollIntoView({ behavior: "smooth" });
  }

  renderChart(allocation) {
    // Se já existe um gráfico, destrói antes de criar o novo (evita bugs de sobreposição)
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = this.els.canvas.getContext("2d");
    this.chartInstance = new Chart(ctx, ChartConfig.createConfig(allocation));
  }

  resetForm() {
    // Limpa os inputs
    this.els.form.reset();

    // Esconde o resultado
    this.els.resultSection.style.display = "none";

    // Reseta visualmente os sliders
    this.els.ageDisplay.textContent = "35 anos";
    this.els.horizonDisplay.textContent = "10 anos";

    // Reseta classes 'selected' dos cards
    document
      .querySelectorAll(".selected")
      .forEach((el) => el.classList.remove("selected"));

    // Restaura seleção padrão (visual)
    const firstRisk = document.querySelector('.risk-option[data-value="low"]');
    const firstKnow = document.querySelector(
      '.knowledge-option[data-value="beginner"]'
    );
    if (firstRisk) firstRisk.classList.add("selected");
    if (firstKnow) firstKnow.classList.add("selected");

    // Reseta valores hidden para o padrão
    this.els.riskInput.value = "low";
    this.els.knowledgeInput.value = "beginner";

    // Sobe a tela
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Inicializa o App quando o HTML carregar
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
