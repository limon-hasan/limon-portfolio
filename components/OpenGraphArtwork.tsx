export function OpenGraphArtwork() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#08080a",
        backgroundImage:
          "radial-gradient(circle at 78% 18%, rgba(91,77,245,0.42), transparent 46%), radial-gradient(circle at 8% 92%, rgba(34,211,238,0.12), transparent 38%)",
        padding: "64px",
        color: "#f4f4f6",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              border: "1px solid rgba(139,124,255,0.4)",
              backgroundColor: "rgba(91,77,245,0.18)",
              color: "#d9d6ff",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            ML
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "22px", fontWeight: 600 }}>
              Maksudul Hasan Limon
            </div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.42)" }}>
              CSE Student · Full-Stack Developer
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "999px",
            padding: "8px 14px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "999px",
              backgroundColor: "#34d399",
            }}
          />
          Open to opportunities
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: "76px",
            lineHeight: 0.98,
            letterSpacing: "-0.05em",
            fontWeight: 600,
          }}
        >
          Full-stack systems.
        </div>
        <div
          style={{
            fontSize: "76px",
            lineHeight: 1.02,
            letterSpacing: "-0.05em",
            fontWeight: 600,
            color: "#a99fff",
          }}
        >
          Hard problems solved. Built to hold up.
        </div>
        <div
          style={{
            marginTop: "22px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.42)",
            maxWidth: "880px",
          }}
        >
          Booking platforms, federated satellite vision, Bengali NLP, and the
          engineering seams between them.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "22px",
          fontSize: "13px",
          color: "rgba(255,255,255,0.32)",
        }}
      >
        <div style={{ display: "flex", gap: "22px" }}>
          <span>08 systems</span>
          <span>B.Sc. in CSE</span>
          <span>Dhaka, Bangladesh</span>
        </div>
        <span>limonhasan.dev</span>
      </div>
    </div>
  )
}
