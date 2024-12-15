import './searchForm.scss';

import { useFormik } from 'formik';
import { useDebounce } from 'hooks/useDebounce';
import { useCallback } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const validateQueryLength = (val: string) =>
  val.length >= 2 && val.length <= 30;

const searchSchema = z.object({
  query: z
    .string()
    .refine(validateQueryLength, {
      message: 'Query must be between 2 and 30 characters.',
    })
    .optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const SearchForm: React.FC<{
  onSubmit: (values: SearchFormValues) => void;
}> = ({ onSubmit }) => {
  const formik = useFormik<SearchFormValues>({
    initialValues: {
      query: '',
    },
    validationSchema: toFormikValidationSchema(searchSchema),
    onSubmit,
  });

  const debouncedSubmit = useDebounce((values: SearchFormValues) => {
    console.log('Submit triggered with values:', values);
    onSubmit(values);
  }, 500);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const queryValue = e.target.value;
      console.log('Input change detected:', e.target.value);

      formik.handleChange(e);

      if (validateQueryLength(queryValue)) {
        debouncedSubmit({ query: queryValue });
      } else {
        debouncedSubmit({ query: '' });
      }
    },
    [formik, debouncedSubmit]
  );

  const handleClear = () => {
    formik.setFieldValue('query', '');
    debouncedSubmit({ query: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formik.isValid && formik.dirty) {
      formik.submitForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div>
        <input
          id="query"
          name="query"
          type="text"
          value={formik.values.query}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
        />
        <div className="search-buttons">
          <button type="button" className="favorite-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
        {formik.touched.query && formik.errors.query && (
          <div className="error-message">{formik.errors.query}</div>
        )}
      </div>
    </form>
  );
};

export default SearchForm;
