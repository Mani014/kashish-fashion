const products=[
{id:1,name:"Pink Floral Lehenga",cat:"Bridal",price:4999,img:"assets/product-1.jpg"},
{id:2,name:"Magenta Royal Lehenga",cat:"Bridal",price:5999,img:"assets/product-2.jpg"},
{id:3,name:"Royal Girls Dress",cat:"Girls Wear",price:2499,img:"assets/product-1.jpg"},
{id:4,name:"Designer Party Dress",cat:"Girls Wear",price:1999,img:"assets/product-2.jpg"},
{id:5,name:"Kids Festive Outfit",cat:"Kids Wear",price:1499,img:"assets/product-1.jpg"},
{id:6,name:"Kids Celebration Dress",cat:"Kids Wear",price:1699,img:"assets/product-2.jpg"}
];
let currentFilter="All", cart=[];

const grid=document.getElementById("products");
function render(){
  grid.innerHTML="";
  products.filter(p=>currentFilter==="All"||p.cat===currentFilter).forEach(p=>{
    grid.insertAdjacentHTML("beforeend",`
    <article class="card">
      <div class="pic"><img src="${p.img}" alt="${p.name}">
        <button class="fav" onclick="toggleFav(this,${p.id})">♡</button>
      </div>
      <div class="info"><div class="cat">${p.cat}</div><h3>${p.name}</h3>
      <div class="price">₹${p.price.toLocaleString("en-IN")}</div>
      <button class="view" onclick="openProduct(${p.id})">VIEW PRODUCT</button></div>
    </article>`);
  });
}
function setFilter(f){
 currentFilter=f;
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===f));
 render(); location.hash="shop";
}
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>setFilter(b.dataset.filter)));
function toggleFav(btn,id){btn.textContent=btn.textContent==="♥"?"♡":"♥";}
const modal=document.getElementById("productModal");
function openProduct(id){
 const p=products.find(x=>x.id===id);
 document.getElementById("modalImg").src=p.img;
 document.getElementById("modalImg").alt=p.name;
 document.getElementById("modalCat").textContent=p.cat;
 document.getElementById("modalName").textContent=p.name;
 document.getElementById("modalPrice").textContent="₹"+p.price.toLocaleString("en-IN");
 document.getElementById("addCart").onclick=()=>{cart.push(p);renderCart();modal.classList.remove("show");document.getElementById("cart").classList.add("open")};
 document.getElementById("modalWa").href=waLink([p]);
 modal.classList.add("show");
}
document.getElementById("modalClose").onclick=()=>modal.classList.remove("show");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")});
document.getElementById("menu").onclick=()=>document.getElementById("drawer").classList.add("open");
document.getElementById("close").onclick=()=>document.getElementById("drawer").classList.remove("open");
document.querySelectorAll(".drawer a").forEach(a=>a.onclick=()=>document.getElementById("drawer").classList.remove("open"));
document.getElementById("wishlistBtn").onclick=()=>document.getElementById("cart").classList.toggle("open");
document.getElementById("savedNav").onclick=e=>{e.preventDefault();document.getElementById("cart").classList.toggle("open")};

function waLink(items){
 const lines=items.map(p=>`${p.name} - ₹${p.price}`).join("\n");
 const msg=`Namaste Kashish Fashion, mujhe ye product order karna hai:\n${lines}\n\nPlease confirm availability and delivery details.`;
 // Replace the number below with the showroom's WhatsApp number if needed.
 return "https://wa.me/917610603338?text="+encodeURIComponent(msg);
}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.length;
 document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cartItem"><span>${p.name}</span><b>₹${p.price}</b></div>`).join(""):"<p>Your cart is empty.</p>";
 document.getElementById("total").textContent=cart.reduce((s,p)=>s+p.price,0).toLocaleString("en-IN");
 document.getElementById("checkout").href=cart.length?waLink(cart):"#";
}
document.getElementById("wa").href=waLink([{name:"Kashish Fashion showroom enquiry",price:""}]);
renderCart(); render();
