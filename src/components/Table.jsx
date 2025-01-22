import React from "react";
import { CiCircleMore } from "react-icons/ci";

const Table = ({ data, onEditClicked }) => {
  return (
    <div className="p-8">
      <div className="overflow-x-auto bg-white rounded-3xl p-5 border">
        <table className="min-w-full border-collapse">
          <thead className="">
            <tr>
              <th className="px-4 py-2 text-left text-gray-800 font-medium">
                Full Name
              </th>
              <th className="px-4 py-2 text-left text-gray-800 font-medium">
                User ID
              </th>
              <th className="px-4 py-2 text-left text-gray-800 font-medium">
                Branch
              </th>
              <th className="px-4 py-2 text-left text-gray-800 font-medium">
                Email
              </th>
              <th className="px-4 py-2 text-left text-gray-800 font-medium">
                User Type
              </th>
              <th className="px-4 py-2 text-left text-gray-800 font-medium">
                Status
              </th>
              <th className="px-4 py-2 text-left text-gray-800 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data && data.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-gray-700 font-medium">
                  {item.name}
                </td>
                <td className="px-4 py-2 text-gray-500">{item.id}</td>
                <td className="px-4 py-2 text-gray-500">{item.branch}</td>
                <td className="px-4 py-2 text-gray-500">{item.email}</td>
                <td className="px-4 py-2 text-gray-500">{item.type}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${item.color}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500">
                  <button
                    className="px-2 py-1 text-gray-500 hover:text-gray-700 text-xl"
                    onClick={() => onEditClicked(item)}
                  >
                    <CiCircleMore />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
          Previous
        </button>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 text-sm rounded-md ${
                page === 3
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
