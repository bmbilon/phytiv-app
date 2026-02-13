import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area,
  ScatterChart, Scatter, ZAxis
} from "recharts";
import {
  Activity, Leaf, Users, TrendingUp, Package, Search, ChevronRight,
  ArrowLeft, Heart, Scale, Home, Sprout, Stethoscope,
  ArrowUpRight, ArrowDownRight, BarChart3, Bell, Eye,
  Thermometer, Droplets, Sun, Clock, CheckCircle2, AlertCircle,
  Apple, Filter, ShieldCheck, Database, Zap, Lock, Globe,
  RefreshCw, Settings, FileText, Download, FlaskConical, Microscope
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   PHYTIV — Food-as-Medicine Intelligence Platform
   Enterprise Dashboard · IU Health × Indy Health District
   ═══════════════════════════════════════════════════════════════════ */

// ── Design System ──────────────────────────────────────────────────
const SRC = {
  leaf: { bg:"bg-emerald-50", text:"text-emerald-700", border:"border-emerald-200", dot:"bg-emerald-500", label:"Leaf AgTech", hex:"#059669", Icon:Leaf },
  epic: { bg:"bg-blue-50", text:"text-blue-700", border:"border-blue-200", dot:"bg-blue-500", label:"Epic EHR", hex:"#2563EB", Icon:Stethoscope },
  hub:  { bg:"bg-amber-50", text:"text-amber-700", border:"border-amber-200", dot:"bg-amber-500", label:"Nutrition Hub", hex:"#D97706", Icon:Apple },
};
const PIE_COLORS = ["#059669","#0EA5E9","#8B5CF6","#F59E0B","#EC4899"];
const STATUS = {
  improving:  { bg:"bg-emerald-50", text:"text-emerald-700", border:"border-emerald-200" },
  stable:     { bg:"bg-sky-50",     text:"text-sky-700",     border:"border-sky-200" },
  monitoring: { bg:"bg-amber-50",   text:"text-amber-700",   border:"border-amber-200" },
  attention:  { bg:"bg-red-50",     text:"text-red-700",     border:"border-red-200" },
};

// ── Mock Data ──────────────────────────────────────────────────────
const PATIENTS = [
  { id:"P-10847",name:"Maria Santos",age:58,g:"F",conds:["Type 2 Diabetes","Hypertension"],dr:"Dr. Sarah Chen",fac:"IU Health Methodist",enr:"Sep 15, 2025",status:"improving",
    a1c:{c:6.8,b:8.4,t:7.0},bp:{c:"128/82",cs:128,b:"152/96",bs:152,t:"130/80"},bmi:{c:29.1,b:32.4,t:25.0},
    trend:[{m:"Sep '25",a1c:8.4,bp:152,wt:204},{m:"Oct",a1c:8.1,bp:148,wt:200},{m:"Nov",a1c:7.6,bp:140,wt:195},{m:"Dec",a1c:7.2,bp:134,wt:190},{m:"Jan '26",a1c:6.8,bp:128,wt:186}],
    rxs:[{food:"Lacinato Kale",cat:"Leafy Greens",qty:"3 lbs/wk",batch:"KL-2026-0147",adh:94},{food:"Detroit Red Beets",cat:"Root Vegetables",qty:"2 lbs/wk",batch:"BT-2026-0089",adh:87}]},
  { id:"P-10923",name:"James Wilson",age:64,g:"M",conds:["Hypertension","Hyperlipidemia"],dr:"Dr. Michael Torres",fac:"IU Health University",enr:"Oct 2, 2025",status:"improving",
    a1c:{c:5.9,b:6.1,t:5.7},bp:{c:"132/84",cs:132,b:"158/98",bs:158,t:"130/80"},bmi:{c:27.8,b:28.5,t:25.0},
    trend:[{m:"Oct '25",a1c:6.1,bp:158,wt:212},{m:"Nov",a1c:6.0,bp:150,wt:208},{m:"Dec",a1c:5.9,bp:142,wt:205},{m:"Jan '26",a1c:5.9,bp:136,wt:202},{m:"Feb",a1c:5.9,bp:132,wt:200}],
    rxs:[{food:"Baby Spinach",cat:"Leafy Greens",qty:"4 lbs/wk",batch:"SP-2026-0203",adh:91},{food:"Duke Blueberry",cat:"Berries",qty:"1.5 lbs/wk",batch:"BB-2026-0178",adh:78}]},
  { id:"P-11056",name:"Keisha Brown",age:45,g:"F",conds:["Pre-diabetes","Obesity"],dr:"Dr. Sarah Chen",fac:"Eskenazi Health",enr:"Nov 10, 2025",status:"stable",
    a1c:{c:5.8,b:6.3,t:5.7},bp:{c:"124/78",cs:124,b:"138/88",bs:138,t:"120/80"},bmi:{c:33.2,b:35.8,t:30.0},
    trend:[{m:"Nov '25",a1c:6.3,bp:138,wt:232},{m:"Dec",a1c:6.1,bp:132,wt:226},{m:"Jan '26",a1c:5.9,bp:128,wt:220},{m:"Feb",a1c:5.8,bp:124,wt:216}],
    rxs:[{food:"Calabrese Broccoli",cat:"Cruciferous",qty:"2.5 lbs/wk",batch:"BR-2026-0134",adh:82},{food:"Green Lentils",cat:"Legumes",qty:"2 lbs/wk",batch:"LN-2026-0091",adh:75}]},
  { id:"P-11102",name:"Robert Chen",age:72,g:"M",conds:["Coronary Artery Disease","Type 2 Diabetes"],dr:"Dr. Amanda Williams",fac:"IU Health Methodist",enr:"Aug 20, 2025",status:"improving",
    a1c:{c:7.1,b:9.2,t:7.0},bp:{c:"126/78",cs:126,b:"144/92",bs:144,t:"130/80"},bmi:{c:26.3,b:28.1,t:25.0},
    trend:[{m:"Aug '25",a1c:9.2,bp:144,wt:198},{m:"Sep",a1c:8.6,bp:140,wt:194},{m:"Oct",a1c:8.0,bp:136,wt:190},{m:"Nov",a1c:7.5,bp:132,wt:187},{m:"Dec",a1c:7.3,bp:128,wt:184},{m:"Jan '26",a1c:7.1,bp:126,wt:182}],
    rxs:[{food:"Lacinato Kale",cat:"Leafy Greens",qty:"3.5 lbs/wk",batch:"KL-2026-0147",adh:96},{food:"Beauregard Sweet Potato",cat:"Root Vegetables",qty:"2 lbs/wk",batch:"SW-2026-0156",adh:89},{food:"Duke Blueberry",cat:"Berries",qty:"1 lb/wk",batch:"BB-2026-0178",adh:92}]},
  { id:"P-11234",name:"Lisa Thompson",age:38,g:"F",conds:["Gestational Diabetes"],dr:"Dr. Michael Torres",fac:"IU Health University",enr:"Dec 1, 2025",status:"monitoring",
    a1c:{c:5.6,b:6.0,t:5.5},bp:{c:"118/74",cs:118,b:"126/82",bs:126,t:"120/80"},bmi:{c:28.5,b:29.2,t:27.0},
    trend:[{m:"Dec '25",a1c:6.0,bp:126,wt:182},{m:"Jan '26",a1c:5.8,bp:122,wt:180},{m:"Feb",a1c:5.6,bp:118,wt:178}],
    rxs:[{food:"Baby Spinach",cat:"Leafy Greens",qty:"3 lbs/wk",batch:"SP-2026-0203",adh:88},{food:"Green Lentils",cat:"Legumes",qty:"1.5 lbs/wk",batch:"LN-2026-0091",adh:71}]},
];

const BATCHES = [
  { id:"KL-2026-0147",crop:"Lacinato Kale",cat:"Leafy Greens",env:"Greenhouse A",harvested:"Jan 28, 2026",score:94,yield:"148 lbs",status:"Active",
    cond:[{d:"D1",temp:72,hum:65,light:840},{d:"D7",temp:74,hum:62,light:860},{d:"D14",temp:73,hum:68,light:820},{d:"D21",temp:71,hum:64,light:850},{d:"D28",temp:75,hum:60,light:870},{d:"D35",temp:73,hum:63,light:845}],
    nut:{vitA:96,vitC:88,iron:82,calcium:91,fiber:94,antioxidants:97},avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    pats:["P-10847","P-11102"],out:{a1c:-1.9,bp:-20}},
  { id:"SP-2026-0203",crop:"Baby Spinach",cat:"Leafy Greens",env:"Greenhouse B",harvested:"Feb 1, 2026",score:91,yield:"112 lbs",status:"Active",
    cond:[{d:"D1",temp:68,hum:70,light:780},{d:"D7",temp:70,hum:68,light:800},{d:"D14",temp:69,hum:72,light:760},{d:"D21",temp:71,hum:66,light:810},{d:"D28",temp:70,hum:69,light:790}],
    nut:{vitA:92,vitC:78,iron:90,calcium:85,fiber:80,antioxidants:88},avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    pats:["P-10923","P-11234"],out:{a1c:-0.3,bp:-22}},
  { id:"BT-2026-0089",crop:"Detroit Red Beets",cat:"Root Vegetables",env:"Field Plot 3",harvested:"Jan 15, 2026",score:88,yield:"96 lbs",status:"Active",
    cond:[{d:"D1",temp:58,hum:55,light:920},{d:"D14",temp:62,hum:52,light:940},{d:"D28",temp:60,hum:58,light:900},{d:"D42",temp:64,hum:50,light:960},{d:"D56",temp:61,hum:54,light:930}],
    nut:{vitA:72,vitC:68,iron:88,calcium:70,fiber:92,antioxidants:86},avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    pats:["P-10847"],out:{a1c:-1.6,bp:-24}},
  { id:"SW-2026-0156",crop:"Beauregard Sweet Potato",cat:"Root Vegetables",env:"Field Plot 1",harvested:"Jan 20, 2026",score:85,yield:"204 lbs",status:"Active",
    cond:[{d:"D1",temp:76,hum:60,light:980},{d:"D14",temp:78,hum:58,light:1000},{d:"D28",temp:77,hum:62,light:960},{d:"D42",temp:80,hum:56,light:1020},{d:"D56",temp:78,hum:59,light:990}],
    nut:{vitA:98,vitC:62,iron:68,calcium:64,fiber:78,antioxidants:74},avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    pats:["P-11102"],out:{a1c:-2.1,bp:-18}},
  { id:"BB-2026-0178",crop:"Duke Blueberry",cat:"Berries",env:"Greenhouse C",harvested:"Feb 3, 2026",score:92,yield:"64 lbs",status:"Active",
    cond:[{d:"D1",temp:66,hum:72,light:720},{d:"D7",temp:68,hum:70,light:740},{d:"D14",temp:67,hum:74,light:710},{d:"D21",temp:69,hum:68,light:750}],
    nut:{vitA:58,vitC:95,iron:52,calcium:48,fiber:72,antioxidants:98},avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    pats:["P-10923","P-11102"],out:{a1c:-0.4,bp:-16}},
  { id:"BR-2026-0134",crop:"Calabrese Broccoli",cat:"Cruciferous",env:"Greenhouse A",harvested:"Jan 22, 2026",score:87,yield:"88 lbs",status:"Active",
    cond:[{d:"D1",temp:64,hum:68,light:800},{d:"D10",temp:66,hum:65,light:820},{d:"D20",temp:65,hum:70,light:790},{d:"D30",temp:67,hum:64,light:830}],
    nut:{vitA:82,vitC:92,iron:74,calcium:88,fiber:86,antioxidants:90},avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    pats:["P-11056"],out:{a1c:-0.5,bp:-14}},
];

const TRENDS = [
  {m:"Aug '25",a1c:8.1,bp:148,n:8},{m:"Sep",a1c:7.8,bp:146,n:14},{m:"Oct",a1c:7.4,bp:142,n:22},
  {m:"Nov",a1c:7.1,bp:138,n:30},{m:"Dec",a1c:6.9,bp:134,n:36},{m:"Jan '26",a1c:6.7,bp:130,n:42},{m:"Feb",a1c:6.5,bp:127,n:47},
];
const FOOD_MIX = [{name:"Leafy Greens",v:34},{name:"Root Vegetables",v:22},{name:"Berries",v:18},{name:"Legumes",v:15},{name:"Cruciferous",v:11}];
const SPARKS = { pts:[8,14,22,30,36,42,47], rx:[12,28,41,56,68,79,89], a1c:[8.1,7.8,7.4,7.1,6.9,6.7,6.5], batch:[4,7,10,14,18,21,24] };
const FEED = [
  {t:"2 min ago",msg:"Batch KL-2026-0147 nutrient assay synced",src:"leaf"},
  {t:"8 min ago",msg:"Maria Santos — A1C result received: 6.8%",src:"epic"},
  {t:"15 min ago",msg:"Weekly fulfillment report: 89 Rx filled",src:"hub"},
  {t:"22 min ago",msg:"Greenhouse A environment telemetry synced",src:"leaf"},
  {t:"34 min ago",msg:"Robert Chen — lipid panel imported",src:"epic"},
  {t:"1 hr ago",msg:"12 prescriptions dispensed at Hub East",src:"hub"},
];

// ── Research Data ────────────────────────────────────────────────────
const CROP_CORR = [
  {crop:"Lacinato Kale",a1c:1.75,bp:20,n:18,p:0.003,cat:"Leafy Greens"},
  {crop:"Baby Spinach",a1c:0.30,bp:22,n:14,p:0.041,cat:"Leafy Greens"},
  {crop:"Detroit Red Beets",a1c:1.60,bp:24,n:11,p:0.008,cat:"Root Vegetables"},
  {crop:"Sweet Potato",a1c:2.10,bp:18,n:9,p:0.012,cat:"Root Vegetables"},
  {crop:"Duke Blueberry",a1c:0.40,bp:16,n:16,p:0.062,cat:"Berries"},
  {crop:"Calabrese Broccoli",a1c:0.50,bp:14,n:12,p:0.034,cat:"Cruciferous"},
  {crop:"Green Lentils",a1c:0.45,bp:12,n:10,p:0.048,cat:"Legumes"},
];
const COHORT_CMP = [
  {m:"Month 0",fam:8.2,ctrl:8.1},{m:"Month 1",fam:7.8,ctrl:8.0},{m:"Month 2",fam:7.4,ctrl:8.0},
  {m:"Month 3",fam:7.0,ctrl:7.9},{m:"Month 4",fam:6.8,ctrl:7.9},{m:"Month 5",fam:6.5,ctrl:7.8},
  {m:"Month 6",fam:6.3,ctrl:7.8},
];
const NUTRIENT_OUT = [
  {batch:"KL-0147",score:94,a1cD:1.75,n:18},{batch:"SP-0203",score:91,a1cD:0.30,n:14},
  {batch:"BT-0089",score:88,a1cD:1.60,n:11},{batch:"SW-0156",score:85,a1cD:2.10,n:9},
  {batch:"BB-0178",score:92,a1cD:0.40,n:16},{batch:"BR-0134",score:87,a1cD:0.50,n:12},
  {batch:"LN-0091",score:78,a1cD:0.45,n:10},{batch:"KL-0122",score:96,a1cD:1.90,n:15},
  {batch:"SP-0188",score:82,a1cD:0.25,n:8},{batch:"BT-0102",score:90,a1cD:1.80,n:13},
];

// ── UI Primitives ──────────────────────────────────────────────────
const Badge = ({src}) => { const s=SRC[src]; const I=s.Icon; return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${s.bg} ${s.text} border ${s.border}`}><I size={12}/>{s.label}</span>; };
const StatusPill = ({s}) => { const c=STATUS[s]||STATUS.stable; return <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${c.bg} ${c.text} border ${c.border}`}>{s==="improving"&&<ArrowUpRight size={11}/>}{s==="attention"&&<AlertCircle size={11}/>}{s}</span>; };
const Spark = ({data,color="#059669",h=28,w=72}) => (
  <ResponsiveContainer width={w} height={h}>
    <LineChart data={data.map(v=>({v}))}><Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false}/></LineChart>
  </ResponsiveContainer>
);
const KPI = ({label,value,sub,spark,sparkColor,icon:Icon,iconBg="bg-emerald-50",iconColor="text-emerald-600",trend}) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}><Icon size={20} className={iconColor}/></div>
      {spark && <Spark data={spark} color={sparkColor}/>}
    </div>
    <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
    <div className="flex items-center gap-2 mt-1.5">
      {trend!==undefined && <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${trend>=0?"text-emerald-600":"text-red-500"}`}>{trend>=0?<ArrowUpRight size={12}/>:<ArrowDownRight size={12}/>}{Math.abs(trend)}%</span>}
      <span className="text-xs text-slate-400">{sub}</span>
    </div>
    <p className="text-xs text-slate-500 mt-1 font-medium">{label}</p>
  </div>
);
const TT = ({active,payload,label}) => {
  if(!active||!payload) return null;
  return (<div className="bg-slate-800 text-white px-3 py-2.5 rounded-lg shadow-xl text-xs border border-slate-700"><p className="font-semibold text-slate-300 mb-1.5">{label}</p>{payload.map((p,i)=>(<p key={i} className="flex items-center gap-2 py-0.5"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:p.color||p.stroke}}/><span className="text-slate-400">{p.name}:</span><span className="font-semibold">{p.value}</span></p>))}</div>);
};
const Tab = ({labels,active,set}) => (
  <div className="flex gap-1 bg-slate-100 rounded-lg p-1 mb-5">
    {labels.map((l,i)=><button key={i} onClick={()=>set(i)} className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${i===active?"bg-white text-slate-900 shadow-sm":"text-slate-500 hover:text-slate-700"}`}>{l}</button>)}
  </div>
);
const Back = ({onClick,label}) => <button onClick={onClick} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-5 transition-colors font-medium"><ArrowLeft size={16}/>{label}</button>;
const Sect = ({children}) => <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{children}</h3>;
const Pbar = ({v,color="bg-emerald-500"}) => <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${color}`} style={{width:`${v}%`}}/></div>;
const Arrow = () => <div className="flex items-center justify-center px-1 flex-shrink-0"><div className="w-6 border-t-2 border-dashed border-slate-300"/><ChevronRight size={14} className="text-slate-400 -ml-1"/></div>;

// ══════════════════════════════════════════
// DASHBOARD VIEW
// ══════════════════════════════════════════
const DashboardView = ({goTo}) => (
  <div className="space-y-6 max-w-7xl">
    <div className="grid grid-cols-4 gap-5">
      <KPI label="Enrolled Patients" value="47" sub="across 3 facilities" icon={Users} trend={12} spark={SPARKS.pts} sparkColor="#059669"/>
      <KPI label="Active Food Rx" value="89" sub="this month" icon={Apple} iconBg="bg-amber-50" iconColor="text-amber-600" trend={8} spark={SPARKS.rx} sparkColor="#D97706"/>
      <KPI label="Avg A1C Reduction" value="1.4%" sub="from baseline" icon={TrendingUp} iconBg="bg-sky-50" iconColor="text-sky-600" trend={18} spark={SPARKS.a1c} sparkColor="#0EA5E9"/>
      <KPI label="Tracked Batches" value="24" sub="6 active crops" icon={Package} iconBg="bg-violet-50" iconColor="text-violet-600" trend={6} spark={SPARKS.batch} sparkColor="#8B5CF6"/>
    </div>

    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <div><h3 className="text-sm font-bold text-slate-900">Population Health Outcomes</h3><p className="text-xs text-slate-400 mt-0.5">Cohort average A1C and systolic BP over program duration</p></div>
          <div className="flex gap-5 text-xs font-medium">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-emerald-500"/>A1C (%)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-sky-500"/>Systolic BP (mmHg)</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={TRENDS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
            <XAxis dataKey="m" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={{stroke:"#e2e8f0"}} tickLine={false}/>
            <YAxis yAxisId="a" domain={[5.5,9]} tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
            <YAxis yAxisId="b" orientation="right" domain={[120,160]} tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
            <Tooltip content={<TT/>}/>
            <Line yAxisId="a" type="monotone" dataKey="a1c" stroke="#059669" strokeWidth={2.5} dot={{r:4,fill:"#059669",strokeWidth:2,stroke:"#fff"}} name="A1C (%)"/>
            <Line yAxisId="b" type="monotone" dataKey="bp" stroke="#0EA5E9" strokeWidth={2.5} dot={{r:4,fill:"#0EA5E9",strokeWidth:2,stroke:"#fff"}} name="Systolic BP"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-1">Prescription Mix</h3>
        <p className="text-xs text-slate-400 mb-4">Active Rx by food category</p>
        <ResponsiveContainer width="100%" height={170}>
          <PieChart><Pie data={FOOD_MIX} cx="50%" cy="50%" innerRadius={48} outerRadius={72} dataKey="v" paddingAngle={3} strokeWidth={0}>{FOOD_MIX.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i]}/>))}</Pie><Tooltip content={<TT/>}/></PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-3">
          {FOOD_MIX.map((f,i)=><div key={i} className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm" style={{background:PIE_COLORS[i]}}/><span className="text-xs text-slate-600">{f.name}</span></div><span className="text-xs font-semibold text-slate-900">{f.v}</span></div>)}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-slate-900">Patient Outcomes</h3>
          <button onClick={()=>goTo("patients")} className="text-xs text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1 transition-colors">View all<ChevronRight size={14}/></button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
            <th className="text-left px-6 py-3 font-semibold">Patient</th><th className="text-left px-3 py-3 font-semibold">Conditions</th>
            <th className="text-center px-3 py-3 font-semibold">A1C&nbsp;&Delta;</th><th className="text-center px-3 py-3 font-semibold">BP&nbsp;&Delta;</th>
            <th className="text-center px-3 py-3 font-semibold">Adherence</th><th className="text-right px-6 py-3 font-semibold">Status</th>
          </tr></thead>
          <tbody>{PATIENTS.map((p,idx)=>{
            const adh=Math.round(p.rxs.reduce((s,r)=>s+r.adh,0)/p.rxs.length);
            return(<tr key={p.id} onClick={()=>goTo("patient-detail",p)} className={`border-b border-gray-50 cursor-pointer hover:bg-emerald-50/50 transition-colors ${idx%2===0?"":"bg-slate-50/30"}`}>
              <td className="px-6 py-3.5"><p className="font-semibold text-slate-900">{p.name}</p><p className="text-xs text-slate-400 mt-0.5">{p.id} &middot; {p.age}{p.g}</p></td>
              <td className="px-3 py-3.5">{p.conds.map(c=><span key={c} className="inline-block bg-slate-100 text-slate-600 text-xs rounded px-2 py-0.5 mr-1 font-medium">{c}</span>)}</td>
              <td className="px-3 py-3.5 text-center"><span className="font-bold text-emerald-600">{(p.a1c.c-p.a1c.b).toFixed(1)}%</span></td>
              <td className="px-3 py-3.5 text-center"><span className="font-bold text-emerald-600">{p.bp.cs-p.bp.bs}</span></td>
              <td className="px-3 py-3.5"><div className="flex items-center justify-center gap-2"><div className="w-16"><Pbar v={adh}/></div><span className="text-xs font-semibold text-slate-700 w-8 text-right">{adh}%</span></div></td>
              <td className="px-6 py-3.5 text-right"><StatusPill s={p.status}/></td>
            </tr>);
          })}</tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-slate-900">Live Data Feed</h3>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>Synced</span>
        </div>
        <div className="p-4 space-y-1">
          {FEED.map((f,i)=>{const s=SRC[f.src]; const I=s.Icon; return(
            <div key={i} className="flex gap-3 items-start p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${s.bg} border ${s.border}`}><I size={14} className={s.text}/></div>
              <div className="min-w-0 flex-1"><p className="text-xs text-slate-700 leading-relaxed">{f.msg}</p><p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><Clock size={10}/>{f.t}</p></div>
            </div>
          );})}
        </div>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════
// PATIENT LIST
// ══════════════════════════════════════════
const PatientList = ({goTo}) => (
  <div className="max-w-7xl">
    <div className="flex items-center justify-between mb-6">
      <div><h2 className="text-lg font-bold text-slate-900">Patient Registry</h2><p className="text-sm text-slate-500">Enrolled patients with linked EHR and food prescription data</p></div>
      <div className="flex gap-2">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-slate-400 hover:border-slate-300 transition-colors cursor-text"><Search size={15}/><span>Search patients...</span></div>
        <button className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium"><Filter size={15}/>Filters</button>
      </div>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <table className="w-full text-sm">
        <thead><tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b border-gray-200">
          <th className="text-left px-6 py-3.5 font-semibold">Patient</th><th className="text-left px-3 py-3.5 font-semibold">Facility</th>
          <th className="text-left px-3 py-3.5 font-semibold">Conditions</th><th className="text-center px-3 py-3.5 font-semibold">A1C</th>
          <th className="text-center px-3 py-3.5 font-semibold">Systolic BP</th><th className="text-center px-3 py-3.5 font-semibold">Food Rx</th>
          <th className="text-center px-3 py-3.5 font-semibold">Status</th><th className="w-8 py-3.5"/>
        </tr></thead>
        <tbody>{PATIENTS.map((p,idx)=>(
          <tr key={p.id} onClick={()=>goTo("patient-detail",p)} className={`border-b border-gray-50 cursor-pointer hover:bg-emerald-50/50 transition-colors ${idx%2?"bg-slate-50/40":""}`}>
            <td className="px-6 py-4"><p className="font-semibold text-slate-900">{p.name}</p><p className="text-xs text-slate-400">{p.id} &middot; {p.age}{p.g} &middot; {p.dr}</p></td>
            <td className="px-3 py-4 text-xs text-slate-600 font-medium">{p.fac}</td>
            <td className="px-3 py-4">{p.conds.map(c=><span key={c} className="inline-block bg-slate-100 text-slate-600 text-xs rounded px-2 py-0.5 mr-1 mb-0.5 font-medium">{c}</span>)}</td>
            <td className="px-3 py-4 text-center"><span className="font-bold text-slate-900">{p.a1c.c}</span><span className="text-slate-400 text-xs ml-1">({p.a1c.b})</span></td>
            <td className="px-3 py-4 text-center"><span className="font-bold text-slate-900">{p.bp.cs}</span><span className="text-slate-400 text-xs ml-1">({p.bp.bs})</span></td>
            <td className="px-3 py-4 text-center"><span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2 py-0.5 rounded">{p.rxs.length}</span></td>
            <td className="px-3 py-4 text-center"><StatusPill s={p.status}/></td>
            <td className="pr-4 py-4"><ChevronRight size={16} className="text-slate-300"/></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);

// ══════════════════════════════════════════
// PATIENT DETAIL
// ══════════════════════════════════════════
const PatientDetail = ({p,goTo,goBack:back}) => {
  const [tab,setTab] = useState(0);
  return (
  <div className="max-w-7xl">
    <Back onClick={back} label="All Patients"/>
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex gap-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-lg font-bold shadow-sm">{p.name.split(" ").map(n=>n[0]).join("")}</div>
          <div>
            <div className="flex items-center gap-3"><h2 className="text-xl font-bold text-slate-900">{p.name}</h2><StatusPill s={p.status}/></div>
            <p className="text-sm text-slate-500 mt-0.5">{p.id} &middot; {p.age}{p.g} &middot; Enrolled {p.enr}</p>
            <div className="flex items-center gap-3 mt-2.5"><Badge src="epic"/><span className="text-xs text-slate-400">{p.fac} &middot; {p.dr}</span></div>
            <div className="flex gap-1.5 mt-2.5">{p.conds.map(c=><span key={c} className="bg-blue-50 text-blue-700 border border-blue-200 text-xs rounded-md px-2.5 py-0.5 font-semibold">{c}</span>)}</div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-5 mb-5">
      {[
        {lbl:"A1C",cur:p.a1c.c+"%",base:p.a1c.b+"%",tgt:p.a1c.t+"%",delta:((p.a1c.c-p.a1c.b)).toFixed(1)+"%",hit:p.a1c.c<=p.a1c.t},
        {lbl:"Systolic BP",cur:p.bp.cs+" mmHg",base:p.bp.bs+" mmHg",tgt:p.bp.t,delta:(p.bp.cs-p.bp.bs)+" mmHg",hit:p.bp.cs<=130},
        {lbl:"BMI",cur:p.bmi.c.toFixed(1),base:p.bmi.b.toFixed(1),tgt:p.bmi.t.toFixed(1),delta:((p.bmi.c-p.bmi.b)).toFixed(1),hit:p.bmi.c<=p.bmi.t},
      ].map((m,i)=>(
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2"><span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{m.lbl}</span><Badge src="epic"/></div>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">{m.cur}</p>
          <div className="mt-3 flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><ArrowDownRight size={13}/>{m.delta}</span>
            <span className="text-slate-400">Baseline {m.base}</span>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex-1"><Pbar v={m.hit?100:Math.min(95,80)} color={m.hit?"bg-emerald-500":"bg-amber-400"}/></div>
            <span className={`text-xs font-semibold ${m.hit?"text-emerald-600":"text-amber-600"}`}>{m.hit?"Target met":"Target: "+m.tgt}</span>
          </div>
        </div>
      ))}
    </div>

    <Tab labels={["Health Trends","Food Prescriptions","Batch Traceability"]} active={tab} set={setTab}/>

    {tab===0 && (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div><h3 className="text-sm font-bold text-slate-900">Longitudinal Health Metrics</h3><p className="text-xs text-slate-400 mt-0.5">Monthly A1C and weight since enrollment</p></div>
          <div className="flex gap-5 text-xs font-medium"><span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-emerald-500"/>A1C (%)</span><span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-amber-400"/>Weight (lbs)</span></div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={p.trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
            <XAxis dataKey="m" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={{stroke:"#e2e8f0"}} tickLine={false}/>
            <YAxis yAxisId="a" domain={["dataMin-0.5","dataMax+0.5"]} tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
            <YAxis yAxisId="w" orientation="right" domain={["dataMin-10","dataMax+10"]} tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
            <Tooltip content={<TT/>}/>
            <Line yAxisId="a" type="monotone" dataKey="a1c" stroke="#059669" strokeWidth={2.5} dot={{r:5,fill:"#059669",strokeWidth:2,stroke:"#fff"}} name="A1C (%)"/>
            <Line yAxisId="w" type="monotone" dataKey="wt" stroke="#F59E0B" strokeWidth={2} dot={{r:4,fill:"#F59E0B",strokeWidth:2,stroke:"#fff"}} strokeDasharray="6 3" name="Weight (lbs)"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}

    {tab===1 && (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <Sect>Active Food Prescriptions</Sect>
        <div className="space-y-3">
          {p.rxs.map((rx,i)=>(
            <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center"><Sprout size={20} className="text-emerald-600"/></div>
                <div><p className="font-semibold text-slate-900 text-sm">{rx.food}</p><p className="text-xs text-slate-400 mt-0.5">{rx.cat} &middot; {rx.qty}</p></div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right"><p className="text-xs text-slate-400 font-medium">Batch</p><button onClick={(e)=>{e.stopPropagation();const b=BATCHES.find(b=>b.id===rx.batch);if(b)goTo("crop-detail",null,b);}} className="text-xs font-mono text-emerald-600 font-bold hover:underline mt-0.5">{rx.batch}</button></div>
                <div className="text-right w-28"><p className="text-xs text-slate-400 font-medium mb-1">Adherence</p><div className="flex items-center gap-2"><div className="flex-1"><Pbar v={rx.adh}/></div><span className="text-sm font-bold text-slate-900 w-10 text-right">{rx.adh}%</span></div></div>
                <Badge src="leaf"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {tab===2 && (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <Sect>Farm-to-Patient-to-Outcome Traceability</Sect>
        <p className="text-xs text-slate-400 mb-5">Complete chain of custody: growing environment to distribution to clinical outcome</p>
        <div className="space-y-5">
          {p.rxs.map((rx,i)=>{
            const b=BATCHES.find(b=>b.id===rx.batch);
            return (
              <div key={i} className="rounded-xl border border-gray-200 p-5 bg-slate-50/50">
                <div className="flex items-stretch gap-0">
                  <div className="flex-1 rounded-lg border-2 border-emerald-200 bg-white p-4">
                    <div className="flex items-center gap-2 mb-3"><Leaf size={16} className="text-emerald-600"/><span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Leaf AgTech</span></div>
                    <p className="text-sm font-bold text-slate-900">{b?.crop||rx.food}</p>
                    <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                      <p>Batch: <span className="font-mono font-bold text-emerald-700">{rx.batch}</span></p>
                      <p>Environment: <span className="font-semibold">{b?.env}</span></p>
                      <p>Harvested: <span className="font-semibold">{b?.harvested}</span></p>
                      <p>Nutrient Score: <span className="font-bold text-emerald-700 text-sm">{b?.score}/100</span></p>
                    </div>
                  </div>
                  <Arrow/>
                  <div className="flex-1 rounded-lg border-2 border-amber-200 bg-white p-4">
                    <div className="flex items-center gap-2 mb-3"><Apple size={16} className="text-amber-600"/><span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Nutrition Hub</span></div>
                    <p className="text-sm font-bold text-slate-900">Rx Fulfillment</p>
                    <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                      <p>Item: <span className="font-semibold">{rx.food}</span></p>
                      <p>Quantity: <span className="font-semibold">{rx.qty}</span></p>
                      <p>Adherence: <span className="font-bold text-amber-700 text-sm">{rx.adh}%</span></p>
                      <p>Site: <span className="font-semibold">{p.fac}</span></p>
                    </div>
                  </div>
                  <Arrow/>
                  <div className="flex-1 rounded-lg border-2 border-blue-200 bg-white p-4">
                    <div className="flex items-center gap-2 mb-3"><Stethoscope size={16} className="text-blue-600"/><span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Epic EHR</span></div>
                    <p className="text-sm font-bold text-slate-900">Clinical Outcome</p>
                    <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                      <p>A1C: <span className="font-semibold">{p.a1c.b}%</span> <span className="text-slate-400">→</span> <span className="font-bold text-emerald-600">{p.a1c.c}%</span></p>
                      <p>BP: <span className="font-semibold">{p.bp.b}</span> <span className="text-slate-400">→</span> <span className="font-bold text-emerald-600">{p.bp.c}</span></p>
                      <p>BMI: <span className="font-semibold">{p.bmi.b}</span> <span className="text-slate-400">→</span> <span className="font-bold text-emerald-600">{p.bmi.c}</span></p>
                      <p className="mt-1 font-bold text-emerald-700 text-sm">Net A1C: {(p.a1c.c-p.a1c.b).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </div>
  );
};

// ══════════════════════════════════════════
// CROP / BATCH LIST
// ══════════════════════════════════════════
const CropList = ({goTo}) => (
  <div className="max-w-7xl">
    <div className="flex items-center justify-between mb-6">
      <div><h2 className="text-lg font-bold text-slate-900">Crop & Batch Registry</h2><p className="text-sm text-slate-500">Tracked batches from Leaf-connected growing environments</p></div>
      <Badge src="leaf"/>
    </div>
    <div className="grid grid-cols-3 gap-5">
      {BATCHES.map(b=>(
        <div key={b.id} onClick={()=>goTo("crop-detail",null,b)} className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:border-emerald-300 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-bold">{b.id}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">{b.status}</span>
          </div>
          <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{b.crop}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{b.cat} &middot; {b.env}</p>
          <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-4 mt-4">
            <div><p className="text-xl font-bold text-emerald-600">{b.score}</p><p className="text-xs text-slate-400">Nutrient</p></div>
            <div><p className="text-xl font-bold text-slate-900">{b.yield}</p><p className="text-xs text-slate-400">Yield</p></div>
            <div><p className="text-xl font-bold text-sky-600">{b.pats.length}</p><p className="text-xs text-slate-400">Patients</p></div>
          </div>
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-1"><Clock size={11}/>Harvested {b.harvested}</p>
        </div>
      ))}
    </div>
  </div>
);

// ══════════════════════════════════════════
// CROP / BATCH DETAIL
// ══════════════════════════════════════════
const CropDetail = ({b,goTo,goBack:back}) => {
  const [tab,setTab] = useState(0);
  const radar = Object.keys(b.nut).map(k=>({s:k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase()),batch:b.nut[k],avg:b.avg[k]}));
  const linked = PATIENTS.filter(pt=>b.pats.includes(pt.id));
  return (
  <div className="max-w-7xl">
    <Back onClick={back} label="All Crops"/>
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex gap-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-sm"><Sprout size={28} className="text-white"/></div>
          <div>
            <div className="flex items-center gap-3"><h2 className="text-xl font-bold text-slate-900">{b.crop}</h2><span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">{b.status}</span></div>
            <p className="text-sm text-slate-500 font-mono mt-0.5">{b.id}</p>
            <div className="flex items-center gap-3 mt-2.5"><Badge src="leaf"/><span className="text-xs text-slate-400">{b.env} &middot; Harvested {b.harvested} &middot; {b.yield}</span></div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold text-emerald-600 tracking-tight">{b.score}<span className="text-sm text-slate-400 font-normal ml-0.5">/100</span></p>
          <p className="text-xs text-slate-400 font-medium">Nutrient Density Score</p>
        </div>
      </div>
    </div>

    <Tab labels={["Growing Conditions","Nutrient Analysis","Patient Outcomes"]} active={tab} set={setTab}/>

    {tab===0 && (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div><h3 className="text-sm font-bold text-slate-900">Environmental Telemetry</h3><p className="text-xs text-slate-400 mt-0.5">Temperature and humidity across growing cycle from Leaf sensors</p></div>
          <div className="flex gap-5 text-xs font-medium"><span className="flex items-center gap-1.5"><Thermometer size={12} className="text-red-400"/>Temp (°F)</span><span className="flex items-center gap-1.5"><Droplets size={12} className="text-sky-400"/>Humidity (%)</span></div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={b.cond}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
            <XAxis dataKey="d" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={{stroke:"#e2e8f0"}} tickLine={false}/>
            <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
            <Tooltip content={<TT/>}/>
            <Area type="monotone" dataKey="temp" stroke="#EF4444" fill="#FEE2E2" fillOpacity={0.5} strokeWidth={2} name="Temp (°F)"/>
            <Area type="monotone" dataKey="hum" stroke="#0EA5E9" fill="#E0F2FE" fillOpacity={0.5} strokeWidth={2} name="Humidity (%)"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )}

    {tab===1 && (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2"><div><h3 className="text-sm font-bold text-slate-900">Nutrient Density Profile</h3><p className="text-xs text-slate-400 mt-0.5">Percentile scores — this batch vs. {b.cat} category average</p></div></div>
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={340}>
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radar}>
              <PolarGrid stroke="#e2e8f0"/>
              <PolarAngleAxis dataKey="s" tick={{fontSize:11,fill:"#475569"}} />
              <PolarRadiusAxis angle={30} domain={[0,100]} tick={{fontSize:10,fill:"#cbd5e1"}} />
              <Radar name="This Batch" dataKey="batch" stroke="#059669" fill="#059669" fillOpacity={0.2} strokeWidth={2.5}/>
              <Radar name="Category Avg" dataKey="avg" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="5 5"/>
              <Tooltip content={<TT/>}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-8 text-xs font-medium mt-2">
          <span className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded bg-emerald-500 opacity-30 border border-emerald-500"/>This Batch</span>
          <span className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded bg-slate-400 opacity-20 border border-slate-400 border-dashed"/>Category Avg</span>
        </div>
      </div>
    )}

    {tab===2 && (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <Sect>Linked Patient Outcomes</Sect>
        <p className="text-xs text-slate-400 mb-5">Health outcomes for patients receiving items from batch {b.id}</p>
        <div className="space-y-3">
          {linked.map(pt=>(
            <div key={pt.id} onClick={()=>goTo("patient-detail",pt)} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-emerald-300 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">{pt.name.split(" ").map(n=>n[0]).join("")}</div>
                <div><p className="font-semibold text-slate-900 text-sm">{pt.name} <span className="text-slate-400 text-xs font-normal">{pt.id}</span></p><p className="text-xs text-slate-500">{pt.conds.join(", ")}</p></div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center"><p className="font-bold text-emerald-600">{(pt.a1c.c-pt.a1c.b).toFixed(1)}%</p><p className="text-xs text-slate-400">A1C &Delta;</p></div>
                <div className="text-center"><p className="font-bold text-emerald-600">{pt.bp.cs-pt.bp.bs}</p><p className="text-xs text-slate-400">BP &Delta;</p></div>
                <StatusPill s={pt.status}/>
                <ChevronRight size={16} className="text-slate-300"/>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
          <p className="text-sm font-bold text-emerald-800">Batch Outcome Summary</p>
          <p className="text-xs text-emerald-700 mt-1">Patients receiving <span className="font-mono font-bold">{b.id}</span> ({b.crop}) showed avg A1C change of <span className="font-bold">{b.out.a1c}%</span> and systolic BP change of <span className="font-bold">{b.out.bp} mmHg</span> from baseline.</p>
        </div>
      </div>
    )}
  </div>
  );
};

// ══════════════════════════════════════════
// RESEARCH ANALYTICS VIEW
// ══════════════════════════════════════════
const SigBadge = ({p}) => {
  const sig = p<0.01?"p<0.01":p<0.05?`p=${p.toFixed(3)}`:`p=${p.toFixed(3)}`;
  const color = p<0.01?"bg-emerald-50 text-emerald-700 border-emerald-200":p<0.05?"bg-sky-50 text-sky-700 border-sky-200":"bg-slate-100 text-slate-500 border-slate-200";
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-semibold border ${color}`}>{p<0.05&&<CheckCircle2 size={10}/>}{sig}</span>;
};

const ResearchView = () => {
  const [tab, setTab] = useState(0);
  return (
  <div className="max-w-7xl space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Research Analytics</h2>
        <p className="text-sm text-slate-500">Crop-to-outcome correlations, cohort analysis, and data export</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-white border border-gray-200 rounded-lg px-3 py-1.5"><Lock size={12}/>De-identified</span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5"><ShieldCheck size={12}/>IRB Compliant</span>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-5">
      <KPI label="Research Cohort" value="47" sub="enrolled patients" icon={Users} iconBg="bg-violet-50" iconColor="text-violet-600"/>
      <KPI label="Significant Correlations" value="5 / 7" sub="crops at p<0.05" icon={CheckCircle2} iconBg="bg-emerald-50" iconColor="text-emerald-600"/>
      <KPI label="Avg A1C Reduction" value="1.01%" sub="FaM cohort (n=47)" icon={TrendingUp} iconBg="bg-sky-50" iconColor="text-sky-600"/>
      <KPI label="Control Diff" value="0.3%" sub="vs. standard of care" icon={Activity} iconBg="bg-amber-50" iconColor="text-amber-600"/>
    </div>

    <Tab labels={["Crop Correlations","Cohort Analysis","Nutrient → Outcome","Data Export"]} active={tab} set={setTab}/>

    {tab===0 && (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div><h3 className="text-sm font-bold text-slate-900">Crop Consumption → A1C Reduction</h3><p className="text-xs text-slate-400 mt-0.5">Average A1C reduction by crop type with statistical significance</p></div>
          <div className="flex gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-emerald-500"/>A1C Improvement (%)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-sky-500"/>Systolic BP &Delta; (mmHg)</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={CROP_CORR} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
            <XAxis dataKey="crop" tick={{fontSize:10,fill:"#94a3b8"}} axisLine={{stroke:"#e2e8f0"}} tickLine={false} interval={0} angle={-15} textAnchor="end" height={60}/>
            <YAxis yAxisId="a" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} label={{value:"A1C Reduction (%)",angle:-90,position:"insideLeft",style:{fontSize:11,fill:"#94a3b8"}}}/>
            <YAxis yAxisId="b" orientation="right" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} label={{value:"BP Reduction (mmHg)",angle:90,position:"insideRight",style:{fontSize:11,fill:"#94a3b8"}}}/>
            <Tooltip content={<TT/>}/>
            <Bar yAxisId="a" dataKey="a1c" fill="#059669" name="A1C Δ (%)" radius={[4,4,0,0]} maxBarSize={36}/>
            <Bar yAxisId="b" dataKey="bp" fill="#0EA5E9" name="BP Δ (mmHg)" radius={[4,4,0,0]} maxBarSize={36}/>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6">
          <Sect>Statistical Summary</Sect>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-semibold">Crop</th>
                <th className="text-left px-3 py-3 font-semibold">Category</th>
                <th className="text-center px-3 py-3 font-semibold">A1C &Delta;</th>
                <th className="text-center px-3 py-3 font-semibold">BP &Delta;</th>
                <th className="text-center px-3 py-3 font-semibold">Sample (n)</th>
                <th className="text-center px-3 py-3 font-semibold">p-value</th>
                <th className="text-center px-3 py-3 font-semibold">Significance</th>
              </tr></thead>
              <tbody>{CROP_CORR.map((c,idx)=>(
                <tr key={c.crop} className={`border-b border-gray-50 ${idx%2?"bg-slate-50/40":""}`}>
                  <td className="px-5 py-3 font-semibold text-slate-900">{c.crop}</td>
                  <td className="px-3 py-3 text-xs text-slate-500">{c.cat}</td>
                  <td className="px-3 py-3 text-center font-bold text-emerald-600">-{c.a1c.toFixed(2)}%</td>
                  <td className="px-3 py-3 text-center font-bold text-sky-600">-{c.bp} mmHg</td>
                  <td className="px-3 py-3 text-center text-slate-700 font-semibold">{c.n}</td>
                  <td className="px-3 py-3 text-center"><span className="font-mono text-xs">{c.p.toFixed(3)}</span></td>
                  <td className="px-3 py-3 text-center"><SigBadge p={c.p}/></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-1"><AlertCircle size={11}/>Two-tailed paired t-test; significance threshold α = 0.05. Confidence intervals: 95%.</p>
        </div>
      </div>
    )}

    {tab===1 && (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div><h3 className="text-sm font-bold text-slate-900">FaM Cohort vs. Standard of Care</h3><p className="text-xs text-slate-400 mt-0.5">Average A1C trajectory over 6 months — food-as-medicine cohort vs. matched control</p></div>
          <div className="flex gap-5 text-xs font-medium">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-emerald-500"/>FaM Cohort (n=47)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-slate-400"/>Standard Care (n=52)</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={COHORT_CMP}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
            <XAxis dataKey="m" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={{stroke:"#e2e8f0"}} tickLine={false}/>
            <YAxis domain={[5.5,9]} tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} label={{value:"A1C (%)",angle:-90,position:"insideLeft",style:{fontSize:11,fill:"#94a3b8"}}}/>
            <Tooltip content={<TT/>}/>
            <Area type="monotone" dataKey="ctrl" stroke="#94A3B8" fill="#F1F5F9" fillOpacity={0.5} strokeWidth={2} strokeDasharray="6 3" name="Standard Care"/>
            <Area type="monotone" dataKey="fam" stroke="#059669" fill="#D1FAE5" fillOpacity={0.4} strokeWidth={2.5} name="FaM Cohort"/>
          </AreaChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            {label:"FaM A1C Change",val:"-1.9%",sub:"8.2% → 6.3%",color:"text-emerald-600"},
            {label:"Control A1C Change",val:"-0.3%",sub:"8.1% → 7.8%",color:"text-slate-500"},
            {label:"Between-Group Diff",val:"1.6%",sub:"p < 0.001, 95% CI [1.2, 2.0]",color:"text-emerald-700"},
          ].map((s,i)=>(
            <div key={i} className="bg-slate-50 rounded-lg border border-slate-200 p-4">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color} mt-1`}>{s.val}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4 flex items-center gap-1"><AlertCircle size={11}/>Propensity-score matched control cohort from IU Health EMR. ANCOVA adjusted for age, sex, and baseline A1C.</p>
      </div>
    )}

    {tab===2 && (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div><h3 className="text-sm font-bold text-slate-900">Nutrient Density Score → A1C Improvement</h3><p className="text-xs text-slate-400 mt-0.5">Each point = one crop batch; size = patient sample; color = outcome strength</p></div>
        </div>
        <ResponsiveContainer width="100%" height={360}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis type="number" dataKey="score" domain={[70,100]} tick={{fontSize:11,fill:"#94a3b8"}} axisLine={{stroke:"#e2e8f0"}} tickLine={false} name="Nutrient Score" label={{value:"Nutrient Density Score",position:"insideBottom",offset:-5,style:{fontSize:11,fill:"#94a3b8"}}}/>
            <YAxis type="number" dataKey="a1cD" domain={[0,2.5]} tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} name="A1C Δ" label={{value:"A1C Improvement (%)",angle:-90,position:"insideLeft",style:{fontSize:11,fill:"#94a3b8"}}}/>
            <ZAxis type="number" dataKey="n" range={[60,400]} name="Sample Size"/>
            <Tooltip content={({active,payload})=>{
              if(!active||!payload||!payload[0]) return null;
              const d=payload[0].payload;
              return (<div className="bg-slate-800 text-white px-3 py-2.5 rounded-lg shadow-xl text-xs border border-slate-700"><p className="font-semibold text-slate-300 mb-1">Batch {d.batch}</p><p className="py-0.5"><span className="text-slate-400">Nutrient Score:</span> <span className="font-semibold">{d.score}</span></p><p className="py-0.5"><span className="text-slate-400">A1C &Delta;:</span> <span className="font-semibold text-emerald-400">-{d.a1cD.toFixed(2)}%</span></p><p className="py-0.5"><span className="text-slate-400">Sample:</span> <span className="font-semibold">n={d.n}</span></p></div>);
            }}/>
            <Scatter data={NUTRIENT_OUT} fill="#059669" fillOpacity={0.6} stroke="#059669" strokeWidth={1.5}/>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-5 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
          <p className="text-sm font-bold text-emerald-800 flex items-center gap-2"><CheckCircle2 size={14}/>Correlation Finding</p>
          <p className="text-xs text-emerald-700 mt-1.5">Pearson r = <span className="font-mono font-bold">0.72</span> (p = 0.004) — moderate-to-strong positive correlation between batch nutrient density and patient A1C improvement. Higher nutrient density crops produce measurably better clinical outcomes.</p>
        </div>
      </div>
    )}

    {tab===3 && (
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div><h3 className="text-sm font-bold text-slate-900">Research Data Export</h3><p className="text-xs text-slate-400 mt-0.5">Export de-identified datasets for external analysis</p></div>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600"><ShieldCheck size={12}/>All exports automatically de-identified per HIPAA Safe Harbor</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              {fmt:"REDCap",desc:"XML format compatible with REDCap v14.x. Includes data dictionary, instrument mappings, and repeating event structure.",icon:Database,ext:".xml",rows:"47 records × 86 fields",color:"border-red-200 bg-red-50"},
              {fmt:"CSV Bundle",desc:"Flat file export with patient outcomes, crop data, and nutrient profiles. UTF-8 encoded, comma-delimited.",icon:FileText,ext:".csv (3 files)",rows:"47 patients, 24 batches, 89 Rx",color:"border-sky-200 bg-sky-50"},
              {fmt:"SPSS",desc:"Statistical package format with variable labels, value labels, and measurement scales pre-configured.",icon:BarChart3,ext:".sav",rows:"47 records × 86 variables",color:"border-violet-200 bg-violet-50"},
            ].map((e,i)=>(
              <div key={i} className={`rounded-xl border-2 p-5 ${e.color} hover:shadow-md transition-all cursor-pointer`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm"><e.icon size={20} className="text-slate-600"/></div>
                  <div><p className="font-bold text-slate-900">{e.fmt}</p><p className="text-xs text-slate-500 font-mono">{e.ext}</p></div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{e.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{e.rows}</span>
                  <button className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"><Download size={12}/>Export</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <Sect>Compliance & Audit</Sect>
          <div className="grid grid-cols-2 gap-4">
            {[
              {label:"De-identification Method",val:"HIPAA Safe Harbor (18 identifiers removed)",icon:ShieldCheck,color:"text-emerald-600"},
              {label:"IRB Protocol",val:"IU #2025-0847-FaM (Approved Dec 2025)",icon:FileText,color:"text-blue-600"},
              {label:"Data Use Agreement",val:"IU Health × Marion County HD (Active)",icon:Lock,color:"text-violet-600"},
              {label:"Export Audit Trail",val:"12 exports since Jan 2026 · 0 incidents",icon:Eye,color:"text-amber-600"},
            ].map((c,i)=>(
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <c.icon size={16} className={`mt-0.5 ${c.color} flex-shrink-0`}/>
                <div><p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{c.label}</p><p className="text-sm font-semibold text-slate-900 mt-0.5">{c.val}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

// ══════════════════════════════════════════
// MAIN APP SHELL
// ══════════════════════════════════════════
const NAV_MAIN = [{key:"dashboard",label:"Dashboard",Icon:Home},{key:"patients",label:"Patients",Icon:Users},{key:"crops",label:"Crops & Batches",Icon:Sprout},{key:"research",label:"Research",Icon:FlaskConical}];
const NAV_SYS = [{key:"integrations",label:"Integrations",Icon:Zap},{key:"settings",label:"Settings",Icon:Settings}];

export default function PhytivApp() {
  const [view,setView] = useState("dashboard");
  const [patient,setPatient] = useState(null);
  const [batch,setBatch] = useState(null);

  const goTo = (v,p=null,b=null) => { setView(v); if(p)setPatient(p); if(b)setBatch(b); window.scrollTo(0,0); };
  const goBack = () => { if(view==="patient-detail")setView("patients"); else if(view==="crop-detail")setView("crops"); else setView("dashboard"); window.scrollTo(0,0); };
  const navKey = view.startsWith("patient")?"patients":view.startsWith("crop")?"crops":view==="research"?"research":"dashboard";

  return (
    <div className="flex min-h-screen bg-slate-50" style={{fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"}}>
      {/* Sidebar */}
      <aside className="w-64 flex flex-col flex-shrink-0 bg-slate-900" style={{minHeight:"100vh"}}>
        <div className="p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md"><Leaf size={20} className="text-white"/></div>
          <div><p className="text-white font-bold text-lg tracking-tight">Phytiv</p><p className="text-slate-500 text-xs font-medium -mt-0.5">Intelligence Platform</p></div>
        </div>
        <div className="mx-4 mb-4 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <p className="text-amber-400 text-xs font-semibold text-center tracking-wide">DEMO ENVIRONMENT</p>
        </div>
        <div className="px-3 mb-2">
          <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 mb-2">Main</p>
          {NAV_MAIN.map(n=>(
            <button key={n.key} onClick={()=>setView(n.key)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${navKey===n.key?"bg-slate-800 text-white shadow-sm":"text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"}`}>
              <n.Icon size={18}/>{n.label}
              {navKey===n.key && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"/>}
            </button>
          ))}
        </div>
        <div className="px-3 mt-4">
          <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 mb-2">System</p>
          {NAV_SYS.map(n=>(
            <button key={n.key} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-800/60 hover:text-slate-300 transition-all mb-0.5"><n.Icon size={18}/>{n.label}</button>
          ))}
        </div>
        <div className="px-3 mt-auto pt-4">
          <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 mb-2">Data Sources</p>
          {Object.entries(SRC).map(([k,v])=>(
            <div key={k} className="flex items-center gap-2.5 px-3 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50"/>
              <span className="text-xs text-slate-400 font-medium">{v.label}</span>
              <span className="ml-auto text-xs text-emerald-500 font-semibold">Live</span>
            </div>
          ))}
        </div>
        <div className="p-4 mt-4 border-t border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">IU</div>
            <div><p className="text-slate-300 text-xs font-semibold">IU Health Admin</p><p className="text-slate-600 text-xs">demo.phytiv.com</p></div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-slate-900 font-semibold">Phytiv</span>
            <ChevronRight size={14}/>
            <span className="capitalize font-medium">{view.replace("-"," ").replace("detail","")}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400"><RefreshCw size={12}/>Last synced 2 min ago</div>
            <div className="w-px h-5 bg-gray-200"/>
            <div className="flex items-center gap-2 bg-slate-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-slate-400 hover:border-slate-300 transition-colors cursor-text"><Search size={14}/><span className="text-xs">Search...</span></div>
            <button className="relative hover:bg-slate-50 p-1.5 rounded-lg transition-colors"><Bell size={18} className="text-slate-400"/><span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"/></button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">JH</div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {view==="dashboard" && <DashboardView goTo={goTo}/>}
          {view==="patients" && <PatientList goTo={goTo}/>}
          {view==="patient-detail" && patient && <PatientDetail p={patient} goTo={goTo} goBack={goBack}/>}
          {view==="crops" && <CropList goTo={goTo}/>}
          {view==="crop-detail" && batch && <CropDetail b={batch} goTo={goTo} goBack={goBack}/>}
          {view==="research" && <ResearchView/>}
        </div>

        <footer className="h-11 bg-white border-t border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
          <span className="text-xs text-slate-400 font-medium">Phytiv v0.1.0 &middot; Demo Build &middot; IU Health &times; Marion County Health District</span>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-500"/>HIPAA</span>
            <span className="flex items-center gap-1"><Database size={12} className="text-sky-500"/>FHIR R4</span>
            <span className="flex items-center gap-1"><Globe size={12} className="text-violet-500"/>HL7v2</span>
            <span className="flex items-center gap-1"><Lock size={12} className="text-slate-400"/>SOC 2</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
