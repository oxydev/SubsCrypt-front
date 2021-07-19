import { useContext } from "react";
import { UserContext } from "../../../context/store";
import * as utils from "../../../utilities/utilityFunctions";

export default function ProviderEachUser(props) {
  const { userInfo, userIndex } = props;
  const { globalState } = useContext(UserContext);
  console.log(userInfo);
  console.log(plan);
  const planIndex = userInfo.pan_index;
  const plan = globalState.providerPlans[planIndex];
  const planName = plan.name;
  const startTime = utils.timeStamptoDate(parseInt(subscryptionInfo.start_time.replace(/,/g, "")));
  const duration = utils.duration(parseInt(plan.duration.replace(/,/g, "")));
  const amount = plan.amount;
  const characteristicsValue = subscryptionInfo.characteristics;
  const characteristics = plan.characteristics.map((item, index) => (
    <div className="userCharacteristics">
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
