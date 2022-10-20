import { usePlane } from "@react-three/cannon";
import { useCallback } from "react";
import { NearestFilter, RepeatWrapping } from "three";
import { groundTexture } from "../assets/textures";
import { useStore } from "../hooks/useStore";

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));
  const [addCube] = useStore((state: any) => [state?.addCube]);

  groundTexture.repeat.set(100, 100);

  const handleAddCube = useCallback((e: any) => {
    e.stopPropagation();

    const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
    addCube(x, y, z);

    addCube(x, y, z);
  }, []);

  return (
    <mesh ref={ref} onClick={handleAddCube}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
