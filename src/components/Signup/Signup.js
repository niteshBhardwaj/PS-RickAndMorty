import React from "react";
import { Link } from "react-router-dom";
import FormCont from "../common/FormCont";
import TextField from "../common/TextField";
import { Box, Button, Typography, Grid } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { SIGNUP_QUERY } from "../../apolloClient/query/loginSignupQuery";
import { Helmet } from "react-helmet-async";
import { updateMessage } from "../../apolloClient/cacheResolvers";

function Signup(props) {
  let { history } = props;
  const [variables, setVariables] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [signup, {client, loading}] = useMutation(SIGNUP_QUERY);
  const onChange = ({target}) => {
    let {name, value} = target;
    variables[name] = value;
    setVariables({ ...variables });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ variables: { ...variables } });
      updateMessage(client, {message: "Signup Successful!"})
      history.replace("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (<>
    <Helmet>
         <title>Signup - Ricky And Monty</title>
    </Helmet>
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "calc(100vh - 96px)" }}
    >
      <Grid item sm={8} md={6} lg={4}>
        <Typography variant="h4">
          <b>Register</b>
        </Typography>
        <Typography variant="caption">
          Already have an account?? <Link to="/login">Log In</Link>
        </Typography>
        <Box>
          <FormCont onSubmit={onSubmit}>
            <TextField
              type="text"
              label="Name"
              placeholder="Enter your full name"
              name="name"
              inputProps={{
                'aria-label': 'name',
              }}
              validators={["required"]}
              errorMessages={["Please enter your name"]}
              value={variables.name}
              onChange={onChange}
            />
            <TextField
              type="text"
              label="Email"
              placeholder="Enter your email"
              name="email"
              validators={["required", "email"]}
              inputProps={{
                'aria-label': 'email',
              }}
              errorMessages={[
                "Please enter your email",
                "Please enter valid email!",
              ]}
              value={variables.email}
              onChange={onChange}
            />
            <TextField
              type="password"
              label="Password"
              placeholder="Enter your password"
              name="password"
              value={variables.password}
              validators={["required", "passwordLength"]}
              inputProps={{
                'aria-label': 'password',
              }}
              errorMessages={[
                "Please enter your password",
                "Password length should be between 6 and 20",
              ]}
              onChange={onChange}
            />
            <Box mt={4}>
              <Button
                size="large"
                disabled={loading}
                variant="contained"
                type="submit"
                color="primary"
              >
                Sign Up
              </Button>
            </Box>
          </FormCont>
        </Box>
      </Grid>
    </Grid>
  </>);
}

export default Signup;
