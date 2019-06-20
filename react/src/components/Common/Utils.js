export const getRecaptchaTocken = async (executeRecaptcha, action) => {
  if (!executeRecaptcha) {
    return;
  }

  const token = await executeRecaptcha(action);

  return token;
}