const formulario = document.querySelector("#formProduto");
const nomeProduto = document.querySelector("#nomeProduto");
const precoProduto = document.querySelector("#precoProduto");
const quantidadeProduto = document.querySelector("#quantidadeProduto");
const listaProdutos = document.querySelector("#listaProdutos");
const contador = document.querySelector("#contador");
const listaVazia = document.querySelector("#listaVazia");
const botaoFormulario = document.querySelector("#botaoFormulario");
const mensagemErro = document.querySelector("#mensagemErro");

let produtoEditando = null;

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = nomeProduto.value.trim();
    const preco = parseFloat(precoProduto.value);
    const quantidade = parseInt(quantidadeProduto.value);
    
    if (quantidade <= 0 || isNaN(quantidade)) {
        mensagemErro.textContent = "A quantidade deve ser maior que zero.";
        return;
    }
    mensagemErro.textContent = "";
    
    if (produtoEditando !== null) {
        atualizarProduto(
            produtoEditando,
            nome,
            preco,
            quantidade
        );
        produtoEditando = null;
        botaoFormulario.textContent = "Adicionar produto";
    } else {
        adicionarProduto(
            nome,
            preco,
            quantidade
        );
    }
    formulario.reset();
    atualizarContador();
    verificarListaVazia();
});

function adicionarProduto(nome, preco, quantidade) {
    const item = document.createElement("li");
    item.classList.add("item-produto");
    
    const informacoes = document.createElement("div");
    informacoes.classList.add("info-produto");
    const textoProduto = document.createElement("span");
    textoProduto.textContent =
        `${nome} - R$ ${preco.toFixed(2).replace(".", ",")} (${quantidade} un.)`;
    informacoes.appendChild(textoProduto);
    
    const botoes = document.createElement("div");
    botoes.classList.add("botoes");
    
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("botao-editar");
    botaoEditar.addEventListener("click", function() {
        nomeProduto.value = nome;
        precoProduto.value = preco;
        quantidadeProduto.value = quantidade;
        produtoEditando = {
            item: item,
            texto: textoProduto
        };
        botaoFormulario.textContent = "Salvar alterações";
        nomeProduto.focus();
    });
    
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("botao-remover");
    botaoRemover.addEventListener("click", function() {
        
        if (
            produtoEditando !== null &&
            produtoEditando.item === item
        ) {
            produtoEditando = null;
            formulario.reset();
            botaoFormulario.textContent =
                "Adicionar produto";
        }
        item.remove();
        atualizarContador();
        verificarListaVazia();
    });
    botoes.appendChild(botaoEditar);
    botoes.appendChild(botaoRemover);
    item.appendChild(informacoes);
    item.appendChild(botoes);
    listaProdutos.appendChild(item);
}

function atualizarProduto(produto, nome, preco, quantidade) {
    produto.texto.textContent =
        `${nome} - R$ ${preco.toFixed(2).replace(".", ",")} (${quantidade} un.)`;
    
    produto.item.dataset.nome = nome;
    produto.item.dataset.preco = preco;
    produto.item.dataset.quantidade = quantidade;
    produto.item.querySelector(".botao-editar").onclick =
        function() {
            nomeProduto.value = produto.item.dataset.nome;
            precoProduto.value = produto.item.dataset.preco;
            quantidadeProduto.value =
                produto.item.dataset.quantidade;
            produtoEditando = {
                item: produto.item,
                texto: produto.texto
            };
            botaoFormulario.textContent =
                "Salvar alterações";
            nomeProduto.focus();
        };
}

function atualizarContador() {
    const quantidade = listaProdutos.children.length;
    contador.textContent =
        `Produtos cadastrados: ${quantidade}`;
}

function verificarListaVazia() {
    if (listaProdutos.children.length === 0) {
        listaVazia.style.display = "block";
    } else {
        listaVazia.style.display = "none";
    }
}

atualizarContador();
verificarListaVazia();
