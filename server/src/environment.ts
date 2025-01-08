let baseURL = "http://localhost:5000";
if (process.env.NODE_ENV === "production")
  baseURL = "https://cms.web-stories.at";
export default baseURL;
