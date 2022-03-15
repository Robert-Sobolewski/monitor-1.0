import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as Link, useLocation } from "react-router-dom";
import { IInformation, selectData } from "../../redux/dataSlice";
import { selectUser } from "../../redux/userSlice";
import "./SideComp.css";
const SideComp = (props: any) => {
  //const { position } = props;
  const users = useSelector(selectUser);
  const [cUser, setCUser] = useState(null);
  const dispatch = useDispatch();
  const data: IInformation[] = useSelector(selectData);
  const location = props.loc; //useLocation();
  useEffect(() => {
    console.log("location path =", location);
    console.log("location props", props.loc);
  }, []);
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
            {data.length > 0 &&
              data.map((user, index) => (
                <Link
                  id={user.id}
                  // onClick={handleClick}
                  key={index}
                  to={`${location}/${user.id}`}
                  className="list-group-item list-group-item-action"
                >
                  {user.user}
                </Link>
              ))}
          </div>
        </aside>
      </div>
    </Fragment>
  );
};

export default SideComp;
