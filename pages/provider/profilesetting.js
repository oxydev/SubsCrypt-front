import ChangePassword from "../../componenets/setting/changePassword";
import {Setting} from "../../styles/pageStyle"

export default function ProfileSetting() {
  return (
    <Setting className="ProfileSetting">
      <h1>Profile Setting</h1>
      <div className="row">
        <div className="Container--medium">
          <ChangePassword type="provider" />;
        </div>
        <div className="Container--small"></div>
      </div>
    </Setting>
  );
}
