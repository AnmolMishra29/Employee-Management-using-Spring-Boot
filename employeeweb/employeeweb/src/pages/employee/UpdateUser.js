import React, { useEffect, useState } from "react";
import "./UpdateUser.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/employee/${id}`
        );
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.log("Error fetching user :", error.message);
      }
    };
    fetchEmployee();
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(e);

    try {
      const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert("Employee Updated Successfully");
      console.log("User Updated", data);
      navigate("/");
    } catch (err) {
      console.log("Error updating employee", err.message);
      alert("Failed to update Employee");
    }
  };

  return (
    <>
      <div className="center-form">
        <h1>Edit Employee</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="department"
              placeholder="Enter Department"
              value={formData.department}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Edit Employee
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateUser;
