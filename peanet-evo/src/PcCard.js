import "./App.css";

function PcCard({ number, status }) {
  return (
    <div className="pc-card">
      <h2>PC #{number}</h2>
      <div className={`status ${status}`}>
        {status === "busy" ? "In Use" : "Available"}
      </div>
    </div>
  );
}

export default PcCard;
