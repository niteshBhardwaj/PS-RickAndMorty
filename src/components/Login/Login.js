import React from "react";
import { Link } from "react-router-dom";
import FormCont from "../common/FormCont";
import TextField from "../common/TextField";
import { Box, Button, Typography, Grid } from "@material-ui/core";
import { LOGIN_QUERY } from "../../apolloClient/query/loginSignupQuery";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../../ClientServices/AuthStorage";
import { withUserSetting } from "../common/UserSettingProvider";
import { Helmet } from "react-helmet-async";

function Login(props) {
  const [variables, setVariables] = React.useState({
    email: "",
    password: "",
  });
  const { history } = props;
  const [login, { loading }] = useMutation(LOGIN_QUERY);

  const onChange = (value, name) => {
    variables[name] = value;
    setVariables({ ...variables });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await login({ variables: { ...variables } });
      Auth.setToken(data.login.token);
      props.setLoggedIn(true);
      return history.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (<>
    <Helmet>
         <title>Login - Ricky And Monty</title>
    </Helmet>
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: `calc(100vh - 96px)` }}
    >
      <Grid item sm={8} md={6} lg={4}>
        <Typography variant="h4">
          <b>Login</b>
        </Typography>
        <Typography variant="caption">
          Don't have an account? <Link to="/signup">Register</Link>
        </Typography>

        <Box>
          <FormCont onSubmit={onSubmit}>
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
                "Please Enter your email",
                "Please Enter valid email!",
              ]}
              getValue={onChange}
            />
            <TextField
              type="password"
              label="Password"
              placeholder="Enter Your Password"
              name="password"
              validators={["required", "passwordLength"]}
              inputProps={{
                'aria-label': 'password',
              }}
              errorMessages={[
                "Please Enter your password",
                "Password length should be between 6 and 20",
              ]}
              getValue={onChange}
            />
            <Box mt={4}>
              <Button
                size="large"
                disabled={loading}
                variant="contained"
                type="submit"
                color="primary"
              >
                Login
              </Button>
            </Box>
          </FormCont>
        </Box>
      </Grid>
    </Grid>
  </>);
}

export default withUserSetting(Login);
