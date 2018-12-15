export default props => (
  <div className="wrapper">
    <div className="meta">
      <p>{props.user}</p>
      <p>{props.date}</p>
    </div>
    <h3>{props.title}</h3>
    <p>{props.body}</p>
    <style jsx>{`
      .wrapper {
        width: 80%;
        max-width: 600px;
        padding: 10px;
        margin: 0 auto;
        margin-top: 20px;
        border: 1px solid #aaa;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
      }
      .meta {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #aaa;
        margin-bottom: 10px;
      }
      h3 {
        margin: 0; padding: 0;
        margin-bottom: 10px;
        color: #ff851b;
      }
      p {
        margin: 0; padding 0;
      }
    `}</style>
  </div>
);