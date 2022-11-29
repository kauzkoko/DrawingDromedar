export const useIax = () => {
  const { x, y } = useMouse();
  const { width, height } = useWindowSize();
  return { x, y, width, height };
};
