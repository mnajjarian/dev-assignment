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
              <th>Depends</th>
              <th>Packages</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{p.Package}</td>
              <td>{p.Description}</td>
              {p.Depends && (
                <td>
                  {p.Depends.split(",").map(d => (
                    <Link key={d} to={`/${dependMatch(d)}`}>
                      {dependMatch(d) + " | "}
                    </Link>
                  ))}
                </td>
              )}
              {getDepends(p.Package) && (
                <td>
                  {getDepends(p.Package).map(d => (
                    <Link to={d.Package}>{d.Package + " | "}</Link>
                  ))}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default Detail;
