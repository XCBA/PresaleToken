import React from "react";

export function Transfer({ buyTokens, tokenSymbol }) {
  return (
    <div>
      <h4>Buy Great Oliver Tokens!!!</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the buyTokens callback with the
          // form's data.
          event.preventDefault();
          const formData = new FormData(event.target);
          const amount = formData.get("amount");

          if (amount) {
            buyTokens(amount);
          }
        }}
      >
        <div className="form-group">
          <label>Amount of Tickets</label>
          <input
            className="form-control"
            type="number"
            step="1"
            name="amount"
            placeholder="1"
            required
          />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Buy" />
        </div>
      </form>
    </div>
  );
}
