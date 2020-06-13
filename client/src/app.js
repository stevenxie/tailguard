import React, { useState } from "react";
import styled from "@emotion/styled";

import { ApolloProvider } from "@apollo/client";

import { client } from "./api";
import Rules from "./rules";
import Login from "./login";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 32rem;
  margin: 4rem auto;
`;

function App() {
  const [secret, setSecret] = useState(null);
  return (
    <ApolloProvider client={client}>
      <Container>
        {secret ? <Rules secret={secret} /> : <Login onSubmit={setSecret} />}
      </Container>
    </ApolloProvider>
  );
}
export default App;
