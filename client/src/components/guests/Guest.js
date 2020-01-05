import React, { useContext } from "react";
import GuestContext from "../../context/guestContext/guestContext";

const Guest = ({ guest }) => {
  const { removeGuest, updateGuest, editGuest, clearEdit } = useContext(
    GuestContext
  );
  const { _id, name, phone, dietary, isConfirmed } = guest;

  const handleRemove = () => {
    removeGuest(_id);
    clearEdit();
  };

  const handleConfirm = () => {
    updateGuest({ ...guest, isConfirmed: !isConfirmed });
  };

  return (
    <div className="guest-card">
      <div className="card-head">
        <div>
          <label className={`${isConfirmed && "confirm"}`}>
            {" "}
            Confirmed
            <i className={`fas fa-check-square ${isConfirmed && "confirm"} `}>
              <input type="checkbox" onClick={handleConfirm} />
            </i>
          </label>
        </div>
        <div>
          <button onClick={() => editGuest(guest)}>
            <i className="fas fa-user-edit"></i>
          </button>
          <button onClick={handleRemove}>
            <i className="fas fa-trash-alt remove"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <h2>{name}</h2>
        <span
          className={
            "badge " +
            (dietary === "Vegan"
              ? "red"
              : dietary === "Halal"
              ? "green"
              : "seaGreen")
          }
        >
          {dietary}
        </span>
        <div className="contact">
          <i className="fas fa-phone-alt" />
          <p>{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Guest;
