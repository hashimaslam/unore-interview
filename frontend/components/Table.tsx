"use client";
import { useFetchWithdraws } from "@/api/api";
import { formatNumber, truncateAddress } from "@/utils/number";
import Link from "next/navigation";
import { useMemo } from "react";
import Spinner from "./Spinner";

const TABLE_HEAD = ["ID", "From", "To", "Amount", "Tx hash", "Date"];

function Table() {
  const { data, isPending, isFetching } = useFetchWithdraws({
    refetchInterval: 120000,
  });
  const withdraws = useMemo(() => data?.withdraws, [data]);
  return (
    <div className="h-full w-full  border border-gray-200 shadow-sm rounded">
      {(isFetching || isPending) && (
        <div className="flex justify-center items-center p-8">
          <Spinner />
        </div>
      )}
      {!isPending && !isFetching && (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-gray-50 p-4"
                >
                  <div className="font-semibold leading-none opacity-70 text-gray-800">
                    {head}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {withdraws?.map(
              ({ from, to, timestamp, amountUSD, id, hash }, index) => {
                const isLast = index === withdraws.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                const date = new Date(parseInt(timestamp) * 1000);
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="font-normal text-gray-800">
                        {truncateAddress(id)}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="font-normal text-gray-800">
                        {truncateAddress(from)}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="font-normal text-gray-800">
                        {truncateAddress(to)}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="font-normal text-gray-800">
                        $
                        {formatNumber(parseFloat(amountUSD), {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </td>
                    <td className={classes}>
                      <a
                        href={`https://etherscan.io/tx/${hash}`}
                        className="font-normal text-gray-800 underline"
                        target="_blank"
                      >
                        {truncateAddress(hash)}
                      </a>
                    </td>
                    <td className={classes}>
                      <div className="font-normal text-gray-800">
                        {date.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
