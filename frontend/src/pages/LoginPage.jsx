import { useState } from "react";

const styles = {
  root: {
    fontFamily: "'Nunito', sans-serif",
    background: "#f7f8fa",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
  },
  blobTopRight: {
    position: "absolute",
    width: "200px",
    height: "200px",
    top: "80px",
    right: "calc(50% - 480px)",
    background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
    pointerEvents: "none",
    animation: "morph1 8s ease-in-out infinite",
  },
  blobBottomLeft: {
    position: "absolute",
    width: "100px",
    height: "100px",
    bottom: "180px",
    left: "calc(50% - 460px)",
    background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
    borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
    pointerEvents: "none",
    animation: "morph2 7s ease-in-out infinite",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "28px",
    animation: "fadeUp 0.5s ease both",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: 800,
    color: "#2d2d2d",
    letterSpacing: "-0.3px",
  },
  heading: {
    fontSize: "36px",
    fontWeight: 800,
    color: "#2d2d2d",
    textAlign: "center",
    marginBottom: "32px",
    letterSpacing: "-0.5px",
    animation: "fadeUp 0.5s 0.05s ease both",
  },
  card: {
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
    padding: "40px 44px 36px",
    width: "100%",
    maxWidth: "500px",
    position: "relative",
    zIndex: 1,
    animation: "fadeUp 0.5s 0.1s ease both",
  },
  fieldLabel: {
    display: "block",
    fontSize: "14px",
    fontWeight: 700,
    color: "#2d2d2d",
    marginBottom: "8px",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #e2e5ea",
    borderRadius: "10px",
    background: "#fff",
    padding: "0 16px",
    marginBottom: "22px",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  inputWrapFocused: {
    borderColor: "#a0a0a0",
    boxShadow: "0 0 0 3px rgba(0,0,0,0.05)",
  },
  inputIcon: {
    flexShrink: 0,
    width: "18px",
    height: "18px",
    marginRight: "12px",
    color: "#b0ada8",
  },
  input: {
    border: "none",
    outline: "none",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "15px",
    fontWeight: 400,
    color: "#2d2d2d",
    background: "transparent",
    width: "100%",
    padding: "15px 0",
  },
  btnSignin: {
    display: "block",
    width: "100%",
    padding: "16px",
    background: "#2ecc40",
    color: "#fff",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "16px",
    fontWeight: 800,
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    letterSpacing: "0.1px",
    boxShadow: "0 4px 16px rgba(46,204,64,0.3)",
    marginBottom: "24px",
    transition: "background 0.2s, transform 0.1s, box-shadow 0.2s",
  },
  btnSigninHover: {
    background: "#27b838",
    boxShadow: "0 6px 22px rgba(46,204,64,0.4)",
    transform: "translateY(-1px)",
  },
  cardLinks: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: 600,
  },
  link: {
    color: "#4a7cff",
    textDecoration: "underline",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  products: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "36px",
    animation: "fadeUp 0.5s 0.2s ease both",
  },
  productChip: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#fff",
    borderRadius: "50px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: 700,
    color: "#2d2d2d",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    cursor: "default",
    transition: "box-shadow 0.2s, transform 0.2s",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    flexShrink: 0,
  },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
  @keyframes morph1 {
    0%, 100% { border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%; }
    50%       { border-radius: 55% 45% 40% 60% / 45% 55% 50% 50%; }
  }
  @keyframes morph2 {
    0%, 100% { border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%; }
    50%       { border-radius: 60% 40% 45% 55% / 55% 45% 50% 50%; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  input::placeholder { color: #b8bcc4; }
`;

const products = [
  { name: "KWFinder",    color: "#e74c3c" },
  { name: "SERPChecker", color: "#f1c40f" },
  { name: "SERPWatcher", color: "#9b59b6" },
  { name: "LinkMiner",   color: "#3498db" },
  { name: "SiteProfiler",color: "#e91e8c" },
];

function UserIcon() {
  return (
    <svg style={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg style={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="24" rx="14" ry="12" fill="#60a5fa"/>
      <ellipse cx="20" cy="18" rx="10" ry="10" fill="#3b82f6"/>
      <circle cx="20" cy="14" r="6" fill="#93c5fd" opacity="0.8"/>
    </svg>
  );
}

function InputField({ label, id, type, placeholder, icon }) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label style={styles.fieldLabel} htmlFor={id}>{label}</label>
      <div style={{ ...styles.inputWrap, ...(focused ? styles.inputWrapFocused : {}) }}>
        {icon}
        <input
          style={styles.input}
          type={type}
          id={id}
          placeholder={placeholder}
          autoComplete={type === "email" ? "email" : "current-password"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
}

export default function MangoolsLogin() {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <>
      <style>{globalCSS}</style>
      <div style={styles.root}>
        {/* Blobs */}
        <div style={styles.blobTopRight} />
        <div style={styles.blobBottomLeft} />

        {/* Logo */}
        <div style={styles.logo}>
          <LogoIcon />
          <span style={styles.logoText}>Mangools</span>
        </div>

        {/* Heading */}
        <h1 style={styles.heading}>Good to see you again</h1>

        {/* Card */}
        <div style={styles.card}>
          <InputField
            label="Your email"
            id="email"
            type="email"
            placeholder="e.g. elon@tesla.com"
            icon={<UserIcon />}
          />
          <InputField
            label="Your password"
            id="password"
            type="password"
            placeholder="e.g. ilovemangools123"
            icon={<LockIcon />}
          />

          <button
            style={{ ...styles.btnSignin, ...(btnHovered ? styles.btnSigninHover : {}) }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            Sign in
          </button>

          <div style={styles.cardLinks}>
            <a href="#" style={styles.link}>Don't have an account?</a>
            <a href="#" style={styles.link}>Forgot password?</a>
          </div>
        </div>

        {/* Products */}
        <div style={styles.products}>
          {products.map((p) => (
            <div key={p.name} style={styles.productChip}>
              <span style={{ ...styles.dot, background: p.color }} />
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}