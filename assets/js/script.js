(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
    var forms = document.getElementsByClassName('needs-validation');
    // Faz um loop neles e evita o envio
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

var array = [];

function adicionarAlimento(element) {
  let nomeLista = 'alimentos';
  array = JSON.parse(localStorage.getItem(nomeLista));
  if (array == null)
    array = [];
  let alimento = { id: pegarProximoId(array), nome: element.value };
  array.push(alimento);
  element.value = "";
  localStorage.setItem(nomeLista, JSON.stringify(array));

  atualizarTabelaAlimentos(array);
}

function atualizarTabelaAlimentos(array) {
  let tbody = document.getElementById("tbody");
  tbody.innerText = "";

  if (array == null)
    array = JSON.parse(localStorage.getItem('alimentos'));

  for (let i = 0; i < array.length; i++) {
    let tr = tbody.insertRow();

    let td_id = tr.insertCell();
    let td_nome = tr.insertCell();

    td_id.innerText = array[i].id;
    td_nome.innerText = array[i].nome;
  }
}

function adicionarParceiro(nomeLista) {
  array = JSON.parse(localStorage.getItem(nomeLista));
  if (array == null)
    array = [];

  let nomeParceiro = document.getElementById("nomeParceiro").value;
  let cidadeParceiro = document.getElementById("cidadeParceiro").value;
  let estadoParceiro = document.getElementById("estadoParceiro").value;
  let emailParceiro = document.getElementById("emailParceiro").value;
  // let imagemParceiro = document.getElementById("imagemParceiro").value;
  let descricao = document.getElementById("descricao").value;
  let telefoneParceiro = document.getElementById("telefoneParceiro").value;

  let parceiro = {
    id: pegarProximoId(array),
    nome: nomeParceiro,
    cidade: cidadeParceiro,
    estado: estadoParceiro,
    email: emailParceiro,
    // imagem: imagemParceiro,
    descricao: descricao,
    telefone: telefoneParceiro
  };

  array.push(parceiro);
  localStorage.setItem(nomeLista, JSON.stringify(array));

  // window.location.href = "/obrigado";

  atualizarTabelaParceiros();
}

function carregarDados() {
  let parceirosAtuais = [
    {
      id: 1,
      nome: "Fome Zero",
      telefone: "(61)18230-2414",
      cidade: "Brasília",
      estado: "DF",
      email: "fomezero@gov.br",
      descricao: "O Programa Fome Zero consistia num conjunto de mais de 30 programas complementares dedicados a combater as causas imediatas e subjacentes da fome e da insegurança alimentar, implementados pelo ou com o apoio do governo federal."
    },
    {
      id: 2,
      nome: "Bahia Sem Fome",
      telefone: "(77)18274-0182",
      cidade: "Salvador",
      estado: "BA",
      email: "combate.fome@casacivil.ba.gov.br",
      descricao: "O BAHIA SEM FOME é o Programa Estadual de Combate à Fome do Governo do Estado da Bahia, e tem como principal meta assegurar às pessoas em situação de vulnerabilidade social o acesso a alimentos em qualidade e quantidade necessárias à garantia do direito humano à alimentação adequada e saudável, bem como promover a segurança alimentar e nutricional, reduzindo os índices de insegurança alimentar grave no Estado da Bahia, com foco nas famílias extremamente pobres no campo e na cidade."
    },
    {
      id: 3,
      nome: "Instituto Lar",
      telefone: "(21)91274-1902",
      cidade: "Rio de Janeiro",
      estado: "RJ",
      email: "contato@institutolar.org.br",
      descricao: "O Instituto LAR é uma organização sem fins lucrativos, que nasceu em 2016, na cidade do Rio de Janeiro, para apoiar o processo de reinserção social de pessoas em situação de rua."
    }
  ];

  array = JSON.parse(localStorage.getItem('receptores'));
  if (array == null) {
    array = parceirosAtuais;
    localStorage.setItem('receptores', JSON.stringify(array));
  }

  atualizarTabelaParceiros(array);
}

function atualizarTabelaParceiros(parceiroArray) {
  let tbody = document.getElementById("tbody");
  tbody.innerText = "";

  if (parceiroArray == null)
    parceiroArray = JSON.parse(localStorage.getItem('receptores'));

  for (let i = 0; i < parceiroArray.length; i++) {
    let tr = tbody.insertRow();

    let td_id = tr.insertCell();
    let td_parceiro = tr.insertCell();
    let td_cidade = tr.insertCell();
    let td_estado = tr.insertCell();
    let td_email = tr.insertCell();
    let td_descricao = tr.insertCell();
    let td_telefone = tr.insertCell();

    td_id.innerText = parceiroArray[i].id;
    td_parceiro.innerText = parceiroArray[i].nome;
    td_cidade.innerText = parceiroArray[i].cidade;
    td_estado.innerText = parceiroArray[i].estado;
    td_email.innerText = parceiroArray[i].email;
    td_descricao.innerText = parceiroArray[i].descricao;
    td_telefone.innerText = parceiroArray[i].telefone;
  }



  if (parceiroArray != null) {
    let tabela = document.getElementById("listaReceptores");
    tabela.hidden = false;
  }
}

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('endereco').value = ("");
  document.getElementById('bairro').value = ("");
  document.getElementById('cidade').value = ("");
  document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('endereco').value = (conteudo.logradouro);
    document.getElementById('bairro').value = (conteudo.bairro);
    document.getElementById('cidade').value = (conteudo.localidade);
    document.getElementById('uf').value = (conteudo.uf);
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {

      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('endereco').value = "...";
      document.getElementById('bairro').value = "...";
      document.getElementById('cidade').value = "...";
      document.getElementById('uf').value = "...";

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);

    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
};

function pegarProximoId(array) {
  if (array == null)
    return 1;

  return array.length + 1;
}

function adicionarDoacao(nomeLista) {
  array = JSON.parse(localStorage.getItem(nomeLista));
  if (array == null)
    array = [];

  let primeiroNome = document.getElementById("primeiroNome").value;
  let sobrenome = document.getElementById("sobrenome").value;
  let email = document.getElementById("inputEmail3").value;
  let cep = document.getElementById("cep").value;
  let endereco = document.getElementById("endereco").value;
  let bairro = document.getElementById("bairro").value;
  let numero = document.getElementById("numero").value;
  let cidade = document.getElementById("cidade").value;
  let uf = document.getElementById("uf").value;
  let telefone = document.getElementById("validationCustom06").value;
  let inputReceptor = document.getElementById("inputReceptor").value;
  let inputAlimento = document.getElementById("inputAlimento").value;
  let dataValidade = document.getElementById("dataValidade").value;
  let quantidade = document.getElementById("quantidade").value;

  let doador = {
    id: pegarProximoId(array),
    primeiroNome: primeiroNome,
    sobrenome: sobrenome,
    estado: uf,
    email: email,
    cep: cep,
    endereco: endereco,
    bairro: bairro,
    numero: numero,
    cidade: cidade,
    uf: uf,
    telefone: telefone,
    receptor: inputReceptor,
    alimento: inputAlimento,
    dataValidade: dataValidade,
    quantidade: quantidade

  };

  array.push(doador);
  localStorage.setItem(nomeLista, JSON.stringify(array));

  window.location.href = "/obrigado.html";
}

function carregarSelects() {
  let selectReceptores = document.getElementById("inputReceptor");
  let receptoresArray = JSON.parse(localStorage.getItem('receptores'));
  for (let i = 0; i < receptoresArray.length; i++) {
    var opt = document.createElement("option");
    opt.value = receptoresArray[i].id; //index;
    opt.innerHTML = receptoresArray[i].nome;
    selectReceptores.appendChild(opt);
  }

  let selectAlimentos = document.getElementById("inputAlimento");
  let alimentosArray = JSON.parse(localStorage.getItem('alimentos'));
  for (let i = 0; i < alimentosArray.length; i++) {
    var opt = document.createElement("option");
    opt.value = alimentosArray[i].id; //index;
    opt.innerHTML = alimentosArray[i].nome;

    selectAlimentos.appendChild(opt);
  }
}