import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Link from "../../Link";
import Button from "../../Button";
import "../style.css";

const ADD_STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>
      <div className="RepositoryItem-title-action">
        {stargazers.totalCount} Stars
      </div>
      <div>
        {!viewerHasStarred ? (
          <Mutation mutation={ADD_STAR_REPOSITORY} variables={{ id }}>
            {(addStar, { data, loading, error }) => (
              <Button
                className={"RepositoryItem-title-action"}
                onClick={addStar}
              >
                Star {stargazers.totalCount}
              </Button>
            )}
          </Mutation>
        ) : (
          <Mutation mutation={REMOVE_STAR_REPOSITORY} variables={{ id }}>
            {(removeStar, { data, loading, error }) => (
              <Button
                className={"RepositoryItem-title-action"}
                onClick={removeStar}
              >
                UnStar {stargazers.totalCount}
              </Button>
            )}
          </Mutation>
        )}
        {/* Here comes your updateSubscription mutation */}
      </div>
    </div>
    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="RepositoryItem-description-details">
        <div>
          {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
        </div>
        <div>{owner && <span></span>}</div>
      </div>
    </div>
  </div>
);

export default RepositoryItem;
