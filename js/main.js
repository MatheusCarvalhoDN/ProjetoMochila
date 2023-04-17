// Selecionando o formulário e a lista a partir do seu ID
const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")

// Carregando a lista de itens salvos anteriormente no localStorage ou inicializando com um array vazio
const itens = JSON.parse(localStorage.getItem("itens")) || []

// Percorrendo a lista de itens carregados e criando elementos HTML para cada item usando a função criaElemento()
itens.forEach((elemento) => {
   criaElemento(elemento) 
})

// Adicionando um ouvinte de eventos para o evento de envio do formulário
form.addEventListener("submit", (evento) => {
    evento.preventDefault() // Prevenindo o comportamento padrão de envio do formulário

    // Obtendo os valores dos campos de entrada de nome e quantidade
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    // Verificando se o item já existe na lista
    const existe = itens.find(elemento => elemento.nome == nome.value)

    // Criando um objeto com as informações do item atual
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    // Verificando se a quantidade do item está em valor negativo
    if (quantidade.value < 0) {
        alert ("Você não pode digitar um número negativo!!") 
    }

    // Caso o item já exista na lista, atualiza-se o elemento, caso contrário, cria-se um novo elemento
    if (existe) {
        itemAtual.id = existe.id
        
        // Atualizando o elemento na lista com as informações mais recentes
        atualizaElemento(itemAtual)

        // Substituindo o item anterior pelo novo na lista de itens
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        // Definindo um novo id para o item
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
        
        // Criando um novo elemento HTML para o item
        criaElemento(itemAtual)
        
        // Adicionando o item à lista de itens
        itens.push(itemAtual) 
    }

    // Salvando a lista atualizada de itens no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))

    // Limpa os campos de entrada de nome e quantidade
    nome.value = ""
    quantidade.value = ""
})

// Função para criar um novo elemento HTML para o item
function criaElemento(item) {
   const novoItem = document.createElement("li")
   novoItem.classList.add("item")

   const numeroItem = document.createElement("strong")
   numeroItem.innerHTML = item.quantidade
   numeroItem.dataset.id = item.id
   novoItem.appendChild(numeroItem)
   
   novoItem.innerHTML += item.nome

   novoItem.appendChild(botaoDeleta(item.id))

   lista.appendChild(novoItem)
}

// Função para atualizar um elemento HTML existente na lista
function atualizaElemento (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

// Função para criar um botão de deletar e adicionar o evento de deletar
function botaoDeleta (id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode,id)
    })

    return elementoBotao
}

// Função para deletar um elemento da lista e do localStorage
function deletaElemento(tag,id){
    tag.remove() // Remove o elemento HTML
    
    itens.splice(itens.findIndex(elemento => elemento.id === id),1) //Procura o item e remove

    localStorage.setItem("itens", JSON.stringify(itens)) //Transforma em String
}


