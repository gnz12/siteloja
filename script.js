const produtos=[
{
    nome: "Camisa Brasil Amarela I 26/27",
    preco: 149.90,
    categoria:"masculino",
    // Agora temos uma lista de imagens
    imagens: ["brasilmasculino/camisa1.jpg", "brasilmasculino/camisa1-2.jpg", "brasilmasculino/camisa1-3.jpg", "brasilmasculino/camisa1-4.jpg"],
    estoque: { P: 5, M: 5, G: 10, GG: 6 }
  },
{
 nome:"Camisa Brasil Jordan II 26/27",
 preco:149.90,
 categoria:"masculino",
 imagens: ["brasilmasculino/camisa2.jpg", "brasilmasculino/azul2.jpg", "brasilmasculino/azul3.jpg", "brasilmasculino/azul4.jpg"],
 estoque:{P:5,M:5,G:10,GG:6}
},
{
 nome:"Camisa Brasil Amarela I Jogador 26/27",
 categoria:"masculino",
 preco:209.90,
 imagens: ["brasilmasculino/camisajogador2.jpg", "brasilmasculino/amajogador5.jpg", "brasilmasculino/amajogador2.jpg", "brasilmasculino/amajogador3.jpg", "brasilmasculino/amajogador4.jpg", "brasilmasculino/amajogador6.jpg"],
 estoque:{P:5,M:5,G:10,GG:6}
},
{
 nome:"Camisa Brasil Jordan II Jogador 26/27",
 preco:209.90,
 categoria:"masculino",
 imagens: ["brasilmasculino/camisetajogador1.jpg", "brasilmasculino/azuljogador5.jpg", "brasilmasculino/azuljogador2.jpg", "brasilmasculino/azuljogador3.jpg", "brasilmasculino/azuljogador4.jpg"],
 estoque:{P:5,M:5,G:10,GG:6}
},
{
 nome:"Camisa Brasil I Torcedora 2026/27",
 preco:149.90,
 categoria:"feminino",
 imagens: ["brasilfeminino/femininamarela.jpg", "brasilfeminino/femininaama1.jpg", "brasilfeminino/femininaama2.jpg", "brasilfeminino/femininaama3.jpg", "brasilfeminino/femininaama4.jpg", "brasilfeminino/femininaama5.jpg" ],
 estoque:{P:5,M:5,G:10,GG:6}
},
{
 nome:"Camisa Brasil Jordan II Torcedora 2026/27",
 preco:149.90,
 categoria:"feminino",
 imagens: ["brasilfeminino/feminina1.jpg", "brasilfeminino/feminina2.jpg", "brasilfeminino/feminina3.jpg", "brasilfeminino/feminina4.jpg", "brasilfeminino/feminina5.jpg"],
 estoque:{P:5,M:5,G:10,GG:6}
},

{
 nome:"Camisa Corinthians I 25/26",
 categoria:"masculino",
 time:"corinthians",
 preco:109.90,
 imagens:["corinthians/corinthiansbranca1.jpg", "corinthians/corinthiansbranca2.jpg", "corinthians/corinthiansbranca3.jpg", "corinthians/corinthiansbranca5.jpg"],
 estoque:{P:5,M:5,G:10,GG:6}
},

{
 nome:"Camisa Corinthians II 25/26",
 categoria:"masculino",
 time:"corinthians",
 preco:109.90,
 imagens:["corinthians/corinthianspreta1.jpg", "corinthians/corinthianspreta2.jpg", "corinthians/corinthianspreta3.jpg", "corinthians/corinthianspreta4.jpg", "corinthians/corinthianspreta5.jpg"],
 estoque:{P:5,M:5,G:10,GG:6}
},

{
 nome:"Camisa Milan I 25/26",
 categoria:"masculino",
 time:"milan",
 preco:149.90,
 imagens:["milan/milan.jpg", "milan/milan2.jpg", "milan/milan3.jpg", "milan/milan4.jpg", "milan/milan5.jpg", "milan/milan6.jpg", "milan/milan7.jpg"],
 estoque:{P:5,M:5,G:10,GG:6}
},

];

let carrinho=[];

function render(categoria = null, time = null){

 let html="";

 let lista = produtos;

 if(categoria){
   lista = lista.filter(p => p.categoria === categoria);
 }

 if(time){
   lista = lista.filter(p => p.time === time);
 }

 lista.forEach((p)=>{

 let i = produtos.indexOf(p);

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

function abrirMenu(){
    document.getElementById('sidebar')
    .classList.add('open');
}

function fecharMenu(){
    document.getElementById('sidebar')
    .classList.remove('open');
}