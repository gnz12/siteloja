const produtos=[
{
    nome: "Camisa Brasil Amarela I 26/27",
    preco: 149.90,
    categoria:"masculino",
    // Agora temos uma lista de imagens
    imagens: ["imagens/camisa1.jpg", "imagens/camisa1-2.jpg", "imagens/camisa1-3.jpg", "imagens/camisa1-4.jpg"],
    estoque: { P: 5, M: 5, G: 10, GG: 6 }
  },
{
 nome:"Camisa Brasil Jordan II 26/27",
 preco:149.90,
 categoria:"masculino",
 imagens: ["imagens/camisa2.jpg", "imagens/azul2.jpg", "imagens/azul3.jpg", "imagens/azul4.jpg"],
 estoque:{P:5,M:5,G:10,GG:6}
},
{
 nome:"Camisa Brasil Amarela I Jogador 26/27",
 categoria:"masculino",
 preco:209.90,
 imagens: ["imagens/camisajogador2.jpg", "imagens/amajogador5.jpg", "imagens/amajogador2.jpg", "imagens/amajogador3.jpg", "imagens/amajogador4.jpg", "imagens/amajogador6.jpg"],
 estoque:{P:5,M:5,G:10,GG:6}
},
{
 nome:"Camisa Brasil Jordan II Jogador 26/27",
 preco:209.90,
 categoria:"masculino",
 imagens: ["imagens/camisetajogador1.jpg", "imagens/azuljogador5.jpg", "imagens/azuljogador2.jpg", "imagens/azuljogador3.jpg", "imagens/azuljogador4.jpg"],
 estoque:{P:5,M:5,G:10,GG:6}
},
{
 nome:"Camisa Brasil I Torcedora 2026/27",
 preco:149.90,
 categoria:"feminino",
 imagens: ["imagens/femininamarela.jpg", "imagens/femininaama1.jpg", "imagens/femininaama2.jpg", "imagens/femininaama3.jpg", "imagens/femininaama4.jpg", "imagens/femininaama5.jpg" ],
 estoque:{P:5,M:5,G:10,GG:6}
},
{
 nome:"Camisa Brasil Jordan II Torcedora 2026/27",
 preco:149.90,
 categoria:"feminino",
 imagens: ["imagens/feminina1.jpg", "imagens/feminina2.jpg", "imagens/feminina3.jpg", "imagens/feminina4.jpg", "imagens/feminina5.jpg"],
 estoque:{P:5,M:5,G:10,GG:6}
}
];

let carrinho=[];

function render(categoria = null){

 let html="";

 let lista = categoria
 ? produtos.filter(p => p.categoria === categoria)
 : produtos;

 lista.forEach((p,i)=>{

  let tamanhos = Object.keys(p.estoque)
  .map(t => `${t}(${p.estoque[t]})`)
  .join(' • ');

  let op = Object.keys(p.estoque)
  .map(t => `<option>${t}</option>`)
  .join('');

  html+=`
<div class="card">

 <div class="carousel" onclick="abrirProduto(${i})">
  
  <button class="prev" onclick="event.stopPropagation(); trocar(${i}, -1)">❮</button>
  
  <img id="img-${i}" src="${p.imagens[0]}">

  <button class="next" onclick="event.stopPropagation(); trocar(${i}, 1)">❯</button>

 </div>

 <h3>${p.nome}</h3>
 <div class="price">R$ ${p.preco}</div>
 <div class="stock">${tamanhos}</div>
 ${Object.values(p.estoque).some(qtd => qtd > 0) ? `
    <select id="s${i}">${op}</select>
    <button onclick="add(${i})">
        Adicionar ao carrinho
    </button>
` : `
    <div class="esgotado">
        ❌ Produto esgotado
    </div>
`}

</div>`;
 });

 document.getElementById('products').innerHTML=html;
}

function add(i){
 let size=document.getElementById(`s${i}`).value;

 if(produtos[i].estoque[size]>0){

  produtos[i].estoque[size]--;

  carrinho.push({
    nome:produtos[i].nome,
    size,
    preco:produtos[i].preco,
    index:i
  });

  updateCart();
render();

mostrarToast('✅ Item adicionado ao carrinho!');

 }else mostrarToast('❌ Produto esgotado');
}

function remover(index){
 let item=carrinho[index];

 produtos[item.index].estoque[item.size]++;

 carrinho.splice(index,1);

 updateCart();
 render();
}

function updateCart(){
 document.getElementById('count').innerText=carrinho.length;

 let html="";
 let total=0;

 carrinho.forEach((p,i)=>{
  total+=p.preco;

  html+=`
  <div class='cart-item'>
   ${p.nome} - ${p.size} - R$ ${p.preco}
   <button onclick="remover(${i})">❌</button>
  </div>`;
 });

 html+=`<hr><strong>Total: R$ ${total.toFixed(2)}</strong>`;

 document.getElementById('cartItems').innerHTML=html;
}

function toggleCart(){
 document.getElementById('cart').classList.toggle('open');
}

function finalizar(){

 let msg = "Olá! Quero finalizar minha compra:%0A%0A";

 carrinho.forEach(p=>{

  msg += `Produto: ${p.nome}%0A`;
  msg += `Tamanho: ${p.size}%0A`;
  msg += `Preço: R$ ${p.preco}%0A%0A`;

 });

 msg += "Quero finalizar o pedido!";

 window.open(
  `https://wa.me/5515998443835?text=${msg}`,
  '_blank'
 );

}

render();

let indexImagem = {};

function trocar(i, direcao){
 if(!indexImagem[i]) indexImagem[i] = 0;

 indexImagem[i] += direcao;

 if(indexImagem[i] < 0)
  indexImagem[i] = produtos[i].imagens.length - 1;

 if(indexImagem[i] >= produtos[i].imagens.length)
  indexImagem[i] = 0;

 document.getElementById(`img-${i}`).src =
  produtos[i].imagens[indexImagem[i]];
}

function mostrarToast(msg){

 const toast = document.getElementById('toast');

 toast.innerText = msg;

 toast.classList.add('show');

 setTimeout(()=>{
   toast.classList.remove('show');
 },2000);

}