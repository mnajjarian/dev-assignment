import React from "react";
import { Link } from "react-router-dom";

const Package = props => {
  const { packages } = props;
  if (!packages) {
    return <div></div>;
  }
  return (
    <div className="App-packages">
      {packages.map((pack, index) => (
        <div key={pack.Package} className="App-pack">
          <div className="App-pack-row">
            <span>{index + 1}</span>
            <Link to={`/${pack.Package}`}>{pack.Package}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Package;
