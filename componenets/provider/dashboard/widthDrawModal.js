export const WithdrwaModal = (props) => {
  const handleWithdraw = (e) => {
    e.preventDefault();
    console.log("Withdraw");
  };
  return (
    <section className="WithDrawModal">
      <h1>Withdraw</h1>
      <form onSubmit={handleWithdraw}>
        <label>Wallet Address:</label>
        <input type="text" disabled />
        <label>Withdrawable Amount:</label>
        <div className="Amount">
          <input type="text" />
          <span className="Unit">DOT</span>
          <span>All</span>
        </div>
        <input type="submit" value="Withdraw" />
      </form>
    </section>
  );
};
