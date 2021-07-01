import React from "react";
import ImageUploader from "./imageUploader";

export default function ProviderInfo(props) {
  const { info, setInfo } = props;

  return (
    <section className="ProviderInfo">
      <h1>Service Provider Infromation</h1>
      <form className="ProviderForm">
        <div className="ProviderForm-info">
          <label htmlFor="ProviderName">Service Provide Name</label>
          <input
            type="text"
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
            name="ProviderDescription"
            placeholder="Description"
            onChange={(e) => {
              setInfo({ ...info, ProviderDescription: e.target.value });
            }}
          />
          <p>A description of your company or website. Will be shown in a tooltip</p>
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
