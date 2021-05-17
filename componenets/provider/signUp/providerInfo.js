import React from "react";

export default function ProviderInfo(props) {
  return (
    <section className="ProviderInfo">
      <h1>Service Provider Infromation</h1>
      <form>
        <div className="ProviderForm-info">
          <label for="ProviderName">Service Provide Name</label>
          <input type="text" name="ProviderName" placeholder="Name of the service provider" />
          <label for="ProviderDescription">Service Provider Description</label>
          <input type="text" name="ProviderDescription" placeholder="Description" />
        </div>
        <div className="ProviderForm-photoUpload">
          <label>Upload Brand Photo</label>
          <button className="PhotoUploadBtn"></button>
          <p>
            Upload PNG or SVG file 48 pixel x 48 pixel. This photo will be published in plans as the
            provider reference.
          </p>
        </div>
      </form>
    </section>
  );
}
