import { useContext } from "react";
import { UserContext } from "../../../context/store";
import * as utils from "../../../utilities/utilityFunctions";

//The component for generating every row of the subscripted users list
export default function ProviderEachUser(props) {
  const { userInfo, userIndex } = props;
  const { globalState } = useContext(UserContext);
  // console.log(userInfo);
  const planIndex = userInfo.plan_index;
  const plan = globalState.providerPlans[planIndex];

  console.log(plan);
  const planName = plan.name;
  const startTime = utils.timeStamptoDate(userInfo.start_time);
  const duration = utils.duration(parseInt(plan.duration.replace(/,/g, "")));
  const amount = parseInt(plan.price.replace(/,/g, "")) / Math.pow(10, 12);
  const characteristicsValue = userInfo.characteristics;
  const characteristics = plan.characteristics.map((item, index) => (
    <div key={"userCharacteristics" + index} className="userCharacteristics">
      <h4>{item}</h4>
      <p>{characteristicsValue[index]}</p>
    </div>
  ));

  return (
    <>
      <tr>
        <td>User No.{userIndex}</td>
        <td>{planName}</td>
        <td>{startTime}</td>
        <td>{duration}</td>
        <td>{amount}</td>
        <td>{characteristics}</td>
      </tr>
    </>
  );
}
