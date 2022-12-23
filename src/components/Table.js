import React from "react";
import "./Table.css";

const Table = ({
  users,
  isEditable,
  editUser,
  checkedUsers,
  handleEdit,
  handleChange,
  handleDelete,
  handleUpdate,
  handleCheckClick,
}) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => handleCheckClick("All")}
                checked={checkedUsers.length > 0 ? true : false}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={checkedUsers.includes(user.id) ? "selected" : ""}
            >
              <td>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() => handleCheckClick(user.id)}
                  checked={checkedUsers.includes(user.id) ? true : false}
                />
              </td>
              <td>
                {isEditable && user.id === editUser.id ? (
                  <input
                    type="text"
                    className="edit-text-input"
                    value={editUser.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {isEditable && user.id === editUser.id ? (
                  <input
                    type="text"
                    className="edit-text-input"
                    value={editUser.email}
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {isEditable && user.id === editUser.id ? (
                  <input
                    type="text"
                    className="edit-text-input"
                    value={editUser.role}
                    name="role"
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                <button className="button">
                  {isEditable && user.id === editUser.id ? (
                    <i
                      className="fa fa-check"
                      aria-hidden="true"
                      onClick={() => handleUpdate()}
                    ></i>
                  ) : (
                    <i
                      className="fa fa-pencil-square-o"
                      aria-hidden="true"
                      onClick={() => handleEdit(user)}
                    ></i>
                  )}
                </button>
                <button
                  className="button delete-button"
                  onClick={() => handleDelete(user.id)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
