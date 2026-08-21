import React, { useState } from 'react';
import { soundEffects } from '../utils/sound';
import { Calculator, Sparkles, TrendingUp, DollarSign, PieChart, ShieldCheck } from 'lucide-react';

interface InteractiveCalculatorProps {
  toolType:
    | 'demand_supply'
    | 'compound_interest'
    | 'budget_50_30_20'
    | 'balance_equation'
    | 'break_even'
    | 'unit_economics'
    | 'islamic_murabaha'
    | 'zakat_calculator';
}

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({ toolType }) => {
  // 1. Demand & Supply Simulator State
  const [price, setPrice] = useState(25000);
  const equilibriumPrice = 25000;
  const demandQty = Math.max(10, Math.round(100 - (price - 10000) / 400));
  const supplyQty = Math.max(10, Math.round(20 + (price - 10000) / 350));
  const marketStatus =
    price === equilibriumPrice
      ? 'Muvozanat holati (Talab = Taklif)'
      : price > equilibriumPrice
      ? `Ortiqcha tovar (Profitsit: +${supplyQty - demandQty} dona)`
      : `Tanqislik (Defitsit: -${demandQty - supplyQty} dona)`;

  // 2. Compound Interest State
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(18);
  const [years, setYears] = useState(3);
  const futureValue = Math.round(principal * Math.pow(1 + rate / 100, years));
  const totalEarnedInterest = futureValue - principal;

  // 3. 50/30/20 Budget State
  const [income, setIncome] = useState(6000000);
  const needs50 = Math.round(income * 0.5);
  const wants30 = Math.round(income * 0.3);
  const savings20 = Math.round(income * 0.2);

  // 4. Accounting Balance Sheet Equation State
  const [assets, setAssets] = useState(150000000);
  const [liabilities, setLiabilities] = useState(60000000);
  const equity = assets - liabilities;
  const isBalanced = assets === liabilities + equity;

  // 5. Break-Even Calculator State
  const [fixedCosts, setFixedCosts] = useState(12000000); // O'zgarmas xarajatlar (ijara, oylik)
  const [unitPrice, setUnitPrice] = useState(80000); // Dona narxi
  const [variableCost, setVariableCost] = useState(45000); // Dona tannarxi
  const unitContribution = Math.max(1, unitPrice - variableCost);
  const breakEvenUnits = Math.ceil(fixedCosts / unitContribution);
  const breakEvenRevenue = breakEvenUnits * unitPrice;

  // 6. Islamic Finance: Murabaha & Mudaraba Simulator State
  const [assetCost, setAssetCost] = useState(100000000); // 100 mln so'm tovar/uskuna
  const [murabahaProfitPct, setMurabahaProfitPct] = useState(12); // Shaffof foyda ustamasi
  const [termMonths, setTermMonths] = useState(12); // Muddat
  const totalMurabahaSalePrice = Math.round(assetCost * (1 + murabahaProfitPct / 100));
  const monthlyMurabahaPayment = Math.round(totalMurabahaSalePrice / termMonths);

  // Mudaraba Profit Sharing Sandbox
  const [projectProfit, setProjectProfit] = useState(30000000); // 30 mln so'm sof foyda
  const [investorSharePct, setInvestorSharePct] = useState(60); // Sarmoyador (Rab-ul-Mol) ulushi
  const managerSharePct = 100 - investorSharePct; // Tadbirkor (Mudarib) ulushi
  const investorProfit = Math.round(projectProfit * (investorSharePct / 100));
  const managerProfit = projectProfit - investorProfit;

  // 7. Islamic Finance: Zakat Calculator State
  const [cashAndGold, setCashAndGold] = useState(50000000); // 50 mln so'm naqd & tilla
  const [tradeGoods, setTradeGoods] = useState(40000000); // 40 mln so'm savdodagi tovar
  const [shortDebts, setShortDebts] = useState(15000000); // 15 mln qarzlar
  const nisobValue = 40000000; // ~85 gr oltin qiymati taxminan
  const netZakatableWealth = Math.max(0, cashAndGold + tradeGoods - shortDebts);
  const isZakatEligible = netZakatableWealth >= nisobValue;
  const zakatAmount = isZakatEligible ? Math.round(netZakatableWealth * 0.025) : 0;

  const formatUzs = (val: number) => {
    return new Intl.NumberFormat('uz-UZ').format(val) + " so'm";
  };

  return (
    <div className="rounded-2xl p-6 sm:p-7 bg-[#111a2e] border border-amber-400/30 space-y-6 shadow-xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-400/15 text-amber-400 border border-amber-400/30 shadow-inner">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono-code uppercase tracking-wider text-amber-400 font-bold">
              INTERAKTIV MOLIYAVIY SANDBOX
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              {toolType === 'demand_supply' && "Talab va Taklif Muvozanati Simulyatori"}
              {toolType === 'compound_interest' && "Murakkab Foiz (Kompaund) Kalkulyatori"}
              {toolType === 'budget_50_30_20' && "50/30/20 Shaxsiy Byudjet Taqsimoti"}
              {toolType === 'balance_equation' && "Buxgalteriya Balans Tenglamasi (A = M + K)"}
              {toolType === 'break_even' && "Zararsizlik Nuqtasi (Break-Even Point) Tahlili"}
              {toolType === 'islamic_murabaha' && "Murobaha Savdosi & Muzoraba Sherikchilik Simulyatori"}
              {toolType === 'zakat_calculator' && "Zakot va Halol Mol-mulk Nisob Hisoblagichi"}
            </h3>
          </div>
        </div>
        <span className="hidden sm:inline text-xs font-mono-code px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
          Jonli Eksperiment
        </span>
      </div>

      {/* Tool 1: Demand & Supply */}
      {toolType === 'demand_supply' && (
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-code">
              <span className="text-slate-300">Bozor Narxi darajasi:</span>
              <span className="text-amber-400 font-bold text-sm">{formatUzs(price)}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="40000"
              step="1000"
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));
                soundEffects.playClick();
              }}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono-code text-slate-500">
              <span>Arzon (10 000 soʻm)</span>
              <span>Muvozanat (25 000 soʻm)</span>
              <span>Qimmat (40 000 soʻm)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="text-[11px] font-mono-code text-cyan-400 font-bold">TALAB HAJMI (Qd)</div>
              <div className="text-2xl font-bold font-mono-code text-white">{demandQty} dona</div>
              <div className="text-[10px] text-slate-400">Xaridorlar sotib olishga tayyor</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="text-[11px] font-mono-code text-purple-400 font-bold">TAKLIF HAJMI (Qs)</div>
              <div className="text-2xl font-bold font-mono-code text-white">{supplyQty} dona</div>
              <div className="text-[10px] text-slate-400">Sotuvchilar taklif qilmoqda</div>
            </div>
            <div className={`p-4 rounded-xl border text-center space-y-1 ${
              price === equilibriumPrice
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
            }`}>
              <div className="text-[11px] font-mono-code font-bold">BOZOR HOLATI</div>
              <div className="text-xs font-bold font-mono-code">{marketStatus}</div>
              <div className="text-[10px] opacity-80">{price === equilibriumPrice ? 'Optimal narx' : 'Bozor tuzatishi kerak'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tool 2: Compound Interest */}
      {toolType === 'compound_interest' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono-code text-slate-300">Boshlangʻich sarmoya:</label>
              <input
                type="number"
                step="500000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono-code text-slate-300">Yillik daromadlilik (%):</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono-code text-slate-300">Yillar soni (muddat):</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono-code text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Jami toʻplangan kapital ({years} yildan soʻng):</span>
              <span className="text-amber-400 font-bold text-base">{formatUzs(futureValue)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2">
              <span className="text-slate-400">Murakkab foiz hisobiga sof oʻsish:</span>
              <span className="text-emerald-400 font-bold">+{formatUzs(totalEarnedInterest)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tool 3: 50/30/20 Budget */}
      {toolType === 'budget_50_30_20' && (
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-code">
              <span className="text-slate-300">Oylik Sof Daromadingiz:</span>
              <span className="text-amber-400 font-bold text-sm">{formatUzs(income)}</span>
            </div>
            <input
              type="range"
              min="2000000"
              max="30000000"
              step="500000"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-center space-y-1">
              <div className="text-[11px] font-mono-code text-blue-400 font-bold">50% EHTIYOJLAR</div>
              <div className="text-lg font-bold font-mono-code text-white">{formatUzs(needs50)}</div>
              <div className="text-[10px] text-slate-400">Oziq-ovqat, ijara, kommunal</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-center space-y-1">
              <div className="text-[11px] font-mono-code text-purple-400 font-bold">30% ISTAKLAR</div>
              <div className="text-lg font-bold font-mono-code text-white">{formatUzs(wants30)}</div>
              <div className="text-[10px] text-slate-400">Koʻngilochar, kiyim, sayohat</div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-1">
              <div className="text-[11px] font-mono-code text-emerald-400 font-bold">20% JAMGʻARMA</div>
              <div className="text-lg font-bold font-mono-code text-white">{formatUzs(savings20)}</div>
              <div className="text-[10px] text-slate-400">Investitsiya, favqulodda jamgʻarma</div>
            </div>
          </div>
        </div>
      )}

      {/* Tool 4: Balance Equation */}
      {toolType === 'balance_equation' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono-code text-slate-300">Jami Aktivlar (Mulk, Bino, Pul):</label>
              <input
                type="number"
                step="10000000"
                value={assets}
                onChange={(e) => setAssets(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono-code text-slate-300">Majburiyatlar (Qarzlar, Kreditlar):</label>
              <input
                type="number"
                step="5000000"
                value={liabilities}
                onChange={(e) => setLiabilities(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 font-mono-code text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Xususiy Kapital (Kapital = Aktiv - Majburiyat):</span>
              <span className="text-emerald-400 font-bold text-base">{formatUzs(equity)}</span>
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              Balans holati: <b className="text-emerald-300">{isBalanced ? "✓ Formulaviy muvozanat mukammal (A = M + K)" : "Xatolik"}</b>
            </div>
          </div>
        </div>
      )}

      {/* Tool 5: Break-Even */}
      {toolType === 'break_even' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono-code text-slate-400">Doimiy Xarajatlar (oylik):</label>
              <input
                type="number"
                step="1000000"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono-code text-slate-400">1 dona Mahsulot Narxi:</label>
              <input
                type="number"
                step="5000"
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono-code text-slate-400">1 dona Oʻzgaruvchan Xarajat:</label>
              <input
                type="number"
                step="5000"
                value={variableCost}
                onChange={(e) => setVariableCost(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 font-mono-code text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Zararsizlik Nuqtasi (Dona):</span>
              <span className="text-amber-400 font-bold text-base">{breakEvenUnits} dona mahsulot</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2">
              <span className="text-slate-400">Zararsizlik Tushumi (Oylik minimal oborot):</span>
              <span className="text-emerald-400 font-bold">{formatUzs(breakEvenRevenue)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tool 6: Islamic Finance Murabaha & Mudaraba */}
      {toolType === 'islamic_murabaha' && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 space-y-4">
            <div className="text-xs font-mono-code text-teal-300 font-bold uppercase tracking-wider">
              1. Murobaha (Muddatli Savdo) Shaffof Hisoblagichi:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono-code text-slate-400">Aktiv/Uskuna Tannarxi:</label>
                <input
                  type="number"
                  step="5000000"
                  value={assetCost}
                  onChange={(e) => setAssetCost(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:border-teal-400 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono-code text-slate-400">Shaffof Foyda Marjasi (%):</label>
                <input
                  type="number"
                  value={murabahaProfitPct}
                  onChange={(e) => setMurabahaProfitPct(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:border-teal-400 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono-code text-slate-400">Toʻlov muddati (oy):</label>
                <input
                  type="number"
                  value={termMonths}
                  onChange={(e) => setTermMonths(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:border-teal-400 outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-teal-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code">
              <div>
                <span className="text-slate-400">Jami Shartnoma Qiymati: </span>
                <b className="text-amber-400">{formatUzs(totalMurabahaSalePrice)}</b>
              </div>
              <div>
                <span className="text-slate-400">Oylik qatʼiy toʻlov: </span>
                <b className="text-emerald-400">{formatUzs(monthlyMurabahaPayment)}/oy</b>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono-code text-xs">
            <div className="text-xs font-mono-code text-amber-400 font-bold uppercase tracking-wider">
              2. Muzoraba (Foyda-Zarar Sherikchiligi) Modeli:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Kutilayotgan Sof Foyda:</label>
                <input
                  type="number"
                  step="5000000"
                  value={projectProfit}
                  onChange={(e) => setProjectProfit(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Sarmoyador ulushi (%):</label>
                <input
                  type="number"
                  value={investorSharePct}
                  onChange={(e) => setInvestorSharePct(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">• Sarmoyador daromadi ({investorSharePct}%):</span>
                <b className="text-amber-400">{formatUzs(investorProfit)}</b>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">• Tadbirkor/Boshqaruvchi daromadi ({managerSharePct}%):</span>
                <b className="text-emerald-400">{formatUzs(managerProfit)}</b>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                ★ Islom moliyasida zarar koʻrilsa, moddiy yoʻqotish faqat sarmoyador zimmasiga tushadi, tadbirkor esa vaqti va mehnati bilan yoʻqotadi.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tool 7: Zakat Calculator */}
      {toolType === 'zakat_calculator' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono-code text-slate-400">Naqd pul & Tilla (soʻm):</label>
              <input
                type="number"
                step="5000000"
                value={cashAndGold}
                onChange={(e) => setCashAndGold(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono-code text-slate-400">Sotuvdagi tovarlar qiymati:</label>
              <input
                type="number"
                step="5000000"
                value={tradeGoods}
                onChange={(e) => setTradeGoods(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono-code text-slate-400">Darhol toʻlanadigan qarzlar:</label>
              <input
                type="number"
                step="5000000"
                value={shortDebts}
                onChange={(e) => setShortDebts(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono-code text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-slate-400 text-[11px]">Sof Zakotga Tortiluvchi Boylik:</span>
                <div className="text-lg font-bold text-amber-400">{formatUzs(netZakatableWealth)}</div>
                <div className="text-[10px] text-slate-500">
                  Nisob miqdori (~85gr oltin): {formatUzs(nisobValue)}
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-slate-400 text-[11px]">Toʻlanishi Farz Zakot (2.5%):</span>
                <div className="text-xl font-bold font-display text-emerald-400">
                  {isZakatEligible ? formatUzs(zakatAmount) : "Nisobga yetmadi (Zakot farz emas)"}
                </div>
                <div className="text-[10px] text-slate-500">
                  {isZakatEligible ? "1 yil to'liq saqlangan boylikdan beriladi" : "Boylik nisobdan kamroq"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
