import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from "recharts";
import {
  Activity, Leaf, Users, TrendingUp, Package, Search, ChevronRight,
  ArrowLeft, Heart, Scale, Home, Sprout, Stethoscope,
  ArrowUpRight, ArrowDownRight, BarChart3, Bell, Eye, Link2,
  Thermometer, Droplets, Sun, Clock, CheckCircle2, AlertCircle,
  Apple, Building2, Filter, Zap, ShieldCheck, FileText
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   PHYTIV — Food-as-Medicine Intelligence Platform
   Connects: Leaf (AgTech) ↔ Nutrition Hub ↔ Epic (EHR)
   Demo build for IU Health / Indy Health District RFP
   ═══════════════════════════════════════════════════════════ */

// ── Colors ──
const SRC = {
  leaf:  { bg: "bg-emerald-50",  text: "text-emerald-700", dot: "bg-emerald-500", label: "Leaf AgTech",    hex: "#059669" },
  epic:  { bg: "bg-blue-50",     text: "text-blue-700",    dot: "bg-blue-500",    label: "Epic EHR",      hex: "#2563EB" },
  hub:   { bg: "bg-amber-50",    text: "text-amber-700",   dot: "bg-amber-500",   label: "Nutrition Hub", hex: "#D97706" },
};
const STATUS_CLR = { improving: "text-emerald-600", stable: "text-blue-600", monitoring: "text-amber-600", attention: "text-red-600" };
const STATUS_BG  = { improving: "bg-emerald-50",    stable: "bg-blue-50",    monitoring: "bg-amber-50",    attention: "bg-red-50" };
const PIE_COLORS = ["#059669", "#D97706", "#7C3AED", "#2563EB", "#EC4899"];

// ── Mock Data ──
const PATIENTS = [
  { id:"P-10847", name:"Maria Santos", age:58, gender:"F", conditions:["Type 2 Diabetes","Hypertension"], provider:"Dr. Sarah Chen", facility:"IU Health Methodist", enrolled:"Sep 2025", status:"improving",
    a1c:{cur:6.8,base:8.4,tgt:7.0}, bp:{cur:128,base:152,tgt:130}, bmi:{cur:29.1,base:32.4,tgt:25},
    trend:[{mo:"Sep",a1c:8.4,bp:152,wt:204},{mo:"Oct",a1c:8.1,bp:148,wt:200},{mo:"Nov",a1c:7.6,bp:140,wt:195},{mo:"Dec",a1c:7.2,bp:134,wt:190},{mo:"Jan",a1c:6.8,bp:128,wt:186}],
    rxs:[{food:"Kale & Leafy Greens",qty:"3 lbs/wk",batch:"KL-2026-0147",adh:94,src:"leaf"},{food:"Beets & Root Veg",qty:"2 lbs/wk",batch:"BT-2026-0089",adh:87,src:"leaf"}]},
  { id:"P-10923", name:"James Wilson", age:64, gender:"M", conditions:["Hypertension","Hyperlipidemia"], provider:"Dr. Michael Torres", facility:"IU Health University", enrolled:"Oct 2025", status:"improving",
    a1c:{cur:5.9,base:6.1,tgt:5.7}, bp:{cur:132,base:158,tgt:130}, bmi:{cur:27.8,base:28.5,tgt:25},
    trend:[{mo:"Oct",a1c:6.1,bp:158,wt:212},{mo:"Nov",a1c:6.0,bp:150,wt:208},{mo:"Dec",a1c:5.9,bp:142,wt:205},{mo:"Jan",a1c:5.9,bp:136,wt:202},{mo:"Feb",a1c:5.9,bp:132,wt:200}],
    rxs:[{food:"Spinach & Greens",qty:"4 lbs/wk",batch:"SP-2026-0203",adh:91,src:"leaf"},{food:"Blueberries",qty:"1.5 lbs/wk",batch:"BB-2026-0178",adh:78,src:"leaf"}]},
  { id:"P-11056", name:"Keisha Brown", age:45, gender:"F", conditions:["Pre-diabetes","Obesity"], provider:"Dr. Sarah Chen", facility:"Eskenazi Health", enrolled:"Nov 2025", status:"stable",
    a1c:{cur:5.8,base:6.3,tgt:5.7}, bp:{cur:124,base:138,tgt:120}, bmi:{cur:33.2,base:35.8,tgt:30},
    trend:[{mo:"Nov",a1c:6.3,bp:138,wt:232},{mo:"Dec",a1c:6.1,bp:132,wt:226},{mo:"Jan",a1c:5.9,bp:128,wt:220},{mo:"Feb",a1c:5.8,bp:124,wt:216}],
    rxs:[{food:"Broccoli & Cruciferous",qty:"2.5 lbs/wk",batch:"BR-2026-0134",adh:82,src:"leaf"},{food:"Lentils & Legumes",qty:"2 lbs/wk",batch:"LN-2026-0091",adh:75,src:"leaf"}]},
  { id:"P-11102", name:"Robert Chen", age:72, gender:"M", conditions:["Coronary Artery Disease","Type 2 Diabetes"], provider:"Dr. Amanda Williams", facility:"IU Health Methodist", enrolled:"Aug 2025", status:"improving",
    a1c:{cur:7.1,base:9.2,tgt:7.0}, bp:{cur:126,base:144,tgt:130}, bmi:{cur:26.3,base:28.1,tgt:25},
    trend:[{mo:"Aug",a1c:9.2,bp:144,wt:198},{mo:"Sep",a1c:8.6,bp:140,wt:194},{mo:"Oct",a1c:8.0,bp:136,wt:190},{mo:"Nov",a1c:7.5,bp:132,wt:187},{mo:"Dec",a1c:7.3,bp:128,wt:184},{mo:"Jan",a1c:7.1,bp:126,wt:182}],
    rxs:[{food:"Kale & Leafy Greens",qty:"3.5 lbs/wk",batch:"KL-2026-0147",adh:96,src:"leaf"},{food:"Sweet Potatoes",qty:"2 lbs/wk",batch:"SW-2026-0156",adh:89,src:"leaf"},{food:"Blueberries",qty:"1 lb/wk",batch:"BB-2026-0178",adh:92,src:"leaf"}]},
  { id:"P-11234", name:"Lisa Thompson", age:38, gender:"F", conditions:["Gestational Diabetes"], provider:"Dr. Michael Torres", facility:"IU Health University", enrolled:"Dec 2025", status:"monitoring",
    a1c:{cur:5.6,base:6.0,tgt:5.5}, bp:{cur:118,base:126,tgt:120}, bmi:{cur:28.5,base:29.2,tgt:27},
    trend:[{mo:"Dec",a1c:6.0,bp:126,wt:182},{mo:"Jan",a1c:5.8,bp:122,wt:180},{mo:"Feb",a1c:5.6,bp:118,wt:178}],
    rxs:[{food:"Spinach & Greens",qty:"3 lbs/wk",batch:"SP-2026-0203",adh:88,src:"leaf"},{food:"Lentils & Legumes",qty:"1.5 lbs/wk",batch:"LN-2026-0091",adh:71,src:"leaf"}]},
];

const BATCHES = [
  { id:"KL-2026-0147", crop:"Lacinato Kale", category:"Leafy Greens", env:"Greenhouse A", harvested:"Jan 28, 2026", nutrientScore:94, yield:"148 lbs", status:"Active",
    conditions:[{d:"D1",temp:72,hum:65,light:840},{d:"D7",temp:74,hum:62,light:860},{d:"D14",temp:73,hum:68,light:820},{d:"D21",temp:71,hum:64,light:850},{d:"D28",temp:75,hum:60,light:870},{d:"D35",temp:73,hum:63,light:845}],
    nutrients:{vitA:96,vitC:88,iron:82,calcium:91,fiber:94,antioxidants:97}, avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    patients:["P-10847","P-11102"], outcomeAvg:{a1c:-1.9, bp:-20} },
  { id:"SP-2026-0203", crop:"Baby Spinach", category:"Leafy Greens", env:"Greenhouse B", harvested:"Feb 1, 2026", nutrientScore:91, yield:"112 lbs", status:"Active",
    conditions:[{d:"D1",temp:68,hum:70,light:780},{d:"D7",temp:70,hum:68,light:800},{d:"D14",temp:69,hum:72,light:760},{d:"D21",temp:71,hum:66,light:810},{d:"D28",temp:70,hum:69,light:790}],
    nutrients:{vitA:92,vitC:78,iron:90,calcium:85,fiber:80,antioxidants:88}, avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    patients:["P-10923","P-11234"], outcomeAvg:{a1c:-0.3, bp:-22} },
  { id:"BT-2026-0089", crop:"Detroit Red Beets", category:"Root Vegetables", env:"Field Plot 3", harvested:"Jan 15, 2026", nutrientScore:88, yield:"96 lbs", status:"Active",
    conditions:[{d:"D1",temp:58,hum:55,light:920},{d:"D14",temp:62,hum:52,light:940},{d:"D28",temp:60,hum:58,light:900},{d:"D42",temp:64,hum:50,light:960},{d:"D56",temp:61,hum:54,light:930}],
    nutrients:{vitA:72,vitC:68,iron:88,calcium:70,fiber:92,antioxidants:86}, avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    patients:["P-10847"], outcomeAvg:{a1c:-1.6, bp:-24} },
  { id:"SW-2026-0156", crop:"Beauregard Sweet Potato", category:"Root Vegetables", env:"Field Plot 1", harvested:"Jan 20, 2026", nutrientScore:85, yield:"204 lbs", status:"Active",
    conditions:[{d:"D1",temp:76,hum:60,light:980},{d:"D14",temp:78,hum:58,light:1000},{d:"D28",temp:77,hum:62,light:960},{d:"D42",temp:80,hum:56,light:1020},{d:"D56",temp:78,hum:59,light:990}],
    nutrients:{vitA:98,vitC:62,iron:68,calcium:64,fiber:78,antioxidants:74}, avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    patients:["P-11102"], outcomeAvg:{a1c:-2.1, bp:-18} },
  { id:"BB-2026-0178", crop:"Duke Blueberry", category:"Berries", env:"Greenhouse C", harvested:"Feb 3, 2026", nutrientScore:92, yield:"64 lbs", status:"Active",
    conditions:[{d:"D1",temp:66,hum:72,light:720},{d:"D7",temp:68,hum:70,light:740},{d:"D14",temp:67,hum:74,light:710},{d:"D21",temp:69,hum:68,light:750}],
    nutrients:{vitA:58,vitC:95,iron:52,calcium:48,fiber:72,antioxidants:98}, avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    patients:["P-10923","P-11102"], outcomeAvg:{a1c:-0.4, bp:-16} },
  { id:"BR-2026-0134", crop:"Calabrese Broccoli", category:"Cruciferous", env:"Greenhouse A", harvested:"Jan 22, 2026", nutrientScore:87, yield:"88 lbs", status:"Active",
    conditions:[{d:"D1",temp:64,hum:68,light:800},{d:"D10",temp:66,hum:65,light:820},{d:"D20",temp:65,hum:70,light:790},{d:"D30",temp:67,hum:64,light:830}],
    nutrients:{vitA:82,vitC:92,iron:74,calcium:88,fiber:86,antioxidants:90}, avg:{vitA:78,vitC:74,iron:70,calcium:76,fiber:80,antioxidants:72},
    patients:["P-11056"], outcomeAvg:{a1c:-0.5, bp:-14} },
];

const OVERVIEW_TRENDS = [
  {mo:"Aug '25",a1c:8.1,bp:148,enrolled:8},{mo:"Sep",a1c:7.8,bp:146,enrolled:14},{mo:"Oct",a1c:7.4,bp:142,enrolled:22},
  {mo:"Nov",a1c:7.1,bp:138,enrolled:30},{mo:"Dec",a1c:6.9,bp:134,enrolled:36},{mo:"Jan '26",a1c:6.7,bp:130,enrolled:42},{mo:"Feb",a1c:6.5,bp:127,enrolled:47},
];
const FOOD_DIST = [
  {name:"Leafy Greens",value:34},{name:"Root Vegetables",value:22},{name:"Berries",value:18},{name:"Legumes",value:15},{name:"Cruciferous",value:11},
];
const ACTIVITY_LOG = [
  {time:"2 min ago", msg:"Batch KL-2026-0147 nutrient analysis synced", src:"leaf"},
  {time:"8 min ago", msg:"Maria Santos A1C result received: 6.8%", src:"epic"},
  {time:"15 min ago", msg:"Weekly Rx fulfillment report updated", src:"hub"},
  {time:"22 min ago", msg:"Greenhouse A temp/humidity readings synced", src:"leaf"},
  {time:"34 min ago", msg:"Robert Chen lab panel imported", src:"epic"},
  {time:"1 hr ago",  msg:"12 prescriptions filled at Hub East", src:"hub"},
];

// ── Tiny Helpers ──
const Badge = ({src}) => {const s=SRC[src]; return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}><span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}/>{s.label}</span>};
const StatusPill = ({status}) => <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_BG[status]} ${STATUS_CLR[status]}`}>{status==="improving"&&<ArrowUpRight size={12}/>}{status==="attention"&&<AlertCircle size={12}/>}{status}</span>;
const Metric = ({label,value,sub,icon:Icon,color="text-emerald-600",trend}) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color==="text-emerald-600"?"bg-emerald-50":color==="text-blue-600"?"bg-blue-50":color==="text-amber-600"?"bg-amber-50":"bg-purple-50"}`}>
        <Icon size={18} className={color}/>
      </div>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <div className="flex items-center gap-2 mt-1">
      {trend && <span className={`text-xs font-medium flex items-center gap-0.5 ${trend>0?"text-emerald-600":"text-red-500"}`}>{trend>0?<ArrowUpRight size={12}/>:<ArrowDownRight size={12}/>}{Math.abs(trend)}%</span>}
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  </div>
);
const Tab = ({labels, active, onSelect}) => (
  <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
    {labels.map((l,i)=><button key={i} onClick={()=>onSelect(i)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${i===active?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>{l}</button>)}
  </div>
);
const Back = ({onClick,label}) => <button onClick={onClick} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"><ArrowLeft size={16}/>{label}</button>;
const SectionHead = ({children}) => <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">{children}</h3>;

// ══════════════════════════════════
// DASHBOARD OVERVIEW
// ══════════════════════════════════
const DashboardView = ({goTo}) => (
  <div className="space-y-6">
    {/* Hero Banner */}
    <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Food-as-Medicine Program</h2>
          <p className="text-emerald-200 text-sm">IU Health &middot; Marion County &middot; Indy Urban AgTech Collaborative</p>
        </div>
        <div className="flex gap-3">
          {Object.entries(SRC).map(([k,v])=>(
            <div key={k} className="flex items-center gap-2 bg-white bg-opacity-10 rounded-lg px-3 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"/><span className="text-xs font-medium">{v.label}</span><CheckCircle2 size={14} className="text-emerald-300"/>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Top Metrics */}
    <div className="grid grid-cols-4 gap-4">
      <Metric label="Enrolled Patients" value="47" sub="across 3 facilities" icon={Users} trend={12} />
      <Metric label="Active Food Rx" value="89" sub="this month" icon={Apple} color="text-amber-600" trend={8} />
      <Metric label="Avg A1C Improvement" value="−1.4%" sub="from baseline" icon={TrendingUp} color="text-blue-600" trend={18} />
      <Metric label="Batches Tracked" value="24" sub="6 active crops" icon={Package} color="text-purple-600" trend={6} />
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-3 gap-4">
      {/* Outcome Trends */}
      <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Population Health Outcomes</h3>
            <p className="text-xs text-gray-400 mt-0.5">Avg A1C &amp; systolic BP across enrolled patients</p>
          </div>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-emerald-500 rounded"/>A1C (%)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-500 rounded"/>Systolic BP</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={OVERVIEW_TRENDS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
            <XAxis dataKey="mo" tick={{fontSize:11}} stroke="#9ca3af"/>
            <YAxis yAxisId="a1c" domain={[5.5,9]} tick={{fontSize:11}} stroke="#9ca3af"/>
            <YAxis yAxisId="bp" orientation="right" domain={[120,160]} tick={{fontSize:11}} stroke="#9ca3af"/>
            <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
            <Line yAxisId="a1c" type="monotone" dataKey="a1c" stroke="#059669" strokeWidth={2.5} dot={{r:4,fill:"#059669"}}/>
            <Line yAxisId="bp" type="monotone" dataKey="bp" stroke="#2563EB" strokeWidth={2.5} dot={{r:4,fill:"#2563EB"}}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Food Category Distribution */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Prescription Mix</h3>
        <p className="text-xs text-gray-400 mb-3">Active Rx by food category</p>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={FOOD_DIST} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
              {FOOD_DIST.map((_,i)=><Cell key={i} fill={PIE_COLORS[i]}/>)}
            </Pie>
            <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
          {FOOD_DIST.map((f,i)=><div key={i} className="flex items-center gap-1.5 text-xs text-gray-600"><span className="w-2 h-2 rounded-full" style={{background:PIE_COLORS[i]}}/>{f.name}</div>)}
        </div>
      </div>
    </div>

    {/* Bottom Row */}
    <div className="grid grid-cols-3 gap-4">
      {/* Patient Quick List */}
      <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Patient Outcomes Snapshot</h3>
          <button onClick={()=>goTo("patients")} className="text-xs text-emerald-600 font-medium hover:underline flex items-center gap-1">View all <ChevronRight size={14}/></button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
            <th className="text-left pb-2 font-medium">Patient</th><th className="text-left pb-2 font-medium">Conditions</th>
            <th className="text-center pb-2 font-medium">A1C Δ</th><th className="text-center pb-2 font-medium">BP Δ</th>
            <th className="text-center pb-2 font-medium">Adherence</th><th className="text-right pb-2 font-medium">Status</th>
          </tr></thead>
          <tbody>
            {PATIENTS.map(p=>{
              const avgAdh = Math.round(p.rxs.reduce((s,r)=>s+r.adh,0)/p.rxs.length);
              return (
                <tr key={p.id} onClick={()=>goTo("patient-detail",p)} className="border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors">
                  <td className="py-3 font-medium text-gray-900">{p.name}<span className="text-gray-400 text-xs ml-2">{p.id}</span></td>
                  <td className="py-3 text-gray-500 text-xs">{p.conditions.join(", ")}</td>
                  <td className="py-3 text-center font-semibold text-emerald-600">{(p.a1c.cur - p.a1c.base).toFixed(1)}%</td>
                  <td className="py-3 text-center font-semibold text-emerald-600">{p.bp.cur - p.bp.base} mmHg</td>
                  <td className="py-3 text-center"><div className="flex items-center justify-center gap-1"><div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{width:`${avgAdh}%`}}/></div><span className="text-xs text-gray-500">{avgAdh}%</span></div></td>
                  <td className="py-3 text-right"><StatusPill status={p.status}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Live Activity Feed */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Live Data Feed</h3>
          <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>Connected</span>
        </div>
        <div className="space-y-3">
          {ACTIVITY_LOG.map((a,i)=>(
            <div key={i} className="flex gap-3 items-start">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${SRC[a.src].bg}`}>
                {a.src==="leaf"?<Leaf size={14} className={SRC[a.src].text}/>:a.src==="epic"?<Stethoscope size={14} className={SRC[a.src].text}/>:<Apple size={14} className={SRC[a.src].text}/>}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-700 leading-snug">{a.msg}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════
// PATIENT LIST
// ══════════════════════════════════
const PatientList = ({goTo}) => (
  <div>
    <div className="flex items-center justify-between mb-5">
      <div><h2 className="text-lg font-bold text-gray-900">Patient Registry</h2><p className="text-sm text-gray-500">Food-as-Medicine enrolled patients with linked EHR data</p></div>
      <div className="flex gap-2">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500"><Search size={15}/><span>Search patients...</span></div>
        <button className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"><Filter size={15}/>Filter</button>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase">
          <th className="text-left px-5 py-3 font-medium">Patient</th><th className="text-left px-3 py-3 font-medium">Facility</th>
          <th className="text-left px-3 py-3 font-medium">Conditions</th><th className="text-center px-3 py-3 font-medium">A1C (Cur/Base)</th>
          <th className="text-center px-3 py-3 font-medium">BP (Cur/Base)</th><th className="text-center px-3 py-3 font-medium">Food Rx</th>
          <th className="text-center px-3 py-3 font-medium">Status</th><th className="px-3 py-3"/>
        </tr></thead>
        <tbody>
          {PATIENTS.map(p=>(
            <tr key={p.id} onClick={()=>goTo("patient-detail",p)} className="border-b border-gray-50 cursor-pointer hover:bg-emerald-50 transition-colors">
              <td className="px-5 py-4"><p className="font-medium text-gray-900">{p.name}</p><p className="text-xs text-gray-400">{p.id} &middot; {p.age}{p.gender} &middot; {p.provider}</p></td>
              <td className="px-3 py-4 text-xs text-gray-600">{p.facility}</td>
              <td className="px-3 py-4">{p.conditions.map(c=><span key={c} className="inline-block bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-0.5 mr-1 mb-0.5">{c}</span>)}</td>
              <td className="px-3 py-4 text-center"><span className="font-semibold text-gray-900">{p.a1c.cur}</span><span className="text-gray-400 text-xs"> / {p.a1c.base}</span></td>
              <td className="px-3 py-4 text-center"><span className="font-semibold text-gray-900">{p.bp.cur}</span><span className="text-gray-400 text-xs"> / {p.bp.base}</span></td>
              <td className="px-3 py-4 text-center text-gray-700">{p.rxs.length}</td>
              <td className="px-3 py-4 text-center"><StatusPill status={p.status}/></td>
              <td className="px-3 py-4"><ChevronRight size={16} className="text-gray-300"/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ══════════════════════════════════
// PATIENT DETAIL
// ══════════════════════════════════
const PatientDetail = ({patient:p, goTo, goBack:back}) => {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <Back onClick={back} label="Back to Patients"/>
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-5">
        <div className="flex items-start justify-between">
          <div className="flex gap-5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xl font-bold">{p.name.split(" ").map(n=>n[0]).join("")}</div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{p.name}</h2>
              <p className="text-sm text-gray-500">{p.id} &middot; {p.age}{p.gender} &middot; Enrolled {p.enrolled}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge src="epic"/>
                <span className="text-xs text-gray-400">{p.facility} &middot; {p.provider}</span>
              </div>
              <div className="flex gap-1 mt-2">{p.conditions.map(c=><span key={c} className="bg-blue-50 text-blue-700 text-xs rounded-full px-2.5 py-0.5 font-medium">{c}</span>)}</div>
            </div>
          </div>
          <StatusPill status={p.status}/>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          {label:"A1C",cur:p.a1c.cur+"%",base:p.a1c.base+"%",tgt:p.a1c.tgt+"%",delta:((p.a1c.cur-p.a1c.base)).toFixed(1)+"%",good:p.a1c.cur<=p.a1c.tgt},
          {label:"Systolic BP",cur:p.bp.cur+" mmHg",base:p.bp.base+" mmHg",tgt:p.bp.tgt+" mmHg",delta:(p.bp.cur-p.bp.base)+" mmHg",good:p.bp.cur<=p.bp.tgt},
          {label:"BMI",cur:p.bmi.cur,base:p.bmi.base,tgt:p.bmi.tgt,delta:((p.bmi.cur-p.bmi.base)).toFixed(1),good:p.bmi.cur<=p.bmi.tgt},
        ].map((m,i)=>(
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-400 uppercase">{m.label}</span>
              <Badge src="epic"/>
            </div>
            <p className="text-3xl font-bold text-gray-900">{m.cur}</p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="text-emerald-600 font-semibold flex items-center gap-0.5"><ArrowDownRight size={12}/>{m.delta}</span>
              <span className="text-gray-400">Baseline: {m.base}</span>
              <span className={m.good?"text-emerald-600":"text-amber-600"}>{m.good?"✓":"→"} Target: {m.tgt}</span>
            </div>
          </div>
        ))}
      </div>

      <Tab labels={["Health Trends","Food Prescriptions","Batch Traceability"]} active={tab} onSelect={setTab}/>

      {tab===0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="text-sm font-semibold text-gray-900">A1C & Weight Over Time</h3><p className="text-xs text-gray-400">Monthly readings since enrollment — food Rx start marked</p></div>
            <div className="flex gap-4 text-xs"><span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-emerald-500 rounded"/>A1C</span><span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-amber-500 rounded"/>Weight (lbs)</span></div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={p.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
              <XAxis dataKey="mo" tick={{fontSize:11}} stroke="#9ca3af"/>
              <YAxis yAxisId="a" domain={["dataMin-0.5","dataMax+0.5"]} tick={{fontSize:11}} stroke="#9ca3af"/>
              <YAxis yAxisId="w" orientation="right" domain={["dataMin-10","dataMax+10"]} tick={{fontSize:11}} stroke="#9ca3af"/>
              <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
              <Line yAxisId="a" type="monotone" dataKey="a1c" stroke="#059669" strokeWidth={2.5} dot={{r:5,fill:"#059669"}} name="A1C (%)"/>
              <Line yAxisId="w" type="monotone" dataKey="wt" stroke="#D97706" strokeWidth={2} dot={{r:4,fill:"#D97706"}} strokeDasharray="6 3" name="Weight (lbs)"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab===1 && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <SectionHead>Active Prescriptions</SectionHead>
          <div className="space-y-3">
            {p.rxs.map((rx,i)=>(
              <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center"><Sprout size={20} className="text-emerald-600"/></div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{rx.food}</p>
                    <p className="text-xs text-gray-400">{rx.qty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">Batch</p>
                    <button onClick={()=>{const b=BATCHES.find(b=>b.id===rx.batch); if(b) goTo("crop-detail",null,b);}} className="text-xs font-mono text-emerald-600 hover:underline">{rx.batch}</button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">Adherence</p>
                    <div className="flex items-center gap-2"><div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{width:`${rx.adh}%`}}/></div><span className="text-sm font-semibold text-gray-900">{rx.adh}%</span></div>
                  </div>
                  <Badge src={rx.src}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab===2 && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <SectionHead>Batch-to-Outcome Traceability</SectionHead>
          <p className="text-xs text-gray-400 mb-4">Every food item traced from growing environment → patient → health outcome</p>
          <div className="space-y-3">
            {p.rxs.map((rx,i)=>{
              const batch = BATCHES.find(b=>b.id===rx.batch);
              return (
                <div key={i} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge src="leaf"/><span className="text-gray-300">→</span><Badge src="hub"/><span className="text-gray-300">→</span><Badge src="epic"/>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-emerald-800 mb-1">Growing Data</p>
                      <p className="text-xs text-emerald-700">{batch?.crop || rx.food}</p>
                      <p className="text-xs text-emerald-600">Batch: <span className="font-mono">{rx.batch}</span></p>
                      <p className="text-xs text-emerald-600">Environment: {batch?.env}</p>
                      <p className="text-xs text-emerald-600">Nutrient Score: <span className="font-semibold">{batch?.nutrientScore}/100</span></p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-amber-800 mb-1">Distribution</p>
                      <p className="text-xs text-amber-700">Rx: {rx.food}</p>
                      <p className="text-xs text-amber-600">Quantity: {rx.qty}</p>
                      <p className="text-xs text-amber-600">Adherence: {rx.adh}%</p>
                      <p className="text-xs text-amber-600">Facility: {p.facility}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-blue-800 mb-1">Clinical Outcome</p>
                      <p className="text-xs text-blue-700">A1C: {p.a1c.base}% → {p.a1c.cur}%</p>
                      <p className="text-xs text-blue-600">BP: {p.bp.base} → {p.bp.cur} mmHg</p>
                      <p className="text-xs text-blue-600">BMI: {p.bmi.base} → {p.bmi.cur}</p>
                      <p className="text-xs text-blue-600 font-semibold mt-1">Net Δ A1C: {(p.a1c.cur-p.a1c.base).toFixed(1)}%</p>
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

// ══════════════════════════════════
// CROP / BATCH LIST
// ══════════════════════════════════
const CropList = ({goTo}) => (
  <div>
    <div className="flex items-center justify-between mb-5">
      <div><h2 className="text-lg font-bold text-gray-900">Crop & Batch Registry</h2><p className="text-sm text-gray-500">Tracked batches from Leaf-connected growing environments</p></div>
      <Badge src="leaf"/>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {BATCHES.map(b=>(
        <div key={b.id} onClick={()=>goTo("crop-detail",null,b)} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:border-emerald-300 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{b.id}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${b.status==="Active"?"bg-emerald-50 text-emerald-700":"bg-gray-100 text-gray-500"}`}>{b.status}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-0.5">{b.crop}</h3>
          <p className="text-xs text-gray-500 mb-3">{b.category} &middot; {b.env}</p>
          <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-3">
            <div><p className="text-lg font-bold text-emerald-600">{b.nutrientScore}</p><p className="text-xs text-gray-400">Nutrient</p></div>
            <div><p className="text-lg font-bold text-gray-900">{b.yield}</p><p className="text-xs text-gray-400">Yield</p></div>
            <div><p className="text-lg font-bold text-blue-600">{b.patients.length}</p><p className="text-xs text-gray-400">Patients</p></div>
          </div>
          <p className="text-xs text-gray-400 mt-3">Harvested {b.harvested}</p>
        </div>
      ))}
    </div>
  </div>
);

// ══════════════════════════════════
// CROP / BATCH DETAIL
// ══════════════════════════════════
const CropDetail = ({batch:b, goTo, goBack:back}) => {
  const [tab, setTab] = useState(0);
  const radarData = Object.keys(b.nutrients).map(k=>({subject:k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase()), batch:b.nutrients[k], avg:b.avg[k]}));
  const linkedPatients = PATIENTS.filter(p=>b.patients.includes(p.id));
  return (
    <div>
      <Back onClick={back} label="Back to Crops"/>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-5">
        <div className="flex items-start justify-between">
          <div className="flex gap-5">
            <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center"><Sprout size={28} className="text-emerald-600"/></div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{b.crop}</h2>
              <p className="text-sm text-gray-500 font-mono">{b.id}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge src="leaf"/>
                <span className="text-xs text-gray-400">{b.env} &middot; Harvested {b.harvested} &middot; {b.yield}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-emerald-600">{b.nutrientScore}<span className="text-sm text-gray-400 font-normal">/100</span></p>
            <p className="text-xs text-gray-400">Nutrient Density Score</p>
          </div>
        </div>
      </div>

      <Tab labels={["Growing Conditions","Nutrient Profile","Patient Outcomes"]} active={tab} onSelect={setTab}/>

      {tab===0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="text-sm font-semibold text-gray-900">Environmental Conditions</h3><p className="text-xs text-gray-400">Temperature (°F), humidity (%), and light (μmol) across growing cycle</p></div>
            <div className="flex gap-4 text-xs"><span className="flex items-center gap-1"><Thermometer size={12} className="text-red-400"/>Temp</span><span className="flex items-center gap-1"><Droplets size={12} className="text-blue-400"/>Humidity</span><span className="flex items-center gap-1"><Sun size={12} className="text-amber-400"/>Light</span></div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={b.conditions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
              <XAxis dataKey="d" tick={{fontSize:11}} stroke="#9ca3af"/>
              <YAxis tick={{fontSize:11}} stroke="#9ca3af"/>
              <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
              <Area type="monotone" dataKey="temp" stroke="#EF4444" fill="#FEE2E2" strokeWidth={2} name="Temp (°F)"/>
              <Area type="monotone" dataKey="hum" stroke="#3B82F6" fill="#DBEAFE" strokeWidth={2} name="Humidity (%)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab===1 && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div><h3 className="text-sm font-semibold text-gray-900">Nutrient Density Analysis</h3><p className="text-xs text-gray-400">This batch vs. category average (percentile scores)</p></div>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e5e7eb"/>
                <PolarAngleAxis dataKey="subject" tick={{fontSize:11}} stroke="#6b7280"/>
                <PolarRadiusAxis angle={30} domain={[0,100]} tick={{fontSize:10}} stroke="#d1d5db"/>
                <Radar name="This Batch" dataKey="batch" stroke="#059669" fill="#059669" fillOpacity={0.25} strokeWidth={2}/>
                <Radar name="Category Avg" dataKey="avg" stroke="#9CA3AF" fill="#9CA3AF" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4"/>
                <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-xs mt-2">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500 opacity-40"/>This Batch</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gray-400 opacity-30"/>Category Avg</span>
          </div>
        </div>
      )}

      {tab===2 && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <SectionHead>Patients Receiving This Batch</SectionHead>
          <p className="text-xs text-gray-400 mb-4">Tracked outcomes for patients prescribed items from batch {b.id}</p>
          <div className="space-y-3">
            {linkedPatients.map(pt=>(
              <div key={pt.id} onClick={()=>goTo("patient-detail",pt)} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg cursor-pointer hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">{pt.name.split(" ").map(n=>n[0]).join("")}</div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{pt.name} <span className="text-gray-400 text-xs">{pt.id}</span></p>
                    <p className="text-xs text-gray-500">{pt.conditions.join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center"><p className="font-semibold text-emerald-600 text-sm">{(pt.a1c.cur-pt.a1c.base).toFixed(1)}%</p><p className="text-xs text-gray-400">A1C Δ</p></div>
                  <div className="text-center"><p className="font-semibold text-emerald-600 text-sm">{pt.bp.cur-pt.bp.base}</p><p className="text-xs text-gray-400">BP Δ</p></div>
                  <StatusPill status={pt.status}/>
                  <ChevronRight size={16} className="text-gray-300"/>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 bg-emerald-50 rounded-lg">
            <p className="text-sm font-semibold text-emerald-800 mb-1">Batch Outcome Summary</p>
            <p className="text-xs text-emerald-700">Patients receiving batch <span className="font-mono font-semibold">{b.id}</span> showed an average A1C change of <span className="font-bold">{b.outcomeAvg.a1c}</span>% and systolic BP change of <span className="font-bold">{b.outcomeAvg.bp}</span> mmHg from baseline.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════
// MAIN APP SHELL
// ══════════════════════════════════
const NAV = [
  {key:"dashboard", label:"Dashboard", icon:Home},
  {key:"patients",  label:"Patients",  icon:Users},
  {key:"crops",     label:"Crops & Batches", icon:Sprout},
];

export default function PhytivApp() {
  const [view, setView] = useState("dashboard");
  const [patient, setPatient] = useState(null);
  const [batch, setBatch] = useState(null);

  const goTo = (v, p=null, b=null) => { setView(v); if(p) setPatient(p); if(b) setBatch(b); };
  const goBack = () => { if(view==="patient-detail") setView("patients"); else if(view==="crop-detail") setView("crops"); else setView("dashboard"); };
  const navKey = view.startsWith("patient")?"patients":view.startsWith("crop")?"crops":"dashboard";

  return (
    <div className="flex min-h-screen bg-gray-50" style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"}}>
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-white flex flex-col flex-shrink-0" style={{minHeight:"100vh"}}>
        <div className="p-5 border-b border-emerald-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center"><Leaf size={20} className="text-white"/></div>
            <div><p className="text-lg font-bold tracking-tight">Phytiv</p><p className="text-xs text-emerald-400 -mt-0.5">Food-as-Medicine Intelligence</p></div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(n=>(
            <button key={n.key} onClick={()=>setView(n.key)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${navKey===n.key?"bg-emerald-800 text-white":"text-emerald-300 hover:bg-emerald-800 hover:text-white"}`}>
              <n.icon size={18}/>{n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-emerald-800">
          <p className="text-xs text-emerald-500 uppercase font-medium mb-2">Data Sources</p>
          {Object.entries(SRC).map(([k,v])=>(
            <div key={k} className="flex items-center gap-2 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/><span className="text-xs text-emerald-300">{v.label}</span>
              <span className="ml-auto text-xs text-emerald-500">Live</span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-emerald-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold">IU</div>
            <div><p className="text-xs font-medium text-emerald-200">IU Health System</p><p className="text-xs text-emerald-500">Admin Portal</p></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-gray-900 font-medium">Phytiv</span>
            <ChevronRight size={14}/>
            <span className="capitalize">{view.replace("-"," ").replace("detail","Detail")}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 text-sm text-gray-400"><Search size={15}/><span>Search...</span></div>
            <button className="relative"><Bell size={18} className="text-gray-400"/><span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"/></button>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">JH</div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {view==="dashboard"    && <DashboardView goTo={goTo}/>}
          {view==="patients"     && <PatientList goTo={goTo}/>}
          {view==="patient-detail" && patient && <PatientDetail patient={patient} goTo={goTo} goBack={goBack}/>}
          {view==="crops"        && <CropList goTo={goTo}/>}
          {view==="crop-detail"  && batch && <CropDetail batch={batch} goTo={goTo} goBack={goBack}/>}
        </div>

        {/* Footer */}
        <footer className="h-10 bg-white border-t border-gray-100 flex items-center justify-between px-6 text-xs text-gray-400 flex-shrink-0">
          <span>Phytiv v0.1 &middot; RFP Preview Build &middot; IU Health × Indy Health District</span>
          <div className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-500"/>HIPAA Compliant &middot; FHIR R4 &middot; HL7 Compatible</div>
        </footer>
      </main>
    </div>
  );
}
