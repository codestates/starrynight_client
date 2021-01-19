import React, { Component } from "react";
import { FaArrowDown } from "react-icons/fa";
import Landing from "./Landing";
import Main from "./Main";
import "../src/css/App.scss";
import { Route, withRouter } from "react-router-dom";
import testUtils from "react-dom/test-utils";

const App = () => {
  const targets = document.querySelectorAll("[data-observer]");
  const images = document.querySelectorAll("[data-img]");

  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };

  const addClass = (el) => {
    if (!el.classList.contains("is-visible")) {
      el.classList.add("is-visible");
    }
  };

  const removeClass = (el) => {
    if (el.classList.contains("is-visible")) {
      el.classList.remove("is-visible");
    }
  };

  const doThings = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        addClass(entry.target);
      } else {
        removeClass(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(doThings, options);

  const observer2 = new IntersectionObserver(doThings, {
    ...options,
    threshold: 0.4,
  });

  targets.forEach((target) => {
    observer.observe(target);
  });

  images.forEach((target) => {
    observer2.observe(target);
  });

  return (
    <>
      {/* <withRouter> */}
      <main className="App">
        <div className="scrolledsection is-visible">
          {/* <figure className="scrolledsection__bg-image" data-img> */}
          {/* <img
              src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="mountain"
            /> */}

          <Landing />
          {/* </figure> */}
          {/* <h2>Scroll item 1</h2> */}
          {/* <div className="scrolledsection__content">
            <br />
            <br />
            <br />
            <div className="scrolledsection__inner" data-observer>
              <FaArrowDown />
            </div>
          </div> */}
        </div>

        <section className="scrolledsection">
          {/* <h2>Scroll item 2</h2> */}
          <Route path="/" exact={true} component={Main} />
          {/* <Main /> */}

          {/* <div className="scrolledsection__content">
            <div className="scrolledsection__inner" data-observer></div>
          </div> */}
        </section>

      </main>
      {/* </withRouter> */}
    </>
  );
};

export default App;
