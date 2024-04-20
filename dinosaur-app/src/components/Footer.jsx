import React from "react";

function Footer() {
  return (
    <footer className="footer mt-auto py-5 bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3 className="mb-3">Developers:</h3>
            <p className="m-2" style={{ fontSize: "1.35rem" }}>Valeriy Lysenko</p>
            <p className="m-2" style={{ fontSize: "1.35rem" }}>Andrew Brockmann</p>
            <p className="m-2" style={{ fontSize: "1.35rem" }}>Laura Gieg</p>
            <p className="m-2" style={{ fontSize: "1.35rem" }}>Kaz Smino</p>
          </div>
          <div className="col-md-4">
            <h3 className="mb-3">Designers:</h3>
            <p className="m-2" style={{ fontSize: "1.35rem" }}>Kane Remekie</p>
            <p className="m-2" style={{ fontSize: "1.35rem" }}>Valeriy Lysenko</p>
            <p className="m-2" style={{ fontSize: "1.35rem" }}>Laura Gieg</p>
          </div>
          <div className="col-md-4">
            <h3 className="mb-3">Product Owner:</h3>
            <p className="m-2" style={{ fontSize: "1.35rem" }}>Harmeet Kaur</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

