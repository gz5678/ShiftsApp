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
                            inputProps={{ style: { textAlign: "center" } }}
                        ></TextField>
                        <FormHelperText>
                            <div align="center">Email</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={{ minWidth: 210, paddingLeft: 20 }}>
                        <Select label="Team Lead" defaultValue={30}>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormHelperText>
                        <div align="center">Team Lead</div>
                    </FormHelperText>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
