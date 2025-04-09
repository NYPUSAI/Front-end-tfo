<div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
  <div className="card w-full max-w-4xl bg-base-100 shadow-xl overflow-hidden flex">
    {/* Left Column - Login Form */}
    <div className="card-body p-8 flex flex-col items-center justify-center w-1/2">
      <div className="flex justify-center mb-4">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full bg-primary"></div>
        </div>
      </div>

      <h2 className="card-title text-2xl font-bold text-center mb-4">LOGIN</h2>
      <p className="text-base-content/60 text-sm text-center mb-6">
        How do I get started? Learn ipsum dolor sit amet.
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Email */}
        <div className="form-control">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="size-5 text-base-content/40" />
            </div>
            <input
              type="email"
              className="input input-bordered w-full pl-10"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-control">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="size-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pl-10"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-5 text-base-content/40" />
              ) : (
                <Eye className="size-5 text-base-content/40" />
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full rounded-full">
          Log In
        </button>
      </form>
    </div>

    {/* Right Column - Image */}
    <div className="w-1/2 hidden md:block relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src="/AiBots.jpg"
          alt="AiBots"
          className="w-full h-full object-cover rounded-r-xl"
        />
      </div>
    </div>
  </div>
</div>;



<img
src="/nypusAi.jpg"
alt="AiBots"
/>