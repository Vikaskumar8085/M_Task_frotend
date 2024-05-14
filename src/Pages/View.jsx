import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosinstance from "../ApiServices/Axiosinstance";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setLoader } from "../Redux/CurdSlice";
function View() {
  const [IsData, setIsData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getSingleData = async () => {
    dispatch(setLoader(true));

    try {
      const apicall = await axiosinstance.get(`/single-member/${id}`);
      //   console.log(apicall);
      if (apicall.status === 200) {
        setIsData(apicall.data);
        dispatch(setLoader(false));
      }
    } catch (error) {
      console.error(error.response?.data);
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    getSingleData();
  }, [0]);

  return (
    <>
      <div className="view_wrapper">
        <button className="viewiconbtn" onClick={() => navigate("/")}>
          <IoIosArrowRoundBack className="icon" />
        </button>

        <ul>
          <h3> Student Data</h3>
          <li>
            <h5>Student Name</h5>
            <p>{IsData?.stud_name}</p>
          </li>
          <li>
            <h5>Student Email</h5>
            <p> {IsData?.stud_email}</p>
          </li>
          <li>
            <h5>Student Age</h5>
            <p>{IsData?.stud_age}</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default View;
