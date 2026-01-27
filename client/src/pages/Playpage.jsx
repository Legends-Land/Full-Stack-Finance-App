import { useState } from "react";

export default function Playpage() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
}