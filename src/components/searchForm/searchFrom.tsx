import { useCallback } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { debounce } from "lodash";
import "./searchForm.scss";

const searchSchema = z.object({
  query: z
    .string()
    .max(100, "Запрос не может быть длиннее 100 символов")
    .optional(),
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

  const debouncedSubmit = useCallback(
    debounce((values: SearchFormValues) => {
      onSubmit(values);
    }, 500),
    [onSubmit]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    debouncedSubmit({ query: e.target.value });
  };

  const handleClear = () => {
    formik.setFieldValue("query", "");
    debouncedSubmit({ query: "" });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="search-form">
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
          <button
            type="button"
            className="favorite-btn" // Стили для кнопки как у "Add to Favorites"
            onClick={handleClear}
          >
            Clear
          </button>
          <button type="submit" className="favorite-btn">
            Search
          </button>
        </div>
        {formik.touched.query && formik.errors.query && (
          <div style={{ color: "red" }}>{formik.errors.query}</div>
        )}
      </div>
    </form>
  );
};

export default SearchForm;
