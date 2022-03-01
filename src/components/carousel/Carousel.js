import React from "react";
import PT from "prop-types";
import { debounce } from "lodash/fp";
import TouchHelper from "./TouchHelper";

/* TODO
- Maybe: render prop/func with props like: isScrolling (for styling)
- Future: Snap to closest card
*/

const DIRECTION = {
  PREV: 0,
  NEXT: 1
};

class Slider extends React.Component {
  // Update cards in state from props
  static getDerivedStateFromProps(p, s) {
    return {
      ...s,
      cards: Slider.createCards(p.components, s.cardRefs)
    };
  }

  // Clone components from props with reference properties
  static createCards(components, cardRefs) {
    return components.map((card, i) =>
      React.cloneElement(card, {
        id: `card-${i}`,
        elRef: cardRefs[i]
      })
    );
  }

  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
    this.scrollingEventId = null;
    this.scrollTimeoutId = null;
    this.touchHelper = new TouchHelper();

    const cardRefs = this.createCardRefs();

    this.state = {
      isScrolling: false,
      scrollLeft: 0,
      firstVisibleCardId: 0,
      lastVisibleCardId: 0,
      cardRefs,
      cards: Slider.createCards(props.components, cardRefs)
    };
  }

  componentDidMount() {
    this.setVisibleCardIds();

    // Disable default touchmove behaviour on iOS
    this.containerRef.current.addEventListener(
      "touchmove",
      e => {
        if (e.touches.length >= 2) {
          this.onTouchMove(e);

          if (e.scale !== 1) {
            e.preventDefault();
          }
        }
      },
      { passive: false }
    );
  }

  componentDidUpdate(prevProps) {
    const { components: prevComponents } = prevProps;
    const { components } = this.props;

    if (prevComponents.length !== components.length) {
      const cardRefs = this.createCardRefs();

      // we need to call this.createCardRefs() and this is not possible
      // in a static method like getDerivedStateFromProps()
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        cardRefs,
        cards: Slider.createCards(components, cardRefs)
      });
    }
  }

  // eslint-disable-next-line react/sort-comp
  setVisibleCardIds = debounce(250)(onDone => {
    const { cardRefs } = this.state;
    const { offset } = this.props;

    const visibleCardIds = cardRefs.reduce((all, card, id) => {
      if (!card.current) return all;

      const cardX = card.current.getBoundingClientRect().x + offset;
      const cardX2 = cardX + card.current.getBoundingClientRect().width;
      const containerWidth = this.containerRef.current.clientWidth;

      // Check if card is in view
      if (
        (cardX < 0 && cardX2 > 0) ||
        (cardX >= 0 && cardX2 <= containerWidth) ||
        (cardX >= 0 && cardX < containerWidth && cardX2 >= containerWidth)
      ) {
        return [...all, id];
      }

      return all;
    }, []);

    const lastCardId = visibleCardIds[visibleCardIds.length - 1];

    this.setState(
      {
        firstVisibleCardId: visibleCardIds[0] || Math.min(0, lastCardId - 1),
        lastVisibleCardId: lastCardId
      },
      () => {
        if (onDone) onDone();
      }
    );
  });

  onMousewheel = event => {
    event.preventDefault();

    this.setVisibleCardIds();

    if (this.containerRef) {
      const { scrollLeft } = this.state;
      const { scrollWidth, clientWidth } = this.containerRef.current;
      const delta = event.deltaY + event.deltaX;
      const containerWidth = scrollWidth - clientWidth;
      let x = scrollLeft;

      // Set next scroll location
      if (x + delta >= 0 && x + delta <= containerWidth) {
        x = scrollLeft + delta;
      }

      if (x - delta < 0) {
        x = 0;
      }

      if (x !== scrollLeft) {
        clearTimeout(this.scrollingEventId);

        this.scrollingEventId = setTimeout(() => {
          this.setState({ isScrolling: false });
        }, 25);

        this.setState(
          {
            isScrolling: true,
            scrollLeft: x
          },
          () => {
            this.containerRef.current.scrollTo({ left: this.state.scrollLeft });
          }
        );
      }
    }
  };

  onTouchMove = e => {
    // Prevent scrolling on iOS
    // e.preventDefault();
    // e.stopPropagation();

    this.containerRef.current.scrollTo({ left: this.state.scrollLeft });
    this.touchHelper.onTouchMove(e);
  };

  onTouchEnd = () => {
    if (this.touchHelper.touches >= 2) {
      const startX = this.touchHelper.start.x;
      const endX = this.touchHelper.end.x;
      const deltaX = startX - endX;

      if (deltaX < 0) {
        this.scrollToCard(DIRECTION.PREV)();
      } else {
        this.scrollToCard(DIRECTION.NEXT)();
      }
    }

    // Reset values
    // this.touchHelper.onTouchEnd();
  };

  createCardRefs = () =>
    Array.from({ length: this.props.components.length }).map(() =>
      React.createRef()
    );

  stopScroll = () => {
    this.setVisibleCardIds(() => {
      this.setState({ isScrolling: false }, () => {
        clearTimeout(this.scrollTimeoutId);
      });
    });
  };

  scrollToX = (targetX, duration = 500) => {
    const startX = this.state.scrollLeft;
    const distance = Math.max(0, targetX) - startX;
    const startTime = new Date().getTime();
    const container = this.containerRef.current;
    const containerWidth = container.getBoundingClientRect().width;

    duration = duration || Math.min(Math.abs(distance), 500);

    const loopScroll = () => {
      this.scrollTimeoutId = setTimeout(() => {
        // Scroll percentage
        const p = Math.min(1, (new Date().getTime() - startTime) / duration);

        // Current position
        let x = Math.max(
          0,
          // eslint-disable-next-line no-mixed-operators
          Math.floor(
            startX + distance * (p < 0.5 ? 2 * p * p : p * (4 - p * 2) - 1)
          )
        );

        const maxScrollX = container.scrollWidth - container.clientWidth;

        if (x > maxScrollX) {
          x = maxScrollX;
        }

        this.setState({ isScrolling: true, scrollLeft: x }, () => {
          container.scrollTo({ left: this.state.scrollLeft });

          if (p < 1 && containerWidth + x < container.scrollWidth) {
            loopScroll();
          } else {
            setTimeout(this.stopScroll);
          }
        });
      }, 9);
    };
    loopScroll();
  };

  scrollToCard = direction => () => {
    const {
      isScrolling,
      scrollLeft,
      firstVisibleCardId,
      lastVisibleCardId,
      cards
    } = this.state;
    const { offset } = this.props;

    if (isScrolling) return;

    if (
      direction === DIRECTION.PREV &&
      firstVisibleCardId === 0 &&
      scrollLeft === 0
    ) {
      return;
    }

    const isNext = direction === DIRECTION.NEXT;
    let nextCardId = isNext ? lastVisibleCardId : firstVisibleCardId;

    nextCardId = isNext
      ? Math.min(cards.length - 1, lastVisibleCardId)
      : Math.max(0, firstVisibleCardId - 1);

    if (nextCardId == null || Number.isNaN(nextCardId)) {
      return this.setVisibleCardIds(this.scrollToCard(direction));
    }

    const card = document.getElementById(`card-${nextCardId}`);
    const container = this.containerRef.current;
    let targetX = scrollLeft + card.getBoundingClientRect().x + offset;

    if (nextCardId === 0) {
      targetX = 0;
    }

    if (nextCardId === cards.length - 1) {
      targetX = container.scrollWidth - container.clientWidth;
    }

    // Scrolling resets the X position of the current card to 0, because they slide to the left.
    // Scrolling position does not reset. This means we have to add
    // our current scroll X to the X position of the next card to reach the next card
    this.scrollToX(targetX);
  };

  preventScroll = e => {
    e.preventDefault();
    return false;
  };

  render() {
    const { cards, isScrolling } = this.state;
    const { className } = this.props;

    return (
      <div
        className={className}
        // onWheel={this.onMousewheel}
        onScroll={this.preventScroll}
        onTouchStart={this.touchHelper.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        ref={this.containerRef}
      >
        {this.props.children({
          components: cards,
          scrollToPrevCard: this.scrollToCard(DIRECTION.PREV),
          scrollToNextCard: this.scrollToCard(DIRECTION.NEXT),
          isScrolling
        })}
      </div>
    );
  }
}

Slider.propTypes = {
  children: PT.func,
  offset: PT.number,
  className: PT.string,
  components: PT.arrayOf(PT.element)
};

Slider.defaultProps = {
  offset: 0
};

export default Slider;
