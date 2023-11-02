import React from "react";
import { Link } from "react-router-dom";
import "./Interest.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete, AiFillPlusSquare } from "react-icons/ai";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { number } from "yup";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Interest() {
  const [interet, setInterest] = useState([]);
  let index = 0;
  let subtitle;
  const [addIt, setAddIt] = useState({
    id: null,
    term: number,
    type: 1,
    percent: number,
  });
  const [checkRefesh, setCheckRefesh] = useState(true);

  const handelIndex = () => {
    index += 1;
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenAdd, setIsOpenAdd] = React.useState(false);

  function openModal(i) {
    setIsOpen(true);
    setAddIt(i);
  }
  function openModalAdd() {
    setIsOpenAdd(true);
    setAddIt({
      id: null,
      term: number,
      type: 1,
      percent: number,
    });
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeModalAdd() {
    setIsOpenAdd(false);
  }

  const handelDelete = (id) => {
    const usecf = window.confirm("Bạn có chắc chắn xóa");
    if (usecf === true) {
      axios
        .delete("http://localhost:8084/api/loan/delete-interest", {
          data: { id: id },
        })
        .then((response) => {
          toast.success("Delete success", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          setCheckRefesh(!checkRefesh);
        })
        .catch((error) => {
          console.log(error);
          toast.error("error");
        });
    }
  };

  const handelSave = () => {
    console.log(addIt);
    if (addIt.term > 0 && addIt.percent > 0) {
      axios
        .post("http://localhost:8084/api/loan/set-interest", { ...addIt })
        .then((response) => {
          toast.success("Add success", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          setCheckRefesh(!checkRefesh);
          closeModalAdd();
          closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Term và percent không hợp lệ");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8084/api/loan/find-all-interest")
      .then((respnse) => {
        setInterest(respnse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [checkRefesh]);

  const handleInputTermChange = (event) => {
    setAddIt({ ...addIt, term: Number(event.target.value) });
  };

  const handleInputPercentChange = (event) => {
    setAddIt({ ...addIt, percent: Number(event.target.value) });
  };

  return (
    <div>
      <ToastContainer />
      <div className="header-loan">
        <Link className="loan">Interest</Link>
        <Link className="loan" to="/customer-loan">
          Customer loan
        </Link>
      </div>
      <div className="form-interest">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Term</th>
              <th scope="col">Percent</th>
              <th scope="col">Edit</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {interet.map((i) => {
              handelIndex();
              return (
                <tr className="interest">
                  <td>{index}</td>
                  <td>{i.term}</td>
                  <td>{i.percent}</td>
                  <td>
                    <FiEdit
                      className="fi-edit"
                      onClick={() => {
                        openModal(i);
                      }}
                    />
                  </td>
                  <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                      Edit Interest
                    </h2>
                    <div>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Term</th>
                            <th scope="col">Percent</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <input
                                defaultValue={addIt.term}
                                type="number"
                                onChange={handleInputTermChange}
                                className="term-input"
                              />
                            </td>
                            <td>
                              <input
                                defaultValue={addIt.percent}
                                type="number"
                                onChange={handleInputPercentChange}
                                className="percent-input"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="edit-button-form">
                      <button className="save-button" onClick={handelSave}>
                        Save
                      </button>
                      <button className="close-button" onClick={closeModal}>
                        close
                      </button>
                    </div>
                  </Modal>
                  <td>
                    <AiFillDelete
                      className="ad"
                      onClick={() => handelDelete(i.id)}
                    />
                  </td>
                </tr>
              );
            })}
            <AiFillPlusSquare className="add-interest" onClick={openModalAdd} />
            <Modal
              isOpen={modalIsOpenAdd}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalAdd}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Interest</h2>
              <div>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Term</th>
                      <th scope="col">Percent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="number"
                          onChange={handleInputTermChange}
                          className="term-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          onChange={handleInputPercentChange}
                          className="percent-input"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="add-button-form">
                <button className="save-button" onClick={handelSave}>
                  Save
                </button>
                <button className="close-button" onClick={closeModalAdd}>
                  close
                </button>
              </div>
            </Modal>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Interest;
