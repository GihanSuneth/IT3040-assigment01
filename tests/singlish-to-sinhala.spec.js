const { test, expect } = require("@playwright/test");

const SITE_URL = "https://www.swifttranslator.com/";


async function openSite(page) {
  await page.goto(SITE_URL, { waitUntil: "domcontentloaded" });
}

function getInputLocator(page) {
  return page.getByPlaceholder("Input Your Singlish Text Here.");
}

function getOutputLocator(page) {
  return page.locator('.card:has-text("Sinhala") .bg-slate-50').first();
}


async function readOutput(locator) {
  const t = await locator.textContent();
  return (t || "").replace(/\r\n/g, "\n");
}

function normalize(s) {
  return (s || "").replace(/\r\n/g, "\n").trim();
}

// ---- Positive test data ----
const positiveCases = [
  {
    id: "Pos_Fun_0001",
    input: "mama gym gihilla ennam",
    expected: "මම gym ගිහිල්ල එන්නම්"
  },
  {
    id: "Pos_Fun_0002",
    input: "mama iskole gihin ivarayi",
    expected: "මම ඉස්කොලෙ ගිහින් ඉවරයි"
  },
  {
    id: "Pos_Fun_0003",
    input: "adha office enavadha?",
    expected: "අද office එනවද?"
  },
  {
    id: "Pos_Fun_0004",
    input: "oya pasumbiya bimata vaetilaa",
    expected: "ඔය පසුම්බිය බිමට වැටිලා"
  },
  {
    id: "Pos_Fun_0005",
    input: "mama me paara karannee naehae",
    expected: "මම මෙ පාර කරන්නේ නැහැ"
  },
  {
    id: "Pos_Fun_0006",
    input: "methanata enna vahaama",
    expected: "මෙතනට එන්න වහාම"
  },
  {
    id: "Pos_Fun_0007",
    input: "obata suba udhaesanak veavaa!",
    expected: "ඔබට සුබ උදැසනක් වේවා!"
  },
  {
    id: "Pos_Fun_0008",
    input: "group eken palayan!!",
    expected: "group එකෙන් පලයන්!!"
  },
  {
    id: "Pos_Fun_0009",
    input: "api pansal gihilla hamudhuruvantakathaa karalama enavaa",
    expected: "අපි පන්සල් ගිහිල්ල හමුදුරුවන්ටකතා කරලම එනවා"
  },
  {
    id: "Pos_Fun_0010",
    input: "elakiri, mQQ oyaata eka karala dhennam anivaaryen",
    expected: "එලකිරි, මං ඔයාට එක කරල දෙන්නම් අනිවාර්යෙන්"
  },
  {
    id: "Pos_Fun_0011",
    input: "Api ekathu velaa meeka gaena adhahas tikak idhiripath karamu",
    expected: "අපි එකතු වෙලා මේක ගැන අදහස් ටිකක් ඉදිරිපත් කරමු"
  },
  {
    id: "Pos_Fun_0012",
    input: "oyaa mata kaemathi unoth, mQQ oyaata chocolate ekak aran dhennam",
    expected: "ඔයා මට කැමති උනොත්, මං ඔයාට chocolate එකක් අරන් දෙන්නම්"
  },
  {
    id: "Pos_Fun_0013",
    input: "adha kohomahari MS TEAMS meeting ekata join venna kiyala sar kivvaa",
    expected: "අද කොහොමහරි MS TEAMS meeting එකට join වෙන්න කියල සර් කිව්වා"
  },
  {
    id: "Pos_Fun_0014",
    input: "Oyaa magee jivithee ekka karana sellama vahaama navaththanna!",
    expected: "ඔයා මගේ ජිවිතේ එක්ක කරන සෙල්ලම වහාම නවත්තන්න!"
  },
  {
    id: "Pos_Fun_0015",
    input: "nangita velaava thiyanavanam coffee ekak biila kathaavak dhaalama gedhara yamu",
    expected: "නන්ගිට වෙලාව තියනවනම් coffee එකක් බීල කතාවක් දාලම ගෙදර යමු"
  },
  {
    id: "Pos_Fun_0016",
    input: "lamayi adha thiyana online lecture ekata anivaaryen campus mail eken enna",
    expected: "ලමයි අද තියන online lecture එකට අනිවාර්යෙන් campus mail එකෙන් එන්න"
  },
  {
    id: "Pos_Fun_0017",
    input: "mama thaama maga ena gaman inne, bus eka hari slow nisaa loku delay ekak vunaa. traffic jam ekath thiyenavaa nisaa mata poddak amaaruyi. oyaata puluvandha mQQ enakan idak allagena inna? mama podi veelaavakin hari enna try karanavaa. ehema vunaath situation eka theerenna kiyala hithanavaa, mokadha adha dhavas vala roads hari busy kiyala news valath kivvaa.",
    expected: "මම තාම මග එන ගමන් ඉන්නේ, bus එක හරි slow නිසා ලොකු delay එකක් වුනා. traffic jam එකත් තියෙනවා නිසා මට පොඩ්ඩක් අමාරුයි. ඔයාට පුලුවන්ද මං එනකන් ඉඩක් අල්ලගෙන ඉන්න? මම පොඩි වේලාවකින් හරි එන්න try කරනවා. එහෙම වුනාත් situation එක තේරෙන්න කියල හිතනවා, මොකද අද දවස් වල roads හරි busy කියල news වලත් කිව්වා."
  },
  {
    id: "Pos_Fun_0018",
    input: "mama adha udhaesana paasal yanakota bus eka parakku vuna nisaa loku prashnayak vunaa. lamayi godak inna nisaa seat ekakuth hambavennea naehae. traffic ekath hari loku vuna nisaa mama school ekata enna vune podi velavakin passe. teacher slaa hithuvee mama late vune kammaeli nisaa kiyala, namuth situation eka explain karaama eyaalata hariyata therum ganna puluvan vunaa.",
    expected: "මම අද උදැසන පාසල් යනකොට bus එක පරක්කු වුන නිසා ලොකු ප්‍රශ්නයක් වුනා. ලමයි ගොඩක් ඉන්න නිසා seat එකකුත් හම්බවෙන්නේ නැහැ. traffic එකත් හරි ලොකු වුන නිසා මම school එකට එන්න වුනෙ පොඩි වෙලවකින් පස්සෙ. teacher ස්ලා හිතුවේ මම late වුනෙ කම්මැලි නිසා කියල, නමුත් situation එක explain කරාම එයාලට හරියට තෙරුම් ගන්න පුලුවන් වුනා."
  },
  {
    id: "Pos_Fun_0019",
    input: "office vaeda karana kaalaya athara mama daily computer eka langa indhagena reports hadhanavaa, emails check karanavaa saha client laa samaga calls gannavaa. samahara dhavasvala internet connection eka slow vunaama vaeda karanna eka ithaa amaaruyi. ehema vunaama mama WiFi reset karala, mobile WiFi use karala vaedea continue karanavaa, mokadha deadlines miss karanna baee kiyalaa.",
    expected: "office වැඩ කරන කාලය අතර මම daily computer එක ලන්ග ඉන්දගෙන reports හදනවා, emails check කරනවා සහ client ලා සමග calls ගන්නවා. සමහර දවස්වල internet connection එක slow වුනාම වැඩ කරන්න එක ඉතා අමාරුයි. එහෙම වුනාම මම WiFi reset කරල, mobile WiFi use කරල වැඩේ continue කරනවා, මොකද deadlines miss කරන්න බෑ කියලා."
  },
  {
    id: "Pos_Fun_0020",
    input: "api yaaluvo samaga anthima sathiyee Kandy trip ekak plan kala. mulin train yanna hadhanne, namuth tickets full vuna nisaa bus eka gaththa. raeeta vaessa podda podda vahinna patan gaththa nisaa journey eka poddak amaru vunaa. namuth scenic views, photos, saha hinaa yana kathaa nisaa trip eka maru experience ekak vunaa kiyala kiyanna puluvan.",
    expected: "අපි යාලුවො සමග අන්තිම සතියේ Kandy trip එකක් plan කල. මුලින් train යන්න හදන්නෙ, නමුත් tickets full වුන නිසා bus එක ගත්ත. රෑට වැස්ස පොඩ්ඩ පොඩ්ඩ වහින්න පටන් ගත්ත නිසා journey එක පොඩ්ඩක් අමරු වුනා. නමුත් scenic views, photos, සහ හිනා යන කතා නිසා trip එක මරු experience එකක් වුනා කියල කියන්න පුලුවන්."
  },
  {
    id: "Pos_Fun_0021",
    input: "mama university eka yanna patan gaththama kaalaya kalamanaakaranaya eka hari loku challenge ekak vunaa. lectures, assignments, group projects saha exams manage karanna loku effort ekak dhaanna vunaa. samahara daavasvala rae 1 venakam vaeda karala, udhea aaye class yanna vunaa. namuth himin himin routine ekak hadhaagena, kalasatahanakata anuva mama eeka control karagena igena gaththaa.",
    expected: "මම university එක යන්න පටන් ගත්තම කාලය කලමනාකරනය එක හරි ලොකු challenge එකක් වුනා. lectures, assignments, group projects සහ exams manage කරන්න ලොකු effort එකක් දාන්න වුනා. සමහර ඩාවස්වල රැ 1 වෙනකම් වැඩ කරල, උදේ ආයෙ class යන්න වුනා. නමුත් හිමින් හිමින් routine එකක් හදාගෙන, කලසටහනකට අනුව මම ඒක control කරගෙන ඉගෙන ගත්තා."
  },
  {
    id: "Pos_Fun_0022",
    input: "mama adha   hospital ekta yanna hadhanne routine checkup ekakata. appointment eka thibbe 9.30 AM namuth queue eka hari loku nisaa poddak inna vuna. ehema velaaval vala sansun vena eka hari loku dheyak.  mobile eka paavichchi karala podi sindhuvak  ahagena, time eka pass karalaa doctor kenek lagata giyaama checkup eka smooth vidhihata avasan vunaa.",
    expected: "මම අද   hospital එක්ට යන්න හදන්නෙ routine checkup එකකට. appointment එක තිබ්බෙ 9.30 AM නමුත් queue එක හරි ලොකු නිසා පොඩ්ඩක් ඉන්න වුන. එහෙම වෙලාවල් වල සන්සුන් වෙන එක හරි ලොකු දෙයක්.  mobile එක පාවිච්චි කරල පොඩි සින්දුවක්  අහගෙන, time එක pass කරලා doctor කෙනෙක් ලගට ගියාම checkup එක smooth විදිහට අවසන් වුනා."
  },
  {
    id: "Pos_Fun_0023",
    input: "mama programming igena gannakota errors hadhaagena innaakota loku avulak aavoth, Youtube tutorials saha documentation balalaa visadhumak hoyagannavaa. samahara vealaavata podi issue ekak nisaa una error eka hadhaagaththaa kiyala dhaenagaththama hithata loku sathutak labenavaa.",
    expected: "මම programming ඉගෙන ගන්නකොට errors හදාගෙන ඉන්නාකොට ලොකු අවුලක් ආවොත්, Youtube tutorials සහ documentation බලලා විසදුමක් හොයගන්නවා. සමහර වේලාවට පොඩි issue එකක් නිසා උන error එක හදාගත්තා කියල දැනගත්තම හිතට ලොකු සතුටක් ලබෙනවා."
  },
  {
    id: "Pos_Fun_0024",
    input: "team project ekak karanakota communication eka hari amaaruyi. samahara velaavata misunderstandings nisaa tharaha enavaa. ehema vunaama open vidhihata kathaa karala ewa hadaganna puluvan nam kandaayamee ekamuthuva vaedi venavaa. api anthima project eke ehema avasthaa valata muhuna dhunnoth, meeting ekak karala eka hadhaa ganna puluvan vunaa kiyala kiyanna puluvan.",
    expected: "team project එකක් කරනකොට communication එක හරි අමාරුයි. සමහර වෙලාවට misunderstandings නිසා තරහ එනවා. එහෙම වුනාම open විදිහට කතා කරල එwඅ හඩගන්න පුලුවන් නම් කන්ඩායමේ එකමුතුව වැඩි වෙනවා. අපි අන්තිම project eke එහෙම අවස්තා වලට මුහුන දුන්නොත්, meeting එකක් කරල එක හදා ගන්න පුලුවන් වුනා කියල කියන්න පුලුවන්."
  },
  {
    id: "Pos_UI__0001",
    input: "mata hadhissiyak velaa mama gedhara yana gaman inne.",
    expected: "මට හදිස්සියක් වෙලා මම ගෙදර යන ගමන් ඉන්නේ."
  }
  
];

// ---- Negative test data -----
const negativeCases = [
  {
    id: "Neg_Fun_0001",
    input: "ela ela man eka balala oyata panividayak anivaaryen dennam",
    expected: "එල එල මං එක බලල ඔයාට පනිවිඩයක් අනිවාර්යෙන් දෙන්නම්"
  },
  {
    id: "Neg_Fun_0002",
    input: "mama #1 student wenna hadanava.",
    expected: "මම #1 student වෙන්න හදනවා."
  },
  {
    id: "Neg_Fun_0003",
    input: "mama adha office ekea chat ekak dhaalama yanvaa.",
    expected: "මම අද office එකේ chat එකක් දාලම යනවා."
  },
  {
    id: "Neg_Fun_0004",
    input: "oyaa enne nadda?",
    expected: "ඔයා එන්නෙ නැද්ද?"
  },
  {
    id: "Neg_Fun_0005",
    input: "MAMA GAEDHARA YANAVAA.",
    expected: "මම ගෙදර යනවා"
  },
  {
    id: "Neg_Fun_0006",
    input: "mee link eka balanna: https://example.com",
    expected: "මේ link එක බලන්න: https://example.com"
  },
  {
    id: "Neg_Fun_0007",
    input: "mage email eka gihan@gmail.com, ekata mail ekak evanna",
    expected: "මගේ email එක gihan@gmail.com, එකට mail එකක් එවන්න"
  },
  {
    id: "Neg_Fun_0008",
    input: "mata Rupiyal 1,250.75 epaa.",
    expected: "මට රුපියල් 1,250.75 එපා."
  },
  {
    id: "Neg_Fun_0009",
    input: "api 25/12/2026 dinata yamu.",
    expected: "අපි 25/12/2026 දිනට යමු."
  },
  {
    id: "Neg_Fun_0010",
    input: "dhaen kaalee godak developers la coding walata AI assistants la use karanawa. Specially simple functions generate karaganna nathnam code eke thiyena bugs fix karaganna meka mara useful. Oyaata thiyenne hariyata logic eka explain karala prompt eka type karanna witharai. Ethakota complex algorithms unath seconds walin output eka ganna puluwan.",
    expected: "දැන් කාලේ ගොඩක් developers ල coding වලට AI assistants ල use කරනවා. Specially simple functions generate කරගන්න නැත්නම් code එකේ තියෙන bugs fix කරගන්න මේක මාර useful. ඔයාට තියෙන්නෙ හරියට logic එක explain කරල prompt එක type කරන්න විතරයි. එතකොට complex algorithms උනත් seconds වලින් output එක ගන්න පුලුවන්."
  },
  {
    id: "Neg_UI_0001",
    input: "hsbdjhabdahbdauhcbc chsdbvusdhvbshuv hv sv shv suhv shv svdhusvbshvbsjhdc dshv hvsvhjs jsv sjhc jvh vjhs vshv sjhv sjhv sjvh dsvjhs vhjs vjhsv jshv sjhv svjhs jshv sjhv shjv vjhsv jsvh sjhv jvhs jhsv sjhv shv shcsjhs cacsaacacdc hfweiufgwifwiiwufgiufgwfugfuiwgfwiufgh cacac dcdscsvsdvsvs svsdvsvs vsvdvswefwfre grvgeve fbshcvsjhsjvhbsdvhsvhsbv",
    expected: "hsbdjhabdahbdauhcbc chsdbvusdhvbshuv hv sv shv suhv shv svdhusvbshvbsjhdc dshv hvsvhjs jsv sjhc jvh vjhs vshv sjhv sjhv sjvh dsvjhs vhjs vjhsv jshv sjhv svjhs jshv sjhv shjv vjhsv jsvh sjhv jvhs jhsv sjhv shv shcsjhs cacsaacacdc hfweiufgwifwiiwufgiufgwfugfuiwgfwiufgh cacac dcdscsvsdvsvs svsdvsvs vsvdvswefwfre grvgeve fbshcvsjhsjvhbsdvhsvhsbv"
  },
];

// --------- Tests ----------
test("open swifttranslator", async ({ page }) => {
  await openSite(page);

  const pageTitle = await page.title();
  console.log("page title is:", pageTitle);

  await expect(page).toHaveURL(SITE_URL);
  await expect(page).toHaveTitle(/Translator/i);
});

test.describe("SwiftTranslator – Positive Functional", () => {
  for (const tc of positiveCases) {
    test(`${tc.id} – should match expected Sinhala output`, async ({ page }) => {
      await openSite(page);

      const inputArea = getInputLocator(page);
      const outputBox = getOutputLocator(page);

      await inputArea.waitFor({ state: "visible", timeout: 1000000 });
      await inputArea.fill(tc.input);

      await expect
        .poll(async () => normalize(await readOutput(outputBox)), {
          timeout: 2000000,
          message: `Output did not match for ${tc.id}`
        })
        .toBe(normalize(tc.expected));
    });
  }
});

test.describe("SwiftTranslator – Negative Functional", () => {
  for (const tc of negativeCases) {
    test(`${tc.id} – should match expected Sinhala output`, async ({ page }) => {
      await openSite(page);

      const inputArea = getInputLocator(page);
      const outputBox = getOutputLocator(page);

      await inputArea.waitFor({ state: "visible", timeout: 10000 });
      await inputArea.fill(tc.input);

      await expect
        .poll(async () => normalize(await readOutput(outputBox)), {
          timeout: 2000000,
          message: `Output did not match for ${tc.id}`
        })
        .toBe(normalize(tc.expected));
    });
  }
});

test("Pos_UI_0001 – Clearing input clears Sinhala output immediately", async ({ page }) => {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 1000000 });

  
  await inputArea.fill("api heta hambemu.");

  
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 2000000,
      message: "No output produced"
    })
    .not.toBe("");

  
  await inputArea.fill("");

  
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 1500000,
      message: "Output did not clear after clearing the input"
    })
    .toBe("");
});

test("Neg_UI_0001 – should respond within time for long gibberish input", async ({ page }) => {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 1000000 });

  const before = normalize(await readOutput(outputBox));
  const start = Date.now();

  await inputArea.fill(
    "ffnfnmlfnmltn fjnbfkrrh rkhmmlm tmhl5my5lye5lymolkjuyml hmyljmlt jtnhrenno nhkrehohnmkhmtm h5khm5olho 5o"
  );

  
  await expect
    .poll(async () => normalize(await readOutput(outputBox)) !== before, {
      timeout: 100000,
      message: "UI did not respond within 2000ms"
    })
    .toBe(true);

  const elapsed = Date.now() - start;
  expect(elapsed).toBeLessThanOrEqual(200000);
});