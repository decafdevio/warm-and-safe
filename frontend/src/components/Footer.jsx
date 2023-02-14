import logoImg from "../img/logo_black.png";
import tdaImg from "../img/logo_tda_black.png";
import bradleyImg from "../img/dev_bradley.png";
import alyzandeImg from "../img/dev_alyzande.png";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="dev-container">
        <img src={bradleyImg} className="dev-img" alt="Bradley Ashton" />
        <p className="dev-content">
          BRADLEY ASHTON
          <br />
          <span className="dev-title">Product developer</span>
          <br />
          <span className="dev-link">
            <a href="https://www.linkedin.com/in/enitdev/">LINKEDIN</a>
          </span>
        </p>
      </div>

      <div className="dev-container">
        <img src={alyzandeImg} className="dev-img" alt="Alyzande Renard" />
        <p className="dev-content">
          ALYZANDE RENARD
          <br />
          <span className="dev-title">Product developer</span>
          <br />
          <span className="dev-link">
            <a href="https://www.linkedin.com/in/alyzande/#">LINKEDIN</a>
          </span>
        </p>
      </div>

      <div>
        <a href="https://thedeveloperacademy.com/">
          <img src={tdaImg} id="tda-img" alt="The Developer Academy" />
        </a>
      </div>
    </footer>
  );
}
