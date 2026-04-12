import { FlipBook, FlipPage, PageShell, SectionTitle, BookItem, BGL, BGR, GOLD, DIM } from "./FlipBook";

/* ─── Cloudinary images ──────────────────────────────────── */
const FOOD_IMG = "https://res.cloudinary.com/dave3np5n/image/upload/v1773117269/IMG_1000_wumeqn.jpg";
const BITE_IMG = "https://res.cloudinary.com/dave3np5n/image/upload/v1773117264/IMG_0998_2_vtglwe.jpg";

/* ─── Cover ──────────────────────────────────────────────── */
const CoverPage = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div style={{ position: "relative", flex: "0 0 45%", overflow: "hidden" }}>
      <img src={FOOD_IMG} alt="Quaff food" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${BGL})` }} />
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 20px" }}>
      <img src="/logo-quaff.png" alt="Quaff" style={{ height: 40, objectFit: "contain", marginBottom: 14 }} />
      <h2 style={{ fontStyle: "italic", fontSize: "1.9rem", color: GOLD, margin: 0 }}>Food Menu</h2>
      <p style={{ fontSize: 11, color: DIM, marginTop: 6, marginBottom: 0 }}>Cyber Hub · Gurugram</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
        <div style={{ height: 1, width: 40, background: `${GOLD}50` }} />
        <span style={{ fontSize: 10, color: "hsla(40,20%,95%,0.25)" }}>EST. December 2015</span>
        <div style={{ height: 1, width: 40, background: `${GOLD}50` }} />
      </div>
    </div>
    <div style={{ padding: "6px 20px", borderTop: "1px solid hsla(40,20%,95%,0.05)", textAlign: "center" }}>
      <span style={{ color: "hsla(40,20%,95%,0.2)", fontSize: 10 }}>1</span>
    </div>
  </div>
);

/* ─── Welcome ────────────────────────────────────────────── */
const WelcomePage = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "20px 20px 0" }}>
    <h2 style={{ fontStyle: "italic", fontSize: "1.2rem", color: GOLD, marginBottom: 12, marginTop: 0 }}>Welcome to Quaff Brewing Co.</h2>
    <p style={{ fontSize: 12, color: "hsla(40,20%,95%,0.7)", lineHeight: 1.6, marginBottom: 12 }}>
      Prepare to embark on a remarkable gastronomic journey with our meticulously curated food menu. Our offerings span continents — from aromatic Indian curries to Korean bao, crispy dim sum to wood-fired pizza.
    </p>
    <p style={{ fontSize: 12, color: "hsla(40,20%,95%,0.7)", lineHeight: 1.6, marginBottom: 16 }}>
      Every dish tells a story. We invite you to savor, share, and celebrate food the Quaff way.
    </p>
    <div style={{ flex: 1, borderRadius: 10, overflow: "hidden" }}>
      <img src={BITE_IMG} alt="Quaff bites" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <p style={{ fontSize: 10, color: "hsla(40,20%,95%,0.22)", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
      ● Green badge denotes Vegetarian · All prices in ₹ · +10% service charge applicable
    </p>
    <div style={{ padding: "6px 0", borderTop: "1px solid hsla(40,20%,95%,0.05)", textAlign: "center", marginTop: 6 }}>
      <span style={{ color: "hsla(40,20%,95%,0.2)", fontSize: 10 }}>2</span>
    </div>
  </div>
);

/* ─── Back cover ─────────────────────────────────────────── */
const BackCover = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
    <img src="/logo-quaff.png" alt="Quaff" style={{ height: 48, objectFit: "contain", marginBottom: 18, filter: "brightness(0.5)" }} />
    <p style={{ fontStyle: "italic", fontSize: "1rem", color: "hsla(40,20%,95%,0.25)", textAlign: "center", margin: 0 }}>Crafted with love in Gurgaon</p>
    <div style={{ marginTop: 24, textAlign: "center" }}>
      <p style={{ fontSize: 10, color: "hsla(40,20%,95%,0.15)", marginBottom: 4 }}>Government taxes as applicable · (V) denotes Vegetarian</p>
      <p style={{ fontSize: 10, color: "hsla(40,20%,95%,0.15)" }}>Alcoholic beverages not served to persons below 21 years</p>
    </div>
  </div>
);

/* ─── Menu pages ─────────────────────────────────────────── */

const QuickMunchPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle>Quick Munch</SectionTitle>
    {[
      { name: "Peri Peri Fries", price: "275", veg: true },
      { name: "Herbed Potato Wedges", price: "395", veg: true },
      { name: "Crispy Onion Rings", price: "395", veg: true },
      { name: "Mexican Loaded Nachos", desc: "Add chicken @ ₹95", price: "475", veg: true },
      { name: "Cheesy Garlic Bread", desc: "Mozzarella & cheddar toasted garlic bread", price: "395", veg: true },
      { name: "Peanut Masala", price: "375", veg: true },
      { name: "Sweet Corn Salsa Mix", price: "375", veg: true },
      { name: "Chowpati Bhelpuri", price: "345", veg: true },
      { name: "Black Chana Chaat", price: "345", veg: true },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const SaladPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle>Salad</SectionTitle>
    {[
      { name: "Orange Beetroot Feta Salad", desc: "Cucumber, tomatoes, olives, peppers & feta", price: "445", veg: true },
      { name: "Greek Salad", price: "395", veg: true },
      { name: "Classic Caesar Salad", desc: "Add chicken @ ₹100", price: "395", veg: true },
      { name: "Smoked Chicken Salad", price: "445" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const SoupsBaoPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle>Soups</SectionTitle>
    {[
      { name: "Manchow", desc: "Add chicken @ ₹50", price: "295", veg: true },
      { name: "Lemon Coriander", desc: "Add chicken @ ₹50", price: "295", veg: true },
      { name: "Tom Yum", desc: "Add chicken @ ₹50 · prawns @ ₹145", price: "295", veg: true },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle style={{ marginTop: 14 }}>Korean Bao</SectionTitle>
    {[
      { name: "Spicy Cottage Cheese Bao", desc: "Tangy & crispy cottage cheese bao with spicy mayo", price: "585", veg: true },
      { name: "Congee Shitake Mushroom Bao", desc: "Mushroom julienne with soy dressing", price: "585", veg: true },
      { name: "Classic Chicken Bao", desc: "Korean open bao tossed with chicken", price: "645" },
      { name: "Prawn Tempura with Sweet Chilli", price: "795" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const DimSumPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="6 pcs per serving">Dim Sum</SectionTitle>
    {[
      { name: "Spinach Cheese & Corn Dim Sum", price: "585", veg: true },
      { name: "Loaded Potato Skins", price: "585", veg: true },
      { name: "Gyoza Veg Dim Sum", price: "585", veg: true },
      { name: "Five Spice Veg Dim Sum", price: "585", veg: true },
      { name: "Chicken Chilli Oil", price: "625" },
      { name: "Gyoza Chicken Dim Sum", price: "625" },
      { name: "Five Spice Chicken Dim Sum", price: "625" },
      { name: "Mixed Dim Sum Basket", desc: "8 pcs · 3 kinds Veg / Chicken", price: "595 / 655" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const WingsPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="₹655 · 8 pcs">House of Wings</SectionTitle>
    {[
      { name: "Peri Peri Chicken Wings", desc: "Spicy wings with Peri Peri seasoning", price: "655" },
      { name: "BBQ Chicken Wings", desc: "Classic wings with BBQ sauce", price: "655" },
      { name: "Seven Spice Chicken Wings", desc: "Marinated with Asian seven spices", price: "655" },
      { name: "Hot Garlic Chicken Wings", price: "655" },
      { name: "Jamaican Chicken Wings", desc: "Tossed with Jamaican spices", price: "655" },
      { name: "Jerk Chicken Wings", desc: "Oven roasted with jerk spices", price: "655" },
      { name: "Tandoori Chicken Wings", price: "655" },
      { name: "Chicken Wings Thai Birds Eye", desc: "Garlic, fresh chilies & basil", price: "655" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const SharingVegIntlPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="International">Sharing Plates · Vegetarian</SectionTitle>
    {[
      { name: "Cheese Balls", price: "585", veg: true },
      { name: "Peri Peri Cottage Cheese", price: "585", veg: true },
      { name: "Loaded Potato Skins", price: "585", veg: true },
      { name: "Cottage Cheese Quesadilla", price: "585", veg: true },
      { name: "Habibi Falafel Pocket", desc: "Falafel stuffed pita with garlic mayo", price: "585", veg: true },
      { name: "Veg Mezze Platter", desc: "Tzatziki, baba ganoush, beetroot hummus, arabo pide, shish taouk", price: "895", veg: true },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const SharingVegAsianPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="Asian">Sharing Plates · Vegetarian</SectionTitle>
    {[
      { name: "The Pepper Crunch Lotus Stems", price: "585", veg: true },
      { name: "Honey Chilli Potato", price: "585", veg: true },
      { name: "Vegetable Manchurian Dry", price: "585", veg: true },
      { name: "Crispy Style Veg Salt & Pepper", price: "585", veg: true },
      { name: "Hill Station Spring Roll", price: "585", veg: true },
      { name: "Chilli Paneer Delhi Style", price: "585", veg: true },
      { name: "Crispy Corn Chilli Pepper", price: "595", veg: true },
      { name: "Chilli Shiitake Mushroom", price: "595", veg: true },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const SharingVegIndianPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="Indian">Sharing Plates · Vegetarian</SectionTitle>
    {[
      { name: "Mushroom Ghee Roast", desc: "Mangalorean style", price: "585", veg: true },
      { name: "Tandoori Broccoli", price: "585", veg: true },
      { name: "Tandoori Soya Chaap", desc: "Malai / Masala", price: "585", veg: true },
      { name: "Beetroot & Walnut Kebab", price: "585", veg: true },
      { name: "Achari Paneer Tikka", price: "585", veg: true },
      { name: "Tandoori Stuffed Mushroom", price: "585", veg: true },
      { name: "Dahi Cutlets", price: "395", veg: true },
      { name: "Tandoori Veg Platter", desc: "3 pcs each of tandoori broccoli, beetroot kebab, paneer tikka & soya chaap", price: "995", veg: true },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const SharingNVIntlPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="International">Sharing Plates · Non Vegetarian</SectionTitle>
    {[
      { name: "Peri Peri Chicken Skewers", price: "655" },
      { name: "Smoked Chicken Quesadilla", price: "655" },
      { name: "Boneless Crispy Chicken Strips", desc: "With cheese chilli dip", price: "655" },
      { name: "Habibi Chicken Pocket", desc: "Chicken stuffed pita with garlic mayo", price: "655" },
      { name: "Loaded Potato Skin", price: "655" },
      { name: "Herb Crusted Fish Fingers", desc: "With tartar sauce", price: "875" },
      { name: "Golden Fried Prawns", price: "995" },
      { name: "Non Veg Mezze Platter", desc: "Tzatziki, baba ganoush, beetroot hummus, arabo pide, shish taouk", price: "995" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const SharingNVAsianPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="Asian">Sharing Plates · Non Vegetarian</SectionTitle>
    {[
      { name: "Mildly Smoked Fried Chicken", price: "655" },
      { name: "Chilli Chicken", price: "655" },
      { name: "Chicken Manchurian Dry", price: "655" },
      { name: "Chicken Lollipop", price: "655" },
      { name: "Chicken Satay", price: "655" },
      { name: "Traditional Crispy Lamb", desc: "Spring onion & bell peppers", price: "655" },
      { name: "Chilli Fish", price: "875" },
      { name: "Crispy Fish in Schezwan Style", price: "875" },
      { name: "Hot Garlic Prawns", price: "995" },
      { name: "Golden Fried Prawns", price: "995" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const SharingNVIndianPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="Indian">Sharing Plates · Non Vegetarian</SectionTitle>
    {[
      { name: "Ghee Roast Chicken / Mutton", desc: "Mangalorean style", price: "655 / 745" },
      { name: "Chicken Tikka", price: "655" },
      { name: "Murg Malai Tikka", price: "655" },
      { name: "Charcoal Black Soft & Spicy Chicken", price: "655" },
      { name: "Tangri Kebab", price: "655" },
      { name: "Chicken Seekh Kebab", price: "655" },
      { name: "Mutton Seekh Kebab", price: "695" },
      { name: "River Sole Fish Tikka", price: "875" },
      { name: "Amritsari Fish Fry", price: "875" },
      { name: "Tandoori Prawns", price: "995" },
      { name: "Tandoori Non Veg Platter", desc: "3 pcs each: chicken tikka, mutton seekh, fish tikka & murg malai tikka", price: "1195" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const MainIndianPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="Indian">Main Course</SectionTitle>
    {[
      { name: "Paneer Tikka Masala", price: "595", veg: true },
      { name: "Paneer Butter Masala", price: "595", veg: true },
      { name: "Kadhai Paneer", price: "595", veg: true },
      { name: "Mushroom Do Pyaza", desc: "With onions & range of spices", price: "595", veg: true },
      { name: "Mix Vegetable", price: "525", veg: true },
      { name: "Dal Tadka", price: "495", veg: true },
      { name: "Dal Makhani", price: "595", veg: true },
      { name: "Butter Chicken", price: "695" },
      { name: "Chicken Tikka Masala", price: "645" },
      { name: "Mutton Rogan Josh", price: "745" },
      { name: "Rara Gosht", price: "745" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const MainIntlPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="International">Main Course</SectionTitle>
    {[
      { name: "Cottage Cheese Skewers", desc: "Basil rice, grilled vegetables & tomato basil sauce", price: "595", veg: true },
      { name: "Lasagne", desc: "Add chicken @ ₹100 · Layered with vegetables, mozzarella & tomato basil sauce", price: "595", veg: true },
      { name: "Grilled Chicken Breast", desc: "Mash potatoes, house salad & mushroom sauce", price: "645" },
      { name: "Fish N Chips", desc: "House salad, fries & tartar sauce", price: "875" },
      { name: "Grilled Fish", desc: "Sautéed vegetables, tomato rice & lemon butter sauce", price: "875" },
      { name: "Grilled Prawns", desc: "Sautéed vegetables, tomato rice & garlic butter sauce", price: "995" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const MainAsianPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="Asian · Served with steamed rice / egg noodles">Main Course</SectionTitle>
    {[
      { name: "Black Pepper Sauce", desc: "Veg / Chicken / Fish / Prawns", price: "595 / 695 / 795 / 995" },
      { name: "Black Bean Sauce", desc: "Veg / Chicken / Fish / Prawns", price: "595 / 695 / 795 / 995" },
      { name: "Schezwan Sauce", desc: "Veg / Chicken / Fish / Prawns", price: "595 / 695 / 795 / 995" },
      { name: "Hot Garlic Sauce", desc: "Veg / Chicken / Fish / Prawns", price: "595 / 695 / 795 / 995" },
      { name: "Manchurian", desc: "Veg / Chicken / Fish / Prawns", price: "595 / 695 / 795 / 995" },
      { name: "Khao Suey", desc: "Veg / Chicken / Prawn", price: "595 / 695 / 995" },
      { name: "Thai Green / Red Curry", desc: "With basil rice · Add chicken @ ₹100", price: "595", veg: true },
      { name: "Pan Fried Noodles", desc: "Add chicken @ ₹100 · Add prawns @ ₹295", price: "595", veg: true },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const PizzaPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="100% fresh buffalo mozzarella">Thin Crust Pizza</SectionTitle>
    {[
      { name: "Margherita", price: "645", veg: true },
      { name: "Traditional Farmhouse", desc: "Fresh vegetables & olives", price: "695", veg: true },
      { name: "Funghi Bianca", desc: "Mushroom, truffles & white sauce", price: "745", veg: true },
      { name: "Four Cheese", desc: "Mozzarella, cheddar, parmesan & edam", price: "745", veg: true },
      { name: "Chicken Peri Peri", price: "745" },
      { name: "Smoky Chicken", price: "745" },
      { name: "Fiery Chicken Pizza", price: "795" },
      { name: "Pepperoni", price: "795" },
      { name: "Fully Loaded Meat Pizza", desc: "Smoked chicken, pepperoni, sausage & crispy bacon", price: "795" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const PastaRicePage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="Choice of pasta: spaghetti / penne">Pasta</SectionTitle>
    {[
      { name: "Create Your Own Pasta", desc: "Veg / Chicken / Shrimp · Alfredo / arrabbiata / mixed", price: "595 / 695 / 795", veg: true },
      { name: "Pasta Aglio Olio", desc: "Spaghetti with veggies & sun-dried tomatoes in garlic & olive oil", price: "595", veg: true },
      { name: "Spaghetti Cherry Tomato Stew", desc: "Veg / Chicken / Shrimp", price: "595 / 695 / 795", veg: true },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle style={{ marginTop: 14 }}>Rice & Biryani</SectionTitle>
    {[
      { name: "Rice", desc: "Plain / Vegetable / Chicken / Shrimps", price: "275 / 395 / 495 / 595" },
      { name: "Noodles", desc: "Plain / Vegetable / Chicken / Shrimps", price: "275 / 395 / 495 / 595" },
      { name: "Biryani", desc: "Vegetable / Chicken / Mutton · With mirchi ka salan & raita", price: "495 / 595 / 695" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle style={{ marginTop: 14 }}>Bread</SectionTitle>
    {[
      { name: "Tandoori Roti", price: "95", veg: true },
      { name: "Naan", desc: "Plain, butter / garlic", price: "135 / 155", veg: true },
      { name: "Lachha Paratha", price: "145", veg: true },
      { name: "Kulcha", desc: "Aloo / Mix / Paneer", price: "175 / 185 / 195", veg: true },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle style={{ marginTop: 14 }}>Desserts</SectionTitle>
    {[
      { name: "Baked Gulab Jamun", price: "345", veg: true },
      { name: "Chocolate Brownie Sizzler", desc: "With vanilla ice cream", price: "425", veg: true },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

/* ─── Build pages array ──────────────────────────────────── */
const buildPages = (): FlipPage[] => [
  { node: <CoverPage />, bg: BGL },
  { node: <WelcomePage />, bg: BGR },
  { node: <QuickMunchPage num={3} />, bg: BGL },
  { node: <SaladPage num={4} />, bg: BGR },
  { node: <SoupsBaoPage num={5} />, bg: BGL },
  { node: <DimSumPage num={6} />, bg: BGR },
  { node: <WingsPage num={7} />, bg: BGL },
  { node: <SharingVegIntlPage num={8} />, bg: BGR },
  { node: <SharingVegAsianPage num={9} />, bg: BGL },
  { node: <SharingVegIndianPage num={10} />, bg: BGR },
  { node: <SharingNVIntlPage num={11} />, bg: BGL },
  { node: <SharingNVAsianPage num={12} />, bg: BGR },
  { node: <SharingNVIndianPage num={13} />, bg: BGL },
  { node: <MainIndianPage num={14} />, bg: BGR },
  { node: <MainIntlPage num={15} />, bg: BGL },
  { node: <MainAsianPage num={16} />, bg: BGR },
  { node: <PizzaPage num={17} />, bg: BGL },
  { node: <PastaRicePage num={18} />, bg: BGR },
  { node: <BackCover />, bg: BGL },
];

const FOOD_PAGES = buildPages();

const FoodMenuBook = () => <FlipBook pages={FOOD_PAGES} />;

export default FoodMenuBook;
