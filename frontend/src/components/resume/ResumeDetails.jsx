
import { HiOutlineUser, HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";

const ResumeDetails = ({ resume }) => {
  const details = [
    {
      label: "Full Name",
      value: resume?.name,
      icon: HiOutlineUser,
    },
    {
      label: "Email Address",
      value: resume?.email,
      icon: HiOutlineEnvelope,
    },
    {
      label: "Phone Number",
      value: resume?.phone,
      icon: HiOutlinePhone,
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-gray-900">
        Candidate Information
      </h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex min-w-0 items-start gap-3 rounded-xl bg-gray-50 p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm">
                <Icon size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500">
                  {item.label}
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-gray-900">
                  {item.value || "Not provided"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResumeDetails;
