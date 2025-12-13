// Serviço de Análise de Perfil de Investidor
class InvestorProfileService {
    constructor() {
        this.profiles = window.investorData?.profiles || {};
        this.strategies = window.investorData?.investmentStrategies || {};
        this.questions = window.investorData?.questions || {};
        this.results = [];
    }

    // Calcular perfil baseado nas respostas
    calculateProfile(formData) {
        let score = 0;
        
        // 1. Idade (jovens podem assumir mais risco)
        const age = parseInt(formData.age);
        if (age <= 25) score += 20;
        else if (age <= 35) score += 15;
        else if (age <= 45) score += 10;
        else if (age <= 55) score += 5;
        // 56+ adiciona 0
        
        // 2. Tolerância ao risco
        switch(formData.riskTolerance) {
            case 'low': score += 0; break;
            case 'medium': score += 25; break;
            case 'high': score += 50; break;
        }
        
        // 3. Conhecimento
        switch(formData.knowledge) {
            case 'beginner': score += 0; break;
            case 'intermediate': score += 10; break;
            case 'advanced': score += 20; break;
        }
        
        // 4. Horizonte de investimento
        const horizon = parseInt(formData.investmentHorizon);
        if (horizon <= 3) score += 0;
        else if (horizon <= 7) score += 10;
        else score += 20;
        
        // 5. Relação Patrimônio/Renda (quem tem mais patrimônio pode arriscar mais)
        const income = parseFloat(formData.annualIncome);
        const assets = parseFloat(formData.totalAssets);
        const ratio = assets / income;
        
        if (ratio <= 1) score += 0;
        else if (ratio <= 5) score += 5;
        else score += 10;
        
        // Ajustar para ficar entre 0 e 100
        score = Math.max(0, Math.min(100, score));
        
        return score;
    }

    // Determinar tipo de perfil baseado no score
    determineProfileType(score) {
        if (score <= 40) return 'conservative';
        else if (score <= 70) return 'moderate';
        else return 'aggressive';
    }

    // Gerar análise completa
    generateAnalysis(formData) {
        const score = this.calculateProfile(formData);
        const profileType = this.determineProfileType(score);
        const profile = this.profiles[profileType];
        const strategy = this.strategies[profileType];
        
        // Calcular horizonte recomendado
        const recommendedHorizon = this.calculateRecommendedHorizon(
            parseInt(formData.age), 
            parseInt(formData.investmentHorizon),
            profileType
        );
        
        // Calcular volatilidade esperada
        const volatility = this.calculateVolatility(profileType);
        
        // Calcular objetivo principal baseado nos goals selecionados
        const mainGoal = this.determineMainGoal(formData.goals || []);
        
        const analysis = {
            personalInfo: {
                name: formData.name,
                age: formData.age,
                income: formData.annualIncome,
                assets: formData.totalAssets
            },
            profile: {
                type: profileType,
                name: profile.name,
                score: score,
                description: profile.description,
                characteristics: profile.characteristics
            },
            recommendations: {
                main: strategy.recommendation,
                allocation: strategy.allocation,
                strategies: strategy.strategies,
                products: strategy.products,
                horizon: recommendedHorizon,
                volatility: volatility,
                mainGoal: mainGoal
            },
            timestamp: new Date().toISOString(),
            analysisId: this.generateAnalysisId()
        };
        
        // Salvar no histórico
        this.saveToHistory(analysis);
        
        return analysis;
    }

    // Calcular horizonte recomendado
    calculateRecommendedHorizon(age, currentHorizon, profileType) {
        const baseHorizon = Math.max(currentHorizon, 5);
        
        switch(profileType) {
            case 'conservative':
                return baseHorizon <= 5 ? "Curto Prazo" : "Médio Prazo";
            case 'moderate':
                return baseHorizon <= 7 ? "Médio Prazo" : "Longo Prazo";
            case 'aggressive':
                return "Longo Prazo";
            default:
                return "Médio Prazo";
        }
    }

    // Calcular volatilidade esperada
    calculateVolatility(profileType) {
        switch(profileType) {
            case 'conservative': return "Baixa";
            case 'moderate': return "Média";
            case 'aggressive': return "Alta";
            default: return "Média";
        }
    }

    // Determinar objetivo principal
    determineMainGoal(goals) {
        if (goals.length === 0) return "Preservação de Capital";
        
        // Priorizar goals na ordem de importância
        const priority = ['preservation', 'income', 'growth', 'speculation'];
        
        for (const goal of priority) {
            if (goals.includes(goal)) {
                switch(goal) {
                    case 'preservation': return "Preservação de Capital";
                    case 'income': return "Geração de Renda";
                    case 'growth': return "Crescimento do Capital";
                    case 'speculation': return "Especulação/Alta Rentabilidade";
                }
            }
        }
        
        return "Preservação de Capital";
    }

    // Gerar ID único para análise
    generateAnalysisId() {
        return 'inv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Salvar análise no histórico
    saveToHistory(analysis) {
        if (!localStorage.getItem('investorAnalysisHistory')) {
            localStorage.setItem('investorAnalysisHistory', JSON.stringify([]));
        }
        
        const history = JSON.parse(localStorage.getItem('investorAnalysisHistory'));
        history.unshift(analysis);
        
        // Manter apenas as últimas 10 análises
        if (history.length > 10) {
            history.pop();
        }
        
        localStorage.setItem('investorAnalysisHistory', JSON.stringify(history));
        this.results = history;
    }

    // Obter histórico de análises
    getHistory() {
        const history = localStorage.getItem('investorAnalysisHistory');
        return history ? JSON.parse(history) : [];
    }

    // Exportar análise como PDF (simulado)
    exportToPDF(analysis) {
        // Em uma implementação real, isso seria integrado com uma biblioteca de PDF
        console.log("Exportando análise para PDF:", analysis);
        
        // Simulação de download
        const dataStr = JSON.stringify(analysis, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `analise-investidor-${analysis.analysisId}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        return true;
    }

    // Obter comparação entre perfis
    getProfileComparison() {
        return Object.values(this.profiles).map(profile => ({
            name: profile.name,
            description: profile.description,
            riskLevel: profile.characteristics.riskTolerance,
            expectedReturn: profile.characteristics.expectedReturn
        }));
    }

    // Obter estatísticas do usuário
    getUserStatistics() {
        const history = this.getHistory();
        
        if (history.length === 0) {
            return null;
        }
        
        const latestScore = history[0].profile.score;
        const averageScore = history.reduce((sum, item) => sum + item.profile.score, 0) / history.length;
        const mostCommonProfile = this.getMostCommonProfile(history);
        
        return {
            totalAnalyses: history.length,
            latestScore: latestScore,
            averageScore: Math.round(averageScore),
            mostCommonProfile: mostCommonProfile,
            lastAnalysisDate: new Date(history[0].timestamp).toLocaleDateString('pt-BR')
        };
    }

    // Obter perfil mais comum no histórico
    getMostCommonProfile(history) {
        const profileCounts = {};
        
        history.forEach(item => {
            const profile = item.profile.type;
            profileCounts[profile] = (profileCounts[profile] || 0) + 1;
        });
        
        let mostCommon = null;
        let maxCount = 0;
        
        for (const [profile, count] of Object.entries(profileCounts)) {
            if (count > maxCount) {
                mostCommon = profile;
                maxCount = count;
            }
        }
        
        return mostCommon;
    }
}

// Criar instância global do serviço
const investorService = new InvestorProfileService();