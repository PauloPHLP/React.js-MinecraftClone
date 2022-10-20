import { nanoid } from "nanoid";
import create from "zustand";

const getLocalStorage = (key: string) => {
  const element = window.localStorage.getItem(key);

  if (element) return JSON.parse(element);
};

const setLocalStorage = (key: string, value: any) => {
  return window.localStorage.setItem(key, JSON.stringify(value));
};

export const useStore = create((set) => ({
  texture: "dirt",
  cubes: getLocalStorage("cubes") || [],
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev?.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  removeCube: (cubeX, cubeY, cubeZ) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [x, y, z] = cube.pos;

        return cubeX !== x || cubeY !== y || cubeZ !== z;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => {
    set((prev) => {
      setLocalStorage("cubes", prev.cubes);
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
