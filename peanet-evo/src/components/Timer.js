import "./Timer.css"

function HomePage() {
  return (
    <div className="homepage-container">
      <h1>💻 Pacifist Esport Arena (PEA) </h1>
      <p>Selamat datang di PEA.NET Berikut informasi harga dan peraturan penggunaan:</p>

      <section className="pricing">
        <h2>💰 Harga</h2>
        <ul>
          <li><strong>PC Reguler:</strong> Rp3.000 / jam</li>
          <li><strong>PC Gaming:</strong> Rp4.000 / jam</li>
          <li><strong>Paket Malam (22.00 - 06.00):</strong> Rp17.000</li>
          <li><strong>Mie Goreng/Rebus</strong> Rp5.000 </li>
          <li><strong>Es Teajus dan lain lain</strong> Rp1.000</li>
          <li><strong>Nasi 100gr </strong> Rp2.000</li>

        </ul>
      </section>

      <section className="rules">
        <h2>📜 Peraturan</h2>
        <ol>
          <li>Dilarang nonton bokeppp rame-rame, sendiri boleh</li>
          <li>Jaga kebersihan, Rokok pake asbak.</li>
          <li>Menaruh minuman jangan sampe tumpah totttt</li>
          <li>Komplain kalo ada masalah</li>
          <li>Kalau mau main game lain nanti di installin</li>
        </ol>
      </section>
    </div>
  );
}

export default HomePage;
