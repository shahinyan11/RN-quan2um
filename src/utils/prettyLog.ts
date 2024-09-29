/**
 * Prettify console.log
 * @param {string} name
 * @param {object|number|string} obj
 */
const prettyLog = (name: string, obj: object | number | string | boolean) => {
  return console.log(`[${name}]: `, JSON.stringify(obj, null, 2));
};

export default prettyLog;
