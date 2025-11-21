import "./switch.css";
const Switch = ({ isON, setIsON, size, color }) => {
  const defaultClassNames = "switch ";

  return (
    <div
      data-color={color}
      data-size={size}
      className={defaultClassNames + (isON ? "active" : "")}
      onClick={() => {
        setIsON(!isON);
      }}
    ></div>
  );
};

export default Switch;
