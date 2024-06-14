import { useState } from "react";
import { Button } from "./Button";

export function FormSplitBill({ selectedFriend, onUpdate }) {
  const [bill, setBill] = useState(0);
  const [expense, setExpense] = useState(0);
  const [whoPay, setWhoPay] = useState("user");
  const paidByFriend = bill - expense;

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(whoPay === "user" ? paidByFriend : -expense);
  }
  return (
    <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
      <h2>Split Bill with {selectedFriend.name}</h2>
      <label>. Bill</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => {
          setBill(+e.target.value);
        }}
      />
      <label>. Your Expense</label>
      <input
        type="text"
        value={expense}
        onChange={(e) => {
          if (+e.target.value > bill) setExpense(bill);
          else setExpense(+e.target.value);
        }}
      />
      <label>. {selectedFriend.name} Expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>. Who is paying the bill</label>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
        <option value="user">You</option>
        <option value="friend"> {selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
