const form = document.getElementById('pokemon-form');
const input = document.getElementById('pokemon-input');
const mensagem = document.getElementById('mensagem');
const card = document.getElementById('pokemon-card');
const img = document.getElementById('pokemon-img');
const nome = document.getElementById('pokemon-nome');
const tipos = document.getElementById('pokemon-tipos');
const stats = document.getElementById('pokemon-stats');
const coresTipos = {
  fire: 'danger', water: 'primary', grass: 'success', electric: 'warning',
  ice: 'info', poison: 'secondary', bug: 'success', ghost: 'dark',
  psychic: 'danger', fighting: 'danger', rock: 'secondary', ground: 'warning',
  normal: 'secondary', flying: 'info', dragon: 'primary', dark: 'dark',
  steel: 'secondary', fairy: 'danger'
};
function mostrarMensagem(texto, tipo) {
  mensagem.innerHTML = `<div class="alert alert-${tipo} text-center">${texto}</div>`;
}
function preencherCard(dados) {
  img.src = dados.sprites.front_default;
  img.alt = `Imagem de ${dados.name}`;
  nome.textContent = dados.name;
  tipos.innerHTML = '';
  dados.types.forEach(t => {
    const cor = coresTipos[t.type.name] || 'secondary';
    const badge = document.createElement('span');
    badge.className = `badge text-bg-${cor} me-1 text-capitalize`;
    badge.textContent = t.type.name;
    tipos.appendChild(badge);
  });
  const nomesStats = { hp: 'HP', attack: 'Ataque', defense: 'Defesa' };
  stats.innerHTML = '';
  dados.stats
    .filter(s => nomesStats[s.stat.name])
    .forEach(s => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between';
      li.innerHTML = `<span>${nomesStats[s.stat.name]}</span><strong>${s.base_stat}</strong>`;
      stats.appendChild(li);
    });
  card.classList.remove('d-none');
}
async function buscarPokemon(evento) {
  evento.preventDefault();
  const termo = input.value.toLowerCase().trim();
  if (termo === '') {
    card.classList.add('d-none');
    mostrarMensagem('NOME DO BIXU', 'warning');
    return;
  }
  mostrarMensagem('NA VERDATCHI...', 'info');
  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);
    if (!resposta.ok) {
      card.classList.add('d-none');
      mostrarMensagem('NAO ACHAMO O BIXU', 'danger');
      return;
    }
    const dados = await resposta.json();
    preencherCard(dados);
    mostrarMensagem(`BIXU encontrado: ${dados.name}!`, 'success');
  } catch (erro) {
    console.error(erro);
    card.classList.add('d-none');
    mostrarMensagem('POBRE!', 'danger');
  } finally {
    input.value = '';
    input.focus();
  }
}
form.addEventListener('submit', buscarPokemon);
