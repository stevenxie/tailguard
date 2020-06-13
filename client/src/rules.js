import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import head from "lodash/head";
import { isEmpty } from "lodash";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const RULES = gql`
  query($secret: String!) {
    rules(secret: $secret)
  }
`;

const UPDATE_RULES = gql`
  mutation($input: UpdateRulesInput!, $secret: String!) {
    updateRules(input: $input, secret: $secret)
  }
`;

const DEFAULT_RULE = `/**
 * A function that filters out followers.
 *
 * @param {TwitterUser} user - See https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object
 */
module.exports = function(user) {
  const { screen_name } = user;
  console.log(\`rule: handling user @\${screen_name}\`);

  return screen_name !== "_stevenxie";
}
`;

function Rules({ secret }) {
  const { data: rulesData, error: fetchError } = useQuery(RULES, {
    variables: { secret },
  });
  const [updateRules, { error: updateError }] = useMutation(UPDATE_RULES);

  if (fetchError) alert(JSON.stringify(fetchError));
  if (updateError) alert(JSON.stringify(updateError));

  const [rule, setRule] = useState(DEFAULT_RULE);
  useEffect(() => {
    const { rules = [] } = rulesData ?? {};
    setRule(head(rules) ?? DEFAULT_RULE);
  }, [rulesData]);

  return (
    <Container>
      <h1>rules</h1>
      <p>
        Write a Javascript filter that returns true to keep a follower, and
        false to prune them.
      </p>
      <br />
      <textarea
        rows={16}
        value={rule}
        onChange={({ target }) => setRule(target.value)}
      />
      <button
        onClick={() => {
          const trimmedRule = rule.trim();
          updateRules({
            variables: {
              input: {
                rules: isEmpty(trimmedRule) ? [] : [trimmedRule],
              },
              secret,
            },
          });
        }}
      >
        save rules
      </button>
    </Container>
  );
}

Rules.propTypes = {
  secret: PropTypes.string.isRequired,
};

export default Rules;
