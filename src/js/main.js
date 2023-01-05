import { Chart, registerables } from 'chart.js';
import { format } from "timeago.js";
import { tns } from "tiny-slider";

Chart.register(...registerables);

(() => {
  const App = {
    $: {
      scrollToRevealArray: document.querySelectorAll(".scroll-to-reveal"),
      ctaBtn: document.querySelector(".cta"),
      mobileList: document.querySelector(".mobile-list"),
      navIcon: document.querySelector(".nav--icon"),
      btns: document.querySelectorAll(".js-btn"),
      slideContainer: document.querySelector(".slide__container"),
      sections: document.querySelectorAll(".js-section"),
      getTimeAgoItems: () => document.querySelectorAll(".time-ago"),
    },
    initTinySlider: () => {
      const slider = tns({
        container: ".slide__container",
        arrowKeys: true,
        loop: false,
        rewind: false,
        mode: "gallery",
        controlsText: [
          '<svg viewBox="0 0 12 12" width="24" height="24"><use xlink:href="/images/icons.svg#icon-angle-right-arrow"></use></svg>',
          '<svg viewBox="0 0 12 12" width="24" height="24"><use xlink:href="/images/icons.svg#icon-angle-left-arrow"></use></svg>',
        ],
        nav: false,
      });
      slider.events.on("transitionEnd", () => {
        App.calcTimeAgo();
      });
      App.calcTimeAgo();
    },
    ariaTinySlider: () => {
      const sliderButtons = [...document.querySelectorAll('.tns-controls > button')];
      sliderButtons.forEach(button => {
        const actionName = button.dataset.controls;
        button.setAttribute('aria-label', `Go to ${actionName} slide`);
      })
    },
    calcTimeAgo: () => {
      const items = App.$.getTimeAgoItems();
      if (items.length) {
        for (var i = 0; i < items.length; i++) {
          const date = items[i].getAttribute("data-date");
          items[i].innerHTML = format(date)
        }
      }
    },
    setActiveLink: (event, buttons) => {
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
      }
      event.target.classList.add("selected");
    },
    smoothScrollTo: (i, buttons, event) => {
      const sections = App.$.sections;
      var element = sections[i - 1] || sections[i - 8];
      App.setActiveLink(event, buttons);

      if (App.$.mobileList.classList.contains("show")) {
        App.$.mobileList.classList.toggle("show");
      }

      window.scrollTo({
        behavior: "smooth",
        top: element ? element.offsetTop - 100 : 0,
        left: 0,
      });
    },
    initScrollToReveal: () => {
      const scrollToRevealArray = App.$.scrollToRevealArray;
      for (var i = 0; i < scrollToRevealArray.length; i++) {
        new Waypoint({
          element: scrollToRevealArray[i],
          handler: function (direction) {
            this.element.classList.add("fadeInUp");
          },
          offset: Waypoint.viewportHeight(),
        });
      }
    },
    initScrollToRevealNav: () => {
      new Waypoint({
        element: App.$.ctaBtn,
        handler: function (direction) {
          if (direction === "down") {
            document.querySelector("nav").classList.add("fixed");
          } else {
            document.querySelector("nav").classList.remove("fixed");
          }
        },
        offset: -80,
      });
    },
    attachBtsForSmoothScroll: () => {
      const btns = App.$.btns;
      const sections = App.$.sections;
      if (btns.length && sections.length > 0) {
        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", App.smoothScrollTo.bind(this, i, btns));
        }
      }
    },
    listenerNavIcon: () => {
      const navIcon = App.$.navIcon;
      navIcon.addEventListener("click", function () {
        const ariaExpanded = navIcon.getAttribute('aria-expanded');
        const isExpanded = ariaExpanded === 'true'
        navIcon.setAttribute('aria-expanded', `${!isExpanded}`);
        document.querySelector(".mobile-list").classList.toggle("show");
      });
    },
    stats: {
      getWeeksArray: () => {
        var weekArray = [];
        for (var i = 0; i < 30; i++) {
          weekArray.push("3/" + i);
        }
        return weekArray;
      },
      getGeneratedLineData: (numbers) => {
        return {
          labels: App.stats.getWeeksArray(),
          datasets: [
            {
              borderColor: "rgba(174,155,255,0.67)",
              pointColor: "#AE9BFF",
              data: numbers,
              pointRadius: 4,
              borderWidth: 1,
              pointBackgroundColor: "#C0B2FC",
            },
          ],
        };
      },
      getGeneratedBarData: (numbers) => {
        var labels = App.stats.getWeeksArray();
        return {
          labels: App.stats.getWeeksArray(),
          datasets: [
            {
              labels: labels,
              backgroundColor: "rgba(174,155,255,0.67)",
              data: numbers,
            },
          ],
        };
      },
      randomArray: (length, max) => {
        return Array.apply(null, Array(length)).map(function () {
          return Math.round(Math.random() * max);
        });
      },
    },
    generateCharts: () => {
      for (var i = 0; i < 6; i++) {
        var ctx = document.getElementById("stats-" + i).getContext("2d");
        var type, dataType;

        if (i !== 1 && i !== 4) {
          type = "line";
          dataType = App.stats.getGeneratedLineData(App.stats.randomArray(30, 1000));
        } else {
          type = "bar";
          dataType = App.stats.getGeneratedBarData(App.stats.randomArray(30, 1000));
        }

        new Chart(ctx, {
          type: type,
          data: dataType,
          scaleShowVerticalLines: false,
          scaleGridLineColor: "black",
          options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              line: {
                tension: 0,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                ticks: {
                  fontColor: "#444363",
                  fontSize: 12,
                },
              },
              x: {
                ticks: {
                  fontColor: "#444363",
                  fontSize: 12,
                },
              },
            },
          },
        });
      }
    },
    init() {
      App.generateCharts();
      App.initTinySlider();
      App.ariaTinySlider();
      App.initScrollToReveal();
      App.initScrollToRevealNav();
      App.attachBtsForSmoothScroll();
      App.listenerNavIcon();
    },
  };

  App.init();
})();
