import Header from "./Header";
import Post from "./Post";
import Preloader from "./Preloader";
import Form from "./Form";
import React, { Component } from "react";

// select api url
// const API_URL = "http://localhost:5000/woofs";
const API_URL = "https://doger-api.now.sh/woofs";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      usr: "",
      title: "",
      body: "",
      posts: [],
      message: "",
      time: 0
    };
    this.counting = 0;
  }

  componentDidMount() {
    this.grabPosts();
  }

  grabPosts = () => {
    fetch(API_URL)
      .then(resp => resp.json())
      .then(woofs => {
        woofs.reverse();
        this.setState({
          loading: false,
          usr: "",
          title: "",
          body: "",
          posts: woofs,
          message: ""
        });
      });
  };

  validation = (user, title, post) => {
    return (
      user &&
      user.toString().trim() !== "" &&
      title &&
      title.toString().trim() !== "" &&
      post &&
      post.toString().trim() !== ""
    );
  };

  startTimer = () => {
    let { time } = this.state;
    if (time < 1 && this.counting === 0) console.log("timer has started");
    this.setState({ time: 30 }, () => {
      this.counting = setInterval(() => {
        // countdown
        this.setState(prevState => ({
          time: prevState.time - 1
        }));
        if (this.state.time < 1) {
          clearInterval(this.counting);
        }
      }, 1000);
    });
  };

  handleUserChange = e => {
    this.setState({ usr: e.target.value, message: "" });
  };
  handleTitleChange = e => {
    this.setState({ title: e.target.value, message: "" });
  };
  handleBodyChange = e => {
    this.setState({ body: e.target.value, message: "" });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { usr, title, body } = this.state;
    if (this.validation(usr, title, body)) {
      this.setState({ loading: true });
      const woof = {
        usr,
        title,
        body
      };
      console.log({ woof });
      // api
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(woof),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(() => {
          this.grabPosts();
          this.setState({ time: 30, message: "" });
          this.startTimer();
        })
        .catch(e => console.log("handleSubmit promise error:\n" + e));
    } else {
      this.setState({ message: "This post is not valid" });
    }
  };

  render() {
    const { loading, usr, title, body, posts, message, time } = this.state;
    return (
      <React.Fragment>
        <div>
          <Header />
          <Form
            time={time}
            userChange={this.handleUserChange}
            titleChange={this.handleTitleChange}
            bodyChange={this.handleBodyChange}
            onSubmit={this.handleSubmit}
            user={usr}
            title={title}
            body={body}
            message={message}
          />
          <h2 className="postHeader">Posts</h2>
          {loading ? (
            <Preloader />
          ) : posts === null ? (
            void 0
          ) : (
            posts.map((post, i) => (
              <Post
                key={i}
                user={post.name}
                date={post.date}
                title={post.title}
                body={post.content}
              />
            ))
          )}
        </div>

        <style jsx>{`
          * {
            font-family: "Roboto", sans-serif;
          }
          .postHeader {
            text-align: center;
            color: #111;
          }
          .postHeader::before,
          .postHeader::after {
            content: " — ";
            color: #111;
            margin: 0 10px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Home;
