import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bioSchema } from "../../validators/profile/bio-schema";
import { FormField } from "../ui/FormField";
import { FormSubmitButton } from "../ui/FormSubmitButton";
import { useProfileUpdateForm } from "../../hooks/useProfileUpdateForm";

export const BioForm = ({ user, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio: user?.bio || "",
    },
  });

  const bioLength = watch("bio")?.length || 0;
  const maxLength = 500;

  const { isSubmitting, saved, handleSubmit: submitBio } =
    useProfileUpdateForm({
      submitPayload: (data) => ({
        bio: data.bio?.trim() || null,
      }),
      successMessage: "Bio updated successfully!",
      onSuccess,
      reset,
    });

  return (
    <form onSubmit={handleSubmit(submitBio)} className="grid gap-4">
      <FormField
        label={
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 block">
              About You
            </span>
            <span className="text-xs text-slate-500">
              {bioLength}/{maxLength}
            </span>
          </div>
        }
        labelClassName="mb-2"
        as="textarea"
        inputClassName="resize-none"
        error={errors.bio?.message}
        helper="Optional - displayed on your reviews and public profile"
        inputProps={{
          ...register("bio"),
          placeholder:
            "Tell other readers about yourself... (visible on your reviews)",
          rows: 4,
        }}
      />

      <FormSubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Bio"}
      </FormSubmitButton>
      {saved && <p className="text-sm text-emerald-600 mt-2">Saved</p>}
    </form>
  );
};
