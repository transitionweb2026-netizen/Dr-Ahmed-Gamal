/** Reads the `${name}_en` / `${name}_ar` pair a <BilingualField> submits. */
export function bilingualFromForm(formData: FormData, name: string) {
  return {
    en: String(formData.get(`${name}_en`) ?? "").trim(),
    ar: String(formData.get(`${name}_ar`) ?? "").trim(),
  };
}
