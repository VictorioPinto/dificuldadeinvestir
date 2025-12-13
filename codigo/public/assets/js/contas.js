// --- SELEÇÃO DOS ELEMENTOS ---
const tipoInvestimentoRadios = document.querySelectorAll(
  'input[name="tipo_investimento"]'
);
const inicialEl = document.getElementById("inicial");
const mensalEl = document.getElementById("mensal");
const mesesEl = document.getElementById("meses");
const rentabilidadeEl = document.getElementById("rentabilidade_valor");
const periodoEl = document.getElementById("rentabilidade_periodo");
const obtidoEl = document.getElementById("resultado-obtido");
const investidoEl = document.getElementById("resultado-investido");
const botaoCalcularEl = document.getElementById("botao-calcular");

// Cache para guardar as taxas
let taxasReais = {
  selic: 0,
  cdi: 0,
  poupanca: 0, // Novo campo
};

// --- FUNÇÕES AUXILIARES ---
function formatarMoeda(valor) {
  if (isNaN(valor) || valor === null) return "R$ 0,00";
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// --- CÁLCULO DA POUPANÇA ---
function calcularTaxaPoupanca(selicAtual) {
  // Regra oficial da Poupança:
  // Se Selic > 8.5% ao ano: Rende 0.5% ao mês + TR (aprox. 6.17% a.a. fixo + variável)
  // Se Selic <= 8.5% ao ano: Rende 70% da Selic

  if (selicAtual > 8.5) {
    // 6.17% é a soma de 0.5% ao mês compostos em um ano.
    // Adicionei + 1.5% como estimativa média da TR (Taxa Referencial) atual.
    return 6.17 + 1.5;
  } else {
    return selicAtual * 0.7;
  }
}

// --- BUSCA DE DADOS REAIS (BRASIL API) ---
async function buscarTaxasDeMercado() {
  rentabilidadeEl.parentElement.style.opacity = "0.5";

  try {
    const response = await fetch("https://brasilapi.com.br/api/taxas/v1");
    if (!response.ok) throw new Error("Erro ao buscar taxas");

    const dados = await response.json();

    const selicData = dados.find((item) => item.nome === "Selic");
    const cdiData = dados.find((item) => item.nome === "CDI");

    if (selicData) {
      taxasReais.selic = parseFloat(selicData.valor);
      // Calcula a poupança baseado na Selic que acabamos de pegar
      taxasReais.poupanca = calcularTaxaPoupanca(taxasReais.selic);
    }

    if (cdiData) {
      taxasReais.cdi = parseFloat(cdiData.valor);
    }

    console.log("Taxas atualizadas:", taxasReais);
    atualizarInputRentabilidade();
  } catch (error) {
    console.error("Erro ao buscar taxas:", error);
  } finally {
    rentabilidadeEl.parentElement.style.opacity = "1";
  }
}

// --- ATUALIZA O INPUT QUANDO TROCA O RADIO ---
function atualizarInputRentabilidade() {
  const radioSelecionado = document.querySelector(
    'input[name="tipo_investimento"]:checked'
  );
  if (!radioSelecionado) return;

  const tipoSelecionado = radioSelecionado.value;
  periodoEl.value = "anual";

  if (tipoSelecionado === "tesouro") {
    if (taxasReais.selic > 0)
      rentabilidadeEl.value = taxasReais.selic.toFixed(2);
  } else if (tipoSelecionado === "cdi") {
    if (taxasReais.cdi > 0) rentabilidadeEl.value = taxasReais.cdi.toFixed(2);
  } else if (tipoSelecionado === "poupanca") {
    // Puxa o valor calculado da poupança
    if (taxasReais.poupanca > 0)
      rentabilidadeEl.value = taxasReais.poupanca.toFixed(2);
  }
}

// --- CÁLCULO FINANCEIRO (Igual ao anterior) ---
function calcularInvestimento() {
  const inicial = parseFloat(inicialEl.value) || 0;
  const mensal = parseFloat(mensalEl.value) || 0;
  const meses = parseInt(mesesEl.value) || 0;
  let rentabilidade = parseFloat(rentabilidadeEl.value) || 0;
  const periodo = periodoEl.value;

  if (meses === 0) {
    obtidoEl.textContent = formatarMoeda(inicial);
    investidoEl.textContent = formatarMoeda(inicial);
    return;
  }

  let taxaMensalDecimal;

  if (periodo === "anual") {
    const taxaAnualDecimal = rentabilidade / 100;
    taxaMensalDecimal = Math.pow(1 + taxaAnualDecimal, 1 / 12) - 1;
  } else {
    taxaMensalDecimal = rentabilidade / 100;
  }

  const totalInvestido = inicial + mensal * meses;
  const fvInicial = inicial * Math.pow(1 + taxaMensalDecimal, meses);

  let fvMensal = 0;
  if (taxaMensalDecimal > 0) {
    fvMensal =
      mensal *
      ((Math.pow(1 + taxaMensalDecimal, meses) - 1) / taxaMensalDecimal);
  } else {
    fvMensal = mensal * meses;
  }

  const valorObtido = fvInicial + fvMensal;

  obtidoEl.textContent = formatarMoeda(valorObtido);
  investidoEl.textContent = formatarMoeda(totalInvestido);

  const textoOriginal = botaoCalcularEl.innerText;
  botaoCalcularEl.innerText = "Calculado!";
  setTimeout(() => (botaoCalcularEl.innerText = textoOriginal), 2000);
}

// --- EVENTOS ---
botaoCalcularEl.addEventListener("click", (e) => {
  e.preventDefault();
  calcularInvestimento();
});

tipoInvestimentoRadios.forEach((radio) => {
  radio.addEventListener("change", atualizarInputRentabilidade);
});

document.addEventListener("DOMContentLoaded", buscarTaxasDeMercado);
