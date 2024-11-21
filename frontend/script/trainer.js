const baseUrl = 'http://localhost:5000';
const boxContainer = document.querySelector("#trainers .box-container");

async function getTrainerData() {
  try {
    const response = await fetch(`${baseUrl}/trainer`);
    if (!response.ok) {
      throw new Error(`Error fetching trainers: ${response.status}`);
    }

    const trainers = await response.json();
    displayTrainerData(trainers);
  } catch (error) {
    console.error('Error fetching trainer data:', error);
    boxContainer.innerHTML = '<p>Failed to load trainers. Please try again later.</p>';
  }
}

function displayTrainerData(trainers) {
  boxContainer.innerHTML = "";

  trainers.forEach((trainer) => {
    const trainerHTML = `
            <div class="box">
                <img src="${trainer.image}" alt="${trainer.name}">
                <div class="content">
                    <span>Expert trainer</span>
                    <h3>${trainer.name}</h3>
                    <a href="./appointment.html" class="btn" data-id="${trainer._id}">Book Appointment</a>
                    <div class="share">
                        <a href="#" class="fab fa-facebook-f"></a>
                        <a href="#" class="fab fa-twitter"></a>
                        <a href="#" class="fab fa-pinterest"></a>
                        <a href="#" class="fab fa-linkedin"></a>
                    </div>
                </div>
            </div>
        `;

    boxContainer.insertAdjacentHTML('beforeend', trainerHTML);
  });

  const appointmentBtns = document.querySelectorAll(".btn");
  appointmentBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const trainerId = e.target.dataset.id;
      sessionStorage.setItem("trainerId", trainerId);
    })
  );
}

getTrainerData();
