import React from "react";
import { Link } from "react-router-dom";
import { AnimatedButton } from "../common/styled_comp/Button.style";
import { StraightLine } from "../common/styled_comp/divStyles.style";

 



function AdminDashbord({ handleLogout }) {
  return (
    <div className="container pt-5">
      <card className="card w-75 mx-auto shadow mt-5 bg-dark text-light">
        <h5 className="card-title mt-3 ms-3">Admin Profile</h5>

        <StraightLine className="w-100" />

        <div className="card-body w-75 mx-auto">
          <AnimatedButton className="my-2 w-100">
            <Link to="/addproduct" className="text-decoration-none text-dark">
              Create new Product
            </Link>
          </AnimatedButton>

          <AnimatedButton className="my-2 bg-secondary w-100">
            <Link to="/producttable" className="text-decoration-none text-light">
              Product Table
            </Link>
          </AnimatedButton>

          <AnimatedButton
            className="my-2 bg-danger w-100"
            onClick={handleLogout}
          >
            <div className="text-decoration-none text-light">Logout</div>
          </AnimatedButton>
        </div>
      </card>
    </div>
  );
}

export default AdminDashbord;
