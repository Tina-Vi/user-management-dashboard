import { useAppDispatch } from "../app/hooks";
import { userAdded } from "../features/users/usersSlice";
import type { User } from "../features/users/userTypes";
import { useState } from "react";

function UserForm() {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !username.trim() || !email.trim()) {
      return;
    }

    const newUser: User = {
      id: Date.now(),
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
    };

    dispatch(userAdded(newUser));

    setName("");
    setUsername("");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new user</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
        required
      />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        required
      />

      <button type="submit">Save new user</button>
    </form>
  );
}

export default UserForm;
