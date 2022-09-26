/* #region eliminator */
class eliminator {
  constructor(el) {
    this.el = el;
    this.breakpoints = [
      { name: "default", width: 0 },
      { name: "sm", width: 576 },
      { name: "md", width: 768 },
      { name: "lg", width: 992 },
      { name: "xl", width: 1200 },
      { name: "max", width: 999999999 },
    ];
    this.wsBreakpointHandler();
  }
  wsWindowBreakpoint() {
    const windowWidth = window.innerWidth;
    let currentBreakpoint;
    this.breakpoints.forEach((item, index) => {
      if (
        windowWidth > item.width &&
        windowWidth <= this.breakpoints[index + 1].width
      ) {
        currentBreakpoint = item;
      }
    });
    return currentBreakpoint;
  }
  wsElementBreakpoints(element) {
    let breakpoints = [];
    this.breakpoints.forEach((item) => {
      if (element.hasAttribute(`data-${item.name}-count`)) {
        breakpoints.push(item);
      }
    });
    return breakpoints;
  }
  wsCalcFinalBreakpoint(element, windowBreakpoint, elementBreakpoint) {
    let reverseBreakpoints = elementBreakpoint.reverse();
    let i = 0;
    for (i; i <= elementBreakpoint.length - 1; i++) {
      if (reverseBreakpoints[i].width <= windowBreakpoint.width) {
        let count = element.getAttribute(
          `data-${reverseBreakpoints[i].name}-count`
        );
        this.wsMinifyText(element, count);
        break;
      }
    }
  }
  wsBreakpointHandler() {
    const all_elements = document.querySelectorAll(this.el);
    all_elements.forEach((item) => {
      let wsWindowBreakpoint = this.wsWindowBreakpoint();
      let wsElementBreakpoints = this.wsElementBreakpoints(item);
      this.wsCalcFinalBreakpoint(
        item,
        wsWindowBreakpoint,
        wsElementBreakpoints
      );
    });
  }
  wsMinifyText(element, count) {
    let orgText = $(element).text().trim();
    let summaryText;
    //console.log(orgText, orgText.length);
    if (orgText.length > count) {
      summaryText = orgText.substring(0, count) + "...";
    } else {
      summaryText = orgText.trim();
    }
    $(element).text(summaryText);
  }
}
new eliminator(".wsMinifier");
/* #endregion */
