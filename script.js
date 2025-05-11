// CONTAGEM REGRESSIVA
const contador = document.getElementById("contador");
const dataCasamento = new Date("2025-09-06T00:00:00").getTime();

const atualizarContador = () => {
  const agora = new Date().getTime();
  const diferenca = dataCasamento - agora;

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  contador.innerHTML = `${dias} dias, ${horas}h ${minutos}m ${segundos}s`;
};

setInterval(atualizarContador, 1000);
atualizarContador();

// MOSTRAR/ESCONDER CAMPO DE PARCEIRO
function toggleParceiro() {
  const select = document.getElementById("casal");
  const container = document.getElementById("parceiroContainer");
  container.style.display = select.value === "sim" ? "block" : "none";
}

// FORMULÁRIO DE CONFIRMAÇÃO
const form = document.getElementById("rsvpForm");
const lista = document.getElementById("lista-confirmados");
const scriptURL = "https://script.google.com/macros/s/AKfycbxomisvyvDzuM_EVDQKgJAV5nSZi9NO8r9fmQrrEclXKuw3edkIlNShfJ_bFinwzakTxA/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const tipoConvite = form.casal.value === "sim" ? "Casal" : "Individual";
  const parceiro = tipoConvite === "Casal" ? form.parceiro.value.trim() : "";

  if (!nome) {
    alert("Por favor, insira o seu nome.");
    return;
  }

  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("tipoConvite", tipoConvite);
  formData.append("parceiro", parceiro);

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData,
    });

    const res = await response.json();

    if (res.status === "ok") {
      alert("Confirmação enviada com sucesso!");
      form.reset();
      document.getElementById("parceiroContainer").style.display = "none";
      carregarConfirmados();
    } else {
      alert("Erro ao enviar confirmação.");
    }
  } catch (err) {
    console.error("Erro de conexão:", err);
    alert("Erro de conexão. Tente novamente.");
  }
});

// CARREGAR CONFIRMADOS DA PLANILHA (com limite e botão Ver mais)
let dadosConfirmados = [];
let mostrandoTodos = false;

async function carregarConfirmados() {
  try {
    const response = await fetch(scriptURL);
    dadosConfirmados = await response.json();
    atualizarListaConfirmados();
  } catch (err) {
    console.error("Erro ao carregar confirmados:", err);
  }
}

function atualizarListaConfirmados() {
  lista.innerHTML = "";

  const max = mostrandoTodos ? dadosConfirmados.length : 7;

  dadosConfirmados.slice(0, max).forEach(({ nome, tipoConvite, parceiro }) => {
    const item = document.createElement("li");
    item.textContent = tipoConvite === "Casal" && parceiro ? `${nome} & ${parceiro}` : nome;
    lista.appendChild(item);
  });

  // Botão "Ver mais"
  if (!mostrandoTodos && dadosConfirmados.length > 7) {
    const verMaisBtn = document.createElement("button");
    verMaisBtn.textContent = "Ver mais";
    verMaisBtn.style.marginTop = "10px";
    verMaisBtn.style.padding = "8px 16px";
    verMaisBtn.style.backgroundColor = "#b3924f";
    verMaisBtn.style.color = "#fff";
    verMaisBtn.style.border = "none";
    verMaisBtn.style.borderRadius = "4px";
    verMaisBtn.style.cursor = "pointer";

    verMaisBtn.addEventListener("click", () => {
      mostrandoTodos = true;
      atualizarListaConfirmados();
    });

    lista.appendChild(verMaisBtn);
  }
}

// ANIMAÇÃO DO TÍTULO
window.addEventListener("DOMContentLoaded", () => {
  const titulo = document.querySelector(".titulo-principal");
  titulo.style.opacity = 0;
  titulo.style.transition = "opacity 2s ease-in-out";
  setTimeout(() => {
    titulo.style.opacity = 1;
  }, 200);

  carregarConfirmados();
});

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('menuLinks').classList.toggle('show');
});
