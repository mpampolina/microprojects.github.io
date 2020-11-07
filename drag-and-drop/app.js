const draggables = document.querySelectorAll(".draggable");
const dragBoards = document.querySelectorAll(".dragBoard");

function getElemMidCoord(elem) {
  const elemBounds = elem.getBoundingClientRect();
  const elemMidX = elemBounds.left + elemBounds.width / 2;
  const elemMidY = elemBounds.top + elemBounds.height / 2;
  return [elemMidX, elemMidY];
}

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

dragBoards.forEach((dragBoard) => {
  dragBoard.addEventListener("dragover", (e) => {
    dragging = document.querySelector(".dragging");
    justAfterDraggable = justAfter(dragBoard, e.clientX, e.clientY);
    console.log(justAfterDraggable.element);
    if (justAfterDraggable.element == null) {
      dragBoard.append(dragging);
    } else {
      dragBoard.insertBefore(dragging, justAfterDraggable.element);
    }
  });
});

function justAfter(dragBoard, cursorX, cursorY) {
  const dragging = document.querySelector(".dragging");
  const dragBoardChildren = [...dragBoard.children];
  const draggingIndex = dragBoardChildren.indexOf(dragging);
  dragBoardChildren.splice(draggingIndex, 1);

  return dragBoardChildren.reduce(
    (justAfterElement, element) => {
      elementBounds = element.getBoundingClientRect();
      horizontalOffset = cursorX - elementBounds.left - elementBounds.width / 2;
      verticalOffset = cursorY - elementBounds.top - elementBounds.height / 2;
      if (
        horizontalOffset < 0 &&
        horizontalOffset > justAfterElement.offsetH &&
        verticalOffset < 0 &&
        verticalOffset > justAfterElement.offsetV
      ) {
        return {
          offsetH: horizontalOffset,
          offsetV: verticalOffset,
          element: element,
        };
      } else {
        return justAfterElement;
      }
    },
    {
      offsetV: Number.NEGATIVE_INFINITY,
      offsetH: Number.NEGATIVE_INFINITY,
    }
  );
}
