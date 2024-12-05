
const Input = (props) => {
  const { type, options, ...rest } = props;

  switch (type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
    case 'date':
    case 'url':
    case 'tel':
      return <input type={type} {...rest} />;
    case 'select':
      return (
        <select {...rest}>
          {options && options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    default:
      return <div>Unsupported input type</div>;
  }
};

export default Input;
