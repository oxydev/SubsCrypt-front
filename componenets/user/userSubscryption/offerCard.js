import React from "react";

export default function OfferCard(props) {
  const offer = props.offer;
  return (
    <section className="OfferCard">
      <header>
        <img className="OfferLogo" src={offer.logo} />
        <h1>{offer.name}</h1>
      </header>
      <main>
        <div>
          <p className="OfferCard-Provider">{offer.provider}</p>
          <p className="OfferCard-Rate">{offer.rate}</p>
        </div>
        <p>{offer.description}</p>
        <div>
          <h6>Duration</h6>
          <p>{offer.duration}</p>
        </div>
        <div>
          <h6>Refund Policy</h6>
          <p>{offer.refundPolicy}</p>
        </div>
      </main>
      <footer>
        <div>
          <label>Pay with</label>
          <select className="OfferCard-coinSelect">
            <option value="coin1">coin1</option>
            <option value="coin2">coin2</option>
          </select>
        </div>
        <button onClick={() => {}}>{offer.price + "USSD"}</button>
      </footer>
    </section>
  );
}
