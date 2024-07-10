const Button = ({ text, redirect, className }) => (
  <button
    onClick={redirect}
    className={`bg-primary text-white py-2 px-4 rounded-md  transform transition-transform duration-200 ${
      text === "REGÍSTRATE"
        ? "hover:bg-white hover:text-accent hover:scale-105"
        : "hover:bg-primary hover:scale-105"
    } ${className}`}
  >
    {text}
  </button>
);

export default Button;
