import { useState, useEffect, useRef, useCallback } from "react";
import { SpeedInsights } from '@vercel/speed-insights/react';

/* ══════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════ */
const T = {
  en: {
    dir: "ltr",
    font: "'Plus Jakarta Sans', sans-serif",
    appName: "movo",

    // Hero
    heroTitle1: "Spare seat?",
    heroTitle2: "Share the ride.",
    heroSub: "Movo connects people who have spare seats with people who need a ride. No taxi. No payments through the app. Just real people, sharing journeys.",
    launchBadge: "🇪🇬 Now live in Egypt",
    freeBadge: "Free for 3 months",

    // Free promo
    freeBannerTitle: "🎉 Completely free for 3 months",
    freeBannerSub: "Sign up now — no subscription, no fees, no payments.",

    // Search
    findSeat: "Find a spare seat",
    from: "From", to: "To",
    date: "Date", seats: "Seats",
    searchBtn: "Search →",
    noResults: "No trips found. Try a different route.",

    // Offer
    offerSeat: "Offer your spare seat",
    offerSubtitle: "Going somewhere? Offer your spare seats and split the fuel cost with fellow travellers.",
    offerBtn: "Offer a spare seat",
    departure: "Departure",
    destination: "Destination",
    suggestedCost: "Suggested cost share (EGP)",
    seatsAvail: "Seats available",
    tripDate: "Date", tripTime: "Time",
    yourNote: "Add a note (optional)",
    notePlaceholder: "e.g. I drive every Tuesday to work, happy to share costs!",
    publishBtn: "✓ Publish my offer",
    offerLive: "Your offer is live!",
    offerLiveSub: "People can now find your trip and contact you to arrange sharing.",
    offerAnother: "Offer another trip",

    // Trip card
    viewTrip: "View trip",
    seatLeft: (n) => `${n} seat${n !== 1 ? "s" : ""} left`,
    full: "Full",
    moneyNote: "💬 Cost sharing arranged directly between travellers",

    // Trip detail
    aboutTrip: "About this trip",
    aboutOfferer: "About the seat offerer",
    messageOfferer: "Message",
    requestSeat: "Request a seat",
    seatRequested: "✓ Request sent!",
    seatRequestedSub: "The seat offerer will message you to confirm and arrange costs.",

    // Not taxi
    notTaxiTitle: "Not a taxi service",
    notTaxiText: "Movo is a free platform connecting travellers. Seat offerers are private individuals sharing their own journeys. Money is arranged directly — not through the app.",

    // How it works
    howTitle: "How Movo works",
    step1T: "Sign up free", step1D: "Create your free account. No fees for the first 3 months.",
    step2T: "Find or offer a seat", step2D: "Search for someone making your journey, or offer your spare seats.",
    step3T: "Message & arrange", step3D: "Chat directly in the app to confirm the trip and agree on cost sharing.",
    step4T: "Share the journey", step4D: "Meet your fellow traveller and share the road. Money handled between you.",

    // Stats
    stat1: "Members", stat2: "Trips shared", stat3: "Countries",

    // Auth
    loginTitle: "Welcome back",
    signupTitle: "Join Movo free",
    emailLabel: "Email address",
    passLabel: "Password",
    nameLabel: "Full name",
    loginBtn: "Log in →",
    signupBtn: "Create free account →",
    switchToSignup: "No account? Sign up free",
    switchToLogin: "Already a member? Log in",
    freeFor3: "Free for 3 months — no credit card needed",
    agreeTerms: "By signing up you agree to our Terms & Conditions.",
    findSeatRole: "🙋 I need a seat",
    offerSeatRole: "🚗 I have spare seats",

    // My trips
    myTripsTitle: "My trips",
    bookedSeats: "Seats I've requested",
    myOffers: "My seat offers",
    noBookings: "No trips yet. Search for a seat to get started.",
    noOffers: "No offers yet. Offer your spare seat to get started.",
    status_pending: "Pending",
    status_confirmed: "Confirmed",
    status_completed: "Completed",
    cancelRequest: "Cancel",
    showMap: "Show map",
    hideMap: "Hide map",

    // Messages
    messagesTitle: "Messages",
    searchMsgs: "Search conversations…",
    noMsgs: "No conversations yet. Request a seat to start chatting.",
    typeMsg: "Type a message…",
    send: "Send",
    backBtn: "←",

    // Nav
    navHome: "Home", navSearch: "Find seat", navOffer: "Offer seat",
    navTrips: "My trips", navMessages: "Messages", navLegal: "Legal",
    login: "Log in", signOut: "Sign out",

    // Admin
    adminTitle: "Admin",
    members: "Members", activeTrips: "Active trips",
    pendingID: "Pending ID", revenue: "Revenue",
    freePromoNote: "Free promo active — 3 months from launch",
    stripeNote: "No payments collected through app — members arrange costs directly",

    // Legal
    termsTitle: "Terms & Conditions",
    privacyTitle: "Privacy Policy",
    refundTitle: "Cancellation Policy",
    cookiesTitle: "Cookie Policy",
    terms: "Terms", privacy: "Privacy", refund: "Cancellation", cookies: "Cookies",
    legalUpdated: "Last updated April 2026 · Movo Inc.",

    // Footer
    footerNote: "Movo is a free platform connecting people with spare seats to people who need a ride. We are not a taxi service. Cost sharing is arranged directly between travellers.",
    copyright: "© 2026 Movo Inc. · Egypt 🇪🇬 · Global coming soon",

    // Toast
    toastSignup: "Welcome to Movo! 🎉",
    toastLogin: "Welcome back!",
    toastOffer: "Offer published!",
    toastRequest: "Seat requested! Check your messages.",

    // Map
    mapLoading: "Loading map…",
    routePreview: "Route preview",
    useMyLocation: "Use my location",
  },
  ar: {
    dir: "rtl",
    font: "'Cairo', 'Tajawal', sans-serif",
    appName: "موفو",

    heroTitle1: "لديك مقعد فارغ؟",
    heroTitle2: "شارك الرحلة.",
    heroSub: "موفو يربط الأشخاص الذين لديهم مقاعد فارغة بمن يحتاج رحلة. ليس تاكسي. لا مدفوعات عبر التطبيق. فقط أشخاص حقيقيون يشاركون رحلاتهم.",
    launchBadge: "🇪🇬 متاح الآن في مصر",
    freeBadge: "مجاني 3 أشهر",

    freeBannerTitle: "🎉 مجاني تماماً لمدة 3 أشهر",
    freeBannerSub: "سجّل الآن — بدون اشتراك، بدون رسوم، بدون مدفوعات.",

    findSeat: "ابحث عن مقعد فارغ",
    from: "من", to: "إلى",
    date: "التاريخ", seats: "المقاعد",
    searchBtn: "ابحث ←",
    noResults: "لا توجد رحلات. جرّب مسار مختلف.",

    offerSeat: "اعرض مقعدك الفارغ",
    offerSubtitle: "هل أنت مسافر؟ اعرض مقاعدك الفارغة وشارك تكلفة البنزين مع المسافرين الآخرين.",
    offerBtn: "اعرض مقعداً فارغاً",
    departure: "الانطلاق",
    destination: "الوجهة",
    suggestedCost: "التكلفة المقترحة للمشاركة (جنيه)",
    seatsAvail: "المقاعد المتاحة",
    tripDate: "التاريخ", tripTime: "الوقت",
    yourNote: "أضف ملاحظة (اختياري)",
    notePlaceholder: "مثلاً: أسافر كل ثلاثاء للعمل، سعيد بتقاسم التكاليف!",
    publishBtn: "✓ انشر عرضي",
    offerLive: "عرضك منشور الآن!",
    offerLiveSub: "يمكن للناس الآن رؤية رحلتك والتواصل معك لترتيب المشاركة.",
    offerAnother: "اعرض رحلة أخرى",

    viewTrip: "عرض الرحلة",
    seatLeft: (n) => `${n} مقعد متاح`,
    full: "مكتمل",
    moneyNote: "💬 تكاليف المشاركة تُرتَّب مباشرة بين المسافرين",

    aboutTrip: "عن هذه الرحلة",
    aboutOfferer: "عن صاحب المقعد",
    messageOfferer: "مراسلة",
    requestSeat: "طلب مقعد",
    seatRequested: "✓ تم إرسال الطلب!",
    seatRequestedSub: "سيتواصل معك صاحب المقعد للتأكيد وترتيب التكاليف.",

    notTaxiTitle: "ليس خدمة تاكسي",
    notTaxiText: "موفو منصة مجانية تربط المسافرين. أصحاب المقاعد أفراد عاديون يشاركون رحلاتهم الخاصة. يُرتَّب المال مباشرة بينهم — ليس عبر التطبيق.",

    howTitle: "كيف يعمل موفو",
    step1T: "سجّل مجاناً", step1D: "أنشئ حسابك المجاني. لا رسوم للأشهر الثلاثة الأولى.",
    step2T: "ابحث أو اعرض مقعداً", step2D: "ابحث عن شخص يسافر في مسارك، أو اعرض مقاعدك الفارغة.",
    step3T: "تواصل ورتّب", step3D: "تحدث مباشرة في التطبيق لتأكيد الرحلة والاتفاق على تقاسم التكلفة.",
    step4T: "شارك الرحلة", step4D: "قابل رفيق رحلتك وتشاركا الطريق. المال يُرتَّب بينكما.",

    stat1: "عضو", stat2: "رحلة مشتركة", stat3: "دولة",

    loginTitle: "مرحباً بعودتك",
    signupTitle: "انضم لموفو مجاناً",
    emailLabel: "البريد الإلكتروني",
    passLabel: "كلمة المرور",
    nameLabel: "الاسم الكامل",
    loginBtn: "تسجيل الدخول ←",
    signupBtn: "إنشاء حساب مجاني ←",
    switchToSignup: "ليس لديك حساب؟ سجّل مجاناً",
    switchToLogin: "لديك حساب؟ تسجيل الدخول",
    freeFor3: "مجاني 3 أشهر — لا بطاقة ائتمان",
    agreeTerms: "بالتسجيل توافق على شروط وأحكام الاستخدام.",
    findSeatRole: "🙋 أحتاج مقعداً",
    offerSeatRole: "🚗 لدي مقاعد فارغة",

    myTripsTitle: "رحلاتي",
    bookedSeats: "المقاعد التي طلبتها",
    myOffers: "عروض مقاعدي",
    noBookings: "لا رحلات بعد. ابحث عن مقعد للبدء.",
    noOffers: "لا عروض بعد. اعرض مقعدك للبدء.",
    status_pending: "قيد الانتظار",
    status_confirmed: "مؤكد",
    status_completed: "مكتمل",
    cancelRequest: "إلغاء",
    showMap: "عرض الخريطة",
    hideMap: "إخفاء الخريطة",

    messagesTitle: "الرسائل",
    searchMsgs: "ابحث في المحادثات…",
    noMsgs: "لا توجد محادثات بعد.",
    typeMsg: "اكتب رسالة…",
    send: "إرسال",
    backBtn: "→",

    navHome: "الرئيسية", navSearch: "ابحث", navOffer: "اعرض مقعداً",
    navTrips: "رحلاتي", navMessages: "الرسائل", navLegal: "قانوني",
    login: "تسجيل الدخول", signOut: "خروج",

    adminTitle: "الإدارة",
    members: "أعضاء", activeTrips: "رحلات نشطة",
    pendingID: "تحقق معلق", revenue: "الإيرادات",
    freePromoNote: "العرض المجاني نشط — 3 أشهر من الإطلاق",
    stripeNote: "لا مدفوعات عبر التطبيق — الأعضاء يرتبون المال مباشرة",

    termsTitle: "الشروط والأحكام",
    privacyTitle: "سياسة الخصوصية",
    refundTitle: "سياسة الإلغاء",
    cookiesTitle: "سياسة الكوكيز",
    terms: "الشروط", privacy: "الخصوصية", refund: "الإلغاء", cookies: "الكوكيز",
    legalUpdated: "آخر تحديث أبريل 2026 · موفو",

    footerNote: "موفو منصة مجانية تربط الأشخاص الذين لديهم مقاعد فارغة بمن يحتاج رحلة. نحن لسنا خدمة تاكسي. يُرتَّب تقاسم التكاليف مباشرة بين المسافرين.",
    copyright: "© 2026 موفو · مصر 🇪🇬 · التوسع العالمي قريباً",

    toastSignup: "مرحباً بك في موفو! 🎉",
    toastLogin: "مرحباً بعودتك!",
    toastOffer: "تم نشر العرض!",
    toastRequest: "تم طلب المقعد! تحقق من رسائلك.",

    mapLoading: "جارٍ تحميل الخريطة…",
    routePreview: "معاينة المسار",
    useMyLocation: "استخدم موقعي",
  },
};

/* ══════════════════════════════════════
   DESIGN SYSTEM
══════════════════════════════════════ */
const C = {
  red: "#E8294A", redL: "#FF4D6A", redPale: "#FFF0F3", redBorder: "#FFD6DC",
  orange: "#FF6B35", orangePale: "#FFF4EF",
  bg: "#FAFAF8", white: "#FFFFFF", cream: "#FFF9F5",
  ink: "#18181B", inkM: "#52525B", inkL: "#A1A1AA",
  border: "#E4E4E7", borderW: "#FFD6DC",
  green: "#16A34A", greenPale: "#F0FDF4", greenBorder: "#BBF7D0",
  amber: "#D97706", amberPale: "#FFFBEB", amberBorder: "#FDE68A",
  blue: "#2563EB", bluePale: "#EFF6FF", blueBorder: "#BFDBFE",
  purple: "#7C3AED", purplePale: "#F5F3FF", purpleBorder: "#DDD6FE",
  shadow: "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)",
  shadowM: "0 4px 24px rgba(232,41,74,.12)",
  shadowL: "0 12px 48px rgba(232,41,74,.18)",
};
const G = `linear-gradient(135deg, ${C.red}, ${C.orange})`;
const GP = `linear-gradient(135deg, ${C.redPale}, ${C.orangePale})`;

const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
  egypt: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=900&q=80",
  road: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80",
  car: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80",
  desert: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80",
  sunrise: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80",
  d1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  d2: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  d3: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  d4: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
};

const TRIPS_DATA = [
  { id: "t1", from: "Cairo", fromAr: "القاهرة", to: "Alexandria", toAr: "الإسكندرية", fromLL: [30.0444, 31.2357], toLL: [31.2001, 29.9187], time: "07:30", date: "Tue 22 Apr", cost: 120, seats: 2, name: "Yasmine A.", nameAr: "ياسمين أ.", rating: 4.9, photo: PHOTOS.d2, note: "I drive every Tuesday for work — happy to split fuel costs!", noteAr: "أسافر كل ثلاثاء للعمل — سعيدة بتقاسم تكاليف البنزين!" },
  { id: "t2", from: "Giza", fromAr: "الجيزة", to: "Luxor", toAr: "الأقصر", fromLL: [29.9765, 31.1313], toLL: [25.6872, 32.6396], time: "06:00", date: "Tue 22 Apr", cost: 350, seats: 3, name: "Khalid M.", nameAr: "خالد م.", rating: 5.0, photo: PHOTOS.d3, note: "Road trip to Luxor. 3 spare seats — let's split the petrol.", noteAr: "رحلة للأقصر. 3 مقاعد فارغة — نقسّم البنزين." },
  { id: "t3", from: "Cairo", fromAr: "القاهرة", to: "Sharm El Sheikh", toAr: "شرم الشيخ", fromLL: [30.0444, 31.2357], toLL: [27.9158, 34.33], time: "05:30", date: "Wed 23 Apr", cost: 280, seats: 2, name: "Nour S.", nameAr: "نور س.", rating: 4.8, photo: PHOTOS.d4, note: "Weekend trip to Sharm. 2 spare seats available.", noteAr: "رحلة نهاية الأسبوع إلى شرم. مقعدان متاحان." },
  { id: "t4", from: "Cairo", fromAr: "القاهرة", to: "Hurghada", toAr: "الغردقة", fromLL: [30.0444, 31.2357], toLL: [27.2579, 33.8116], time: "04:30", date: "Thu 24 Apr", cost: 260, seats: 1, name: "Rania H.", nameAr: "رانيا ح.", rating: 4.6, photo: PHOTOS.d2, note: "One spare seat. Cairo to Hurghada — share the fuel.", noteAr: "مقعد واحد فارغ. من القاهرة إلى الغردقة." },
  { id: "t5", from: "Alexandria", fromAr: "الإسكندرية", to: "Marsa Matrouh", toAr: "مرسى مطروح", fromLL: [31.2001, 29.9187], toLL: [31.3543, 27.2373], time: "08:00", date: "Wed 23 Apr", cost: 180, seats: 0, name: "Tarek F.", nameAr: "طارق ف.", rating: 4.7, photo: PHOTOS.d1, note: "", noteAr: "" },
];

const MOCK_CONVS = [
  { id: 1, name: "Yasmine A.", nameAr: "ياسمين أ.", photo: PHOTOS.d2, route: "Cairo → Alexandria", routeAr: "القاهرة → الإسكندرية", unread: 2, time: "10:32", last: "I'll be at Tahrir Square at 7:10 ✓", lastAr: "سأكون في التحرير 7:10 ✓", msgs: [{ me: false, t: "Hi! I saw your seat request. I'll be at Tahrir Square.", tAr: "مرحباً! رأيت طلبك. سأكون في ميدان التحرير.", time: "10:28" }, { me: true, t: "Perfect! I'll be there, wearing a blue cap.", tAr: "ممتاز! سأكون هناك، بكاب أزرق.", time: "10:30" }, { me: false, t: "I'll be at Tahrir Square at 7:10 ✓", tAr: "سأكون في التحرير 7:10 ✓", time: "10:32" }] },
  { id: 2, name: "Khalid M.", nameAr: "خالد م.", photo: PHOTOS.d3, route: "Giza → Luxor", routeAr: "الجيزة → الأقصر", unread: 0, time: "Yesterday", last: "Great, see you at 6am!", lastAr: "رائع، سأراك الساعة 6 صباحاً!", msgs: [{ me: true, t: "Hi Khalid! Is there room for a small bag?", tAr: "مرحباً خالد! هل يوجد مكان لحقيبة صغيرة؟", time: "09:00" }, { me: false, t: "Yes plenty of space in the boot.", tAr: "نعم، مساحة كافية في الصندوق.", time: "09:05" }, { me: false, t: "Great, see you at 6am!", tAr: "رائع، سأراك الساعة 6 صباحاً!", time: "09:10" }] },
];

/* ══════════════════════════════════════
   LEAFLET MAP
══════════════════════════════════════ */
const useLeaflet = () => {
  const [ready, setReady] = useState(!!window.L);
  useEffect(() => {
    if (window.L) { setReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, []);
  return ready;
};

const MapView = ({ fromC, toC, h = 220, center = [26.8, 30.8], zoom = 6 }) => {
  const div = useRef(null); const mapI = useRef(null);
  useEffect(() => {
    if (!window.L || !div.current) return;
    const L = window.L;
    if (mapI.current) { mapI.current.remove(); mapI.current = null; }
    const m = L.map(div.current, { center, zoom, zoomControl: true, attributionControl: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(m);
    mapI.current = m;
    const pin = (coords, col, lbl) => {
      const ic = L.divIcon({ className: "mpin", html: `<div style="width:32px;height:32px;border-radius:50% 50% 50% 0;background:${col};border:3px solid #fff;box-shadow:0 3px 12px rgba(0,0,0,.2);transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);font-size:11px;font-weight:800;color:#fff;">${lbl}</span></div>`, iconSize: [32, 32], iconAnchor: [16, 32] });
      return L.marker(coords, { icon: ic }).addTo(m);
    };
    if (fromC) pin(fromC, C.red, "A");
    if (toC) pin(toC, C.orange, "B");
    if (fromC && toC) { L.polyline([fromC, toC], { color: C.red, weight: 3, opacity: .85, dashArray: "8 6" }).addTo(m); m.fitBounds([fromC, toC], { padding: [40, 40] }); }
    else if (fromC) m.setView(fromC, 11);
    return () => { if (mapI.current) { mapI.current.remove(); mapI.current = null; } };
  }, [fromC, toC, JSON.stringify(center), zoom]);
  return <div ref={div} style={{ height: h, width: "100%", borderRadius: 14 }} />;
};

/* ══════════════════════════════════════
   LOCATION AUTOCOMPLETE INPUT
══════════════════════════════════════ */
const LocInput = ({ label, icon, value, onChange, onSelect, placeholder, dir, t }) => {
  const [sugg, setSugg] = useState([]); const [busy, setBusy] = useState(false); const [open, setOpen] = useState(false); const deb = useRef(null);
  const search = useCallback(async q => {
    if (!q || q.length < 2) { setSugg([]); return; }
    setBusy(true);
    try { const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&accept-language=en`); const d = await r.json(); setSugg(d.map(x => ({ short: x.display_name.split(",").slice(0, 2).join(", "), full: x.display_name, lat: parseFloat(x.lat), lng: parseFloat(x.lon) }))); } catch { setSugg([]); }
    setBusy(false);
  }, []);
  const geo = () => {
    if (!navigator.geolocation) return; setBusy(true);
    navigator.geolocation.getCurrentPosition(async ({ coords: { latitude: lat, longitude: lng } }) => {
      try { const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`); const d = await r.json(); const s = d.display_name.split(",").slice(0, 2).join(", "); onChange(s); onSelect({ name: s, lat, lng }); } catch { }
      setBusy(false);
    }, () => setBusy(false));
  };
  return (
    <div style={{ position: "relative", marginBottom: 12 }}>
      {label && <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: C.inkL, textTransform: "uppercase", marginBottom: 5 }}>{label}</label>}
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", [dir === "rtl" ? "right" : "left"]: 13, top: "50%", transform: "translateY(-50%)", fontSize: 16, zIndex: 1, pointerEvents: "none" }}>{icon}</span>
        <input value={value} onChange={e => { onChange(e.target.value); setOpen(true); clearTimeout(deb.current); deb.current = setTimeout(() => search(e.target.value), 380); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 160)} placeholder={placeholder}
          style={{ width: "100%", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 11, padding: "11px 40px 11px 40px", fontSize: 14, color: C.ink, transition: "border-color .18s", fontFamily: "inherit" }}
          onFocus2={e => e.target.style.borderColor = C.red} />
        <button onClick={geo} title={t.useMyLocation} style={{ position: "absolute", [dir === "rtl" ? "left" : "right"]: 11, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: busy ? C.red : C.inkL, padding: 2 }}>
          {busy ? <span style={{ display: "inline-block", animation: "spin .7s linear infinite" }}>⟳</span> : "📍"}
        </button>
      </div>
      {open && sugg.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 3px)", left: 0, right: 0, background: C.white, borderRadius: 12, border: `1.5px solid ${C.borderW}`, zIndex: 700, overflow: "hidden", boxShadow: C.shadowL }}>
          {sugg.map((s, i) => (
            <div key={i} onMouseDown={() => { onChange(s.short); onSelect({ name: s.short, lat: s.lat, lng: s.lng }); setSugg([]); setOpen(false); }}
              style={{ padding: "10px 14px", cursor: "pointer", borderBottom: i < sugg.length - 1 ? `1px solid ${C.border}` : "none", transition: "background .12s" }}
              onMouseEnter={e => e.currentTarget.style.background = C.redPale} onMouseLeave={e => e.currentTarget.style.background = C.white}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{s.short}</div>
              <div style={{ fontSize: 11, color: C.inkL, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.full}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════
   REUSABLE UI ATOMS
══════════════════════════════════════ */
const Logo = ({ t, size = 30 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke="url(#mg)" strokeWidth="2.5" fill="none" strokeDasharray="5 3" strokeLinecap="round" />
      <path d="M10 31L10 18L19 27L24 20L29 27L38 18L38 31" stroke={C.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="24" cy="24" r="3.5" fill={C.red} />
      <line x1="2.5" y1="24" x2="8" y2="24" stroke={C.red} strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="24" x2="45.5" y2="24" stroke={C.red} strokeWidth="2" strokeLinecap="round" />
      <defs><linearGradient id="mg" x1="0" y1="0" x2="48" y2="48"><stop stopColor={C.red} /><stop offset="1" stopColor={C.orange} /></linearGradient></defs>
    </svg>
    <div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: C.ink, letterSpacing: "-.5px", lineHeight: 1 }}>{t.appName}</div>
      <div style={{ height: 2, background: G, borderRadius: 1, marginTop: 2.5 }} />
    </div>
  </div>
);

const Btn = ({ children, onClick, v = "primary", s, full, small, disabled }) => {
  const vs = {
    primary: { background: disabled ? "#FCA5B0" : G, color: "#fff", border: "none", boxShadow: disabled ? "none" : "0 4px 16px rgba(232,41,74,.3)" },
    outline: { background: "transparent", color: C.red, border: `2px solid ${C.red}` },
    soft: { background: C.redPale, color: C.red, border: `1.5px solid ${C.redBorder}` },
    ghost: { background: C.white, color: C.inkM, border: `1.5px solid ${C.border}` },
    green: { background: C.greenPale, color: C.green, border: `1.5px solid ${C.greenBorder}` },
  };
  return <button onClick={disabled ? undefined : onClick} style={{ ...vs[v], borderRadius: 11, padding: small ? "7px 16px" : "12px 20px", fontSize: small ? 12 : 14, fontWeight: 700, cursor: disabled ? "default" : "pointer", fontFamily: "'Syne', sans-serif", width: full ? "100%" : "auto", transition: "opacity .15s", ...s }}>{children}</button>;
};

const Tag = ({ label, color = C.red, bg }) => <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "3px 9px", borderRadius: 20, background: bg || `${color}15`, color, border: `1px solid ${color}25` }}>{label}</span>;
const Stars = ({ r }) => <span style={{ color: C.amber, fontSize: 11 }}>{"★".repeat(Math.round(r))}{"☆".repeat(5 - Math.round(r))}<span style={{ color: C.inkL, fontSize: 10, marginLeft: 3 }}>{r}</span></span>;

const Card = ({ children, style: s, onClick }) => (
  <div onClick={onClick} style={{ background: C.white, borderRadius: 16, border: `1.5px solid ${C.border}`, boxShadow: C.shadow, transition: "transform .18s, box-shadow .18s", cursor: onClick ? "pointer" : "default", ...s }}
    onMouseEnter={onClick ? e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = C.shadowM; } : undefined}
    onMouseLeave={onClick ? e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = C.shadow; } : undefined}>
    {children}
  </div>
);

const FreeBanner = ({ t }) => (
  <div style={{ background: GP, border: `1.5px solid ${C.redBorder}`, borderRadius: 13, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
    <span style={{ fontSize: 22, flexShrink: 0 }}>🎉</span>
    <div>
      <div style={{ fontWeight: 700, color: C.red, fontSize: 14 }}>{t.freeBannerTitle}</div>
      <div style={{ fontSize: 12, color: C.inkM, marginTop: 2 }}>{t.freeBannerSub}</div>
    </div>
  </div>
);

const NotTaxiNote = ({ t }) => (
  <div style={{ background: C.purplePale, border: `1.5px solid ${C.purpleBorder}`, borderRadius: 12, padding: "11px 14px", display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 16 }}>
    <span style={{ fontSize: 17, flexShrink: 0 }}>ℹ️</span>
    <div>
      <div style={{ fontWeight: 700, color: C.purple, fontSize: 12, marginBottom: 2 }}>{t.notTaxiTitle}</div>
      <div style={{ fontSize: 12, color: C.purple, lineHeight: 1.55 }}>{t.notTaxiText}</div>
    </div>
  </div>
);

const Ticker = ({ t }) => {
  const txt = t.dir === "rtl"
    ? "موفو ليست تاكسي  •  مجاني 3 أشهر  •  لا مدفوعات عبر التطبيق  •  ترتّب المال مباشرة  •  سجّل مجاناً  •  "
    : "NOT A TAXI  •  FREE FOR 3 MONTHS  •  NO APP PAYMENTS  •  MONEY ARRANGED DIRECTLY  •  SIGN UP FREE  •  ";
  return (
    <div style={{ background: G, overflow: "hidden", padding: "8px 0" }}>
      <div style={{ display: "inline-flex", animation: "ticker 26s linear infinite", whiteSpace: "nowrap" }}>
        {[0, 1].map(i => <span key={i} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: "#fff", textTransform: "uppercase" }}>{txt + txt}</span>)}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════ */
const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&family=Cairo:wght@400;600;700;800&family=Tajawal:wght@400;700&display=swap');
    @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
    *{margin:0;padding:0;box-sizing:border-box;}
    html,body{background:#FAFAF8;}
    ::-webkit-scrollbar{width:0;}
    input,button,textarea{font-family:inherit;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
    @keyframes slideUp{from{opacity:0;transform:translateY(100%);}to{opacity:1;transform:translateY(0);}}
    @keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(232,41,74,.4);}50%{box-shadow:0 0 0 12px rgba(232,41,74,0);}}
    @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
    @keyframes pop{from{opacity:0;transform:scale(.93);}to{opacity:1;transform:scale(1);}}
    @keyframes msgIn{from{opacity:0;transform:translateY(5px);}to{opacity:1;transform:translateY(0);}}
    .fu{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;}
    .su{animation:slideUp .36s cubic-bezier(.22,1,.36,1) both;}
    .pop{animation:pop .38s cubic-bezier(.22,1,.36,1) both;}
    .mi{animation:msgIn .25s ease both;}
    input:focus,textarea:focus{outline:none;border-color:#E8294A!important;}
    .mpin{background:transparent;border:none;}
    .leaflet-control-zoom a{background:#fff!important;color:#E8294A!important;border:1.5px solid #FFD6DC!important;border-radius:8px!important;margin-bottom:3px!important;font-weight:700!important;}
    .leaflet-control-zoom{border:none!important;}
    .bme{background:linear-gradient(135deg,#E8294A,#FF6B35);color:#fff;border-radius:18px 18px 4px 18px;padding:10px 14px;max-width:248px;font-size:14px;line-height:1.5;}
    .bthem{background:#fff;color:#18181B;border-radius:18px 18px 18px 4px;padding:10px 14px;max-width:248px;font-size:14px;line-height:1.5;border:1.5px solid #F0E4E7;}
    [dir="rtl"] .bme{border-radius:18px 18px 18px 4px;}
    [dir="rtl"] .bthem{border-radius:18px 18px 4px 18px;}
  `}</style>
);

/* ══════════════════════════════════════
   HEADER
══════════════════════════════════════ */
const Header = ({ setPage, user, setUser, lang, setLang, t, unread }) => (
  <header style={{ position: "sticky", top: 0, zIndex: 400, background: "rgba(250,250,248,.96)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.border}`, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
    <div onClick={() => setPage("home")}><Logo t={t} /></div>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {/* Language toggle */}
      <button onClick={() => setLang(lang === "en" ? "ar" : "en")} style={{ background: C.redPale, border: `1.5px solid ${C.redBorder}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700, color: C.red, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
        <span>{lang === "en" ? "🇪🇬" : "🇬🇧"}</span>
        <span>{lang === "en" ? t.arabic : t.english}</span>
      </button>
      {user ? (
        <>
          <button onClick={() => setPage("messages")} style={{ position: "relative", background: C.redPale, border: `1.5px solid ${C.redBorder}`, borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
            💬
            {unread > 0 && <span style={{ position: "absolute", top: -2, right: -2, background: C.red, color: "#fff", fontSize: 9, fontWeight: 800, width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{unread}</span>}
          </button>
          <img src={user.photo || PHOTOS.d1} style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.red}` }} />
          <Btn v="ghost" small onClick={() => { setUser(null); setPage("home"); }}>{t.signOut}</Btn>
        </>
      ) : (
        <>
          <Btn v="ghost" small onClick={() => setPage("auth")}>{t.login}</Btn>
          <Btn small onClick={() => setPage("signup")}>{t.signupBtn.replace(" →", "")}</Btn>
        </>
      )}
    </div>
  </header>
);

/* ══════════════════════════════════════
   BOTTOM NAV
══════════════════════════════════════ */
const Nav = ({ page, setPage, user, t, unread }) => {
  const items = user
    ? [{ id: "home", icon: "⌂", l: t.navHome }, { id: "search", icon: "⊙", l: t.navSearch }, { id: "offer", icon: "⊕", l: t.navOffer }, { id: "trips", icon: "⊟", l: t.navTrips }, { id: "messages", icon: "✉", l: t.navMessages, badge: unread }, { id: "legal", icon: "§", l: t.navLegal }]
    : [{ id: "home", icon: "⌂", l: t.navHome }, { id: "search", icon: "⊙", l: t.navSearch }, { id: "auth", icon: "⊙", l: t.login }, { id: "legal", icon: "§", l: t.navLegal }];
  return (
    <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "rgba(250,250,248,.97)", backdropFilter: "blur(16px)", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "7px 0 14px", zIndex: 300, boxShadow: "0 -2px 12px rgba(0,0,0,.05)" }}>
      {items.map(it => {
        const on = page === it.id || (it.id === "legal" && page.startsWith("legal"));
        return (
          <button key={it.id} onClick={() => setPage(it.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "3px 8px", position: "relative", transition: "opacity .15s" }}>
            <span style={{ fontSize: 16, color: on ? C.red : C.inkL }}>{it.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: on ? C.red : C.inkL, fontFamily: t.font }}>{it.l}</span>
            {on && <div style={{ width: 16, height: 2.5, background: G, borderRadius: 2 }} />}
            {it.badge > 0 && <span style={{ position: "absolute", top: -1, right: 0, background: C.red, color: "#fff", fontSize: 9, fontWeight: 800, width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{it.badge}</span>}
          </button>
        );
      })}
    </nav>
  );
};

/* ══════════════════════════════════════
   HOME PAGE
══════════════════════════════════════ */
const Home = ({ setPage, user, mapReady, t, lang }) => {
  const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const [fromL, setFromL] = useState(null); const [toL, setToL] = useState(null);
  const [showMap, setShowMap] = useState(false);
  return (
    <div dir={t.dir} style={{ fontFamily: t.font }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 460, overflow: "hidden" }}>
        <img src={PHOTOS.hero} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(250,250,248,0) 10%, rgba(250,250,248,.65) 55%, rgba(250,250,248,1) 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: G }} />
        {/* Badge */}
        <div className="fu" style={{ animationDelay: ".1s", position: "absolute", top: 14, [t.dir === "rtl" ? "left" : "right"]: 14, background: C.white, border: `1.5px solid ${C.redBorder}`, borderRadius: 20, padding: "5px 12px", display: "flex", gap: 6, alignItems: "center", boxShadow: C.shadow }}>
          <span style={{ fontSize: 13 }}>🇪🇬</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.red }}>{t.launchBadge.replace("🇪🇬 ", "")}</span>
        </div>
        {/* Copy */}
        <div style={{ position: "absolute", bottom: 140, left: 0, right: 0, padding: "0 22px" }}>
          <div className="fu" style={{ animationDelay: ".15s" }}>
            <Tag label={t.freeBadge} color={C.green} bg={C.greenPale} />
          </div>
          <h1 className="fu" style={{ animationDelay: ".22s", fontFamily: "'Syne', sans-serif", fontSize: 46, fontWeight: 800, color: C.ink, lineHeight: 1, letterSpacing: "-1px", margin: "10px 0 12px" }}>
            {t.heroTitle1}<br />
            <span style={{ background: G, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.heroTitle2}</span>
          </h1>
          <p className="fu" style={{ animationDelay: ".3s", fontSize: 14, color: C.inkM, lineHeight: 1.65, maxWidth: 320 }}>{t.heroSub}</p>
        </div>
      </div>

      {/* Search card */}
      <div style={{ margin: "-80px 14px 0", position: "relative", zIndex: 10 }}>
        <Card style={{ padding: 20, boxShadow: C.shadowL }}>
          <FreeBanner t={t} />
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 800, color: C.ink, marginBottom: 14 }}>{t.findSeat}</div>
          <LocInput icon="📍" label={t.from} value={from} onChange={setFrom} placeholder={lang === "ar" ? "من أين؟" : "Departure city or address"} dir={t.dir} t={t} onSelect={l => { setFromL(l); setShowMap(true); }} />
          <LocInput icon="🏁" label={t.to} value={to} onChange={setTo} placeholder={lang === "ar" ? "إلى أين؟" : "Destination city or address"} dir={t.dir} t={t} onSelect={l => { setToL(l); setShowMap(true); }} />
          {showMap && mapReady && (
            <div className="pop" style={{ marginBottom: 12, borderRadius: 13, overflow: "hidden", border: `1.5px solid ${C.borderW}` }}>
              <MapView fromC={fromL ? [fromL.lat, fromL.lng] : null} toC={toL ? [toL.lat, toL.lng] : null} h={180} center={[26.8, 30.8]} />
              <div style={{ background: C.redPale, padding: "7px 12px", fontSize: 12, color: C.inkM, display: "flex", justifyContent: "space-between" }}>
                <span>📍 {fromL?.name || "…"}</span><span style={{ color: C.red }}>→</span><span>🏁 {toL?.name || "…"}</span>
              </div>
            </div>
          )}
          {!user ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Btn onClick={() => setPage("signup")} full>{lang === "ar" ? "سجّل للبحث" : "Sign up to search"}</Btn>
              <Btn v="ghost" onClick={() => setPage("auth")} full>{t.login}</Btn>
            </div>
          ) : (
            <Btn onClick={() => setPage("search")} full>{t.searchBtn}</Btn>
          )}
        </Card>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, margin: "24px 14px 0" }}>
        {[["12k+", t.stat1], ["48k+", t.stat2], ["30+", t.stat3]].map(([n, l]) => (
          <Card key={l} style={{ padding: "14px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, background: G, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: C.inkL, textTransform: "uppercase", marginTop: 3, fontFamily: t.font }}>{l}</div>
          </Card>
        ))}
      </div>

      <div style={{ margin: "20px 0" }}><Ticker t={t} /></div>

      {/* Not a taxi */}
      <div style={{ padding: "0 14px" }}><NotTaxiNote t={t} /></div>

      {/* How it works */}
      <div style={{ padding: "8px 14px 24px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 19, fontWeight: 800, color: C.ink, marginBottom: 4 }}>{t.howTitle}</div>
        <div style={{ height: 3, width: 56, background: G, borderRadius: 2, marginBottom: 4 }} />
        <div style={{ height: 3, width: 32, background: G, borderRadius: 2, marginBottom: 18, opacity: .35 }} />
        {[[t.step1T, t.step1D, "✨", C.amberPale, C.amber], [t.step2T, t.step2D, "🔍", C.bluePale, C.blue], [t.step3T, t.step3D, "💬", C.greenPale, C.green], [t.step4T, t.step4D, "🤝", C.redPale, C.red]].map(([ti, de, em, bg, col]) => (
          <Card key={ti} style={{ padding: 15, marginBottom: 10, display: "flex", gap: 13, alignItems: "flex-start" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{em}</div>
            <div><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.ink, marginBottom: 3 }}>{ti}</div><div style={{ fontSize: 13, color: C.inkM, lineHeight: 1.55 }}>{de}</div></div>
          </Card>
        ))}
      </div>

      {/* Popular trips */}
      <div style={{ padding: "0 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 19, fontWeight: 800, color: C.ink }}>{lang === "ar" ? "أشهر الرحلات" : "Popular trips"}</div>
            <div style={{ height: 3, width: 56, background: G, borderRadius: 2, marginTop: 5 }} />
          </div>
          <Btn v="soft" small onClick={() => setPage("search")}>{t.seeAll}</Btn>
        </div>
        {TRIPS_DATA.filter(x => x.seats > 0).slice(0, 3).map(x => (
          <Card key={x.id} style={{ marginBottom: 12, overflow: "hidden" }} onClick={() => user ? setPage("search") : setPage("signup")}>
            <div style={{ position: "relative", height: 90, overflow: "hidden" }}>
              <img src={PHOTOS.desert} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(250,250,248,.9))" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: G }} />
              <div style={{ position: "absolute", bottom: 8, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: C.ink }}>{lang === "ar" ? x.fromAr : x.from} <span style={{ color: C.red }}>→</span> {lang === "ar" ? x.toAr : x.to}</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: C.inkL }}>{x.date}</div>
                  <div style={{ fontSize: 12, color: C.red, fontWeight: 700 }}>{t.seatLeft(x.seats)}</div>
                </div>
              </div>
            </div>
            <div style={{ padding: "11px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <img src={x.photo} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.redBorder}` }} />
                <div><div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{lang === "ar" ? x.nameAr : x.name}</div><Stars r={x.rating} /></div>
              </div>
              <div style={{ fontSize: 12, color: C.inkM, fontStyle: "italic" }}>~{x.cost} EGP {lang === "ar" ? "مقترح" : "suggested"}</div>
            </div>
            {x.note && <div style={{ margin: "0 14px 12px", background: C.cream, borderRadius: 8, padding: "7px 10px", fontSize: 12, color: C.inkM, fontStyle: "italic", border: `1px solid ${C.redBorder}` }}>"{lang === "ar" ? x.noteAr : x.note}"</div>}
          </Card>
        ))}
      </div>

      {/* Offer CTA */}
      <div style={{ margin: "8px 14px 24px", background: GP, borderRadius: 18, padding: 22, border: `1.5px solid ${C.redBorder}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -16, right: -16, width: 80, height: 80, borderRadius: "50%", background: "rgba(232,41,74,.07)" }} />
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: C.ink, marginBottom: 8 }}>{t.offerTitle}</div>
        <p style={{ fontSize: 13, color: C.inkM, lineHeight: 1.65, marginBottom: 16 }}>{t.offerSub}</p>
        <Btn onClick={() => user ? setPage("offer") : setPage("signup")}>{t.offerBtn}</Btn>
      </div>

      {/* Testimonials */}
      <div style={{ padding: "0 14px 24px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 19, fontWeight: 800, color: C.ink, marginBottom: 4 }}>{t.testimonials}</div>
        <div style={{ height: 3, width: 56, background: G, borderRadius: 2, marginBottom: 4 }} /><div style={{ height: 3, width: 32, background: G, borderRadius: 2, marginBottom: 18, opacity: .35 }} />
        {[
          { n: "Layla A.", nAr: "ليلى أ.", tx: "Cairo to Alex every week — I posted my spare seats and now I barely pay for fuel!", txAr: "أسافر من القاهرة للإسكندرية كل أسبوع — نشرت مقاعدي وبالكاد أدفع للبنزين الآن!", img: PHOTOS.d2, r: "Cairo → Alex", rAr: "القاهرة → الإسكندرية" },
          { n: "Omar M.", nAr: "عمر م.", tx: "Found a seat on Movo in minutes. Agreed the cost directly with the person — totally fair.", txAr: "وجدت مقعداً على موفو في دقائق. اتفقنا على التكلفة مباشرة — عادل تماماً.", img: PHOTOS.d3, r: "Giza → Luxor", rAr: "الجيزة → الأقصر" },
          { n: "Nadia R.", nAr: "ناديا ر.", tx: "Simple, quick, no fuss. Much better than going alone.", txAr: "بسيط وسريع وبلا تعقيدات. أفضل بكثير من السفر وحدي.", img: PHOTOS.d4, r: "Cairo → Sharm", rAr: "القاهرة → شرم" },
        ].map((x, i) => (
          <Card key={i} style={{ padding: 16, marginBottom: 12, display: "flex", gap: 13 }}>
            <img src={x.img} style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover", border: `2.5px solid ${C.red}`, flexShrink: 0 }} />
            <div>
              <div style={{ color: C.amber, fontSize: 12, marginBottom: 3 }}>★★★★★</div>
              <p style={{ color: C.inkM, fontSize: 13, lineHeight: 1.6, fontStyle: "italic", marginBottom: 7 }}>"{lang === "ar" ? x.txAr : x.tx}"</p>
              <div style={{ fontWeight: 700, color: C.ink, fontSize: 13, fontFamily: t.font }}>{lang === "ar" ? x.nAr : x.n}</div>
              <div style={{ fontSize: 11, color: C.inkL }}>{lang === "ar" ? x.rAr : x.r}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Sign up CTA */}
      {!user && (
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <img src={PHOTOS.sunrise} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(250,250,248,.62)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 28px" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: C.ink, marginBottom: 8 }}>{t.startHere}</div>
            <div style={{ fontSize: 13, color: C.inkM, marginBottom: 18 }}>{t.freeFor3}</div>
            <Btn onClick={() => setPage("signup")} s={{ animation: "pulse 2.5s infinite" }}>{lang === "ar" ? "سجّل مجاناً" : "Sign up free →"}</Btn>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ background: C.white, padding: "24px 20px 100px", borderTop: `1px solid ${C.border}` }}>
        <Logo t={t} />
        <p style={{ fontSize: 12, color: C.inkL, lineHeight: 1.75, margin: "12px 0 16px", fontFamily: t.font }}>{t.footerNote}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {[t.terms, t.privacy, t.refund, t.cookies].map(l => <span key={l} style={{ cursor: "pointer", color: C.inkL, fontWeight: 600, fontSize: 12 }}>{l}</span>)}
        </div>
        <div style={{ marginTop: 14, fontSize: 11, color: "#C0B8B5" }}>{t.copyright}</div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   AUTH — LOGIN
══════════════════════════════════════ */
const LoginPage = ({ onLogin, setPage, t, lang }) => {
  const [email, setEmail] = useState(""); const [pass, setPass] = useState("");
  return (
    <div dir={t.dir} style={{ fontFamily: t.font, paddingBottom: 100 }}>
      <div style={{ background: GP, padding: "32px 20px 24px", borderBottom: `1px solid ${C.redBorder}` }}>
        <Logo t={t} />
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, color: C.ink, marginTop: 18, lineHeight: 1.05 }}>{t.loginTitle}</div>
        <div style={{ height: 3, width: 50, background: G, borderRadius: 2, marginTop: 9 }} />
      </div>
      <div style={{ padding: "20px 18px 0" }}>
        <FreeBanner t={t} />
        <Card style={{ padding: 22 }}>
          {[[t.emailLabel, "✉️", "email", email, setEmail], [t.passLabel, "🔒", "password", "", null]].map(([lbl, ic, tp, val, set]) => (
            <div key={tp} style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: C.inkL, textTransform: "uppercase", marginBottom: 5 }}>{lbl}</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>{ic}</span>
                <input type={tp} value={val} onChange={set ? e => set(e.target.value) : undefined} style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 11, padding: "11px 14px 11px 40px", fontSize: 14, color: C.ink }} />
              </div>
            </div>
          ))}
          <Btn full onClick={() => onLogin({ email, name: "Movo Member", photo: PHOTOS.d1 })} s={{ marginBottom: 14 }}>{t.loginBtn}</Btn>
          <div style={{ textAlign: "center", fontSize: 13, color: C.inkM }}>{t.switchToSignup.split("?")[0]}? <span onClick={() => setPage("signup")} style={{ color: C.red, fontWeight: 700, cursor: "pointer" }}>{lang === "ar" ? "سجّل مجاناً" : "Sign up free"}</span></div>
        </Card>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   AUTH — SIGN UP
══════════════════════════════════════ */
const SignupPage = ({ onLogin, setPage, t, lang }) => {
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [pass, setPass] = useState(""); const [role, setRole] = useState("finder");
  return (
    <div dir={t.dir} style={{ fontFamily: t.font, paddingBottom: 100 }}>
      <div style={{ background: GP, padding: "32px 20px 24px", borderBottom: `1px solid ${C.redBorder}` }}>
        <Logo t={t} />
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, color: C.ink, marginTop: 18, lineHeight: 1.05 }}>{t.signupTitle}</div>
        <div style={{ height: 3, width: 50, background: G, borderRadius: 2, marginTop: 9 }} />
      </div>
      <div style={{ padding: "20px 18px 0" }}>
        <FreeBanner t={t} />
        <NotTaxiNote t={t} />
        {/* Role picker */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
          {[["finder", t.findSeatRole], ["offerer", t.offerSeatRole]].map(([r, l]) => (
            <button key={r} onClick={() => setRole(r)} style={{ padding: "13px 10px", borderRadius: 13, border: role === r ? "none" : `1.5px solid ${C.border}`, cursor: "pointer", fontWeight: 700, fontSize: 13, background: role === r ? G : C.white, color: role === r ? "#fff" : C.inkM, fontFamily: "'Syne', sans-serif", boxShadow: role === r ? "0 4px 16px rgba(232,41,74,.3)" : C.shadow, transition: "all .18s" }}>{l}</button>
          ))}
        </div>
        <Card style={{ padding: 22 }}>
          {[[t.nameLabel, "👤", "text", name, setName], [t.emailLabel, "✉️", "email", email, setEmail], [t.passLabel, "🔒", "password", "", null]].map(([lbl, ic, tp, val, set]) => (
            <div key={lbl} style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: C.inkL, textTransform: "uppercase", marginBottom: 5 }}>{lbl}</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>{ic}</span>
                <input type={tp} value={val} onChange={set ? e => set(e.target.value) : undefined} style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 11, padding: "11px 14px 11px 40px", fontSize: 14, color: C.ink }} />
              </div>
            </div>
          ))}
          <div style={{ background: C.greenPale, border: `1.5px solid ${C.greenBorder}`, borderRadius: 10, padding: "9px 12px", marginBottom: 16, fontSize: 12, color: C.green }}>
            ✓ {t.freeFor3}
          </div>
          <Btn full onClick={() => onLogin({ name: name || "Movo Member", email, role, photo: role === "offerer" ? PHOTOS.d3 : PHOTOS.d2 })} s={{ marginBottom: 12 }}>{t.signupBtn}</Btn>
          <div style={{ fontSize: 11, color: C.inkL, textAlign: "center", lineHeight: 1.5 }}>{t.agreeTerms}</div>
          <div style={{ textAlign: "center", fontSize: 13, color: C.inkM, marginTop: 12 }}>{t.switchToLogin.split("?")[0]}? <span onClick={() => setPage("auth")} style={{ color: C.red, fontWeight: 700, cursor: "pointer" }}>{lang === "ar" ? "تسجيل الدخول" : "Log in"}</span></div>
        </Card>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   SEARCH & BROWSE TRIPS
══════════════════════════════════════ */
const SearchPage = ({ setPage, mapReady, t, lang, setSelectedTrip }) => {
  const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const [fromL, setFromL] = useState(null); const [toL, setToL] = useState(null);
  const [showMap, setShowMap] = useState(false); const [sort, setSort] = useState("date");
  const sorted = [...TRIPS_DATA].sort((a, b) => sort === "cost" ? a.cost - b.cost : a.time.localeCompare(b.time));
  return (
    <div dir={t.dir} style={{ fontFamily: t.font, padding: "16px 14px 100px" }}>
      {/* Search inputs */}
      <Card style={{ padding: 18, marginBottom: 16 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: C.ink, marginBottom: 14 }}>{t.findSeat}</div>
        <LocInput icon="📍" value={from} onChange={setFrom} placeholder={lang === "ar" ? "من أين؟" : "From"} dir={t.dir} t={t} onSelect={l => { setFromL(l); setShowMap(true); }} />
        <LocInput icon="🏁" value={to} onChange={setTo} placeholder={lang === "ar" ? "إلى أين؟" : "To"} dir={t.dir} t={t} onSelect={l => { setToL(l); setShowMap(true); }} />
        {showMap && mapReady && (
          <div className="pop" style={{ marginBottom: 12, borderRadius: 12, overflow: "hidden", border: `1.5px solid ${C.borderW}` }}>
            <MapView fromC={fromL ? [fromL.lat, fromL.lng] : null} toC={toL ? [toL.lat, toL.lng] : null} h={195} center={[26.8, 30.8]} />
            <div style={{ background: C.redPale, padding: "7px 12px", fontSize: 12, color: C.inkM, display: "flex", gap: 8 }}>
              <span style={{ flex: 1 }}>{fromL?.name || "…"} → {toL?.name || "…"}</span>
              <button onClick={() => setShowMap(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.inkL, fontSize: 16 }}>×</button>
            </div>
          </div>
        )}
        {!showMap && <button onClick={() => setShowMap(true)} style={{ width: "100%", background: C.redPale, border: `1px dashed ${C.redBorder}`, borderRadius: 10, padding: "8px", fontSize: 12, color: C.red, cursor: "pointer", marginBottom: 10, fontWeight: 600 }}>🗺 {t.showMap}</button>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input type="date" style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 13, color: C.ink }} />
          <input type="number" min="1" placeholder={t.seats} style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 13, color: C.ink }} />
        </div>
      </Card>

      {/* Not taxi */}
      <NotTaxiNote t={t} />

      {/* Sort */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {[["date", lang === "ar" ? "⏰ الأبكر" : "⏰ Earliest"], ["cost", lang === "ar" ? "💰 الأرخص" : "💰 Cheapest"]].map(([k, l]) => (
          <button key={k} onClick={() => setSort(k)} style={{ padding: "7px 15px", borderRadius: 20, border: sort === k ? "none" : `1.5px solid ${C.border}`, cursor: "pointer", fontWeight: 700, fontSize: 12, background: sort === k ? G : C.white, color: sort === k ? "#fff" : C.inkM, boxShadow: sort === k ? "0 3px 12px rgba(232,41,74,.25)" : C.shadow }}>{l}</button>
        ))}
      </div>

      {/* Trip list */}
      {sorted.map(x => (
        <Card key={x.id} style={{ marginBottom: 13, overflow: "hidden" }} onClick={() => { setSelectedTrip(x); setPage("trip-detail"); }}>
          <div style={{ position: "relative", height: 88, overflow: "hidden" }}>
            <img src={PHOTOS.desert} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 25%, rgba(250,250,248,.92))" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: x.seats === 0 ? C.border : G }} />
            {x.seats > 0 && <div style={{ position: "absolute", top: 8, left: 10 }}><Tag label={lang === "ar" ? `${x.seats} مقعد` : `${x.seats} seat${x.seats > 1 ? "s" : ""}`} color={C.green} bg={C.greenPale} /></div>}
            {x.seats === 0 && <div style={{ position: "absolute", top: 8, right: 10 }}><Tag label={lang === "ar" ? "مكتمل" : t.full} color={C.inkL} bg={C.bg} /></div>}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 13px 9px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: C.ink }}>{lang === "ar" ? x.fromAr : x.from} <span style={{ color: C.red }}>→</span> {lang === "ar" ? x.toAr : x.to}</div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 10, color: C.inkL }}>{x.date}</div><div style={{ fontSize: 11, color: C.red, fontWeight: 700 }}>~{x.cost} EGP</div></div>
            </div>
          </div>
          <div style={{ padding: "11px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: x.note ? 9 : 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <img src={x.photo} style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", border: `2px solid ${x.seats === 0 ? C.border : C.redBorder}` }} />
                <div><div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{lang === "ar" ? x.nameAr : x.name}</div><Stars r={x.rating} /></div>
              </div>
              <div style={{ fontSize: 12, color: C.inkM }}>{x.time}</div>
            </div>
            {x.note && <div style={{ background: C.cream, borderRadius: 8, padding: "7px 10px", fontSize: 12, color: C.inkM, fontStyle: "italic", border: `1px solid ${C.redBorder}` }}>"{lang === "ar" ? x.noteAr : x.note}"</div>}
          </div>
          {x.seats > 0 && <div style={{ background: G, padding: "9px 14px", display: "flex", justifyContent: "space-between" }}><span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{t.viewTrip}</span><span style={{ color: "#fff", fontWeight: 900 }}>→</span></div>}
        </Card>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════
   TRIP DETAIL
══════════════════════════════════════ */
const TripDetail = ({ trip, setPage, mapReady, t, lang, showToast }) => {
  const [requested, setRequested] = useState(false);
  if (!trip) { setPage("search"); return null; }
  return (
    <div dir={t.dir} style={{ fontFamily: t.font, paddingBottom: 100 }}>
      {/* Photo header */}
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img src={PHOTOS.desert} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(250,250,248,.1), rgba(250,250,248,.95))" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: G }} />
        <button onClick={() => setPage("search")} style={{ position: "absolute", top: 14, [t.dir === "rtl" ? "right" : "left"]: 14, background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "6px 14px", cursor: "pointer", fontSize: 14, color: C.inkM, fontWeight: 700 }}>← {lang === "ar" ? "رجوع" : "Back"}</button>
        <div style={{ position: "absolute", bottom: 14, left: 18, right: 18 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: C.ink }}>{lang === "ar" ? trip.fromAr : trip.from} <span style={{ color: C.red }}>→</span> {lang === "ar" ? trip.toAr : trip.to}</div>
          <div style={{ fontSize: 13, color: C.inkM, marginTop: 3 }}>{trip.date} · {trip.time} · {t.seatLeft(trip.seats)}</div>
        </div>
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        <NotTaxiNote t={t} />

        {/* Map */}
        {mapReady && (
          <div style={{ borderRadius: 14, overflow: "hidden", border: `1.5px solid ${C.borderW}`, marginBottom: 16, boxShadow: C.shadow }}>
            <MapView fromC={trip.fromLL} toC={trip.toLL} h={200} center={[(trip.fromLL[0] + trip.toLL[0]) / 2, (trip.fromLL[1] + trip.toLL[1]) / 2]} />
            <div style={{ background: C.redPale, padding: "7px 12px", fontSize: 12, color: C.inkM, display: "flex", justifyContent: "space-between" }}>
              <span>📍 {lang === "ar" ? trip.fromAr : trip.from}</span><span style={{ color: C.red }}>→</span><span>🏁 {lang === "ar" ? trip.toAr : trip.to}</span>
            </div>
          </div>
        )}

        {/* Offerer card */}
        <Card style={{ padding: 16, marginBottom: 14, display: "flex", alignItems: "center", gap: 13 }}>
          <img src={trip.photo} style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", border: `3px solid ${C.red}` }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: C.ink }}>{lang === "ar" ? trip.nameAr : trip.name}</div>
            <Stars r={trip.rating} />
            <div style={{ fontSize: 12, color: C.inkM, marginTop: 3 }}>{lang === "ar" ? "يسافر بسيارته الخاصة — يشاركك تكلفة السفر" : "Travelling in their own car — sharing travel costs"}</div>
          </div>
          <Tag label={lang === "ar" ? "✓ موثّق" : "✓ Verified"} color={C.green} bg={C.greenPale} />
        </Card>

        {/* Trip note */}
        {trip.note && <div style={{ background: C.cream, border: `1.5px solid ${C.redBorder}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14, fontSize: 13, color: C.inkM, fontStyle: "italic", lineHeight: 1.6 }}>💬 "{lang === "ar" ? trip.noteAr : trip.note}"</div>}

        {/* Cost note */}
        <Card style={{ padding: 14, marginBottom: 16, background: C.amberPale, borderColor: C.amberBorder }}>
          <div style={{ fontWeight: 700, color: C.amber, fontSize: 13, marginBottom: 4 }}>{lang === "ar" ? "حول التكلفة" : "About the cost"}</div>
          <div style={{ fontSize: 13, color: C.inkM, lineHeight: 1.6 }}>
            {lang === "ar"
              ? `التكلفة المقترحة حوالي ${trip.cost} جنيه. يُرتَّب المبلغ الفعلي مباشرة بين المسافرَين — ليس عبر التطبيق.`
              : `Suggested cost share ~${trip.cost} EGP. Exact amount is arranged directly between you and the seat offerer — not through the app.`}
          </div>
        </Card>

        {/* CTA */}
        {!requested ? (
          <Btn full onClick={() => { setRequested(true); showToast(t.toastRequest); }}>{t.requestSeat}</Btn>
        ) : (
          <div style={{ background: C.greenPale, border: `1.5px solid ${C.greenBorder}`, borderRadius: 13, padding: 16, textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: C.green, marginBottom: 6 }}>{t.seatRequested}</div>
            <div style={{ fontSize: 13, color: C.inkM }}>{t.seatRequestedSub}</div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   OFFER A SEAT
══════════════════════════════════════ */
const OfferPage = ({ mapReady, t, lang, showToast }) => {
  const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const [fromL, setFromL] = useState(null); const [toL, setToL] = useState(null);
  const [showMap, setShowMap] = useState(false); const [note, setNote] = useState(""); const [done, setDone] = useState(false);
  if (done) return (
    <div dir={t.dir} style={{ fontFamily: t.font, padding: "60px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 18 }}>🎉</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: C.ink, marginBottom: 10 }}>{t.offerLive}</div>
      <p style={{ color: C.inkM, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{t.offerLiveSub}</p>
      <Btn onClick={() => setDone(false)}>{t.offerAnother}</Btn>
    </div>
  );
  return (
    <div dir={t.dir} style={{ fontFamily: t.font, paddingBottom: 100 }}>
      <div style={{ background: GP, padding: "28px 18px 22px", borderBottom: `1px solid ${C.redBorder}` }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: C.ink }}>{t.offerSeat}</div>
        <p style={{ fontSize: 13, color: C.inkM, lineHeight: 1.6, marginTop: 8 }}>{t.offerSubtitle}</p>
        <div style={{ height: 3, width: 56, background: G, borderRadius: 2, marginTop: 12 }} />
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        <NotTaxiNote t={t} />
        <Card style={{ padding: 20 }}>
          <LocInput icon="📍" label={t.departure} value={from} onChange={setFrom} placeholder={lang === "ar" ? "نقطة انطلاقك" : "Your departure point"} dir={t.dir} t={t} onSelect={l => { setFromL(l); setShowMap(true); }} />
          <LocInput icon="🏁" label={t.destination} value={to} onChange={setTo} placeholder={lang === "ar" ? "وجهتك" : "Your destination"} dir={t.dir} t={t} onSelect={l => { setToL(l); setShowMap(true); }} />
          {showMap && mapReady && (
            <div className="pop" style={{ marginBottom: 13, borderRadius: 13, overflow: "hidden", border: `1.5px solid ${C.borderW}` }}>
              <MapView fromC={fromL ? [fromL.lat, fromL.lng] : null} toC={toL ? [toL.lat, toL.lng] : null} h={200} center={[26.8, 30.8]} />
              <div style={{ background: C.redPale, padding: "7px 12px", fontSize: 12, color: C.inkM }}>{t.routePreview}: {fromL?.name || "…"} → {toL?.name || "…"}</div>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginBottom: 13 }}>
            {[[t.suggestedCost, "💷", "number"], [t.seatsAvail, "🪑", "number"], [t.tripDate, "📅", "date"], [t.tripTime, "⏰", "time"]].map(([lbl, ic, tp]) => (
              <div key={lbl}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: C.inkL, textTransform: "uppercase", marginBottom: 5 }}>{lbl}</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13 }}>{ic}</span>
                  <input type={tp} style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 11px 10px 30px", fontSize: 13, color: C.ink }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: C.inkL, textTransform: "uppercase", marginBottom: 5 }}>{t.yourNote}</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder={t.notePlaceholder} rows={3} style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 11, padding: "11px 13px", fontSize: 13, color: C.ink, resize: "vertical", fontFamily: t.font }} />
          </div>
          <div style={{ background: C.amberPale, border: `1.5px solid ${C.amberBorder}`, borderRadius: 11, padding: "10px 13px", marginBottom: 16, fontSize: 12, color: C.amber, lineHeight: 1.6 }}>
            💰 {lang === "ar" ? "التكلفة المقترحة فقط للإشارة — تُرتَّب مباشرة بينك وبين الراكب. لا مدفوعات عبر التطبيق." : "Suggested cost is a guide only — arranged directly between you and the rider. No payments through the app."}
          </div>
          <Btn full onClick={() => { setDone(true); showToast(t.toastOffer); }}>{t.publishBtn}</Btn>
        </Card>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   MY TRIPS
══════════════════════════════════════ */
const MyTripsPage = ({ setPage, mapReady, t, lang }) => {
  const [tab, setTab] = useState("requested"); const [expMap, setExpMap] = useState(null);
  const myRequests = [
    { id: 1, from: "Cairo", fromAr: "القاهرة", to: "Alexandria", toAr: "الإسكندرية", fromLL: [30.0444, 31.2357], toLL: [31.2001, 29.9187], date: "Tue 22 Apr", time: "07:30", status: "confirmed", offerer: "Yasmine A.", offererAr: "ياسمين أ.", photo: PHOTOS.d2, cost: 120 },
    { id: 2, from: "Cairo", fromAr: "القاهرة", to: "Hurghada", toAr: "الغردقة", fromLL: [30.0444, 31.2357], toLL: [27.2579, 33.8116], date: "Thu 24 Apr", time: "04:30", status: "pending", offerer: "Rania H.", offererAr: "رانيا ح.", photo: PHOTOS.d2, cost: 260 },
  ];
  const myOffers = [
    { id: 1, from: "Cairo", fromAr: "القاهرة", to: "Alexandria", toAr: "الإسكندرية", fromLL: [30.0444, 31.2357], toLL: [31.2001, 29.9187], date: "Tue 22 Apr", time: "07:30", seats: 2, requests: 3, cost: 120 },
  ];
  const statusColor = (s) => ({ confirmed: C.green, pending: C.amber, completed: C.blue })[s] || C.inkL;
  const statusBg = (s) => ({ confirmed: C.greenPale, pending: C.amberPale, completed: C.bluePale })[s] || C.bg;
  return (
    <div dir={t.dir} style={{ fontFamily: t.font, paddingBottom: 100 }}>
      <div style={{ background: GP, padding: "28px 18px 20px", borderBottom: `1px solid ${C.redBorder}` }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: C.ink }}>{t.myTripsTitle}</div>
        <div style={{ height: 3, width: 50, background: G, borderRadius: 2, marginTop: 8 }} />
      </div>
      <div style={{ padding: "16px" }}>
        {/* Free promo */}
        <div style={{ background: C.greenPale, border: `1.5px solid ${C.greenBorder}`, borderRadius: 12, padding: "11px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 20 }}>✓</span>
          <div>
            <div style={{ fontWeight: 700, color: C.green, fontSize: 13 }}>{t.freeBannerTitle}</div>
            <div style={{ fontSize: 12, color: C.inkM, marginTop: 2 }}>{t.freeBannerSub}</div>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {[["requested", t.bookedSeats], ["offers", t.myOffers]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ padding: "8px 18px", borderRadius: 20, border: tab === k ? "none" : `1.5px solid ${C.border}`, cursor: "pointer", fontWeight: 700, fontSize: 12, background: tab === k ? G : C.white, color: tab === k ? "#fff" : C.inkM, boxShadow: tab === k ? "0 3px 12px rgba(232,41,74,.25)" : C.shadow }}>{l}</button>
          ))}
        </div>
        {tab === "requested" && (myRequests.length === 0 ? <div style={{ textAlign: "center", padding: "40px 0", color: C.inkL, fontSize: 14 }}>{t.noBookings}</div> :
          myRequests.map((b, i) => (
            <Card key={i} style={{ marginBottom: 13, overflow: "hidden" }}>
              <div style={{ height: 3.5, background: b.status === "confirmed" ? C.green : b.status === "pending" ? C.amber : G }} />
              <div style={{ padding: "14px 15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 11 }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: C.ink }}>{lang === "ar" ? b.fromAr : b.from} <span style={{ color: C.red }}>→</span> {lang === "ar" ? b.toAr : b.to}</div>
                    <div style={{ fontSize: 12, color: C.inkL, marginTop: 2 }}>{b.date} · {b.time}</div>
                  </div>
                  <Tag label={b.status === "confirmed" ? t.status_confirmed : b.status === "pending" ? t.status_pending : t.status_completed} color={statusColor(b.status)} bg={statusBg(b.status)} />
                </div>
                <button onClick={() => setExpMap(expMap === i ? null : i)} style={{ width: "100%", background: C.redPale, border: `1px solid ${C.redBorder}`, borderRadius: 8, padding: "6px", fontSize: 12, color: C.red, cursor: "pointer", marginBottom: 10, fontWeight: 600 }}>{expMap === i ? t.hideMap : t.showMap}</button>
                {expMap === i && mapReady && <div style={{ marginBottom: 10, borderRadius: 11, overflow: "hidden", border: `1.5px solid ${C.borderW}` }}><MapView fromC={b.fromLL} toC={b.toLL} h={170} center={[(b.fromLL[0] + b.toLL[0]) / 2, (b.fromLL[1] + b.toLL[1]) / 2]} /></div>}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <img src={b.photo} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                    <span style={{ fontSize: 13, color: C.inkM }}>{lang === "ar" ? b.offererAr : b.offerer}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn v="soft" small onClick={() => {}}>{lang === "ar" ? "💬 رسالة" : "💬 Message"}</Btn>
                    <Btn v="ghost" small onClick={() => {}}>{t.cancelRequest}</Btn>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
        {tab === "offers" && (myOffers.length === 0 ? <div style={{ textAlign: "center", padding: "40px 0", color: C.inkL, fontSize: 14 }}>{t.noOffers}</div> :
          myOffers.map((o, i) => (
            <Card key={i} style={{ padding: 15, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: C.ink }}>{lang === "ar" ? o.fromAr : o.from} <span style={{ color: C.red }}>→</span> {lang === "ar" ? o.toAr : o.to}</div>
                <Tag label={`${o.seats} ${lang === "ar" ? "مقاعد" : "seats"}`} color={C.green} bg={C.greenPale} />
              </div>
              <div style={{ fontSize: 12, color: C.inkL, marginBottom: 10 }}>{o.date} · {o.time} · ~{o.cost} EGP {lang === "ar" ? "مقترح" : "suggested"}</div>
              <div style={{ background: C.bluePale, border: `1px solid ${C.blueBorder}`, borderRadius: 9, padding: "8px 12px", fontSize: 13, color: C.blue, fontWeight: 600 }}>
                💬 {o.requests} {lang === "ar" ? "طلبات استلمتها" : "seat requests received"}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   MESSAGES
══════════════════════════════════════ */
const MessagesPage = ({ t, lang }) => {
  const [active, setActive] = useState(null); const [convs, setConvs] = useState(MOCK_CONVS);
  const [draft, setDraft] = useState(""); const endRef = useRef(null);
  const send = () => {
    if (!draft.trim() || !active) return;
    setConvs(prev => prev.map(c => c.id === active ? { ...c, msgs: [...c.msgs, { me: true, t: draft, tAr: draft, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }], last: draft, lastAr: draft } : c));
    setDraft(""); setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 70);
  };
  const ac = convs.find(c => c.id === active);
  if (active && ac) return (
    <div style={{ height: "calc(100vh - 110px)", display: "flex", flexDirection: "column", direction: t.dir, fontFamily: t.font }}>
      {/* Chat header */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "11px 15px", display: "flex", alignItems: "center", gap: 11, boxShadow: C.shadow }}>
        <button onClick={() => setActive(null)} style={{ background: C.redPale, border: `1.5px solid ${C.redBorder}`, borderRadius: 9, padding: "6px 13px", cursor: "pointer", fontSize: 14, color: C.red, fontWeight: 700 }}>{t.backBtn}</button>
        <img src={ac.photo} style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: `2.5px solid ${C.red}` }} />
        <div><div style={{ fontWeight: 700, color: C.ink, fontSize: 14 }}>{lang === "ar" ? ac.nameAr : ac.name}</div><div style={{ fontSize: 11, color: C.inkL }}>{lang === "ar" ? ac.routeAr : ac.route}</div></div>
      </div>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 9, background: C.bg }}>
        {ac.msgs.map((m, i) => (
          <div key={i} className="mi" style={{ display: "flex", justifyContent: m.me ? (t.dir === "rtl" ? "flex-start" : "flex-end") : (t.dir === "rtl" ? "flex-end" : "flex-start"), animationDelay: `${i * .04}s` }}>
            {!m.me && <img src={ac.photo} style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", [t.dir === "rtl" ? "marginLeft" : "marginRight"]: 7, flexShrink: 0, alignSelf: "flex-end" }} />}
            <div>
              <div className={m.me ? "bme" : "bthem"}>{lang === "ar" ? m.tAr : m.t}</div>
              <div style={{ fontSize: 10, color: C.inkL, marginTop: 3, textAlign: m.me ? (t.dir === "rtl" ? "left" : "right") : (t.dir === "rtl" ? "right" : "left") }}>{m.time}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      {/* Input */}
      <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, padding: "11px 14px", display: "flex", gap: 9, alignItems: "center" }}>
        <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={t.typeMsg} dir={t.dir} style={{ flex: 1, background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 22, padding: "10px 15px", fontSize: 14, color: C.ink, fontFamily: t.font }} />
        <button onClick={send} style={{ background: G, border: "none", borderRadius: "50%", width: 42, height: 42, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 3px 12px rgba(232,41,74,.3)" }}>{t.dir === "rtl" ? "←" : "→"}</button>
      </div>
    </div>
  );
  return (
    <div dir={t.dir} style={{ fontFamily: t.font, padding: "0 0 100px" }}>
      <div style={{ background: GP, padding: "28px 18px 20px", marginBottom: 0, borderBottom: `1px solid ${C.redBorder}` }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: C.ink }}>{t.messagesTitle}</div>
        <div style={{ height: 3, width: 50, background: G, borderRadius: 2, marginTop: 8 }} />
      </div>
      <div style={{ padding: "16px 14px 0" }}>
        <input placeholder={t.searchMsgs} style={{ width: "100%", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 11, padding: "10px 14px", fontSize: 14, color: C.ink, marginBottom: 16, fontFamily: t.font }} />
        {convs.length === 0 ? <div style={{ textAlign: "center", padding: "40px 0", color: C.inkL, fontSize: 14 }}>{t.noMsgs}</div> : convs.map(c => (
          <Card key={c.id} style={{ padding: "13px 15px", marginBottom: 11, display: "flex", gap: 11, cursor: "pointer", border: c.unread > 0 ? `1.5px solid ${C.borderW}` : `1.5px solid ${C.border}`, boxShadow: c.unread > 0 ? C.shadowM : C.shadow }}
            onClick={() => { setActive(c.id); setConvs(prev => prev.map(x => x.id === c.id ? { ...x, unread: 0 } : x)); }}>
            <div style={{ position: "relative" }}>
              <img src={c.photo} style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover", border: `2.5px solid ${c.unread > 0 ? C.red : C.border}` }} />
              <div style={{ position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: "50%", background: C.green, border: `2px solid ${C.white}` }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontWeight: 700, color: C.ink, fontSize: 14 }}>{lang === "ar" ? c.nameAr : c.name}</span>
                <span style={{ fontSize: 11, color: C.inkL }}>{c.time}</span>
              </div>
              <div style={{ fontSize: 12, color: C.inkL, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lang === "ar" ? c.routeAr : c.route}</div>
              <div style={{ fontSize: 13, color: c.unread > 0 ? C.ink : C.inkL, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: c.unread > 0 ? 600 : 400 }}>{lang === "ar" ? c.lastAr : c.last}</div>
            </div>
            {c.unread > 0 && <span style={{ background: C.red, color: "#fff", fontSize: 10, fontWeight: 800, width: 21, height: 21, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, alignSelf: "center" }}>{c.unread}</span>}
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   ADMIN
══════════════════════════════════════ */
const AdminPage = ({ t, lang }) => {
  const [tab, setTab] = useState("overview");
  return (
    <div dir={t.dir} style={{ fontFamily: t.font, paddingBottom: 100 }}>
      <div style={{ background: GP, padding: "28px 18px 20px", borderBottom: `1px solid ${C.redBorder}` }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: C.ink }}>{t.adminTitle}</div>
        <div style={{ height: 3, width: 50, background: G, borderRadius: 2, marginTop: 8 }} />
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ background: C.greenPale, border: `1.5px solid ${C.greenBorder}`, borderRadius: 12, padding: 13, marginBottom: 14, fontSize: 13, color: C.green, lineHeight: 1.55, fontWeight: 600 }}>
          ✓ {t.freePromoNote}<br />
          <span style={{ fontWeight: 400, color: C.inkM }}>{t.stripeNote}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
          {[["286", t.members, C.red, C.redPale, C.redBorder], ["34", t.activeTrips, C.green, C.greenPale, C.greenBorder], ["5", t.pendingID, C.amber, C.amberPale, C.amberBorder], [lang === "ar" ? "مجاني" : "Free", t.revenue, C.blue, C.bluePale, C.blueBorder]].map(([v, l, col, bg, bdr]) => (
            <div key={l} style={{ background: bg, borderRadius: 14, padding: 16, border: `1.5px solid ${bdr}` }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: col }}>{v}</div>
              <div style={{ fontSize: 11, color: col, textTransform: "uppercase", letterSpacing: 1, marginTop: 2, fontWeight: 700 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto", paddingBottom: 3 }}>
          {["overview", "members", "trips"].map(tb => (
            <button key={tb} onClick={() => setTab(tb)} style={{ padding: "7px 16px", borderRadius: 20, border: tab === tb ? "none" : `1.5px solid ${C.border}`, cursor: "pointer", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap", background: tab === tb ? G : C.white, color: tab === tb ? "#fff" : C.inkM, boxShadow: tab === tb ? "0 3px 12px rgba(232,41,74,.25)" : C.shadow }}>{tb.charAt(0).toUpperCase() + tb.slice(1)}</button>
          ))}
        </div>
        {tab === "overview" && (
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 12 }}>{lang === "ar" ? "طلبات التحقق" : "ID Verifications"}</div>
            {[{ n: "Tom Reid", e: "tom@email.com", d: "10 Mar 2026", p: PHOTOS.d3 }].map((u, i) => (
              <Card key={i} style={{ padding: 14, marginBottom: 10, display: "flex", gap: 11, alignItems: "center" }}>
                <img src={u.p} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover" }} />
                <div style={{ flex: 1 }}><div style={{ fontWeight: 700, color: C.ink }}>{u.n}</div><div style={{ fontSize: 12, color: C.inkL }}>{u.e} · {u.d}</div></div>
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn v="green" small>✓</Btn>
                  <Btn v="soft" small>✗</Btn>
                </div>
              </Card>
            ))}
          </div>
        )}
        {tab === "members" && [
          { n: "Yasmine A.", nAr: "ياسمين أ.", e: "yasmine@email.com", type: "offerer", p: PHOTOS.d2 },
          { n: "Omar M.", nAr: "عمر م.", e: "omar@email.com", type: "finder", p: PHOTOS.d3 },
          { n: "Nadia R.", nAr: "ناديا ر.", e: "nadia@email.com", type: "finder", p: PHOTOS.d4 },
          { n: "Khalid M.", nAr: "خالد م.", e: "khalid@email.com", type: "offerer", p: PHOTOS.d1 },
        ].map((u, i) => (
          <Card key={i} style={{ padding: 13, marginBottom: 10, display: "flex", gap: 11, alignItems: "center" }}>
            <img src={u.p} style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: C.ink, fontSize: 14 }}>{lang === "ar" ? u.nAr : u.n}</div>
              <div style={{ fontSize: 11, color: C.inkL }}>{u.e}</div>
              <Tag label={u.type === "offerer" ? (lang === "ar" ? "صاحب مقعد" : "Seat offerer") : (lang === "ar" ? "باحث عن مقعد" : "Seat seeker")} color={u.type === "offerer" ? C.green : C.blue} bg={u.type === "offerer" ? C.greenPale : C.bluePale} />
            </div>
          </Card>
        ))}
        {tab === "trips" && TRIPS_DATA.map((x, i) => (
          <Card key={i} style={{ marginBottom: 10, overflow: "hidden" }}>
            <div style={{ height: 3, background: x.seats === 0 ? C.border : G }} />
            <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, fontSize: 15 }}>{lang === "ar" ? x.fromAr : x.from} → {lang === "ar" ? x.toAr : x.to}</div><div style={{ fontSize: 12, color: C.inkL }}>{lang === "ar" ? x.nameAr : x.name} · {x.date}</div></div>
              <div style={{ display: "flex", gap: 6, flexDirection: "column", alignItems: "flex-end" }}>
                <Tag label={x.seats === 0 ? (lang === "ar" ? "مكتمل" : "Full") : (lang === "ar" ? "نشط" : "Active")} color={x.seats === 0 ? C.amber : C.green} bg={x.seats === 0 ? C.amberPale : C.greenPale} />
                <Btn v="soft" small>Remove</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   LEGAL
══════════════════════════════════════ */
const LegalPage = ({ sub, setPage, t, lang }) => {
  const pages = {
    terms: { title: t.termsTitle, sections: [["What is Movo?", "Movo is a free platform that connects people who have spare seats in their own vehicles with people who need a ride. Movo is NOT a taxi service and does NOT provide transport services."], ["No Payments Through the App", "Movo does not process any payments. Cost sharing is arranged directly and privately between the seat offerer and the seat requester. Movo has no involvement in financial transactions."], ["Free Period", "Movo is completely free to use for the first 3 months from launch in Egypt. No subscription fees, no service charges."], ["User Responsibilities", "Seat offerers are private individuals. They are responsible for their vehicle, insurance, and compliance with all applicable laws. Users must be 18 or over."]] },
    privacy: { title: t.privacyTitle, sections: [["Data We Collect", "Name, email address, and location data via OpenStreetMap. No payment data is stored (as Movo processes no payments)."], ["GDPR", "Contact privacy@movo.app to access, correct, or delete your data at any time."]] },
    refund: { title: t.refundTitle, sections: [["Trip Cancellation", "If you request a seat and need to cancel, message the seat offerer directly through the app as soon as possible."], ["No Refunds Policy", "Since Movo does not process payments, there are no refunds through the app. Any cost sharing arrangements are between the users directly."]] },
    cookies: { title: t.cookiesTitle, sections: [["Essential", "Authentication and session cookies only. Cannot be disabled."], ["Maps", "OpenStreetMap tiles for route display. No personal tracking cookies."]] },
  };
  const c = pages[sub] || pages.terms;
  return (
    <div dir={t.dir} style={{ fontFamily: t.font, paddingBottom: 140 }}>
      <div style={{ background: GP, padding: "28px 18px 20px", borderBottom: `1px solid ${C.redBorder}` }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: C.ink }}>{c.title}</div>
        <div style={{ fontSize: 11, color: C.inkL, marginTop: 6 }}>{t.legalUpdated}</div>
      </div>
      <div style={{ padding: 16 }}>
        {c.sections.map(([ti, bo]) => (
          <Card key={ti} style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.ink, marginBottom: 8 }}>{ti}</div>
            <p style={{ fontSize: 13, color: C.inkM, lineHeight: 1.75, margin: 0 }}>{bo}</p>
          </Card>
        ))}
      </div>
      <div style={{ position: "fixed", bottom: 56, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "rgba(250,250,248,.97)", borderTop: `1px solid ${C.border}`, padding: "8px 14px", display: "flex", gap: 8, overflowX: "auto", zIndex: 200, boxShadow: "0 -4px 14px rgba(0,0,0,.05)" }}>
        {[["terms", t.terms], ["privacy", t.privacy], ["refund", t.refund], ["cookies", t.cookies]].map(([id, lbl]) => (
          <button key={id} onClick={() => setPage("legal_" + id)} style={{ padding: "6px 14px", borderRadius: 16, border: sub === id ? "none" : `1.5px solid ${C.border}`, cursor: "pointer", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap", background: sub === id ? G : C.white, color: sub === id ? "#fff" : C.inkM, fontFamily: t.font }}>{lbl}</button>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
const Toast = ({ msg, onDone }) => {
  useEffect(() => { const tm = setTimeout(onDone, 3200); return () => clearTimeout(tm); }, []);
  return (
    <div className="fu" style={{ position: "fixed", bottom: 88, left: "50%", transform: "translateX(-50%)", background: C.white, border: `1.5px solid ${C.redBorder}`, color: C.ink, padding: "12px 20px", borderRadius: 14, fontSize: 14, fontWeight: 600, boxShadow: C.shadowL, zIndex: 2000, whiteSpace: "nowrap", maxWidth: "90vw", display: "flex", alignItems: "center", gap: 9 }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: G, flexShrink: 0, display: "inline-block" }} />
      {msg}
    </div>
  );
};

/* ══════════════════════════════════════
   ROOT APP
══════════════════════════════════════ */
export default function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const mapReady = useLeaflet();
  const t = T[lang];
  const unread = MOCK_CONVS.reduce((s, c) => s + c.unread, 0);

  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  const showToast = (msg) => setToast(msg);

  const handleLogin = (u) => {
    setUser(u);
    showToast(t.toastLogin);
    go("home");
  };
  const handleSignup = (u) => {
    setUser(u);
    showToast(t.toastSignup);
    go("home");
  };

  const subPage = page.startsWith("legal_") ? page.replace("legal_", "") : "terms";

  return (
    <div style={{ fontFamily: t.font, background: C.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto", position: "relative", direction: t.dir }}>
      <GS />
      <Header setPage={go} user={user} setUser={setUser} lang={lang} setLang={setLang} t={t} unread={unread} />

      <div style={{ paddingBottom: page.startsWith("legal") ? 120 : 80 }}>
        {page === "home"        && <Home setPage={go} user={user} mapReady={mapReady} t={t} lang={lang} />}
        {page === "search"      && <SearchPage setPage={go} mapReady={mapReady} t={t} lang={lang} setSelectedTrip={setSelectedTrip} />}
        {page === "trip-detail" && <TripDetail trip={selectedTrip} setPage={go} mapReady={mapReady} t={t} lang={lang} showToast={showToast} />}
        {page === "offer"       && <OfferPage mapReady={mapReady} t={t} lang={lang} showToast={showToast} />}
        {page === "trips"       && <MyTripsPage setPage={go} mapReady={mapReady} t={t} lang={lang} />}
        {page === "messages"    && <MessagesPage t={t} lang={lang} />}
        {page === "auth"        && <LoginPage onLogin={handleLogin} setPage={go} t={t} lang={lang} />}
        {page === "signup"      && <SignupPage onLogin={handleSignup} setPage={go} t={t} lang={lang} />}
        {page === "admin"       && <AdminPage t={t} lang={lang} />}
        {page.startsWith("legal") && <LegalPage sub={subPage} setPage={go} t={t} lang={lang} />}
      </div>

      <Nav page={page} setPage={go} user={user} t={t} unread={unread} />
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      <SpeedInsights />
    </div>
  );
}
