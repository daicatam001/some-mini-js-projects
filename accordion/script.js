const accordion = document.querySelector("#accordion");
const cards = accordion.querySelectorAll(".card");

cards.forEach(function (card) {
  const cardHeader = card.querySelector(".card-header");
  const cardPanel = card.querySelector(".card-panel");
  cardHeader.addEventListener("click", function () {
    const expanded = card.getAttribute("data-expanded") === "true";
    card.setAttribute("data-expanded", !expanded);
    if (expanded) {
     
      cardPanel.style.height = cardPanel.scrollHeight + "px";
      setTimeout(function () {
        cardPanel.style.height = null;
        cardPanel.classList.add("collapsing");
        card.classList.remove("show");
        // setTimeout(() => {
        //     // cardPanel.classList.remove("collapsing");
        //     card.classList.remove("show");
        // }, 3000)
      });
      
    } else {
    cardPanel.classList.add("collapsing");

      card.classList.add("show");
      cardPanel.style.height = cardPanel.scrollHeight + "px";
      setTimeout(function () {
        cardPanel.classList.remove("collapsing");
        cardPanel.style.height = null;
      }, 3000);
    }
  });
});

// cardHeaders.forEach(function (cardHeader) {
//   cardHeader.addEventListener("click", function () {
//       const card = cardHeader.closest(".card")
//     const expanded = card.getAttribute("data-expanded") === "true";
//     cardPanel.classList.toggle("show", !expanded);
//     cardHeader.setAttribute("data-expanded", !expanded);
//   });
// });
