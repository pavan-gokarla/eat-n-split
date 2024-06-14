import { Button } from "./Button";

export function Friend({ f, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === f.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={f.image} alt={f.name} />
      <h3>{f.name}</h3>
      {f.balance < 0 && (
        <p className="red">
          You owe {f.name} ${Math.abs(f.balance)}
        </p>
      )}
      {f.balance > 0 && (
        <p className="green">
          {f.name} Owes you ${Math.abs(f.balance)}
        </p>
      )}
      {f.balance === 0 && <p>You and {f.name} are even</p>}
      <Button onClick={() => onSelection(f)}>
        {!selectedFriend
          ? "select"
          : selectedFriend.id === f.id
          ? "close"
          : "select"}
      </Button>
    </li>
  );
}
