interface ButtonProps {
  type?: string;
  children?: any;
}
export default function Button(props: ButtonProps) {
  const { type, children } = props;
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
    <div className="flex space-x-2 justify-center">
      <div>
        <button
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
