// Configuração dos gráficos para a análise de perfil
class ChartConfig {
    constructor() {
        this.colors = {
            conservative: '#4c6ef5',
            moderate: '#12b886',
            aggressive: '#fa5252',
            equity: '#4c6ef5',
            fixedIncome: '#12b886',
            alternatives: '#fa5252'
        };
    }

    // Configuração do gráfico de alocação (doughnut)
    getAllocationChartConfig(allocationData) {
        return {
            type: 'doughnut',
            data: {
                labels: ['Ações', 'Renda Fixa', 'Alternativos'],
                datasets: [{
                    data: [
                        allocationData.equity,
                        allocationData.fixedIncome,
                        allocationData.alternatives
                    ],
                    backgroundColor: [
                        this.colors.equity,
                        this.colors.fixedIncome,
                        this.colors.alternatives
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12,
                                family: "'Segoe UI', sans-serif"
                            },
                            color: '#2d3748'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                cutout: '65%'
            }
        };
    }

    // Configuração do gráfico de comparação de perfis
    getComparisonChartConfig(profiles) {
        return {
            type: 'bar',
            data: {
                labels: profiles.map(p => p.name),
                datasets: [{
                    label: 'Nível de Risco',
                    data: profiles.map(p => this.getRiskLevelValue(p.riskLevel)),
                    backgroundColor: profiles.map(p => this.colors[p.name.toLowerCase()]),
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    borderRadius: 8,
                    barPercentage: 0.6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Nível: ${context.raw}/10`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2,
                            callback: function(value) {
                                if (value === 0) return 'Muito Baixo';
                                if (value === 2) return 'Baixo';
                                if (value === 4) return 'Moderado';
                                if (value === 6) return 'Médio';
                                if (value === 8) return 'Alto';
                                if (value === 10) return 'Muito Alto';
                                return '';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        };
    }

    // Configuração do gráfico de evolução do score
    getScoreEvolutionChartConfig(history) {
        const dates = history.map(item => 
            new Date(item.timestamp).toLocaleDateString('pt-BR')
        ).reverse();
        
        const scores = history.map(item => item.profile.score).reverse();
        const profileTypes = history.map(item => item.profile.type).reverse();
        
        return {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Score de Risco',
                    data: scores,
                    borderColor: this.colors.conservative,
                    backgroundColor: 'rgba(76, 110, 245, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: profileTypes.map(type => this.colors[type]),
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Score: ${context.raw}/100`;
                            },
                            afterLabel: function(context) {
                                const index = context.dataIndex;
                                const profile = history[history.length - 1 - index].profile.name;
                                return `Perfil: ${profile}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '/100';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        };
    }

    // Configuração do gráfico radar para características
    getRadarChartConfig(profile) {
        return {
            type: 'radar',
            data: {
                labels: [
                    'Tolerância a Risco',
                    'Retorno Esperado', 
                    'Volatilidade',
                    'Liquidez',
                    'Horizonte',
                    'Diversificação'
                ],
                datasets: [{
                    label: profile.name,
                    data: [
                        this.getRiskLevelValue(profile.characteristics.riskTolerance) * 10,
                        this.getReturnValue(profile.characteristics.expectedReturn) * 10,
                        this.getVolatilityValue(profile.characteristics.volatility) * 10,
                        this.getLiquidityValue(profile.characteristics.liquidity) * 10,
                        70, // Horizonte - valor padrão
                        80  // Diversificação - valor padrão
                    ],
                    backgroundColor: this.getColorWithOpacity(profile.name.toLowerCase(), 0.2),
                    borderColor: this.colors[profile.name.toLowerCase()],
                    borderWidth: 2,
                    pointBackgroundColor: this.colors[profile.name.toLowerCase()],
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            display: false,
                            stepSize: 20
                        },
                        pointLabels: {
                            font: {
                                size: 11,
                                family: "'Segoe UI', sans-serif"
                            },
                            color: '#4a5568'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        };
    }

    // Métodos auxiliares
    getRiskLevelValue(riskLevel) {
        switch(riskLevel) {
            case 'Muito Baixa': return 1;
            case 'Baixa': return 3;
            case 'Média': return 5;
            case 'Alta': return 7;
            case 'Muito Alta': return 9;
            default: return 5;
        }
    }

    getReturnValue(returnLevel) {
        switch(returnLevel) {
            case 'Baixo': return 3;
            case 'Moderado': return 5;
            case 'Alto': return 7;
            case 'Muito Alto': return 9;
            default: return 5;
        }
    }

    getVolatilityValue(volatility) {
        switch(volatility) {
            case 'Muito Baixa': return 1;
            case 'Baixa': return 3;
            case 'Média': return 5;
            case 'Alta': return 7;
            case 'Muito Alta': return 9;
            default: return 5;
        }
    }

    getLiquidityValue(liquidity) {
        switch(liquidity) {
            case 'Baixa': return 3;
            case 'Moderada': return 5;
            case 'Alta': return 7;
            case 'Muito Alta': return 9;
            default: return 5;
        }
    }

    getColorWithOpacity(colorName, opacity) {
        const colors = {
            conservative: 'rgba(76, 110, 245, ' + opacity + ')',
            moderate: 'rgba(18, 184, 134, ' + opacity + ')',
            aggressive: 'rgba(250, 82, 82, ' + opacity + ')'
        };
        return colors[colorName] || 'rgba(0, 0, 0, ' + opacity + ')';
    }
}

// Criar instância global do configurador de gráficos
const chartConfig = new ChartConfig();