import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { OrderStatus } from "../../../types";

const itemClassName =
  "flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 cursor-pointer outline-none data-[highlighted]:bg-slate-50 data-[state=checked]:font-semibold";

const SelectItem = ({ value, children }) => (
  <Select.Item value={value} className={itemClassName}>
    <Select.ItemText>{children}</Select.ItemText>
    <Select.ItemIndicator>
      <Check className="w-4 h-4 text-indigo-600" />
    </Select.ItemIndicator>
  </Select.Item>
);

export const CategorySelect = ({
  categories,
  value,
  onChange,
  triggerClassName,
  placeholder = "Categories",
  allLabel = "Categories",
}) => (
  <Select.Root value={value} onValueChange={onChange}>
    <Select.Trigger className={triggerClassName}>
      <Select.Value placeholder={placeholder} />
      <Select.Icon>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="z-50 bg-white border border-slate-200 rounded-xl shadow-[0_12px_30px_rgba(15,23,42,0.12)] overflow-hidden">
        <Select.Viewport className="p-2">
          <SelectItem value="all">{allLabel}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export const OrderStatusSelect = ({
  value,
  onChange,
  triggerClassName,
  placeholder = "Status",
  label,
  labelClassName,
}) => (
  <Select.Root value={value} onValueChange={onChange}>
    <Select.Trigger className={triggerClassName}>
      {label ? <span className={labelClassName}>{label}</span> : null}
      <Select.Value placeholder={placeholder} />
      <Select.Icon>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="z-50 bg-white border border-slate-200 rounded-xl shadow-[0_12px_30px_rgba(15,23,42,0.12)] overflow-hidden">
        <Select.Viewport className="p-2">
          {Object.values(OrderStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);
