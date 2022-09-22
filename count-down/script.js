const countDown = document.getElementById("count-down");

let countTime = 100000;

countDown.innerHTML = countTime;

setInterval(function () {
  countTime -= 100;
  countDown.innerHTML = countTime;
}, 100);
