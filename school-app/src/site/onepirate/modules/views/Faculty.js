import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import images from "../../../__mocks__/FacultyImages";

const backgroundImage = "school.PNG";

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  }
});

function GallaryInfo(props) {

  const { classes, id } = props;
  
  return (
    <div>
      <div className="container"></div>
      <br></br>
      
      <Container>
        <div className={classes.images}>
        {images.map((imageInfo, index) => {
        // const imageInfo = images[id];
        const url = `${window.location.origin}${imageInfo.url}`;
        return (
          <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <img
              src={url}
              width="100%"
              style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
              // alt={this.state.selectedPost.caption.text.split("\n")[0]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              spacing={3}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="subtitle2">{imageInfo.title}</Typography>
              </Grid>
            </Grid>
            <Divider light />
            <Grid
              container
              spacing={2}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="caption">
                  {imageInfo.descripion}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        );
        })}
        </div>
        
      </Container>
     
    </div>
  );
}

GallaryInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default withStyles(styles)(GallaryInfo);
