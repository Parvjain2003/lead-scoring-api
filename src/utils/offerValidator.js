function validateOffer(data) {
  if (!data || typeof data !== "object") {
    return "Invalid request body. Expected a JSON object.";
  }

  const { name, value_props, ideal_use_cases } = data;

  if (!name || !value_props || !ideal_use_cases) {
    return "Please provide name, value_props, and ideal_use_cases.";
  }

  if (typeof name !== "string")
    return "Invalid data type: name must be a string.";
  if (!Array.isArray(value_props))
    return "Invalid data type: value_props must be an array.";
  if (!Array.isArray(ideal_use_cases))
    return "Invalid data type: ideal_use_cases must be an array.";

  if (value_props.length === 0) return "value_props array cannot be empty.";
  if (ideal_use_cases.length === 0)
    return "ideal_use_cases array cannot be empty.";

  const invalidValueProps = value_props.filter((v) => typeof v !== "string");
  if (invalidValueProps.length > 0) return "All value_props must be strings.";

  const invalidUseCases = ideal_use_cases.filter((v) => typeof v !== "string");
  if (invalidUseCases.length > 0) return "All ideal_use_cases must be strings.";

  return null;
}

module.exports = { validateOffer };
