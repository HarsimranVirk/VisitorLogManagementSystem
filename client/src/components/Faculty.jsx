import React from 'react'
import { Typography, Container, Grid, TextField, Paper, Button } from '@material-ui/core';
import "./Error.css";
import constants from "../constants";

function Faculty(props) {
	const { userToken } = props;

	const [form, updateForm] = React.useState({
		firstName: "",
		lastName: "",
		designation: "",
		department: "",
		email: "",
	});

	const [errors, setErrors] = React.useState({
		firstName: "",
		designation: "",
		department: "",
		email: "",
	});

	function isFormValid() {
		let formIsValid = true;
		if (!form.firstName) {
			formIsValid = false;
			setErrors(prevErrors => ({
				...prevErrors,
				firstName: "*First Name cannot be empty",
			}));
		}

		if (!form.department) {
			formIsValid = false;
			setErrors(prevErrors => ({
				...prevErrors,
				department: "*Department name cannot be empty",
			}));
		}

		if (!form.designation) {
			formIsValid = false;
			setErrors(prevErrors => ({
				...prevErrors,
				designation: "*Designation cannot be empty",
			}));
		}

		if (!form.email) {
			formIsValid = false;
			setErrors(prevErrors => ({
				...prevErrors,
				email: "*Email cannot be empty",
			}));
		}

		return formIsValid;
	}

	function handleChange(event) {
		const { name, value } = event.target;
		updateForm(prevDetails => {
			return (
				{
					...prevDetails,
					[name]: value
				}
			);
		});

	}

	const handleClick = (event) => {
		if (isFormValid()) {
			event.preventDefault();
			console.log(userToken);
			fetch(`${constants.FACULTY}create`, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": sessionStorage.getItem("adminToken")
				},
				body: JSON.stringify(form),
			})
				.then(res => {
					if (res.status === 200) return res.json();
					else {
						sessionStorage.clear();
						if (response.status===400) alert("Token invalid. Access prohibited");
						else if (response.status===401) alert("Unauthorised transaction");
						return { msg: "There was an error" };
					}
				})
				.then(response => {
					if (response.msg === "Faculty added successfully")
						alert(`Faculty ${form.firstName} ${form.lastName} added sucessfully!`);
				})
				.catch((err) => {
					console.log(err);
				}
				);
		}
		else {
			alert('There are errors in your form !');
		}
	}

	return (
		<Container maxWidth="sm">
			<header>
				<div className="heading">
					<Typography variant="h4">
						FACULTY ENTRY
					</Typography>
				</div>
			</header>
			<Paper style={{ padding: 16 }} id="from_style">
				<Grid container alignItems="flex-start" spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							required
							name="firstName"
							type="text"
							placeholder="First Name"
							onChange={handleChange}
							value={form.firstName}
						/>
						<div className="errorMsg">{errors.firstName}</div>
					</Grid>

					<Grid item xs={6}>
						<TextField
							fullWidth
							required
							name="lastName"
							type="text"
							placeholder="Last Name"
							onChange={handleChange}
							value={form.lastName}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextField
							fullWidth
							required
							name="designation"
							type="text"
							placeholder="Designation"
							onChange={handleChange}
							value={form.designation}
						/>
						<div className="errorMsg">{errors.designation}</div>
					</Grid>

					<Grid item xs={6}>
						<TextField
							fullWidth
							required
							name="department"
							type="text"
							placeholder="Department"
							onChange={handleChange}
							value={form.department}
						/>
						<div className="errorMsg">{errors.department}</div>
					</Grid>

					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							onChange={handleChange}
							type="email"
							placeholder="Email"
							name="email"
							value={form.email} />
						<div className="errorMsg">{errors.email}</div>
					</Grid>

					<Grid container item justify="center">
						<Button onClick={handleClick} variant="contained" color="secondary">Submit</Button>
					</Grid>
				</Grid>
			</Paper>
		</Container>

	)
}

export default Faculty;