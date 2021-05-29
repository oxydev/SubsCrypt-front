// import React, { useContext } from "react";
// import SubscryptionOffers from "../../componenets/user/userSubscryption/subscryptionOffers";
// import UserPlansList from "../../componenets/user/userSubscryption/userPlansList";
// import { UserContext } from "../../context/store";

// export default function MySubscryptions() {
//   const { globalState, disptach } = useContext(UserContext);

//   //User plans data
//   let plans = [];
//   // plans = globalState.plans;

//   return (
//     <div className="userDashboard">
//       <h1>My Subscryption</h1>
//       <div className="row">
//         <div className="Container--medium">
//           {plans.length > 0 ? <UserPlansList /> : <SubscryptionOffers />}
//         </div>
//         <div className="Container--small"></div>
//       </div>
//     </div>
//   );
// }
