/**
 * Serviço de Câmbio (ExchangeService)
 * Responsável por buscar dados da API.
 */
class ExchangeService {
  constructor() {
    this.currencies = [
      { code: "BRL", name: "Real Brasileiro", flag: "br" },
      { code: "USD", name: "Dólar Americano", flag: "us" },
      { code: "EUR", name: "Euro", flag: "eu" },
      { code: "GBP", name: "Libra Esterlina", flag: "gb" },
      { code: "JPY", name: "Iene Japonês", flag: "jp" },
      { code: "CAD", name: "Dólar Canadense", flag: "ca" },
      { code: "AUD", name: "Dólar Australiano", flag: "au" },
      { code: "CHF", name: "Franco Suíço", flag: "ch" },
      { code: "CNY", name: "Yuan Chinês", flag: "cn" },
      { code: "ARS", name: "Peso Argentino", flag: "ar" },
    ];
    this.ratesCache = {};
  }

  getSupportedCurrencies() {
    return this.currencies;
  }

  getCurrencyInfo(code) {
    return this.currencies.find((c) => c.code === code);
  }

  async getExchangeRates(baseCurrency) {
    const now = new Date();
    if (this.ratesCache[baseCurrency]) {
      const diff = now - this.ratesCache[baseCurrency].timestamp;
      if (diff < 5 * 60 * 1000) {
        return this.ratesCache[baseCurrency].data;
      }
    }

    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${baseCurrency}`
      );

      if (!response.ok) throw new Error("Falha na conexão.");

      const data = await response.json();
      const result = {
        base: data.base,
        rates: data.rates,
        lastUpdate: new Date(data.date),
      };
      result.rates[baseCurrency] = 1.0;

      this.ratesCache[baseCurrency] = {
        timestamp: new Date(),
        data: result,
      };

      return result;
    } catch (error) {
      console.error("Erro API:", error);
      throw new Error("Serviço indisponível temporariamente.");
    }
  }

  async convert(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
      return {
        originalAmount: amount,
        amount: amount,
        rate: 1,
        fromCurrency,
        toCurrency,
        lastUpdate: new Date(),
        isOffline: false,
      };
    }

    try {
      const ratesData = await this.getExchangeRates(fromCurrency);
      const rate = ratesData.rates[toCurrency];

      if (!rate) throw new Error(`Taxa não encontrada para ${toCurrency}`);

      return {
        originalAmount: amount,
        amount: amount * rate,
        rate: rate,
        fromCurrency,
        toCurrency,
        lastUpdate: ratesData.lastUpdate || new Date(),
        isOffline: false,
      };
    } catch (error) {
      console.warn("Usando taxa de fallback");
      return {
        originalAmount: amount,
        amount: amount,
        rate: 1.0,
        fromCurrency,
        toCurrency,
        lastUpdate: new Date(),
        isOffline: true,
      };
    }
  }
}

/**
 * Aplicativo Principal do Conversor de Moedas
 */
class CurrencyConverterApp {
  constructor(exchangeService) {
    this.exchangeService = exchangeService;

    this.state = {
      fromCurrency: "BRL",
      toCurrency: "USD",
      amount: 100,
      exchangeRates: {},
      lastUpdate: null,
      isLoading: false,
      error: null,
    };

    this.initializeElements();
    this.initializeApp();
  }

  initializeElements() {
    this.elements = {
      amountInput: document.getElementById("amount"),
      fromCurrencySelect: document.getElementById("fromCurrency"),
      toCurrencySelect: document.getElementById("toCurrency"),
      convertButton: document.getElementById("convertButton"),
      swapButton: document.getElementById("swapButton"),
      resultContainer: document.getElementById("resultContainer"),
      convertedAmount: document.getElementById("convertedAmount"),
      conversionDetail: document.getElementById("conversionDetail"),
      liveRate: document.getElementById("liveRate"),
      loading: document.getElementById("loading"),
      errorMessage: document.getElementById("errorMessage"),
      fromFlag: document.getElementById("fromFlag"),
      toFlag: document.getElementById("toFlag"),
      fromCurrencyBox: document.getElementById("fromCurrencyBox"),
      toCurrencyBox: document.getElementById("toCurrencyBox"),
      lastUpdateElement: document.getElementById("lastUpdate"),
      // Removido currencyGrid daqui
    };
  }

  async initializeApp() {
    this.setupEventListeners();
    this.populateCurrencySelects();
    // Removido setupPopularCurrencies()

    await this.loadInitialRates();
    await this.performConversion();
  }

  setupEventListeners() {
    this.elements.convertButton.addEventListener("click", () =>
      this.performConversion()
    );
    this.elements.swapButton.addEventListener("click", () =>
      this.swapCurrencies()
    );

    this.elements.amountInput.addEventListener("input", () => {
      const value = parseFloat(this.elements.amountInput.value);
      if (value < 0) this.elements.amountInput.value = 0;
      this.state.amount = value || 0;
      this.updateLiveRateText();
    });

    this.elements.fromCurrencySelect.addEventListener("change", () => {
      this.state.fromCurrency = this.elements.fromCurrencySelect.value;
      this.handleCurrencyChange("from");
    });

    this.elements.toCurrencySelect.addEventListener("change", () => {
      this.state.toCurrency = this.elements.toCurrencySelect.value;
      this.handleCurrencyChange("to");
    });

    this.elements.amountInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") this.performConversion();
    });
  }

  handleCurrencyChange(type) {
    this.updateFlags();

    if (type === "from") {
      this.elements.fromCurrencyBox.classList.add("active");
      this.elements.toCurrencyBox.classList.remove("active");
      this.loadExchangeRates();
    } else {
      this.elements.toCurrencyBox.classList.add("active");
      this.elements.fromCurrencyBox.classList.remove("active");
      this.updateLiveRateText();
    }
  }

  populateCurrencySelects() {
    const currencies = this.exchangeService.getSupportedCurrencies();

    this.elements.fromCurrencySelect.innerHTML = "";
    this.elements.toCurrencySelect.innerHTML = "";

    currencies.forEach((currency) => {
      const text = `${currency.code} - ${currency.name}`;

      const option1 = document.createElement("option");
      option1.value = currency.code;
      option1.textContent = text;
      this.elements.fromCurrencySelect.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = currency.code;
      option2.textContent = text;
      this.elements.toCurrencySelect.appendChild(option2);
    });

    this.elements.fromCurrencySelect.value = this.state.fromCurrency;
    this.elements.toCurrencySelect.value = this.state.toCurrency;
    this.updateFlags();
  }

  async loadInitialRates() {
    try {
      await this.loadExchangeRates();
    } catch (error) {
      console.error("Erro inicial:", error);
    }
  }

  async loadExchangeRates() {
    this.showLoading();
    this.hideError();

    try {
      const ratesData = await this.exchangeService.getExchangeRates(
        this.state.fromCurrency
      );
      this.state.exchangeRates = ratesData.rates;
      this.state.lastUpdate = ratesData.lastUpdate;

      if (ratesData.lastUpdate && this.elements.lastUpdateElement) {
        this.elements.lastUpdateElement.textContent = `Última atualização: ${ratesData.lastUpdate.toLocaleString(
          "pt-BR"
        )}`;
      }

      this.updateLiveRateText();
      this.hideLoading();
    } catch (error) {
      console.error("Erro taxas:", error);
      this.hideLoading();
      this.showError("Erro ao carregar taxas.");
    }
  }

  async performConversion() {
    const amount = parseFloat(this.elements.amountInput.value);
    if (isNaN(amount)) return;

    this.state.amount = amount;

    const btnOriginalText = this.elements.convertButton.innerHTML;
    this.elements.convertButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> ...';

    try {
      const result = await this.exchangeService.convert(
        amount,
        this.state.fromCurrency,
        this.state.toCurrency
      );
      this.displayResult(result);
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.elements.convertButton.innerHTML = btnOriginalText;
    }
  }

  displayResult(result) {
    this.elements.resultContainer.style.display = "block";

    this.elements.convertedAmount.textContent = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: result.toCurrency,
    }).format(result.amount);

    const rateText = `1 ${result.fromCurrency} = ${result.rate.toFixed(4)} ${
      result.toCurrency
    }`;
    this.elements.conversionDetail.textContent = rateText;

    this.updateLiveRateText(result.rate);

    if (result.isOffline) {
      this.elements.conversionDetail.textContent += " (Offline)";
      this.elements.conversionDetail.style.color = "#e74c3c";
    } else {
      this.elements.conversionDetail.style.color = "#666";
    }
  }

  swapCurrencies() {
    const temp = this.state.fromCurrency;
    this.state.fromCurrency = this.state.toCurrency;
    this.state.toCurrency = temp;

    this.elements.fromCurrencySelect.value = this.state.fromCurrency;
    this.elements.toCurrencySelect.value = this.state.toCurrency;

    this.updateFlags();
    this.loadExchangeRates().then(() => this.performConversion());
  }

  updateFlags() {
    const fromInfo = this.exchangeService.getCurrencyInfo(
      this.state.fromCurrency
    );
    const toInfo = this.exchangeService.getCurrencyInfo(this.state.toCurrency);

    if (fromInfo)
      this.elements.fromFlag.className = `currency-flag fi fi-${fromInfo.flag}`;
    if (toInfo)
      this.elements.toFlag.className = `currency-flag fi fi-${toInfo.flag}`;
  }

  updateLiveRateText(knownRate = null) {
    let rate = knownRate;
    if (!rate && this.state.exchangeRates[this.state.toCurrency]) {
      rate = this.state.exchangeRates[this.state.toCurrency];
    }

    if (rate) {
      this.elements.liveRate.textContent = `1 ${
        this.state.fromCurrency
      } = ${parseFloat(rate).toFixed(4)} ${this.state.toCurrency}`;
    } else {
      this.elements.liveRate.textContent = "...";
    }
  }

  showLoading() {
    this.elements.loading.style.display = "block";
    this.elements.resultContainer.style.opacity = "0.5";
  }

  hideLoading() {
    this.elements.loading.style.display = "none";
    this.elements.resultContainer.style.opacity = "1";
  }

  showError(message) {
    this.elements.errorMessage.textContent = message;
    this.elements.errorMessage.style.display = "block";
    setTimeout(() => {
      this.elements.errorMessage.style.display = "none";
    }, 5000);
  }

  hideError() {
    this.elements.errorMessage.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const exchangeService = new ExchangeService();
  window.app = new CurrencyConverterApp(exchangeService);

  setInterval(() => {
    if (window.app) window.app.loadExchangeRates();
  }, 5 * 60 * 1000);
});
