import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@material-ui/core/";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const [teamLeads, setTeamLeads] = useState(
        JSON.stringify({ I_am_a_team_lead: "I am a team lead" })
    );
    const [teamLead, setTeamLead] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get("email"),
            password: data.get("password"),
            username: data.get("username"),
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            teamLead: data.get("teamLead"),
        });
    };

    useEffect(() => {
        axios
            .get("/api/user/teamleads")
            .then((response) => response.data)
            .then((data) => {
                const transformed = data.reduce(
                    (cur, val) => ({
                        ...cur,
                        [val.username]: val.first_name + " " + val.last_name,
                    }),
                    {}
                );
                const cur = JSON.parse(teamLeads);
                setTeamLeads(
                    JSON.stringify({
                        ...cur,
                        ...transformed,
                    })
                );
            });
    }, [teamLeads]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, color: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="user"
                                    label="Username"
                                    type="username"
                                    id="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel id="select-label" variant="standard">
                                        Team Lead
                                    </InputLabel>
                                    <Select
                                        placeholder="Team Lead"
                                        labelId="select-label"
                                        label="Team Lead"
                                        name="teamLead"
                                        id="teamLead"
                                        value={teamLead}
                                        onChange={(event) => {
                                            setTeamLead(event.target.value);
                                        }}
                                    >
                                        {Object.keys(JSON.parse(teamLeads)).map(
                                            (key) => {
                                                return (
                                                    <MenuItem value={key} key={key}>
                                                        {JSON.parse(teamLeads)[key]}
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
