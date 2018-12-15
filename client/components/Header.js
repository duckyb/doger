export default () => (
  <div>
    <img src="/static/doge.jpg" alt="doger logo" />
    <h1>Welcome to Doger!</h1>
    <h2>twitter for dogs</h2>
    <style jsx>{`
      * { font-family: Roboto, sans-serif; }
      div {
        text-align: center;
        margin-bottom: 20px;
      }
      img {
        height: 140px;
      }
      h1, h2 {
        margin: 0; padding 0;
      }
      h1 { color: #FF851B }
      h2 { 
        color: #AAAAAA;
        font-size: 1.3rem;
        font-weight: 300;
      }
    `}</style>
  </div>
)