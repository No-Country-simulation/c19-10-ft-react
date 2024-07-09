const Button = ({ text }) => (
  <button
    className={`bg-primary text-white py-2 px-4 rounded-md hover:bg-accent
              text === "ACCEDER" ? "px-6" : ""
          }`}
  >
    {text}
  </button>
);

export default Button;
