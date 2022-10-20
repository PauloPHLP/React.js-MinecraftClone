import { useCallback, useEffect, useMemo, useState } from "react";

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  const keyActionMap = useMemo((): { [key: string]: string } => {
    return {
      KeyW: "moveForward",
      KeyS: "moveBackward",
      KeyA: "moveLeft",
      KeyD: "moveRight",
      Space: "jump",
      Digit1: "dirt",
      Digit2: "grass",
      Digit3: "glass",
      Digit4: "wood",
      Digit5: "log",
    };
  }, []);

  const actionByKey = useCallback((key: string): string => {
    return keyActionMap[key];
  }, []);

  const handleKeyDown = useCallback(({ code }: { code: string }) => {
    const action = actionByKey(code);

    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: true,
        };
      });
    }
  }, []);

  const handleKeyUp = useCallback(({ code }: { code: string }) => {
    const action = actionByKey(code);

    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: false,
        };
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};
