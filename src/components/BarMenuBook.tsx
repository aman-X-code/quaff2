import { FlipBook, FlipPage, PageShell, SectionTitle, BookItem, BGL, BGR, GOLD, DIM } from "./FlipBook";

/* ─── Cloudinary assets ──────────────────────────────────── */
const BAR_IMG = "https://res.cloudinary.com/dave3np5n/image/upload/v1773117270/IMG_0998_h1zegt.jpg";
const BEER_IMG = "https://res.cloudinary.com/dave3np5n/image/upload/v1773117272/IMG_0970_2_h11ttp.jpg";

/* ─── Cover page ─────────────────────────────────────────── */
const CoverPage = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div style={{ position: "relative", flex: "0 0 45%", overflow: "hidden" }}>
      <img src={BAR_IMG} alt="Quaff bar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${BGL})` }} />
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 20px" }}>
      <img src="/logo-quaff.png" alt="Quaff" style={{ height: 40, objectFit: "contain", marginBottom: 14 }} />
      <h2 style={{ fontStyle: "italic", fontSize: "1.9rem", color: GOLD, margin: 0, letterSpacing: "-0.02em" }}>Bar Menu</h2>
      <p style={{ fontSize: 11, color: DIM, marginTop: 6, marginBottom: 0 }}>Cyber Hub · Gurugram</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
        <div style={{ height: 1, width: 40, background: `${GOLD}50` }} />
        <span style={{ fontSize: 10, color: "hsla(40,20%,95%,0.25)" }}>EST. December 2015</span>
        <div style={{ height: 1, width: 40, background: `${GOLD}50` }} />
      </div>
      <p style={{ fontSize: 10, color: "hsla(40,20%,95%,0.2)", marginTop: 4, marginBottom: 0 }}>Award Winning Microbrewery</p>
    </div>
    <div style={{ padding: "6px 20px", borderTop: "1px solid hsla(40,20%,95%,0.05)", textAlign: "center" }}>
      <span style={{ color: "hsla(40,20%,95%,0.2)", fontSize: 10 }}>1</span>
    </div>
  </div>
);

/* ─── Welcome page ───────────────────────────────────────── */
const WelcomePage = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "20px 20px 0" }}>
    <h2 style={{ fontStyle: "italic", fontSize: "1.2rem", color: GOLD, marginBottom: 12, marginTop: 0 }}>
      Welcome to Quaff
    </h2>
    <p style={{ fontSize: 12, color: "hsla(40,20%,95%,0.7)", lineHeight: 1.6, marginBottom: 12 }}>
      Quaff Brewing Co. is Gurgaon's award-winning microbrewery — a place where hand-crafted brews meet premium
      spirits, world-class cocktails, and unforgettable atmospheres.
    </p>
    <p style={{ fontSize: 12, color: "hsla(40,20%,95%,0.7)", lineHeight: 1.6, marginBottom: 16 }}>
      Our bar team has been recognised as the <strong style={{ color: GOLD }}>Best Microbrewery</strong> for
      6 consecutive years. Every sip is designed to delight.
    </p>
    <div style={{ flex: 1, borderRadius: 10, overflow: "hidden" }}>
      <img src={BEER_IMG} alt="Quaff brews" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <p style={{ fontSize: 10, color: "hsla(40,20%,95%,0.22)", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
      All prices in ₹ · +10% service charge applicable · Must be 21+ to consume alcohol
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
    <p style={{ fontSize: 11, color: "hsla(40,20%,95%,0.18)", marginTop: 6, textAlign: "center" }}>DLF Cyber Hub & Eros City Square</p>
    <div style={{ marginTop: 24, textAlign: "center" }}>
      <p style={{ fontSize: 10, color: "hsla(40,20%,95%,0.15)", marginBottom: 4 }}>+91 96546 59050 · +91 70598 00007</p>
      <p style={{ fontSize: 10, color: "hsla(40,20%,95%,0.15)", marginBottom: 4 }}>Quaff@vegahospitality.co.in</p>
      <p style={{ fontSize: 10, color: "hsla(40,20%,95%,0.12)", marginTop: 12 }}>© 2026 Quaff Brewing Co. All rights reserved.</p>
    </div>
  </div>
);

/* ─── Page content components ────────────────────────────── */

const SignatureCocktails = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle>Signature Cocktails</SectionTitle>
    {[
      { name: "Forever", desc: "Aperol, Orange juice, Ginger ale", price: "649" },
      { name: "Kiwi & Basil Martini", desc: "Gin, Kiwi, Basil, Muddled and Shaken", price: "649" },
      { name: "GiPro", desc: "Gin, Rose Mary, Ginger ale", price: "649" },
      { name: "Patience", desc: "Gin, Green Apple, Cucumber, Basil Leaves, Lime Juice, Simple Syrup, Elderflowers", price: "649" },
      { name: "Diligence", desc: "Jim Beam, Martini Rosso, Laphroaig, Angostura, Truffle", price: "649" },
      { name: "Liberty", desc: "Vodka, Grapefruit Juice, Star Anise, Cinnamon, Ginger Ale", price: "649" },
      { name: "Humility", desc: "Gin, Raspberry, Strawberry, Basil, Blueberry, Lime, (Optional: Egg White)", price: "649" },
      { name: "Grapefruit Martini", desc: "Gin, Orange Marmalade & Grapefruit Juice", price: "649" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle sub="Aperitifs · 60ml" style={{ marginTop: 14 }}>Aperitifs</SectionTitle>
    {[
      { name: "Martini Bianco", price: "399" },
      { name: "Martini Dry", price: "399" },
      { name: "Pernod", price: "399" },
      { name: "Ricard", price: "399" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const AllTimeClassics = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle>All Time Classics</SectionTitle>
    {[
      { name: "Jim Beam Highball", desc: "Classic / Lime & Mint / Orange / Cranberry", price: "599" },
      { name: "Cosmopolitan", desc: "Vodka, Triple sec, Cranberry juice, Lime Juice", price: "599" },
      { name: "Margarita", desc: "Tequila, triple sec & lime juice", price: "599" },
      { name: "Old Fashioned", desc: "Jim Beam, Simple Syrup, Angostura", price: "649" },
      { name: "Negroni", desc: "Gin, Sweet Vermouth, Campari", price: "649" },
      { name: "Sangria", desc: "Vodka, Citrus fruits, Wine, Brandy, Triple sec", price: "749" },
      { name: "Hot Toddy", desc: "Whisky, honey, cinnamon, cloves", price: "699" },
      { name: "Picante", desc: "Trending tequila cocktail", price: "699" },
      { name: "Ginger Honey Jack", desc: "Jack Daniel's Tennessee Honey, Ginger Ale", price: "699" },
      { name: "Manhattan", desc: "Rye Whisky, Sweet Vermouth & Bitters", price: "699" },
      { name: "Aperol Spritz", desc: "Aperol, Sparkling Wine, Ounce of Club Soda", price: "699" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const LIITPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="500ml per serve · ₹849">LIIT Collection</SectionTitle>
    {[
      { name: "Traditional", desc: "Vodka, Gin, Rum, Triple Sec, Tequila, Sweet n Sour, Splash of Sprite", price: "849" },
      { name: "Grateful Dead", desc: "Vodka, Gin, Rum, Triple Sec, Cherry, Sweet n Sour, Splash of Sprite", price: "849" },
      { name: "Tokyo Tea", desc: "Vodka, Gin, Rum, Triple Sec, Midori, Sweet n Sour, Splash of Sprite", price: "849" },
      { name: "Adios M.F.", desc: "Vodka, Gin, Rum, Blue Curacao, Sweet n Sour, Splash of Sprite", price: "849" },
      { name: "Texas Tea", desc: "Vodka, Gin, Rum, Triple Sec, Tequila, Whisky, Sweet n Sour, Splash of Sprite", price: "849" },
      { name: "Georgia Peach", desc: "Vodka, Gin, Rum, Triple Sec, Peach Schnapps, Sweet n Sour, Splash of Sprite", price: "849" },
      { name: "Sex With Satan", desc: "Vodka, Gin, Rum, Triple Sec, Cherry Brandy, Sweet n Sour, Splash of Coke", price: "849" },
      { name: "Boston Tea Party", desc: "Vodka, Gin, Rum, Triple Sec, Amaretto, Sweet n Sour, Splash of Coke", price: "849" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const ShootersPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="Shot / 6-Shot pricing">Shooters</SectionTitle>
    {[
      { name: "Baileys Irish Cream Frappe", price: "399 / 3199" },
      { name: "Jagermeister", price: "399 / 3199" },
      { name: "B52", desc: "Cointreau, Kahlua, Baileys", price: "549 / 2999" },
      { name: "Kamikaze", desc: "Vodka, Triple Sec & Lemon Juice", price: "549 / 2999" },
      { name: "Shot in the Head", desc: "Tequila, Vodka, Triple Sec, Cranberry & Lime Juice", price: "549 / 2999" },
      { name: "Flat Liner", price: "549 / 2999" },
      { name: "Mind Eraser", desc: "Coffee liqueur & vodka", price: "549 / 2999" },
      { name: "Brain Haemorrhage", desc: "Peach schnapps, Baileys & grenadine", price: "549 / 2999" },
      { name: "Jack Daniel's Fire", desc: "Cinnamon-flavoured whiskey served chilled", price: "549 / 2999" },
      { name: "Irish Flag", desc: "Crème de menthe, baileys & brandy", price: "549 / 2999" },
      { name: "Jagerbomb", desc: "Coffee liqueur & Red Bull", price: "699 / 3899" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const LiqueursPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle>Liqueurs</SectionTitle>
    {[
      { name: "Peach Schnapps / Cream De Casis / Triple Sec", price: "449" },
      { name: "Curacao Blue / Sambuca / Amaretto", price: "449" },
      { name: "Cointreau / Kahlua / Baileys", price: "449 – 499" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const CraftBeersPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="Brewed in-house · 330ml / 500ml / 1500ml">Quaff Craft Beers</SectionTitle>
    {[
      { name: "Blonde Ale", desc: "Light & refreshing with subtle floral aromas & a straightforward taste profile. ABV ~4.3%", price: "399 / 499 / 1449" },
      { name: "Dubbel", desc: "Moderately strong dark amber ale with hints of chocolate & caramel. ABV ~6.5%", price: "399 / 499 / 1449" },
      { name: "The Hefeweizen", desc: "German-style wheat beer with cloudy pale appearance, hints of banana and cloves. ABV ~4.7%", price: "399 / 499 / 1449" },
      { name: "India Pale Ale", desc: "Loaded with hops, floral, fruity, citrus flavours & strong in character. ABV ~5.5%", price: "399 / 499 / 1449" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle sub="330ml / 1500ml" style={{ marginTop: 14 }}>Draught Beer</SectionTitle>
    {[
      { name: "Budweiser", price: "399 / 1499" },
      { name: "Hoegaarden", price: "499 / 1999" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle sub="330ml" style={{ marginTop: 14 }}>Bottled Beer</SectionTitle>
    {[
      { name: "Budweiser", price: "429" },
      { name: "Kingfisher Ultra", price: "429" },
      { name: "Corona", price: "429" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const NonAlcPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle>Non-Alcoholic Drinks</SectionTitle>
    {[
      { name: "Banana Caramel Shake", price: "379", veg: true },
      { name: "Triple Chocolate Shake", price: "449", veg: true },
      { name: "Mix Berry Cheese Cake Shake", price: "379", veg: true },
      { name: "Bubble & Berry Shake", price: "449", veg: true },
      { name: "Butterscotch & Oreo Shake", price: "449", veg: true },
      { name: "Apple Lemonade", price: "349", veg: true },
      { name: "Detox Lemonade", price: "349", veg: true },
      { name: "Pom Cumin Lemonade", price: "349", veg: true },
      { name: "Bubble Gum Martini (NA)", price: "349", veg: true },
      { name: "Peach Iced Tea", price: "349", veg: true },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle style={{ marginTop: 14 }}>Others</SectionTitle>
    {[
      { name: "Red Bull", price: "299" },
      { name: "Perrier", price: "299" },
      { name: "Soft Beverages", price: "199" },
      { name: "Tonic Water / Ginger Ale", price: "179" },
      { name: "Bottled Water", price: "139" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const SingleMaltPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="30ml / 12×30ml bottle">Single Malt Scotch</SectionTitle>
    {[
      { name: "The Ardmore Legacy", price: "549 / 5299" },
      { name: "Bowmore 12 YO", price: "549 / 5299" },
      { name: "Bowmore 15 YO", price: "699 / 6299" },
      { name: "Aberlour 12 YO", price: "599 / 5799" },
      { name: "The Glenlivet 15 YO", price: "649 / 6299" },
      { name: "The Glenlivet 18 YO", price: "899 / 8799" },
      { name: "Glenfiddich 18 YO", price: "899 / 8799" },
      { name: "Laphroaig Select", price: "699 / 6299" },
      { name: "Taliskar 10 YO", price: "699 / 6799" },
      { name: "Cardhu 12 YO", price: "749 / 7299" },
      { name: "Oban 14 YO", price: "799 / 7799" },
      { name: "Lagavulin 16 YO", price: "899 / 8799" },
      { name: "Singleton 12 YO", price: "579 / 5399" },
      { name: "Singleton 15 YO", price: "799 / 7599" },
      { name: "Singleton 18 YO", price: "999 / 9799" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const BlendedScotchPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="30ml / 12×30ml bottle">Blended Scotch</SectionTitle>
    {[
      { name: "Teachers Highland Cream", price: "379 / 3589" },
      { name: "J & B Rare", price: "379 / 3599" },
      { name: "Ballantine's Finest", price: "379 / 3599" },
      { name: "Johnnie Walker Red Label", price: "399 / 3799" },
      { name: "Johnnie Walker Blonde", price: "499 / 4799" },
      { name: "The Famous Grouse", price: "429 / 4099" },
      { name: "Johnnie Walker Black Label", price: "499 / 4799" },
      { name: "Johnnie Walker Double Black", price: "549 / 5299" },
      { name: "Johnnie Walker Gold Reserve", price: "799 / 7799" },
      { name: "Chivas Regal 12 YO", price: "549 / 5299" },
      { name: "Chivas Regal 18 YO", price: "749 / 7299" },
      { name: "Royal Salute", price: "1699 / 15999" },
      { name: "Johnnie Walker Blue Label", price: "1799+" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle sub="30ml / 12×30ml" style={{ marginTop: 12 }}>Irish Whiskey</SectionTitle>
    <BookItem name="Jameson" price="399 / 3799" />
  </PageShell>
);

const AmericanJapanesePage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="30ml / 12×30ml bottle">American Whiskey</SectionTitle>
    {[
      { name: "Jim Beam White", price: "399 / 3799" },
      { name: "Jim Beam Honey / Orange", price: "399 / 3799" },
      { name: "Jim Beam Black", price: "479 / 4599" },
      { name: "Maker's Mark", price: "599 / 5799" },
      { name: "Jack Daniel's Old No. 7", price: "549 / 5299" },
      { name: "Gentleman Jack", price: "649 / 6299" },
      { name: "Woodford Reserve", price: "849 / 8299" },
      { name: "Jack Daniel's Single Barrel Select", price: "849 / 8299" },
      { name: "Jack Daniel's Apple / Honey", price: "579 / 5599" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle sub="30ml / 12×30ml" style={{ marginTop: 12 }}>Japanese Whisky Collection</SectionTitle>
    {[
      { name: "Toki Suntory Whisky", price: "699 / 6799" },
      { name: "Hibiki Japanese Harmony", price: "999 / 9799" },
      { name: "The Yamazaki Single Malt 12 YO", price: "1799 / 16999" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle sub="30ml / 12×30ml" style={{ marginTop: 12 }}>Cognac</SectionTitle>
    {[
      { name: "Martell VS", price: "549" },
      { name: "Martell VS.O.P", price: "649" },
      { name: "Hennessy V.S", price: "649" },
      { name: "Rémy Martin V.S.O.P", price: "749" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const GinVodkaPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="30ml / 12×30ml bottle">Gin</SectionTitle>
    {[
      { name: "Gordons", price: "349 / 3099" },
      { name: "Tanqueray", price: "399 / 3799" },
      { name: "Beefeater", price: "399 / 3799" },
      { name: "Bombay Sapphire", price: "449 / 4299" },
      { name: "Roku (The Japanese Craft Gin)", price: "679 / 6299" },
      { name: "Sipsmith", price: "699 / 6799" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle sub="30ml / 12×30ml" style={{ marginTop: 12 }}>Vodka</SectionTitle>
    {[
      { name: "Smirnoff", price: "299 / 2799" },
      { name: "Absolut", price: "399 / 3799" },
      { name: "Absolut Flavours", price: "399 / 3799" },
      { name: "Finlandia", price: "399 / 3799" },
      { name: "Cîroc", price: "499 / 4799" },
      { name: "Kettle One", price: "429 / 3999" },
      { name: "Grey Goose", price: "579 / 5999" },
      { name: "Belvedere", price: "579 / 5599" },
      { name: "Santory Haku (Japanese Craft Vodka)", price: "579 / 5599" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const RumTequilaPage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="30ml / 12×30ml bottle">Rum</SectionTitle>
    {[
      { name: "Old Monk", price: "299 / 2799" },
      { name: "Bacardi Superior", price: "399 / 3799" },
      { name: "Captain Morgan Dark", price: "349 / 3299" },
      { name: "Captain Morgan Black", price: "349 / 3299" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle sub="30ml / 12×30ml" style={{ marginTop: 12 }}>Tequila</SectionTitle>
    {[
      { name: "Camino Silver", price: "449 / 3999" },
      { name: "Camino Gold", price: "479 / 4599" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle sub="Glass / Bottle" style={{ marginTop: 12 }}>White Wine</SectionTitle>
    {[
      { name: "Sula Sauvignon Blanc", desc: "India", price: "699 / 3499" },
      { name: "Jacob's Creek Chardonnay", desc: "Australia", price: "899 / 3999" },
      { name: "Miguel Torres San Medin, Sauvignon Blanc", desc: "Chile", price: "4499" },
      { name: "Woodbridge Chardonnay", desc: "California, USA", price: "4999" },
      { name: "Pinot Grigio", desc: "Italy", price: "4999" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

const WinePage = ({ num }: { num: number }) => (
  <PageShell num={num}>
    <SectionTitle sub="Glass / Bottle">Red Wine</SectionTitle>
    {[
      { name: "Sula", desc: "India", price: "699 / 3499" },
      { name: "Jacob's Creek Shiraz", desc: "Australia", price: "899 / 3999" },
      { name: "Woodbridge Red Zinfandel", desc: "California", price: "4999" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
    <SectionTitle sub="Bottle price" style={{ marginTop: 14 }}>Champagne & Sparkling Wine</SectionTitle>
    {[
      { name: "Sula Brut", desc: "India", price: "4999" },
      { name: "Prosecco Brut", desc: "Italy", price: "6999" },
      { name: "Jacob's Creek Rosé", price: "5999" },
      { name: "Jacob's Creek Pinot Noir", price: "5999" },
      { name: "G.H. Mumm", price: "11999" },
      { name: "Moët & Chandon", desc: "France", price: "12999" },
      { name: "Moët & Chandon Rosé", desc: "France", price: "14999" },
      { name: "Dom Pérignon", desc: "France", price: "29999" },
    ].map((i, k) => <BookItem key={k} {...i} />)}
  </PageShell>
);

/* ─── Build pages array ──────────────────────────────────── */
const buildPages = (): FlipPage[] => [
  { node: <CoverPage />, bg: BGL },
  { node: <WelcomePage />, bg: BGR },
  { node: <SignatureCocktails num={3} />, bg: BGL },
  { node: <AllTimeClassics num={4} />, bg: BGR },
  { node: <LIITPage num={5} />, bg: BGL },
  { node: <ShootersPage num={6} />, bg: BGR },
  { node: <LiqueursPage num={7} />, bg: BGL },
  { node: <CraftBeersPage num={8} />, bg: BGR },
  { node: <NonAlcPage num={9} />, bg: BGL },
  { node: <SingleMaltPage num={10} />, bg: BGR },
  { node: <BlendedScotchPage num={11} />, bg: BGL },
  { node: <AmericanJapanesePage num={12} />, bg: BGR },
  { node: <GinVodkaPage num={13} />, bg: BGL },
  { node: <RumTequilaPage num={14} />, bg: BGR },
  { node: <WinePage num={15} />, bg: BGL },
  { node: <BackCover />, bg: BGR },
];

/* ─── Export ─────────────────────────────────────────────── */
const BAR_PAGES = buildPages();

const BarMenuBook = () => <FlipBook pages={BAR_PAGES} />;

export default BarMenuBook;
