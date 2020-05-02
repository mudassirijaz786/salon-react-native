import * as yup from "yup";
import { Formik } from "formik";
import React, { Component, Fragment, AsyncStorage } from "react";
import { StyleSheet, View } from "react-native";
import {
  TextInput,
  Button,
  Title,
  ActivityIndicator,
} from "react-native-paper";
import { Block, theme, Text } from "galio-framework";
import { showMessage } from "react-native-flash-message";

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "ijazmudassir786@gmail.com",
      errorMsg: "",
      isLoading: false,
    };
  }
  async loginCall(JsonObj) {
    // const token = await AsyncStorage.getItem("x-auth-token");
    this.setState({ isLoading: true });

    const response = await fetch(
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/UserSignup/forgot/password",
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JsonObj),
      }
    );
    if (response.status === 200) {
      this.setState({ isLoading: false });
      showMessage({
        message: "Email sent successfully",
        type: "success",
      });

      this.props.navigation.navigate("TokenForgetPassword");
    } else {
      this.setState({ isLoading: false });

      showMessage({
        message: "There occured an error",
        type: "danger",
      });
    }
  }
  async handleSubmit(values) {
    if (values) {
      var obj = {};
      obj["email"] = values.email;
      // this.setState({ isLoading: true });

      this.loginCall(obj);
      // this.setState({ isLoading: false });
    }
  }
  render() {
    console.log(this.state.isLoading);
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="#0000ff"
          />
        ) : (
          <Title
            color="black"
            size={28}
            style={{ paddingBottom: 8, marginLeft: 120 }}
          >
            Forget password
          </Title>
        )}

        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit.bind(this)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <Fragment>
              <TextInput
                label="email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                placeholder="please enter your email"
                style={{ marginTop: 15, backgroundColor: "transparent" }}
                mode="flat"
              />
              {touched.email && errors.email && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errors.email}
                </Text>
              )}
              <Button
                style={{ marginTop: 30, borderRadius: 40 }}
                icon="cached"
                disabled={!isValid || this.state.isLoading}
                mode="outlined"
                loading={this.state.isLoading}
                contentStyle={{ height: 50 }}
                onPress={handleSubmit}
                uppercase={false}
              >
                Get token
              </Button>

              <Block
                row
                style={{
                  paddingVertical: 3,
                  alignItems: "baseline",
                  marginTop: 20,
                  marginLeft: 100,
                }}
              >
                <Text size={16}>Don't have an account? </Text>
                <Text
                  size={16}
                  color={theme.COLORS.PRIMARY}
                  onPress={() => this.props.navigation.navigate("Registration")}
                >
                  Signup
                </Text>
              </Block>
              <Block
                row
                style={{
                  paddingVertical: 3,
                  alignItems: "baseline",
                  marginTop: 2,
                  marginLeft: 100,
                }}
              >
                <Text size={16}>Have an account? </Text>
                <Text
                  size={16}
                  color={theme.COLORS.PRIMARY}
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  Login
                </Text>
              </Block>
            </Fragment>
          )}
        </Formik>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    margin: 10,
  },
});
