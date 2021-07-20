import ChangePassword from "../../componenets/setting/changePassword";

export default function ProfileSetting() {
  return (
    <section className="ProfileSetting">
      <h1>Profile Setting</h1>
      <div className="row">
        <div className="Container--medium">
          <ChangePassword type="provider" />;
        </div>
        <div className="Container--small"></div>
      </div>
    </section>
  );
}
