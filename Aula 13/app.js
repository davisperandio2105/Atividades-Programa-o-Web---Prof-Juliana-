const form = document.querySelector('#formCadastro');
const inputCEP = document.querySelector('#inputCEP');
const statusCEP = document.querySelector('#statusCEP');
const erroCEP = document.querySelector('#erroCEP');

function mostrarErro(inputId, erroId, msg) {
  document.querySelector(inputId).classList.add('campo-erro');
  document.querySelector(inputId).classList.remove('campo-ok');
  const span = document.querySelector(erroId);
  span.textContent = msg;
  span.classList.remove('oculto');
}

function limparErro(inputId, erroId) {
  document.querySelector(inputId).classList.remove('campo-erro');
  document.querySelector(inputId).classList.add('campo-ok');
  document.querySelector(erroId).classList.add('oculto');
}

function limparEndereco() {
  document.querySelector('#logradouro').value = '';
  document.querySelector('#bairro').value = '';
  document.querySelector('#cidade').value = '';
  document.querySelector('#uf').value = '';
}

async function buscarCEP(cep) {
  statusCEP.textContent = 'Buscando...';
  erroCEP.classList.add('oculto');
  inputCEP.classList.remove('campo-erro', 'campo-ok');
  
  const url = 'https://viacep.com.br/ws/' + cep + '/json/';
  
  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    
    if (dados.erro) {
      statusCEP.textContent = '';
      mostrarErro('#inputCEP', '#erroCEP', 'CEP nao encontrado');
      limparEndereco();
      return;
    }
    
    statusCEP.textContent = 'Endereco encontrado!';
    inputCEP.classList.add('campo-ok');
    
    document.querySelector('#logradouro').value = dados.logradouro || '';
    document.querySelector('#bairro').value = dados.bairro || '';
    document.querySelector('#cidade').value = dados.localidade || '';
    document.querySelector('#uf').value = dados.uf || '';
    
  } catch (erro) {
    statusCEP.textContent = '';
    mostrarErro('#inputCEP', '#erroCEP', 'Erro de conexao');
    limparEndereco();
  }
}

inputCEP.addEventListener('focus', function() {
  statusCEP.textContent = '';
  limparErro('#inputCEP', '#erroCEP');
  limparEndereco();
});

inputCEP.addEventListener('blur', function() {
  const cep = inputCEP.value.trim();
  
  if (cep === '') {
    mostrarErro('#inputCEP', '#erroCEP', 'CEP obrigatorio');
    limparEndereco();
    return;
  }
  
  if (isNaN(cep) || cep.length !== 8) {
    mostrarErro('#inputCEP', '#erroCEP', 'CEP: 8 digitos numericos');
    limparEndereco();
    return;
  }
  
  buscarCEP(cep);
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const logradouro = document.querySelector('#logradouro').value;
  const inputNumero = document.querySelector('#inputNumero');
  
  if (logradouro === '') {
    mostrarErro('#inputCEP', '#erroCEP', 'Busque um CEP valido primeiro');
    inputCEP.focus();
    return;
  }
  
  if (inputNumero.value.trim() === '') {
    mostrarErro('#inputNumero', '#erroNumero', 'Numero obrigatorio');
    inputNumero.focus();
    return;
  }
  
  const endereco = logradouro + ', ' + inputNumero.value.trim() + ' - ' +
                   document.querySelector('#cidade').value + '/' + 
                   document.querySelector('#uf').value;
                   
  alert('Endereco confirmado:\n' + endereco);
});