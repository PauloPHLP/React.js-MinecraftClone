import { useBox } from "@react-three/cannon";
import { useCallback, useState } from "react";
import { useStore } from "../hooks/useStore";
import * as textures from "../assets/textures";

export const Cube = ({ position, texture }: any) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));
  const [isHovered, setIsHovered] = useState(false);
  const [addCube, removeCube] = useStore((state: any) => [
    state.addCube,
    state.removeCube,
  ]);

  const activeTexture = textures[`${texture}Texture`];

  const handleAddCube = useCallback((e: any) => {
    e.stopPropagation();

    const clickedFace = Math.floor(e.faceIndex / 2);
    const { x, y, z } = ref?.current?.position;

    if (e.altKey) {
      removeCube(x, y, z);

      return;
    } else if (clickedFace === 0) {
      addCube(x + 1, y, z);

      return;
    } else if (clickedFace === 1) {
      addCube(x - 1, y, z);

      return;
    } else if (clickedFace === 2) {
      addCube(x, y + 1, z);

      return;
    } else if (clickedFace === 3) {
      addCube(x, y - 1, z);

      return;
    } else if (clickedFace === 4) {
      addCube(x, y, z + 1);

      return;
    } else if (clickedFace === 5) {
      addCube(x, y, z - 1);

      return;
    }
  }, []);

  const handlePointer = useCallback((e, isHovered) => {
    e.stopPropagation();

    setIsHovered(isHovered);
  }, []);

  return (
    <mesh
      ref={ref}
      onClick={handleAddCube}
      onPointerMove={(e) => handlePointer(e, true)}
      onPointerOut={(e) => handlePointer(e, false)}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        map={activeTexture}
        color={isHovered ? "grey" : "white"}
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
        attach="material"
      />
    </mesh>
  );
};
