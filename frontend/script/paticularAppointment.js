const baseUrl = 'http://localhost:5000';

const cont = document.getElementById("display_appointment");

async function getAllAppointments() {
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");

  if (!token) {
    alert("Please login first to view appointments!");
    window.location.href = "./Login.html";
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/booking/userId`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    const result = await response.json();

    if (response.ok) {
      displayAllAppointments(result, name, token);
    } else {
      alert("Something went wrong while fetching appointments!");
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    alert("Something went wrong!");
  }
}

getAllAppointments();

function displayAllAppointments(appointments, name, token) {
  cont.innerHTML = `
    <h1 style="text-align: center; margin-bottom:20px">All Bookings of ${name}</h1>
    <table>
      <thead>
        <tr>
          <th>SI NO.</th>
          <th>User Email</th>
          <th>Date</th>
          <th>Time Slot</th>
          <th>Cancel Appointment</th>
        </tr>
      </thead>
      <tbody>
        ${appointments.map((appointment, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${appointment.userEmail}</td>
            <td>${appointment.bookingDate}</td>
            <td>${formatTimeSlot(appointment.bookingSlot)}</td>
            <td><button class="cancel_appointment" data-id="${appointment._id}">Cancel Appointment</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".cancel_appointment").forEach(button => {
    button.addEventListener("click", (e) => {
      const appointmentId = e.target.dataset.id;
      removeAppointment(appointmentId, token);
    });
  });
}

function formatTimeSlot(slot) {
  switch (slot) {
    case "6-8": return "6 AM to 8 AM";
    case "9-11": return "9 AM to 11 AM";
    case "4-6": return "4 PM to 6 PM";
    default: return "7 PM to 9 PM";
  }
}

async function removeAppointment(id, token) {
  try {
    const response = await fetch(`${baseUrl}/booking/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });

    if (response.ok) {
      alert("Your booking was successfully canceled");
      getAllAppointments();
    } else {
      alert("Something went wrong while canceling the appointment!");
    }
  } catch (error) {
    console.error("Error canceling appointment:", error);
    alert("Something went wrong!");
  }
}
