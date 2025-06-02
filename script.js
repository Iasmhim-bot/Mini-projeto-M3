let produtos = [];
let editIndex = null;

const formCadastro = document.getElementById("formCadastro");
const listaProdutos = document.getElementById("listaProdutos");
const cardsContainer = document.getElementById("cardsContainer");

formCadastro.addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;

  if (editIndex !== null) {
    produtos[editIndex] = { nome, descricao };
    editIndex = null;
  } else {
    produtos.push({ nome, descricao });
  }

  formCadastro.reset();
  atualizarLista();
  atualizarCards();
});

function atualizarLista() {
  listaProdutos.innerHTML = "";
  produtos.forEach((produto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${produto.nome}</strong>: ${produto.descricao}</span>
      <span>
        <button onclick="editarProduto(${index})">Editar</button>
        <button onclick="deletarProduto(${index})">Excluir</button>
      </span>
    `;
    listaProdutos.appendChild(li);
  });
}

function atualizarCards() {
  cardsContainer.innerHTML = "";
  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${produto.nome}</h3><p>${produto.descricao}</p>`;
    cardsContainer.appendChild(card);
  });
}

function editarProduto(index) {
  const produto = produtos[index];
  document.getElementById("nome").value = produto.nome;
  document.getElementById("descricao").value = produto.descricao;
  editIndex = index;
}

function deletarProduto(index) {
  produtos.splice(index, 1);
  atualizarLista();
  atualizarCards();
}

function mostrarTela(tela) {
  document.querySelectorAll(".tela").forEach(el => el.classList.add("hidden"));
  document.getElementById(tela).classList.remove("hidden");
}