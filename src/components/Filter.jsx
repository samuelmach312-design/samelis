import { useState } from "react";

const TILL = "6880156";
const BRANDS = ["Vitron","Oraimo","DL.Light","Generic","SAMELIS","Denim Co","Solar"];
const CATEGORIES = [
  { label: "All", value: "ALL", count: 12 },
  { label: "Electronics", value: "ELECTRONICS", count: 9 },
  { label: "Menswear", value: "MENSWEAR", count: 3 },
];

const PRICE_RANGES = [
  { label: "0 - 1,000", min: 0, max: 1000 },
  { label: "1,000 - 3,000", min: 1000, max: 3000 },
  { label: "3,000 - 10,000", min: 3000, max: 10000 },
  { label: "10,000 - 30,000", min: 10000, max: 30000 },
];

export default function Filter({
  activeCat,
  setActiveCat,
  priceMax,
  setPriceMax,
  selectedBrands,
  setSelectedBrands,
  productsCount = 12,
}) {
  const [showBrands, setShowBrands] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAll = () => {
    setActiveCat("ALL");
    setPriceMax(30000);
    setSelectedBrands([]);
  };

  const isActivePrice = (range) => priceMax >= range.min && priceMax <= range.max && priceMax !== 30000;

  return (
    <aside style={{
      width: "100%",
      background: "#fff",
      borderRadius: 14,
      border: "1px solid #eaeaea",
      overflow: "hidden"
    }}>
      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 16px 12px",
        borderBottom: "1px solid #f2f2f2"
      }}>
        <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: 0.8 }}>FILTERS</span>
        <button
          onClick={clearAll}
          style={{
            background: "none",
            border: 0,
            color: "#FF6A00",
            fontSize: 11,
            fontWeight: 800,
            cursor: "pointer",
            letterSpacing: 0.5
          }}
        >
          CLEAR
        </button>
      </div>

      <div style={{ padding: "0 16px 16px" }}>

        {/* CATEGORY */}
        <div style={{ marginTop: 16 }}>
          <button
            onClick={() => setShowCategory(!showCategory)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "none",
              border: 0,
              padding: 0,
              cursor: "pointer"
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 800, opacity: 0.4, letterSpacing: 1 }}>CATEGORY</span>
            <span style={{ fontSize: 12, opacity: 0.4 }}>{showCategory ? "−" : "+"}</span>
          </button>

          {showCategory && (
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 2 }}>
              {CATEGORIES.map((cat) => {
                const active = activeCat === cat.value;
                return (
                  <div
                    key={cat.value}
                    onClick={() => setActiveCat(cat.value)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: active ? "#111" : "#fff",
                      color: active ? "#fff" : "#111",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: active ? 700 : 400,
                      border: active ? "1px solid #111" : "1px solid transparent",
                      transition: "all 0.15s"
                    }}
                  >
                    <span>{cat.label}</span>
                    <span style={{
                      background: active ? "#222" : "#f2f2f2",
                      color: active ? "#fff" : "#111",
                      padding: "2px 8px",
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 700
                    }}>
                      {cat.count}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* PRICE */}
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => setShowPrice(!showPrice)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "none",
              border: 0,
              padding: 0,
              cursor: "pointer"
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 800, opacity: 0.4, letterSpacing: 1 }}>PRICE (KSh)</span>
            <span style={{ fontSize: 12, opacity: 0.4 }}>{showPrice ? "−" : "+"}</span>
          </button>

          {showPrice && (
            <>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <div style={{
                  flex: 1,
                  background: "#f6f6f6",
                  border: "1px solid #eee",
                  borderRadius: 8,
                  padding: "8px 10px",
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: 600
                }}>0</div>
                <div style={{
                  flex: 1,
                  background: "#111",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "8px 10px",
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: 800
                }}>{priceMax.toLocaleString()}</div>
              </div>

              <input
                type="range"
                min={0}
                max={30000}
                step={500}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                style={{
                  width: "100%",
                  marginTop: 12,
                  accentColor: "#111",
                  cursor: "pointer"
                }}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 12 }}>
                {PRICE_RANGES.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setPriceMax(r.max)}
                    style={{
                      fontSize: 10,
                      padding: "8px 6px",
                      borderRadius: 8,
                      border: isActivePrice(r) ? "1px solid #111" : "1px solid #eee",
                      background: isActivePrice(r) ? "#111" : "#fff",
                      color: isActivePrice(r) ? "#fff" : "#111",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* BRAND */}
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => setShowBrands(!showBrands)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "none",
              border: 0,
              padding: 0,
              cursor: "pointer"
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 800, opacity: 0.4, letterSpacing: 1 }}>BRAND</span>
            <span style={{ fontSize: 12, opacity: 0.4 }}>{showBrands ? "−" : "+"}</span>
          </button>

          {showBrands && (
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              {BRANDS.map((brand) => {
                const checked = selectedBrands.includes(brand);
                return (
                  <label
                    key={brand}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 13,
                      cursor: "pointer",
                      fontWeight: checked ? 700 : 400,
                      userSelect: "none"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleBrand(brand)}
                      style={{
                        width: 16,
                        height: 16,
                        accentColor: "#111",
                        cursor: "pointer"
                      }}
                    />
                    <span style={{ flex: 1 }}>{brand}</span>
                    {checked && <span style={{ color: "#FF6A00", fontSize: 12 }}>●</span>}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* M-PESA BOX */}
        <div style={{
          marginTop: 20,
          background: "#FFF7ED",
          border: "1px solid #FFEDD5",
          borderRadius: 10,
          padding: 12
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#111" }}>💳 Lipa na M-Pesa</div>
          <div style={{ fontSize: 11, marginTop: 4, lineHeight: 1.5, color: "#444" }}>
            Till Number<br />
            <span style={{ fontSize: 16, fontWeight: 900, color: "#FF6A00" }}>{TILL}</span><br />
            Buy Goods • SAMELIS
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 11, color: "#999", textAlign: "center" }}>
          {productsCount} products found
        </div>
      </div>
    </aside>
  );
}
