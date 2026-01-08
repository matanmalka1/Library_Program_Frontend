export class ApiError extends Error {
  constructor(
    message = "API error",
    status = null,
    code = null,
    details = null
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function extractResponse(err) {
  return err?.response?.data ?? err?.response ?? err?.data ?? null;
}

export function getApiErrorMessage(err, fallback) {
  if (!err) return fallback || "Unknown error";

  // If already an ApiError, return its message
  if (err.name === "ApiError" && err.message) return err.message;

  // Axios style response body and common shapes
  const resp = extractResponse(err);
  if (resp) {
    const { message, error, errors, details, code } = resp;
    if (typeof message === "string" && message.trim()) return message;
    if (typeof error === "string" && error.trim()) return error;
    if (Array.isArray(errors) && errors.length) {
      return errors
        .map((e) => e?.msg || e?.message || JSON.stringify(e))
        .filter(Boolean)
        .join("; ");
    }
    if (typeof details === "string" && details.trim()) return details;
    if (typeof code === "string" && code.trim()) return code;
  }

  const status = err?.response?.status ?? null;
  if (status) {
    const statusMessages = {
      400: "We couldn't process your request. Please check your input and try again.",
      401: "Your session has expired. Please sign in again.",
      403: "You don't have permission to perform this action.",
      404: "We couldn't find what you were looking for.",
      409: "This action couldn't be completed because of a conflict. Please try again.",
      422: "Some of the information provided is invalid. Please review and try again.",
      429: "You're doing that too quickly. Please wait a moment and try again.",
      500: "Something went wrong on our side. Please try again later.",
      502: "The service is temporarily unavailable. Please try again later.",
      503: "The service is temporarily unavailable. Please try again later.",
      504: "The service is taking too long to respond. Please try again.",
    };
    if (statusMessages[status]) return statusMessages[status];
  }

  if (err.message) return err.message;
  return fallback || "Unknown error";
}

export function toApiError(err, fallback) {
  const message = getApiErrorMessage(err, fallback);
  const status = err?.response?.status ?? null;
  const code = err?.response?.data?.code ?? null;
  const details = extractResponse(err);
  return new ApiError(message, status, code, details);
}

export default {
  ApiError,
  getApiErrorMessage,
  toApiError,
};
