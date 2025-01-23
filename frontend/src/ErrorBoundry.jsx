import React, { Component, Fragment } from "react";
// import somethingWentWrongIcon from "../public/somethingWentWrongIcon.svg";

export default class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Fragment>
          <section
            style={{ height: "100vh", overflow: "auto" }}
            className="flex flex-column justify-content-center align-items-center"
          >
            <img
              style={{
                objectFit: "contain",
                width: "15rem",
                height: "15rem",
              }}
              src={"/somethingWentWrongIcon.svg"}
              alt="Error Logo"
            />
            <h1
              style={{
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: 600,
                marginTop: "1rem",
                marginBottom: 0,
              }}
            >
              Oops! <br /> Something went wrong.☹️
            </h1>
            <h2
              style={{
                marginTop: "0.5rem",
                fontWeight: "normal",
                fontSize: "1rem",
              }}
            >
              Please try again
            </h2>
          </section>
        </Fragment>
      );
    }

    return this.props.children;
  }
}
