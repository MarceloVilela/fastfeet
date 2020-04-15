import * as Yup from 'yup';

const validateBeforeSubmit = async function (data, helpers, schema, handleSubmit, formRef) {
  try {
    // Validation with Yup
    await schema.validate(data, {
      abortEarly: false,
    });

    // Validation passed
    formRef.current.setErrors({});
    handleSubmit(data);
  } catch (err) {
    // Displaying errors
    const validationErrors = {};

    if (err instanceof Yup.ValidationError) {
      // Validation failed

      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      formRef.current.setErrors(validationErrors);
    }
  }
};

export default validateBeforeSubmit;
