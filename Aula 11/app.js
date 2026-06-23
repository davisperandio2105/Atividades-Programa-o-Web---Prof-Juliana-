const form = document.querySelector('#formCadastro');
const inputNome = document.querySelector('#inputNome');
const erroNome = document.querySelector('#erroNome');
const lista = document.querySelector('#lista');

let contador = 0;

inputNome.setAttribute('autocomplete', 'off');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  cadastrar();
});

function cadastrar() {
  const nome = inputNome.value.trim();

  if (nome === '') {
    erroNome.classList.remove('oculto');
    return;
  }

  erroNome.classList.add('oculto');
  contador++;

  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-id', contador);

  const texto = document.createElement('span');
  texto.textContent = '#' + card.getAttribute('data-id') + ' - ' + nome;

  const btn = document.createElement('button');
  btn.textContent = 'Excluir';
  btn.classList.add('btn-excluir');

  btn.addEventListener('click', function () {
    btn.parentElement.remove();
  });

  card.appendChild(texto);
  card.appendChild(btn);
  lista.appendChild(card);

  inputNome.value = '';
  inputNome.focus();
}