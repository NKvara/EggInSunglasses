import About from "@/features/desktop/apps/about";

export const shortcuts = [
  {
    icon: "/images/desktop/web.png",
    title: "about",
    app: <About />,
    init: {position: {x: 200, y: 200}, size: {w: 0, h: 0}}
  },
  {
    icon: "/images/desktop/web.png",
    title: "minesweeper",
    app: <div />,
    init: {position: {x: 150, y: 150}, size: {w: 0, h: 0}}
  }
];
