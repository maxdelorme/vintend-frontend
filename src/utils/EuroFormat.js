import format from "format-number";
var myFormat = format({
  suffix: " €",
  integerSeparator: " ",
  decimal: ",",
  padRight: 2,
  round: 2,
});
export default myFormat;
