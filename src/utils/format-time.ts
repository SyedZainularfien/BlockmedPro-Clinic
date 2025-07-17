export const formatTime = (timer: number): string => {
  const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const seconds = String(timer % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};
