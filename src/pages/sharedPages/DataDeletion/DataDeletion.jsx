export const DataDeletion = () => (
  <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-16">
    <div className="flex flex-col gap-4 max-w-[720px]">
      <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
        Data Deletion
      </p>
      <h1 className="font-serif text-4xl lg:text-5xl text-slate-900">
        Delete your account data
      </h1>
      <p className="text-slate-600 text-lg leading-7">
        You can request deletion of your account and associated data at any
        time. Deletions are typically completed within 30 days.
      </p>
    </div>

    <div className="mt-12 grid gap-6">
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          Request deletion
        </h2>
        <p className="text-slate-600 m-0">
          Send an email to matan1391@gmail.com with the subject
          "Data Deletion Request" and include your account email.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          What gets deleted
        </h2>
        <p className="text-slate-600 m-0">
          Your profile, saved addresses, wishlists, order history, reviews, and
          profile photos will be removed or anonymized as required for
          compliance.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          Identity verification
        </h2>
        <p className="text-slate-600 m-0">
          We may request additional verification to protect your account before
          completing the deletion.
        </p>
      </div>
    </div>
  </div>
);
