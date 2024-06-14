import { Friend } from "./Friend";

export function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((f) => (
        <Friend
          f={f}
          key={f.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        ></Friend>
      ))}
    </ul>
  );
}
