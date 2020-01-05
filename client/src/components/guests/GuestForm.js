import React, { useState, useContext, useEffect } from "react";
import GuestContext from "../../context/guestContext/guestContext";

const GuestForm = () => {
  const { addGuest, enableEdit, updateGuest, clearEdit } = useContext(
    GuestContext
  );

  useEffect(() => {
    if (enableEdit !== null) {
      setGuest(enableEdit);
    } else {
      setGuest({
        name: "",
        phone: "",
        dietary: "Vegan"
      });
    }
  }, [enableEdit]);

  const [guest, setGuest] = useState({
    name: "",
    phone: "",
    dietary: "Vegan"
  });

  const { name, phone, dietary } = guest;

  const handleChange = event => {
    setGuest({
      ...guest,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = event => {
    event.preventDefault();

    if (enableEdit !== null) {
      updateGuest(guest);
      clearEdit();
    } else {
      addGuest(guest);
      setGuest({
        name: "",
        phone: "",
        dietary: "Vegan"
      });
    }
  };

  return (
    <div className="invite-section">
      <h1>{enableEdit !== null ? "Edit Guest" : "Invite Someone"}</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={handleChange}
          autoComplete="off"
        />
        <p className="options-label">Dietary</p>
        <div className="options">
          <label className="container">
            Vegan
            <input
              type="radio"
              name="dietary"
              value="Vegan"
              checked={dietary === "Vegan"}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Halal
            <input
              type="radio"
              name="dietary"
              value="Halal"
              checked={dietary === "Halal"}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Kosher
            <input
              type="radio"
              name="dietary"
              value="Kosher"
              checked={dietary === "Kosher"}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <input
          type="submit"
          value={enableEdit !== null ? "Update Guest" : "Add Guest"}
          className="btn"
        />
        {enableEdit !== null ? (
          <input
            type="button"
            className="btn clear"
            value="Cancel"
            onClick={clearEdit}
          />
        ) : null}
      </form>
    </div>
  );
};

export default GuestForm;
