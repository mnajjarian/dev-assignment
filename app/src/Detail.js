import React from "react";
import { Link } from "react-router-dom";

const Detail = props => {
  const { packages, id } = props;
  if (!packages || !id) {
    return <div></div>;
  }
  const pack = packages.filter(pack => pack.Package === id.replace("/", ""));

  const filterOnDepends = packages.filter(p => p.Depends);

  const getDepends = pack =>
    filterOnDepends.filter(p => p.Depends.includes(pack));

  const dependMatch = d => d.match(/([A-Za-z-]+)+\S+/g)[0];

  return (
    <div>
      <div className="App-nav">
        <Link to="/">{"<< Back"}</Link>
      </div>
      {pack.map(p => (
        <table key={p.Package}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Dependencies</th>
              <th>Related Packages</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{p.Package}</td>
              <td>{p.Description}</td>
              <td>
                {p.Depends
                  ? p.Depends.split(",").map((d, index) => (
                      <Link key={d} to={`/${dependMatch(d)}`}>
                        {dependMatch(d)}
                        {index + 1 < p.Depends.split(",").length ? (
                          <span>|</span>
                        ) : (
                          ""
                        )}
                      </Link>
                    ))
                  : "No Dependency"}
              </td>
              <td>
                {getDepends(p.Package).length > 0
                  ? getDepends(p.Package).map((d, index) => (
                      <Link to={d.Package}>
                        {d.Package}{" "}
                        {index + 1 < getDepends(p.Package).length ? (
                          <span>|</span>
                        ) : (
                          ""
                        )}
                      </Link>
                    ))
                  : "No Package"}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default Detail;
