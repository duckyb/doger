import React, { Component } from "react";

class Form extends Component {
  render() {
    const { onSubmit, userChange, titleChange, bodyChange } = this.props;
    const { user, title, body, message, time } = this.props;
    return <div className="container">
        <form id="woof-form" onSubmit={e => onSubmit(e)}>
          <label htmlFor="name">Username: </label>
          <input type="text" name="name" value={user} onChange={userChange} />
          <label htmlFor="title">Post title: </label>
          <input type="text" name="title" value={title} onChange={titleChange} />
          <label htmlFor="body">Post </label>
          <textarea name="body" rows="4" value={body} onChange={bodyChange} />
        {message ? <p className="message">{message}</p> : time > 0 ? <p className="message">{'please wait ' + time + ' more seconds...'}</p> : <button>Send</button>}
          

          <style jsx>{`
            * {
              font-family: "Roboto", sans-serif;
            }
            form {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              border: 1px solid #aaa;
              border-radius: 4px;
              width: 80%;
              max-width: 600px;
              padding: 10px;
              margin: 0 auto;
            }
            textarea {
              maxlength: 280;
              minlength: 1;
              resize: none;
            }
            textarea,
            input {
              border: 1px solid #dddddd;
              border-radius: 4px;
              padding: 5px;
            }
            label {
              margin-top: 10px;
              color: #111111;
              font-weight: bold;
            }
            button {
              width: 80px;
              margin-top: 10px;
              padding: 4px 4px;
              margin-left: auto;
              color: #111111;
              background-color: #ffffff;
              border: 1px solid #ff851b;
              border-radius: 4px;
            }
            .message {
              margin: 0;
              margin-top: 10px;
              padding: 4px 4px;
              background-color: #FF4136;
              color: #fff;
              font-weight: bold;
              border-radius: 4px;
              text-align: center
            }
          `}</style>
        </form>
      </div>;
  }
}

export default Form;
