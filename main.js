const SB_URL = 'https://gxilpichncruvnzepmrn.supabase.co';
  const SB_KEY = 'sb_publishable_UbWOTV84a9epmwwAHVg7BA_SgF1f0A2';
  const WA_NUM = '5493484200611';
  const ADMIN_PASS = 'puffins2024';

  // Local images hardcoded
  const LOCAL_IMGS = {
  "Elfbar 30K|Watermelon Ice": "images/watermelon_ice.webp",
  "Elfbar 30K|Strawberry Watermelon Ice": "images/strawberry_watermelon_ice.webp",
  "Elfbar 30K|Miami Mint": "images/miami_mint.png",
  "Elfbar 30K|Bubbaloo Grape": "images/bubbaloo_grape.webp",
  "Elfbar 30K|Cherry Strazz": "images/cherry_strazz.jpg",
  "Elfbar 30K|Americano Ice": "images/americano_ice.jpg",
  "Elfbar Trio 40K|Blue Razz Ice": "images/blue_razz_ice.avif",
  "Elfbar Trio 40K|La Grape": "images/la_grape.png",
  "Elfbar Ice King 40K|Sour Apple Ice": "images/sour_apple_ice.jpg",
  "Elfbar Ice King 40K|Miami Mint": "images/miami_mint.jpg",
  "Elfbar Ice King 40K|Tigers Blood": "images/tigers_blood.jpg",
  "Elfbar Ice King 40K|Cherry Strazz": "images/cherry_strazz.webp",
  "Elfbar Ice King 40K|Blue Razz Ice": "images/blue_razz_ice.jpg",
  "Elfbar Ice King 40K|Sour Strawberry Dragonfruit": "images/sour_strawberry_dragonfruit.webp",
  "Elfbar Ice King 40K|Cherry Fuse": "images/cherry_fuse.png",
  "Elfbar Ice King 40K|Green Apple Ice": "images/green_apple_ice.webp",
  "Elfbar Ice King 40K|Grape Ice": "images/grape_ice.png",
  "Elfbar Ice King 40K|Green Apple Slush": "images/green_apple_slush.webp",
  "Elfbar Ice King 40K|Baja Splash": "images/baja_splash.png",
  "Elfbar Sour King 40K|Sour Blue Razz Ice": "images/sour_blue_razz_ice.webp",
  "Elfbar Sour King 40K|Cítrico": "images/citrico.png",
  "Elfbar Sour King 40K|Sour Island": "images/sour_island.png",
  "Elfbar Sour King 40K|Sour Peach Raspberry": "images/sour_peach_raspberry.png",
  "Ignite V155|Watermelon Ice": "images/watermelon_ice.webp",
  "Ignite V155|Strawberry Kiwi": "images/strawberry_kiwi.avif",
  "Ignite V155|Strawberry Ice": "images/strawberry_ice.webp",
  "Ignite V155|Blueberry Ice": "images/blueberry_ice.jpg",
  "Ignite V155|Grape Ice": "images/grape_ice.webp",
  "Ignite V300|Watermelon Ice": "images/watermelon_ice.png",
  "Ignite V400|Cherry Watermelon": "images/cherry_watermelon.webp",
  "Ignite V400|Blue Raspberry Ice": "images/blue_raspberry_ice.png",
  "Ignite V400|Ice Mint": "images/ice_mint.png",
  "Ignite V400|Grape Ice": "images/grape_ice.webp",
  "Ignite V400|Strawberry Ice": "images/strawberry_ice.png",
};

  let stockData = {};
  let cart = [];

  function enterSite() {
    const gate = document.getElementById('age-gate');
    const site = document.getElementById('site');
    gate.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    gate.style.opacity = '0'; gate.style.transform = 'scale(0.96)';
    setTimeout(() => {
      gate.style.display = 'none';
      site.style.display = 'flex'; site.style.opacity = '1'; site.style.pointerEvents = 'all';
      site.classList.add('visible');
      document.querySelector('.wa-float').style.display = 'flex';
      loadStock();
    }, 600);
  }
  function rejectUser() {
    document.getElementById('age-gate').style.display = 'none';
    document.getElementById('rejected').classList.add('show');
  }
  function openCatalog() {
    const site = document.getElementById('site');
    site.style.transition = 'opacity 0.4s ease'; site.style.opacity = '0';
    setTimeout(() => { site.style.display='none'; document.getElementById('catalog').classList.add('visible'); }, 400);
  }
  function backToHome() {
    const site = document.getElementById('site');
    document.getElementById('catalog').classList.remove('visible');
    site.style.display='flex'; setTimeout(() => site.style.opacity='1', 20);
  }
  function showBrand(index, btn) {
    document.querySelectorAll('.brand-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.brand-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('brand-'+index).classList.add('active');
  }
  function openNosotros() {
    const site = document.getElementById('site');
    site.style.transition='opacity 0.4s ease'; site.style.opacity='0';
    setTimeout(() => { site.style.display='none'; document.getElementById('nosotros').classList.add('visible'); }, 400);
  }
  function closeNosotros() {
    const site = document.getElementById('site');
    document.getElementById('nosotros').classList.remove('visible');
    site.style.display='flex'; setTimeout(() => site.style.opacity='1', 20);
  }
  function openContacto() {
    const site = document.getElementById('site');
    site.style.transition='opacity 0.4s ease'; site.style.opacity='0';
    setTimeout(() => { site.style.display='none'; document.getElementById('contacto').classList.add('visible'); }, 400);
  }
  function closeContacto() {
    const site = document.getElementById('site');
    document.getElementById('contacto').classList.remove('visible');
    site.style.display='flex'; setTimeout(() => site.style.opacity='1', 20);
  }
  function openCart() {
    document.getElementById('cartOverlay').classList.add('open');
    document.body.style.overflow='hidden';
    document.querySelector('.wa-float').style.display = 'none';
  }
  function closeCart() {
    document.getElementById('cartOverlay').classList.remove('open');
    document.body.style.overflow='';
    document.querySelector('.wa-float').style.display = 'flex';
  }
  function closeCartOnBg(e) { if(e.target===document.getElementById('cartOverlay')) closeCart(); }
  function addToCartWithStock(brand, puffs, flavor, price, btnEl) {
    const key = brand+'|'+flavor;
    if(stockData[key] && stockData[key].stock <= 0) return;
    addToCart(brand, puffs, flavor, price, btnEl);
  }
  function addToCart(brand, puffs, flavor, price, btnEl) {
    const key = brand+'|'+flavor;
    const existing = cart.find(i => i.key===key);
    if(existing) { existing.qty++; } else { cart.push({key,brand,puffs,flavor,price,qty:1}); }
    btnEl.textContent='✓ Agregado'; btnEl.classList.add('added');
    setTimeout(() => { btnEl.textContent='+ Agregar al carrito'; btnEl.classList.remove('added'); }, 1500);
    updateCart(); updateCartCount();
  }
  function changeQty(key, delta) {
    const item = cart.find(i => i.key===key);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0) cart = cart.filter(i => i.key!==key);
    updateCart(); updateCartCount();
  }
  function updateCart() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    const waBtn = document.getElementById('whatsappBtn');
    if(cart.length===0) {
      container.innerHTML='<div class="cart-empty"><div style="font-size:2.5rem;margin-bottom:0.75rem">🛒</div><div>Tu carrito está vacío</div></div>';
      totalEl.textContent='$0'; waBtn.href='#'; return;
    }
    let total=0;
    container.innerHTML = cart.map(item => {
      total += item.price * item.qty;
      return `<div class="cart-item"><div class="cart-item-info"><div class="cart-item-brand">${item.brand} · ${item.puffs}</div><div class="cart-item-flavor">${item.flavor}</div><div class="cart-item-price">$${(item.price*item.qty).toLocaleString('es-AR')}</div></div><div class="cart-item-qty"><button class="qty-btn" onclick="changeQty('${item.key}',-1)">−</button><span class="qty-num">${item.qty}</span><button class="qty-btn" onclick="changeQty('${item.key}',1)">+</button></div></div>`;
    }).join('');
    totalEl.textContent = '$'+total.toLocaleString('es-AR');
    let msg = 'Hola! Quiero hacer este pedido :)\n\n*Nuevo pedido - Puffins Vapes*\n\n';
    cart.forEach(item => { msg += `- ${item.brand} ${item.puffs} - ${item.flavor} x${item.qty} -> $${(item.price*item.qty).toLocaleString('es-AR')}\n`; });
    msg += `\n*Total: $${total.toLocaleString('es-AR')}*\nGracias!`;
    waBtn.href = 'https://wa.me/'+WA_NUM+'?text='+encodeURIComponent(msg);
  }
  function updateCartCount() {
    const total = cart.reduce((sum,i) => sum+i.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent=total);
  }
  async function loadStock() {
    try {
      const res = await fetch(`${SB_URL}/rest/v1/stock?select=*&order=marca.asc,sabor.asc`, {
        headers: {'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}`}
      });
      const data = await res.json();
      data.forEach(item => { stockData[item.marca+'|'+item.sabor] = item; });
      renderCatalog(data);
    } catch(e) { console.error('Stock error:', e); }
  }
  function renderCatalog(data) {
    const brands = {};
    data.filter(i => i.activo !== false).forEach(item => {
      if(!brands[item.marca]) brands[item.marca] = [];
      brands[item.marca].push(item);
    });
    const brandNames = Object.keys(brands);
    if(!brandNames.length) return;

    document.getElementById('brandTabs').innerHTML =
      `<button class="brand-tab active" onclick="showBrand('todos',this)">Todos</button>` +
      brandNames.map((b,i) => `<button class="brand-tab" onclick="showBrand(${i},this)">${b}</button>`).join('');

    function buildCard(item) {
      const imgSrc = LOCAL_IMGS[item.marca+'|'+item.sabor] || item.imagen || '';
      const imgHtml = imgSrc ? `<img class="product-img" src="${imgSrc}" alt="${item.sabor}"/>` : `<div class="product-img-placeholder" style="width:100%;height:140px;background:var(--salmon-pale);border-radius:10px;margin-bottom:8px;display:flex;align-items:center;justify-content:center;font-size:2rem;">📦</div>`;
      const badge = item.stock===0 ? `<div class="stock-badge stock-out">Sin stock</div>` : item.stock<=3 ? `<div class="stock-badge stock-low">Ultimas ${item.stock} unidades</div>` : `<div class="stock-badge stock-ok">${item.stock} disponibles</div>`;
      const disabled = item.stock<=0 ? 'disabled' : '';
      const btnText = item.stock<=0 ? 'Sin stock' : '+ Agregar al carrito';
      const cardClass = item.stock<=0 ? 'product-card out-of-stock' : 'product-card';
      return `<div class="${cardClass}">${imgHtml}<div class="product-flavor">${item.sabor}</div><div class="product-bottom"><span class="product-puffs">${item.puffs}</span><span class="product-price">$${item.precio.toLocaleString('es-AR')}</span></div>${badge}<button class="add-btn" ${disabled} onclick="addToCartWithStock('${item.marca}','${item.puffs}','${item.sabor}',${item.precio},this)">${btnText}</button></div>`;
    }

    const todosContent = brandNames.map(brand => {
      const products = brands[brand];
      return `<div style="margin-bottom:2rem;"><div class="brand-info"><span class="brand-info-name">${brand}</span><span class="brand-info-puffs">${products[0].puffs}</span></div><div class="products-grid">${products.map(item => buildCard(item)).join('')}</div></div>`;
    }).join('');

    const brandPanels = brandNames.map((brand,i) => {
      const products = brands[brand];
      return `<div class="brand-panel" id="brand-${i}"><div class="brand-info"><span class="brand-info-name">${brand}</span><span class="brand-info-puffs">${products[0].puffs}</span></div><div class="products-grid">${products.map(item => buildCard(item)).join('')}</div></div>`;
    }).join('');

    document.getElementById('catalogContent').innerHTML =
      `<div class="brand-panel active" id="brand-todos">${todosContent}</div>` + brandPanels;
  }


  function updateAllStockBadges() {
    document.querySelectorAll('.product-card').forEach(card => {
      const flavor = card.querySelector('.product-flavor')?.textContent;
      const addBtn = card.querySelector('.add-btn');
      if(!flavor||!addBtn) return;
      const brand = addBtn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
      if(!brand) return;
      const item = stockData[brand+'|'+flavor];
      if(!item) return;
      card.querySelector('.stock-badge')?.remove();
      const badge = document.createElement('div');
      badge.className = 'stock-badge';
      if(item.stock===0) { badge.className+=' stock-out'; badge.textContent='Sin stock'; addBtn.disabled=true; addBtn.textContent='Sin stock'; card.classList.add('out-of-stock'); }
      else if(item.stock<=3) { badge.className+=' stock-low'; badge.textContent=`Ultimas ${item.stock} unidades`; addBtn.disabled=false; addBtn.textContent='+ Agregar al carrito'; card.classList.remove('out-of-stock'); }
      else { badge.className+=' stock-ok'; badge.textContent=`${item.stock} disponibles`; addBtn.disabled=false; addBtn.textContent='+ Agregar al carrito'; card.classList.remove('out-of-stock'); }
      card.insertBefore(badge, addBtn);
    });
  }
  function openAdmin() {
    document.getElementById('adminPanel').style.display='flex';
    document.getElementById('adminLogin').style.display='block';
    document.getElementById('adminTable').style.display='none';
    document.getElementById('adminPass').value='';
    document.getElementById('loginError').style.display='none';
  }
  function closeAdmin() { document.getElementById('adminPanel').style.display='none'; }
  function checkAdmin() {
    if(document.getElementById('adminPass').value===ADMIN_PASS) {
      document.getElementById('adminLogin').style.display='none';
      document.getElementById('adminTable').style.display='block';
      renderAdminTable();
      loadResenasAdmin();
    } else { document.getElementById('loginError').style.display='block'; }
  }
  function renderAdminTable() {
    const tbody = document.getElementById('adminTableBody');
    tbody.innerHTML='';
    Object.values(stockData).sort((a,b)=>a.marca.localeCompare(b.marca)).forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML=`<td>${item.marca}</td><td>${item.sabor}</td><td style="color:var(--muted)">${item.puffs}</td><td>$${item.precio.toLocaleString('es-AR')}</td><td><div class="stock-controls"><button class="stock-adj-btn minus" onclick="adjustStock(${item.id},-1)">−</button><span class="stock-num" id="stocknum-${item.id}">${item.stock}</span><button class="stock-adj-btn plus" onclick="adjustStock(${item.id},1)">+</button></div></td><td><button class="save-btn" id="savebtn-${item.id}" onclick="saveStock(${item.id})">Guardar</button></td>`;
      tbody.appendChild(tr);
    });
  }
  function adjustStock(id, delta) {
    const key = Object.keys(stockData).find(k=>stockData[k].id===id);
    if(!key) return;
    stockData[key].stock = Math.max(0, stockData[key].stock+delta);
    document.getElementById('stocknum-'+id).textContent = stockData[key].stock;
  }
  async function saveStock(id) {
    const btn = document.getElementById('savebtn-'+id);
    const key = Object.keys(stockData).find(k=>stockData[k].id===id);
    try {
      await fetch(`${SB_URL}/rest/v1/stock?id=eq.${id}`, {
        method:'PATCH',
        headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`,'Content-Type':'application/json','Prefer':'return=minimal'},
        body:JSON.stringify({stock:stockData[key].stock})
      });
      updateAllStockBadges();
      btn.textContent='✓'; btn.classList.add('saved');
      setTimeout(()=>{btn.textContent='Guardar';btn.classList.remove('saved');},1500);
    } catch(e) { alert('Error al guardar'); }
  }

  let estrellasSeleccionadas = 5;

  function setEstrellas(val) {
    estrellasSeleccionadas = val;
    document.querySelectorAll('.estrella-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.val) <= val);
    });
  }

  async function loadResenas() {
    try {
      const res = await fetch(`${SB_URL}/rest/v1/resenas?select=*&activo=eq.true&order=fecha.desc`, {
        headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` }
      });
      const data = await res.json();
      const grid = document.getElementById('resenasGrid');
      if (!data.length) {
        grid.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--muted);font-size:0.9rem;">Todavía no hay reseñas. ¡Sé el primero!</div>';
        return;
      }
      grid.innerHTML = data.map(r => `
        <div class="resena-card">
          <div class="resena-header">
            <span class="resena-nombre">${r.nombre}</span>
            <span class="resena-fecha">${new Date(r.fecha).toLocaleDateString('es-AR')}</span>
          </div>
          <div class="resena-estrellas">${'⭐'.repeat(r.estrellas)}</div>
          <div class="resena-texto">${r.texto}</div>
        </div>
      `).join('');
    } catch(e) { console.error('Resenas error:', e); }
  }

  async function enviarResena() {
    const nombre = document.getElementById('resenaNombre').value.trim();
    const texto = document.getElementById('resenaTexto').value.trim();
    const msg = document.getElementById('resenaMsgUsuario');
    if (!nombre || !texto) {
      msg.style.color = '#c0392b'; msg.textContent = 'Completá tu nombre y reseña.'; return;
    }
    try {
      msg.style.color = 'var(--muted)'; msg.textContent = 'Enviando...';
      await fetch(`${SB_URL}/rest/v1/resenas`, {
        method: 'POST',
        headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, texto, estrellas: estrellasSeleccionadas, activo: false })
      });
      msg.style.color = '#1a7a3f';
      msg.textContent = '✓ Gracias por tu reseña! Será visible una vez aprobada.';
      document.getElementById('resenaNombre').value = '';
      document.getElementById('resenaTexto').value = '';
      setEstrellas(5);
    } catch(e) { msg.style.color = '#c0392b'; msg.textContent = 'Error al enviar. Intentá de nuevo.'; }
  }

  function openResenas() {
    const site = document.getElementById('site');
    site.style.transition = 'opacity 0.4s ease'; site.style.opacity = '0';
    setTimeout(() => { site.style.display='none'; document.getElementById('resenas').classList.add('visible'); loadResenas(); }, 400);
  }
  function closeResenas() {
    const site = document.getElementById('site');
    document.getElementById('resenas').classList.remove('visible');
    site.style.display='flex'; setTimeout(() => site.style.opacity='1', 20);
  }

  // Admin - resenas
  async function loadResenasAdmin() {
    try {
      const res = await fetch(`${SB_URL}/rest/v1/resenas?select=*&order=fecha.desc`, {
        headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` }
      });
      const data = await res.json();
      const container = document.getElementById('adminResenasContainer');
      if (!data.length) { container.innerHTML = '<p style="font-size:0.85rem;color:var(--muted);">No hay reseñas todavía.</p>'; return; }
      container.innerHTML = data.map(r => `
        <div class="resena-admin-card" id="resena-admin-${r.id}">
          <div class="resena-admin-header">
            <div>
              <span style="font-size:0.88rem;font-weight:600;color:var(--charcoal)">${r.nombre}</span>
              <span style="font-size:0.72rem;color:var(--muted);margin-left:8px">${'⭐'.repeat(r.estrellas)} · ${new Date(r.fecha).toLocaleDateString('es-AR')}</span>
              <span style="font-size:0.7rem;margin-left:8px;padding:2px 8px;border-radius:50px;${r.activo ? 'background:#e6f9ee;color:#1a7a3f' : 'background:#fff3e0;color:#e65c00'}">${r.activo ? 'Aprobada' : 'Pendiente'}</span>
            </div>
            <div class="resena-admin-actions">
              ${!r.activo ? `<button class="btn-aprobar" onclick="aprobarResena(${r.id})">Aprobar</button>` : ''}
              <button class="btn-rechazar" onclick="eliminarResena(${r.id})">Eliminar</button>
            </div>
          </div>
          <div style="font-size:0.85rem;color:#555">${r.texto}</div>
        </div>
      `).join('');
    } catch(e) { console.error('Admin resenas error:', e); }
  }

  async function aprobarResena(id) {
    await fetch(`${SB_URL}/rest/v1/resenas?id=eq.${id}`, {
      method: 'PATCH',
      headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ activo: true })
    });
    loadResenasAdmin();
  }

  async function eliminarResena(id) {
    await fetch(`${SB_URL}/rest/v1/resenas?id=eq.${id}`, {
      method: 'DELETE',
      headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` }
    });
    loadResenasAdmin();
  }