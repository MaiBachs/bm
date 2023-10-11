import React from "react";

function Home() {
  return (
    <div className="flex justify-center mx-auto py-1 grid grid-cols-4 mt-8 bg-white">
      <form className="col-start-2 col-span-2">
        <div className="flex rounded-sm bg-gray-100 p-1">
          <input
            type="text"
            className="flex-grow border-none bg-transparent px-3 py-2 text-black outline-none"
            placeholder="Tìm kiếm "
          />
          <button className="flex-shrink-0 rounded-sm bg-blue-100 py-2 px-6 hover:opacity-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
