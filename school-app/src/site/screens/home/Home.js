import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/Header";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import FavoriteIconBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIconFill from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { withRouter } from "react-router-dom";
import Overview from "../overview/Overview";
import ImageScrole from "../../components/imagescrole/ImageScrole";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

const styles = theme => ({
  card: {
    maxWidth: 1100
  },
  avatar: {
    margin: 10
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  comment: {
    display: "flex",
    alignItems: "center"
  },
  hr: {
    marginTop: "10px",
    borderTop: "2px solid #f2f2f2"
  },
  gridList: {
    width: 1100,
    height: "auto",
    overflowY: "auto"
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 90
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filteredData: [],
      userData: {},
      likeSet: new Set(),
      comments: {},
      currrentComment: "",
      access_token: sessionStorage.getItem("access-token"),
      baseUrl: "https://api.instagram.com/v1/"
    };
  }
  componentDidMount() {
    this.getUserInfo();
    this.getMediaData();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header screen={"Home"} searchHandler={this.onSearchEntered} />
        <ImageScrole />
        <div className="container"></div>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <img
                src="images/prenursery.jpg"
                width="100%"
                // alt={this.state.selectedPost.caption.text.split("\n")[0]}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                spacing={3}
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="subtitle2">About our school</Typography>
                </Grid>
              </Grid>
              <Divider light /> <br />
              <Grid
                container
                spacing={3}
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="caption">
                    We need a different way of learning where we can teach my
                    students to think out of the box and resolve problems. Our
                    approach is unique in transforming our students to a
                    real-time professional in any technology they want to excel.
                  </Typography>
                  <br />
                  <br />
                  <Typography variant="caption">
                      So We look at VNT Technologies as an experience to make
                    our students learn, Interact with our trainers more
                    effectively. We limit students per batch to make sure our
                    trainers pay attention to each student and understand
                    capabilities. We connect our students to all the communities
                    to share their knowledge and to make it a reality. We Teach
                    the way You learn.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }

  onSearchEntered = value => {
    let filteredData = this.state.data;
    filteredData = filteredData.filter(data => {
      let string = data.caption.text.toLowerCase();
      let subString = value.toLowerCase();
      return string.includes(subString);
    });
    this.setState({
      filteredData
    });
  };

  likeClickHandler = id => {
    var foundItem = this.state.data.find(item => {
      return item.id === id;
    });

    if (typeof foundItem !== undefined) {
      if (!this.state.likeSet.has(id)) {
        foundItem.likes.count++;
        this.setState(({ likeSet }) => ({
          likeSet: new Set(likeSet.add(id))
        }));
      } else {
        foundItem.likes.count--;
        this.setState(({ likeSet }) => {
          const newLike = new Set(likeSet);
          newLike.delete(id);

          return {
            likeSet: newLike
          };
        });
      }
    }
  };

  addCommentClickHandler = id => {
    if (
      this.state.currentComment === "" ||
      typeof this.state.currentComment === undefined
    ) {
      return;
    }

    let commentList = this.state.comments.hasOwnProperty(id)
      ? this.state.comments[id].concat(this.state.currentComment)
      : [].concat(this.state.currentComment);

    this.setState({
      comments: {
        ...this.state.comments,
        [id]: commentList
      },
      currentComment: ""
    });
  };

  commentChangeHandler = e => {
    this.setState({
      currentComment: e.target.value
    });
  };

  getUserInfo = () => {
    let that = this;
    let url =
      this.state.baseUrl +
      "users/self/?access_token=" +
      this.state.access_token;
    return fetch(url, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        that.setState({
          userData: jsonResponse.data
        });
      })
      .catch(error => {
        console.log("error user data", error);
      });
  };

  getMediaData = () => {
    let that = this;
    let url =
      this.state.baseUrl +
      "users/self/media/recent?access_token=" +
      this.state.access_token;
    return fetch(url, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        that.setState({
          data: jsonResponse.data,
          filteredData: jsonResponse.data
        });
      })
      .catch(error => {
        console.log("error user data", error);
      });
  };
}

class HomeItem extends Component {
  constructor() {
    super();
    this.state = {
      isLiked: false,
      comment: ""
    };
  }

  render() {
    const { classes, item, comments } = this.props;

    let createdTime = new Date(0);
    createdTime.setUTCSeconds(item.created_time);
    let yyyy = createdTime.getFullYear();
    let mm = createdTime.getMonth() + 1;
    let dd = createdTime.getDate();

    let HH = createdTime.getHours();
    let MM = createdTime.getMinutes();
    let ss = createdTime.getSeconds();

    let time = dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MM + ":" + ss;
    let hashTags = item.tags.map(hash => {
      return "#" + hash;
    });
    return (
      <div className="home-item-main-container">
        <Overview />
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                alt="User Profile Pic"
                src={item.user.profile_picture}
                className={classes.avatar}
              />
            }
            title={item.user.username}
            subheader={time}
          />
          <CardContent>
            <CardMedia
              className={classes.media}
              image={item.images.standard_resolution.url}
              title={item.caption != null ? item.caption.text : ""}
            />
            <div className={classes.hr}>
              <Typography component="p">
                {item.caption && item.caption.text}
              </Typography>
              <Typography style={{ color: "#4dabf5" }} component="p">
                {hashTags.join(" ")}
              </Typography>
            </div>
          </CardContent>

          <CardActions>
            <IconButton
              aria-label="Add to favorites"
              onClick={this.onLikeClicked.bind(this, item.id)}
            >
              {this.state.isLiked && (
                <FavoriteIconFill style={{ color: "#F44336" }} />
              )}
              {!this.state.isLiked && <FavoriteIconBorder />}
            </IconButton>
            <Typography component="p">{item.likes.count} Likes</Typography>
          </CardActions>

          <CardContent>
            {comments.hasOwnProperty(item.id) &&
              comments[item.id].map((comment, index) => {
                return (
                  <div key={index} className="row">
                    <Typography component="p" style={{ fontWeight: "bold" }}>
                      {sessionStorage.getItem("username")}:
                    </Typography>
                    <Typography component="p">{comment}</Typography>
                  </div>
                );
              })}
            <div className={classes.formControl}>
              <FormControl style={{ flexGrow: 1 }}>
                <InputLabel htmlFor="comment">Add Comment</InputLabel>
                <Input
                  id="comment"
                  value={this.state.comment}
                  onChange={this.commentChangeHandler}
                />
              </FormControl>
              <FormControl>
                <Button
                  onClick={this.onAddCommentClicked.bind(this, item.id)}
                  variant="contained"
                  color="primary"
                >
                  ADD
                </Button>
              </FormControl>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  onLikeClicked = id => {
    if (this.state.isLiked) {
      this.setState({
        isLiked: false
      });
    } else {
      this.setState({
        isLiked: true
      });
    }
    this.props.onLikedClicked(id);
  };

  commentChangeHandler = e => {
    this.setState({
      comment: e.target.value
    });
    this.props.commentChangeHandler(e);
  };

  onAddCommentClicked = id => {
    if (this.state.comment === "" || typeof this.state.comment === undefined) {
      return;
    }
    this.setState({
      comment: ""
    });
    this.props.onAddCommentClicked(id);
  };
}

export default withStyles(styles)(withRouter(Home));
