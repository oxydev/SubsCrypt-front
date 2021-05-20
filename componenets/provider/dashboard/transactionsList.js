import React from "react";
import data from "../../../data/transactions.json";

export default function TransactionsList(props) {
  const transactions = data.transactions.map((item) => (
    <tr>
      <td>{item.type}</td>
      <td>{item.plan}</td>
      <td>{item.duration}</td>
      <td>{item.time}</td>
      <td>
        <img src={item.ammount.coin} />
        {item.ammount.ammount}
      </td>
    </tr>
  ));
  return (
    <section className="TransactionsList">
      <h1>All Transactions</h1>
      <table className="TransactionsTable">
        <thead>
          <tr>
            <th>April 12, 2021</th>
            <th>Plan</th>
            <th>Duration</th>
            <th>Time</th>
            <th>Ammount</th>
          </tr>
        </thead>
        <tbody>{transactions}</tbody>
      </table>
    </section>
  );
}
