const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.Occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("Movie");

populateUI();

let ticketPrice = +movieSelect.value;

console.log(ticketPrice);

function updateSelectedSeatsCounts() {
  const SelectedSeats = document.querySelectorAll(".row .seat.Selected");
  const SeatsBookedCount = SelectedSeats.length;
  console.log(SeatsBookedCount);
  const updateTotalCount = SeatsBookedCount * ticketPrice;
  count.innerText = SeatsBookedCount;
  total.innerText = updateTotalCount;

  const SeatsIndex = [...SelectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("SelectedSeats", JSON.stringify(SeatsIndex));
  //console.log(SeatsIndex);
}
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//get data from local storage and populate UI
function populateUI() {
  const SelectedSeats = JSON.parse(localStorage.getItem("SelectedSeats"));
  if (SelectedSeats !== null && SelectedSeats.length) {
    seats.forEach((seat, index) => {
      if (SelectedSeats.indexOf(index) > -1) {
        seat.classList.add("Selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectoMovieIndex");

  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  console.log(SelectedSeats);
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedSeatsCounts();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("Occupied")
  ) {
    e.target.classList.toggle("Selected");
    updateSelectedSeatsCounts();
  }
});

updateSelectedSeatsCounts();
