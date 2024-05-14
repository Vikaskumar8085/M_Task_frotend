import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import axiosinstance from "../ApiServices/Axiosinstance";
import { useDispatch } from "react-redux";
import { setLoader } from "../Redux/CurdSlice";
import toast from "react-hot-toast";

function Edit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [IsName, setName] = React.useState("");
  const [IsEmail, setEmail] = React.useState("");
  const [IsAge, setAge] = React.useState("");

  const handleSubmit = async (e) => {
    dispatch(setLoader(true));

    e.preventDefault();
    try {
      const curddata = {
        stud_name: IsName,
        stud_email: IsEmail,
        stud_age: IsAge,
      };

      const apicall = await axiosinstance.put(`Edit-member/${id}`, curddata);
      if (apicall.status === 200) {
        setEmail("");
        dispatch(setLoader(false));
        toast.success(apicall?.data);

        setName("");
        setAge("");
        navigate("/");
      }
    } catch (error) {
      console.error(error?.response?.data);
      toast.error(error.response?.data);

      dispatch(setLoader(false));
    }
  };

  //   single data
  const getSingleData = async () => {
    dispatch(setLoader(true));

    try {
      const apicall = await axiosinstance.get(`/single-member/${id}`);
      // console.log(apicall);
      if (apicall.status === 200) {
        setName(apicall?.data?.stud_name);
        dispatch(setLoader(false));
        // toast.success(apicall?.data);
        setEmail(apicall?.data?.stud_email);
        setAge(apicall?.data?.stud_age);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error.response?.data);

      console.error(error.response?.data);
    }
  };

  useEffect(() => {
    getSingleData();
  }, [0]);

  return (
    <>
      <div className="Edit_wrapper">
        <button className="editiconbtn" onClick={() => navigate("/")}>
          <IoIosArrowRoundBack className="icon" />
        </button>

        <div className="form_wrapper">
          <h1>update Student Data</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="" htmlFor="Name">
                Name
              </label>
              <input
                type="text"
                className="w-100 my-2 p-2"
                placeholder="Please Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                value={IsName}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                required
                className="w-100 my-2 p-2"
                placeholder="Please Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={IsEmail}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Age">Age</label>
              <input
                type="text"
                className="w-100 my-2 p-2"
                placeholder="Please Enter Your Age"
                required
                onChange={(e) => setAge(e.target.value)}
                value={IsAge}
              />
            </div>
            <div className="mb-3 d-flex justify-content-center">
              <button
                className="text-uppercase"
                type="submit"
                style={{
                  backgroundColor: "green",
                  padding: "10px 20px",
                  border: "none",
                  color: "white",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
