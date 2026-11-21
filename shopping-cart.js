let plusBtns = Array.from(document.querySelectorAll(".fa-circle-plus"));

let minusBtns = Array.from(document.querySelectorAll(".fa-circle-minus"));

let cards = Array.from(document.querySelectorAll(".card"));

let trashBtns = Array.from(document.querySelectorAll(".fa-trash-can"));

let likeBtns = Array.from(document.querySelectorAll(".fa-heart"));

// plus btns
for (const plus of plusBtns) {
  plus.addEventListener("click", () => {
    plus.previousElementSibling.innerHTML =
      Number(plus.previousElementSibling.innerHTML) + 1;
    total();
  });
}

// minus btns
for (const minus of minusBtns) {
  minus.addEventListener("click", () => {
    if (minus.nextElementSibling.innerHTML > 0) {
      minus.nextElementSibling.innerHTML =
        Number(minus.nextElementSibling.innerHTML) - 1;
      total();
    }
  });
}

//trash btns
for (const i in trashBtns) {
  trashBtns[i].addEventListener("click", () => {
    confirm("Are you sure you want to delete this product?") &&
      cards[i].remove();
    total();
  });
}

//like btns
for (const like of likeBtns) {
  like.addEventListener("click", () => {
    if (like.style.color !== "red") {
      like.style.color = "red";
    } else {
      like.style.color = "#171a1d";
    }
  });
}

// total price function
function total() {
  let quantities = Array.from(document.querySelectorAll(".quantity"));
  let prices = Array.from(document.querySelectorAll(".unit-price"));
  let result = 0;
  for (const i in quantities) {
    result += quantities[i].innerHTML * prices[i].innerHTML;
  }
  document.getElementById("total-price").innerHTML = result;
}
