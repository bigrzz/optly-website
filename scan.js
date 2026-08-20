const DATA_LABEL = {
  address: "Home address",
  phone: "Phone number",
  email: "Email",
  relatives: "Relatives",
  age: "Age / DOB",
  employer: "Employer",
};

const CATEGORY_LABEL = {
  people_search: "People search",
  background: "Background",
  b2b: "B2B",
};

const US_STATES = [
  ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],
  ["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["DC","District of Columbia"],
  ["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],
  ["IN","Indiana"],["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],
  ["ME","Maine"],["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],
  ["MS","Mississippi"],["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],
  ["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],["NY","New York"],
  ["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],
  ["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],["SD","South Dakota"],
  ["TN","Tennessee"],["TX","Texas"],["UT","Utah"],["VT","Vermont"],["VA","Virginia"],
  ["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"],
];

const BROKERS = [
  { slug: "spokeo", name: "Spokeo", domain: "spokeo.com", category: "people_search", wave: 1, optOutUrl: "https://www.spokeo.com/optout", typicalData: ["address","phone","relatives","age"], steps: ["Open the Spokeo opt-out page.","Search for your listing and copy the profile URL.","Submit the URL with a valid email and confirm the message they send."] },
  { slug: "whitepages", name: "Whitepages", domain: "whitepages.com", category: "people_search", wave: 1, optOutUrl: "https://www.whitepages.com/suppression-requests", typicalData: ["address","phone","relatives"], steps: ["Open the Whitepages suppression form.","Enter the listing URL or your name and location.","Verify by email, then wait for the listing to drop."] },
  { slug: "beenverified", name: "BeenVerified", domain: "beenverified.com", category: "background", wave: 2, optOutUrl: "https://www.beenverified.com/faq/opt-out/", typicalData: ["address","phone","relatives","age"], steps: ["Find your BeenVerified profile URL from search results.","Use their opt-out form with that URL.","Confirm via email. Recheck in 7–14 days."] },
  { slug: "intelius", name: "Intelius", domain: "intelius.com", category: "background", wave: 2, optOutUrl: "https://www.intelius.com/opt-out", typicalData: ["address","phone","relatives"], steps: ["Locate the Intelius record URL.","Submit it through the Intelius opt-out page.","Complete email verification."] },
  { slug: "truepeoplesearch", name: "TruePeopleSearch", domain: "truepeoplesearch.com", category: "people_search", wave: 1, optOutUrl: "https://www.truepeoplesearch.com/removal", typicalData: ["address","phone","relatives"], steps: ["Copy the exact profile URL from TruePeopleSearch.","Paste it into their removal form.","Solve the CAPTCHA and submit."] },
  { slug: "fastpeoplesearch", name: "FastPeopleSearch", domain: "fastpeoplesearch.com", category: "people_search", wave: 1, optOutUrl: "https://www.fastpeoplesearch.com/removal", typicalData: ["address","phone","relatives"], steps: ["Open the removal page.","Paste your listing URL.","Submit and confirm. Related sites may need a separate request."] },
  { slug: "radaris", name: "Radaris", domain: "radaris.com", category: "people_search", wave: 1, optOutUrl: "https://radaris.com/page/how-to-remove", typicalData: ["address","phone","relatives","age"], steps: ["Create a Radaris account if required.","Claim or locate your profile.","Follow their removal instructions and confirm by email."] },
  { slug: "thatsthem", name: "That's Them", domain: "thatsthem.com", category: "people_search", wave: 1, optOutUrl: "https://thatsthem.com/optout", typicalData: ["address","phone","email"], steps: ["Open the That's Them opt-out form.","Enter the record URL or identifying details.","Submit and keep the confirmation."] },
  { slug: "instantcheckmate", name: "Instant Checkmate", domain: "instantcheckmate.com", category: "background", wave: 2, optOutUrl: "https://www.instantcheckmate.com/opt-out/", typicalData: ["address","phone","relatives","age"], steps: ["Find the report URL associated with your name.","Submit it on Instant Checkmate’s opt-out page.","Verify the request by email."] },
  { slug: "peoplesmart", name: "PeopleSmart", domain: "peoplesmart.com", category: "people_search", wave: 1, optOutUrl: "https://www.peoplesmart.com/optout-go", typicalData: ["address","phone","relatives"], steps: ["Search for your PeopleSmart listing.","Use the opt-out form with the profile URL.","Confirm via email."] },
  { slug: "familytreenow", name: "FamilyTreeNow", domain: "familytreenow.com", category: "people_search", wave: 1, optOutUrl: "https://www.familytreenow.com/optout", typicalData: ["address","relatives","age"], steps: ["Open the FamilyTreeNow opt-out page.","Provide the profile URL.","Complete any verification they request."] },
  { slug: "mylife", name: "MyLife", domain: "mylife.com", category: "people_search", wave: 2, optOutUrl: "https://www.mylife.com/privacy-policy", typicalData: ["address","phone","age","relatives"], steps: ["Use MyLife’s privacy / CCPA request path.","Identify the reputation report tied to your name.","Request deletion and keep written confirmation."] },
  { slug: "nuwber", name: "Nuwber", domain: "nuwber.com", category: "people_search", wave: 1, optOutUrl: "https://nuwber.com/removal/link", typicalData: ["address","phone","email"], steps: ["Copy the Nuwber profile URL.","Paste it into their removal form.","Confirm the email they send."] },
  { slug: "clustrmaps", name: "ClustrMaps", domain: "clustrmaps.com", category: "people_search", wave: 1, optOutUrl: "https://clustrmaps.com/blurb/opt-out", typicalData: ["address"], steps: ["Open the ClustrMaps opt-out instructions.","Submit the property or person page URL.","Wait for the map pin / listing to clear."] },
  { slug: "cyberbackgroundchecks", name: "CyberBackgroundChecks", domain: "cyberbackgroundchecks.com", category: "people_search", wave: 1, optOutUrl: "https://www.cyberbackgroundchecks.com/removal", typicalData: ["address","phone","relatives"], steps: ["Copy your listing URL.","Submit it on the removal page.","Solve the CAPTCHA and confirm."] },
  { slug: "searchpeoplefree", name: "SearchPeopleFree", domain: "searchpeoplefree.com", category: "people_search", wave: 1, optOutUrl: "https://www.searchpeoplefree.com/opt-out", typicalData: ["address","phone"], steps: ["Open the opt-out page.","Provide the record URL.","Submit and recheck in a few days."] },
  { slug: "fastbackgroundcheck", name: "FastBackgroundCheck", domain: "fastbackgroundcheck.com", category: "background", wave: 1, optOutUrl: "https://www.fastbackgroundcheck.com/optout", typicalData: ["address","phone","relatives"], steps: ["Locate the background-check profile URL.","Submit it via their opt-out form.","Confirm by email if prompted."] },
  { slug: "peekyou", name: "PeekYou", domain: "peekyou.com", category: "people_search", wave: 2, optOutUrl: "https://www.peekyou.com/about/contact", typicalData: ["address","email","relatives"], steps: ["Use PeekYou’s contact / privacy request.","Include the profile URL and a removal request.","Follow any identity confirmation they send."] },
  { slug: "zabasearch", name: "ZabaSearch", domain: "zabasearch.com", category: "people_search", wave: 2, optOutUrl: "https://www.zabasearch.com/opt_out.php", typicalData: ["address","phone"], steps: ["Open the ZabaSearch opt-out form.","Identify your record as specifically as possible.","Submit and retain the confirmation."] },
  { slug: "ussearch", name: "US Search", domain: "ussearch.com", category: "background", wave: 2, optOutUrl: "https://www.ussearch.com/opt-out/", typicalData: ["address","phone","relatives"], steps: ["Find the US Search record.","Submit an opt-out with the listing details.","Complete verification."] },
  { slug: "checkpeople", name: "CheckPeople", domain: "checkpeople.com", category: "background", wave: 2, optOutUrl: "https://www.checkpeople.com/opt-out", typicalData: ["address","phone","age"], steps: ["Open CheckPeople’s opt-out page.","Provide the report URL.","Verify the request by email."] },
  { slug: "addresses", name: "Addresses.com", domain: "addresses.com", category: "people_search", wave: 1, optOutUrl: "https://www.addresses.com/optout", typicalData: ["address","phone"], steps: ["Copy the Addresses.com listing URL.","Paste it into the opt-out form.","Submit and confirm."] },
  { slug: "zoominfo", name: "ZoomInfo", domain: "zoominfo.com", category: "b2b", wave: 3, optOutUrl: "https://www.zoominfo.com/just-in-time-form", typicalData: ["email","employer","phone"], steps: ["Use ZoomInfo’s privacy / just-in-time form.","Request deletion of the business profile tied to your name.","B2B records can take longer than people-search sites."] },
  { slug: "rocketreach", name: "RocketReach", domain: "rocketreach.co", category: "b2b", wave: 3, optOutUrl: "https://rocketreach.co/privacy", typicalData: ["email","employer","phone"], steps: ["Open RocketReach privacy controls.","Submit a data-deletion request for your professional listing.","Confirm by email."] },
  { slug: "anywho", name: "AnyWho", domain: "anywho.com", category: "people_search", wave: 1, optOutUrl: "https://www.anywho.com/help/privacy", typicalData: ["address","phone"], steps: ["Locate the AnyWho directory listing.","Use their privacy help path to request suppression.","Keep a copy of the request."] },
  { slug: "spytox", name: "Spytox", domain: "spytox.com", category: "people_search", wave: 1, optOutUrl: "https://spytox.com/optout", typicalData: ["address","phone","relatives"], steps: ["Copy the Spytox profile URL.","Submit it on their opt-out page.","Confirm if they send a verification email."] },
];

function hash32(input) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function getBroker(slug) {
  return BROKERS.find((b) => b.slug === slug);
}

function runExposureScan({ fullName, city, state }) {
  const name = fullName.trim().replace(/\s+/g, " ");
  const c = (city || "").trim();
  const s = (state || "").trim().toUpperCase();
  const rand = mulberry32(hash32(`${name.toLowerCase()}|${c.toLowerCase()}|${s}`));
  const hits = [];
  for (const broker of BROKERS) {
    const threshold = broker.wave === 1 ? 0.28 : broker.wave === 2 ? 0.42 : 0.55;
    const roll = rand();
    if (roll < threshold) continue;
    const dataTypes = broker.typicalData.filter(() => rand() > 0.32);
    hits.push({
      broker,
      dataTypes: dataTypes.length ? dataTypes : [broker.typicalData[0]],
      confidence: roll > 0.72 ? "likely" : "possible",
    });
  }
  hits.sort((a, b) => a.broker.name.localeCompare(b.broker.name));
  const riskLevel = hits.length >= 12 ? "high" : hits.length >= 7 ? "medium" : "low";
  return { fullName: name, city: c, state: s, hits, riskLevel, scannedCount: BROKERS.length };
}
