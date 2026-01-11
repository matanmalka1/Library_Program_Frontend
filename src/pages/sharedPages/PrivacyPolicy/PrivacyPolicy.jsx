export const PrivacyPolicy = () => (
  <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-16">
    <div className="flex flex-col gap-4 max-w-[720px]">
      <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
        Privacy Policy
      </p>
      <h1 className="font-serif text-4xl lg:text-5xl text-slate-900">
        How we handle your data
      </h1>
      <p className="text-slate-600 text-lg leading-7">
        We collect only the data needed to create your account, process orders,
        and improve your experience. We do not sell personal data.
      </p>
    </div>

    <div className="mt-12 grid gap-6">
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          Data we collect
        </h2>
        <p className="text-slate-600 m-0">
          Account details (name, email), shipping address, profile photos,
          reviews, and order history.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          How we use data
        </h2>
        <p className="text-slate-600 m-0">
          To authenticate you, fulfill orders, provide support, and maintain
          product quality and security.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          Data sharing
        </h2>
        <p className="text-slate-600 m-0">
          We do not sell your data. We only share it if required to operate the
          platform or to comply with legal obligations.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          Contact and deletion
        </h2>
        <p className="text-slate-600 m-0">
          For privacy questions or data deletion requests, visit the data
          deletion page or contact matan1391@gmail.com.
        </p>
      </div>
    </div>
  </div>
);
