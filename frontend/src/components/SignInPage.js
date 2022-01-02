import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { MenuItem, Select } from "@material-ui/core/";
import { Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                email: "",
                team_lead: "",
            },
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { formData } = this.state;

        this.setState({
            formData: {
                ...formData,
                [event.target.name]: event.target.value,
            },
        });
    }

    handleClick(event) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                first_name: this.state.formData.firstName,
                last_name: this.state.formData.lastName,
                username: this.state.formData.username,
                password: this.state.formData.password,
                email: this.state.formData.email,
                team_lead: this.state.formData.team_lead,
            }),
        };
        console.log(this.state.formData);
        fetch("api/user/", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    render() {
        return (
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Sign into Shifts System
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="text"
                            name="firstName"
                            value={this.state.formData.firstName}
                            onChange={this.handleChange}
                            inputProps={{ style: { textAlign: "center" } }}
                        ></TextField>
                        <FormHelperText>
                            <div align="center">First Name</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="text"
                            name="lastName"
                            value={this.state.formData.lastName}
                            onChange={this.handleChange}
                            inputProps={{ style: { textAlign: "center" } }}
                        ></TextField>
                        <FormHelperText>
                            <div align="center">Last Name</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="text"
                            name="username"
                            value={this.state.formData.username}
                            onChange={this.handleChange}
                            inputProps={{ style: { textAlign: "center" } }}
                        ></TextField>
                        <FormHelperText>
                            <div align="center">Username</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="password"
                            name="password"
                            value={this.state.formData.password}
                            onChange={this.handleChange}
                            inputProps={{ style: { textAlign: "center" } }}
                        ></TextField>
                        <FormHelperText>
                            <div align="center">Password</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="email"
                            name="email"
                            value={this.state.formData.email}
                            onChange={this.handleChange}
                            inputProps={{ style: { textAlign: "center" } }}
                        ></TextField>
                        <FormHelperText>
                            <div align="center">Email</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={{ minWidth: 210, paddingLeft: 20 }}>
                        <Select
                            label="Team Lead"
                            name="team_lead"
                            value={this.state.formData.team_lead}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={"I am a team lead"}>I am a team lead</MenuItem>
                        </Select>
                    </FormControl>
                    <FormHelperText>
                        <div align="center">Team Lead</div>
                    </FormHelperText>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleClick}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
