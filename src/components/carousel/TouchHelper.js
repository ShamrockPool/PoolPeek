export default class {
    start = { x: 0, y: 0 };
    end = { x: 0, y: 0 };
    touches = 0;
    isScrolling = false;
  
    onTouchEnd = () => {
      this.start = { x: 0, y: 0 };
      this.end = { x: 0, y: 0 };
      this.isScrolling = false;
      this.touches = 0;
    };
  
    onTouchStart = e => {
      this.start = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
      this.isScrolling = true;
      this.touches = e.touches.length;
    };
  
    onTouchMove = e => {
      this.start = this.end;
      this.end = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };
  }
  