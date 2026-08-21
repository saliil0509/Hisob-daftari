import { Field, MediaItem } from '../types';

export const FIELDS: Field[] = [
  {
    id: 'iqtisodiyot',
    num: '01',
    name: 'Iqtisodiyot',
    tag: 'IQTISODIYOT',
    desc: 'Bozor mexanizmlari, talab-taklif va makroiqtisodiy jarayonlar.',
    estimatedWeeks: 2,
    level: 'Boshlangʻich / Oʻrta',
    lessons: [
      {
        id: 'iq1',
        title: 'Talab va taklif',
        dur: '9 daq. video',
        text: "Talab — iste'molchilarning ma'lum narxda tovarni sotib olishga tayyorligi va imkoniyatini bildiradi. Narx oshganda talab odatda kamayadi, narx tushganda esa oshadi. Taklif — ishlab chiqaruvchilarning ma'lum narxda tovar sotishga tayyorligini bildiradi va narx bilan to'g'ri proporsional o'zgaradi. Ushbu ikki kuchning o'zaro ta'siri bozordagi narx va hajmni belgilaydi.",
        interactiveTool: 'demand_supply',
        reja: [
          {
            id: 'iq1_s1',
            order: 1,
            title: '1. Talab qonuni va isteʼmolchi psixologiyasi',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Talab egri chizigʻi, narxning xarid hajmiga teskari bogʻliqligi va xarid qobiliyati taʼsiri.',
            keyPoints: ['Narx oshsa -> Talab kamayadi', 'Daromad va oʻrinbosar tovarlar omili']
          },
          {
            id: 'iq1_s2',
            order: 2,
            title: '2. Taklif qonuni va ishlab chiqaruvchi motivatsiyasi',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Taklif egri chizigʻi, tannarx va yuqori narxlarning ishlab chiqarishni ragʻbatlantirishi.',
            keyPoints: ['Narx oshsa -> Taklif koʻpayadi', 'Resurslar va ishlab chiqarish xarajatlari']
          },
          {
            id: 'iq1_s3',
            order: 3,
            title: '3. Interaktiv Talab-Taklif Simulyatori',
            timeEst: '3 daq.',
            category: 'formula',
            description: 'Narx shkalasini surib, talab va taklif miqdorlari qanday oʻzgarishini real vaqtda sinab koʻring.',
            keyPoints: ['Ortiqcha tovar (profitsit)', 'Mahsulot tanqisligi (defitsit)']
          },
          {
            id: 'iq1_s4',
            order: 4,
            title: '4. Nazorat testi (Micro-Quiz)',
            timeEst: '2 daq.',
            category: 'quiz',
            description: 'Talab va taklif qonuniyatlari boʻyicha 2 ta ekspress testni yechib, amaliyotga yoʻl oching.',
            keyPoints: ['2/2 toʻgʻri javob kerak']
          },
          {
            id: 'iq1_s5',
            order: 5,
            title: '5. Amaliy Mustaqil Audit & AI Baholash',
            timeEst: '5 daq.',
            category: 'audit',
            description: 'Bozorda narxlar keskin oʻzgarganda yuzaga keladigan holat boʻyicha oʻz mustaqil tahlilingizni yozing.',
            keyPoints: ['AI 3 ta mezon boʻyicha baholaydi (A+, A, B...)']
          }
        ],
        keyTakeaways: [
          "Talab qonuni: Narx ko'tarilsa, talab hajmi kamayadi (teskari bog'liqlik).",
          "Taklif qonuni: Narx ko'tarilsa, taklif hajmi oshadi (to'g'ri bog'liqlik).",
          "Bozor signallari resurslarni eng samarali sohalarga yo'naltiradi."
        ],
        quizzes: [
          {
            id: 'iq1_q1',
            question: "Talab qonuniga ko'ra, mahsulot narxi oshganda iste'molchilar xatti-harakati qanday o'zgaradi?",
            options: [
              "Xarid qilish hajmi ko'payadi",
              "Xarid qilish hajmi kamayadi",
              "Taklif darhol nolga tushadi",
              "Hech narsa o'zgarmaydi"
            ],
            correctIndex: 1,
            explanation: "Talab qonuniga binoan, narx va talab hajmi o'rtasida teskari bog'liqlik mavjud: narx oshsa, sotib olish hajmi kamayadi."
          },
          {
            id: 'iq1_q2',
            question: "Ishlab chiqaruvchi nuqtai nazaridan, taklif egri chizig'i narx bilan qanday munosabatda bo'ladi?",
            options: [
              "Narx oshsa, taklif ham oshadi (to'g'ri proporsional)",
              "Narx oshsa, taklif kamayadi (teskari)",
              "Taklif faqat soliq stavkalariga bog'liq",
              "Narx o'zgarganda taklif o'zgarmas qoladi"
            ],
            correctIndex: 0,
            explanation: "Yuqori narx ishlab chiqaruvchiga ko'proq foyda keltirgani sababli, narx oshganda taklif hajmi oshadi."
          }
        ],
        task: "Misol keltiring: biror mahsulotning narxi keskin oshsa, talab va taklif qanday o'zgaradi? O'z so'zlaringiz bilan tushuntiring.",
        sampleKeywords: ['narx', 'talab', 'taklif', 'isteʼmolchi', 'ishlab chiqaruvchi', 'foyda', 'muvozanat']
      },
      {
        id: 'iq2',
        title: 'Bozor muvozanati',
        dur: '7 daq. video',
        text: "Bozor muvozanati — talab egri chizig'i va taklif egri chizig'i kesishgan nuqtada yuzaga keladi, bunda muvozanat narxi va muvozanat hajmi shakllanadi. Agar narx muvozanatdan yuqori bo'lsa, ortiqcha taklif (profitsit) vujudga keladi; narx past bo'lsa — tanqislik yuzaga keladi. Bozor bu nomutanosibliklarni narx orqali o'zi tartibga soladi.",
        interactiveTool: 'demand_supply',
        reja: [
          {
            id: 'iq2_s1',
            order: 1,
            title: '1. Bozor muvozanati nuqtasi (Equilibrium)',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Talab va taklif kesishgan narxda tovar toʻliq sotiladi va har ikkala tomon mamnun boʻladi.',
            keyPoints: ['Talab hajmi = Taklif hajmi']
          },
          {
            id: 'iq2_s2',
            order: 2,
            title: '2. Tanqislik va Profitsit dinamikasi',
            timeEst: '2 daq.',
            category: 'keys',
            description: 'Sunʼiy narx nazorati oqibatlari va qora bozor paydo boʻlish sabablari.',
            keyPoints: ['Narx chegarasi', 'Koʻrinmas qoʻl effekti']
          },
          {
            id: 'iq2_s3',
            order: 3,
            title: '3. Muvozanat formulasi va grafik tahlili',
            timeEst: '2 daq.',
            category: 'formula',
            description: 'Qd = Qs tenglamasi orqali muvozanat narxini hisoblash usullari.',
            keyPoints: ['Funksiyalar tengligi']
          },
          {
            id: 'iq2_s4',
            order: 4,
            title: '4. Nazorat testi (Micro-Quiz)',
            timeEst: '2 daq.',
            category: 'quiz',
            description: 'Bozor muvozanatiga oid 2 ta savolga toʻgʻri javob berib, amaliy keysni oching.',
            keyPoints: ['2 ta test']
          },
          {
            id: 'iq2_s5',
            order: 5,
            title: '5. Amaliy Vaziyat Auditi & AI Xulosa',
            timeEst: '5 daq.',
            category: 'audit',
            description: 'Tanqislik yuzaga kelganda narxlar qanday tuzalishi haqida tahliliy hisobot yozing.',
            keyPoints: ['Ekspert xulosasi']
          }
        ],
        keyTakeaways: [
          "Muvozanat nuqtasida: Talab hajmi = Taklif hajmi.",
          "Profitsit (ortiqcha tovar) narxni pastga tushirishga majbur qiladi.",
          "Defitsit (tanqislik) narxni yuqoriga ko'taradi."
        ],
        quizzes: [
          {
            id: 'iq2_q1',
            question: "Agar bozorda sotilayotgan mahsulot narxi muvozanat narxidan ancha past qilib belgilansa, nima sodir bo'ladi?",
            options: [
              "Ortiqcha tovar yig'ilib qoladi (profitsit)",
              "Tovar tanqisligi (defitsit) yuzaga keladi",
              "Barcha sotuvchilar darhol boyib ketadi",
              "Talab butunlay to'xtaydi"
            ],
            correctIndex: 1,
            explanation: "Narx past bo'lganda iste'molchilar ko'p xarid qiladi, ammo sotuvchilar kam mahsulot chiqaradi, natijada defitsit (tanqislik) yuzaga keladi."
          },
          {
            id: 'iq2_q2',
            question: "Bozor iqtisodiyotida 'ko'rinmas qo'l' (Adam Smit) mexanizmi muvozanatni qanday tiklaydi?",
            options: [
              "Faqat davlatning qat'iy buyruqlari orqali",
              "Erkin narx signallari va raqobat vositasida",
              "Sun'iy monopoliya yaratish orqali",
              "Savdoni cheklash orqali"
            ],
            correctIndex: 1,
            explanation: "Narxlar o'zgarishi orqali bozor ishtirokchilari o'z manfaatlaridan kelib chiqib harakat qiladi va bozor muvozanatga qaytadi."
          }
        ],
        task: "Bozorda tanqislik (defitsit) yuzaga kelgan holatni tasavvur qiling. Narx qanday o'zgarishi kerak va nima uchun?",
        sampleKeywords: ['tanqislik', 'defitsit', 'narx oshishi', 'muvozanat', 'talab', 'taklif', 'ragʻbat']
      }
    ]
  },
  {
    id: 'moliya',
    num: '02',
    name: 'Moliya',
    tag: 'MOLIYA',
    desc: "Shaxsiy va korporativ moliya, pulning vaqt qiymati, byudjetlashtirish.",
    estimatedWeeks: 2,
    level: 'Asosiy / Amaliy',
    lessons: [
      {
        id: 'mo1',
        title: 'Pulning vaqt qiymati',
        dur: '11 daq. video',
        text: "Bugungi pul kelajakdagi xuddi shu miqdordagi puldan qimmatroqdir, chunki uni investitsiya qilib daromad olish mumkin. Ushbu tushuncha diskontlash va murakkab foiz hisob-kitoblarining asosini tashkil etadi. Moliyaviy qarorlar — kredit, investitsiya, jamg'arma — barchasi shu tamoyilga asoslanadi.",
        interactiveTool: 'compound_interest',
        reja: [
          {
            id: 'mo1_s1',
            order: 1,
            title: '1. Pulning vaqt qiymati (TVM) tushunchasi',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Inflyatsiya, investitsion imkoniyat va risk omillari.',
            keyPoints: ['100$ bugun > 100$ 1 yildan soʻng', 'Xarid qobiliyati']
          },
          {
            id: 'mo1_s2',
            order: 2,
            title: '2. Murakkab foiz (Compound Interest) qudrati',
            timeEst: '3 daq.',
            category: 'formula',
            description: 'Eynshteyn aytganidek: "Dunyodagi 8-moʻjiza" — foiz ustiga foiz hisoblash.',
            keyPoints: ['FV = PV × (1 + r)ⁿ formulasi']
          },
          {
            id: 'mo1_s3',
            order: 3,
            title: '3. Interaktiv Murakkab Foiz Kalkulyatori',
            timeEst: '3 daq.',
            category: 'formula',
            description: 'Sarmoya, stavka va muddatni kiritib kelajakdagi kapital oʻsishini hisoblang.',
            keyPoints: ['Eksponensial oʻsish']
          },
          {
            id: 'mo1_s4',
            order: 4,
            title: '4. Nazorat testi (Micro-Quiz)',
            timeEst: '2 daq.',
            category: 'quiz',
            description: 'Pulning vaqt qiymati va inflyatsiyaga oid 2 ta test savoli.',
            keyPoints: ['2 ta test']
          },
          {
            id: 'mo1_s5',
            order: 5,
            title: '5. Amaliy Inflyatsiya & Tanlov Auditi',
            timeEst: '5 daq.',
            category: 'audit',
            description: '1 mln hozir yoki 1.1 mln 1 yildan soʻng — inflyatsiya 12% boʻlsa qaysi biri foydali? Tahliliy audit.',
            keyPoints: ['AI tekshiruvi']
          }
        ],
        keyTakeaways: [
          "Vaqt omili: 100$ bugun > 100$ bir yildan keyin.",
          "Inflyatsiya pulning xarid qobiliyatini yemirib boradi.",
          "Murakkab foiz (Compound Interest) boylik to'plashning eng kuchli qurolidir."
        ],
        quizzes: [
          {
            id: 'mo1_q1',
            question: "Nima sababdan bugungi 1 million so'm kelgusi yilgi 1 million so'mdan qimmatroq hisoblanadi?",
            options: [
              "Chunki yangi banknotalar chiroyliroq bosiladi",
              "Inflyatsiya va uni bugun daromad keltiruvchi aktivga joylashtirish imkoniyati sababli",
              "Kelasi yili pul butunlay bekor qilinishi mumkinligi sababli",
              "Banklar kelasi yil pul qabul qilmasligi sababli"
            ],
            correctIndex: 1,
            explanation: "Pulning vaqt qiymati (Time Value of Money) investitsiya orqali daromad olish imkoniyati va inflyatsiyaning xarid qobiliyatiga ta'siriga asoslanadi."
          },
          {
            id: 'mo1_q2',
            question: "Murakkab foiz (Compound Interest) qanday ishlaydi?",
            options: [
              "Foiz faqat boshlang'ich kiritilgan sarmoyaga hisoblanadi",
              "Foiz boshlang'ich sarmoya bilan birga avval yig'ilgan foizlarga ham hisoblanadi",
              "Foiz har yili avtomatik ravishda kamayib boradi",
              "Bu faqat davlat obligatsiyalarida qo'llaniladi"
            ],
            correctIndex: 1,
            explanation: "Murakkab foizda avvalgi davrlarda hisoblangan foizlar ham asosiy summaga qo'shilib, uning ustiga yangi foiz ishlanadi ('foiz ustiga foiz')."
          }
        ],
        task: "Agar sizga hozir 1 000 000 so'm yoki 1 yildan keyin 1 100 000 so'm taklif qilinsa, qaysi birini tanlaysiz va nima uchun? Yillik inflyatsiya taxminan 12% deb hisoblang.",
        sampleKeywords: ['1 000 000', 'inflyatsiya', '12%', 'xarid qobiliyati', 'real qiymat', 'investitsiya', 'diskontlash']
      },
      {
        id: 'mo2',
        title: 'Byudjetlashtirish asoslari',
        dur: '8 daq. video',
        text: "Shaxsiy byudjet — daromad va xarajatlarni rejalashtirish vositasi. Ko'p qo'llaniladigan 50/30/20 qoidasiga ko'ra, daromadning 50% zaruriy ehtiyojlarga, 30% istaklarga, 20% jamg'arma va qarzlarni to'lashga ajratiladi. Byudjet tuzish moliyaviy intizom va kelajakka rejalashtirish imkonini beradi.",
        interactiveTool: 'budget_50_30_20',
        reja: [
          {
            id: 'mo2_s1',
            order: 1,
            title: '1. Byudjet intizomi va xarajatlar auditi',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Daromadlar va xarajatlarni 3 ta toifaga ajratish tamoyili.',
            keyPoints: ['Ehtiyojlar vs Istaklar vs Jamgʻarma']
          },
          {
            id: 'mo2_s2',
            order: 2,
            title: '2. 50/30/20 Qoidasining amaliy strukturasi',
            timeEst: '2 daq.',
            category: 'formula',
            description: '50% Ehtiyojlar, 30% Istaklar, 20% Moliyaviy xavfsizlik yostigʻi.',
            keyPoints: ['Byudjet nisbatlari']
          },
          {
            id: 'mo2_s3',
            order: 3,
            title: '3. Interaktiv 50/30/20 Byudjet Kalkulyatori',
            timeEst: '2 daq.',
            category: 'formula',
            description: 'Daromad miqdorini kiritib, har bir toifaga ajratiladigan real summani koʻring.',
            keyPoints: ['Avtomatik hisoblash']
          },
          {
            id: 'mo2_s4',
            order: 4,
            title: '4. Nazorat testi (Micro-Quiz)',
            timeEst: '2 daq.',
            category: 'quiz',
            description: 'Byudjet qoidalari va xavfsizlik jamgʻarmasi boʻyicha 2 ta test.',
            keyPoints: ['2/2 toʻgʻri javob']
          },
          {
            id: 'mo2_s5',
            order: 5,
            title: '5. Amaliy Shaxsiy Byudjet Taxtasi & AI Audit',
            timeEst: '5 daq.',
            category: 'audit',
            description: 'Oylik daromadingizni 50/30/20 qoidasi asosida batafsil taqsimlab yozing.',
            keyPoints: ['AI tahlili']
          }
        ],
        keyTakeaways: [
          "50% — Birlamchi ehtiyojlar (ovqat, kommunal, ijara, transport).",
          "30% — Qulaylik va istaklar (dam olish, xobbi, kiyim-kechak).",
          "20% — Moliyaviy xavfsizlik (jamg'arma, investitsiya, muddatli qarzlar)."
        ],
        quizzes: [
          {
            id: 'mo2_q1',
            question: "Klassik 50/30/20 byudjet qoidasida daromadning 20% qismi nimaga yo'naltirilishi tavsiya etiladi?",
            options: [
              "Restoran va ko'ngilochar xarajatlarga",
              "Zaruriy kommunal va oziq-ovqat to'lovlariga",
              "Jamg'arma, investitsiya va qarz qisqartirishga",
              "Brend kiyimlar xarid qilishga"
            ],
            correctIndex: 2,
            explanation: "20% qism moliyaviy barqarorlik poydevori bo'lib, xavfsizlik yostiqchasi (favqulodda jamg'arma) va investitsiyalarga mo'ljallanadi."
          },
          {
            id: 'mo2_q2',
            question: "Favqulodda jamg'arma (xavfsizlik yostiqchasi) qancha miqdorda bo'lishi maqsadga muvofiq?",
            options: [
              "1 haftalik xarajatlar miqdorida",
              "Kamida 3 oydan 6 oygacha bo'lgan majburiy xarajatlar miqdorida",
              "10 yillik yalpi daromad miqdorida",
              "Bunday jamg'arma kerak emas"
            ],
            correctIndex: 1,
            explanation: "Moliyaviy ekspertlar kutilmagan vaziyatlar (ish yo'qotish, davolanish) uchun 3-6 oylik yashash xarajatlarini likvid saqlashni tavsiya etishadi."
          }
        ],
        task: "O'zingizning (yoki taxminiy) oylik daromadingizni 50/30/20 qoidasi asosida taqsimlab ko'ring va har bir toifaga qancha mablag' ajratganingizni yozing.",
        sampleKeywords: ['50%', '30%', '20%', 'ehtiyoj', 'istak', 'jamgʻarma', 'daromad', 'taqsimot']
      }
    ]
  },
  {
    id: 'buxgalteriya',
    num: '03',
    name: 'Buxgalteriya',
    tag: 'BUXGALTERIYA',
    desc: 'Debet-kredit tizimi, moliyaviy hisobotlar va balans mantiqi.',
    estimatedWeeks: 3,
    level: 'Professional Buxgalteriya',
    lessons: [
      {
        id: 'bu1',
        title: 'Debet va kredit',
        dur: '10 daq. video',
        text: "Ikki tomonlama yozuv tizimida har bir moliyaviy operatsiya kamida ikkita hisobga ta'sir qiladi: biri debet, ikkinchisi kredit tomonidan. Aktivlar va xarajatlar debet bo'yicha oshadi, kredit bo'yicha kamayadi; majburiyatlar, kapital va daromadlar esa aksincha — kredit bo'yicha oshadi. Bu tizim buxgalteriya balansining doimo muvozanatda bo'lishini ta'minlaydi.",
        interactiveTool: 'balance_equation',
        reja: [
          {
            id: 'bu1_s1',
            order: 1,
            title: '1. Ikki tomonlama yozuv (Double Entry) mantiqi',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Luka Pacholi tomonidan asos solingan universal moliyaviy til.',
            keyPoints: ['Debet = Kredit doimiy tengligi']
          },
          {
            id: 'bu1_s2',
            order: 2,
            title: '2. Aktivlar, Majburiyatlar va Kapital qoidalari',
            timeEst: '2 daq.',
            category: 'formula',
            description: 'Qaysi hisoblar debetda koʻpayadi, qaysilari kreditda oshadi.',
            keyPoints: ['Aktiv: Debet (+), Majburiyat: Kredit (+)']
          },
          {
            id: 'bu1_s3',
            order: 3,
            title: '3. Real Provodkalar va Keyslar tahlili',
            timeEst: '2 daq.',
            category: 'keys',
            description: 'Omborga tovar kelishi, kassadan toʻlov qilish va mijozdan tushum.',
            keyPoints: ['Schetlar rejasi']
          },
          {
            id: 'bu1_s4',
            order: 4,
            title: '4. Nazorat testi (Micro-Quiz)',
            timeEst: '2 daq.',
            category: 'quiz',
            description: 'Debet va kredit qoidalariga oid 2 ta savol.',
            keyPoints: ['2/2 toʻgʻri javob']
          },
          {
            id: 'bu1_s5',
            order: 5,
            title: '5. Amaliy Buxgalteriya Provodkasi Auditi',
            timeEst: '5 daq.',
            category: 'audit',
            description: '5 mln soʻmga jihoz naqd pulga olingan operatsiyani tahlil qiling va hisoblarni yozing.',
            keyPoints: ['AI ekspert xulosasi']
          }
        ],
        keyTakeaways: [
          "Debet va Kredit — har bir operatsiyaning ikki tomoni.",
          "Aktivlar: Debet (+) oshadi, Kredit (-) kamayadi.",
          "Majburiyat va Kapital: Kredit (+) oshadi, Debet (-) kamayadi."
        ],
        quizzes: [
          {
            id: 'bu1_q1',
            question: "Korxona hisob raqamiga xaridordan pul kelib tushganda, 'Pul mablag'lari' (Aktiv) hisobi qanday qayd etiladi?",
            options: [
              "Debet bo'yicha (chunki aktiv oshdi)",
              "Kredit bo'yicha (chunki pul bankka ketdi)",
              "Faqat yil yakunida qayd etiladi",
              "Hisobdan butunlay chiqarib tashlanadi"
            ],
            correctIndex: 0,
            explanation: "Aktiv hisoblar (pul mablag'lari, xomashyo, jihozlar) ko'payganda doimo DEBET qilinadi."
          },
          {
            id: 'bu1_q2',
            question: "Ikki tomonlama yozuv (Double Entry) qoidasining asosiy talabi nima?",
            options: [
              "Barcha hisobotlar faqat qog'ozda yuritilishi shart",
              "Har bir operatsiyada Debet summalari yig'indisi Kredit summalari yig'indisiga teng bo'lishi shart",
              "Kompaniya faqat bitta bank bilan ishlashi shart",
              "Kredit har doim Debetdan ikki baravar katta bo'lishi shart"
            ],
            correctIndex: 1,
            explanation: "Debet va Kredit har doim tenglikni saqlashi kerak (Debet = Kredit), aks holda balans buziladi."
          }
        ],
        task: "Korxona 5 000 000 so'mga naqd pulga jihoz sotib oldi. Bu operatsiya qaysi hisoblarga qanday ta'sir qiladi (debet/kredit)? Tushuntiring.",
        sampleKeywords: ['asosiy vositalar', 'jihoz', 'naqd pul', 'kassa', 'debet', 'kredit', 'aktiv']
      },
      {
        id: 'bu2',
        title: 'Balans hisoboti',
        dur: '9 daq. video',
        text: "Balans hisoboti (buxgalteriya balansi) — korxonaning muayyan sanadagi moliyaviy holatini aks ettiruvchi hisobot bo'lib, u Aktivlar = Majburiyatlar + Kapital tenglamasiga asoslanadi. Aktivlar korxona egalik qiladigan resurslar, majburiyatlar — uning qarzlari, kapital esa egalarning ulushidir.",
        interactiveTool: 'balance_equation',
        reja: [
          {
            id: 'bu2_s1',
            order: 1,
            title: '1. Buxgalteriya Balansi nima?',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Muayyan sanadagi korxona moliyaviy holatining "rentgen" surati.',
            keyPoints: ['Likvidlik va resurslar']
          },
          {
            id: 'bu2_s2',
            order: 2,
            title: '2. Asosiy Balans Tenglamasi (Fundamental Equation)',
            timeEst: '2 daq.',
            category: 'formula',
            description: 'Aktivlar = Majburiyatlar + Xususiy Kapital.',
            keyPoints: ['Assets = Liabilities + Equity']
          },
          {
            id: 'bu2_s3',
            order: 3,
            title: '3. Interaktiv Balans Simulyatori',
            timeEst: '3 daq.',
            category: 'formula',
            description: 'Aktivlar va qarzlar kiritilganda kapital qanday shakllanishini sinang.',
            keyPoints: ['Tenglik tekshiruvi']
          },
          {
            id: 'bu2_s4',
            order: 4,
            title: '4. Nazorat testi (Micro-Quiz)',
            timeEst: '2 daq.',
            category: 'quiz',
            description: 'Balans tenglamasi va majburiyatlar toʻgʻrisida 2 ta test.',
            keyPoints: ['2 ta test']
          },
          {
            id: 'bu2_s5',
            order: 5,
            title: '5. Amaliy Balans Hisobi Auditi',
            timeEst: '5 daq.',
            category: 'audit',
            description: 'Aktiv 200 mln, majburiyat 80 mln boʻlganda kapitalni formulaviy hisoblab bering.',
            keyPoints: ['Ekspert bahosi']
          }
        ],
        keyTakeaways: [
          "Asosiy tenglama: Aktivlar = Majburiyatlar + Xususiy Kapital.",
          "Aktivlar kompaniyaga nima tegishli ekanini ko'rsatadi.",
          "Majburiyat va Kapital esa bu aktivlar qaysi manbalar hisobidan shakllanganini tushuntiradi."
        ],
        quizzes: [
          {
            id: 'bu2_q1',
            question: "Buxgalteriya balansining asosiy fundamental tenglamasi qaysi?",
            options: [
              "Aktivlar = Daromadlar - Xarajatlar",
              "Aktivlar = Majburiyatlar + Xususiy Kapital",
              "Foyda = Sotuv hajmi / Xodimlar soni",
              "Majburiyatlar = Aktivlar * Soliq stavkasi"
            ],
            correctIndex: 1,
            explanation: "Balansning fundamental qonuni: Korxonaning barcha resurslari (Aktivlar) qarzlar (Majburiyat) va ta'sischilar mablag'i (Kapital) yig'indisiga tengdir."
          },
          {
            id: 'bu2_q2',
            question: "Quyidagilardan qaysi biri 'Majburiyat' (Liabilities) toifasiga kiradi?",
            options: [
              "Kompaniya omboridagi tayyor mahsulotlar",
              "Bankdan olingan qisqa muddatli kredit",
              "Kompaniya binosi va ofis mebellari",
              "Yillik sof taqsimlanmagan foyda"
            ],
            correctIndex: 1,
            explanation: "Bank krediti, yetkazib beruvchilarga to'lanishi kerak bo'lgan qarzlar korxonaning majburiyatlari hisoblanadi."
          }
        ],
        task: "Agar korxonaning aktivlari 200 mln so'm, majburiyatlari 80 mln so'm bo'lsa, kapital qancha bo'ladi? Formulani yozib, hisoblang.",
        sampleKeywords: ['aktivlar', 'majburiyatlar', 'kapital', '200', '80', '120 mln', 'formula']
      }
    ]
  },
  {
    id: 'biznes',
    num: '04',
    name: 'Biznes',
    tag: 'BIZNES',
    desc: 'Biznes-reja, strategik tahlil va tadbirkorlik asoslari.',
    estimatedWeeks: 2,
    level: 'Strategik Boshqaruv',
    lessons: [
      {
        id: 'bi1',
        title: 'Biznes-reja tuzish',
        dur: '12 daq. video',
        text: "Biznes-reja — loyihaning maqsadlari, bozor tahlili, moliyaviy prognozlari va amalga oshirish strategiyasini o'z ichiga olgan hujjat. U investorlar uchun ishonch hosil qilish va tadbirkor uchun yo'l xaritasi vazifasini bajaradi. Yaxshi biznes-reja aniq muammo, yechim va bozor ehtiyojini ko'rsatadi.",
        interactiveTool: 'break_even',
        reja: [
          {
            id: 'bi1_s1',
            order: 1,
            title: '1. Biznes gʻoya va Pain Point (Ogʻriqli nuqta)',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Mijozning haqiqiy muammosini aniqlash va qimmatli taklif (Value Proposition) yaratish.',
            keyPoints: ['Muammo -> Yechim']
          },
          {
            id: 'bi1_s2',
            order: 2,
            title: '2. Bozor sigʻimi va Raqobatchilar tahlili',
            timeEst: '2 daq.',
            category: 'keys',
            description: 'TAM, SAM, SOM tushunchalari va raqobat ustunligini shakllantirish.',
            keyPoints: ['Maqsadli auditoriya']
          },
          {
            id: 'bi1_s3',
            order: 3,
            title: '3. Interaktiv Zararsizlik Nuqtasi (Break-Even) Kalkulyatori',
            timeEst: '3 daq.',
            category: 'formula',
            description: 'Xarajatlar va dona narxini kiritib, biznes qachon 0 ga chiqishini hisoblang.',
            keyPoints: ['Zararsiz sotuv hajmi']
          },
          {
            id: 'bi1_s4',
            order: 4,
            title: '4. Nazorat testi (Micro-Quiz)',
            timeEst: '2 daq.',
            category: 'quiz',
            description: 'Biznes-rejaning asosiy boʻlimlari boʻyicha 2 ta test.',
            keyPoints: ['2/2 toʻgʻri javob']
          },
          {
            id: 'bi1_s5',
            order: 5,
            title: '5. Amaliy Biznes-Reja Loyihasi & AI Audit',
            timeEst: '5 daq.',
            category: 'audit',
            description: 'Kichik biznes gʻoyangiz uchun muammo, yechim va maqsadli auditoriyani yozing.',
            keyPoints: ['AI reytingi']
          }
        ],
        keyTakeaways: [
          "Biznes-reja: Muammo -> Yechim -> Bozor -> Raqobatchilar -> Moliya.",
          "Mijoz auditoriyasi aniq segmentatsiyalanishi shart.",
          "Unit-iqtisodiyot va o'zini oqlash muddati (ROI) aniq hisoblanadi."
        ],
        quizzes: [
          {
            id: 'bi1_q1',
            question: "Biznes-rejani ishlab chiqishda birinchi navbatda nima aniqlanishi lozim?",
            options: [
              "Ofis uchun qimmatbaho mebel tanlash",
              "Bozordagi real muammo va mahsulot taklif qiladigan aniq yechim",
              "Kompaniya logotipining ranglari",
              "Xodimlarga beriladigan bonus miqdori"
            ],
            correctIndex: 1,
            explanation: "Muvaffaqiyatli biznesning asosi — iste'molchining haqiqiy og'riqli muammosiga (Pain Point) to'g'ri yechim taqdim etishdir."
          },
          {
            id: 'bi1_q2',
            question: "Biznes-rejadagi 'Moliyaviy reja' bo'limi qanday axborotni o'z ichiga oladi?",
            options: [
              "Faqat korxona rahbarining tarjimai holi",
              "Kutilayotgan daromadlar, xarajatlar, zararsizlik nuqtasi va kutilayotgan sof foyda",
              "Ofis binosining arxitektura chizmalari",
              "Xodimlarning ta'til jadvallari"
            ],
            correctIndex: 1,
            explanation: "Moliyaviy reja investitsiya qaytimi, zararsizlik nuqtasi (Break-even point) va pul oqimlari (Cash Flow) kabi muhim ko'rsatkichlarni aks ettiradi."
          }
        ],
        task: "O'zingiz tasavvur qilgan kichik biznes g'oyasi uchun: 1) qanday muammoni hal qiladi, 2) kim uning mijozi bo'lishi mumkinligini qisqacha yozing.",
        sampleKeywords: ['biznes gʻoya', 'muammo', 'yechim', 'mijoz', 'maqsadli auditoriya', 'afzallik']
      },
      {
        id: 'bi2',
        title: 'SWOT tahlili',
        dur: '7 daq. video',
        text: "SWOT tahlili — kuchli tomonlar (Strengths), zaif tomonlar (Weaknesses), imkoniyatlar (Opportunities) va tahdidlarni (Threats) baholash usuli. Birinchi ikkitasi ichki omillar, keyingi ikkitasi tashqi omillardir. Bu tahlil strategik qarorlar qabul qilishda yo'nalish beradi.",
        interactiveTool: 'break_even',
        reja: [
          {
            id: 'bi2_s1',
            order: 1,
            title: '1. SWOT Matritsasi strukturasi',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Ichki omillar (S & W) va tashqi bozor omillari (O & T).',
            keyPoints: ['Strengths, Weaknesses, Opportunities, Threats']
          },
          {
            id: 'bi2_s2',
            order: 2,
            title: '2. Strategik kross-matritsa tuzish',
            timeEst: '2 daq.',
            category: 'keys',
            description: 'Kuchli tomonlar orqali imkoniyatlarni zabt etish (S-O strategiyasi).',
            keyPoints: ['Hujumkor va himoyaviy harakatlar']
          },
          {
            id: 'bi2_s3',
            order: 3,
            title: '3. Real Biznes SWOT Keyslari',
            timeEst: '2 daq.',
            category: 'keys',
            description: 'Apple, Starbucks va mahalliy yetakchi brendlar misolida tahlil.',
            keyPoints: ['Bozor xatarlari']
          },
          {
            id: 'bi2_s4',
            order: 4,
            title: '4. Nazorat testi (Micro-Quiz)',
            timeEst: '2 daq.',
            category: 'quiz',
            description: 'SWOT komponentlari boʻyicha 2 ta ekspress test.',
            keyPoints: ['2 ta test']
          },
          {
            id: 'bi2_s5',
            order: 5,
            title: '5. Amaliy Kompaniya SWOT Matritsasi & AI Xulosa',
            timeEst: '5 daq.',
            category: 'audit',
            description: 'Oʻzingiz tanlagan biznes uchun S, W, O, T bandlarini toʻliq yozing.',
            keyPoints: ['AI sertifikatlangan audit']
          }
        ],
        keyTakeaways: [
          "Strengths & Weaknesses (S va W) — korxona nazorat qila oladigan ichki omillar.",
          "Opportunities & Threats (O va T) — tashqi bozor, qonunchilik va raqobat muhiti.",
          "Strategiya: Zaifliklarni kamaytirish va imkoniyatlardan foydalanish."
        ],
        quizzes: [
          {
            id: 'bi2_q1',
            question: "SWOT tahlilida qaysi ikkita komponent tashqi muhitga (kompaniyadan tashqariga) tegishli?",
            options: [
              "Kuchli tomonlar (S) va Zaif tomonlar (W)",
              "Imkoniyatlar (O) va Xavf-xatarlar/Tahdidlar (T)",
              "Faqat xodimlar malakasi va mahsulot narxi",
              "Ichki nizolar va marketing byudjeti"
            ],
            correctIndex: 1,
            explanation: "O (Opportunities - Imkoniyatlar) va T (Threats - Tahdidlar) tashqi bozor omillari bo'lib, korxona ularga moslashishi lozim."
          },
          {
            id: 'bi2_q2',
            question: "Kompaniyada tajribali va sodiq jamoaning mavjudligi SWOT matritsasining qaysi katagiga yoziladi?",
            options: [
              "T (Tashqi xavf-xatar)",
              "W (Zaif tomon)",
              "S (Kuchli ichki tomon)",
              "O (Tashqi imkoniyat)"
            ],
            correctIndex: 2,
            explanation: "Tajribali xodimlar, patentlar, sifatli brend — korxonaning ichki kuchli tomonlari (Strengths) hisoblanadi."
          }
        ],
        task: "Tanlagan biznes g'oyangiz (yoki mavjud kompaniya) uchun har bir SWOT toifasiga kamida bitta band yozing.",
        sampleKeywords: ['strengths', 'weaknesses', 'opportunities', 'threats', 'kuchli', 'zaif', 'imkoniyat', 'xavf']
      }
    ]
  },
  {
    id: 'islom-moliyasi',
    num: '05',
    name: 'Islom Moliyasi',
    tag: 'ISLOM MOLIYASI',
    desc: 'Islomiy moliya tamoyillari, halol investitsiya, Murobaha, Muzoraba, Musharaka, Sukuk va Zakot hisobi (Muhammadali ustoz darslari).',
    estimatedWeeks: 2,
    level: 'Amaliy / Ixtisoslashgan',
    lessons: [
      {
        id: 'im1',
        title: 'Islomiy moliya tamoyillari va Ribo/Gʻarar taqiqlari (Muhammadali ustoz)',
        dur: '12 daq. video',
        text: "Islomiy moliya — adolat, shaffoflik va real aktivlarga asoslangan iqtisodiy tizimdir. Uning asosiy qonuniyatlariga: Ribo (har qanday qat'iy kafolatlangan foiz/sudxo'rlik) taqiqi, G'arar (haddan tashqari noaniqlik, aldov va yashirin shartlar) taqiqi, Maysir (qimor va asossiz tavakkalchilik) taqiqi kiradi. Islom moliyasida pul o'z-o'zidan pul keltiruvchi tovar emas, balki faqat ayirboshlash vositasidir. Daromad real savdo, xizmat ko'rsatish yoki sherikchilikda tavakkalchilikni bo'lishish evziga olinadi.",
        interactiveTool: 'islamic_murabaha',
        reja: [
          {
            id: 'im1_s1',
            order: 1,
            title: '1. Islomiy moliya falsafasi va Maqosid ash-Sharia',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Boylikning jamiyatdagi aylanmasi, adolat va moddiy aktivga bogʻliqlik tamoyili.',
            keyPoints: ['Pul tovar emas, ayirboshlash vositasi', 'Boylikning bir qoʻlda toʻplanib qolmasligi']
          },
          {
            id: 'im1_s2',
            order: 2,
            title: '2. Ribo (foiz), Gʻarar va Maysir taqiqlari',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Anʼanaviy foizli kreditlarning zararlari va shariatda taqiqlangan bitim turlari.',
            keyPoints: ['Qarz ustiga foiz qoʻshish — Ribo', 'Nomaʼlum shartlar — Gʻarar']
          },
          {
            id: 'im1_s3',
            order: 3,
            title: '3. Murobaha va Sherikchilik Simulyatori',
            timeEst: '3 daq.',
            category: 'formula',
            description: 'Tannarx va ochiq eʼlon qilingan foyda marjasini hisoblab, shariatga muvofiq savdoni tekshiring.',
            keyPoints: ['Ochiq ustama narx', 'Kechikishda foiz qoʻshilmasligi']
          },
          {
            id: 'im1_s4',
            order: 4,
            title: '4. Nazorat testi (Micro-Quiz)',
            timeEst: '2 daq.',
            category: 'quiz',
            description: 'Muhammadali ustoz maʼruzasi boʻyicha 2 ta ekspress testni toʻgʻri yeching.',
            keyPoints: ['2/2 toʻgʻri natija']
          },
          {
            id: 'im1_s5',
            order: 5,
            title: '5. Amaliy Audit: Foizli kredit va Islomiy Murobaha tahlili',
            timeEst: '5 daq.',
            category: 'audit',
            description: 'Real keys asosida shariat moliyasining anʼanaviy bankdan 3 ta fundamental farqini yozing.',
            keyPoints: ['AI auditor 3 mezon boʻyicha baholaydi']
          }
        ],
        keyTakeaways: [
          "Ribo taqiqi: Puldan pul ko'paytirish (foiz) qat'iyan man etilgan; daromad faqat real aktiv va xizmat orqali olinadi.",
          "G'arar taqiqi: Bitim predmeti, narxi va yetkazib berish muddati shaffof va aniq bo'lishi shart.",
          "Foyda va zarar sherikchiligi: Xavf-xatarlar (tavakkal) tomonlar o'rtasida adolatli taqsimlanadi."
        ],
        quizzes: [
          {
            id: 'im1_q1',
            question: "Islom moliyasida qarz evziga qat'iy kafolatlangan qo'shimcha foiz talab qilish nima deb ataladi?",
            options: [
              "Muzoraba",
              "Ribo (Sudxo'rlik)",
              "Zakot",
              "Sukuk"
            ],
            correctIndex: 1,
            explanation: "Ribo — qarz beruvchining bergan puli evaziga kafolatlangan ortiqcha foiz olishi bo'lib, islom moliyasida qat'iy taqiqlangan."
          },
          {
            id: 'im1_q2',
            question: "Islomiy bank va an'anaviy foizli bankning eng asosiy farqi nimada?",
            options: [
              "Islomiy bank faqat bepul xayriya tarqatadi",
              "Islomiy bank faqat davlat korxonalari bilan ishlaydi",
              "Islomiy bank real tovar/aktiv savdosida qatnashadi va foyda-zararni sherikchilikda taqsimlaydi",
              "Hech qanday farqi yo'q"
            ],
            correctIndex: 2,
            explanation: "Islomiy bank pulni foizga bermaydi, balki mijoz nomidan tovar sotib olib ustama bilan sotadi (Murobaha) yoki loyihaga sherik bo'ladi (Muzoraba/Musharaka)."
          }
        ],
        task: "Muhammadali ustoz darsidan kelib chiqib, an'anaviy foizli kredit va islomiy Murobaha (ustamali savdo) o'rtasidagi 3 ta asosiy farqni yozib bering.",
        sampleKeywords: ['ribo', 'foiz', 'murobaha', 'aktiv', 'shariat', 'tavakkal', 'adolat', 'muhammadali']
      },
      {
        id: 'im2',
        title: 'Islomiy shartnomalar: Murobaha, Muzoraba, Musharaka va Zakot (Muhammadali ustoz)',
        dur: '15 daq. video',
        text: "Islomiy moliyada keng qo'llaniladigan asosiy shartnoma modellari mavjud: 1) Murobaha — bank mijoz so'ragan tovarning tannarxi va o'z foydasini ochiq aytib, unga bo'lib to'lashga sotadi. 2) Muzoraba — bir tomon (Rabbal-mol) sarmoya kiritadi, ikkinchi tomon (Mudarib) o'z mehnati va tajribasi bilan boshqaradi, hosil bo'lgan sof foyda kelishilgan nisbatda bo'linadi. 3) Musharaka — barcha tomonlar ham pul, ham boshqaruv bilan qatnashadigan to'liq sherikchilik. 4) Sukuk — real aktivlarga egalik ulushini ifodalovchi islomiy qimmatli qog'ozlar. Shuningdek, 85 gramm oltin (nisob) miqdoridagi erkin boylikka ega kishi uchun yillik 2.5% Zakot berish farz hisoblanadi.",
        interactiveTool: 'zakat_calculator',
        reja: [
          {
            id: 'im2_s1',
            order: 1,
            title: '1. Savdoga asoslangan shartnomalar: Murobaha, Salam va Istisna',
            timeEst: '2 daq.',
            category: 'nazariya',
            description: 'Aktiv sotib olish, ishlab chiqarishni moliyalashtirish va muddatli toʻlov qoidalari.',
            keyPoints: ['Tannarx va foyda ochiqligi', 'Buyurtma asosida ishlab chiqarish (Istisna)']
          },
          {
            id: 'im2_s2',
            order: 2,
            title: '2. Sherikchilik modellari: Muzoraba va Musharaka',
            timeEst: '3 daq.',
            category: 'nazariya',
            description: 'Sarmoya va mehnat ittifoqi: foyda oldindan belgilangan foizda, zarar esa faqat sarmoya nisbatida taqsimlanadi.',
            keyPoints: ['Rabbal-mol (Sarmoyador)', 'Mudarib (Boshqaruvchi)']
          },
          {
            id: 'im2_s3',
            order: 3,
            title: '3. Interaktiv Zakot va Halol Mol-mulk Hisoblagichi',
            timeEst: '3 daq.',
            category: 'formula',
            description: 'Naqd pul, oltin va tijorat tovarlarini kiritib, 85gr oltin nisobi va 2.5% zakot miqdorini aniqlang.',
            keyPoints: ['Nisob miqdori', '2.5% (1/40) qoida']
          },
          {
            id: 'im2_s4',
            order: 4,
            title: '4. Nazorat testi (Micro-Quiz)',
            timeEst: '2 daq.',
            category: 'quiz',
            description: 'Muzoraba va Zakot boʻyicha 2 ta ekspress testni yeching.',
            keyPoints: ['2 ta test']
          },
          {
            id: 'im2_s5',
            order: 5,
            title: '5. Amaliy Mustaqil Audit: Muzoraba Loyihasini Rejalashtirish',
            timeEst: '5 daq.',
            category: 'audit',
            description: 'Real startap yoki savdo loyihasi uchun Muzoraba shartnomasida foyda-zarar taqsimotini yozing.',
            keyPoints: ['AI xulosasi va rasmiy muhr']
          }
        ],
        keyTakeaways: [
          "Muzorabada zarar bo'lsa: Sarmoyador moliyaviy zarar ko'radi, boshqaruvchi esa mehnati va vaqtini yo'qotadi (boshqaruvchiga asossiz qarz yuklanmaydi).",
          "Musharaka: Barcha hamkorlar sarmoya kiritadi va foyda kelishilgan nisbatda, zarar esa har kimning kiritgan sarmoyasi ulushida taqsimlanadi.",
          "Sukuk: An'anaviy foizli obligatsiyalardan farqli ravishda, real zavod, bino yoki ko'chmas mulk ulushiga egalikni ta'minlaydi.",
          "Zakot: Iqtisodiyotda boylikning turg'unlashib qolishini oldini olib, ehtiyojmandlarga yo'naltiruvchi moliyaviy barqarorlik ustuni."
        ],
        quizzes: [
          {
            id: 'im2_q1',
            question: "Muzoraba (Mudarabah) shartnomasida biznes kutilmagan tabiiy zarar ko'rsa, moddiy yo'qotish kimning zimmasiga tushadi?",
            options: [
              "Faqat ish boshqaruvchi (Mudarib) barcha pulni to'lab beradi",
              "Sarmoyador (Rabbal-mol) o'z kiritgan puli miqdorida zarar ko'radi, boshqaruvchi esa mehnati evaziga haq olmaydi",
              "Davlat soliq idorasi to'lab beradi",
              "Bank xodimlari o'z oyligidan to'laydi"
            ],
            correctIndex: 1,
            explanation: "Muzoraba qoidasiga ko'ra, qasddan qilingan xato bo'lmasa, moliyaviy zarar faqat sarmoya egasiga tegishli bo'ladi."
          },
          {
            id: 'im2_q2',
            question: "Zakot to'lash farz bo'lishi uchun erkin boylikning eng kam miqdori (Nisob) taxminan qancha deb qabul qilingan?",
            options: [
              "1 kg kumush narxi",
              "10 dona qo'y narxi",
              "85 gramm sof oltin ekvivalenti",
              "1 yillik maosh miqdori"
            ],
            correctIndex: 2,
            explanation: "Pul va qimmatbaho aktivlar uchun zakot nisobi 85 gramm sof oltin qiymatiga teng bo'lib, unga yetgan boylikdan 2.5% zakot chiqariladi."
          }
        ],
        task: "Sizda yangi biznes g'oya bor va investor bilan Muzoraba shartnomasi tuzmoqchisiz. Foyda qanday taqsimlanishini va zarar holatida nima bo'lishini Muhammadali ustoz tushuntirgan qoidalar asosida bayon eting.",
        sampleKeywords: ['muzoraba', 'musharaka', 'sarmoyador', 'rabbal-mol', 'mudarib', 'foyda', 'zarar', 'zakot', 'sukuk']
      }
    ]
  }
];

export const MEDIA: MediaItem[] = [
  {
    id: 'm1',
    kind: 'Video',
    title: 'Moliyaviy savodxonlik: qayerdan boshlash kerak?',
    desc: "Shaxsiy moliyani boshqarishning amaliy asoslari, xarajatlar nazorati va byudjet intizomi boʻyicha videodars.",
    duration: '18 daqiqa',
    speaker: "Temur Xoliqov (Moliyaviy maslahatchi)",
    youtubeUrl: 'https://www.youtube.com/watch?v=HQzoZfc3GwQ',
    videoCategory: 'Moliya & Byudjet',
    audioQuiz: {
      question: "Moliyaviy savodxonlikni oshirishning dastlabki va eng muhim qadami nima?",
      options: [
        "Darhol yuqori xavfli kriptovalyutalarga barcha pulni kiritish",
        "Har kunlik barcha daromad va xarajatlarni aniq hisoblab borish (audit qilish)",
        "Qimmatbaho kredit olib, biznes boshlash",
        "Barcha xarajatlarni butunlay to'xtatish"
      ],
      correctIndex: 1,
      explanation: "Shaxsiy moliyani boshqarish barcha kirim-chiqimlarni audit qilish va ortiqcha xarajatlarni aniqlashdan boshlanadi.",
      rewardCapital: 50
    }
  },
  {
    id: 'm2',
    kind: 'Video',
    title: "O'zbekiston iqtisodiyoti va YaIM tahlili",
    desc: "So'nggi yillardagi asosiy makroiqtisodiy tendensiyalar, yalpi ichki mahsulot (YaIM) va eksport o'sishi.",
    duration: '14 daqiqa',
    speaker: "Iqtisodiy tadqiqotlar markazi",
    youtubeUrl: 'https://www.youtube.com/watch?v=PHe0bXAIuk8',
    videoCategory: 'Makroiqtisodiyot',
    audioQuiz: {
      question: "Yalpi Ichki Mahsulot (YaIM / GDP) nimani ifodalaydi?",
      options: [
        "Mamlakat aholisining banklardagi umumiy qarzi miqdorini",
        "Bir yil davomida mamlakat hududida ishlab chiqarilgan barcha yakuniy tovar va xizmatlarning bozor qiymatini",
        "Faqat xorijdan import qilingan mahsulotlar summasini",
        "Davlat xizmatchilarining oylik maoshlari yig'indisini"
      ],
      correctIndex: 1,
      explanation: "YaIM (GDP) ma'lum bir davrda mamlakat ichida yaratilgan barcha yakuniy mahsulot va xizmatlarning umumiy bozor qiymatidir.",
      rewardCapital: 50
    }
  },
  {
    id: 'm3',
    kind: 'Video',
    title: 'Kichik biznes va Startap: birinchi qadamlar',
    desc: "Tadbirkorlar bilan amaliy video-dars — MVP yaratish, dastlabki mijozlarni jalb qilish va real xatolardan saboqlar.",
    duration: '22 daqiqa',
    speaker: "Startap asoschilari klubi",
    youtubeUrl: 'https://www.youtube.com/watch?v=7bB_fP944Gs',
    videoCategory: 'Biznes & Startap',
    audioQuiz: {
      question: "Startaplarda 'MVP' (Minimum Viable Product) nima uchun yaratiladi?",
      options: [
        "Katta zavod qurishdan oldin g'oyani minimal xarajat bilan real bozorda sinab ko'rish uchun",
        "Faqat do'stlarga sovg'a qilish uchun",
        "Soliq to'lashdan qochish uchun",
        "Kompaniyani darhol yopish uchun"
      ],
      correctIndex: 0,
      explanation: "MVP kam xarajat bilan asosiy funksiyani ishlab chiqib, bozordan tezkor fikr-mulohaza (feedback) olish imkonini beradi.",
      rewardCapital: 50
    }
  },
  {
    id: 'm4',
    kind: 'Video',
    title: 'Buxgalteriya dasturlarida amaliyot',
    desc: "Kundalik hisobotlarni tayyorlash, provodkalar kiritish va oylik yakuniy hisoblarni chiqarish bo'yicha amaliy dars.",
    duration: '16 daqiqa',
    speaker: "Bosh Buxgalterlar Assotsiatsiyasi",
    youtubeUrl: 'https://www.youtube.com/watch?v=yprqZ_hK00k',
    videoCategory: 'Buxgalteriya',
    audioQuiz: {
      question: "Buxgalteriya dasturlarida 'Provodka' nima?",
      options: [
        "Elektr simlarini ulash jarayoni",
        "Xo'jalik operatsiyasining Debet va Kredit hisobvaraqlari orqali bog'lanishi",
        "Xodimni ishdan bo'shatish to'g'risidagi buyruq",
        "Faqat yillik audit tekshiruvi"
      ],
      correctIndex: 1,
      explanation: "Buxgalteriya provodkasi har bir moliyaviy harakatni tegishli schetlar bo'yicha Debet va Kreditga joylashtirishdir.",
      rewardCapital: 50
    }
  },
  {
    id: 'm5',
    kind: 'Video',
    title: 'Investitsiya psixologiyasi va Diversifikatsiya',
    desc: "Moliyaviy qarorlarga FOMO, vahima va hissiyotlar qanday ta'sir qiladi hamda sovuqqon strategiya tuzish.",
    duration: '19 daqiqa',
    speaker: "Investorlar forumi",
    youtubeUrl: 'https://www.youtube.com/watch?v=gFQNPmLKjW8',
    videoCategory: 'Investitsiya',
    audioQuiz: {
      question: "Investitsiyada 'Diversifikatsiya' tamoyilining asosiy maqsadi nima?",
      options: [
        "Barcha mablag'ni faqat bitta kompaniya aksiyasiga tikish",
        "Xatarlarni kamaytirish uchun mablag'larni turli aktivlar toifalariga taqsimlash",
        "Faqat qarz hisobiga savdo qilish",
        "Har kuni aksiyalarni sotib, qayta olish"
      ],
      correctIndex: 1,
      explanation: "'Tuxumlarni bitta savatga solmaslik' qoidasi, ya'ni aktivlarni taqsimlash yo'qotish xavfini keskin kamaytiradi.",
      rewardCapital: 50
    }
  },
  {
    id: 'm6',
    kind: 'Video',
    title: 'Bank tizimi qanday ishlaydi?',
    desc: "Depozitlar, kredit emissiyasi, foiz marjasi va Markaziy bankning pul-kredit siyosati sodda tilda.",
    duration: '13 daqiqa',
    speaker: "Bank ishi akademiyasi",
    youtubeUrl: 'https://www.youtube.com/watch?v=fTTGALaRZoc',
    videoCategory: 'Bank Ishi',
    audioQuiz: {
      question: "Markaziy bank asosiy stavkani (qayta moliyalash stavkasi) oshirsa, odatda nima yuz beradi?",
      options: [
        "Kreditlar arzonlashadi va inflyatsiya tezlashadi",
        "Kreditlar qimmatlashadi, pul massasi kamayadi va inflyatsiya sekinlashadi",
        "Banklar butunlay yopiladi",
        "Aholining barcha omonatlari musodara qilinadi"
      ],
      correctIndex: 1,
      explanation: "Yuqori asosiy stavka kreditlarni qimmatlashtirib, jamg'arishni rag'batlantiradi va inflyatsiyani jilovlaydi.",
      rewardCapital: 50
    }
  },
  {
    id: 'm7',
    kind: 'Video',
    title: 'Islomiy moliya va biznes etikasi — Muhammadali ustoz',
    desc: "Tadbirkorlikda halollik, shartnomalarga qatʼiy vafo qilish, ribosiz moliya va sherikchilik madaniyati haqida suhbat.",
    duration: '24 daqiqa',
    speaker: "Muhammadali Eshonqulov (Ustoz)",
    youtubeUrl: 'https://www.youtube.com/watch?v=e_wKk_i8KzI',
    videoCategory: 'Islom Moliyasi',
    audioQuiz: {
      question: "Muhammadali ustoz ta'kidlashicha, islomiy tijoratda muvaffaqiyatning asosiy kaliti nima?",
      options: [
        "Mijozni qanday yo'l bilan bo'lsa ham tezda aldab mahsulot sotish",
        "Shartnomalarga vafodorlik, shaffoflik va sheriklikda adolatli taqsimot",
        "Barcha tovarlarni qimmat kreditga berish",
        "Raqobatchilarga zarar yetkazish"
      ],
      correctIndex: 1,
      explanation: "Islom moliyasi va biznes etikasi omonatdorlik, shaffoflik va adolatli foyda-zarar sherikchiligiga tayanadi.",
      rewardCapital: 50
    }
  }
];

export const INITIAL_LEADERBOARD = [
  { rank: 1, name: 'Bobur Rahimov', lessonsDone: 10, totalLessons: 10, avgScore: 96, capital: 350 },
  { rank: 2, name: 'Sarvinoz Muzaffarovna (Siz)', lessonsDone: 0, totalLessons: 10, avgScore: 0, capital: 0, isCurrentUser: true },
  { rank: 3, name: 'Azizbek Temirov', lessonsDone: 8, totalLessons: 10, avgScore: 91, capital: 200 },
  { rank: 4, name: 'Nilufar Qodirova', lessonsDone: 7, totalLessons: 10, avgScore: 88, capital: 150 },
  { rank: 5, name: 'Jasur Aliyev', lessonsDone: 5, totalLessons: 10, avgScore: 84, capital: 100 }
];

export const BADGES_CONFIG = [
  { id: 'first_audit', title: "Boshlang'ich Auditor", desc: "Birinchi amaliy darsni muvaffaqiyatli topshirdi", icon: '🖋️' },
  { id: 'finance_master', title: "Moliya Ustasi", desc: "Moliya bo'limidagi barcha darslarni a'lo bahoga yakunladi", icon: '⚖️' },
  { id: 'accounting_pro', title: "Debet-Kredit Mutaxassisi", desc: "Buxgalteriya balansi va provodkalarini to'liq o'zlashtirdi", icon: '📊' },
  { id: 'business_strategist', title: "Biznes Strateg", desc: "Biznes-reja va SWOT tahlilini muvaffaqiyatli topshirdi", icon: '🏛️' },
  { id: 'islamic_finance_scholar', title: "Islomiy Moliya Mutaxassisi", desc: "Islomiy moliya va shariat shartnomalarini (Muhammadali ustoz) to'liq o'zlashtirdi", icon: '🕌' },
  { id: 'streak_discipline', title: "7 Kunlik Intizom", desc: "Ketma-ket 7 kun davomida faol audit o'tkazdi", icon: '🔥' },
  { id: 'passive_capitalist', title: "Passiv Kapital Egasi", desc: "Passiv ta'lim audio-quizlaridan kamida 150 kapital to'pladi", icon: '💎' },
  { id: 'honor_auditor', title: "A+ Imtiyozli Auditor", desc: "Barcha amaliy topshiriqlardan o'rtacha 90+ ball oldi", icon: '📜' }
];
