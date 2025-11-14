const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

let data_atual = new Date();
let data_selecionada = new Date();

function renderizar() {
    const ano = data_atual.getFullYear();
    const mes = data_atual.getMonth();
    
    document.getElementById('mes').textContent = `${meses[mes]} ${ano}`;
    
    const primeiro_dia = new Date(ano, mes, 1).getDay();
    const dias_mes = new Date(ano, mes + 1, 0).getDate();
    const dias_mes_anterior = new Date(ano, mes, 0).getDate();
    
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    // Dias mês anterior
    for (let i = primeiro_dia - 1; i >= 0; i--) {
        const d = document.createElement('div');
        d.className = 'day-cell other';
        d.textContent = dias_mes_anterior - i;
        grid.appendChild(d);
    }
    
    // Dias mês atual
    for (let dia = 1; dia <= dias_mes; dia++) {
        const d = document.createElement('div');
        d.className = 'day-cell';
        d.textContent = dia;
        
        const date_obj = new Date(ano, mes, dia);
        const hoje = new Date();
        
        if (date_obj.toDateString() === hoje.toDateString()) {
            d.classList.add('today');
        }
        
        if (date_obj.toDateString() === data_selecionada.toDateString()) {
            d.classList.add('selected');
        }
        
        d.onclick = () => {
            data_selecionada = date_obj;
            renderizar();
        };
        
        grid.appendChild(d);
    }
    
    // Dias próximo mês
    const total = grid.children.length;
    const faltam = 42 - total;
    for (let i = 1; i <= faltam; i++) {
        const d = document.createElement('div');
        d.className = 'day-cell other';
        d.textContent = i;
        grid.appendChild(d);
    }
    
    // Atualizar data selecionada
    const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const data_str = data_selecionada.toLocaleDateString('pt-BR', opcoes);
    document.getElementById('data').textContent = data_str;
}

document.getElementById('prev').onclick = () => {
    data_atual.setMonth(data_atual.getMonth() - 1);
    renderizar();
};

document.getElementById('next').onclick = () => {
    data_atual.setMonth(data_atual.getMonth() + 1);
    renderizar();
};

document.getElementById('hoje').onclick = () => {
    data_atual = new Date();
    data_selecionada = new Date();
    renderizar();
};

renderizar();

