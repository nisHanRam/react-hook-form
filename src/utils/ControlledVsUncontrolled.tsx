import React, { useRef, useState, FormEvent } from "react";

const ControlledVsUncontrolled = () => {
  const [name, setName] = useState<string>(""); // Controlled component
  const [nameError, setNameError] = useState<string>(""); // Validation for name
  const emailRef = useRef<HTMLInputElement>(null); // Uncontrolled component

  const handleSubmit = (event:FormEvent) => {
    event.preventDefault();

    const emailValue = emailRef?.current?.value || "";
    let isValid = true;

    // Name validation (controlled input)
    if (name.trim() === "") {
      setNameError("Name is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    // Email validation (uncontrolled input)
    if (!emailValue.includes("@")) {
      alert("Invalid email format.");
      isValid = false;
    }

    if (isValid) {
      alert(`Form submitted:\nName: ${name}\nEmail: ${emailValue}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Controlled Input with Validation */}
      <div>
        <label>Name (Controlled): </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p style={{ color: "red" }}>{nameError}</p>}
      </div>

      {/* Uncontrolled Input with Validation on Submit */}
      <div>
        <label>Email (Uncontrolled): </label>
        <input type="email" ref={emailRef} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledVsUncontrolled;

/* How This Works:
✅ Name (Controlled Input)
=> React state manages its value (useState).
=> Validation is done in real-time (as the user types).

✅ Email (Uncontrolled Input)
=> Uses useRef to access the value only on submit.
=> Validation happens when the form is submitted.

Key Benefits:
🔹 Prevents invalid submissions
🔹 Reduces re-renders for the uncontrolled field
🔹 Mixes real-time validation (controlled) with on-submit validation (uncontrolled) */

/* NOTE - react-hook-form can be used both controlled inputs and the uncontrolled inputs */