import React, { useContext } from "react";
import GuestContext from "../../context/guestContext/guestContext";

const GuestCounter = () => {
  const { guests } = useContext(GuestContext);
  const totalInvited = guests.length;
  const attending = guests.filter(guest => guest.isConfirmed);
  const totalAttending = attending.length;

  const invitedByDiet = type => {
    return guests.filter(guest => guest.dietary === type).length;
  };

  const attendingByDiet = type => {
    return attending.filter(guest => guest.dietary === type).length;
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Guest</th>
            <th>Invited</th>
            <th>Attending</th>
          </tr>
          <tr>
            <th>Vegan</th>
            <td>{invitedByDiet("Vegan")}</td>
            <td>{attendingByDiet("Vegan")}</td>
          </tr>
          <tr>
            <th>Halal</th>
            <td>{invitedByDiet("Halal")}</td>
            <td>{attendingByDiet("Halal")}</td>
          </tr>
          <tr>
            <th>Kosher</th>
            <td>{invitedByDiet("Kosher")}</td>
            <td>{attendingByDiet("Kosher")}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{totalInvited}</td>
            <td>{totalAttending}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GuestCounter;
