/** @format */
import { Circle } from "better-react-spinkit";
function Loading() {
  return (
    <div className="mt-72 mx-auto flex flex-col items-center">
      <Circle color="#53B8BB" size={100} />
      <p className="text-xl mt-4 font-bold text-blue-500  animate-bounce">
        ...Loading...
      </p>
    </div>
  );
}

export default Loading;
