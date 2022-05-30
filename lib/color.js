const colors = ['#5096ff', '#e60053', '#00ddb5', '#dde100', '#8458ff', '#ffa800'];

export const getColor = () => {
  let color = colors[Math.floor(Math.random() * colors.length)];
  return color;
};