import React from "react";
import RepositoryItem from "../RepositoryItem";
import FetchMore from "../../FetchMore";
import "../style.css";

const updateQuery = (entry) => (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    [entry]: {
      ...previousResult[entry],
      repositories: {
        ...previousResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...previousResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges,
        ],
      },
    },
  };
};

const RepositoryList = ({ repositories, fetchMore, loading, entry }) => (
  <>
    {repositories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
      </div>
    ))}
    <FetchMore
      loading={loading}
      hasNextPage={repositories.pageInfo.hasNextPage}
      variables={{
        cursor: repositories.pageInfo.endCursor,
      }}
      updateQuery={updateQuery(entry)}
      fetchMore={fetchMore}
    >
      Repositories
    </FetchMore>
  </>
);

export default RepositoryList;
