import { useAppDispatch } from "../app/hooks";
import { userAdded } from "../features/users/usersSlice";
import type { User } from "../features/users/userTypes";
import { useState } from "react";

function formValidation(
  name: string,
  username: string,
  email: string,
): FormErrors {
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

  return newErrors;
}

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

  const validationErrors = formValidation(name, username, email);

  const hasErrors = Object.values(validationErrors).some(
    (error) => error !== "",
  );

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleNameBlur() {
    setErrors((prev) => ({
      ...prev,
      name: validationErrors.name,
    }));
  }

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleUsernameBlur() {
    setErrors((prev) => ({
      ...prev,
      username: validationErrors.username,
    }));
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleEmailBlur() {
    setErrors((prev) => ({
      ...prev,
      email: validationErrors.email,
    }));
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = formValidation(name, username, email);
    setErrors(newErrors);

    const hasSubmitErrors = Object.values(newErrors).some(
      (error) => error !== "",
    );

    if (hasSubmitErrors) {
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
    setErrors({ name: "", username: "", email: "" });
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <form onSubmit={handleSubmit} noValidate>
          <h2>Add new user</h2>
          <div className="inputs-container">
            <div className="input-label-block">
              <label htmlFor="name">Enter your name</label>
              <input
                className={errors.name ? "error-border" : "no-error-border"}
                id="name"
                type="text"
                placeholder="John"
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
              />
              <p className="error-text">{errors.name && errors.name}</p>
            </div>

            <div className="input-label-block">
              <label htmlFor="username">Enter your username</label>
              <input
                className={errors.username ? "error-border" : "no-error-border"}
                id="username"
                type="text"
                placeholder="johnny77"
                value={username}
                onChange={handleUsernameChange}
                onBlur={handleUsernameBlur}
              />
              <p className="error-text">{errors.username && errors.username}</p>
            </div>

            <div className="input-label-block">
              <label htmlFor="email">Enter your email</label>
              <input
                className={errors.email ? "error-border" : "no-error-border"}
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
              <p className="error-text">{errors.email && errors.email}</p>
            </div>
          </div>

          <button className="form-button" type="submit" disabled={hasErrors}>
            Save new user
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
