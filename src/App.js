import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];





export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  function handleOpenClose(){
    setIsOpen((isOpen)=>!isOpen);
  }
  const [friends,setFriends] = useState(initialFriends);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends}  />
        {isOpen && <FormAddFriend onAddFriend={setFriends} onClick={handleOpenClose} />}
        <Button onClick={handleOpenClose}>{!isOpen ? "Add Friend" : "Close"}</Button>
      </div>
      <FormSplitBill></FormSplitBill>
    </div>
  );
}

function FriendsList({friends}) {
  return (
    <ul>
      {friends.map((f) => (
        <Friend f={f} key={f.id}></Friend>
      ))}
    </ul>
  );
}

function Friend({ f }) {
  return (
    <li>
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
      <Button>select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({onAddFriend,onClick}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend((friends)=>[...friends,newFriend]);
    onClick();
    setName("");
    setImage("https://i.pravatar.cc/48")
  }

  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <label>. FriendName</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>. Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split Bill with X</h2>
      <label>. Bill</label>
      <input type="text" />
      <label>. Your Expense</label>
      <input type="text" />
      <label>. X Expense</label>
      <input type="text" disabled />
      <label>. Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend"> X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
