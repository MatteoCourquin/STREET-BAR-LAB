// Shared layout for generated Open Graph images (rendered by next/og, inline styles only).
export function OgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b0b0c",
        color: "#f4f4ef",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, fontWeight: 800 }}>
        <div style={{ width: 48, height: 48, borderRadius: 10, background: "#ffd60a" }} />
        <span>
          STREETBAR<span style={{ color: "#ffd60a" }}>LAB</span>
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <span style={{ color: "#ffd60a", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</span>
        <span style={{ fontSize: title.length > 50 ? 64 : 80, fontWeight: 900, lineHeight: 1.05 }}>{title}</span>
      </div>
      <div
        style={{
          height: 16,
          width: "100%",
          backgroundImage: "repeating-linear-gradient(-45deg, #ffd60a 0 16px, #0b0b0c 16px 32px)",
        }}
      />
    </div>
  );
}
