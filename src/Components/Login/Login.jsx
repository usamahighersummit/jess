import React from "react";
import LoginPageLeftSide from "./LoginPageLeftSide";
import LoginPageRightSide from "./LoginPageRightSide";

function Login() {
  return (
    <React.Fragment>
      <section>
        <div className="w-auto h-auto grid  text-white text-4xl md:grid-cols-2 sm:grid-cols-1 overflow-hidden">
          <LoginPageLeftSide />
          <LoginPageRightSide />

          <div className="jess_footer left-[35px] md:left-[35px] sm:left-[30px] md:block sm:hidden">
            {/* <Footer></Footer> */}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Login;
