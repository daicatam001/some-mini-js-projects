(function () {
  let open = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function (_, url) {
    const loadStart = () => {
      start();
    };

    const loadEnd = () => {
      end();
    };

    this.addEventListener("loadstart", loadStart, { once: true });
    this.addEventListener("loadend", loadEnd, { once: true });

    open.apply(this, arguments);
  };
})();

const ajaxBar = document.getElementById("ajax-bar");
let incrementTimeout;

function callAjax() {
  axios.get("https://jsonplaceholder.typicode.com/posts");
}

function start() {
  ajaxBar.style.height = "10px";
  const inc = Math.random() * 300 + 100;
  incrementTimeout = setTimeout(() => {
    increment(inc / 10);
  }, inc);
}
function increment(number) {
  ajaxBar.style.width = number + "vw";
}

function end() {
  clearTimeout(incrementTimeout);
  increment(100);
  setTimeout(() => {
    ajaxBar.style.opacity = 0;
  }, 500);
  setTimeout(() => {
    ajaxBar.removeAttribute("style");
  }, 800);
}
