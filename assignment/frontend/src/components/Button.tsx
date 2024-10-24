type Props = {
  text?: string;
  className?: string;
} & {
  [key: string]: unknown;
};

export default function Button(props: Props) {
  return (
    <button
      className={`transition-all duration-150 w-full rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 ${props.className}`}
    >
      {props.text || "Button"}
    </button>
  );
}
