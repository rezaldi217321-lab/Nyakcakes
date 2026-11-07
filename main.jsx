import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ShoppingBag, Menu as MenuIcon, X, Instagram, MessageCircle, Sparkles, CakeSlice, ChevronRight, Plus, Minus, Trash2, Settings, Heart } from "lucide-react";
import "./style.css";

const products = [
  {id:1,name:"Bingkang Aceh",category:"Bingkang",desc:"Kue tradisional Aceh dengan tekstur lembut dan bagian atas yang legit.",tag:"Signature",emoji:"🍮",price:0},
  {id:2,name:"Fudgy Brownies",category:"Brownies",desc:"Brownies cokelat pekat dengan tekstur fudgy dan rasa cokelat yang kaya.",tag:"Best seller",emoji:"🍫",price:0},
  {id:3,name:"Bolu Lumer",category:"Bolu",desc:"Bolu lembut dengan sentuhan cokelat lumer yang memanjakan.",tag:"Favorit",emoji:"🍰",price:0},
  {id:4,name:"Bingkang Ubi",category:"Bingkang",desc:"Variasi bingkang dengan cita rasa ubi yang khas.",tag:"Tradisional",emoji:"🥮",price:0},
  {id:5,name:"Bingkang Tepung",category:"Bingkang",desc:"Bingkang klasik dengan tekstur lembut dan aroma harum.",tag:"Klasik",emoji:"🍮",price:0},
  {id:6,name:"Pandan Lumer",category:"Bolu",desc:"Aroma pandan harum dengan tekstur lembut.",tag:"Pandan",emoji:"🍃",price:0},
  {id:7,name:"Marmer Cake",category:"Bolu",desc:"Perpaduan vanila dan cokelat dalam motif marmer.",tag:"Klasik",emoji:"🍰",price:0},
  {id:8,name:"Banana Bread",category:"Bolu",desc:"Roti pisang lembut untuk teman minum teh dan kopi.",tag:"Homemade",emoji:"🍌",price:0},
  {id:9,name:"Soft Cookies",category:"Cookies",desc:"Cookies lembut dengan potongan cokelat.",tag:"Cookies",emoji:"🍪",price:0},
  {id:10,name:"Blondies Matcha",category:"Brownies",desc:"Blondies dengan sentuhan rasa matcha.",tag:"Matcha",emoji:"🍵",price:0},
  {id:11,name:"Lekker Holland",category:"Cake",desc:"Kue klasik dengan tampilan keemasan dan tekstur lembut.",tag:"Pilihan",emoji:"🥧",price:0},
  {id:12,name:"Moka Cake",category:"Cake",desc:"Cake dengan rasa moka yang nikmat.",tag:"Moka",emoji:"🎂",price:0}
];
const money = n => n ? new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n) : "Hubungi admin";
function App(){
  const [filter,setFilter]=useState("Semua");
  const [cart,setCart]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  const [adminOpen,setAdminOpen]=useState(false);
  const [phone,setPhone]=useState(localStorage.getItem("nyakPhone")||"");
  const [prices,setPrices]=useState(()=>JSON.parse(localStorage.getItem("nyakPrices")||"{}"));
  const [admin,setAdmin]=useState(false);
  const [adminPass,setAdminPass]=useState("");
  const [priceDraft,setPriceDraft]=useState("");
  const categories=["Semua","Bingkang","Brownies","Bolu","Cookies","Cake"];
  const shown=useMemo(()=>products.filter(p=>filter==="Semua"||p.category===filter),[filter]);
  const count=cart.reduce((s,x)=>s+x.qty,0);
  const total=cart.reduce((s,x)=>s+(Number(prices[x.id]||0)*x.qty),0);
  function add(p){setCart(old=>{const found=old.find(x=>x.id===p.id);return found?old.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...old,{id:p.id,qty:1}]});setCartOpen(true)}
  function change(id,d){setCart(old=>old.map(x=>x.id===id?{...x,qty:x.qty+d}:x).filter(x=>x.qty>0))}
  function saveSettings(){localStorage.setItem("nyakPhone",phone);localStorage.setItem("nyakPrices",JSON.stringify(prices));alert("Pengaturan tersimpan di perangkat ini.");}
  function checkout(){if(!phone.trim()){alert("Admin belum mengatur nomor WhatsApp. Silakan hubungi toko melalui kontak yang tersedia.");return;}const lines=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `${p.name} x${x.qty}`}).join("%0A");const msg=`Halo NYAK.CAKES, saya ingin memesan:%0A${lines}%0A%0ATotal: ${money(total)}`;window.open(`https://wa.me/${phone.replace(/\D/g,"")}?text=${msg}`,"_blank");}
  function nav(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMobileOpen(false)}
  return <div className="app">
    <div className="announcement"><Sparkles size={14}/> Freshly baked with love · Cita rasa rumahan khas Aceh</div>
    <header className="header">
      <a className="brand" href="#home"><img src="/images/nyak-cakes-logo.png" alt="NYAK.CAKES logo"/><span>NYAK<span className="gold">.</span>CAKES<small>PREMIUM BAKERY</small></span></a>
      <nav className={mobileOpen?"nav open":"nav"}><button onClick={()=>nav("home")}>Beranda</button><button onClick={()=>nav("menu")}>Menu</button><button onClick={()=>nav("story")}>Tentang</button><button onClick={()=>nav("contact")}>Kontak</button></nav>
      <div className="head-actions"><button className="icon-btn" aria-label="Admin" onClick={()=>setAdminOpen(true)}><Settings size={19}/></button><button className="cart-btn" onClick={()=>setCartOpen(true)}><ShoppingBag size={18}/> <span>Keranjang</span><b>{count}</b></button><button className="mobile-toggle" onClick={()=>setMobileOpen(!mobileOpen)}>{mobileOpen?<X/>:<MenuIcon/>}</button></div>
    </header>
    <main>
      <section className="hero" id="home">
        <div className="hero-copy"><div className="eyebrow"><span></span> HOMEMADE BAKERY · ACEH</div><h1>Manisnya rasa,<br/><em>hangatnya</em> cerita.</h1><p>Temukan Bingkang Aceh, Fudgy Brownies, dan Bolu Lumer yang dibuat dengan sepenuh hati untuk setiap momen istimewa.</p><div className="hero-buttons"><button className="primary" onClick={()=>nav("menu")}>Jelajahi Menu <ChevronRight size={18}/></button><button className="text-btn" onClick={()=>nav("story")}>Cerita kami <span>↗</span></button></div><div className="hero-note"><span>✦</span> Dibuat segar · Rasa istimewa · Penuh cinta</div></div>
        <div className="hero-art"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="hero-glow"></div><div className="hero-logo"><img src="/images/nyak-cakes-logo.png" alt="Logo NYAK.CAKES"/></div><div className="floating f1">🍫</div><div className="floating f2">🍰</div><div className="floating f3">✨</div><div className="round-stamp">BAKED<br/>WITH LOVE</div></div>
      </section>
      <section className="trust-row"><div><span>✦</span> Homemade</div><div><span>✦</span> Freshly baked</div><div><span>✦</span> Cita rasa Aceh</div><div><span>✦</span> Made with love</div></section>
      <section className="menu-section section" id="menu"><div className="section-heading"><div><div className="eyebrow">PILIHAN SPESIAL KAMI</div><h2>Menu <em>favorit</em></h2><p>Setiap gigitan punya cerita manisnya sendiri.</p></div><div className="menu-count">12 <span>pilihan</span></div></div>
        <div className="filters">{categories.map(c=><button key={c} className={filter===c?"active":""} onClick={()=>setFilter(c)}>{c}</button>)}</div>
        <div className="product-grid">{shown.map((p,i)=><article className="product-card" key={p.id} style={{"--delay":`${i*55}ms`}}><div className={`product-visual v${p.id%6}`}><span className="product-emoji">{p.emoji}</span><span className="product-tag">{p.tag}</span><div className="visual-shine"></div></div><div className="product-info"><div className="product-category">{p.category}</div><h3>{p.name}</h3><p>{p.desc}</p><div className="product-bottom"><strong>{money(Number(prices[p.id]||0))}</strong><button aria-label={`Tambah ${p.name}`} onClick={()=>add(p)}><Plus size={18}/></button></div></div></article>)}</div>
        <div className="menu-foot">Belum menemukan yang dicari? <button onClick={()=>nav("contact")}>Tanyakan menu lainnya <ChevronRight size={15}/></button></div>
      </section>
      <section className="feature"><div className="feature-image"><img src="/images/menu-bingkang-cakes.png" alt="Referensi menu bingkang dan cake NYAK.CAKES"/></div><div className="feature-copy"><div className="eyebrow">DARI DAPUR KAMI</div><h2>Rasa lokal,<br/><em>dibuat istimewa.</em></h2><p>Terinspirasi dari kekayaan rasa rumahan dan tradisi Aceh. Kami menghadirkan pilihan kue untuk menemani waktu bersama keluarga, sahabat, dan orang tersayang.</p><button className="primary" onClick={()=>nav("menu")}>Lihat semua menu <ChevronRight size={18}/></button></div></section>
      <section className="gallery section"><div className="section-heading"><div><div className="eyebrow">KENIKMATAN DALAM SETIAP POTONG</div><h2>Galeri <em>NYAK.CAKES</em></h2></div></div><div className="gallery-grid"><img src="/images/menu-bingkang-cakes.png" alt="Koleksi menu cake"/><img src="/images/menu-brownies-cookies.png" alt="Koleksi brownies dan cookies"/></div></section>
      <section className="story section" id="story"><div className="story-mark">N<span>.</span>C</div><div><div className="eyebrow">OUR LITTLE STORY</div><h2>Dibuat dengan cinta,<br/><em>dibagikan dengan bahagia.</em></h2><p>NYAK.CAKES hadir untuk membawa kehangatan melalui kue-kue pilihan. Dari Bingkang Aceh yang penuh nostalgia hingga brownies cokelat yang kaya rasa, setiap produk dibuat untuk membuat momen sederhana terasa spesial.</p></div></section>
      <section className="contact" id="contact"><div><div className="eyebrow">LET'S MAKE IT SWEET</div><h2>Ada momen spesial?<br/><em>Maniskan bersama kami.</em></h2><p>Hubungi NYAK.CAKES untuk informasi produk dan pemesanan.</p></div><button className="contact-button" onClick={()=>phone?window.open(`https://wa.me/${phone.replace(/\D/g,"")}`,"_blank"):setAdminOpen(true)}><MessageCircle/> Hubungi via WhatsApp <ChevronRight/></button></section>
    </main>
    <footer><a className="footer-brand" href="#home">NYAK<span>.</span>CAKES</a><p>Premium Bakery · Made with love in Aceh</p><div>© {new Date().getFullYear()} NYAK.CAKES. All rights reserved.</div></footer>
    {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><div className="eyebrow">YOUR SWEET PICKS</div><h2>Keranjang</h2></div><button className="icon-btn" onClick={()=>setCartOpen(false)}><X/></button></div>{cart.length===0?<div className="empty"><span>🧁</span><h3>Keranjang masih kosong</h3><p>Yuk pilih kue favoritmu.</p><button className="primary" onClick={()=>{setCartOpen(false);nav("menu")}}>Lihat menu</button></div>:<><div className="cart-items">{cart.map(x=>{const p=products.find(p=>p.id===x.id);return <div className="cart-item" key={x.id}><span>{p.emoji}</span><div className="cart-desc"><b>{p.name}</b><small>{money(Number(prices[x.id]||0))}</small><div className="qty"><button onClick={()=>change(x.id,-1)}><Minus size={13}/></button>{x.qty}<button onClick={()=>change(x.id,1)}><Plus size={13}/></button></div></div><button className="remove" onClick={()=>setCart(c=>c.filter(a=>a.id!==x.id))}><Trash2 size={16}/></button></div>})}</div><div className="cart-total"><span>Estimasi total</span><b>{money(total)}</b><small>Harga dapat dikonfirmasi kepada admin.</small><button className="primary full" onClick={checkout}>Pesan via WhatsApp <ChevronRight/></button></div></>}</aside></div>}
    {adminOpen&&<div className="overlay" onClick={()=>setAdminOpen(false)}><div className="admin-modal" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><div className="eyebrow">STORE SETTINGS</div><h2>Pengaturan toko</h2></div><button className="icon-btn" onClick={()=>setAdminOpen(false)}><X/></button></div>{!admin?<><p className="admin-hint">Masuk mode pengelolaan demo. Password awal: <b>nyakcakes</b></p><input type="password" placeholder="Password admin" value={adminPass} onChange={e=>setAdminPass(e.target.value)}/><button className="primary full" onClick={()=>{if(adminPass==="nyakcakes")setAdmin(true);else alert("Password belum sesuai.")}}>Masuk admin</button></>:<><label>Nomor WhatsApp admin (contoh 62812xxxx)</label><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="62812xxxxxxxx"/><h3 className="price-title">Atur harga produk (Rupiah)</h3><div className="price-list">{products.map(p=><label key={p.id}>{p.name}<input type="number" min="0" placeholder="0 = Hubungi admin" value={prices[p.id]||""} onChange={e=>setPrices(old=>({...old,[p.id]:e.target.value}))}/></label>)}</div><button className="primary full" onClick={saveSettings}>Simpan pengaturan</button></>}</div></div>}
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);
