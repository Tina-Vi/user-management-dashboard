import { useAppDispatch } from "../app/hooks";
import { userAdded } from "../features/users/usersSlice";
import type { User } from "../features/users/userTypes";
import { useState } from "react";

type FormErrors = {
  name: string;
  username: string;
  email: string;
};

function UserForm() {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    username: "",
    email: "",
  });

  function formValidation() {
    const newErrors: FormErrors = {
      name: "",
      username: "",
      email: "",
    };

    const trimmedName = name.trim();
    const nameRegex = /^[\p{L} -]+$/u;
    if (trimmedName === "") {
      newErrors.name = "Name cannot be empty";
    } else if (trimmedName[0] === trimmedName[0].toLowerCase()) {
      newErrors.name = "Your name should start with a capital letter";
    } else if (!nameRegex.test(trimmedName)) {
      newErrors.name = "Name can contain only letters, spaces and hyphens";
    }

    if (username.trim() === "") {
      newErrors.username = "Username couldn`t content only spaces";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      newErrors.email = "Check your email is correct";
    }

    setErrors(newErrors);

    if (
      newErrors.name !== "" ||
      newErrors.username !== "" ||
      newErrors.email !== ""
    ) {
      return true;
    } else {
      return false;
    }
  }

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

    if (formValidation()) {
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
    <form onSubmit={handleSubmit} noValidate>
      <h2>Add new user</h2>
      <label htmlFor="name">Enter your name</label>
      <input
        id="name"
        type="text"
        placeholder="John"
        value={name}
        onChange={handleNameChange}
      />
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="username">Enter your username</label>
      <input
        id="username"
        type="text"
        placeholder="johnny77"
        value={username}
        onChange={handleUsernameChange}
      />
      {errors.username && <p>{errors.username}</p>}

      <label htmlFor="email">Enter your email</label>
      <input
        id="email"
        type="email"
        placeholder="john@example.com"
        value={email}
        onChange={handleEmailChange}
      />
      {errors.email && <p>{errors.email}</p>}

      <button type="submit">Save new user</button>
    </form>
  );
}

export default UserForm;
