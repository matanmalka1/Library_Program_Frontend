import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressSchema } from "../../validators/profile/shipping-address-schema";
import { FormField } from "../ui/FormField";
import { FormSubmitButton } from "../ui/FormSubmitButton";
import { useProfileUpdateForm } from "../../hooks/useProfileUpdateForm";

export const ShippingAddressForm = ({ user, onSuccess }) => {
  const defaultAddress = user?.defaultShippingAddress || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      street: defaultAddress.street || "",
      city: defaultAddress.city || "",
      state: defaultAddress.state || "",
      zip: defaultAddress.zip || "",
      country: defaultAddress.country || "",
    },
  });

  const { isSubmitting, saved, handleSubmit: submitAddress } =
    useProfileUpdateForm({
      submitPayload: (data) => {
        const isEmpty =
          !data.street?.trim() &&
          !data.city?.trim() &&
          !data.state?.trim() &&
          !data.zip?.trim() &&
          !data.country?.trim();
        return { shippingAddress: isEmpty ? null : data };
      },
      successMessage: "Shipping address updated successfully!",
      onSuccess,
      reset,
    });

  return (
    <form onSubmit={handleSubmit(submitAddress)} className="grid gap-4">
      <FormField
        label="Street Address"
        error={errors.street?.message}
        inputProps={{ ...register("street"), placeholder: "123 Main Street" }}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="City"
          error={errors.city?.message}
          inputProps={{ ...register("city"), placeholder: "New York" }}
        />

        <FormField
          label="State/Province"
          error={errors.state?.message}
          inputProps={{ ...register("state"), placeholder: "NY" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="ZIP/Postal Code"
          error={errors.zip?.message}
          inputProps={{ ...register("zip"), placeholder: "10001" }}
        />

        <FormField
          label="Country"
          error={errors.country?.message}
          inputProps={{ ...register("country"), placeholder: "United States" }}
        />
      </div>

      <FormSubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Address"}
      </FormSubmitButton>
      {saved && <p className="text-sm text-emerald-600 mt-2">Saved</p>}
    </form>
  );
};
