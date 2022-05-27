/**
 *
 * Form validations its better to use with more accuarate libraries,
 * in this case we can use yup.
 */
export const validateEmail = (value) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return true
  }
  return false
}
