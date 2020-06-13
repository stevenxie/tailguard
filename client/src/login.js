import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Login({ onSubmit }) {
  const [secret, setSecret] = useState("");
  return (
    <Container>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(secret);
        }}
      >
        <label>
          <p>twitter secret:</p>
          <input
            type="text"
            value={secret}
            onChange={({ target }) => setSecret(target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </Container>
  );
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
