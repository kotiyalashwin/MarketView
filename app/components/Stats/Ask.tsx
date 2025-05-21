const Ask = ({ asks }: { asks: [string, string][] }) => {
  let total = 0;

  asks.reverse();
  const withTotal: [string, string, number][] = [];

  for (let i = asks.length - 1; i >= 0; i--) {
    const [price, quantity] = asks[i];
    withTotal.push([price, quantity, (total += Number(quantity))]);
  }

  const maxTotal = asks.reduce(
    (acc, [, quantity]) => acc + Number(quantity),
    0
  );

  withTotal.reverse();
  return (
    <div className="space-y-[2px]">
      {withTotal.map(([price, quantity, number], i) => {
        return (
          <div key={i} className=" relative flex ">
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: `${(100 * number) / maxTotal}%`,
                height: "100%",
                background: "rgba(228, 75, 68, 0.325)",
                transition: "width 0.3s ease-in-out",
              }}
            ></div>
            <div className="flex items-center justify-between w-full">
              <p className="text-red-600 ">{parseFloat(price).toFixed(2)}</p>
              <p>{parseFloat(quantity).toFixed(2)}</p>
              <p>{number.toFixed(2)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Ask;
