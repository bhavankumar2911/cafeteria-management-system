export default function APIRequestError(error, printError, toAlert) {
  if (printError) console.log(error.config);

  if (error.response) {
    const { message } = error.response.data;
    if (toAlert) alert(message);
    else return message;
  } else if (error.request) {
    const message = "No response from server. Try sometime later.";
    if (toAlert) alert(message);
    else return message;
  } else {
    const message = "Something went wrong. Try sometime later.";
    if (toAlert) alert(message);
    else return message;
  }
}
