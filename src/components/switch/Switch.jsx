import "./switch.css";
const Switch = ({ isON, onClick, size, color }) => {
  const defaultClassNames = "switch ";

  return (
    <div
      data-color={color}
      data-size={size}
      className={defaultClassNames + (isON ? "active" : "")}
      onClick={() => {
        onClick(!isON);
      }}
    ></div>
  );
};

export default Switch;
