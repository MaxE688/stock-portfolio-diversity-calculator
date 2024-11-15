import clsx from "clsx";

interface Props {
  number: number
}

export default function RollingNumbers({ number }: Props) {
  // Used to print digits 0-1 to display score
  const digits = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

  // Used to store the digits of the diversity score
  const ones = number % 10;
  const tens = Math.floor(number / 10);

  // Sets the position of the columns of numbers
  const setRoll = (target: number) => {
    return clsx(
      {"roll-0": target === 0},
      {"roll-1": target === 1},
      {"roll-2": target === 2},
      {"roll-3": target === 3},
      {"roll-4": target === 4},
      {"roll-5": target === 5},
      {"roll-6": target === 6},
      {"roll-7": target === 7},
      {"roll-8": target === 8},
      {"roll-9": target === 9},
      
    );
  }

  const onesRoll = setRoll(ones);
  const tensRoll = setRoll(tens);

  return (
    <>
      <div className="rolling-numbers"> 
        <div className="num-col">
          {
            digits.map(( digit ) => (
              <h1 key={digit} className={`digit ${tensRoll}`}>
                {digit}
              </h1>
            ))
          }
        </div>
        <div className="num-col">
          {
            digits.map(( digit ) => (
              <h1 key={digit} className={`digit ${onesRoll}`}>
                {digit}
              </h1>
            ))
          }
        </div>
      </div>
    </>
  );
}