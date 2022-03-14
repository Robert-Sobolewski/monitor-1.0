import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/userSlice";
import "./SideComp.css";
const SideComp = (props: any) => {
  //const { position } = props;
  const users = useSelector(selectUser);
  const [cUser, setCUser] = useState(null);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(e.currentTarget.id);
    //position()
  };
  return (
    <Fragment>
      <div className="side-comp">
        <aside>
          <div className="list-group">
            {users.length > 0 &&
              users.map((user, index) => (
                <Link
                  id={user.id}
                  // onClick={handleClick}
                  key={user.id}
                  to={`/map/${user.id}`}
                  className="list-group-item list-group-item-action"
                >
                  {user.user}
                </Link>
              ))}
            {/* <a
              href="#"
              className="list-group-item list-group-item-action active"
              aria-current="true"
            >
              The current link item
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              A second link item
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              A third link item
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              A fourth link item
            </a>
            <a className="list-group-item list-group-item-action disabled">
              A disabled link item
            </a> */}
          </div>
        </aside>
      </div>
    </Fragment>
  );
};

export default SideComp;
