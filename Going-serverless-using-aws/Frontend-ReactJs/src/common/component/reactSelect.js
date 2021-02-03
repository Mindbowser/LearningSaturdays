import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const ReactSelect = ({
  className,
  placeholder,
  value,
  isMulti,
  id,
  isSearchable,
  handleSelectChange,
  isDisabled,
  options,
  defaultValue
}) => {
  return (
    <Select
      value={value}
      isMulti={isMulti}
      onChange={handleSelectChange}
      options={options}
      isSearchable={isSearchable}
      placeholder={placeholder}
      classNamePrefix="select"
      id={id}
      className={className}
      isDisabled={isDisabled}
      defaultValue={defaultValue}
      // menuIsOpen={options !== null}
    />
  );
};

ReactSelect.propTypes = {
  handleSelectChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  invalid: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  isDisabled: PropTypes.bool,
  defaultValue: PropTypes.array
};

ReactSelect.defaultProps = {
  className: undefined,
  id: undefined,
  leftIcon: undefined,
  inputRef: undefined,
  placeholder: "",
  isMulti: false,
  isSearchable: false,
  isDisabled: false,
  options: null,
  handleSelectChange: () => {
    console.log("error");
  }
};

export default ReactSelect;
