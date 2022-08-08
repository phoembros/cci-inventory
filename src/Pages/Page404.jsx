import "./page404.scss";
import imageerror from "../Assets/404error.svg";
import { Grid } from "@mui/material";

export default function Page404() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="page-not-founds"
      style={{ minHeight: "90vh" }}
    >
      <h1 className="title">Oops..! Are you sure for this page?</h1>
      <p className="paragraph">
        Looks like you came to wrong page on our server
      </p>
      <img src={imageerror} alt="not found" className="image-error" />
    </Grid>
  );
}
