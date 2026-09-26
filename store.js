const PRODUCT={id:'classic-tee',name:'Classic Cotton T-Shirt',price:199};
const WA='917620194100';
const $=id=>document.getElementById(id);
const getCart=()=>{try{return JSON.parse(localStorage.getItem('shCart')||'[]')}catch{return []}};
const setCart=x=>localStorage.setItem('shCart',JSON.stringify(x));
const getUser=()=>localStorage.getItem('shCustomerEmail')||'';
function msg(s){if($('authStatus'))$('authStatus').textContent=s;}

$('addCart')?.addEventListener('click',()=>{
  const size=$('size')?.value||'M';
  const qty=Number($('qty')?.value||1);
  if(!Number.isInteger(qty)||qty<1||qty>10){if($('status'))$('status').textContent='Quantity 1 se 10 ke beech rakhein.';return;}
  const cart=getCart(); const found=cart.find(x=>x.id===PRODUCT.id&&x.size===size);
  if(found) found.qty=Math.min(10,found.qty+qty); else cart.push({...PRODUCT,size,qty});
  setCart(cart);
  if($('status'))$('status').textContent=`${PRODUCT.name} (${size}) cart mein add ho gaya.`;
});

function render(){
  if(!$('cartItems')) return;
  const c=getCart(); $('cartItems').replaceChildren();
  if(!c.length){$('cartItems').textContent='Your cart is empty.';}
  c.forEach(item=>{const p=document.createElement('p');p.textContent=`${item.name} | Size ${item.size} | ${item.qty} × ₹${item.price}`;$('cartItems').append(p)});
  $('total').textContent='₹'+c.reduce((sum,x)=>sum+x.qty*x.price,0);
}
render();
$('clearCart')?.addEventListener('click',()=>{setCart([]);render();});

// Simple browser-only customer session for the static GitHub version.
$('register')?.addEventListener('click',()=>{
  const email=$('email')?.value.trim().toLowerCase(); const password=$('password')?.value||'';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<6){msg('Valid email aur minimum 6-character password enter karein.');return;}
  localStorage.setItem('shCustomerEmail',email); msg('Account created / signed in: '+email);
});
$('login')?.addEventListener('click',()=>{
  const email=$('email')?.value.trim().toLowerCase(); const password=$('password')?.value||'';
  if(!email||password.length<6){msg('Email aur minimum 6-character password enter karein.');return;}
  localStorage.setItem('shCustomerEmail',email); msg('Login successful: '+email);
});
$('logout')?.addEventListener('click',()=>{localStorage.removeItem('shCustomerEmail');msg('Logged out.');});
if($('authStatus')&&getUser()) $('authStatus').textContent='Signed in: '+getUser();

$('pay')?.addEventListener('click',()=>{
  const status=$('checkoutStatus'); const c=getCart();
  if(!c.length){status.textContent='Pehle product cart mein add karein.';return;}
  if(!getUser()){status.textContent='Pehle Customer Login/Register karein.';return;}
  const name=$('customerName').value.trim(),phone=$('phone').value.trim(),address=$('address').value.trim(),pincode=$('pincode').value.trim();
  if(!name||!/^[0-9]{10}$/.test(phone)||address.length<10||!/^[0-9]{6}$/.test(pincode)){status.textContent='Name, 10-digit mobile, full address aur 6-digit PIN bharein.';return;}
  const total=c.reduce((s,x)=>s+x.qty*x.price,0);
  const items=c.map(x=>`${x.name} - Size ${x.size} - Qty ${x.qty} - ₹${x.price*x.qty}`).join('%0A');
  const text=`Hello Shantanu Hargode,%0A%0ANew Order:%0A${items}%0A%0ATotal: ₹${total}%0A%0ACustomer: ${encodeURIComponent(name)}%0AMobile: ${encodeURIComponent(phone)}%0AAddress: ${encodeURIComponent(address)}%0APIN: ${encodeURIComponent(pincode)}%0AEmail: ${encodeURIComponent(getUser())}%0A%0APayment: Cash/UPI to be confirmed with shop.`;
  window.open(`https://wa.me/${WA}?text=${text}`,'_blank');
  status.textContent='WhatsApp order message open ho gaya. Shop se order/payment confirmation lein.';
});
