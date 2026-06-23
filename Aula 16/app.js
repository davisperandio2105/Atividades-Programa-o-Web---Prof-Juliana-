const form = document.querySelector('#formCadastro');
const inputNome = document.querySelector('#inputNome');
const inputEmail = document.querySelector('#inputEmail');
const inputJogo = document.querySelector('#inputJogo'); // Desafio 2
const inputNumero = document.querySelector('#inputNumero');
const inputCEP = document.querySelector('#inputCEP');

const statusCEP = document.querySelector('#statusCEP');
const textoStatusCEP = document.querySelector('#textoStatusCEP');
const spinnerCEP = document.querySelector('#spinnerCEP'); // Desafio 3
const erroCEP = document.querySelector('#erroCEP');

const mensagemSucesso = document.querySelector('#mensagemSucesso');
const mensagemErro = document.querySelector('#mensagemErro');

async function buscarCEP(cep) {
  // Ativa o spinner e exibe mensagem
  textoStatusCEP.textContent = 'Buscando servidor...';
  spinnerCEP.classList.remove('d-none');
  erroCEP.classList.add('d-none');
  inputCEP.classList.remove('is-invalid', 'is-valid');
  
  try {
    const resposta = await fetch('https://viacep.com.br/ws/' + cep + '/json/');
    const dados = await resposta.json();
    
    // Desativa o spinner
    spinnerCEP.classList.add('d-none');

    if (dados.erro) {
      textoStatusCEP.textContent = '';
      inputCEP.classList.add('is-invalid');
      erroCEP.classList.remove('d-none');
      return;
    }
    
    textoStatusCEP.textContent = 'Endereço localizado no radar.';
    inputCEP.classList.add('is-valid');
    
    document.querySelector('#logradouro').value = dados.logradouro || '';
    document.querySelector('#bairro').value = dados.bairro || '';
    document.querySelector('#cidade').value = dados.localidade || '';
    document.querySelector('#uf').value = dados.uf || '';
    
  } catch (e) {
    spinnerCEP.classList.add('d-none');
    textoStatusCEP.textContent = '';
    inputCEP.classList.add('is-invalid');
    erroCEP.textContent = 'Erro de conexão.';
    erroCEP.classList.remove('d-none');
  }
}

inputCEP.addEventListener('blur', function() {
  const cep = inputCEP.value.trim();
  if (cep.length === 8 && !isNaN(cep)) {
    buscarCEP(cep);
  } else if (cep !== '') {
    inputCEP.classList.add('is-invalid');
    erroCEP.textContent = 'CEP: 8 dígitos numéricos.';
    erroCEP.classList.remove('d-none');
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();
  const jogo = inputJogo.value;
  const logradouro = document.querySelector('#logradouro').value;
  const numero = inputNumero.value.trim();
  
  let formValido = true;

  // Reset de validações visuais
  [inputNome, inputEmail, inputJogo, inputNumero].forEach(input => {
    input.classList.remove('is-invalid');
    const erroDiv = document.querySelector(`#erro${input.id.replace('input', '')}`);
    if (erroDiv) erroDiv.classList.add('d-none');
  });

  if (nome === '') {
    inputNome.classList.add('is-invalid');
    document.querySelector('#erroNome').classList.remove('d-none');
    formValido = false;
  }

  // Desafio 1: Validação de E-mail
  if (email === '' || !email.includes('@') || !email.includes('.')) {
    inputEmail.classList.add('is-invalid');
    document.querySelector('#erroEmail').classList.remove('d-none');
    formValido = false;
  }

  if (jogo === '') {
    inputJogo.classList.add('is-invalid');
    document.querySelector('#erroJogo').classList.remove('d-none');
    formValido = false;
  }

  if (numero === '') {
    inputNumero.classList.add('is-invalid');
    document.querySelector('#erroNumero').classList.remove('d-none');
    formValido = false;
  }

  if (logradouro === '') {
    inputCEP.classList.add('is-invalid');
    formValido = false;
  }

  if (!formValido) {
    mensagemErro.classList.remove('d-none');
    mensagemSucesso.classList.add('d-none');
    return;
  }
  
  mensagemSucesso.textContent = `GG! Inscrição confirmada. Boa sorte no torneio, ${nome}!`;
  mensagemSucesso.classList.remove('d-none');
  mensagemErro.classList.add('d-none');
  
  // Limpar form opcionalmente
  form.reset();
  textoStatusCEP.textContent = '';
  [inputNome, inputEmail, inputJogo, inputCEP, inputNumero].forEach(input => input.classList.remove('is-valid'));
});