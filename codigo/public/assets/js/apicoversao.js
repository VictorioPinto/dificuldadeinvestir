// Serviço de API para conversão de moedas
class ExchangeRateService {
    constructor() {
        this.API_KEY = 'a12d1e0817824b88bde9fe72'; // API pública gratuita
        this.BASE_URL = `https://v6.exchangerate-api.com/v6/${this.API_KEY}`;
        this.cache = {
            rates: {},
            lastUpdate: null,
            cacheDuration: 5 * 60 * 1000 // 5 minutos
        };
    }

    // Obter taxas de câmbio
    async getExchangeRates(baseCurrency = 'USD') {
        // Verificar cache primeiro
        if (this.isCacheValid(baseCurrency)) {
            console.log('Usando taxas em cache');
            return this.cache.rates[baseCurrency];
        }

        try {
            const response = await fetch(`${this.BASE_URL}/latest/${baseCurrency}`);
            
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.result === 'success') {
                // Atualizar cache
                this.cache.rates[baseCurrency] = {
                    rates: data.conversion_rates,
                    timestamp: new Date().getTime(),
                    lastUpdate: new Date(data.time_last_update_utc)
                };
                
                return this.cache.rates[baseCurrency];
            } else {
                throw new Error('API retornou erro');
            }
        } catch (error) {
            console.error('Erro ao obter taxas:', error);
            throw error;
        }
    }

    // Converter valor entre moedas
    async convert(amount, fromCurrency, toCurrency) {
        try {
            const ratesData = await this.getExchangeRates(fromCurrency);
            const rate = ratesData.rates[toCurrency];
            
            if (!rate) {
                throw new Error(`Taxa não disponível para ${toCurrency}`);
            }
            
            return {
                amount: amount * rate,
                rate: rate,
                fromCurrency: fromCurrency,
                toCurrency: toCurrency,
                originalAmount: amount,
                lastUpdate: ratesData.lastUpdate
            };
        } catch (error) {
            console.error('Erro na conversão:', error);
            
            // Fallback para taxas padrão
            return this.convertWithDefaultRates(amount, fromCurrency, toCurrency);
        }
    }

    // Converter usando taxas padrão (fallback)
    convertWithDefaultRates(amount, fromCurrency, toCurrency) {
        // Carregar taxas padrão do arquivo JSON
        const defaultRates = window.currencyData?.defaultRates || {
            USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.50,
            CAD: 1.37, AUD: 1.55, CHF: 0.88, CNY: 7.28,
            BRL: 4.95, MXN: 17.45
        };

        if (!defaultRates[fromCurrency] || !defaultRates[toCurrency]) {
            throw new Error('Moeda não suportada em modo offline');
        }

        const rate = defaultRates[toCurrency] / defaultRates[fromCurrency];
        
        return {
            amount: amount * rate,
            rate: rate,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            originalAmount: amount,
            lastUpdate: new Date(),
            isOffline: true
        };
    }

    // Verificar se o cache é válido
    isCacheValid(baseCurrency) {
        const cached = this.cache.rates[baseCurrency];
        
        if (!cached) return false;
        
        const now = new Date().getTime();
        const cacheAge = now - cached.timestamp;
        
        return cacheAge < this.cache.cacheDuration;
    }

    // Obter lista de moedas suportadas
    getSupportedCurrencies() {
        return window.currencyData?.currencies || [
            { code: 'USD', name: 'Dólar Americano', flag: 'us' },
            { code: 'EUR', name: 'Euro', flag: 'eu' },
            { code: 'GBP', name: 'Libra Esterlina', flag: 'gb' },
            { code: 'JPY', name: 'Iene Japonês', flag: 'jp' },
            { code: 'CAD', name: 'Dólar Canadense', flag: 'ca' },
            { code: 'AUD', name: 'Dólar Australiano', flag: 'au' },
            { code: 'CHF', name: 'Franco Suíço', flag: 'ch' },
            { code: 'CNY', name: 'Yuan Chinês', flag: 'cn' },
            { code: 'BRL', name: 'Real Brasileiro', flag: 'br' },
            { code: 'MXN', name: 'Peso Mexicano', flag: 'mx' }
        ];
    }

    // Obter informações de uma moeda específica
    getCurrencyInfo(currencyCode) {
        const currencies = this.getSupportedCurrencies();
        return currencies.find(currency => currency.code === currencyCode);
    }
}

// Criar instância global do serviço
const exchangeService = new ExchangeRateService();