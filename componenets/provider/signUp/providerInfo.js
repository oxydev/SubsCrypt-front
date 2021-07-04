import React, { useContext, useEffect } from "react";
import ImageUploader from "./imageUploader";
import { UserContext } from "../../../context/store";

export default function ProviderInfo(props) {
  const { globalState, dispatch } = useContext(UserContext);
  const { info, setInfo } = props;
  console.log(info);
  const defaultUsername = globalState.user.username;

  useEffect(() => {
    if (defaultUsername) {
      setInfo({ ...info, ProviderUsername: defaultUsername });
    }
  });

  return (
    <section className="ProviderInfo">
      <h1>Service Provider Infromation</h1>
      <form className="ProviderForm">
        <div className="ProviderForm-info">
          <label htmlFor="ProviderName">Service Provide Name</label>
          <input
            type="text"
            required
            minLength={3}
            name="ProviderName"
            placeholder="Name of the service provider"
            onChange={(e) => {
              setInfo({ ...info, ProviderName: e.target.value });
            }}
          />
          <p>Your company or website who provides services</p>
          <label htmlFor="ProviderDescription">Service Provider Description</label>
          <input
            type="text"
            required
            minLength={10}
            name="ProviderDescription"
            placeholder="Description"
            onChange={(e) => {
              setInfo({ ...info, ProviderDescription: e.target.value });
            }}
          />
          <p>A description of your company or website. Will be shown in a tooltip</p>
          <label htmlFor="ProviderUserName">Service Provider Username</label>
          <input
            type="text"
            required
            minLength={6}
            name="ProviderUserName"
            placeholder="Username"
            value={info.ProviderUsername}
            disabled={defaultUsername ? true : false}
            onChange={(e) => {
              setInfo({ ...info, ProviderUsername: e.target.value });
            }}
          />
          <p>Your username will store on the block chain.</p>
          <label htmlFor="ProviderPassword">Service Provider Password</label>
          <input
            type="password"
            required
            minLength={6}
            name="ProviderPassword"
            placeholder="type your password"
            value={info.ProviderUsername}
            disabled={defaultUsername ? true : false}
            onChange={(e) => {
              setInfo({ ...info, ProviderPassword: e.target.value });
            }}
          />
          <p>Confirm your password</p>
          <label htmlFor="ProviderConfirmedPassword">Service Provider Username</label>
          <input
            type="password"
            required
            minLength={6}
            name="ProviderConfirmedPassword"
            placeholder="Repeat your password"
            value={info.ProviderUsername}
            disabled={defaultUsername ? true : false}
            onChange={(e) => {
              setInfo({ ...info, ProviderConfirmedPasswords: e.target.value });
            }}
          />
          <p>Edit your money address if needed.</p>
          <label htmlFor="ProviderCMoneyAddress">Service Provider Username</label>
          <input
            type="text"
            required
            minLength={6}
            name="ProviderCMoneyAddress"
            placeholder="Type your money address"
            value={info.ProviderMoneyAddress}
            onChange={(e) => {
              setInfo({ ...info, ProviderMoneyAddress: e.target.value });
            }}
          />
          <p>This is the main money address for your account.</p>
        </div>
        <div className="ProviderForm-photoUpload">
          <label>Upload Brand Photo</label>
          <ImageUploader />
          <p>
            Upload PNG or SVG file 48 pixel x 48 pixel. This photo will be published in plans as the
            provider reference.
          </p>
        </div>
      </form>
    </section>
  );
}
