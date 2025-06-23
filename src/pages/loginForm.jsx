import { useState } from "react";
import { useUser } from "../state/userContext";

function LoginForm() {
  const [usernameInput, setUsernameInput] = useState("");
  const { setCurrentUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      setCurrentUser({ username: usernameInput.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter username"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginForm;