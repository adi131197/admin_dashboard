import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import { config } from "./config/config";

const App = () => {
  let [users, setUsers] = useState([]);
  let [isEditable, setIsEditable] = useState(false);
  let [editUser, setEditUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  let [checkedUsers, setCheckedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    getUsers();
  }, []);

  /* Function to Get All Users */
  const getUsers = async () => {
    try {
      let { data } = await axios.get(`${config.endpoint}/members.json`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  /* Function to handle Single and Multiple Delete User */
  const handleDelete = (id) => {
    let newUsers = [...users];

    if (id === "All") {
      let index = users.findIndex((i) => i.id === checkedUsers[0]);
      newUsers.splice(index, recordsPerPage);
      setCheckedUsers([]);
    } else {
      let index = users.findIndex((i) => i.id === id);
      newUsers.splice(index, 1);
    }

    setUsers(newUsers);
  };

  /* Function to handle Edit User */
  const handleEdit = (user) => {
    setIsEditable(true);
    setEditUser(user);
  };

  /* Function to handle Changes in User Details */
  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  /* Funcion to Update User Details */
  const handleUpdate = () => {
    let newUsers = [...users];
    let { id, name, email, role } = editUser;

    let index = newUsers.findIndex((user) => user.id === id);
    newUsers[index].name = name;
    newUsers[index].email = email;
    newUsers[index].role = role;
    setIsEditable(false);

    setUsers(newUsers);
  };

  /* Function to Handle Search Functionality */
  const handleSearch = (searchItem) => {
    if (searchItem === "") {
      getUsers();
    } else {
      let newUsers = users.filter((user) => {
        return (
          user.name.startsWith(searchItem) ||
          user.email.startsWith(searchItem) ||
          user.role.startsWith(searchItem)
        );
      });

      setUsers(newUsers);
    }
  };

  /* Function to handle Check box Clicked */
  const handleCheckClick = (id) => {
    if (id === "All") {
      let usersId = currentRecords.map((user) => user.id);
      if (checkedUsers.includes(usersId[0])) {
        setCheckedUsers([]);
      } else {
        setCheckedUsers(usersId);
      }
    } else {
      let checkedUsersCopy = [...checkedUsers];

      let index = checkedUsersCopy.indexOf(id);

      if (index !== -1) {
        // User Already checked, so remove the user
        checkedUsersCopy.splice(index, 1);
        setCheckedUsers(checkedUsersCopy);
      } else {
        // Add the User
        setCheckedUsers([...checkedUsersCopy, id]);
      }
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(users.length / recordsPerPage);

  return (
    <>
      <Header />
      <div className="container">
        <Search handleSearch={handleSearch} />
        <Table
          users={currentRecords}
          isEditable={isEditable}
          editUser={editUser}
          checkedUsers={checkedUsers}
          handleUpdate={handleUpdate}
          handleEdit={handleEdit}
          handleChange={handleChange}
          handleDelete={handleDelete}
          handleCheckClick={handleCheckClick}
        />
        {checkedUsers.length > 0 && (
          <button
            className="btn btn-primary mb-2"
            onClick={() => handleDelete("All")}
          >
            Delete Selected
          </button>
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default App;
