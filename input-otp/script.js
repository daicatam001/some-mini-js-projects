const KEY_CODE_ARROW_UP = 38;
const KEY_CODE_ARROW_DOWN = 40;
const KEY_CODE_ARROW_LEFT = 37;
const KEY_CODE_ARROW_RIGHT = 39;
const KEY_CODE_BACKSAPCE = 8;
const KEY_CODE_TAB = 9;
const KEY_CODE_DELETE = 46;
const NUMBER_ONLY_REGEX = /^[0-9]$/;
const inputOpts = document.querySelectorAll(".input-opt__input");

inputOpts.forEach(addInputEvent);
inputOpts[0].focus();
function addInputEvent(element, index, inputList) {
  element.addEventListener("keydown", function (event) {
    if (event.keyCode === KEY_CODE_TAB) {
      return;
    }

    // jump into next input when hitt arrow right
    if (
      event.keyCode === KEY_CODE_ARROW_RIGHT &&
      index + 1 < inputList.length
    ) {
      inputList[index + 1].focus();
      return;
    }
    // jump into preview input when hitt arrow right
    if (event.keyCode === KEY_CODE_ARROW_LEFT && index - 1 >= 0) {
      inputList[index - 1].focus();
      return;
    }

    // delete previous element when hit backspace
    if (event.keyCode === KEY_CODE_BACKSAPCE && index - 1 >= 0) {
      deleteChar(inputList, index - 1);
      event.preventDefault();
      return;
    }

    if (event.keyCode === KEY_CODE_DELETE && index >= 0) {
      deleteChar(inputList, index);
      event.preventDefault();
      return;
    }

    if (!NUMBER_ONLY_REGEX.test(event.key)) {
      event.preventDefault();
      return;
    }
    event.target.value = event.key;
    if (index + 1 < inputList.length) {
      inputList[index + 1].focus();
      event.preventDefault();
    }
    event.target.setSelectionRange(0, 0);
  });

  element.addEventListener("focus", function (event) {
    event.preventDefault();
    event.target.setSelectionRange(0, 0);
  });
  element.addEventListener("click", function (event) {
    event.preventDefault();
    event.target.setSelectionRange(0, 0);
  });
}

function isCursorLast(event) {
  return event.target.selectionStart === event.target.value.length;
}
function isCursorFirst(event) {
  return event.target.selectionStart === 0;
}

function deleteChar(inputList, index) {
  for (let i = index; i < inputList.length - 1; i++) {
    inputList[i].value = inputList[i + 1].value;
  }
  inputList[inputList.length - 1].value = "";
  inputList[index].focus();
  inputList[index].setSelectionRange(0, 0);
}
