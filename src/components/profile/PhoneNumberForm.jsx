import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneNumberSchema } from "../../validators/profile/phone-number-schema";
import { FormField } from "../ui/FormField";
import { FormSubmitButton } from "../ui/FormSubmitButton";
import { useProfileUpdateForm } from "../../hooks/useProfileUpdateForm";

export const PhoneNumberForm = ({ user, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const { isSubmitting, saved, handleSubmit: submitPhone } =
    useProfileUpdateForm({
      submitPayload: (data) => ({
        phoneNumber: data.phoneNumber?.trim() || null,
      }),
      successMessage: "Phone number updated successfully!",
      onSuccess,
      reset,
    });

  return (
    <form onSubmit={handleSubmit(submitPhone)} className="grid gap-4">
      <FormField
        label="Phone Number"
        error={errors.phoneNumber?.message}
        helper="Optional - helps for order updates"
        inputProps={{
          ...register("phoneNumber"),
          type: "tel",
          placeholder: "+1 (555) 123-4567",
        }}
      />

      <FormSubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Phone Number"}
      </FormSubmitButton>
      {saved && <p className="text-sm text-emerald-600 mt-2">Saved</p>}
    </form>
  );
};
