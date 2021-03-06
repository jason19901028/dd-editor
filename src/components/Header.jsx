import React, { Fragment, useReducer, forwardRef } from "react";
import styles from "./header.less";
import classNames from "classnames";
import { useDataShare } from "./shared";
import { createFromIconfontCN } from "./IconFont";

function setZoom(ref, size) {
  ref.setAttribute(
    "style",
    `transform:scale(${size});transform-origin:left top;`
  );
}

const initialState = { count: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      // eslint-disable-next-line no-case-declarations
      const counts = state.count + 0.1;
      setZoom(action.ref, counts);
      return { count: counts };
    case "decrement":
      // eslint-disable-next-line no-case-declarations
      const dCount = state.count - 0.1;
      if (dCount <= 0.1) {
        return { count: 0.1 };
      }
      setZoom(action.ref, dCount);
      return { count: dCount };
    case "preview":
      // eslint-disable-next-line no-case-declarations
      const { clientWidth, scrollWidth } = action.ref.current;
      // eslint-disable-next-line no-case-declarations
      let pCount = 1;
      if (state.count === 1) {
        pCount = clientWidth / scrollWidth;
      } else {
        pCount = 1;
      }
      setZoom(action.ref, pCount);
      return { count: pCount };
    default:
      throw new Error();
  }
}
const Header = forwardRef((props, canvasRef) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: ["//at.alicdn.com/t/font_1986533_vk4mok8me3k.js"],
  });
  // eslint-disable-next-line no-unused-vars
  const [cunter, cDispatch] = useReducer(reducer, initialState);
  // console.log("cunter=", cunter);
  const onZoomIn = () => {
    cDispatch({ type: "increment", ref: canvasRef.current.children[1] });
  };
  const onZoomOut = () => {
    cDispatch({ type: "decrement", ref: canvasRef.current.children[1] });
  };
  const undo = () => {
    useDataShare.excute({ command: "undo" });
  };
  const redo = () => {
    useDataShare.excute({ command: "redo" });
  };
  return (
    <Fragment>
      <header className={styles["header-wraper"]}>
        <IconFont
          type="icon-undo"
          className={classNames(
            styles["toolbar-icon"],
            useDataShare.stack.undoStack.count <= 0
              ? styles["toolbar-icon-default"]
              : ""
          )}
          onClick={undo}
        />
        <IconFont
          type="icon-redo"
          className={classNames(
            styles["toolbar-icon"],
            useDataShare.stack.redoStack.count <= 0
              ? styles["toolbar-icon-default"]
              : ""
          )}
          onClick={redo}
        />
        <IconFont
          type="icon-zoomin"
          className={classNames(styles["toolbar-icon"])}
          onClick={onZoomIn}
        />
        <IconFont
          type="icon-zoomout"
          className={classNames(styles["toolbar-icon"])}
          onClick={onZoomOut}
        />
      </header>
    </Fragment>
  );
});

export default Header;
