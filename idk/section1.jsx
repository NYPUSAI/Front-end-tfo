      {/* LinkedIn API Configuration */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Linkedin size={20} /> LinkedIn API
        </h2>
        <p className="text-sm text-base-content/70">
          Manage your LinkedIn API integration settings
        </p>
        <div className="divider"></div>

        <div className="bg-base-100 p-6 rounded-lg shadow-inner">
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">API ID</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={userData.linkedin_api?.id || ""}
              disabled
            />
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Access Token</span>
              <span className="label-text-alt text-info">Editable</span>
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                className="input input-bordered w-full"
                defaultValue={userData.linkedin_api?.access_token || ""}
              />
              <button className="btn btn-primary">Update</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Created At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(
                    userData.linkedin_api?.created_at
                  ).toLocaleString() || ""
                }
                disabled
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Updated At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(
                    userData.linkedin_api?.updated_at
                  ).toLocaleString() || ""
                }
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* SMTP Configuration */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Mail size={20} /> SMTP Configuration
        </h2>
        <p className="text-sm text-base-content/70">
          Configure your email server settings
        </p>
        <div className="divider"></div>

        <div className="bg-base-100 p-6 rounded-lg shadow-inner">
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">SMTP ID</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={userData.smtp_config?.id || ""}
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">SMTP Host</span>
                <span className="label-text-alt text-info">Editable</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                defaultValue={userData.smtp_config?.smtp_host || ""}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">SMTP Port</span>
                <span className="label-text-alt text-info">Editable</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                defaultValue={userData.smtp_config?.smtp_port || ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Password</span>
                <span className="label-text-alt text-info">Editable</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                defaultValue={userData.smtp_config?.password || ""}
                placeholder="Enter password"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Sender Email</span>
                <span className="label-text-alt text-info">Editable</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                defaultValue={userData.smtp_config?.sender_email || ""}
              />
            </div>
          </div>

          <button className="btn btn-primary w-full mt-2">
            Save SMTP Settings
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Created At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(userData.smtp_config?.created_at).toLocaleString() ||
                  ""
                }
                disabled
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Updated At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(userData.smtp_config?.updated_at).toLocaleString() ||
                  ""
                }
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* EOD Configuration */}
      <div className="card bg-base-200 shadow-lg rounded-xl p-6 mt-6 mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BarChart2 size={20} /> EOD Reports Configuration
        </h2>
        <p className="text-sm text-base-content/70">
          Configure end-of-day reporting settings
        </p>
        <div className="divider"></div>

        <div className="bg-base-100 p-6 rounded-lg shadow-inner">
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">EOD Config ID</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={userData.eod_config?.id || ""}
              disabled
            />
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
              <span className="label-text-alt text-info">Editable</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              defaultValue={userData.eod_config?.email_address || ""}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label cursor-pointer justify-start gap-4">
              <span className="label-text font-medium">Enable EOD Reports</span>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-lg"
                defaultChecked={userData.eod_config?.enable || false}
              />
            </label>
          </div>

          <button className="btn btn-primary w-full">Save EOD Settings</button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Created At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(userData.eod_config?.created_at).toLocaleString() ||
                  ""
                }
                disabled
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Updated At</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={
                  new Date(userData.eod_config?.updated_at).toLocaleString() ||
                  ""
                }
                disabled
              />
            </div>
          </div>
        </div>
      </div>