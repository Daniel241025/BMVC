// ============================================================
// INICIALIZAÇÃO E VARIÁVEIS GLOBAIS
// ============================================================

const pageState = {
    visitSeconds: 0,
    totalVisits: parseInt(localStorage.getItem('totalVisits')) || 1,
    colorCount: parseInt(localStorage.getItem('colorCount')) || 0,
    isDarkMode: localStorage.getItem('darkMode') === 'true',
    currentColor: localStorage.getItem('currentColor') || 'default'
};

// Cores disponíveis para ciclo
const colorSchemes = [
    { name: 'default', primary: '#2c3e50', secondary: '#3498db' },
    { name: 'sunset', primary: '#e74c3c', secondary: '#e67e22' },
    { name: 'forest', primary: '#27ae60', secondary: '#2ecc71' },
    { name: 'ocean', primary: '#2980b9', secondary: '#3498db' },
    { name: 'purple', primary: '#8e44ad', secondary: '#9b59b6' },
    { name: 'magenta', primary: '#c0392b', secondary: '#e74c3c' }
];

// ============================================================
// INICIALIZAÇÃO DO DOCUMENTO
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeTime();
    initializeCounter();
    attachEventListeners();
    updateStatistics();
    
    console.log('🚀 Página carregada com sucesso!');
});

// ============================================================
// TEMA ESCURO/CLARO
// ============================================================

function initializeTheme() {
    if (pageState.isDarkMode) {
        document.body.classList.add('dark-mode');
        updateThemeButton();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    pageState.isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', pageState.isDarkMode);
    updateThemeButton();
    console.log('🌓 Tema alternado para:', pageState.isDarkMode ? 'Escuro' : 'Claro');
}

function updateThemeButton() {
    const themeBtn = document.getElementById('theme-toggle');
    const activeThemeSpan = document.getElementById('active-theme');
    
    if (pageState.isDarkMode) {
        themeBtn.innerHTML = '<span class="btn-icon">☀️</span> Modo Claro';
        activeThemeSpan.textContent = 'Escuro';
    } else {
        themeBtn.innerHTML = '<span class="btn-icon">🌙</span> Modo Escuro';
        activeThemeSpan.textContent = 'Claro';
    }
}

// ============================================================
// EXIBIÇÃO DE HORA E DATA
// ============================================================

function initializeTime() {
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 1000);
}

function updateTimeDisplay() {
    const now = new Date();
    
    // Hora formatada
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
    };
    const timeString = now.toLocaleString('pt-BR', timeOptions);
    document.getElementById('current-time').textContent = timeString;
    
    // Data formatada
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleString('pt-BR', dateOptions);
    document.getElementById('current-date').textContent = dateString.charAt(0).toUpperCase() + dateString.slice(1);
}

// ============================================================
// CONTADOR DE VISITA
// ============================================================

function initializeCounter() {
    pageState.visitSeconds = 0;
    updateCounterDisplay();
    
    setInterval(function() {
        pageState.visitSeconds++;
        updateCounterDisplay();
    }, 1000);
}

function updateCounterDisplay() {
    const counter = document.getElementById('visit-counter');
    const minutes = Math.floor(pageState.visitSeconds / 60);
    const seconds = pageState.visitSeconds % 60;
    
    if (minutes > 0) {
        counter.textContent = `${minutes}m ${seconds}s`;
    } else {
        counter.textContent = `${pageState.visitSeconds}s`;
    }
}

function resetCounter() {
    pageState.visitSeconds = 0;
    updateCounterDisplay();
    showNotification('Contador resetado! ⏱️');
    console.log('🔄 Contador resetado');
}

// ============================================================
// MUDANÇA DE COR
// ============================================================

function changeColor() {
    // Encontrar o próximo esquema de cor
    const currentIndex = colorSchemes.findIndex(c => c.name === pageState.currentColor);
    const nextIndex = (currentIndex + 1) % colorSchemes.length;
    const nextColor = colorSchemes[nextIndex];
    
    // Aplicar as cores
    document.documentElement.style.setProperty('--primary-color', nextColor.primary);
    document.documentElement.style.setProperty('--secondary-color', nextColor.secondary);
    
    // Atualizar estado
    pageState.currentColor = nextColor.name;
    pageState.colorCount++;
    
    // Salvar no localStorage
    localStorage.setItem('currentColor', pageState.currentColor);
    localStorage.setItem('colorCount', pageState.colorCount);
    
    // Atualizar UI
    updateStatistics();
    showNotification(`Cor alterada para: ${nextColor.name.toUpperCase()} 🎨`);
    console.log('🎨 Cor alterada para:', nextColor.name);
}

// ============================================================
// ESTATÍSTICAS
// ============================================================

function updateStatistics() {
    document.getElementById('total-visits').textContent = pageState.totalVisits;
    document.getElementById('color-count').textContent = pageState.colorCount;
    document.getElementById('active-theme').textContent = pageState.isDarkMode ? 'Escuro' : 'Claro';
}

// ============================================================
// LISTENERS DE EVENTOS
// ============================================================

function attachEventListeners() {
    // Botão de tema
    document.getElementById('theme-toggle').addEventListener('click', function() {
        toggleTheme();
    });
    
    // Botão de cor
    document.getElementById('change-color').addEventListener('click', function() {
        changeColor();
    });
    
    // Botão de reset
    document.getElementById('reset-counter').addEventListener('click', function() {
        resetCounter();
    });
    
    // Detectar inatividade
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
}

// ============================================================
// NOTIFICAÇÕES E FEEDBACK
// ============================================================

function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================================
// TIMER DE INATIVIDADE
// ============================================================

let inactivityTimeout;

function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    
    inactivityTimeout = setTimeout(function() {
        // Ação após 5 minutos de inatividade
        console.log('⏱️ Usuário inativo por 5 minutos');
    }, 5 * 60 * 1000);
}

// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================

function getFormattedDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('pt-BR', options);
}

function getFormattedTime() {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return new Date().toLocaleTimeString('pt-BR', options);
}

// ============================================================
// INICIALIZAR SESSÃO
// ============================================================

// Incrementar visitas quando a página for carregada
window.addEventListener('load', function() {
    pageState.totalVisits++;
    localStorage.setItem('totalVisits', pageState.totalVisits);
    updateStatistics();
    console.log('📊 Total de visitas:', pageState.totalVisits);
});

// Salvar estado quando a página for fechada
window.addEventListener('beforeunload', function() {
    localStorage.setItem('lastVisit', new Date().toISOString());
    console.log('💾 Estado salvo');
});

// ============================================================
// ADICIONAR ESTILOS PARA ANIMAÇÕES
// ============================================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('%c🎉 Sistema BMVC Ativo!', 'color: #3498db; font-size: 16px; font-weight: bold;');
