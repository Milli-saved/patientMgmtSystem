import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Toaster } from "sonner";

const getAllFeedbacks = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/feedback/getFeedback`
    );
    return response.data.data;
  } catch (error) {
    return error.message;
  }
};

const feedback = () => {
  const {
    data: feedbackData,
    isLoading: feedbackDataLoading,
    isError: feedbackDataError,
  } = useQuery({
    queryKey: ["allfeedbacks"],
    queryFn: getAllFeedbacks,
  });

  console.log("the feedbacks: ", feedbackData.data);
  return (
    <>
      <div className="mx-10">
        <Toaster position="top-right" richcolors />
        <div className="flex justify-center items-center">
          <h1 className="m-5 text-5xl font-semibold text-gray-800">
            Feedbacks
          </h1>
          {/* <button
            // onClick={() => setCreateNewPatientModal(true)}
            className="text-black bg-green-400 hover:bg-green-700 hover:text-white rounded-lg text-lg p-5 h-8 ms-auto inline-flex justify-center items-center"
          >
            Create New patient Record
          </button> */}
        </div>
        <div>
          <h1 className="m-5 text-3xl font-semibold text-gray-800">
            Feedback List
          </h1>
          {/* <Table data={data} /> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {feedbackData &&
              feedbackData.data.map((eachFeedback, index) => (
                <div
                  key={index}
                  className={`relative bg-white shadow-md rounded-xl p-8 border transition duration-300 ease-in-out transform hover:shadow-xl`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Patient Id: {eachFeedback.patientID}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-1">
                    Date: {eachFeedback.date}{" "}
                  </p>

                  <p className="text-gray-800 font-semibold">
                    content : {eachFeedback.content}{" "}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default feedback;
