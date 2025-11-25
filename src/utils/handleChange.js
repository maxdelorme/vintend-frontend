const handleChange = (event, formData, setformData) => {
  const key = event.target.name;
  const value =
    event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;
  setformData({ ...formData, [key]: value });
};
export default handleChange;
