type Props = {
  text?: string;
  background?: string;
} & {
  [key: string]: unknown;
};

export const COLORS = {
  DEFAULT: "bg-yellow-600 hover:bg-yellow-500",
  RED: "bg-red-600 hover:bg-red-400",
};

export default function Button(props: Props) {
  return (
    <button
      {...props}
      className={`transition-all duration-150 w-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 ${
        props.background || COLORS.DEFAULT
      }`}
    >
      {props.text || "Button"}
    </button>
  );
}
