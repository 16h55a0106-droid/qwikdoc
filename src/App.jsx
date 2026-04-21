import { useState, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');`;

const css = `
${FONTS}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --ink: #0f0f0f; --ink2: #3a3a3a; --ink3: #7a7a7a;
  --surface: #ffffff; --surface2: #f5f4f1; --surface3: #eeecea;
  --accent: #1a472a; --accent2: #2d7a47; --accent-light: #e8f5ee;
  --border: #dddbd8; --danger: #c0392b;
  --radius: 10px; --radius-lg: 16px;
}
body { font-family: 'DM Sans', sans-serif; background: var(--surface2); color: var(--ink); min-height: 100vh; }
h1,h2,h3,h4 { font-family: 'Plus Jakarta Sans', sans-serif; }

.app { display: flex; min-height: 100vh; }

.sidebar {
  width: 220px; min-height: 100vh; background: var(--ink);
  display: flex; flex-direction: column; padding: 28px 0;
  position: sticky; top: 0; height: 100vh; flex-shrink: 0;
}
.sidebar-logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; font-weight: 800; color: #fff; padding: 0 24px 28px; letter-spacing: -0.5px; }
.sidebar-logo span { color: #4caf7d; }
.sidebar-nav { display: flex; flex-direction: column; gap: 2px; padding: 0 12px; flex: 1; }
.nav-item {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px;
  border-radius: 8px; cursor: pointer; transition: all 0.15s;
  font-size: 14px; font-weight: 400; color: #aaa; border: none; background: none; text-align: left; width: 100%;
}
.nav-item:hover { background: rgba(255,255,255,0.07); color: #fff; }
.nav-item.active { background: rgba(76,175,125,0.15); color: #4caf7d; font-weight: 500; }
.sidebar-bottom { padding: 16px 24px; }
.price-badge { background: rgba(76,175,125,0.15); border: 1px solid rgba(76,175,125,0.3); border-radius: 8px; padding: 12px; text-align: center; }
.price-badge .amount { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 20px; font-weight: 700; color: #4caf7d; }
.price-badge .label { font-size: 11px; color: #888; margin-top: 2px; }
.free-left-txt { text-align: center; font-size: 11px; color: #888; margin-top: 8px; }
.gate-wall { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 40px 32px; text-align: center; max-width: 440px; margin: 0 auto; }
.gate-icon { font-size: 36px; margin-bottom: 14px; }
.gate-wall h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
.gate-wall p { font-size: 14px; color: var(--ink3); line-height: 1.6; margin-bottom: 20px; }
.gate-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 42px; font-weight: 800; color: var(--accent); margin-bottom: 4px; }
.gate-price span { font-size: 16px; font-weight: 400; color: var(--ink3); }
.gate-features { text-align: left; background: var(--surface2); border-radius: 10px; padding: 14px 16px; margin: 18px 0 22px; display: flex; flex-direction: column; gap: 9px; }
.gate-btn { width: 100%; padding: 14px; border-radius: 10px; border: none; background: var(--accent); color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.gate-btn:hover { background: var(--accent2); }

.main { flex: 1; padding: 36px 40px; max-width: 900px; }
.page-header { margin-bottom: 28px; }
.page-header h2 { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; }
.page-header p { font-size: 14px; color: var(--ink3); margin-top: 4px; }

.form-card { background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border); padding: 24px; margin-bottom: 16px; }
.section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink3); margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--surface3); }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-grid.three { grid-template-columns: 1fr 1fr 1fr; }
.field { display: flex; flex-direction: column; gap: 4px; }
.field label { font-size: 12px; font-weight: 500; color: var(--ink2); }
.field input, .field textarea, .field select { padding: 9px 12px; border-radius: 8px; border: 1px solid var(--border); font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink); background: var(--surface2); transition: border 0.15s, background 0.15s; outline: none; }
.field input:focus, .field textarea:focus, .field select:focus { border-color: var(--accent2); background: #fff; }
.field textarea { resize: vertical; min-height: 70px; }
.optional-tag { font-size: 10px; color: var(--ink3); font-weight: 400; margin-left: 4px; }

.logo-wrap { display: flex; align-items: center; gap: 16px; }
.logo-upload-box {
  border: 1.5px dashed var(--border); border-radius: 10px; padding: 16px 20px;
  cursor: pointer; transition: all 0.15s; background: var(--surface2);
  display: flex; align-items: center; gap: 12px; flex: 1;
}
.logo-upload-box:hover { border-color: var(--accent2); background: var(--accent-light); }
.logo-upload-box input { display: none; }
.logo-preview { max-height: 44px; max-width: 120px; object-fit: contain; border-radius: 6px; }
.logo-upload-text { font-size: 13px; color: var(--ink3); }
.logo-upload-text strong { color: var(--accent2); display: block; margin-bottom: 2px; }
.logo-remove { padding: 6px 12px; border-radius: 7px; border: 1px solid var(--border); background: none; font-size: 12px; color: var(--ink3); cursor: pointer; white-space: nowrap; }
.logo-remove:hover { border-color: var(--danger); color: var(--danger); }

.line-items { display: flex; flex-direction: column; gap: 7px; margin-bottom: 10px; }
.line-item { display: grid; grid-template-columns: 1fr 72px 88px 28px; gap: 7px; align-items: center; }
.line-item input { padding: 8px 10px; border-radius: 7px; border: 1px solid var(--border); font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink); background: var(--surface2); outline: none; width: 100%; }
.line-item input:focus { border-color: var(--accent2); background: #fff; }
.li-headers { display: grid; grid-template-columns: 1fr 72px 88px 28px; gap: 7px; margin-bottom: 4px; }
.li-header { font-size: 11px; font-weight: 600; color: var(--ink3); text-transform: uppercase; letter-spacing: 0.06em; padding: 0 10px; }
.li-header.center { text-align: center; }
.li-header.right { text-align: right; }
.remove-btn { width: 26px; height: 26px; border-radius: 6px; border: 1px solid var(--border); background: none; color: var(--ink3); cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; }
.remove-btn:hover { background: #fef0f0; border-color: #e57373; color: var(--danger); }
.add-item-btn { padding: 7px 14px; border-radius: 7px; border: 1px dashed var(--border); background: none; color: var(--accent2); font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer; transition: all 0.15s; display: inline-flex; align-items: center; gap: 6px; }
.add-item-btn:hover { background: var(--accent-light); border-color: var(--accent2); }

.totals-box { background: var(--surface2); border-radius: 10px; padding: 14px; margin-top: 14px; display: flex; flex-direction: column; gap: 7px; }
.total-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--ink2); align-items: center; }
.total-row.grand { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink); padding-top: 8px; border-top: 1px solid var(--border); margin-top: 2px; }
.total-input { width: 80px; padding: 5px 8px; border-radius: 6px; border: 1px solid var(--border); font-family: 'DM Sans', sans-serif; font-size: 13px; text-align: right; background: #fff; outline: none; }
.total-input:focus { border-color: var(--accent2); }

.actions { display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap; }
.btn-primary { padding: 11px 22px; border-radius: 9px; border: none; background: var(--accent); color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; gap: 8px; }
.btn-primary:hover { background: var(--accent2); transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
.btn-secondary { padding: 11px 18px; border-radius: 9px; border: 1px solid var(--border); background: var(--surface); color: var(--ink2); font-family: 'DM Sans', sans-serif; font-size: 14px; cursor: pointer; transition: all 0.15s; }
.btn-secondary:hover { background: var(--surface2); }

.loading-row { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ink3); padding: 10px 0; }
.spinner { width: 18px; height: 18px; border: 2px solid var(--surface3); border-top-color: var(--accent2); border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0; }
@keyframes spin { to { transform: rotate(360deg); } }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.65); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
.modal { background: #fff; border-radius: 16px; width: 100%; max-width: 700px; max-height: 92vh; overflow-y: auto; box-shadow: 0 28px 80px rgba(0,0,0,0.25); display: flex; flex-direction: column; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; border-bottom: 1px solid var(--border); position: sticky; top: 0; background: #fff; z-index: 1; }
.modal-header h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; font-weight: 700; }
.modal-close { width: 30px; height: 30px; border-radius: 7px; border: 1px solid var(--border); background: none; cursor: pointer; font-size: 16px; color: var(--ink3); display: flex; align-items: center; justify-content: center; }
.modal-body { padding: 28px; flex: 1; }
.modal-actions { padding: 14px 24px; border-top: 1px solid var(--border); display: flex; gap: 10px; }

/* Invoice Preview */
.inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; }
.inv-logo-img { max-height: 52px; max-width: 140px; object-fit: contain; }
.inv-logo-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 20px; font-weight: 800; color: var(--accent); }
.inv-right { text-align: right; }
.inv-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 30px; font-weight: 800; color: var(--ink); letter-spacing: -1px; }
.inv-meta { font-size: 13px; color: var(--ink3); margin-top: 4px; line-height: 1.8; }
.inv-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
.inv-party-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink3); margin-bottom: 5px; }
.inv-party-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; }
.inv-party-sub { font-size: 13px; color: var(--ink2); line-height: 1.6; margin-top: 2px; }
.inv-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
.inv-table th { text-align: left; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink3); padding: 8px 10px; border-bottom: 2px solid var(--ink); }
.inv-table th.r { text-align: right; }
.inv-table th.c { text-align: center; }
.inv-table td { padding: 10px 10px; font-size: 13px; color: var(--ink2); border-bottom: 1px solid var(--surface3); }
.inv-table td.r { text-align: right; font-weight: 500; color: var(--ink); }
.inv-table td.c { text-align: center; }
.inv-totals { margin-left: auto; width: 220px; display: flex; flex-direction: column; gap: 6px; }
.inv-total-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--ink2); }
.inv-grand { display: flex; justify-content: space-between; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; color: var(--ink); padding-top: 8px; border-top: 2px solid var(--ink); margin-top: 4px; }
.inv-notes-box { margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--surface3); }
.inv-notes-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink3); margin-bottom: 5px; }
.inv-notes-text { font-size: 13px; color: var(--ink2); line-height: 1.6; }
.inv-footer { margin-top: 28px; text-align: center; font-size: 11px; color: #ccc; }

/* Contract Preview */
.contract-header { text-align: center; margin-bottom: 28px; padding-bottom: 18px; border-bottom: 2px solid var(--ink); }
.contract-logo-img { max-height: 44px; max-width: 120px; object-fit: contain; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto; }
.contract-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 20px; font-weight: 800; letter-spacing: -0.3px; }
.contract-sub { font-size: 12px; color: var(--ink3); margin-top: 4px; }
.contract-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; background: var(--surface2); border-radius: 10px; padding: 14px; margin-bottom: 22px; }
.cp-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink3); margin-bottom: 4px; }
.cp-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; }
.cp-detail { font-size: 12px; color: var(--ink2); margin-top: 2px; line-height: 1.5; }
.clause { margin-bottom: 16px; }
.clause-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent2); margin-bottom: 3px; }
.clause-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
.clause-body { font-size: 13px; color: var(--ink2); line-height: 1.7; }
.signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--surface3); }
.sig-line { border-bottom: 1px solid var(--ink); height: 32px; margin-bottom: 6px; }
.sig-label { font-size: 10px; color: var(--ink3); }
.sig-name { font-size: 12px; font-weight: 500; margin-top: 2px; }
.disclaimer { margin-top: 20px; padding: 10px 14px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 8px 8px 0; font-size: 11px; color: #92400e; line-height: 1.6; }
.contract-notes-box { margin-top: 16px; padding: 12px 14px; background: var(--surface2); border-radius: 8px; }
.contract-notes-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink3); margin-bottom: 4px; }
.contract-notes-text { font-size: 13px; color: var(--ink2); line-height: 1.6; }

/* Paywall */
.paywall-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.72); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 20px; }
.paywall-card { background: #fff; border-radius: 20px; padding: 36px; max-width: 400px; width: 100%; text-align: center; box-shadow: 0 32px 80px rgba(0,0,0,0.3); }
.paywall-icon { font-size: 36px; margin-bottom: 10px; }
.paywall-card h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; font-weight: 800; margin-bottom: 8px; }
.paywall-card p { font-size: 14px; color: var(--ink3); line-height: 1.6; margin-bottom: 20px; }
.paywall-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 40px; font-weight: 800; color: var(--accent); }
.paywall-price sub { font-size: 16px; font-weight: 400; color: var(--ink3); }
.paywall-features { text-align: left; background: var(--surface2); border-radius: 10px; padding: 14px 16px; margin: 16px 0 22px; display: flex; flex-direction: column; gap: 9px; }
.pf { font-size: 13px; color: var(--ink2); display: flex; gap: 8px; }
.pf::before { content: '✓'; color: var(--accent2); font-weight: 700; flex-shrink: 0; }
.paywall-btn { width: 100%; padding: 14px; border-radius: 10px; border: none; background: var(--accent); color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; }
.paywall-btn:hover { background: var(--accent2); }
.paywall-dismiss { margin-top: 12px; font-size: 13px; color: var(--ink3); cursor: pointer; }
.paywall-dismiss:hover { color: var(--ink); }

@media(max-width:680px){
  .app{flex-direction:column;}
  .sidebar{width:100%;min-height:auto;height:auto;padding:16px;flex-direction:row;flex-wrap:wrap;}
  .sidebar-nav{flex-direction:row;}
  .main{padding:20px 14px;}
  .form-grid,.form-grid.three{grid-template-columns:1fr;}
  .inv-parties,.contract-parties{grid-template-columns:1fr;}
  .signatures{grid-template-columns:1fr;}
}
`;

const CURRENCIES = ["USD $","EUR €","GBP £","INR ₹","AUD $","CAD $"];
const PAYMENT_TERMS = ["Due on Receipt","Net 7","Net 14","Net 30","50% Upfront / 50% on Delivery"];
const CONTRACT_TYPES = [
  "Freelance Service Agreement","Web Design & Development Contract",
  "Content Writing Agreement","Consulting Agreement",
  "Graphic Design Contract","Photography Agreement",
  "Social Media Management Contract","Software Development Agreement",
];
const FREE_LIMIT = 1;

function fmt(amount, currency) {
  const sym = currency?.split(" ")[1] || "$";
  return sym + parseFloat(amount || 0).toFixed(2);
}

export default function Qwikdoc() {
  const [page, setPage] = useState("invoice");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [docsGenerated, setDocsGenerated] = useState(0);

  // Shared logo (optional — separate for each tool)
  const [invLogo, setInvLogo] = useState(null);
  const [contractLogo, setContractLogo] = useState(null);
  const invLogoRef = useRef();
  const contractLogoRef = useRef();

  // Invoice
  const [inv, setInv] = useState({
    fromName:"", fromEmail:"", fromAddress:"",
    toName:"", toEmail:"", toAddress:"",
    invoiceNumber:"INV-" + Date.now().toString().slice(-5),
    issueDate: new Date().toISOString().split("T")[0],
    dueDate:"", currency:"USD $", paymentTerms:"Net 30",
    tax:"", discount:"", notes:"", additionalInfo:"",
  });
  const [items, setItems] = useState([{desc:"",qty:"1",rate:""}]);

  // Contract
  const [con, setCon] = useState({
    type:"Freelance Service Agreement",
    freelancerName:"", freelancerEmail:"", freelancerAddress:"",
    clientName:"", clientEmail:"", clientAddress:"",
    projectDesc:"",
    startDate: new Date().toISOString().split("T")[0],
    endDate:"", paymentAmount:"", paymentCurrency:"USD $",
    paymentSchedule:"50% Upfront / 50% on Delivery",
    revisions:"2", additionalInfo:"",
  });

  const updInv = (k,v) => setInv(p=>({...p,[k]:v}));
  const updCon = (k,v) => setCon(p=>({...p,[k]:v}));
  const updItem = (i,k,v) => setItems(p=>p.map((it,idx)=>idx===i?{...it,[k]:v}:it));
  const addItem = () => setItems(p=>[...p,{desc:"",qty:"1",rate:""}]);
  const removeItem = i => setItems(p=>p.filter((_,idx)=>idx!==i));

  const subtotal = items.reduce((s,it)=>s+(parseFloat(it.qty)||0)*(parseFloat(it.rate)||0),0);
  const discountAmt = parseFloat(inv.discount)||0;
  const taxAmt = ((subtotal-discountAmt)*(parseFloat(inv.tax)||0))/100;
  const total = subtotal - discountAmt + taxAmt;

  const handleLogo = (setter) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setter(ev.target.result);
    reader.readAsDataURL(file);
  };

  const canProceed = () => {
    if (docsGenerated >= FREE_LIMIT) { setShowPaywall(true); return false; }
    return true;
  };

  const generateInvoice = async () => {
    if (!canProceed()) return;
    setLoading(true);
    let polishedItems = items;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:600,
          messages:[{role:"user", content:`Polish these invoice line item descriptions to be concise and professional. Return ONLY a JSON array of strings, one per item, no extra text. Items: ${JSON.stringify(items.map(i=>i.desc))}`}]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text||"[]";
      const descs = JSON.parse(text.replace(/```json|```/g,"").trim());
      polishedItems = items.map((it,i)=>({...it, desc: descs[i]||it.desc}));
    } catch {}
    setDocsGenerated(d=>d+1);
    setPreview({type:"invoice", items: polishedItems});
    setLoading(false);
  };

  const generateContract = async () => {
    if (!canProceed()) return;
    setLoading(true);
    let clauses = {};
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1200,
          messages:[{role:"user", content:`Write plain English contract clauses for a ${con.type}.
Freelancer: ${con.freelancerName} | Client: ${con.clientName}
Project: ${con.projectDesc}
Timeline: ${con.startDate} to ${con.endDate}
Payment: ${con.paymentCurrency.split(" ")[1]||"$"}${con.paymentAmount} via ${con.paymentSchedule}
Revisions: ${con.revisions} rounds included
Additional: ${con.additionalInfo||"None"}

Return ONLY a JSON object with keys: scope, deliverables, payment, revisions, ownership, confidentiality, termination, disputes
Each value: 2-3 plain English sentences. No legalese. Clear language anyone can understand.`}]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text||"{}";
      clauses = JSON.parse(text.replace(/```json|```/g,"").trim());
    } catch {
      clauses = {
        scope:`The freelancer will provide ${con.projectDesc||"the agreed services"} as outlined in this agreement.`,
        deliverables:"All deliverables will be provided in the agreed formats upon project completion.",
        payment:`The total fee is ${con.paymentCurrency.split(" ")[1]||"$"}${con.paymentAmount||"0"}, payable as ${con.paymentSchedule}.`,
        revisions:`The client is entitled to ${con.revisions} rounds of revisions at no extra charge.`,
        ownership:"Full ownership of all deliverables transfers to the client upon receipt of final payment.",
        confidentiality:"Both parties agree to keep all project-related information confidential.",
        termination:"Either party may terminate this agreement with 7 days written notice.",
        disputes:"Any disputes will be resolved through good-faith negotiation between both parties.",
      };
    }
    setDocsGenerated(d=>d+1);
    setPreview({type:"contract", clauses});
    setLoading(false);
  };

  const freeLeft = Math.max(0, FREE_LIMIT - docsGenerated);

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">Qwik<span>doc</span></div>
          <nav className="sidebar-nav">
            <button className={`nav-item${page==="invoice"?" active":""}`} onClick={()=>setPage("invoice")}>
              <span>📄</span> Invoice
            </button>
            <button className={`nav-item${page==="contract"?" active":""}`} onClick={()=>setPage("contract")}>
              <span>📝</span> Contract
            </button>
          </nav>
          <div className="sidebar-bottom">
            <div className="price-badge">
              <div className="amount">$9<span style={{fontSize:13,fontWeight:400}}>/mo</span></div>
              <div className="label">Unlimited invoices & contracts</div>
            </div>
            {docsGenerated < FREE_LIMIT
              ? <div className="free-left-txt">1 free document — no account needed</div>
              : <div className="free-left-txt" style={{color:"#e57373"}}>Free trial used · upgrade to continue</div>
            }
          </div>
        </aside>

        {/* Main */}
        <main className="main">

          {/* ─── INVOICE PAGE ─── */}
          {page === "invoice" && <>
            <div className="page-header">
              <h2>Create Invoice</h2>
              <p>Professional invoices in under 60 seconds</p>
            </div>

            {/* PAYWALL GATE — locks entire form after trial */}
            {docsGenerated >= FREE_LIMIT ? (
              <div className="gate-wall">
                <div className="gate-icon">🔒</div>
                <h3>Your free trial has been used</h3>
                <p>Upgrade to Qwikdoc Pro to create unlimited invoices and contracts.</p>
                <div className="gate-price">$9<span>/mo</span></div>
                <div className="gate-features">
                  <div className="pf">Unlimited invoices</div>
                  <div className="pf">Unlimited contracts</div>
                  <div className="pf">Logo upload on all documents</div>
                  <div className="pf">AI-polished professional language</div>
                  <div className="pf">PDF download every time</div>
                  <div className="pf">Cancel anytime</div>
                </div>
                <button className="gate-btn" onClick={()=>alert("Connect your Lemon Squeezy checkout URL here")}>
                  Unlock for $9/mo
                </button>
              </div>
            ) : (<>
            <div className="form-card">
              <div className="section-title">Logo <span className="optional-tag">(optional)</span></div>
              <div className="logo-wrap">
                <div className="logo-upload-box" onClick={()=>invLogoRef.current.click()}>
                  <input ref={invLogoRef} type="file" accept="image/*" onChange={handleLogo(setInvLogo)} />
                  {invLogo
                    ? <img src={invLogo} className="logo-preview" alt="logo" />
                    : <>
                        <span style={{fontSize:24}}>🖼️</span>
                        <div className="logo-upload-text">
                          <strong>Click to upload your logo</strong>
                          PNG or JPG — appears on your invoice
                        </div>
                      </>
                  }
                </div>
                {invLogo && <button className="logo-remove" onClick={()=>setInvLogo(null)}>Remove</button>}
              </div>
            </div>

            {/* From / To */}
            <div className="form-card">
              <div className="section-title">From (You)</div>
              <div className="form-grid" style={{marginBottom:16}}>
                <div className="field"><label>Your Name / Business</label><input value={inv.fromName} onChange={e=>updInv("fromName",e.target.value)} placeholder="Jane Doe / Acme Studio" /></div>
                <div className="field"><label>Your Email</label><input value={inv.fromEmail} onChange={e=>updInv("fromEmail",e.target.value)} placeholder="you@email.com" /></div>
                <div className="field"><label>Your Address</label><input value={inv.fromAddress} onChange={e=>updInv("fromAddress",e.target.value)} placeholder="City, Country" /></div>
              </div>
              <div className="section-title">To (Client)</div>
              <div className="form-grid">
                <div className="field"><label>Client Name / Business</label><input value={inv.toName} onChange={e=>updInv("toName",e.target.value)} placeholder="Client Name" /></div>
                <div className="field"><label>Client Email</label><input value={inv.toEmail} onChange={e=>updInv("toEmail",e.target.value)} placeholder="client@email.com" /></div>
                <div className="field"><label>Client Address</label><input value={inv.toAddress} onChange={e=>updInv("toAddress",e.target.value)} placeholder="City, Country" /></div>
              </div>
            </div>

            {/* Invoice details */}
            <div className="form-card">
              <div className="section-title">Invoice Details</div>
              <div className="form-grid three">
                <div className="field"><label>Invoice Number</label><input value={inv.invoiceNumber} onChange={e=>updInv("invoiceNumber",e.target.value)} /></div>
                <div className="field"><label>Issue Date</label><input type="date" value={inv.issueDate} onChange={e=>updInv("issueDate",e.target.value)} /></div>
                <div className="field"><label>Due Date</label><input type="date" value={inv.dueDate} onChange={e=>updInv("dueDate",e.target.value)} /></div>
                <div className="field"><label>Currency</label>
                  <select value={inv.currency} onChange={e=>updInv("currency",e.target.value)}>
                    {CURRENCIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field"><label>Payment Terms</label>
                  <select value={inv.paymentTerms} onChange={e=>updInv("paymentTerms",e.target.value)}>
                    {PAYMENT_TERMS.map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Line items */}
            <div className="form-card">
              <div className="section-title">Services / Items</div>
              <div className="li-headers">
                <div className="li-header">Description</div>
                <div className="li-header center">Qty</div>
                <div className="li-header right">Rate</div>
                <div />
              </div>
              <div className="line-items">
                {items.map((it,i)=>(
                  <div className="line-item" key={i}>
                    <input value={it.desc} onChange={e=>updItem(i,"desc",e.target.value)} placeholder="Service description" />
                    <input value={it.qty} onChange={e=>updItem(i,"qty",e.target.value)} placeholder="1" style={{textAlign:"center"}} />
                    <input value={it.rate} onChange={e=>updItem(i,"rate",e.target.value)} placeholder="0.00" style={{textAlign:"right"}} />
                    <button className="remove-btn" onClick={()=>removeItem(i)}>×</button>
                  </div>
                ))}
              </div>
              <button className="add-item-btn" onClick={addItem}>+ Add item</button>
              <div className="totals-box">
                <div className="total-row"><span>Subtotal</span><span>{fmt(subtotal, inv.currency)}</span></div>
                <div className="total-row">
                  <span>Discount</span>
                  <input className="total-input" value={inv.discount} onChange={e=>updInv("discount",e.target.value)} placeholder="0.00" />
                </div>
                <div className="total-row">
                  <span>Tax %</span>
                  <input className="total-input" value={inv.tax} onChange={e=>updInv("tax",e.target.value)} placeholder="0" />
                </div>
                <div className="total-row grand"><span>Total</span><span>{fmt(total, inv.currency)}</span></div>
              </div>
            </div>

            {/* Notes */}
            <div className="form-card">
              <div className="section-title">Notes & Additional Info</div>
              <div className="form-grid">
                <div className="field">
                  <label>Notes <span className="optional-tag">(optional)</span></label>
                  <textarea value={inv.notes} onChange={e=>updInv("notes",e.target.value)} placeholder="Payment instructions, bank details, thank you note..." />
                </div>
                <div className="field">
                  <label>Additional Info <span className="optional-tag">(optional)</span></label>
                  <textarea value={inv.additionalInfo} onChange={e=>updInv("additionalInfo",e.target.value)} placeholder="Anything else the client should know..." />
                </div>
              </div>
            </div>

            <div className="actions">
              {loading
                ? <div className="loading-row"><div className="spinner"/><span>AI is polishing your invoice...</span></div>
                : <button className="btn-primary" onClick={generateInvoice}>✦ Generate Invoice</button>
              }
            </div>
          </>}

          {/* ─── CONTRACT PAGE ─── */}
          {page === "contract" && <>
            <div className="page-header">
              <h2>Create Contract</h2>
              <p>Plain English contracts — professional, clear, and fast</p>
            </div>

            {docsGenerated >= FREE_LIMIT ? (
              <div className="gate-wall">
                <div className="gate-icon">🔒</div>
                <h3>Your free trial has been used</h3>
                <p>Upgrade to Qwikdoc Pro to create unlimited invoices and contracts.</p>
                <div className="gate-price">$9<span>/mo</span></div>
                <div className="gate-features">
                  <div className="pf">Unlimited invoices</div>
                  <div className="pf">Unlimited contracts</div>
                  <div className="pf">Logo upload on all documents</div>
                  <div className="pf">AI-polished professional language</div>
                  <div className="pf">PDF download every time</div>
                  <div className="pf">Cancel anytime</div>
                </div>
                <button className="gate-btn" onClick={()=>alert("Connect your Lemon Squeezy checkout URL here")}>
                  Unlock for $9/mo
                </button>
              </div>
            ) : (<>

            {/* Logo — optional */}
            <div className="form-card">
              <div className="section-title">Logo <span className="optional-tag">(optional)</span></div>
              <div className="logo-wrap">
                <div className="logo-upload-box" onClick={()=>contractLogoRef.current.click()}>
                  <input ref={contractLogoRef} type="file" accept="image/*" onChange={handleLogo(setContractLogo)} />
                  {contractLogo
                    ? <img src={contractLogo} className="logo-preview" alt="logo" />
                    : <>
                        <span style={{fontSize:24}}>🖼️</span>
                        <div className="logo-upload-text">
                          <strong>Click to upload your logo</strong>
                          PNG or JPG — appears on your contract
                        </div>
                      </>
                  }
                </div>
                {contractLogo && <button className="logo-remove" onClick={()=>setContractLogo(null)}>Remove</button>}
              </div>
            </div>

            {/* Contract type */}
            <div className="form-card">
              <div className="section-title">Contract Type</div>
              <div className="field" style={{maxWidth:360}}>
                <label>Select contract type</label>
                <select value={con.type} onChange={e=>updCon("type",e.target.value)}>
                  {CONTRACT_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Parties */}
            <div className="form-card">
              <div className="section-title">Your Details (Freelancer)</div>
              <div className="form-grid" style={{marginBottom:16}}>
                <div className="field"><label>Your Name</label><input value={con.freelancerName} onChange={e=>updCon("freelancerName",e.target.value)} placeholder="Your full name" /></div>
                <div className="field"><label>Your Email</label><input value={con.freelancerEmail} onChange={e=>updCon("freelancerEmail",e.target.value)} placeholder="you@email.com" /></div>
                <div className="field"><label>Your Address <span className="optional-tag">(optional)</span></label><input value={con.freelancerAddress} onChange={e=>updCon("freelancerAddress",e.target.value)} placeholder="City, Country" /></div>
              </div>
              <div className="section-title">Client Details</div>
              <div className="form-grid">
                <div className="field"><label>Client Name / Business</label><input value={con.clientName} onChange={e=>updCon("clientName",e.target.value)} placeholder="Client full name or company" /></div>
                <div className="field"><label>Client Email</label><input value={con.clientEmail} onChange={e=>updCon("clientEmail",e.target.value)} placeholder="client@email.com" /></div>
                <div className="field"><label>Client Address <span className="optional-tag">(optional)</span></label><input value={con.clientAddress} onChange={e=>updCon("clientAddress",e.target.value)} placeholder="City, Country" /></div>
              </div>
            </div>

            {/* Project */}
            <div className="form-card">
              <div className="section-title">Project Details</div>
              <div className="field" style={{marginBottom:12}}>
                <label>Project Description</label>
                <textarea value={con.projectDesc} onChange={e=>updCon("projectDesc",e.target.value)} placeholder="Briefly describe what you'll be doing for the client..." style={{minHeight:80}} />
              </div>
              <div className="form-grid three">
                <div className="field"><label>Start Date</label><input type="date" value={con.startDate} onChange={e=>updCon("startDate",e.target.value)} /></div>
                <div className="field"><label>End Date</label><input type="date" value={con.endDate} onChange={e=>updCon("endDate",e.target.value)} /></div>
                <div className="field"><label>Revision Rounds</label><input value={con.revisions} onChange={e=>updCon("revisions",e.target.value)} placeholder="2" /></div>
              </div>
            </div>

            {/* Payment */}
            <div className="form-card">
              <div className="section-title">Payment</div>
              <div className="form-grid three">
                <div className="field"><label>Currency</label>
                  <select value={con.paymentCurrency} onChange={e=>updCon("paymentCurrency",e.target.value)}>
                    {CURRENCIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field"><label>Total Amount</label><input value={con.paymentAmount} onChange={e=>updCon("paymentAmount",e.target.value)} placeholder="1500" /></div>
                <div className="field"><label>Payment Schedule</label>
                  <select value={con.paymentSchedule} onChange={e=>updCon("paymentSchedule",e.target.value)}>
                    {PAYMENT_TERMS.map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional */}
            <div className="form-card">
              <div className="section-title">Additional Info <span className="optional-tag">(optional)</span></div>
              <div className="field">
                <label>Anything specific to include in this contract?</label>
                <textarea value={con.additionalInfo} onChange={e=>updCon("additionalInfo",e.target.value)} placeholder="e.g. Client will provide all brand assets, hosting is not included, project may be used in portfolio..." style={{minHeight:80}} />
              </div>
            </div>

            <div className="actions">
              {loading
                ? <div className="loading-row"><div className="spinner"/><span>AI is writing your contract...</span></div>
                : <button className="btn-primary" onClick={generateContract}>✦ Generate Contract</button>
              }
            </div>
          </>}
        </main>
      </div>

      {/* ─── INVOICE PREVIEW MODAL ─── */}
      {preview?.type === "invoice" && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setPreview(null)}>
          <div className="modal">
            <div className="modal-header">
              <h3>Invoice Preview</h3>
              <button className="modal-close" onClick={()=>setPreview(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="inv-header">
                <div>
                  {invLogo
                    ? <img src={invLogo} className="inv-logo-img" alt="logo" />
                    : <div className="inv-logo-name">{inv.fromName || "Your Business"}</div>
                  }
                  <div style={{fontSize:12,color:"var(--ink3)",marginTop:6,lineHeight:1.7}}>
                    {inv.fromEmail}<br/>{inv.fromAddress}
                  </div>
                </div>
                <div className="inv-right">
                  <div className="inv-title">INVOICE</div>
                  <div className="inv-meta">
                    #{inv.invoiceNumber}<br/>
                    Issued: {inv.issueDate}<br/>
                    {inv.dueDate && <>Due: {inv.dueDate}</>}
                  </div>
                </div>
              </div>

              <div className="inv-parties">
                <div>
                  <div className="inv-party-label">From</div>
                  <div className="inv-party-name">{inv.fromName||"—"}</div>
                  <div className="inv-party-sub">{inv.fromEmail}<br/>{inv.fromAddress}</div>
                </div>
                <div>
                  <div className="inv-party-label">Bill To</div>
                  <div className="inv-party-name">{inv.toName||"—"}</div>
                  <div className="inv-party-sub">{inv.toEmail}<br/>{inv.toAddress}</div>
                </div>
              </div>

              <table className="inv-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th className="c">Qty</th>
                    <th className="r">Rate</th>
                    <th className="r">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.items.map((it,i)=>(
                    <tr key={i}>
                      <td>{it.desc||"—"}</td>
                      <td className="c">{it.qty}</td>
                      <td className="r">{fmt(it.rate, inv.currency)}</td>
                      <td className="r">{fmt((parseFloat(it.qty)||0)*(parseFloat(it.rate)||0), inv.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="inv-totals">
                <div className="inv-total-row"><span>Subtotal</span><span>{fmt(subtotal,inv.currency)}</span></div>
                {discountAmt > 0 && <div className="inv-total-row"><span>Discount</span><span>−{fmt(discountAmt,inv.currency)}</span></div>}
                {taxAmt > 0 && <div className="inv-total-row"><span>Tax ({inv.tax}%)</span><span>{fmt(taxAmt,inv.currency)}</span></div>}
                <div className="inv-grand"><span>Total Due</span><span>{fmt(total,inv.currency)}</span></div>
              </div>

              {(inv.notes || inv.additionalInfo) && (
                <div className="inv-notes-box">
                  {inv.notes && <><div className="inv-notes-label">Notes</div><div className="inv-notes-text">{inv.notes}</div></>}
                  {inv.additionalInfo && <><div className="inv-notes-label" style={{marginTop:10}}>Additional Info</div><div className="inv-notes-text">{inv.additionalInfo}</div></>}
                </div>
              )}
              <div className="inv-footer">Generated with Qwikdoc · qwikdoc.com</div>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={()=>window.print()}>⬇ Download PDF</button>
              <button className="btn-secondary" onClick={()=>setPreview(null)}>Edit</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── CONTRACT PREVIEW MODAL ─── */}
      {preview?.type === "contract" && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setPreview(null)}>
          <div className="modal">
            <div className="modal-header">
              <h3>Contract Preview</h3>
              <button className="modal-close" onClick={()=>setPreview(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="contract-header">
                {contractLogo && <img src={contractLogo} className="contract-logo-img" alt="logo" />}
                <div className="contract-title">{con.type}</div>
                <div className="contract-sub">Effective {con.startDate}{con.endDate ? ` – ${con.endDate}` : ""}</div>
              </div>

              <div className="contract-parties">
                <div>
                  <div className="cp-label">Freelancer</div>
                  <div className="cp-name">{con.freelancerName||"—"}</div>
                  <div className="cp-detail">{con.freelancerEmail}<br/>{con.freelancerAddress}</div>
                </div>
                <div>
                  <div className="cp-label">Client</div>
                  <div className="cp-name">{con.clientName||"—"}</div>
                  <div className="cp-detail">{con.clientEmail}<br/>{con.clientAddress}</div>
                </div>
              </div>

              {Object.entries({
                "1. Scope of Work": ["scope", preview.clauses.scope],
                "2. Deliverables": ["deliverables", preview.clauses.deliverables],
                "3. Payment": ["payment", preview.clauses.payment],
                "4. Revisions": ["revisions", preview.clauses.revisions],
                "5. Ownership": ["ownership", preview.clauses.ownership],
                "6. Confidentiality": ["confidentiality", preview.clauses.confidentiality],
                "7. Termination": ["termination", preview.clauses.termination],
                "8. Disputes": ["disputes", preview.clauses.disputes],
              }).map(([title, [key, text]])=>(
                text ? (
                  <div className="clause" key={key}>
                    <div className="clause-num">{title.split(".")[0]}.</div>
                    <div className="clause-title">{title.split(". ")[1]}</div>
                    <div className="clause-body">{text}</div>
                  </div>
                ) : null
              ))}

              {con.additionalInfo && (
                <div className="contract-notes-box">
                  <div className="contract-notes-label">Additional Terms</div>
                  <div className="contract-notes-text">{con.additionalInfo}</div>
                </div>
              )}

              <div className="signatures">
                <div>
                  <div className="sig-line" />
                  <div className="sig-label">Freelancer Signature</div>
                  <div className="sig-name">{con.freelancerName||"_______________"}</div>
                  <div className="sig-label" style={{marginTop:4}}>Date: ___________</div>
                </div>
                <div>
                  <div className="sig-line" />
                  <div className="sig-label">Client Signature</div>
                  <div className="sig-name">{con.clientName||"_______________"}</div>
                  <div className="sig-label" style={{marginTop:4}}>Date: ___________</div>
                </div>
              </div>

              <div className="disclaimer">
                ⚠️ This is an AI-generated document for reference only. This is not legal advice. Please review with a qualified lawyer before signing.
              </div>

              <div className="inv-footer" style={{marginTop:20}}>Generated with Qwikdoc · qwikdoc.com</div>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={()=>window.print()}>⬇ Download PDF</button>
              <button className="btn-secondary" onClick={()=>setPreview(null)}>Edit</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── PAYWALL ─── */}
      {showPaywall && (
        <div className="paywall-overlay">
          <div className="paywall-card">
            <div className="paywall-icon">✦</div>
            <h3>Free trial used</h3>
            <p>Upgrade to Pro for unlimited invoices and contracts, forever.</p>
            <div className="paywall-price">$9<sub>/mo</sub></div>
            <div className="paywall-features">
              <div className="pf">Unlimited invoices</div>
              <div className="pf">Unlimited contracts</div>
              <div className="pf">Logo upload on all documents</div>
              <div className="pf">AI-polished professional language</div>
              <div className="pf">PDF download every time</div>
              <div className="pf">Cancel anytime</div>
            </div>
            <button className="paywall-btn" onClick={()=>alert("Connect Lemon Squeezy checkout URL here")}>
              Upgrade for $9/mo
            </button>
            <div className="paywall-dismiss" onClick={()=>setShowPaywall(false)}>Maybe later</div>
          </div>
        </div>
      )}
    </>
  );
}