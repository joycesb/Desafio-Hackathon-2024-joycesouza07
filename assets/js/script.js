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
}) ();

var array = [];

function adicionarAlimento(element, nomeLista) {
  array = JSON.parse(localStorage.getItem(nomeLista));
  if (array == null)
    array = [];
  let adicionar = element.value;// document.getElementById(element.id).value;
  array.push(adicionar);
  element.value = "";
  localStorage.setItem(nomeLista, JSON.stringify(array));
}

function adicionarParceiro(element, nomeParceiro) {
  array = JSON.parse(localStorage.getItem())
}

function atualizarTabela() {
  let nomeParceiro = document.getElementById("nomeParceiro").value;
  let cidade = document.getElementById("cidadeParceiro").value;
  let estado = document.getElementById("estadoParceiro").value;
  let descricao = document.getElementById("descricao").value;
  let telefone = document.getElementById("telefone").value;

  var parceiroArray = [
    nomeParceiro,
    cidade,
    estado,
    descricao,
    telefone
  ];

  console.log(JSON.stringify(parceiro));
  let tbody = document.getElementById("tbody");
  tbody.innerText = "";

  for (let i = 0; i < parceiroArray.length; i++) {
    let tr = tbody.insertRow();

    let td_parceiro = tr.insertCell();
    let td_cidade = tr.insertCell();
    let td_estado = tr.insertCell();
    let td_descricao = tr.insertCell();
    let td_telefone = tr.insertCell();

    td_parceiro.innerText = this.parceiroArray[i].nomeParceiro;
    td_cidade.innerText = this.parceiroArray[i].cidade;
    td_estado.innerText = this.parceiroArray[i].estado;
    td_descricao.innerText = this.parceiroArray[i].descricao;
    td_telefone.innerText = this.parceiroArray[i].telefone;


  }

}

function mostrar(listaId, nomeLista) {
  // populateSelect();
  let lista = document.getElementById(listaId);
  lista.innerHTML = "";
  array = JSON.parse(localStorage.getItem(nomeLista));

  for (var i in array) {
    let p = document.createElement("p");
    p.innerHTML = array[i];
    lista.append(p);
  }
}

// let listaAlimentos = [
//   { "id": "001", "nome_alimento": "Arroz" },
//   { "id": "002", "nome_alimento": "Feijão" },
//   { "id": "003", "nome_alimento": "Macarrão" },
// ];

// function populateSelect() {
//   let ele = document.getElementById('nome');
//   for (let i = 0; i < listaAlimentos.length; i++) {
//     ele.innerHTML = ele.innerHTML +
//       '<option value="' + listaAlimentos[i]['id'] + '">' + listaAlimentos[i]['nome_alimento'] + '</option>';
//   }
// }

// function show(ele) {
//   let msg = document.getElementById('msg');
//   msg.innerHTML = 'Selecione o alimento: <b>' + ele.options[ele.selectedIndex].text + '</b> </br>' +
//     'id: <b>' + ele.value + '</b>';
// }

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

  debugger
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
