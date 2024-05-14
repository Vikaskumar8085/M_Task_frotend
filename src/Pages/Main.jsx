import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import React, { useEffect } from "react";
import axiosinstance from "../ApiServices/Axiosinstance";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { setAllmember, setLoader } from "../Redux/CurdSlice";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { PaginationControl } from "react-bootstrap-pagination-control";
import toast from "react-hot-toast";

function Main() {
  const [show, setShow] = React.useState(false);
  const [isId, setID] = React.useState("");
  const [showpopup, setpopup] = React.useState(false);
  const [page, setPage] = React.useState(1);
  console.log(page);
  const [isTotal, setTotal] = React.useState("");
  const [IsName, setName] = React.useState("");
  const [IsEmail, setEmail] = React.useState("");
  const [IsAge, setAge] = React.useState("");
  const dispatch = useDispatch();
  const AllMembers = useSelector((state) => state.curd.values);

  // add Data

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(setLoader(true));

      const curddata = {
        stud_email: IsEmail,
        stud_name: IsName,
        stud_age: IsAge,
      };

      const apicall = await axiosinstance.post("/add-member", curddata);
      if (apicall.status === 200) {
        getallmembers();
        setEmail("");
        dispatch(setLoader(false));
        toast.success(apicall.data);
        setName("");
        setAge("");
      }
      setShow(false);
    } catch (error) {
      console.log(error?.response?.data, "///////////");
      toast.error(error?.response?.data);
      dispatch(setLoader(false));
    }
  };
  // edit

  const handleEdit = async (value) => {
    console.log(value);
  };
  // get all members
  const getallmembers = async () => {
    dispatch(setLoader(true));

    try {
      const apicall = await axiosinstance.get(`/get-all-members?page=${page}`);
      if (apicall.status === 200) {
        dispatch(setAllmember(apicall.data));
        dispatch(setLoader(false));

        setTotal(apicall?.data.total);
      }
    } catch (error) {
      console.error(error.response?.data);
      toast.error(error?.response?.data);
      dispatch(setLoader(false));
    }
  };

  // delete Data

  const hadleRemove = async (value) => {
    console.log(value);
    dispatch(setLoader(true));
    try {
      const apicall = await axiosinstance.delete(`/remove-member/${value}`);
      if (apicall.status === 200) {
        dispatch(setLoader(false));
        toast.success(apicall?.data);

        setpopup(false);
        getallmembers();
      }
    } catch (error) {
      console.error(error.response?.data);
      dispatch(setLoader(false));
      setpopup(false);
      toast.error(error?.response?.data);
    }
  };

  useEffect(() => {
    getallmembers();
  }, [page]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="wrapper">
        <div className="wrapper_head">
          <h1>All Members</h1>
        </div>
        <div className="member_box">
          <div className="addmember_container">
            <input type="Number" value={isTotal} disabled />
            <button onClick={handleShow}> Add New Member +</button>
            {show && (
              <Modal show={show} centered onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-uppercase ">
                    Add New Members{" "}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        required
                        type="text"
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
                        required
                        className="w-100 my-2 p-2"
                        placeholder="Please Enter Your Age"
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
                </Modal.Body>
              </Modal>
            )}
          </div>
          <div className="member_table">
            <Table className="my-3" striped responsive bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Student Email</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {AllMembers?.msg?.map((item, index) => {
                return (
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.stud_name}</td>
                      <td>{item.stud_email}</td>
                      <td>{item.stud_age}</td>

                      <td
                        className={
                          "d-flex align-items-center justify-content-center"
                        }
                      >
                        <Link
                          to={`/view/${item._id}`}
                          className="text-transform-none "
                        >
                          <IoEyeOutline />{" "}
                        </Link>
                        &nbsp;&nbsp;
                        <div>
                          <MdDeleteOutline
                            style={{ color: "red", fontSize: "1em" }}
                            onClick={() => {
                              setpopup(true);
                              setID(item._id);
                            }}
                          />
                        </div>
                        {showpopup && (
                          <>
                            <div className="modal_wrapper">
                              <div className="modal_box">
                                <AiOutlineClose className="icons mb-3" />
                                <h6 className="mb-3">Are you sure ?</h6>
                                <p>
                                  if you delete this member then it can be
                                  deleted permanently
                                </p>

                                <div className="box_button">
                                  <button
                                    style={{ backgroundColor: "#30c0fef4" }}
                                    onClick={() => hadleRemove(isId)}
                                  >
                                    delete
                                  </button>
                                  <button
                                    style={{ backgroundColor: "#fe4b30f4" }}
                                    onClick={() => setpopup(false)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        &nbsp;&nbsp;
                        <Link to={`/Edit/${item._id}`}>
                          <MdOutlineModeEditOutline />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>

            <div className="paginate d-flex justify-content-between">
              <PaginationControl
                page={parseInt(page)}
                last
                next={true}
                prev={true}
                total={isTotal}
                limit={5}
                changePage={(page) => {
                  setPage(page);
                }}
                ellipsis={1}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
