/**
 * SeerQ × 奇門遁甲・風水命理 互動邏輯與排盤引擎
 * Features:
 * 1. 奇門遁甲即時排盤模擬器 (Qi Men Dun Jia 9-Palace Chart Generator)
 * 2. 玄空九宮飛星與八方風水佈局指南 (Feng Shui Directional Matrix)
 * 3. 五行能量即時平衡測算 (Wu Xing Quick Analysis)
 * 4. 預約諮詢表單互動與校驗
 * 5. FAQ 手風琴摺疊面板
 */

document.addEventListener('DOMContentLoaded', () => {
  initQiMenSimulator();
  initFengShuiTabs();
  initWuXingCalculator();
  initBookingForm();
  initFAQAccordion();
  initMobileNav();
  initCounters();
});

/* ==========================================================================
   1. 奇門遁甲即時排盤模擬器 (Qi Men Dun Jia Engine)
   ========================================================================== */
const qimenPalacesData = [
  { pos: "巽四宮 (東南)", star: "天輔星", gate: "杜門", deity: "六合", stem: "丁加丙", nature: "文昌吉慶", desc: "主策劃隱密、利合約締結與名譽拓展", auspicious: true },
  { pos: "離九宮 (正南)", star: "天英星", gate: "景門", deity: "九天", stem: "丙加戊", nature: "飛鳥跌穴", desc: "大吉之格！百事可謀，談判聲勢浩大，揚名立萬", auspicious: true },
  { pos: "坤二宮 (西南)", star: "天芮星", gate: "死門", deity: "九地", stem: "庚加己", nature: "刑格阻滯", desc: "宜守不宜攻，避開正面衝突，加強風水化煞", auspicious: false },
  { pos: "震三宮 (正東)", star: "天衝星", gate: "傷門", deity: "白虎", stem: "乙加辛", nature: "龍逃走格", desc: "主變革突破，利討債競技，日常出行求平穩", auspicious: false },
  { pos: "中五宮 (天心)", star: "天禽星", gate: "中宮寄宮", deity: "太極", stem: "戊加戊", nature: "伏吟安泰", desc: "時空樞紐核心，宜穩扎穩打，蓄積能量", auspicious: true },
  { pos: "兌七宮 (正西)", star: "天柱星", gate: "驚門", deity: "玄武", stem: "癸加庚", nature: "網羅密布", desc: "防口舌是非與虛假訊息，商務簽約需核實條款", auspicious: false },
  { pos: "艮八宮 (東北)", star: "天任星", gate: "生門", deity: "值符", stem: "戊加丙", nature: "青龍返首", desc: "極吉大格！求財大發、貴人鼎力相助、投資置產上選", auspicious: true },
  { pos: "坎一宮 (正北)", star: "天蓬星", gate: "休門", deity: "太陰", stem: "壬加丁", nature: "干合蛇刑", desc: "貴人休養生息、感情和合修復、休閒策劃大吉", auspicious: true },
  { pos: "乾六宮 (西北)", star: "天心星", gate: "開門", deity: "騰蛇", stem: "辛加乙", nature: "白虎猖狂", desc: "雖有開門氣象，然有變異懸疑，宜求助專業導師複盤", auspicious: false }
];

const inquiryAnalysis = {
  wealth: {
    grade: "上吉・青龍得水",
    gradeClass: "grade-great",
    title: "當前局象：生門遇天任、值符鎮艮八宮",
    summary: "此時東北方生門得令，財星高照！若進行商務簽約、大額投資或新項目立項，建議將談判主位設於辦公室東北方位，或於吉時向東北出行借運。",
    tips: [
      "吉方利導：東北方（求財置產）、正南方（名聲擴張）",
      "關鍵時機：未申時辰（13:00 - 17:00）動能最強",
      "佈局建議：辦公桌擺放黃水晶或銅質聚寶盆催旺生門生氣"
    ]
  },
  career: {
    grade: "中吉・開門逢星",
    gradeClass: "grade-great",
    title: "當前局象：開門展現、景門文昌合會",
    summary: "正南景門配合九天，有利名氣彰顯與考核求職。西北乾位雖見開門，但逢騰蛇暗動，近期職場有潛在人事重組或職責調整，宜沈著佈局。",
    tips: [
      "吉方利導：正南方（展示成果、爭取晉升）、正北方（休整謀劃）",
      "應對策略：合同文書仔細校對，主動尋求資深貴人背書",
      "佈局建議：於辦公座後安置泰山石或高背靠山，穩固權柄"
    ]
  },
  love: {
    grade: "上吉・六合休門",
    gradeClass: "grade-great",
    title: "當前局象：六合臨巽、坎宮休門得太陰相護",
    summary: "感情與人際氣場和潤！單身者利於向東南方或正北方赴約聯誼；已有伴侶者適合進行深度情感溝通，解開心結，婚曜安泰。",
    tips: [
      "吉方利導：東南方（喜氣桃花）、正北方（心靈交匯）",
      "桃花密碼：配戴粉水晶或隨身攜帶溫潤玉飾提升和諧磁場",
      "擇吉出行：申酉之時（傍晚時分）約會情感升溫最速"
    ]
  },
  negotiation: {
    grade: "大吉・飛鳥跌穴",
    gradeClass: "grade-great",
    title: "當前局象：離宮大吉・主客易位運籌在握",
    summary: "商務談判上上格局！天時在我方，談判時建議讓自己面朝正南或背靠東北，掌握氣場主動權。對手驚門失陷，易在條件上主動讓步。",
    tips: [
      "談判坐位：背靠東北（坐生門）或背靠正南（坐景門迎貴）",
      "談判技巧：先禮後兵，先拋宏觀願景，再落實利潤分配",
      "借勢開運：隨身攜帶 SeerQ 專屬奇門開運指南作臨場指引"
    ]
  }
};

function initQiMenSimulator() {
  const gridContainer = document.getElementById('qimenGrid');
  const inquirySelect = document.getElementById('qimenInquirySelect');
  const generateBtn = document.getElementById('btnGenerateQimen');
  
  if (!gridContainer || !inquirySelect || !generateBtn) return;

  function renderPalaces(shuffled = false) {
    gridContainer.innerHTML = '';
    const palaces = shuffled ? [...qimenPalacesData].sort(() => Math.random() - 0.5) : qimenPalacesData;
    
    palaces.forEach((palace, idx) => {
      const cell = document.createElement('div');
      cell.className = `palace-cell ${palace.auspicious ? 'auspicious' : ''} ${idx === 6 ? 'highlighted' : ''}`;
      cell.innerHTML = `
        <div class="palace-pos">
          <span>${palace.pos}</span>
          <span>${palace.nature}</span>
        </div>
        <div class="palace-elements">
          <div class="element-star">${palace.star}</div>
          <div class="element-gate">${palace.gate}</div>
          <div class="element-deity">${palace.deity}</div>
        </div>
        <div class="palace-footer">${palace.stem}</div>
      `;
      cell.title = palace.desc;
      cell.addEventListener('click', () => {
        document.querySelectorAll('.palace-cell').forEach(c => c.classList.remove('highlighted'));
        cell.classList.add('highlighted');
        updateInsightCustom(palace);
      });
      gridContainer.appendChild(cell);
    });
  }

  function updateInsightByInquiry(type) {
    const data = inquiryAnalysis[type] || inquiryAnalysis.wealth;
    const titleEl = document.getElementById('insightTitle');
    const gradeEl = document.getElementById('insightGrade');
    const textEl = document.getElementById('insightText');
    const tipsList = document.getElementById('insightTipsList');

    if (titleEl) titleEl.innerText = data.title;
    if (gradeEl) {
      gradeEl.innerText = data.grade;
      gradeEl.className = `insight-grade ${data.gradeClass}`;
    }
    if (textEl) textEl.innerText = data.summary;
    if (tipsList) {
      tipsList.innerHTML = data.tips.map(t => `<li>${t}</li>`).join('');
    }
  }

  function updateInsightCustom(palace) {
    const titleEl = document.getElementById('insightTitle');
    const gradeEl = document.getElementById('insightGrade');
    const textEl = document.getElementById('insightText');
    const tipsList = document.getElementById('insightTipsList');

    if (titleEl) titleEl.innerText = `選中宮位：${palace.pos} · ${palace.gate}`;
    if (gradeEl) {
      gradeEl.innerText = palace.auspicious ? "吉相宮位" : "防護化解";
      gradeEl.className = `insight-grade ${palace.auspicious ? 'grade-great' : 'grade-moderate'}`;
    }
    if (textEl) textEl.innerText = `${palace.nature}（${palace.stem}）。${palace.desc}`;
    if (tipsList) {
      tipsList.innerHTML = `
        <li>九星氣場：${palace.star}，主宰當前時空思維動能</li>
        <li>八神眷顧：${palace.deity}，無形護佑或考驗</li>
        <li>方位建議：${palace.auspicious ? '可多停留或設為主要活動方向' : '建議放置五行能量物調理氣場'}</li>
      `;
    }
  }

  renderPalaces();
  updateInsightByInquiry(inquirySelect.value);

  generateBtn.addEventListener('click', () => {
    generateBtn.innerText = "起局計算中...";
    generateBtn.disabled = true;
    setTimeout(() => {
      renderPalaces(true);
      updateInsightByInquiry(inquirySelect.value);
      generateBtn.innerText = "即刻起局排盤";
      generateBtn.disabled = false;
    }, 400);
  });

  inquirySelect.addEventListener('change', (e) => {
    updateInsightByInquiry(e.target.value);
  });
}

/* ==========================================================================
   2. 風水堪輿方位矩陣 (Feng Shui Directional Matrix)
   ========================================================================== */
const fengshuiDirections = {
  south: {
    title: "正南方（離宮 · 當令九紫離火大運主位）",
    desc: "2024–2043進入三元九運『九紫離火』大運，南方為天運核心！象徵名望、文明、科技、美麗與靈性思維。此方位吉旺無比，宜保持明亮、整潔，避免堆放雜物污濁。",
    solutionTitle: "離火旺運佈局指南：",
    solutionDesc: "適合擺放紫晶洞、長明紅燈、紅木藝術品或象徵文明名望的獎項證書，強力催旺正緣桃花與事業大運。"
  },
  north: {
    title: "正北方（坎宮 · 一白貪狼吉星）",
    desc: "一白貪狼五行屬水，主事業晉升、貴人人際、科甲名聲與智慧運籌。坎宮為蓄水養元之地，水火既濟方能成大器。",
    solutionTitle: "一白貪狼催旺指南：",
    solutionDesc: "此方位適宜擺放活水造景、金屬羅盤或白色陶瓷花瓶盛水，有助於商務人脈拓展與學業仕途步步高升。"
  },
  northeast: {
    title: "東北方（艮宮 · 八白左輔田宅財星）",
    desc: "艮宮屬土，主田宅、不動產基業與穩定積累。雖然進入九運，八白退居輔佐地位，但依然具備厚重之財庫底氣。",
    solutionTitle: "艮宮蓄財安泰指南：",
    solutionDesc: "宜保持沉穩，可擺放陶瓷茶器、玉石擺件或聚寶盆，有助於守護既有財產基業，防止意外資金耗損。"
  },
  southeast: {
    title: "東南方（巽宮 · 二黑病符星化解處）",
    desc: "二黑巨門屬土，在當前流年中易招致家人健康微恙或腸胃不適。風水法則講究『凶星宜化不宜克』，切忌動土動工或大肆裝修。",
    solutionTitle: "二黑煞氣化解指南：",
    solutionDesc: "懸掛純銅開光葫蘆或六帝錢一串，以五行『土生金』之理洩去二黑凶土之氣，化煞為祥，守護全家身心健康。"
  },
  northwest: {
    title: "西北方（乾宮 · 六白武曲偏財乾位）",
    desc: "乾宮代表父親、企業掌舵人與權力象徵。六白武曲星主管偏財、意外收穫與果斷決策力，是商務高管的核心守護宮位。",
    solutionTitle: "乾位權力與偏財加持：",
    solutionDesc: "擺放金屬龍龜、黃銅印章或泰山石敢當，加強領導威望，避開小人是非阻隔，迎納四方暗財。"
  }
};

function initFengShuiTabs() {
  const tabs = document.querySelectorAll('.fs-tab-btn');
  const titleEl = document.getElementById('fsDetailTitle');
  const descEl = document.getElementById('fsDetailDesc');
  const solTitleEl = document.getElementById('fsSolutionTitle');
  const solDescEl = document.getElementById('fsSolutionDesc');

  if (!tabs.length || !titleEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const dirKey = tab.getAttribute('data-dir');
      const data = fengshuiDirections[dirKey] || fengshuiDirections.south;

      titleEl.innerText = data.title;
      descEl.innerText = data.desc;
      solTitleEl.innerText = data.solutionTitle;
      solDescEl.innerText = data.solutionDesc;
    });
  });
}

/* ==========================================================================
   3. 五行能量即時平衡測算 (Wu Xing Quick Calculator)
   ========================================================================== */
function initWuXingCalculator() {
  const calcBtn = document.getElementById('btnCalcWuxing');
  const baziYear = document.getElementById('baziYear');
  const baziMonth = document.getElementById('baziMonth');

  if (!calcBtn) return;

  calcBtn.addEventListener('click', () => {
    const year = parseInt(baziYear.value) || 1990;
    const month = parseInt(baziMonth.value) || 1;

    // Deterministic algorithmic mock based on astronomical stems
    const seed = (year * 12 + month) % 100;
    const metal = 15 + (seed % 18);
    const wood = 18 + ((seed * 3) % 22);
    const water = 20 + ((seed * 7) % 20);
    const fire = 22 + ((seed * 5) % 24);
    const earth = 100 - (metal + wood + water + fire);

    document.getElementById('valMetal').innerText = `${metal}%`;
    document.getElementById('valWood').innerText = `${wood}%`;
    document.getElementById('valWater').innerText = `${water}%`;
    document.getElementById('valFire').innerText = `${fire}%`;
    document.getElementById('valEarth').innerText = `${earth}%`;

    const summaryEl = document.getElementById('wuxingSummary');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <strong>命盤初步五行測算完成：</strong><br>
        您的命盤氣場中<strong>${fire > 25 ? '火氣充盈' : wood > 25 ? '木旺生發' : '金水相生'}</strong>，
        五行喜用平衡建議為加強<strong>${water < 18 ? '水元素（智慧流動）' : metal < 18 ? '金元素（決斷收斂）' : '土元素（穩固生息）'}</strong>。
        建議在 SeerQ App 連結專屬導師進行八字大運深層排盤。
      `;
    }
  });
}

/* ==========================================================================
   4. 預約諮詢表單互動 (Booking Consultation Form)
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const feedback = document.getElementById('formFeedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookName').value.trim();
    const phone = document.getElementById('bookPhone').value.trim();
    const service = document.getElementById('bookService').value;

    if (!name || !phone) {
      alert("請填寫您的稱呼與聯絡電話！");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerText = "預約傳送中...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerText = "確認預約諮詢";
      submitBtn.disabled = false;

      feedback.innerHTML = `
        ✓ 預約成功！尊敬的 <strong>${name}</strong>，您選擇的項目【${service}】已轉交 SeerQ 先知命局服務團隊。
        我們的資深導師將在 24 小時內通過電話/WhatsApp 與您確認私密諮詢時段。
      `;
      feedback.className = "form-feedback success";
      feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.reset();
    }, 700);
  });
}

/* ==========================================================================
   5. 常見問答 FAQ 手風琴 (Accordion)
   ========================================================================== */
function initFAQAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   6. 行動端選單切換 (Mobile Navigation)
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  });
}

/* ==========================================================================
   7. 數字遞增動畫 (Stats Counter)
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target')) || 0;
          let count = 0;
          const speed = 25;
          const increment = Math.ceil(target / 40);

          const update = () => {
            count += increment;
            if (count > target) count = target;
            counter.innerText = count.toLocaleString() + (counter.getAttribute('data-suffix') || '');
            if (count < target) {
              setTimeout(update, speed);
            }
          };
          update();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}
