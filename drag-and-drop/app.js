const draggables = document.querySelectorAll(".draggable");
const dragBoards = document.querySelectorAll(".dragBoard");

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
    if (justAfterDraggable.element === null) {
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
      cumOffset = horizontalOffset + verticalOffset
      if (
        horizontalOffset < 0 &&
        verticalOffset < 0 &&
        cumOffset > justAfterElement.cumOffset
      ) {
        return {
          cumOffset: cumOffset,
          element: element,
        };
      } else {
        return justAfterElement;
      }
    },
    { cumOffset: Number.NEGATIVE_INFINITY }
  );
}
