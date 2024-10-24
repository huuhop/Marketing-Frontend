import history from "~/redux/history";
import queryString from "query-string";

const useSetParams = ({ values = {} }) => {
  const changeMultipleQueryParams = (
    data = [{ name: "name", value: "" }],
    keepState = false
  ) => {
    const originalUrl = window.location.href;
    const urlObject = new URL(originalUrl);

    let objValStr = "";
    let oldUrlObject = {};

    if (keepState) {
      oldUrlObject = queryString.parse(urlObject.searchParams.toString());
    }

    objValStr = queryString.stringify(
      data.reduce((init, item) => {
        return {
          ...init,
          [item.name]: item.value,
        };
      }, oldUrlObject),
      { arrayFormat: "comma" }
    );

    history.push({ pathname: urlObject.pathname, search: objValStr });
  };

  return { changeMultipleQueryParams };
};

export default useSetParams;
