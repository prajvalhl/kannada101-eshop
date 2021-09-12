import React from "react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-header">Connect with me on</div>
      <ul className="social-links list-non-bullet">
        <li className="list-item-inline">
          <a
            className="link"
            href="https://github.com/prajvalhl"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github" aria-hidden="true"></i>
          </a>
        </li>
        <li className="list-item-inline">
          <a
            className="link"
            href="https://www.linkedin.com/in/hlprajval/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </li>

        <li className="list-item-inline">
          <a
            className="link"
            href="https://twitter.com/l_prajval"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </li>
      </ul>
      <p>
        Made with <span>&lt;/&gt;</span> by Prajval H L
      </p>
    </footer>
  );
}
