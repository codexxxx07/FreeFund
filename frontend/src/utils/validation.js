const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(?:\+91[\s-]?|0)?[6-9]\d{9}$/;

export function validateApplication(values) {
  const errors = {};

  if (!values.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!values.mobile.trim()) errors.mobile = "Enter a mobile number.";
  else if (!PHONE_PATTERN.test(values.mobile.trim())) {
    errors.mobile = "Enter a valid 10-digit Indian mobile number.";
  }

  if (!values.email.trim()) errors.email = "Enter an email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.preferredLocation) errors.preferredLocation = "Select a preferred location.";
  if (!values.education) errors.education = "Select your highest education.";
  if (!values.experience) errors.experience = "Select your work experience.";
  if (!values.consent) errors.consent = "Consent is required.";

  return errors;
}

export function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter an email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Enter a subject.";
  if (!values.message.trim()) errors.message = "Enter a message.";
  else if (values.message.trim().length < 12) {
    errors.message = "Please write a slightly longer message.";
  }
  return errors;
}

export function isEmptyErrors(errors) {
  return Object.keys(errors).length === 0;
}
