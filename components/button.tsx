interface ButtonProps {
  type?: string;
  children?: any;
  onClick?: () => void;
}
export default function Button(props: ButtonProps) {
  const { type, children, onClick } = props;
  const color: { [index: string]: string } = {
    primary: "bg-blue-600",
    secondery: "bg-purple-600",
    success: "bg-green-500",
    danger: "bg-red-600",
    warning: "bg-yellow-500",
    info: "bg-blue-400",
    dark: "bg-gray-800",
  };
  return (
    <div className="flex justify-center space-x-2">
      <div>
        <button
          onClick={onClick}
          type="button"
          className={`inline-block px-6 py-2.5 ${
            color[type ?? "primary"]
          } text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
        >
          {children}
        </button>
      </div>
    </div>
  );
}
