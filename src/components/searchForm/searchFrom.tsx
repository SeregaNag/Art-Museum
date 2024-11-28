import React from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const searchSchema = z.object({
  query: z
    .string()
    .max(100, "Запрос не может быть длиннее 50 символов")
    .optional()
});

type SearchFormValues = z.infer<typeof searchSchema>;

const SearchForm: React.FC<{
  onSubmit: (values: SearchFormValues) => void;
}> = ({ onSubmit }) => {
  const formik = useFormik<SearchFormValues>({
    initialValues: {
      query: "",
    },
    validationSchema: toFormikValidationSchema(searchSchema),
    onSubmit,
  });

  const handleClear = () => {
    formik.setFieldValue("query", "");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="query">Поиск:</label>
        <input
          id="query"
          name="query"
          type="text"
          value={formik.values.query}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          type="button"
          onClick={handleClear}
          style={{ marginLeft: "10px" }}
        >
          Clear
        </button>
        {formik.touched.query && formik.errors.query ? (
          <div style={{ color: "red" }}>{formik.errors.query}</div>
        ) : null}
      </div>
      <button type="submit">Найти</button>
    </form>
  );
};

export default SearchForm;
