export default function Header() {
  return (
    <div style={{
      padding: "24px 20px",
      backgroundColor: 'transparent',
      display: "flex",
      width: "100%",
      justifyContent: "center",
      gap: "10px",
      zIndex: "10"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0",
        backgroundColor: '#fff',
        borderRadius: "8px",
        padding: "6px 24px",
      }}>
        <p style={{color: '#000', lineHeight: "16px", fontSize: "16px", fontWeight: "bolder"}}>smart web</p>
        <p style={{color: '#000', lineHeight: "14px", fontSize: "14px"}}>digital solutions</p>
      </div>
    </div>
  )
}
