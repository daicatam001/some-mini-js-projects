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
  element.addEventListener("paste", function (event) {
    event.preventDefault()
    const paste = (event.clipboardData || window.clipboardData).getData("text");
    if(!paste){
      return;
    }
    const last = Math.min(inputList.length, paste.length + index);
    for (let i = index; i < last; i++) {
      if (NUMBER_ONLY_REGEX.test(paste[i - index])) {
        inputList[i].value = paste[i - index];
      }
    }
    onFocus(inputList[last - 1]);
   
  });

  element.addEventListener("keydown", async function (event) {
    // jumb back and forth when hit tab
    if (event.keyCode === KEY_CODE_TAB) {
      if (event.shiftKey && index - 1 >= 0) {
        onFocus(inputList[index - 1]);
        event.preventDefault();
      } else if (!event.shiftKey && index + 1 < inputList.length) {
        onFocus(inputList[index + 1]);
        event.preventDefault();
      }
      return;
    }

    // jump into next input when hit arrow right
    if (
      event.keyCode === KEY_CODE_ARROW_RIGHT &&
      index + 1 < inputList.length
    ) {
      onFocus(inputList[index + 1]);
      event.preventDefault();
      return;
    }
    // jump into preview input when hitt arrow right
    if (event.keyCode === KEY_CODE_ARROW_LEFT && index - 1 >= 0) {
      onFocus(inputList[index - 1]);
      event.preventDefault();
      return;
    }

    // delete current and jump back
    if ([KEY_CODE_BACKSAPCE, KEY_CODE_DELETE].includes(event.keyCode)) {
      deleteCharAndJumpBack(inputList, index);
      event.preventDefault();
      return;
    }

    if (!event.ctrlKey) {
      event.preventDefault();
      if (!NUMBER_ONLY_REGEX.test(event.key)) {
        return;
      }
      event.target.value = event.key;
      if (index + 1 < inputList.length) {
        onFocus(inputList[index + 1]);
      } else {
        onFocus(inputList[index]);
      }
    }
  });
}

function isCursorLast(event) {
  return event.target.selectionStart === event.target.value.length;
}
function isCursorFirst(event) {
  return event.target.selectionStart === 0;
}

function deleteCharAndJumpBack(inputList, index) {
  inputList[index].value = "";
  if (index > 0) {
    onFocus(inputList[index - 1]);
  }
}
function onFocus(element) {
  element.focus();
  element.setSelectionRange(0, 0);
}
