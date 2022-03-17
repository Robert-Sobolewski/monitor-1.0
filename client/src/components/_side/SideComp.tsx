import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as Link, useLocation } from "react-router-dom";
import { IInformation, selectData } from "../../redux/dataSlice";
import { selectUser } from "../../redux/userSlice";
import "./SideComp.scss";
const SideComp = (props: any) => {
  //const { position } = props;
  const users = useSelector(selectUser);
  const [cUser, setCUser] = useState(null);
  const dispatch = useDispatch();
  const data: IInformation[] = useSelector(selectData);
  const location = props.loc; //useLocation();
  const map = props.map;
  useEffect(() => {
    // console.log("location path =", location);
    // console.log("location props", props.loc);
  }, []);
  const handleClick = (e: React.MouseEvent, map: any, user: IInformation) => {
    // e.preventDefault();
    // console.log("map current", map?.current);
    // if (location === "/map") {
    //   map?.current.setView(user.country.latlng, 14);
    // }
    //position()
  };

  return (
    <Fragment>
      <div className="side-comp">
        <aside>
          <div className="list-group">
            {data.length > 0 &&
              data.map((user, index) =>
                user.message == "" ? (
                  <Link
                    id={user.id}
                    // onClick={(e) => handleClick(e, map, user)}
                    key={index}
                    to={`${location}/${user.id}`}
                    className="list-group-item list-group-item-action"
                  >
                    {user.user}
                  </Link>
                ) : null
              )}
          </div>
        </aside>
      </div>
    </Fragment>
  );
};

export default SideComp;
