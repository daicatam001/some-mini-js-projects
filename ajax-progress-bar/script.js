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
let endTimeout;
let currentProgress = 0;
let requestCount = 0;

function callAjax() {
  axios.get("https://jsonplaceholder.typicode.com/posts");
}

function callAjaxAll() {
  Promise.all([
    axios.get("https://jsonplaceholder.typicode.com/posts/1/comments"),
    axios.get("https://jsonplaceholder.typicode.com/albums/1/photos"),
    axios.get("https://jsonplaceholder.typicode.com/users/1/todos"),
  ]);
}

function callAjaxSequence() {
  axios
    .get("https://jsonplaceholder.typicode.com/posts/1/comments")
    .then(() =>
      axios
        .get("https://jsonplaceholder.typicode.com/albums/1/photos")
        .then(() =>
          axios.get("https://jsonplaceholder.typicode.com/users/1/todos")
        )
    );
}

function start() {
  const inc = Math.random() * 300 + 100;
  // if have more than one request is processing the increasing progress bar
  if (requestCount > 0) {
    if (inc > currentProgress && currentProgress != 0) {
      incrementTimeout = setTimeout(() => {
        increment(inc / 10);
        currentProgress = inc;
      }, inc - currentProgress);
    }
    // init random progess status
  } else {
    clearTimeout(endTimeout);
    ajaxBar.style.height = "10px";
    ajaxBar.style.width = 0;
    ajaxBar.style.opacity = 1;
    ajaxBar.style.transition = "width 0.5s, opacity 0.3s, height 0.3s";
    incrementTimeout = setTimeout(() => {
      increment(inc / 10);
      currentProgress = inc;
    }, inc);
  }
  requestCount++;
}
function increment(number) {
  ajaxBar.style.width = number + "vw";
}

function end() {
  // progess to 100% when have only 1 request left
  if (requestCount === 1) {
    increment(100);
    endTimeout = setTimeout(() => {
      currentProgress = 0;
      ajaxBar.removeAttribute("style");
    }, 500);
    clearTimeout(incrementTimeout);
  }
  requestCount--;
}
