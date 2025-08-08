export default function Dot({
  size = 'h-3 w-3',
  color = 'bg-white',
  textColor = 'text-black',
  parentClass = 'col-span-12 mb-[40px] lg:mb-0 lg:col-span-3',
}: {
  size?: string;
  color?: string;
  textColor?: string;
  parentClass?: string;
}) {
  return (
    <div className={`${parentClass}`}>
      <h2
        className={`flex ${textColor} items-center text-[clamp(1rem,.9058823529411765rem + .23529411764705876vw,1.2rem)] large leading-[120%] font-medium`}
      >
        <span
          className={`inline-block ${size} ${color} rounded-full mr-4 transition-colors duration-300 group-hover:bg-green-300`}
        ></span>
      </h2>
    </div>
  );
}
